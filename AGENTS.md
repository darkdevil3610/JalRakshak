# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands

```bash
# Run all tests (stdlib unittest — no pytest)
python -m unittest discover -s tests -v

# Run a single test class
python -m unittest tests.test_risk_engine.ScoringRulesTest -v

# Run a single test method
python -m unittest tests.test_risk_engine.SpecScenariosTest.test_scenario_a_high -v

# Run the full demo (writes output/ files, prints to stdout)
python src/run_scenarios.py
```

## Critical Non-Obvious Patterns

**`sys.path.insert` is required in every test file and `run_scenarios.py`.**  
Neither `src/` nor the project root is on `sys.path` automatically. Both test files and scripts must insert their own path before importing from `src/`. See [`tests/test_risk_engine.py:12`](tests/test_risk_engine.py) and [`src/run_scenarios.py:13`](src/run_scenarios.py). Forgetting this causes silent `ModuleNotFoundError`.

**All thresholds are strict inequalities (`>`, not `>=`)** — except the rainfall moderate band which uses `>=` at 50 mm.  
- `rainfall_mm > 100` → +2 (100.0 itself gives +1)  
- `complaint_count > 5` → +1 (5 gives 0)  
- `reservoir_pct > 80` → +1 (80.0 gives 0)  
Boundary tests in [`tests/test_risk_engine.py`](tests/test_risk_engine.py) lock these exactly.

**`score_ward()` takes positional args in order `(rainfall_mm, complaint_count, reservoir_pct)`** — not keyword order matching the dict keys. The input dict keys are `rainfall_24h_mm` / `complaints_7d` / `reservoir_pct_of_danger`; the function params are `rainfall_mm` / `complaint_count` / `reservoir_pct`.

**`data_loader.py` applies a single city-wide reservoir value (max of all gauges) to every ward equally.** `ward_snapshot()` passes `data["reservoir_pct"]` uniformly — there is no ward-to-river spatial mapping.

**`complaints_log.csv` is loaded by `load_dataset()` but never used in scoring.** It is a placeholder for future recency-weighted complaint scoring. Do not assume it affects risk output.

**`infra_review` flag is set only when `comp_pts > 0 AND rain_pts == 0`.** A ward with complaints=6 AND rainfall=130 mm scores High but `infra_review=False`. The flag is weather-independent infrastructure signal only.

**`render_advisory()` has a special branch for `Low + infra_review=True`** that bypasses the template entirely and returns a municipal-inspection message. Medium/High ignore `infra_review`.

## Code Style

- **`from __future__ import annotations`** on every module (already consistent).
- All modules are stdlib-only — no third-party dependencies, no `requirements.txt`.
- Constants are module-level `UPPER_CASE` floats/ints; `SCORE_WEIGHTS` dict is the single source of truth for point values.
- `score_ward()` returns a plain `dict` (not a dataclass). All downstream code (advisory, tests, runner) uses string keys.
- No type annotations on return values — only on function parameters where non-obvious.
- Tests use `unittest.TestCase`, not pytest. `assertEqual`, `assertTrue`, `assertIn`, `assertFalse` — no pytest assertions.
