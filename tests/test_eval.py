import unittest

from alignlab.eval import run_evaluation


class TestEvaluation(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.r = run_evaluation()

    def test_reward_model_beats_control(self):
        self.assertGreaterEqual(self.r["reward_holdout_accuracy"], 0.75)
        self.assertLess(self.r["control_holdout_accuracy"], 0.55)

    def test_alignment_gains_true_utility(self):
        gain = self.r["true_utility_after"] - self.r["true_utility_before"]
        self.assertGreater(gain, 2.0)

    def test_control_buys_nothing(self):
        ctrl_gain = self.r["true_utility_control"] - self.r["true_utility_before"]
        self.assertLess(ctrl_gain, 0.2)

    def test_kl_penalty_demonstrably_active(self):
        self.assertLess(self.r["kl_after"], 1.2)
        self.assertGreater(self.r["kl_nokl"], 1.5)
        self.assertGreater(self.r["entropy_after"], 10 * self.r["entropy_nokl"])

    def test_alignment_selects_a_high_utility_style(self):
        # Under the learned reward the policy concentrates on one of the two
        # high-utility correct styles - never the vague, wrong, or toxic ones.
        self.assertIn(self.r["top_style_after"], {"concise-correct", "verbose-correct"})

    def test_determinism(self):
        self.assertEqual(run_evaluation(), self.r)


if __name__ == "__main__":
    unittest.main()
