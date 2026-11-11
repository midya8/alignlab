# Exact preference identification, not finite-sample estimation

The [v0.3 browser inspector](https://midya8.github.io/alignlab/identification.html) is an additive control beside the [original learned experiment and binary64 optimizer frontier](https://midya8.github.io/alignlab/). Original training, data, 1,005 trajectory states, floating evaluator and gate thresholds are unchanged.

## The question

Solving a supplied reward objective does not establish that its target was identified by the available comparisons. This inspector takes exact **population probabilities** under a finite Bradley-Terry model. It does not estimate them from win counts. It reconstructs what the observed edges fix, rejects contradictory cycle odds, and enumerates the policy ambiguity left between disconnected components.

This is a small exact implementation of standard Bradley-Terry and Gibbs results, not a new alignment algorithm, a statistical inference procedure or evidence about a language model.

## Equations and scope

For positive merits `u[i]`, the probability that item `a` beats `b` is

```
p[a,b] = u[a] / (u[a] + u[b])
o[a,b] = p[a,b] / (1 - p[a,b]) = u[a] / u[b]
r[i] = log u[i]
```

Every given probability is strictly between zero and one. Orient each edge by increasing item index. Set the smallest-index anchor in each undirected support component to merit 1 and propagate the odds ratios. A scalar reward exists for these exact inputs iff every closed cycle's directed odds product is 1. Every input edge is checked against the reconstructed merits. A failed edge returns the two anchor paths and that edge as a concrete closed cycle with product different from 1. Inconsistent inputs return no policy family and null scale-dimension fields. The displayed propagation potentials in that case are provisional, not a valid fit.

In a consistent component `c`, every feasible merit is `s[c] * canonical_u[i]` for one arbitrary positive scale. Equivalently, the rewards have an arbitrary additive offset per component. Connected pairs are identified; cross-component pairs are not. With `C` components, there are `C - 1` free relative scales after quotienting by a common scale. No edges is a valid input: each item is its own component.

Fix **beta = 1** and a strictly positive reference `q` with exact sum 1. The Gibbs optimum is

```
pi[i] = q[i] * s[c(i)] * canonical_u[i] / sum_j q[j] * s[c(j)] * canonical_u[j]
Z[c] = sum_{i in c} q[i] * canonical_u[i]
pi[i | c] = q[i] * canonical_u[i] / Z[c]
```

The conditional policy within each component is identified, but its total mass need not be. With no scale bounds, any strictly positive component-mass vector is attainable: choose `s[c]` proportional to desired mass divided by `Z[c]`. Boundary zero masses are limits, not attained for positive finite scales. With one component, the global scale cancels and the policy is unique, including the one-item/no-edge case.

Beta 1 is a deliberate exact-rational restriction. For general beta, `u[i] ** (1/beta)` need not be rational. The existing floating frontier still supports its own beta contract; it is not silently reused here as an exact calculation. Zero reference support is rejected rather than silently dropping actions.

## Assumed scale box and exhaustive witnesses

The user supplies one positive finite rational interval `[lower, upper]` per component. Components are ordered by their smallest item index; bounds refer to that anchor's merit and are therefore anchor dependent. These bounds are extra assumptions, not estimates, priors fitted to data or confidence intervals. Bounds fixed to one number can collapse the bounded policy range without identifying it from the graph.

All corners of this box are enumerated in lexicographic lower/upper order, with a single choice for equal endpoints. At most six components yield at most 64 corners. Duplicate policies and every tied extremizing corner ID are retained.

Every action mass, component mass and supplied expected utility is a linear-fractional function of the scales with positive denominator. Holding the other scales fixed gives `(a*s+b)/(c*s+d)` with derivative sign determined by `a*d-b*c`, independent of `s`. Move that coordinate to an endpoint without worsening the objective, then repeat for every coordinate. Thus some box corner attains each extremum. This proves exhaustiveness for these quantities, not an arbitrary nonlinear statistic or all policies inside the family.

For cross-component pairs `a,b`, the probability minimum occurs at `s[a]=lower[a]`, `s[b]=upper[b]`, and the maximum at the reversed choices. Same-component scales cancel. The producer additionally checks the enumerated pair extrema against these closed forms. The reference evaluator obtains them solely from its separately enumerated corner merits.

Supplied `utility` is an evaluation axis. It does not alter the policy. There is no claim that it measures human utility, nor that the bounds describe statistical uncertainty.

## Hand controls

Twelve complete controls are frozen in `docs/identification-data.js`. `scripts/regenerate_identification.py --check` reconstructs and independently verifies every report before requiring byte equality.

The main disconnected example has uniform reference on A/B/C/D, observed `p(A > B) = p(C > D) = 2/3`, canonical merits `(1, 1/2, 1, 1/2)`, both component scales in `[1, 4]`, and utility `(1, 0, 0, 0)`.

| Corner | Component scales | Complete policy | Supplied utility |
|---|---|---|---|
| 0 | `(1, 1)` | `(1/3, 1/6, 1/3, 1/6)` | `1/3` |
| 1 | `(1, 4)` | `(2/15, 1/15, 8/15, 4/15)` | `2/15` |
| 2 | `(4, 1)` | `(8/15, 4/15, 2/15, 1/15)` | `8/15` |
| 3 | `(4, 4)` | `(1/3, 1/6, 1/3, 1/6)` | `1/3` |

Every corner preserves both observed probabilities exactly. First-component mass ranges from `1/5` to `4/5`. Adding population-probability bridge `p(B > C)=1/2` makes one connected component and identifies the policy up to a global scale. It is an exact information intervention in this specified model, not a claim that one noisy empirical outcome identifies it.

Other controls retain a contradictory odds cycle, a redundant consistent edge, an isolated response, no edges, constant utility despite policy ambiguity, fixed assumed scales, a skew reference, all 64 corners, a tiny positive `2^-128` reference mass and one item. The consistent controls have 107 total corner records; duplicate policies are intentionally retained.

## Schema and strict input

```
{
  "items": ["A", "B", "C", "D"],
  "reference": ["1/4", "1/4", "1/4", "1/4"],
  "comparisons": [
    {"left": 0, "right": 1, "probability": "2/3"},
    {"left": 2, "right": 3, "probability": "2/3"}
  ],
  "scale_bounds": [["1", "4"], ["1", "4"]],
  "utility": [1, 0, 0, 0]
}
```

One to six unique ASCII-alphanumeric item names, each 1 to 16 characters. Zero-based distinct integer endpoints. No repeated unordered edge, even reversed. Exact integers, fractions or finite decimal strings, no JSON floating numbers, exponent strings, nonfinite values, booleans masquerading as numbers, unknown fields or zero/negative denominators. Rational strings are at most 160 characters, reduced numerator/denominator at most 512 bits. Reference probabilities are positive and sum exactly to 1. Bound rows match the discovered component count, not the item count. The CLI rejects duplicate JSON keys, including escaped spellings, input above 8 MB and nesting beyond 48 levels. The browser parser additionally requires JSON integers within its safe integer range; use rational strings for larger values. Its input text limit counts JavaScript code units. Internal exact arithmetic is not rounded to these input limits.

Reports use schema `alignlab-identification-v1`. Every rational output is a reduced rational string; graph indices/counts remain JSON integers. The complete input is normalized and included. Reports contain canonical merits and anchor paths, every constraint, every contradictory closed cycle, graph component IDs and bounds, and either `policy_family: null` or the complete conditional policy, all corner merits/policies/component masses/observed probabilities/utility values, all action/component/utility extrema with every tie ID, and every item-pair probability range. The producer is deterministic. Tie order and duplicate witness records are part of the schema.

## Independent checks and reproduction

`identification.py` uses breadth-first propagation and closed-form pair bounds. `identification_verify.py` shares only input/rational serialization primitives, enumerates every simple path, independently discovers components, selects shortest lexicographic anchor paths, checks all path ratios, and rebuilds every report field from separately generated corners. It does not call the producer. Verification checks exact types, keys, lengths, order and values, not just a checksum or selected fields. Tests alter every leaf of the main report and require rejection.

The BigInt browser engine is a third implementation with its own input parser, rational arithmetic, all-simple-path construction and full corner enumeration. It does not read a fixture report to compute a result. Node checks every field against all 12 Python reports. Actual Chrome tests select all 107 corners, exercise a trusted edit that immediately invalidates stale output, recover after invalid input, perform two actual file downloads and inspect 36 fixture/viewport layouts at widths 320, 390 and 1280.

```bash
python -m unittest discover -s tests -v
PYTHONPATH=. python scripts/regenerate_identification.py --check
python -m alignlab.identification_cli demo --output controls.json
python -m alignlab.identification_cli audit input.json --output report.json
python -m alignlab.identification_cli verify input.json report.json
node --test tests/test_frontier.cjs tests/test_frontier_browser.cjs \
  tests/test_identification.cjs tests/test_identification_browser.cjs
bash examples/verify_wheel.sh
```

65 Python tests, including all 47 existing tests and 18 identification tests. Eight Node/Chrome tests, including all four existing tests. Python 3.10+ and the standard library suffice at runtime. The installed-wheel check reconstructs the old learned fixture and all 1,005 states, runs original gates and frontier CLI, then reconstructs all exact identification reports and verifies every installed CLI round trip outside the checkout.

## Important non-equivalences

- Connected undirected comparison **support** identifies population relative merits under this model. Strong connectivity of a directed finite win graph concerns existence of a finite-sample unpenalized MLE. This inspector only answers the former.
- A regularizer or a prior can select a fitted target where the observations leave ambiguity. Selection is not identification by those observations.
- Inconsistent exact probabilities admit no scalar merit fit. A finite empirical win fraction need not satisfy exact cycle consistency even when its population model does.
- An exact Gibbs policy solves the supplied reward objective. It does not prove that the reward or policy represents human preferences beyond the specified comparisons.

## Sources

1. Rafailov et al., [Direct Preference Optimization](https://arxiv.org/abs/2305.18290), sections 4 and 5.1: reward equivalence and Gibbs mapping.
2. Li et al., [l-infinity bounds under general comparison graphs](https://ar5iv.labs.arxiv.org/html/2110.10825): population identification and distinct MLE conditions.
3. Kaye and Firth, [official BradleyTerryScalable vignette](https://ellakaye.github.io/BradleyTerryScalable/articles/BradleyTerryScalable.html): directed connectivity, MLE and MAP distinctions.
4. Butler and Whelan, [existence of maximum-likelihood estimates](https://arxiv.org/abs/math/0412232): separation and boundary behavior.
5. Vojnovic et al., [convergence rates of gradient descent and MM](https://proceedings.mlr.press/v108/vojnovic20a/vojnovic20a.pdf), AISTATS 2020: separate optimization convergence and data-graph conditions.
6. Ting Yan, [ranking when strong connection fails](https://arxiv.org/abs/1411.1168): explicit directed strong-connection condition and a different penalized model.

The component-scale, box-extremum and cycle-certificate formulas above are derived explicitly so the implementation need not rely on a paper's shorthand graph terminology.
