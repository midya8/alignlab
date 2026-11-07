#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== evaluation ==="
python -m alignlab evaluate

echo
echo "=== gates (achievable set: must pass) ==="
python -m alignlab gates --min-reward-accuracy 0.75 --min-true-utility-gain 2.0 \
    --max-kl 1.2 --max-control-gain 0.2 --min-nokl-kl 1.5

echo
echo "=== gates (impossible accuracy bar: must fail) ==="
if python -m alignlab gates --min-reward-accuracy 0.99; then
    echo "ERROR: impossible gate set passed"
    exit 1
else
    echo "impossible gate set failed as expected"
fi
