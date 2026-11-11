"""Regenerate complete frozen exact controls, or check every byte."""

import argparse
import json
from pathlib import Path
from alignlab.identification_demo import demo
from alignlab.identification_verify import verify


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--check", action="store_true")
    a = p.parse_args()
    data = demo()
    for f in data:
        verify(f["input"], f["report"])
    text = (
        "globalThis.AlignLabIdentificationFixtures = "
        + json.dumps(data, indent=2)
        + ";\n"
    )
    path = Path(__file__).resolve().parents[1] / "docs" / "identification-data.js"
    if a.check:
        if path.read_text() != text:
            raise SystemExit("identification fixtures differ")
    else:
        path.write_text(text)
    print(str(len(data)) + " complete independently verified identification controls")


if __name__ == "__main__":
    main()
