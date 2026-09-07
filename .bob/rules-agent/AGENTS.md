# AGENTS.md — Agent Mode Rules

This file provides guidance to agents when working with code in this repository.

## Coding Rules (Non-Obvious Only)

**Path insertion is mandatory before any `src/` import.** Both scripts and test files must do `sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))` (or equivalent) before importing `risk_engine`, `advisory`, or `data_loader`. There is no package `__init__.py` and no `pyproject.toml` — stdlib-only, flat import.

**`score_ward()` signature order differs from output dict key names:**
- Call: `score_ward(rainfall_mm, complaint_count, reservoir_pct, ward_name, low_lying)`
- Output keys: `inputs.rainfall_24h_mm`, `inputs.complaints_7d`, `inputs.reservoir_pct_of_danger`
- Do not map output keys directly back to function args without renaming.

**`render_advisory()` has two completely different code paths depending on `level + infra_review`:**
- `Low + infra_review=True` → returns a single-sentence municipal-inspection message (no template).
- All other combinations → uses `_ADVISORY_TEMPLATES[level]` with `.format()`.
- Adding a new risk level or advisory variant requires handling both paths.

**`SCORE_WEIGHTS` dict is the canonical source for point values** — do not hardcode `2` or `1` anywhere in scoring logic; reference `SCORE_WEIGHTS["rain_heavy"]` etc.

**`output/` directory is created at runtime by `run_scenarios.py`** via `OUTPUT_DIR.mkdir(exist_ok=True)`. Do not create it in advance or check for its existence elsewhere.

**`complaint_log` key in the dataset dict is loaded but unused in scoring.** If you implement recency weighting, source from `data["complaint_log"]` (list of dicts with `ward_id`, `days_ago`, `category`, `text`) and replace the flat `data["complaints"]` lookup in `ward_snapshot()`.

**Word "max 5" in the LLM prompt is a hardcoded string**, not computed from `SCORE_WEIGHTS`. If weights change, update [`advisory.py:80`](src/advisory.py) manually.
