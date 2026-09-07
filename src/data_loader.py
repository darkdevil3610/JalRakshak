"""Load the simulated CSV dataset into plain dicts."""

from __future__ import annotations

import csv
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def _rows(name: str) -> list[dict]:
    with open(DATA_DIR / name, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def load_dataset() -> dict:
    wards = [
        {
            "ward_id": int(w["ward_id"]),
            "ward_name": w["ward_name"],
            "low_lying": w["low_lying"].strip().lower() == "true",
        }
        for w in _rows("wards.csv")
    ]
    rainfall = {int(r["ward_id"]): float(r["rainfall_24h_mm"]) for r in _rows("rainfall.csv")}
    complaints = {int(r["ward_id"]): int(r["complaints_7d"]) for r in _rows("complaints.csv")}
    # Highest single source is the "city reservoir/river context" for the demo.
    reservoir = max(
        (float(r["pct_of_danger"]) for r in _rows("river_levels.csv")),
        default=0.0,
    )
    complaint_log = _rows("complaints_log.csv")
    return {
        "wards": wards,
        "rainfall": rainfall,
        "complaints": complaints,
        "reservoir_pct": reservoir,
        "complaint_log": complaint_log,
    }


def ward_snapshot(data: dict, ward_id: int) -> dict:
    """Gather one ward's inputs for score_ward()."""
    ward = next(w for w in data["wards"] if w["ward_id"] == ward_id)
    return {
        "ward_name": f"Ward {ward['ward_id']} ({ward['ward_name']})",
        "low_lying": ward["low_lying"],
        "rainfall_mm": data["rainfall"][ward_id],
        "complaint_count": data["complaints"][ward_id],
        "reservoir_pct": data["reservoir_pct"],
    }
