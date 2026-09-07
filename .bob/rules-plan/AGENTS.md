# AGENTS.md — Plan Mode Rules

This file provides guidance to agents when working with code in this repository.

## Architectural Constraints (Non-Obvious Only)

**The reservoir score is intentionally city-wide, not ward-specific.** `data_loader.load_dataset()` computes one `reservoir_pct` as `max()` across all river gauge rows and passes it to every ward uniformly. Any plan that adds per-ward reservoir scores must add a `river_id` foreign key to `wards.csv` and change `ward_snapshot()`.

**`score_ward()` is deliberately stateless and side-effect-free.** It receives primitives only and returns a plain dict. No I/O, no global state. This is a constraint to preserve, not a gap to fill.

**`render_advisory()` and `build_llm_prompt()` share the same input contract** (a `score_ward()` result dict) but are not interchangeable for all cases. `render_advisory()` handles the `infra_review + Low` special case with custom copy. `build_llm_prompt()` injects an inline NOTE instead. Any new advisory path must handle both functions.

**The three spec scenarios (A/B/C) are locked by unit tests** in [`tests/test_risk_engine.py`](tests/test_risk_engine.py). Any threshold change that makes a scenario produce a different level will break `SpecScenariosTest`. The tests are the contract, not advisory documentation.

**There is no database, no persistence layer, and no event loop.** The system is a single-pass batch script. Any plan for real-time alerts, polling, or scheduling must introduce these from scratch — there is no existing framework to extend.

**Adding real LLM API integration requires a fallback path.** The template engine (`render_advisory`) must remain the fallback for any LLM call failure. The two-function design in `advisory.py` is the right structure for this; do not merge them.

**`complaints_log.csv` is the only data structure that supports recency-weighted scoring,** but it requires replacing the flat pre-aggregated `complaints.csv` lookup in `ward_snapshot()`. Both cannot be active simultaneously without a flag to choose the aggregation method.
