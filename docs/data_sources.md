# Step 2 — Identify the Data Sources

> **Deliverable for the assignment:** what data the assistant would use, and where it would come from in a real deployment. The prototype itself runs on **simulated sample data** — no live access is needed or claimed.

## Data sources at a glance

| # | Input field (prototype) | Real-world source | What it actually publishes | Update cadence |
|---|---|---|---|---|
| 1 | 24-hr rainfall (mm) per ward/district | **India Meteorological Department (IMD)** — mausam.imd.gov.in | 5-day **district-wise rainfall forecast**, quantitative rainfall forecasts (GIS + standard formats), **nowcasts** (very-short-term district/station alerts), **flash flood bulletin**, CAP-CAP alert RSS feed, and an official data supply portal + API (api.imd.gov.in) | Daily + nowcast cycle |
| 2 | River / reservoir level (% of danger mark) | **Kerala State Disaster Management Authority (KSDMA)** — sdma.kerala.gov.in | Daily alert pages for **rainfall, flood, and dam levels**; early-warning sections for **rivers and reservoirs**; hazard maps; district-level IMD rain alerts republished in Malayalam | Daily / event-driven |
| 3 | Drain-blockage complaints (past 7 days, per ward) | **Municipal grievance records via K-SMART** (Kerala Solution for Administrative Reforms and Transformation, LSGD) | Citizen complaint registration for local-body services — drainage, waste, waterlogging — since its launch in **January 2024**; complaints carry ward, category, timestamp, and status (open/resolved) | Continuous (as filed) |
| 4 | Ward boundaries & names | Municipal corporation ward lists (LSGD) | Ward numbers/names, councillor jurisdictions — used only to label outputs | Static |

## Why these three signals

- **Rainfall** = the hazard driver (how much water is coming).
- **Drain complaints** = the drainage capacity signal (how much of it can get away). Each unresolved blockage is a *known failure point* in the stormwater network, reported by residents themselves — a free, already-collected leading indicator.
- **River/reservoir level** = the backdrop condition (how saturated/pressurized the wider system already is).

## Respecting the sources: honest scoping for the prototype

| In the real system (future) | In this MVP (prototype) |
|---|---|
| Pull IMD district forecast/nowcast for the city | `data/rainfall.csv` — simulated 24-hr readings for 6 wards |
| Pull KSDMA river/reservoir bulletins | `data/river_levels.csv` — simulated % of danger level |
| Export anonymized complaint counts by ward/category from K-SMART-style grievance data | `data/complaints.csv` — simulated 7-day drain-blockage reports with short free-text |

This split is deliberate: the assignment's goal is to demonstrate the **AI workflow** (scoring → classification → advisory), and that can be fully demonstrated and evaluated with simulated data. Any real deployment would need a data-sharing agreement with the municipality and IMD/KSDMA access — out of scope for the MVP by design.

## Data dictionary (simulated files)

| File | Field | Type | Example |
|---|---|---|---|
| `wards.csv` | ward_id, ward_name, low_lying | int, str, bool | `12, Kaloor North, true` |
| `rainfall.csv` | ward_id, rainfall_24h_mm | int, float | `12, 130` |
| `complaints.csv` | complaint_id, ward_id, category, days_ago, text | int, int, str, int, str | `1042, 12, drain_blockage, 2, "Water not draining near market road"` |
| `river_levels.csv` | river/reservoir_id, name, pct_of_danger | str, str, float | `RES-01, Thevara Perumanoor canal system, 90` |
