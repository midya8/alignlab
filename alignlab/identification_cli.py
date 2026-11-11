"""Strict JSON CLI for exact preference identification."""

import argparse
import json
import sys
from pathlib import Path
from .identification import audit
from .identification_input import jsonify
from .identification_verify import verify
from .identification_demo import demo


def load(path):
    raw = Path(path).read_bytes()
    if len(raw) > 8_000_000:
        raise ValueError("8 MB JSON limit")

    def pairs(items):
        out = {}
        for k, v in items:
            if k in out:
                raise ValueError("duplicate JSON key: " + k)
            out[k] = v
        return out

    def reject(value):
        raise ValueError(
            "JSON floats and nonfinite values forbidden; use exact rational strings"
        )

    depth = 0
    quoted = False
    escape = False
    for c in raw.decode("utf-8"):
        if quoted:
            if escape:
                escape = False
            elif c == "\\":
                escape = True
            elif c == '"':
                quoted = False
        elif c == '"':
            quoted = True
        elif c in "[{":
            depth += 1
            if depth > 48:
                raise ValueError("JSON nesting limit 48")
        elif c in "]}":
            depth -= 1
    return json.loads(
        raw, object_pairs_hook=pairs, parse_float=reject, parse_constant=reject
    )


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    subs = p.add_subparsers(dest="command", required=True)
    a = subs.add_parser("audit")
    a.add_argument("input")
    a.add_argument("--output")
    v = subs.add_parser("verify")
    v.add_argument("input")
    v.add_argument("report")
    d = subs.add_parser("demo")
    d.add_argument("--output")
    args = p.parse_args(argv)
    try:
        if args.command == "audit":
            result = jsonify(audit(load(args.input)))
        elif args.command == "verify":
            result = verify(load(args.input), load(args.report))
        else:
            result = demo()
        text = json.dumps(result, indent=2, ensure_ascii=True) + "\n"
        if getattr(args, "output", None):
            Path(args.output).write_text(text, encoding="utf-8")
        else:
            sys.stdout.write(text)
        return 0
    except (ValueError, TypeError, OverflowError, OSError, UnicodeError) as e:
        print("identification: " + str(e), file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
