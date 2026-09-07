"""JalRakshak risk engine — rule-based ward-level flood risk scoring.

Implements the MVP spec exactly:
  rainfall > 100 mm / 24 h            -> +2
  rainfall 50-100 mm / 24 h           -> +1
  drain complaints > 5 (past 7 days)  -> +1
  reservoir > 80% of danger mark      -> +1
  0-1 Low, 2-3 Medium, 4+ High
plus an infrastructure review flag when complaints exceed the threshold on a
low-rain day (spec Scenario C).
"""

from __future__ import annotations

RAIN_HEAVY_MM = 100.0   # strictly above -> +2
RAIN_MODERATE_MM = 50.0  # 50..100 -> +1
COMPLAINT_THRESHOLD = 5  # strictly above -> +1
RESERVOIR_PCT_THRESHOLD = 80.0  # strictly above -> +1

SCORE_WEIGHTS = {"rain_heavy": 2, "rain_moderate": 1, "complaints": 1, "reservoir": 1}


def rainfall_points(rainfall_mm: float) -> int:
    """+2 heavy (>100mm), +1 moderate (50-100mm), else 0. 100.0 is moderate."""
    if rainfall_mm > RAIN_HEAVY_MM:
        return SCORE_WEIGHTS["rain_heavy"]
    if rainfall_mm >= RAIN_MODERATE_MM:
        return SCORE_WEIGHTS["rain_moderate"]
    return 0


def complaint_points(complaint_count: int) -> int:
    return SCORE_WEIGHTS["complaints"] if complaint_count > COMPLAINT_THRESHOLD else 0


def reservoir_points(pct_of_danger: float) -> int:
    return SCORE_WEIGHTS["reservoir"] if pct_of_danger > RESERVOIR_PCT_THRESHOLD else 0


def classify(score: int) -> str:
    if score >= 4:
        return "High"
    if score >= 2:
        return "Medium"
    return "Low"


def score_ward(
    rainfall_mm: float,
    complaint_count: int,
    reservoir_pct: float,
    ward_name: str = "",
    low_lying: bool = False,
) -> dict:
    """Score one ward. Returns score, level, contributing factors, flags."""
    rain_pts = rainfall_points(rainfall_mm)
    comp_pts = complaint_points(complaint_count)
    res_pts = reservoir_points(reservoir_pct)
    score = rain_pts + comp_pts + res_pts

    factors = []
    if rain_pts == 2:
        factors.append(f"Heavy rainfall ({rainfall_mm:g} mm in 24 h)")
    elif rain_pts == 1:
        factors.append(f"Moderate rainfall ({rainfall_mm:g} mm in 24 h)")
    if comp_pts:
        factors.append(f"{complaint_count} unresolved drain complaints in 7 days")
    if res_pts:
        factors.append(f"Reservoir/river at {reservoir_pct:g}% of danger mark")

    # Scenario C: infrastructure risk visible even with no rainfall signal.
    infra_flag = comp_pts > 0 and rain_pts == 0

    return {
        "ward": ward_name or "(unnamed ward)",
        "low_lying": low_lying,
        "inputs": {
            "rainfall_24h_mm": rainfall_mm,
            "complaints_7d": complaint_count,
            "reservoir_pct_of_danger": reservoir_pct,
        },
        "points": {
            "rainfall": rain_pts,
            "complaints": comp_pts,
            "reservoir": res_pts,
        },
        "score": score,
        "level": classify(score),
        "factors": factors,
        "infra_review": infra_flag,
    }
