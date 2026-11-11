import copy
from fractions import Fraction as F
import itertools
import json
from pathlib import Path
import random
import subprocess
import sys
import tempfile
import unittest
from alignlab.identification import audit
from alignlab.identification_input import jsonify, validate
from alignlab.identification_verify import verify
from alignlab.identification_demo import fixtures, demo


class IdentificationTests(unittest.TestCase):
    def control(self, name="disconnected"):
        return copy.deepcopy(next(f["input"] for f in fixtures() if f["id"] == name))

    def test_every_hand_control(self):
        for f in fixtures():
            with self.subTest(f=f["id"]):
                self.assertTrue(verify(f["input"], audit(f["input"]))["verified"])

    def test_hand_computed_mass(self):
        r = audit(self.control())
        family = r["policy_family"]
        self.assertEqual(r["canonical_merits"], [1, F(1, 2), 1, F(1, 2)])
        self.assertEqual(family["utility_range"]["minimum"], F(2, 15))
        self.assertEqual(family["utility_range"]["maximum"], F(8, 15))
        self.assertEqual(family["component_mass_ranges"][0]["minimum"], F(1, 5))
        self.assertEqual(family["component_mass_ranges"][0]["maximum"], F(4, 5))
        self.assertEqual(family["pair_probability_ranges"][1]["minimum"], F(1, 5))
        self.assertEqual(family["pair_probability_ranges"][1]["maximum"], F(4, 5))

    def test_all_observed_probabilities_identical(self):
        r = audit(self.control())
        self.assertEqual(
            {tuple(v["edge_probabilities"]) for v in r["policy_family"]["vertices"]},
            {(F(2, 3), F(2, 3))},
        )
        self.assertGreater(
            len({tuple(v["policy"]) for v in r["policy_family"]["vertices"]}), 1
        )

    def test_bridge_identifies(self):
        r = audit(self.control("bridge"))
        self.assertEqual(r["relative_scale_degrees"], 0)
        self.assertTrue(r["policy_family"]["policy_identified_without_bounds"])
        self.assertEqual(
            len({tuple(v["policy"]) for v in r["policy_family"]["vertices"]}), 1
        )

    def test_contradiction_cycle(self):
        r = audit(self.control("cycle_conflict"))
        self.assertFalse(r["consistent"])
        self.assertIsNone(r["policy_family"])
        w = r["cycle_witnesses"][0]
        self.assertEqual(w["vertices"][0], w["vertices"][-1])
        self.assertNotEqual(w["product"], 1)
        mass = F(1)
        for step in w["steps"]:
            mass *= step["odds"]
        self.assertEqual(mass, w["product"])

    def test_redundant_cycle(self):
        x = self.control("cycle_consistent")
        r = audit(x)
        x["comparisons"].pop()
        s = audit(x)
        self.assertTrue(r["consistent"])
        self.assertEqual(
            [v["policy"] for v in r["policy_family"]["vertices"]],
            [v["policy"] for v in s["policy_family"]["vertices"]],
        )

    def test_fixed_bounds_not_identification(self):
        r = audit(self.control("frozen_bounds"))
        self.assertFalse(r["policy_family"]["policy_identified_without_bounds"])
        self.assertEqual(len(r["policy_family"]["vertices"]), 1)

    def test_equal_utility(self):
        f = audit(self.control("same_utility"))["policy_family"]
        self.assertEqual(f["utility_range"]["minimum"], 7)
        self.assertEqual(f["utility_range"]["maximum"], 7)

    def test_isolated_and_all_corners(self):
        self.assertEqual(audit(self.control("isolated"))["components"][1]["items"], [2])
        self.assertEqual(
            len(audit(self.control("six_components"))["policy_family"]["vertices"]), 64
        )

    def test_tiny_mass_exact(self):
        f = audit(self.control("tiny_mass"))["policy_family"]
        self.assertGreater(f["action_mass_ranges"][0]["minimum"], 0)
        self.assertLess(f["action_mass_ranges"][0]["maximum"], F(1, 2**120))

    def test_endpoint_reversal_and_permutation(self):
        x = self.control()
        expected = jsonify(audit(x))
        x["comparisons"].reverse()
        for e in x["comparisons"]:
            e["left"], e["right"] = e["right"], e["left"]
            e["probability"] = str(1 - F(e["probability"]))
        self.assertEqual(jsonify(audit(x)), expected)

    def test_random_graphs_all_simple_paths(self):
        rng = random.Random(7103)
        for _ in range(100):
            n = rng.randrange(1, 7)
            u = [F(rng.randrange(1, 10), rng.randrange(1, 10)) for _ in range(n)]
            edges = [
                {"left": a, "right": b, "probability": str(u[a] / (u[a] + u[b]))}
                for a in range(n)
                for b in range(a + 1, n)
                if rng.random() < 0.45
            ]
            reach = [{i} for i in range(n)]
            for e in edges:
                combined = reach[e["left"]] | reach[e["right"]]
                for i in combined:
                    reach[i] = combined
            count = len({tuple(sorted(s)) for s in reach})
            x = {
                "items": list("ABCDEF")[:n],
                "reference": [str(F(1, n))] * n,
                "comparisons": edges,
                "scale_bounds": [["1/3", "7/2"]] * count,
                "utility": [rng.randrange(-5, 6) for _ in range(n)],
            }
            r = audit(x)
            self.assertTrue(r["consistent"])
            verify(x, r)
            # Interior rational points must remain within corner extrema.
            f = r["policy_family"]
            scales = [F(rng.randrange(2, 8), 3) for _ in range(count)]
            weights = [
                F(x["reference"][i])
                * r["canonical_merits"][i]
                * scales[r["component_of"][i]]
                for i in range(n)
            ]
            p = [w / sum(weights) for w in weights]
            for value, bound in zip(p, f["action_mass_ranges"]):
                self.assertLessEqual(bound["minimum"], value)
                self.assertLessEqual(value, bound["maximum"])
            value = sum(a * b for a, b in zip(p, x["utility"]))
            self.assertLessEqual(f["utility_range"]["minimum"], value)
            self.assertLessEqual(value, f["utility_range"]["maximum"])

    def test_all_small_graph_supports(self):
        pairs = list(itertools.combinations(range(4), 2))
        for mask in range(64):
            edges = [
                {"left": a, "right": b, "probability": str(F(a + 1, a + b + 2))}
                for i, (a, b) in enumerate(pairs)
                if mask >> i & 1
            ]
            x = self.control()
            x["comparisons"] = edges
            for c in range(1, 5):
                x["scale_bounds"] = [["1", "4"]] * c
                try:
                    r = audit(x)
                except ValueError:
                    continue
                verify(x, r)
                break
            else:
                self.fail("no component count accepted")

    def test_random_inconsistent_graphs(self):
        rng = random.Random(1244)
        for _ in range(100):
            n = rng.randrange(3, 7)
            edges = [
                {"left": a, "right": b, "probability": str(F(rng.randrange(1, 9), 10))}
                for a in range(n)
                for b in range(a + 1, n)
                if b == a + 1 or rng.random() < 0.6
            ]
            x = {
                "items": list("ABCDEF")[:n],
                "reference": [str(F(1, n))] * n,
                "comparisons": edges,
                "scale_bounds": [["1", "4"]],
                "utility": [1] * n,
            }
            r = audit(x)
            verify(x, r)
            for w in r["cycle_witnesses"]:
                self.assertEqual(w["vertices"][0], w["vertices"][-1])
                self.assertNotEqual(w["product"], 1)

    def test_every_report_leaf_tamper_rejected(self):
        x = self.control()
        r = jsonify(audit(x))
        paths = []

        def leaves(v, path=()):
            if isinstance(v, dict):
                for k, w in v.items():
                    leaves(w, path + (k,))
            elif isinstance(v, list):
                for k, w in enumerate(v):
                    leaves(w, path + (k,))
            else:
                paths.append(path)

        leaves(r)
        for path in paths:
            bad = copy.deepcopy(r)
            node = bad
            for k in path[:-1]:
                node = node[k]
            old = node[path[-1]]
            node[path[-1]] = (
                not old
                if isinstance(old, bool)
                else old + 1 if type(old) is int else "tampered"
            )
            with self.assertRaises(ValueError):
                verify(x, bad)

    def test_strict_report_types_fields_order(self):
        x = self.control()
        r = jsonify(audit(x))
        for modify in [
            lambda z: z.update(extra=1),
            lambda z: z.pop("beta"),
            lambda z: z.update(beta=True),
            lambda z: z["policy_family"]["vertices"].reverse(),
        ]:
            bad = copy.deepcopy(r)
            modify(bad)
            with self.assertRaises(ValueError):
                verify(x, bad)

    def test_strict_invalid_inputs(self):
        bads = []
        for value in [True, 0.5, "nan", "1/0", "1e3", "1/2x", "1" * 170]:
            x = self.control()
            x["reference"][0] = value
            bads.append(x)
        for value in ["0", "1", "-1", "3/2"]:
            x = self.control()
            x["comparisons"][0]["probability"] = value
            bads.append(x)
        for edit in [
            lambda x: x.update(extra=1),
            lambda x: x["items"].__setitem__(1, "A"),
            lambda x: x["reference"].__setitem__(0, "0"),
            lambda x: x["reference"].__setitem__(0, "1/2"),
            lambda x: x["comparisons"].append(x["comparisons"][0]),
            lambda x: x["comparisons"][0].update(left=True),
            lambda x: x["scale_bounds"].__setitem__(0, ["4", "1"]),
            lambda x: x["scale_bounds"].pop(),
        ]:
            x = self.control()
            edit(x)
            bads.append(x)
        for x in bads:
            with self.assertRaises((ValueError, TypeError)):
                audit(x)

    def test_cli_round_trip_and_rejections(self):
        with tempfile.TemporaryDirectory() as d:
            path = Path(d) / "input.json"
            out = Path(d) / "report.json"
            path.write_text(json.dumps(self.control()))

            def run(*args):
                return subprocess.run(
                    [
                        sys.executable,
                        "-m",
                        "alignlab.identification_cli",
                        *map(str, args),
                    ],
                    text=True,
                    capture_output=True,
                )

            self.assertEqual(run("audit", path, "--output", out).returncode, 0)
            self.assertEqual(run("verify", path, out).returncode, 0)
            self.assertEqual(len(json.loads(run("demo").stdout)), 12)
            for text in [
                '{"a":1,"a":2}',
                '{"a":1,"\\u0061":2}',
                '{"a":0.1}',
                '{"a":NaN}',
                "[" * 49 + "]" * 49,
            ]:
                path.write_text(text)
                result = run("audit", path)
                self.assertEqual(result.returncode, 2)
                self.assertEqual(result.stdout, "")


if __name__ == "__main__":
    unittest.main()
