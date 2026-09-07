# AGENTS.md — Ask Mode Rules

This file provides guidance to agents when working with code in this repository.

## Documentation Context (Non-Obvious Only)

**`docs/ibm_bob_guide.md` contains pre-written paste-ready prompts** for IBM BOB Ask/Plan mode — including the exact architecture review prompt. This is a deliverable for the internship assignment, not developer documentation.

**`output/advisory_prompts.txt` is the LLM prompt artifact** for the deck/presentation. It contains the exact Claude-style prompts for all three spec scenarios, exported by `run_scenarios.py`. It is auto-overwritten on every demo run.

**The "max score is 5" claim appears in docs and the LLM prompt string, but the actual maximum achievable from the scoring rules is 4** (+2 rainfall +1 complaints +1 reservoir). There is no code path that produces 5 with the current thresholds. The discrepancy exists because the spec was written before the `low_lying` flag was decided not to add a score point.

**`docs/ai_workflow.md` contains a Mermaid flowchart** that is the canonical architecture diagram for the project. It is the reference for any presentation or documentation about data flow.

**Simulated data ward IDs (5, 7, 9, 10, 12, 15) are non-contiguous by design** — they simulate real Kochi ward numbering, not a test array. Do not assume sequential IDs anywhere.

**`complaints_log.csv` has real-sounding complaint text** (e.g., "drain blocked near market", "culvert silted up behind school") — this is demo copy for showcasing future NLP classification, not actual data. Do not treat it as a data source for scoring.
