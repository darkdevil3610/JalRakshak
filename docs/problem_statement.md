# Step 1 — Empathize + Define the Problem

> **Deliverable for the assignment:** the problem statement in the required "How might we…" format, who is affected, why the problem persists, and the gaps that exist today.

## Problem statement (required format)

**How might we use AI to combine rainfall and drainage-complaint data so that urban wards in Kerala get earlier, localized flood warnings?**

## Empathize — what we heard from the ground

Urban flooding in Kerala is not only a "hero rainfall" event like the August 2018 floods (which displaced over a million people and was Kerala's worst in nearly a century). Every monsoon since, cities such as Kochi see repeated *urban* flooding after ordinary evening showers — waterlogging on low-lying roads, water entering ground-floor homes, drains overflowing within 2–3 hours of rain. For the people living through it, the pattern is consistent:

- "We only knew it was serious when water entered the house." — *no lead time*
- "The news said heavy rain for the district. My street floods with half that." — *warnings are not for my ward*
- "I complained about the blocked drain near the market twice last month. Nobody came." — *a known, reported risk that nobody connects to flooding*

That last voice is the core insight: **residents are already reporting the earliest flood signal — blocked drains — and the data dies inside the grievance system instead of warning anyone.**

## Who is affected

| Group | How they are affected |
|---|---|
| **Residents of low-lying urban wards** | First to flood, last to be warned; ground-floor homes, shops, and street vendors take direct damage |
| **Residents without official alert channels** | Not on WhatsApp groups, dam-release SMS lists, or apps; depend on word of mouth, which arrives with the water |
| **Municipal disaster-management officers** | Get district-scale rainfall bulletins but no ward-level picture that combines rain with drainage condition |
| **Community NGOs & volunteer groups** | Deploy rescue reactively; no signal to pre-position pumps or move vulnerable people early |

## Why the problem persists

1. **Warnings are too broad.** Official flood alerts are issued city- or district-wide (e.g., IMD district forecasts, district collector bulletins). A district warning that "doesn't apply to my street" is mentally discounted; a warning for *Ward 12* is actionable.
2. **Drain-blockage data is collected but never used for prediction.** Every year citizens file hundreds of drainage complaints through municipal offices and the K-SMART citizen platform. Each unresolved complaint is a known point of failure in the stormwater network — but the complaints are routed for *cleanup*, never aggregated as a *flood-risk signal*.
3. **Rainfall and infrastructure data live in separate silos.** The weather office knows the rain; the health/engineering wing knows which drains are blocked. Nobody joins the two, so "moderate rain" over a ward with six blocked drains looks the same as moderate rain over a ward with clean drains.
4. **Communication is technical and late.** Alerts speak in millimetres and dam gates; residents need "avoid this road after 6 PM, keep medicines ready" — in their own language, hours earlier.

## Current gaps today

- **No hyperlocal warning:** no ward-level product combines rainfall forecasts with the stormwater network's actual condition.
- **No use of complaint density as a leading indicator:** grievance records are an early, free, already-collected proxy for drainage capacity — an untapped signal.
- **No plain-language, local-language advisory layer:** what exists is data (bulletins), not communication (advice a resident can act on).
- **No "insight beyond prediction":** the system that *should* notice that Ward 9 has 8 unresolved drain complaints even when the sky is clear does not exist — so preventable work never gets prioritized before the rain comes.

## Why AI is the right tool

- **Prediction (weak-signal fusion):** combine two individually weak signals — rainfall intensity and complaint density — into one explainable ward-level risk score.
- **Summarization:** municipal complaint text is unstructured; an AI layer can classify and aggregate it (blocked drain, overflowing gutter, silted culvert) into a usable risk input.
- **Communication (generation):** turn a number ("Ward 12, High risk, score 4") into a clear, non-technical advisory a resident can act on — in English and Malayalam.

## SDG alignment

- **Primary — SDG 13 (Climate Action):** strengthen adaptive capacity and early warning against climate-related hazards and extreme rainfall events.
- **SDG 11 (Sustainable Cities & Communities):** reduce deaths/damage caused by urban water-related disasters; make cities inclusive, safe, resilient.
- **SDG 6 (Clean Water & Sanitation):** better stormwater and drainage management in municipal service delivery.

---

*Context references: Kerala State Disaster Management Act framework (SDMA Kerala, sdma.kerala.gov.in); IMD district rainfall forecasting and flash-flood bulletins (mausam.imd.gov.in); K-SMART citizen services platform for Kerala local self-government bodies, launched January 2024 (lsg.kerala.gov.in). Simulated data is used in this prototype — no live integration is claimed.*
