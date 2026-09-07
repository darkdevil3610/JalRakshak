# JalRakshak — Architecture Review & Gap Analysis

**Scope**: Conceptual MVP with simulated data, 6 demo wards → 100+ ward scaling.
**Status of existing code**: Scoring engine, advisory layer, test suite, and documentation are functionally complete.

---

## 1. Data Flow Analysis: Is It Sound?

### What Works Well

The three-input → score → classify → advise pipeline is architecturally clean and logically sound for the MVP. The data flow is:

```
CSVs (rainfall, complaints, river_levels, wards)
  → data_loader.py (ward snapshot builder)
  → risk_engine.py (score_ward())
  → advisory.py (render_advisory() or build_llm_prompt())
  → output (CLI / prompts file)
```

The separation of concerns is good: scoring is pure (no I/O), advisory is decoupled from scoring, data loading is isolated. This is correct.

### What Breaks First at Scale (6 → 100+ Wards)

**Data ingestion is the first breaking point.** Currently, all four CSVs are loaded entirely into memory and joined in Python. At 6 wards this is trivial. At 100+ wards with daily updates, the problems are:

- **Temporal alignment**: The current model treats all inputs as a single daily snapshot. Real IMD data arrives in irregular bulletins (3-hourly nowcasts + 24-hr forecasts). Real KSDMA river data updates intraday. Complaints arrive continuously. The system has no event loop, no polling, and no timestamp reconciliation. A ward scored at 8 AM with stale river data and fresh complaints is not comparable to one scored at 6 PM. **This is the most dangerous scaling risk.**

- **One reservoir for all wards**: `river_levels.csv` has two sources (Periyar river, Thevara canal), and `data_loader.py` takes the max across all sources as a single city-wide value applied uniformly to every ward. At 100+ wards, wards far from a river should not inherit a high reservoir score from a distant gauge. The reservoir → ward assignment needs a spatial lookup (which river/canal affects which ward).

- **Complaint aggregation is flat**: The 7-day window is computed once (summed in `complaints.csv`). At scale, rolling aggregation must be computed live from `complaints_log.csv` (which exists but is unused in scoring). Without this, a ward that had 6 complaints 6 days ago but 0 today looks identical to one that filed 6 complaints in the last 12 hours. Recency weighting matters operationally.

- **No concurrency model**: `run_scenarios.py` scores wards sequentially. At 100+ wards with live LLM calls per ward, this becomes a blocking queue. The scoring engine is pure and can be parallelized trivially; the advisory layer (if using a real LLM) cannot without rate-limit management.

---

## 2. Rule-Based Scoring: Weaknesses and Cheap Improvements

### Known Weaknesses

**Threshold brittleness**: The 100 mm / 50 mm / 5 complaints / 80% boundaries are hard-coded constants chosen for demo clarity, not calibrated against Kerala historical flood data. A ward that gets 99 mm scores the same as one that gets 20 mm. This is a cliff-edge response, not a continuous signal.

**Complaint count is unnormalized**: 5 complaints from a ward of 5,000 households is a very different signal from 5 complaints in a ward of 50,000. The scoring spec does not normalize. This means dense wards are systematically under-warned (their complaint rate per capita is lower even when drainage is equally degraded). You should note this explicitly as a known limitation.

**Equal weight for unequal signals**: Rainfall (+2 max) dominates the score. But a ward that combines low rainfall, a blocked primary drain, and a canal at 85% is arguably riskier than one that gets 55 mm of rain on clear infrastructure. The current max-4 scale can only express this as a score-2 Medium in both cases — it can't distinguish them.

**The infra-review flag is binary and not in the score**: This is actually a *good design choice* for explainability, but it means the flag can be missed in an automated broadcast. The current advisory renders a plain-text sentence; there is no separate channel, severity tag, or escalation action attached to it.

**No time decay**: A complaint filed 6 days ago is weighted the same as one filed 6 hours ago. A rolling 7-day window with exponential decay (recent complaints worth more) would better reflect actual infrastructure state.

### Cheap Improvements That Preserve Explainability

All of these stay rule-based and auditable:

| Improvement | How to Implement | Gain |
|---|---|---|
| **Weighted complaint density** | Divide complaints by ward household count (add `household_count` to `wards.csv`) | Removes dense-ward bias |
| **Recency weighting for complaints** | Sum `complaints_log.csv` with weight = 1 / (1 + days_ago), round to nearest 0.5 for scoring | Rewards recent signals |
| **Soft threshold bands** | Replace hard cutoffs with 3-tier bands (e.g., 75–100 mm = +1, 100–150 mm = +2, 150+ mm = +3) | Removes cliff-edge; still auditable |
| **River-to-ward spatial mapping** | Add a `river_id` column to `wards.csv` referencing relevant river gauge | Fixes uniform reservoir score |
| **Historical calibration stub** | Add a JSON file mapping ward_id → historical_flood_score (manually assigned from past events); add a +1 if ward has flooded in prior 3 monsoons | No ML needed; anchors thresholds to ground truth |
| **Separate infrastructure severity tier** | Add `infra_severity: low/medium/high` based on complaint density, independent of risk level | Gives officers a richer signal without complicating the resident advisory |

**What you should NOT do cheaply**: Do not add a trained ML model to calibrate thresholds unless you have labelled historical flood-per-ward data. Without that, an ML model is a false precision upgrade — it looks better but you cannot validate it.

---

## 3. Prompt-Based Advisory Layer: Risks and Guardrails

### What Can Go Wrong

**Hallucinated place names**: This is the highest-severity risk. An LLM given "Ward 12, Kaloor North" may confabulate nearby street names, landmarks, or evacuation routes it has seen in training data. If a resident is told "avoid flooding near Chittoor Road" and that road is not actually affected, trust collapses permanently. The current prompt includes "Never invent places" as a constraint — this is necessary but not sufficient. LLMs do not reliably obey negative constraints.

**Severity tone miscalibration**: An LLM may soften a High advisory ("some waterlogging possible") or escalate a Low advisory ("heavy downpours expected") based on training data priors from other geographies. Kerala's monsoon context (where 130 mm in 24h is routine in July but catastrophic in January) is not necessarily in the model's calibration for this region.

**Malayalam quality degradation**: Most LLMs have substantially weaker Malayalam capabilities than English. Common failure modes: code-switching to English mid-sentence, wrong script characters for conjunct consonants, register errors (formal bureaucratic Malayalam vs. everyday spoken Malayalam for SMS), and unnatural transliteration. The current Malayalam sample in `advisory.py` is a manually written template — which is *better* than free LLM generation for this reason.

**Word-count boundary violations**: A 60-word constraint is frequently violated in practice, especially in Malayalam where the same information requires more syllables and conjunct characters. The current prompt asks for ≤60 words; there is no enforcement or truncation step.

**Idempotency failure**: If an LLM advisory is broadcast for Ward 12, then the system re-runs 30 minutes later with the same inputs, a different advisory may be generated. Residents receiving two different messages for the same event erodes trust.

### Guardrails and Validation Steps

**Structural guardrails (implement in MVP)**:

1. **Template-first fallback**: The existing two-layer design (template engine + LLM prompt) is the right architecture. For the MVP demo, use templates exclusively. Document the LLM layer as the production design. This is already partially done.

2. **Output schema validation**: The advisory generation step should validate that the output (a) does not contain any proper nouns not in the ward's input record, (b) does not contain digits (scores should never appear in resident advisories), (c) is under 70 words (with buffer). This can be a simple Python regex/word-count check applied to the LLM output before broadcast.

3. **Severity keyword check**: Map risk level → mandatory keyword that must appear. High → one of ["avoid", "do not", "evacuate", "move to higher"]. Medium → one of ["prepare", "caution", "waterlogging"]. If the keyword is absent, fall back to template.

4. **Malayalam templates, not LLM generation (for MVP)**: Write all three levels (Low/Medium/High) as fixed Malayalam templates with `{ward_name}` slot only. This eliminates LLM Malayalam quality risk entirely for the prototype. This is the most defensible approach for a student project.

**Human-in-the-loop for production**:

5. **Officer confirmation gate for High advisories**: Before a High advisory is broadcast to residents, it should be confirmed by the ward officer (one-tap approve on a dashboard). Low and Medium can auto-broadcast. This is standard in emergency management systems.

6. **Advisory review log**: Every generated advisory — template or LLM — should be written to a log with timestamp, ward, risk level, and advisory text. This creates an audit trail for post-event review.

7. **A/B calibration review**: After each monsoon season, sample 10–20 issued advisories and have a Malayalam-fluent domain expert rate quality on a 3-point scale. Use this to decide whether to switch from templates to LLM generation or vice versa.

---

## 4. What Is Feasible Now vs. What Should Be Future Scope

### Do Now (In the Prototype)

| Component | Rationale |
|---|---|
| **Rule-based scoring engine** | Already done, correct design, fully tested |
| **Simulated CSV inputs** | Honest and appropriate; do not attempt live API integration |
| **Template advisories (EN + ML all three levels)** | Currently only High has Malayalam; add Medium/Low templates — this is a 30-minute task |
| **Infrastructure review flag** | Already done; this is your strongest differentiator, emphasize it |
| **Scoring explainability output** | Already done (factors list in score_ward); make sure it shows in the demo |
| **Three spec scenarios (A/B/C)** | Already done and tested |
| **Complaint recency weighting** | Can be added from `complaints_log.csv` in ~20 lines; upgrades the signal quality |

### Explicitly Defer to Future Scope

| Component | Why Defer |
|---|---|
| **Live IMD/KSDMA API integration** | Requires institutional access, data-sharing MOU with municipal body; not a student prototype task |
| **Real LLM API endpoint** | Rate limits, cost, latency, and hallucination risk all require production engineering; document the design, do not deploy |
| **SMS/voice broadcast** | Twilio or AWS SNS integration is straightforward technically but requires phone number registry, opt-in consent framework, and regulatory compliance (TRAI) |
| **Web dashboard / Streamlit UI** | Valuable for demo polish but not core to the AI workflow; if time-constrained, CLI + scenario output is sufficient |
| **ML-based threshold calibration** | Needs historical ward-level flood event labels, which do not exist for a student project |
| **Spatial/GIS propagation** | Hydrological modelling (water flows between wards) requires DEM data and is a separate domain problem |
| **Complaint NLP classification** | Extracting "primary drain" vs. "secondary culvert" from complaint text is valuable but requires labelled training data |
| **Real-time alert deduplication** | Needed when the system runs on a cron job; not relevant for demo |

---

## 5. What Evaluation Would Convince a Municipal Officer

A municipal officer has two questions: **"Does it catch real floods?"** and **"Does it cry wolf?"** These map directly to recall and precision.

### For a Student Prototype (No Historical Data Available)

**Scenario coverage**: Run the system against at least 5 distinct input combinations — the three spec scenarios plus two edge cases (e.g., all inputs at threshold boundary; a ward that scores High on complaints + reservoir alone with no rainfall). Show that each produces a sensible, distinct advisory. This is already largely done.

**Boundary transparency**: Present a simple table: "Here is what triggers each risk level, and here is why these thresholds were chosen." If thresholds are not calibrated to real data, say so explicitly. Municipal officers respect honesty about limitations; they will distrust a system that overclaims.

**Scenario C emphasis**: The infrastructure-flag scenario (complaints > 5, no rainfall signal) is the most convincing demonstration for a municipal audience. It shows the system catches something a weather-only alert would miss. Lead with this in any officer presentation.

### If Historical Incident Data Becomes Available (Future Scope)

**Retrospective recall test**: Take 20 known ward-level flood events from Kerala 2021–2023. Feed the inputs for those days into the system. Count: how many were classified High or Medium before the event? This is the single most credible evaluation for a municipal officer.

**False-positive rate**: Count High advisories issued on days when no flooding was reported. A system that screams High every day loses user trust within one monsoon season.

**Advisory comprehension test**: Read a High and a Medium advisory aloud (in Malayalam) to 3–5 residents and ask: "What should you do?" If they cannot answer correctly, the advisory copy needs revision. This is cheap to run and highly persuasive to a bureaucratic audience.

**Comparative baseline**: Compare the system's ward-level scores against the actual district-wide alerts issued by KSDMA on the same days. Show cases where the district issued no alert but JalRakshak scored Medium/High for a specific ward that later flooded. This directly answers "why is hyperlocal better?"

---

## Architecture Gaps Not Yet Addressed in the Codebase

| Gap | Severity | Recommended Action |
|---|---|---|
| **No Medium or Low Malayalam templates** | Medium | Add in `advisory.py`; ~10 lines |
| **Reservoir score is city-wide, not ward-specific** | High (for realism) | Add `river_id` to `wards.csv`; document as known limitation for MVP |
| **Complaint recency is unweighted** | Medium | Implement from `complaints_log.csv` (already loaded but unused in scoring) |
| **No word-count enforcement on advisory output** | Low for templates, High for LLM | Add word-count assertion to advisory tests |
| **`complaints_log.csv` is loaded but never used in scoring** | Low | Either use it (recency) or document why it's deferred |
| **Max score is 4 but spec says "4+"** | Low | The "+2+1+1+1 = 5" path (e.g., 130 mm + 7 complaints + 85% reservoir) is not tested; add boundary test for score 5 |
| **`low_lying` flag affects advisory text but not score** | Design question | Consider whether low_lying should add +1 to score or only affect advisory copy |
| **No fallback if river_levels CSV is empty** | Medium | `data_loader.py` returns 0 on empty; document this assumption |
| **Advisory does not include emergency contact number** | Low | Template says "keep emergency numbers ready" but does not provide one; for Kerala: KSDMA helpline 1070 |

---

## Summary Verdict

**The architecture is sound for its stated scope.** The problem framing is clear, the three-input scoring model is justified and explainable, the infra-flag is a genuine differentiator, and the advisory layer design is appropriately cautious (template-first, LLM-documented-not-deployed).

**The four risks worth calling out explicitly in any presentation**:

1. Reservoir score is currently uniform across all wards — the spatial mapping gap.
2. LLM generation for Malayalam is high-risk; fixed templates are safer and should be the default.
3. Thresholds are not calibrated — this is honest and correct for a prototype, but must be stated explicitly.
4. The "insight beyond weather" value (Scenario C) needs to be front-and-centre in every evaluation and demo, as it is the most defensible claim of AI value-add over a naive weather alert.
