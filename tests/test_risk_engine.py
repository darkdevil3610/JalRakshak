"""Lock the MVP spec: scoring rules, classification, and scenarios A/B/C.

Run with: python -m unittest discover -s tests -v   (stdlib only, no pytest)
"""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from advisory import build_llm_prompt, render_advisory
from risk_engine import classify, complaint_points, rainfall_points, reservoir_points, score_ward


class ScoringRulesTest(unittest.TestCase):
    def test_rainfall_points_boundaries(self):
        self.assertEqual(rainfall_points(40), 0)
        self.assertEqual(rainfall_points(50), 1)      # 50-100 band -> +1
        self.assertEqual(rainfall_points(100), 1)     # +2 needs strictly above 100
        self.assertEqual(rainfall_points(100.5), 2)
        self.assertEqual(rainfall_points(130), 2)

    def test_complaint_threshold_is_strict(self):
        self.assertEqual(complaint_points(5), 0)
        self.assertEqual(complaint_points(6), 1)

    def test_reservoir_threshold_is_strict(self):
        self.assertEqual(reservoir_points(80), 0)
        self.assertEqual(reservoir_points(81), 1)

    def test_classification_bands(self):
        self.assertEqual(classify(0), "Low")
        self.assertEqual(classify(1), "Low")
        self.assertEqual(classify(2), "Medium")
        self.assertEqual(classify(3), "Medium")
        self.assertEqual(classify(4), "High")
        self.assertEqual(classify(5), "High")


class SpecScenariosTest(unittest.TestCase):
    def test_scenario_a_high(self):
        r = score_ward(130, 7, 90, ward_name="Ward 12")
        self.assertEqual(r["points"], {"rainfall": 2, "complaints": 1, "reservoir": 1})
        self.assertEqual(r["score"], 4)
        self.assertEqual(r["level"], "High")
        self.assertFalse(r["infra_review"])
        a = render_advisory(r)
        self.assertTrue(a.startswith("High flood risk in Ward 12"))
        self.assertIn("Avoid travel through low-lying areas", a)

    def test_scenario_b_low(self):
        r = score_ward(60, 2, 60, ward_name="Ward 5")
        self.assertEqual(r["points"], {"rainfall": 1, "complaints": 0, "reservoir": 0})
        self.assertEqual(r["score"], 1)
        self.assertEqual(r["level"], "Low")
        self.assertTrue(render_advisory(r).startswith("Low flood risk in Ward 5"))

    def test_scenario_c_low_with_infra_flag(self):
        r = score_ward(40, 8, 70, ward_name="Ward 9")
        self.assertEqual(r["points"], {"rainfall": 0, "complaints": 1, "reservoir": 0})
        self.assertEqual(r["score"], 1)
        self.assertEqual(r["level"], "Low")
        self.assertTrue(r["infra_review"])
        a = render_advisory(r)
        self.assertIn("Low rainfall risk", a)
        self.assertIn("municipal inspection", a)


class AdvisoryLayerTest(unittest.TestCase):
    def test_medium_result(self):
        r = score_ward(110, 2, 60, ward_name="Ward 15")
        self.assertEqual(r["level"], "Medium")
        self.assertIn("Medium flood risk", render_advisory(r))

    def test_llm_prompt_shape(self):
        p = build_llm_prompt(score_ward(130, 7, 90, ward_name="Ward 12"))
        self.assertIn("Risk level: HIGH (score 4 of max 5)", p)
        self.assertIn("EN:", p)
        self.assertIn("ML:", p)


if __name__ == "__main__":
    unittest.main()
