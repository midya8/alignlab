# Complete reproducibility fixtures

`3-frozen.json.gz` holds all original generated response vectors, preference/noise pairs, both trained reward weights, six style rewards/utilities, the unchanged report and all 1,005 trajectory states with native audits. `4-witnesses.json.gz` holds 35 complete native reports including ten arithmetic controls. Neither archive filters failed or adverse outcomes.

Rebuild with `python scripts/regenerate_frontier.py`. Gzip timestamps are fixed to zero; exp/log and float summation may change the numerical bytes across Python/libm versions. Full retraining comparisons use 1e-11 abs/rel, frozen report comparisons 1e-12. See FRONTIER.md for the distinction between the standard exact finite-policy formula and floating calculations.
