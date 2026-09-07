"""JalRakshak demo runner.

Runs three spec scenarios (input -> score -> advisory), then scores all six
simulated wards from CSV dataset. Writes plain-text outputs for deck to
output/.
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from advisory import build_llm_prompt, render_advisory, render_malayalam_advisory
from data_loader import load_dataset, ward_snapshot
from risk_engine import score_ward

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "output"

SPEC_SCENARIOS = [
    {
        "name": "Scenario A",
        "ward": "Ward 12",
        "inputs": {"rainfall_mm": 130, "complaint_count": 7, "reservoir_pct": 90},
        "expected": "2 + 1 + 1 = 4 -> High",
    },
    {
        "name": "Scenario B",
        "ward": "Ward 5",
        "inputs": {"rainfall_mm": 60, "complaint_count": 2, "reservoir_pct": 60},
        "expected": "1 + 0 + 0 = 1 -> Low",
    },
    {
        "name": "Scenario C",
        "ward": "Ward 9",
        "inputs": {"rainfall_mm": 40, "complaint_count": 8, "reservoir_pct": 70},
        "expected": "0 + 1 + 0 = 1 -> Low (infrastructure review flag)",
    },
]

BAR = "=" * 72


def run_scenario(sc: dict) -> str:
    r = score_ward(**sc["inputs"], ward_name=sc["ward"])
    advisory_en = render_advisory(r)
    advisory_ml = render_malayalam_advisory(r)
    p = r["points"]
    lines = [
        f"{sc['name']} — {sc['ward']}",
        f"  Input       : rainfall {sc['inputs']['rainfall_mm']} mm / 24 h, "
        f"{sc['inputs']['complaint_count']} drain complaints (7 d), "
        f"reservoir {sc['inputs']['reservoir_pct']}% of danger mark",
        f"  Scoring     : rainfall +{p['rainfall']}, complaints +{p['complaints']}, "
        f"reservoir +{p['reservoir']}",
        f"  Result      : score {r['score']} -> {r['level']} risk"
        + ("  [flag: municipal drain inspection]" if r["infra_review"] else ""),
        f"  Advisory EN : {advisory_en}",
        f"  Advisory ML : {advisory_ml}",
    ]
    return "\n".join(lines)


def run_ward_board(data: dict) -> str:
    lines = ["Live demo board — six simulated wards (today's snapshot)", "-" * 72]
    for w in sorted(data["wards"], key=lambda w: w["ward_id"]):
        snap = ward_snapshot(data, w["ward_id"])
        r = score_ward(
            snap["rainfall_mm"],
            snap["complaint_count"],
            snap["reservoir_pct"],
            ward_name=snap["ward_name"],
            low_lying=snap["low_lying"],
        )
        flag = "  :flag" if r["infra_review"] else ""
        lines.append(
            f"{r['ward']:<28} rain {snap['rainfall_mm']:>5.0f} mm | "
            f"complaints {snap['complaint_count']:>2} | "
            f"score {r['score']} | {r['level']:<6}{flag}"
        )
    lines.append("-" * 72)
    lines.append(f"City reservoir/river context: {data['reservoir_pct']:.0f}% of danger mark")
    lines.append(":flag = drain complaints above threshold with no rainfall signal —")
    lines.append("       ward flagged for municipal inspection (Scenario C behaviour).")
    return "\n".join(lines)


def main() -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)

    blocks = [run_scenario(sc) for sc in SPEC_SCENARIOS]
    data = load_dataset()
    board = run_ward_board(data)
    prompts = [
        f"[LLM prompt layer — {sc['name']}, {sc['ward']}]\n{build_llm_prompt(r)}"
        for sc, r in (
            (
                sc,
                score_ward(**sc["inputs"], ward_name=sc["ward"]),
            )
            for sc in SPEC_SCENARIOS
        )
    ]

    text = (
        f"JalRakshak — AI Flood Early-Warning & Advisory Assistant\n{BAR}\n\n"
        + f"\n\n{BAR}\n\n".join(blocks)
        + f"\n\n{BAR}\n\n{board}\n"
    )
    out = OUTPUT_DIR / "scenarios_output.txt"
    out.write_text(text, encoding="utf-8")
    (OUTPUT_DIR / "advisory_prompts.txt").write_text(
        "\n\n".join(prompts) + "\n", encoding="utf-8"
    )

    print(text)
    print(f"\nWrote {out}")
    print(f"Wrote {OUTPUT_DIR / 'advisory_prompts.txt'}")


if __name__ == "__main__":
    main()
