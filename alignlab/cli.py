"""Run the experiment, inspect reports and check supplied thresholds."""

from __future__ import annotations

import argparse
import json
import sys

from .eval import format_terminal, run_evaluation


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(
        prog="alignlab",
        description="Preference-based alignment from scratch with measured reward accuracy, KL cost, and policy gain.")
    sub = parser.add_subparsers(dest="command", required=True)

    p_eval = sub.add_parser("evaluate")
    p_eval.add_argument("--format", choices=("terminal", "json"), default="terminal")

    p_gate = sub.add_parser("gates")
    p_gate.add_argument("--min-reward-accuracy", type=float, default=None)
    p_gate.add_argument("--min-true-utility-gain", type=float, default=None)
    p_gate.add_argument("--max-kl", type=float, default=None)
    p_gate.add_argument("--max-control-gain", type=float, default=None,
                        help="the label-shuffled control's true-utility gain must stay below this")
    p_gate.add_argument("--min-nokl-kl", type=float, default=None,
                        help="require at least this measured KL in the beta=0 comparison")

    p_front = sub.add_parser('frontier-audit', help='audit a bounded finite-policy JSON file')
    p_front.add_argument('input')
    p_demo = sub.add_parser('frontier-demo', help='reproduce original training and full trajectories')
    p_demo.add_argument('output')
    args = parser.parse_args(argv)
    if args.command == 'frontier-audit':
        from pathlib import Path
        from .frontier_report import parse_json, report
        try:
            payload = parse_json(Path(args.input).read_bytes())
            print(json.dumps(report(payload), sort_keys=True, allow_nan=False))
            return 0
        except (OSError, ValueError, UnicodeError) as exc:
            print('Cannot audit: ' + str(exc), file=sys.stderr)
            return 2
    if args.command == 'frontier-demo':
        from .frontier_fixtures import write_fixture
        try:
            value = write_fixture(args.output)
            print(json.dumps({'schema': value['schema'], 'runs': len(value['runs']),
                              'states': sum(len(r['trajectory']) for r in value['runs'].values()),
                              'original_report': value['original_report']}, sort_keys=True, allow_nan=False))
            return 0
        except (OSError, ValueError) as exc:
            print('Cannot reproduce: ' + str(exc), file=sys.stderr)
            return 2
    results = run_evaluation()

    if args.command == "evaluate":
        print(json.dumps(results, indent=2, sort_keys=True) if args.format == "json"
              else format_terminal(results))
        return 0

    failures = []
    if args.min_reward_accuracy is not None and results["reward_holdout_accuracy"] < args.min_reward_accuracy:
        failures.append(f"reward accuracy {results['reward_holdout_accuracy']:.4f} < required {args.min_reward_accuracy}")
    gain = results["true_utility_after"] - results["true_utility_before"]
    if args.min_true_utility_gain is not None and gain < args.min_true_utility_gain:
        failures.append(f"true utility gain {gain:.4f} < required {args.min_true_utility_gain}")
    if args.max_kl is not None and results["kl_after"] > args.max_kl:
        failures.append(f"KL paid {results['kl_after']:.4f} > allowed {args.max_kl}")
    ctrl_gain = results["true_utility_control"] - results["true_utility_before"]
    if args.max_control_gain is not None and ctrl_gain > args.max_control_gain:
        failures.append(f"control true-utility gain {ctrl_gain:.4f} > allowed {args.max_control_gain} "
                        "(a reward model trained on shuffled labels should not buy utility)")
    if args.min_nokl_kl is not None and results["kl_nokl"] < args.min_nokl_kl:
        failures.append(f"beta=0 KL {results['kl_nokl']:.4f} < required {args.min_nokl_kl} "
                        "(KL penalty no longer demonstrably doing its job)")

    print(format_terminal(results))
    if failures:
        print("\nGATE FAILURES:")
        for f in failures:
            print(f"  - {f}")
        return 1
    print("\nAll gates passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
