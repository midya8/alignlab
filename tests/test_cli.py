import io
import json
import unittest
from contextlib import redirect_stdout

from alignlab.cli import main


def run_cli(*argv):
    buf = io.StringIO()
    with redirect_stdout(buf):
        code = main(list(argv))
    return code, buf.getvalue()


class TestCli(unittest.TestCase):
    def test_evaluate_terminal(self):
        code, out = run_cli("evaluate")
        self.assertEqual(code, 0)
        self.assertIn("Reward model holdout accuracy", out)

    def test_evaluate_json(self):
        code, out = run_cli("evaluate", "--format", "json")
        data = json.loads(out)
        self.assertGreaterEqual(data["reward_holdout_accuracy"], 0.75)

    def test_achievable_gates_pass(self):
        code, out = run_cli("gates", "--min-reward-accuracy", "0.75",
                            "--min-true-utility-gain", "2.0", "--max-kl", "1.2",
                            "--max-control-gain", "0.2", "--min-nokl-kl", "1.5")
        self.assertEqual(code, 0)
        self.assertIn("All gates passed", out)

    def test_impossible_accuracy_gate_fails(self):
        code, out = run_cli("gates", "--min-reward-accuracy", "0.99")
        self.assertEqual(code, 1)
        self.assertIn("GATE FAILURES", out)

    def test_control_gate_bites_when_control_gains(self):
        code, out = run_cli("gates", "--max-control-gain", "-1.0")
        self.assertEqual(code, 1)
        self.assertIn("control", out)


if __name__ == "__main__":
    unittest.main()
