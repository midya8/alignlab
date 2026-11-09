# AlignLab design

Goal: preference-based alignment from scratch, dependency-free, every claim measured.

Components:
- data.py: synthetic response fixture. Responses are synthetic feature vectors in K styles;
  a latent utility function over interpretable features (helpfulness, verbosity,
  toxicity...) generates pairwise preference labels with Bradley-Terry noise
  from a fixed seed.
- reward.py: linear reward model r(x) = w . phi(x) trained on pairs with the
  Bradley-Terry logistic loss; gradient derived by hand:
  dL/dw = -(phi_c - phi_r) * sigmoid(-(r_c - r_r)).
- policy.py: categorical policy over the K styles with exact softmax; aligned by
  gradient ascent on J = E_pi[r] - beta * KL(pi || ref) with BOTH terms computed
  in closed form (no sampling), and the exact policy gradient
  dJ/dtheta = E_pi[(r - beta (log pi - log ref + 1)) . d log pi/dtheta]
  derived by hand. Entropy, KL and expected reward reported at every step.
- eval.py: reward-model holdout accuracy, pre/post expected reward, KL, and a
  negative control trained on utility-independent labels; all actual outcomes remain visible.
- cli.py: evaluate + gates in both directions.

Bounds: no PPO, no transformers, no network. The alignment mechanics - preference
modeling, KL-regularized reward maximization, the exact KL cost - are the point;
the README says what real RLHF adds.

Additive v0.2: frontier.py provides the standard finite-support Gibbs optimum and bracketed KL-budget diagnostic; frontier_report.py owns bounded schema/strict JSON; frontier_fixtures.py reconstructs unchanged original training and full trajectories; frontier_witnesses.py records complete native/browser checks. See FRONTIER.md for exact mathematical questions, floating limits, original stale-prose correction and attribution.
