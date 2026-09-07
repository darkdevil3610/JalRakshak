# JalRakshak — AI-Powered Flood Early-Warning & Advisory Assistant

**1M1B AI + Sustainability Virtual Internship — September 2026**  
**Primary SDG:** SDG 13 (Climate Action) | **Secondary SDGs:** SDG 11 (Sustainable Cities), SDG 6 (Clean Water & Sanitation)  
**Target Geography:** Low-lying urban wards in Kerala (demonstrated with Kochi Municipal Corporation wards)

---

## 1. Project Overview

* **One-line pitch:** A conceptual AI assistant that combines rainfall data with local drain-blockage complaint patterns to generate ward-level flood risk scores and plain-language advisories for residents in English and Malayalam.
* **Problem Statement:** *"How might we use AI to combine rainfall intensity and local drainage-complaint data so that urban wards in Kerala can get earlier, more localized flood warnings?"*
* **Target Users:** Ward residents in flood-prone urban areas, municipal disaster-management officers, and community volunteers/NGOs.

---

## 2. Why AI Is Needed

1. **Weak-Signal Fusion:** Merges two separate signals (rainfall intensity + municipal complaint density) into a unified, explainable risk score.
2. **Text Summarization:** Aggregates unstructured citizen complaint logs into quantifiable risk inputs.
3. **Citizen Communication:** Converts numerical risk scores into actionable, plain-language advisories in English and Malayalam with official helplines (KSDMA Helpline: 1070).

---

## 3. Explainable Risk-Scoring Logic

Rule-based engine designed for auditable public disaster management:

| Signal | Threshold Condition | Score Contribution |
|---|---|:---:|
| **24-hr Rainfall** | `rainfall_mm > 100` | **+2** |
| **24-hr Rainfall** | `50 <= rainfall_mm <= 100` | **+1** |
| **Drain Complaints** | `complaints_7d > 5` | **+1** |
| **Reservoir / River** | `reservoir_pct > 80%` | **+1** |

### Risk Classification
* **0 – 1 Points:** 🟢 **Low Risk** — Normal precautions.
* **2 – 3 Points:** 🟡 **Medium Risk** — Heightened readiness; move vehicles to safety.
* **4+ Points:** 🔴 **High Risk** — Immediate action; avoid low-lying travel after 6 PM; emergency helpline broadcast.

### Infrastructure Review Trigger (Scenario C)
When `complaint_points > 0 AND rainfall_points == 0`, the system automatically flags the ward for **municipal drain inspection**, surfacing drainage vulnerabilities on dry days before heavy storms strike.

---

## 4. Worked Demo Scenarios

### Scenario A: Ward 12 (Kaloor North) — High Risk
* **Inputs:** Rainfall 130 mm (+2), Complaints 7 (+1), Reservoir 90% (+1)
* **Score:** 2 + 1 + 1 = 4 ➜ **HIGH RISK**
* **English Advisory:** *"High flood risk in Ward 12. Heavy rainfall (130 mm in 24 h); 7 unresolved drain complaints in 7 days; Reservoir/river at 90% of danger mark. Avoid travel through low-lying areas after 6 PM. Keep emergency numbers ready (KSDMA Helpline: 1070)."*
* **Malayalam Advisory:** *"Ward 12-ൽ കനത്ത വെള്ളപ്പൊക്ക സാധ്യതയുണ്ട്. കനത്ത മഴയും അഴുക്കുചാൽ തടസ്സവും സാധ്യത വർദ്ധിപ്പിക്കുന്നു. താഴ്ന്ന പ്രദേശങ്ങളിലൂടെയുള്ള യാത്ര ഒഴിവാക്കുക. അടിയന്തര സഹായത്തിന് 1070 നമ്പറിൽ ബന്ധപ്പെടുക."*

### Scenario B: Ward 5 (Panampilly Nagar) — Low Risk
* **Inputs:** Rainfall 60 mm (+1), Complaints 2 (+0), Reservoir 60% (+0)
* **Score:** 1 + 0 + 0 = 1 ➜ **LOW RISK**
* **English Advisory:** *"Low flood risk in Ward 5 today. Normal precautions advised."*
* **Malayalam Advisory:** *"Ward 5-ൽ ഇന്ന് വെള്ളപ്പൊക്ക ഭീഷണി കുറവാണ്. സാധാരണ മുൻകരുതലുകൾ തുടരുക."*

### Scenario C: Ward 9 (Ponekkara) — Low Rain + Municipal Review Flag
* **Inputs:** Rainfall 40 mm (+0), Complaints 8 (+1), Reservoir 70% (+0)
* **Score:** 0 + 1 + 0 = 1 ➜ **LOW RISK** `[FLAG: Municipal Drain Inspection]`
* **English Advisory:** *"Low rainfall risk, but Ward 9 has 8 unresolved drain complaints — recommend municipal inspection regardless of rainfall."*
* **Malayalam Advisory:** *"മഴ കുറവാണ്, എങ്കിലും Ward 9-ൽ 8 അഴുക്കുചാൽ പരാതികൾ പരിഹരിക്കപ്പെടാതെ കിടക്കുന്നു — അടിയന്തര നഗരസഭാ പരിശോധന ശുപാർശ ചെയ്യുന്നു."*

---

## 5. IBM BOB Integration (Ideation & Planning Stage)

IBM BOB was utilized in **Ask and Plan modes** to reason through the system architecture, test scalability (6 demo wards ➜ 100+ production wards), and conduct gap analysis:

1. **Planning Rules:** Located in [`.bob/`](./.bob/) (`rules-agent`, `rules-ask`, `rules-plan`).
2. **Architecture Review & Gap Analysis:** Comprehensive critique in [`jalrakshak-architecture-review.md`](./jalrakshak-architecture-review.md).
3. **Key Gaps Addressed:**
   * Temporal alignment of disparate sensor feeds (3-hourly nowcasts vs continuous complaints).
   * Spatial gauge granularity (preventing uniform reservoir scores across non-basin wards).
   * Complaint normalization (per-capita weighting for population density).
   * LLM hallucination prevention (using deterministic local-language templates + KSDMA 1070 helpline).
4. **Interactive Prompts Guide:** [`docs/ibm_bob_guide.md`](./docs/ibm_bob_guide.md) contains paste-ready prompts and screenshot instructions for Slide 8 of the presentation deck.

---

## 6. Project Structure

```
JalRakshak/
├── .bob/                               # IBM BOB rule definitions
│   ├── rules-agent/AGENTS.md
│   ├── rules-ask/AGENTS.md
│   └── rules-plan/AGENTS.md
├── data/                               # Simulated datasets (6 Kochi wards)
│   ├── wards.csv                       # Ward IDs, names, low-lying flags
│   ├── rainfall.csv                    # 24-hr rainfall readings (mm)
│   ├── complaints.csv                  # 7-day drain complaint counts
│   ├── complaints_log.csv              # Individual citizen grievance log
│   └── river_levels.csv                # River/reservoir % of danger mark
├── deck/                               # Presentation deck deliverables
│   ├── build_deck.js                   # pptxgenjs generation script
│   ├── JalRakshak_MVP.pptx             # 10-slide widescreen presentation deck
│   ├── JalRakshak_MVP.pdf              # PDF export of the presentation
│   └── slide-*.png                     # 150 DPI rendered slide images
├── docs/                               # Assignment documentation (Steps 1–4)
│   ├── problem_statement.md            # Step 1: Empathize & Define
│   ├── data_sources.md                 # Step 2: Data Sources & Research
│   ├── ai_workflow.md                  # Step 3: AI Workflow & Prompt Design
│   └── ibm_bob_guide.md                # Step 4: IBM BOB Integration Guide
├── output/                             # Generated prototype demo outputs
│   ├── scenarios_output.txt            # Formatted text run of Scenarios A, B, C
│   └── advisory_prompts.txt            # Documented LLM prompt layer templates
├── src/                                # Core prototype engine
│   ├── risk_engine.py                  # Rule-based scoring & classification
│   ├── advisory.py                     # English & Malayalam advisory generators
│   ├── data_loader.py                  # Ingestion & ward snapshot builder
│   └── run_scenarios.py                # Full CLI scenario runner
├── tests/
│   └── test_risk_engine.py             # 9 automated unit tests (stdlib unittest)
├── index.html                          # Standalone web simulator (GitHub Pages ready)
├── jalrakshak-architecture-review.md   # Architecture review from IBM BOB
└── README.md
```

---

## 7. Quickstart Commands

All code uses Python standard library only (no third-party pip dependencies required).

### Run Test Suite
```bash
python -m unittest discover -s tests -v
```

### Run Scenario Demo & Board Output
```bash
python src/run_scenarios.py
```

### Rebuild Presentation Deck
```bash
cd deck && node build_deck.js
```

---

## 8. Free Web Interface Hosting (GitHub Pages)

A standalone, zero-dependency web interface is included in [`index.html`](./index.html). It can be opened locally in any browser or deployed live to **GitHub Pages** for free:

1. **Initialize & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: JalRakshak MVP release with web simulator"
   git branch -M main
   git remote add origin https://github.com/<your-username>/JalRakshak.git
   git push -u origin main
   ```
2. **Enable GitHub Pages:**
   * In your repository on GitHub, click **Settings** ➔ **Pages**.
   * Under **Build and deployment** ➔ **Source**, select **Deploy from a branch**.
   * Under **Branch**, select `main` and folder `/ (root)`.
   * Click **Save**.
3. **Live URL:**
   Your interactive dashboard will be live within 1–2 minutes at:
   `https://<your-username>.github.io/JalRakshak/`

```
