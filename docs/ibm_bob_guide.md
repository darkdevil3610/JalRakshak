# Step 4 — IBM BOB Integration (Ideation & Planning Stage)

> **Your task:** run IBM BOB yourself (Ask/Plan mode), screenshot the exchange, and use it to validate the architecture. This file gives you everything paste-ready, plus the screenshot checklist. The prototype itself was built separately; BOB's critique may feed improvements back into it.

## How to use this file (5 minutes)

1. Open IBM BOB → **Plan mode** (if BOB has separate Ask and Plan modes, do the Ask pass first, then Plan).
2. Paste **Prompt 1** below. Wait for the full response.
3. Ask 2–3 of the **follow-up validation questions** (Prompt 2 block).
4. Screenshot: (a) your prompt + BOB's architecture reasoning, (b) BOB's gaps/risks list, (c) one follow-up Q&A.
5. Insert the screenshots where noted in `deck/JalRakshak_MVP.pptx` (slide 8, "Planned & validated with IBM BOB").

## Prompt 1 — Main Ask/Plan-mode prompt (paste as-is)

```text
I am building "JalRakshak", an AI flood early-warning and advisory assistant for a
1M1B AI + Sustainability internship project (SDG 13 Climate Action). Please reason
through my architecture and flag gaps, risks, and anything I've missed.

PROBLEM
Urban wards in Kerala get city- or district-wide flood warnings that are too broad
to act on. Drain-blockage complaints filed by residents — a strong early signal of
flooding risk — are routed for cleanup but never used for prediction.

PROPOSED AI WORKFLOW (conceptual MVP, simulated data, no trained ML model)
1. Inputs per urban ward: 24-hr rainfall in mm (source: IMD district forecasts),
   river/reservoir level as % of danger mark (source: KSDMA bulletins), and count
   of drain-blockage complaints in the past 7 days (source: municipal grievance
   records, K-SMART-style citizen complaint platform).
2. Rule-based risk scoring, per ward per day:
      rainfall > 100 mm            -> +2
      rainfall 50-100 mm           -> +1
      drain complaints > 5 / 7 days -> +1
      reservoir > 80% danger mark   -> +1
3. Classification: 0-1 Low, 2-3 Medium, 4+ High.
4. Advisory layer: a prompt-based (RAG-style) generation step takes risk level +
   ward name + contributing factors and produces a plain-language advisory for
   residents in English and Malayalam (SMS + voice-note length, <= 60 words).
5. Special flag: if complaints > 5 but rainfall scores 0, flag the ward for
   municipal inspection — infrastructure risk independent of weather.

QUESTIONS FOR YOU
1. Reason through this architecture step by step: is the data flow sound? What
   breaks first as it scales from 6 demo wards to a full city of 100+ wards?
2. What are the weaknesses of rule-based scoring here, and what cheap improvements
   keep it explainable (weights, thresholds, historical flood complaints)?
3. What could go wrong in the prompt-based advisory layer (hallucinated places,
   wrong severity tone, language quality in Malayalam) and what guardrails,
   validation step, or human-in-the-loop would you add before broadcasting?
4. Which parts of this are feasible as a student prototype with simulated data,
   and which should I explicitly defer to a "future scope" slide?
5. What evaluation would convince a municipal officer this is trustworthy?
```

## Prompt 2 — Follow-up validation questions (pick 2–3)

```text
a) My scoring treats 6 complaints and 60 complaints identically (+1). Should
   complaint density be normalized per ward population/road length? Propose a
   simple normalized rule that stays explainable.
b) Draft a fallback design: if the LLM advisory service is down during a flood,
   what degraded-mode behavior should JalRakshak have? (I plan to keep static
   templates as fallback — critique this.)
c) A ward officer challenges a "High risk" score in a press interview. Walk me
   through explaining the score in 3 sentences a journalist would quote.
d) How should I evaluate the advisory-quality of the prompt layer? Design a small
   test set and 5 criteria (clarity, actionability, tone, length, language).
```

## Screenshot checklist (for the deck + submission)

| # | What to capture | Where it goes |
|---|---|---|
| 1 | Your Prompt 1 **and** BOB's full architecture reasoning visible on screen | Deck slide 8 — main screenshot |
| 2 | BOB's **gaps/risks** list scrolled into view | Deck slide 8 — second screenshot |
| 3 | One follow-up Q&A (e.g., normalized complaint density or degraded-mode) | Appendix slide / doc evidence |
| 4 | Mode indicator ("Plan") visible in at least one screenshot | Any — shows genuine BOB usage |

## After BOB responds (recommended)

- Paste BOB's top 2–3 critiques into a "Validated with IBM BOB — changes we made" list on slide 8 or the appendix; e.g., if BOB suggests normalizing complaints per capita, note it as a planned improvement.
- If BOB flags something trivially fixable in the prototype (wording of advisories, threshold at boundaries), apply it — and mention "refined after IBM BOB review" in your presentation. That's exactly the BOB-integration evidence the step asks for.

## Honest-scoping note (keep this framing in your viva)

IBM BOB is used at the **ideation/planning and validation** stage — architecture reasoning, gap analysis, prompt critique. The prototype code is a deterministic Python implementation built independently; BOB review informs it, it does not generate it. This keeps the workflow defensible: you did the design thinking, BOB stress-tested it.
