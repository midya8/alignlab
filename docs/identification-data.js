globalThis.AlignLabIdentificationFixtures = [
  {
    "id": "disconnected",
    "title": "Same observed preferences, different policies",
    "input": {
      "items": [
        "A",
        "B",
        "C",
        "D"
      ],
      "reference": [
        "1/4",
        "1/4",
        "1/4",
        "1/4"
      ],
      "comparisons": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3"
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3"
        }
      ],
      "scale_bounds": [
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        1,
        0,
        0,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C",
          "D"
        ],
        "reference": [
          "1/4",
          "1/4",
          "1/4",
          "1/4"
        ],
        "comparisons": [
          {
            "left": 0,
            "right": 1,
            "probability": "2/3"
          },
          {
            "left": 2,
            "right": 3,
            "probability": "2/3"
          }
        ],
        "scale_bounds": [
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "1",
          "0",
          "0",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0,
            1
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 1,
          "anchor": 2,
          "items": [
            2,
            3
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        0,
        1,
        1
      ],
      "canonical_merits": [
        "1",
        "1/2",
        "1",
        "1/2"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          0,
          1
        ],
        [
          2
        ],
        [
          2,
          3
        ]
      ],
      "constraints": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        }
      ],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 2,
      "relative_scale_degrees": 1,
      "policy_family": {
        "component_base_weights": [
          "3/8",
          "3/8"
        ],
        "within_component_policy": [
          "2/3",
          "1/3",
          "2/3",
          "1/3"
        ],
        "policy_identified_without_bounds": false,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0,
              0
            ],
            "scales": [
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1/2",
              "1",
              "1/2"
            ],
            "policy": [
              "1/3",
              "1/6",
              "1/3",
              "1/6"
            ],
            "component_mass": [
              "1/2",
              "1/2"
            ],
            "expected_utility": "1/3",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 1,
            "sides": [
              0,
              1
            ],
            "scales": [
              "1",
              "4"
            ],
            "merits": [
              "1",
              "1/2",
              "4",
              "2"
            ],
            "policy": [
              "2/15",
              "1/15",
              "8/15",
              "4/15"
            ],
            "component_mass": [
              "1/5",
              "4/5"
            ],
            "expected_utility": "2/15",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 2,
            "sides": [
              1,
              0
            ],
            "scales": [
              "4",
              "1"
            ],
            "merits": [
              "4",
              "2",
              "1",
              "1/2"
            ],
            "policy": [
              "8/15",
              "4/15",
              "2/15",
              "1/15"
            ],
            "component_mass": [
              "4/5",
              "1/5"
            ],
            "expected_utility": "8/15",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 3,
            "sides": [
              1,
              1
            ],
            "scales": [
              "4",
              "4"
            ],
            "merits": [
              "4",
              "2",
              "4",
              "2"
            ],
            "policy": [
              "1/3",
              "1/6",
              "1/3",
              "1/6"
            ],
            "component_mass": [
              "1/2",
              "1/2"
            ],
            "expected_utility": "1/3",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "2/15",
            "maximum": "8/15",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/15",
            "maximum": "4/15",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "2/15",
            "maximum": "8/15",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          },
          {
            "minimum": "1/15",
            "maximum": "4/15",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "2/15",
          "maximum": "8/15",
          "minimum_vertices": [
            1
          ],
          "maximum_vertices": [
            2
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1,
              2,
              3
            ],
            "maximum_vertices": [
              0,
              1,
              2,
              3
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 0,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/3",
            "maximum": "8/9",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/9",
            "maximum": "2/3",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 1,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 2,
            "right": 3,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1,
              2,
              3
            ],
            "maximum_vertices": [
              0,
              1,
              2,
              3
            ]
          }
        ]
      }
    }
  },
  {
    "id": "bridge",
    "title": "One population-probability bridge identifies relative scale",
    "input": {
      "items": [
        "A",
        "B",
        "C",
        "D"
      ],
      "reference": [
        "1/4",
        "1/4",
        "1/4",
        "1/4"
      ],
      "comparisons": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3"
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3"
        },
        {
          "left": 1,
          "right": 2,
          "probability": "1/2"
        }
      ],
      "scale_bounds": [
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        1,
        0,
        0,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C",
          "D"
        ],
        "reference": [
          "1/4",
          "1/4",
          "1/4",
          "1/4"
        ],
        "comparisons": [
          {
            "left": 0,
            "right": 1,
            "probability": "2/3"
          },
          {
            "left": 1,
            "right": 2,
            "probability": "1/2"
          },
          {
            "left": 2,
            "right": 3,
            "probability": "2/3"
          }
        ],
        "scale_bounds": [
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "1",
          "0",
          "0",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0,
            1,
            2,
            3
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        0,
        0,
        0
      ],
      "canonical_merits": [
        "1",
        "1/2",
        "1/2",
        "1/4"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          0,
          1
        ],
        [
          0,
          1,
          2
        ],
        [
          0,
          1,
          2,
          3
        ]
      ],
      "constraints": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        },
        {
          "left": 1,
          "right": 2,
          "probability": "1/2",
          "odds": "1",
          "implied_odds": "1",
          "consistent": true
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        }
      ],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 1,
      "relative_scale_degrees": 0,
      "policy_family": {
        "component_base_weights": [
          "9/16"
        ],
        "within_component_policy": [
          "4/9",
          "2/9",
          "2/9",
          "1/9"
        ],
        "policy_identified_without_bounds": true,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0
            ],
            "scales": [
              "1"
            ],
            "merits": [
              "1",
              "1/2",
              "1/2",
              "1/4"
            ],
            "policy": [
              "4/9",
              "2/9",
              "2/9",
              "1/9"
            ],
            "component_mass": [
              "1"
            ],
            "expected_utility": "4/9",
            "edge_probabilities": [
              "2/3",
              "1/2",
              "2/3"
            ]
          },
          {
            "id": 1,
            "sides": [
              1
            ],
            "scales": [
              "4"
            ],
            "merits": [
              "4",
              "2",
              "2",
              "1"
            ],
            "policy": [
              "4/9",
              "2/9",
              "2/9",
              "1/9"
            ],
            "component_mass": [
              "1"
            ],
            "expected_utility": "4/9",
            "edge_probabilities": [
              "2/3",
              "1/2",
              "2/3"
            ]
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "4/9",
            "maximum": "4/9",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "minimum": "2/9",
            "maximum": "2/9",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "minimum": "2/9",
            "maximum": "2/9",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "minimum": "1/9",
            "maximum": "1/9",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1",
            "maximum": "1",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "4/9",
          "maximum": "4/9",
          "minimum_vertices": [
            0,
            1
          ],
          "maximum_vertices": [
            0,
            1
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "left": 0,
            "right": 3,
            "identified_without_bounds": true,
            "minimum": "4/5",
            "maximum": "4/5",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": true,
            "minimum": "1/2",
            "maximum": "1/2",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "left": 1,
            "right": 3,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "left": 2,
            "right": 3,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          }
        ]
      }
    }
  },
  {
    "id": "cycle_conflict",
    "title": "A cyclic odds contradiction has no scalar reward",
    "input": {
      "items": [
        "A",
        "B",
        "C"
      ],
      "reference": [
        "1/3",
        "1/3",
        "1/3"
      ],
      "comparisons": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3"
        },
        {
          "left": 1,
          "right": 2,
          "probability": "2/3"
        },
        {
          "left": 0,
          "right": 2,
          "probability": "3/4"
        }
      ],
      "scale_bounds": [
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        1,
        0,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C"
        ],
        "reference": [
          "1/3",
          "1/3",
          "1/3"
        ],
        "comparisons": [
          {
            "left": 0,
            "right": 1,
            "probability": "2/3"
          },
          {
            "left": 0,
            "right": 2,
            "probability": "3/4"
          },
          {
            "left": 1,
            "right": 2,
            "probability": "2/3"
          }
        ],
        "scale_bounds": [
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "1",
          "0",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0,
            1,
            2
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        0,
        0
      ],
      "canonical_merits": [
        "1",
        "1/2",
        "1/3"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          0,
          1
        ],
        [
          0,
          2
        ]
      ],
      "constraints": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        },
        {
          "left": 0,
          "right": 2,
          "probability": "3/4",
          "odds": "3",
          "implied_odds": "3",
          "consistent": true
        },
        {
          "left": 1,
          "right": 2,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "3/2",
          "consistent": false
        }
      ],
      "consistent": false,
      "cycle_witnesses": [
        {
          "vertices": [
            1,
            0,
            2,
            1
          ],
          "steps": [
            {
              "from": 1,
              "to": 0,
              "odds": "1/2"
            },
            {
              "from": 0,
              "to": 2,
              "odds": "3"
            },
            {
              "from": 2,
              "to": 1,
              "odds": "1/2"
            }
          ],
          "product": "3/4"
        }
      ],
      "free_component_scales": null,
      "relative_scale_degrees": null,
      "policy_family": null
    }
  },
  {
    "id": "cycle_consistent",
    "title": "A redundant consistent edge changes no policy",
    "input": {
      "items": [
        "A",
        "B",
        "C"
      ],
      "reference": [
        "1/3",
        "1/3",
        "1/3"
      ],
      "comparisons": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3"
        },
        {
          "left": 1,
          "right": 2,
          "probability": "2/3"
        },
        {
          "left": 0,
          "right": 2,
          "probability": "4/5"
        }
      ],
      "scale_bounds": [
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        1,
        0,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C"
        ],
        "reference": [
          "1/3",
          "1/3",
          "1/3"
        ],
        "comparisons": [
          {
            "left": 0,
            "right": 1,
            "probability": "2/3"
          },
          {
            "left": 0,
            "right": 2,
            "probability": "4/5"
          },
          {
            "left": 1,
            "right": 2,
            "probability": "2/3"
          }
        ],
        "scale_bounds": [
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "1",
          "0",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0,
            1,
            2
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        0,
        0
      ],
      "canonical_merits": [
        "1",
        "1/2",
        "1/4"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          0,
          1
        ],
        [
          0,
          2
        ]
      ],
      "constraints": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        },
        {
          "left": 0,
          "right": 2,
          "probability": "4/5",
          "odds": "4",
          "implied_odds": "4",
          "consistent": true
        },
        {
          "left": 1,
          "right": 2,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        }
      ],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 1,
      "relative_scale_degrees": 0,
      "policy_family": {
        "component_base_weights": [
          "7/12"
        ],
        "within_component_policy": [
          "4/7",
          "2/7",
          "1/7"
        ],
        "policy_identified_without_bounds": true,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0
            ],
            "scales": [
              "1"
            ],
            "merits": [
              "1",
              "1/2",
              "1/4"
            ],
            "policy": [
              "4/7",
              "2/7",
              "1/7"
            ],
            "component_mass": [
              "1"
            ],
            "expected_utility": "4/7",
            "edge_probabilities": [
              "2/3",
              "4/5",
              "2/3"
            ]
          },
          {
            "id": 1,
            "sides": [
              1
            ],
            "scales": [
              "4"
            ],
            "merits": [
              "4",
              "2",
              "1"
            ],
            "policy": [
              "4/7",
              "2/7",
              "1/7"
            ],
            "component_mass": [
              "1"
            ],
            "expected_utility": "4/7",
            "edge_probabilities": [
              "2/3",
              "4/5",
              "2/3"
            ]
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "4/7",
            "maximum": "4/7",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "minimum": "2/7",
            "maximum": "2/7",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "minimum": "1/7",
            "maximum": "1/7",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1",
            "maximum": "1",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "4/7",
          "maximum": "4/7",
          "minimum_vertices": [
            0,
            1
          ],
          "maximum_vertices": [
            0,
            1
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": true,
            "minimum": "4/5",
            "maximum": "4/5",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          }
        ]
      }
    }
  },
  {
    "id": "isolated",
    "title": "An unseen response keeps its own free scale",
    "input": {
      "items": [
        "A",
        "B",
        "C"
      ],
      "reference": [
        "1/3",
        "1/3",
        "1/3"
      ],
      "comparisons": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3"
        }
      ],
      "scale_bounds": [
        [
          "1",
          "9"
        ],
        [
          "1",
          "9"
        ]
      ],
      "utility": [
        1,
        0,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C"
        ],
        "reference": [
          "1/3",
          "1/3",
          "1/3"
        ],
        "comparisons": [
          {
            "left": 0,
            "right": 1,
            "probability": "2/3"
          }
        ],
        "scale_bounds": [
          [
            "1",
            "9"
          ],
          [
            "1",
            "9"
          ]
        ],
        "utility": [
          "1",
          "0",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0,
            1
          ],
          "scale_bounds": [
            "1",
            "9"
          ]
        },
        {
          "id": 1,
          "anchor": 2,
          "items": [
            2
          ],
          "scale_bounds": [
            "1",
            "9"
          ]
        }
      ],
      "component_of": [
        0,
        0,
        1
      ],
      "canonical_merits": [
        "1",
        "1/2",
        "1"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          0,
          1
        ],
        [
          2
        ]
      ],
      "constraints": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        }
      ],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 2,
      "relative_scale_degrees": 1,
      "policy_family": {
        "component_base_weights": [
          "1/2",
          "1/3"
        ],
        "within_component_policy": [
          "2/3",
          "1/3",
          "1"
        ],
        "policy_identified_without_bounds": false,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0,
              0
            ],
            "scales": [
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1/2",
              "1"
            ],
            "policy": [
              "2/5",
              "1/5",
              "2/5"
            ],
            "component_mass": [
              "3/5",
              "2/5"
            ],
            "expected_utility": "2/5",
            "edge_probabilities": [
              "2/3"
            ]
          },
          {
            "id": 1,
            "sides": [
              0,
              1
            ],
            "scales": [
              "1",
              "9"
            ],
            "merits": [
              "1",
              "1/2",
              "9"
            ],
            "policy": [
              "2/21",
              "1/21",
              "6/7"
            ],
            "component_mass": [
              "1/7",
              "6/7"
            ],
            "expected_utility": "2/21",
            "edge_probabilities": [
              "2/3"
            ]
          },
          {
            "id": 2,
            "sides": [
              1,
              0
            ],
            "scales": [
              "9",
              "1"
            ],
            "merits": [
              "9",
              "9/2",
              "1"
            ],
            "policy": [
              "18/29",
              "9/29",
              "2/29"
            ],
            "component_mass": [
              "27/29",
              "2/29"
            ],
            "expected_utility": "18/29",
            "edge_probabilities": [
              "2/3"
            ]
          },
          {
            "id": 3,
            "sides": [
              1,
              1
            ],
            "scales": [
              "9",
              "9"
            ],
            "merits": [
              "9",
              "9/2",
              "9"
            ],
            "policy": [
              "2/5",
              "1/5",
              "2/5"
            ],
            "component_mass": [
              "3/5",
              "2/5"
            ],
            "expected_utility": "2/5",
            "edge_probabilities": [
              "2/3"
            ]
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "2/21",
            "maximum": "18/29",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "9/29",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "2/29",
            "maximum": "6/7",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1/7",
            "maximum": "27/29",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "2/29",
            "maximum": "6/7",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "2/21",
          "maximum": "18/29",
          "minimum_vertices": [
            1
          ],
          "maximum_vertices": [
            2
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1,
              2,
              3
            ],
            "maximum_vertices": [
              0,
              1,
              2,
              3
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/10",
            "maximum": "9/10",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/19",
            "maximum": "9/11",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          }
        ]
      }
    }
  },
  {
    "id": "no_edges",
    "title": "No comparisons: every component mass is free",
    "input": {
      "items": [
        "A",
        "B",
        "C",
        "D"
      ],
      "reference": [
        "1/4",
        "1/4",
        "1/4",
        "1/4"
      ],
      "comparisons": [],
      "scale_bounds": [
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        1,
        0,
        0,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C",
          "D"
        ],
        "reference": [
          "1/4",
          "1/4",
          "1/4",
          "1/4"
        ],
        "comparisons": [],
        "scale_bounds": [
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "1",
          "0",
          "0",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 1,
          "anchor": 1,
          "items": [
            1
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 2,
          "anchor": 2,
          "items": [
            2
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 3,
          "anchor": 3,
          "items": [
            3
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        1,
        2,
        3
      ],
      "canonical_merits": [
        "1",
        "1",
        "1",
        "1"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          1
        ],
        [
          2
        ],
        [
          3
        ]
      ],
      "constraints": [],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 4,
      "relative_scale_degrees": 3,
      "policy_family": {
        "component_base_weights": [
          "1/4",
          "1/4",
          "1/4",
          "1/4"
        ],
        "within_component_policy": [
          "1",
          "1",
          "1",
          "1"
        ],
        "policy_identified_without_bounds": false,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0,
              0,
              0,
              0
            ],
            "scales": [
              "1",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "1/4",
              "1/4",
              "1/4",
              "1/4"
            ],
            "component_mass": [
              "1/4",
              "1/4",
              "1/4",
              "1/4"
            ],
            "expected_utility": "1/4",
            "edge_probabilities": []
          },
          {
            "id": 1,
            "sides": [
              0,
              0,
              0,
              1
            ],
            "scales": [
              "1",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "1/7",
              "1/7",
              "1/7",
              "4/7"
            ],
            "component_mass": [
              "1/7",
              "1/7",
              "1/7",
              "4/7"
            ],
            "expected_utility": "1/7",
            "edge_probabilities": []
          },
          {
            "id": 2,
            "sides": [
              0,
              0,
              1,
              0
            ],
            "scales": [
              "1",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "1/7",
              "1/7",
              "4/7",
              "1/7"
            ],
            "component_mass": [
              "1/7",
              "1/7",
              "4/7",
              "1/7"
            ],
            "expected_utility": "1/7",
            "edge_probabilities": []
          },
          {
            "id": 3,
            "sides": [
              0,
              0,
              1,
              1
            ],
            "scales": [
              "1",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "1/10",
              "1/10",
              "2/5",
              "2/5"
            ],
            "component_mass": [
              "1/10",
              "1/10",
              "2/5",
              "2/5"
            ],
            "expected_utility": "1/10",
            "edge_probabilities": []
          },
          {
            "id": 4,
            "sides": [
              0,
              1,
              0,
              0
            ],
            "scales": [
              "1",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "1/7",
              "4/7",
              "1/7",
              "1/7"
            ],
            "component_mass": [
              "1/7",
              "4/7",
              "1/7",
              "1/7"
            ],
            "expected_utility": "1/7",
            "edge_probabilities": []
          },
          {
            "id": 5,
            "sides": [
              0,
              1,
              0,
              1
            ],
            "scales": [
              "1",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "1/10",
              "2/5",
              "1/10",
              "2/5"
            ],
            "component_mass": [
              "1/10",
              "2/5",
              "1/10",
              "2/5"
            ],
            "expected_utility": "1/10",
            "edge_probabilities": []
          },
          {
            "id": 6,
            "sides": [
              0,
              1,
              1,
              0
            ],
            "scales": [
              "1",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "1/10",
              "2/5",
              "2/5",
              "1/10"
            ],
            "component_mass": [
              "1/10",
              "2/5",
              "2/5",
              "1/10"
            ],
            "expected_utility": "1/10",
            "edge_probabilities": []
          },
          {
            "id": 7,
            "sides": [
              0,
              1,
              1,
              1
            ],
            "scales": [
              "1",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "1/13",
              "4/13",
              "4/13",
              "4/13"
            ],
            "component_mass": [
              "1/13",
              "4/13",
              "4/13",
              "4/13"
            ],
            "expected_utility": "1/13",
            "edge_probabilities": []
          },
          {
            "id": 8,
            "sides": [
              1,
              0,
              0,
              0
            ],
            "scales": [
              "4",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "4/7",
              "1/7",
              "1/7",
              "1/7"
            ],
            "component_mass": [
              "4/7",
              "1/7",
              "1/7",
              "1/7"
            ],
            "expected_utility": "4/7",
            "edge_probabilities": []
          },
          {
            "id": 9,
            "sides": [
              1,
              0,
              0,
              1
            ],
            "scales": [
              "4",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "2/5",
              "1/10",
              "1/10",
              "2/5"
            ],
            "component_mass": [
              "2/5",
              "1/10",
              "1/10",
              "2/5"
            ],
            "expected_utility": "2/5",
            "edge_probabilities": []
          },
          {
            "id": 10,
            "sides": [
              1,
              0,
              1,
              0
            ],
            "scales": [
              "4",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "2/5",
              "1/10",
              "2/5",
              "1/10"
            ],
            "component_mass": [
              "2/5",
              "1/10",
              "2/5",
              "1/10"
            ],
            "expected_utility": "2/5",
            "edge_probabilities": []
          },
          {
            "id": 11,
            "sides": [
              1,
              0,
              1,
              1
            ],
            "scales": [
              "4",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "4/13",
              "1/13",
              "4/13",
              "4/13"
            ],
            "component_mass": [
              "4/13",
              "1/13",
              "4/13",
              "4/13"
            ],
            "expected_utility": "4/13",
            "edge_probabilities": []
          },
          {
            "id": 12,
            "sides": [
              1,
              1,
              0,
              0
            ],
            "scales": [
              "4",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "2/5",
              "2/5",
              "1/10",
              "1/10"
            ],
            "component_mass": [
              "2/5",
              "2/5",
              "1/10",
              "1/10"
            ],
            "expected_utility": "2/5",
            "edge_probabilities": []
          },
          {
            "id": 13,
            "sides": [
              1,
              1,
              0,
              1
            ],
            "scales": [
              "4",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "4/13",
              "4/13",
              "1/13",
              "4/13"
            ],
            "component_mass": [
              "4/13",
              "4/13",
              "1/13",
              "4/13"
            ],
            "expected_utility": "4/13",
            "edge_probabilities": []
          },
          {
            "id": 14,
            "sides": [
              1,
              1,
              1,
              0
            ],
            "scales": [
              "4",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "4/13",
              "4/13",
              "4/13",
              "1/13"
            ],
            "component_mass": [
              "4/13",
              "4/13",
              "4/13",
              "1/13"
            ],
            "expected_utility": "4/13",
            "edge_probabilities": []
          },
          {
            "id": 15,
            "sides": [
              1,
              1,
              1,
              1
            ],
            "scales": [
              "4",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "1/4",
              "1/4",
              "1/4",
              "1/4"
            ],
            "component_mass": [
              "1/4",
              "1/4",
              "1/4",
              "1/4"
            ],
            "expected_utility": "1/4",
            "edge_probabilities": []
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "1/13",
            "maximum": "4/7",
            "minimum_vertices": [
              7
            ],
            "maximum_vertices": [
              8
            ]
          },
          {
            "minimum": "1/13",
            "maximum": "4/7",
            "minimum_vertices": [
              11
            ],
            "maximum_vertices": [
              4
            ]
          },
          {
            "minimum": "1/13",
            "maximum": "4/7",
            "minimum_vertices": [
              13
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/13",
            "maximum": "4/7",
            "minimum_vertices": [
              14
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1/13",
            "maximum": "4/7",
            "minimum_vertices": [
              7
            ],
            "maximum_vertices": [
              8
            ]
          },
          {
            "minimum": "1/13",
            "maximum": "4/7",
            "minimum_vertices": [
              11
            ],
            "maximum_vertices": [
              4
            ]
          },
          {
            "minimum": "1/13",
            "maximum": "4/7",
            "minimum_vertices": [
              13
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/13",
            "maximum": "4/7",
            "minimum_vertices": [
              14
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "1/13",
          "maximum": "4/7",
          "minimum_vertices": [
            7
          ],
          "maximum_vertices": [
            8
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              4,
              5,
              6,
              7
            ],
            "maximum_vertices": [
              8,
              9,
              10,
              11
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              2,
              3,
              6,
              7
            ],
            "maximum_vertices": [
              8,
              9,
              12,
              13
            ]
          },
          {
            "left": 0,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1,
              3,
              5,
              7
            ],
            "maximum_vertices": [
              8,
              10,
              12,
              14
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              2,
              3,
              10,
              11
            ],
            "maximum_vertices": [
              4,
              5,
              12,
              13
            ]
          },
          {
            "left": 1,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1,
              3,
              9,
              11
            ],
            "maximum_vertices": [
              4,
              6,
              12,
              14
            ]
          },
          {
            "left": 2,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1,
              5,
              9,
              13
            ],
            "maximum_vertices": [
              2,
              6,
              10,
              14
            ]
          }
        ]
      }
    }
  },
  {
    "id": "same_utility",
    "title": "Policy ambiguity need not change supplied utility",
    "input": {
      "items": [
        "A",
        "B",
        "C",
        "D"
      ],
      "reference": [
        "1/4",
        "1/4",
        "1/4",
        "1/4"
      ],
      "comparisons": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3"
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3"
        }
      ],
      "scale_bounds": [
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        7,
        7,
        7,
        7
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C",
          "D"
        ],
        "reference": [
          "1/4",
          "1/4",
          "1/4",
          "1/4"
        ],
        "comparisons": [
          {
            "left": 0,
            "right": 1,
            "probability": "2/3"
          },
          {
            "left": 2,
            "right": 3,
            "probability": "2/3"
          }
        ],
        "scale_bounds": [
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "7",
          "7",
          "7",
          "7"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0,
            1
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 1,
          "anchor": 2,
          "items": [
            2,
            3
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        0,
        1,
        1
      ],
      "canonical_merits": [
        "1",
        "1/2",
        "1",
        "1/2"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          0,
          1
        ],
        [
          2
        ],
        [
          2,
          3
        ]
      ],
      "constraints": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        }
      ],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 2,
      "relative_scale_degrees": 1,
      "policy_family": {
        "component_base_weights": [
          "3/8",
          "3/8"
        ],
        "within_component_policy": [
          "2/3",
          "1/3",
          "2/3",
          "1/3"
        ],
        "policy_identified_without_bounds": false,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0,
              0
            ],
            "scales": [
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1/2",
              "1",
              "1/2"
            ],
            "policy": [
              "1/3",
              "1/6",
              "1/3",
              "1/6"
            ],
            "component_mass": [
              "1/2",
              "1/2"
            ],
            "expected_utility": "7",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 1,
            "sides": [
              0,
              1
            ],
            "scales": [
              "1",
              "4"
            ],
            "merits": [
              "1",
              "1/2",
              "4",
              "2"
            ],
            "policy": [
              "2/15",
              "1/15",
              "8/15",
              "4/15"
            ],
            "component_mass": [
              "1/5",
              "4/5"
            ],
            "expected_utility": "7",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 2,
            "sides": [
              1,
              0
            ],
            "scales": [
              "4",
              "1"
            ],
            "merits": [
              "4",
              "2",
              "1",
              "1/2"
            ],
            "policy": [
              "8/15",
              "4/15",
              "2/15",
              "1/15"
            ],
            "component_mass": [
              "4/5",
              "1/5"
            ],
            "expected_utility": "7",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 3,
            "sides": [
              1,
              1
            ],
            "scales": [
              "4",
              "4"
            ],
            "merits": [
              "4",
              "2",
              "4",
              "2"
            ],
            "policy": [
              "1/3",
              "1/6",
              "1/3",
              "1/6"
            ],
            "component_mass": [
              "1/2",
              "1/2"
            ],
            "expected_utility": "7",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "2/15",
            "maximum": "8/15",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/15",
            "maximum": "4/15",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "2/15",
            "maximum": "8/15",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          },
          {
            "minimum": "1/15",
            "maximum": "4/15",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "7",
          "maximum": "7",
          "minimum_vertices": [
            0,
            1,
            2,
            3
          ],
          "maximum_vertices": [
            0,
            1,
            2,
            3
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1,
              2,
              3
            ],
            "maximum_vertices": [
              0,
              1,
              2,
              3
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 0,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/3",
            "maximum": "8/9",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/9",
            "maximum": "2/3",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 1,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 2,
            "right": 3,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1,
              2,
              3
            ],
            "maximum_vertices": [
              0,
              1,
              2,
              3
            ]
          }
        ]
      }
    }
  },
  {
    "id": "frozen_bounds",
    "title": "Assumed fixed component scales are not identification",
    "input": {
      "items": [
        "A",
        "B",
        "C",
        "D"
      ],
      "reference": [
        "1/4",
        "1/4",
        "1/4",
        "1/4"
      ],
      "comparisons": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3"
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3"
        }
      ],
      "scale_bounds": [
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ]
      ],
      "utility": [
        1,
        0,
        0,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C",
          "D"
        ],
        "reference": [
          "1/4",
          "1/4",
          "1/4",
          "1/4"
        ],
        "comparisons": [
          {
            "left": 0,
            "right": 1,
            "probability": "2/3"
          },
          {
            "left": 2,
            "right": 3,
            "probability": "2/3"
          }
        ],
        "scale_bounds": [
          [
            "2",
            "2"
          ],
          [
            "3",
            "3"
          ]
        ],
        "utility": [
          "1",
          "0",
          "0",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0,
            1
          ],
          "scale_bounds": [
            "2",
            "2"
          ]
        },
        {
          "id": 1,
          "anchor": 2,
          "items": [
            2,
            3
          ],
          "scale_bounds": [
            "3",
            "3"
          ]
        }
      ],
      "component_of": [
        0,
        0,
        1,
        1
      ],
      "canonical_merits": [
        "1",
        "1/2",
        "1",
        "1/2"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          0,
          1
        ],
        [
          2
        ],
        [
          2,
          3
        ]
      ],
      "constraints": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        }
      ],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 2,
      "relative_scale_degrees": 1,
      "policy_family": {
        "component_base_weights": [
          "3/8",
          "3/8"
        ],
        "within_component_policy": [
          "2/3",
          "1/3",
          "2/3",
          "1/3"
        ],
        "policy_identified_without_bounds": false,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0,
              0
            ],
            "scales": [
              "2",
              "3"
            ],
            "merits": [
              "2",
              "1",
              "3",
              "3/2"
            ],
            "policy": [
              "4/15",
              "2/15",
              "2/5",
              "1/5"
            ],
            "component_mass": [
              "2/5",
              "3/5"
            ],
            "expected_utility": "4/15",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "4/15",
            "maximum": "4/15",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "minimum": "2/15",
            "maximum": "2/15",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "minimum": "2/5",
            "maximum": "2/5",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "minimum": "1/5",
            "maximum": "1/5",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "2/5",
            "maximum": "2/5",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "minimum": "3/5",
            "maximum": "3/5",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          }
        ],
        "utility_range": {
          "minimum": "4/15",
          "maximum": "4/15",
          "minimum_vertices": [
            0
          ],
          "maximum_vertices": [
            0
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "2/5",
            "maximum": "2/5",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "left": 0,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "4/7",
            "maximum": "4/7",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/4",
            "maximum": "1/4",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "left": 1,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "2/5",
            "maximum": "2/5",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          },
          {
            "left": 2,
            "right": 3,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0
            ],
            "maximum_vertices": [
              0
            ]
          }
        ]
      }
    }
  },
  {
    "id": "skew_reference",
    "title": "Reference weighting changes policy, not observed odds",
    "input": {
      "items": [
        "A",
        "B",
        "C",
        "D"
      ],
      "reference": [
        "1/2",
        "1/4",
        "1/8",
        "1/8"
      ],
      "comparisons": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3"
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3"
        }
      ],
      "scale_bounds": [
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        1,
        0,
        0,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C",
          "D"
        ],
        "reference": [
          "1/2",
          "1/4",
          "1/8",
          "1/8"
        ],
        "comparisons": [
          {
            "left": 0,
            "right": 1,
            "probability": "2/3"
          },
          {
            "left": 2,
            "right": 3,
            "probability": "2/3"
          }
        ],
        "scale_bounds": [
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "1",
          "0",
          "0",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0,
            1
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 1,
          "anchor": 2,
          "items": [
            2,
            3
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        0,
        1,
        1
      ],
      "canonical_merits": [
        "1",
        "1/2",
        "1",
        "1/2"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          0,
          1
        ],
        [
          2
        ],
        [
          2,
          3
        ]
      ],
      "constraints": [
        {
          "left": 0,
          "right": 1,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        },
        {
          "left": 2,
          "right": 3,
          "probability": "2/3",
          "odds": "2",
          "implied_odds": "2",
          "consistent": true
        }
      ],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 2,
      "relative_scale_degrees": 1,
      "policy_family": {
        "component_base_weights": [
          "5/8",
          "3/16"
        ],
        "within_component_policy": [
          "4/5",
          "1/5",
          "2/3",
          "1/3"
        ],
        "policy_identified_without_bounds": false,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0,
              0
            ],
            "scales": [
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1/2",
              "1",
              "1/2"
            ],
            "policy": [
              "8/13",
              "2/13",
              "2/13",
              "1/13"
            ],
            "component_mass": [
              "10/13",
              "3/13"
            ],
            "expected_utility": "8/13",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 1,
            "sides": [
              0,
              1
            ],
            "scales": [
              "1",
              "4"
            ],
            "merits": [
              "1",
              "1/2",
              "4",
              "2"
            ],
            "policy": [
              "4/11",
              "1/11",
              "4/11",
              "2/11"
            ],
            "component_mass": [
              "5/11",
              "6/11"
            ],
            "expected_utility": "4/11",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 2,
            "sides": [
              1,
              0
            ],
            "scales": [
              "4",
              "1"
            ],
            "merits": [
              "4",
              "2",
              "1",
              "1/2"
            ],
            "policy": [
              "32/43",
              "8/43",
              "2/43",
              "1/43"
            ],
            "component_mass": [
              "40/43",
              "3/43"
            ],
            "expected_utility": "32/43",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          },
          {
            "id": 3,
            "sides": [
              1,
              1
            ],
            "scales": [
              "4",
              "4"
            ],
            "merits": [
              "4",
              "2",
              "4",
              "2"
            ],
            "policy": [
              "8/13",
              "2/13",
              "2/13",
              "1/13"
            ],
            "component_mass": [
              "10/13",
              "3/13"
            ],
            "expected_utility": "8/13",
            "edge_probabilities": [
              "2/3",
              "2/3"
            ]
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "4/11",
            "maximum": "32/43",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/11",
            "maximum": "8/43",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "2/43",
            "maximum": "4/11",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          },
          {
            "minimum": "1/43",
            "maximum": "2/11",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "5/11",
            "maximum": "40/43",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "3/43",
            "maximum": "6/11",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "4/11",
          "maximum": "32/43",
          "minimum_vertices": [
            1
          ],
          "maximum_vertices": [
            2
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1,
              2,
              3
            ],
            "maximum_vertices": [
              0,
              1,
              2,
              3
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 0,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/3",
            "maximum": "8/9",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/9",
            "maximum": "2/3",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 1,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "left": 2,
            "right": 3,
            "identified_without_bounds": true,
            "minimum": "2/3",
            "maximum": "2/3",
            "minimum_vertices": [
              0,
              1,
              2,
              3
            ],
            "maximum_vertices": [
              0,
              1,
              2,
              3
            ]
          }
        ]
      }
    }
  },
  {
    "id": "six_components",
    "title": "All 64 box corners, including duplicate policies",
    "input": {
      "items": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
      ],
      "reference": [
        "1/6",
        "1/6",
        "1/6",
        "1/6",
        "1/6",
        "1/6"
      ],
      "comparisons": [],
      "scale_bounds": [
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        0,
        1,
        2,
        3,
        4,
        5
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "reference": [
          "1/6",
          "1/6",
          "1/6",
          "1/6",
          "1/6",
          "1/6"
        ],
        "comparisons": [],
        "scale_bounds": [
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 1,
          "anchor": 1,
          "items": [
            1
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 2,
          "anchor": 2,
          "items": [
            2
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 3,
          "anchor": 3,
          "items": [
            3
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 4,
          "anchor": 4,
          "items": [
            4
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 5,
          "anchor": 5,
          "items": [
            5
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "canonical_merits": [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          1
        ],
        [
          2
        ],
        [
          3
        ],
        [
          4
        ],
        [
          5
        ]
      ],
      "constraints": [],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 6,
      "relative_scale_degrees": 5,
      "policy_family": {
        "component_base_weights": [
          "1/6",
          "1/6",
          "1/6",
          "1/6",
          "1/6",
          "1/6"
        ],
        "within_component_policy": [
          "1",
          "1",
          "1",
          "1",
          "1",
          "1"
        ],
        "policy_identified_without_bounds": false,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0,
              0,
              0,
              0,
              0,
              0
            ],
            "scales": [
              "1",
              "1",
              "1",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "1/6",
              "1/6",
              "1/6",
              "1/6",
              "1/6",
              "1/6"
            ],
            "component_mass": [
              "1/6",
              "1/6",
              "1/6",
              "1/6",
              "1/6",
              "1/6"
            ],
            "expected_utility": "5/2",
            "edge_probabilities": []
          },
          {
            "id": 1,
            "sides": [
              0,
              0,
              0,
              0,
              0,
              1
            ],
            "scales": [
              "1",
              "1",
              "1",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "1/9",
              "1/9",
              "1/9",
              "1/9",
              "1/9",
              "4/9"
            ],
            "component_mass": [
              "1/9",
              "1/9",
              "1/9",
              "1/9",
              "1/9",
              "4/9"
            ],
            "expected_utility": "10/3",
            "edge_probabilities": []
          },
          {
            "id": 2,
            "sides": [
              0,
              0,
              0,
              0,
              1,
              0
            ],
            "scales": [
              "1",
              "1",
              "1",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "1/9",
              "1/9",
              "1/9",
              "1/9",
              "4/9",
              "1/9"
            ],
            "component_mass": [
              "1/9",
              "1/9",
              "1/9",
              "1/9",
              "4/9",
              "1/9"
            ],
            "expected_utility": "3",
            "edge_probabilities": []
          },
          {
            "id": 3,
            "sides": [
              0,
              0,
              0,
              0,
              1,
              1
            ],
            "scales": [
              "1",
              "1",
              "1",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "1/12",
              "1/12",
              "1/12",
              "1/12",
              "1/3",
              "1/3"
            ],
            "component_mass": [
              "1/12",
              "1/12",
              "1/12",
              "1/12",
              "1/3",
              "1/3"
            ],
            "expected_utility": "7/2",
            "edge_probabilities": []
          },
          {
            "id": 4,
            "sides": [
              0,
              0,
              0,
              1,
              0,
              0
            ],
            "scales": [
              "1",
              "1",
              "1",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "1/9",
              "1/9",
              "1/9",
              "4/9",
              "1/9",
              "1/9"
            ],
            "component_mass": [
              "1/9",
              "1/9",
              "1/9",
              "4/9",
              "1/9",
              "1/9"
            ],
            "expected_utility": "8/3",
            "edge_probabilities": []
          },
          {
            "id": 5,
            "sides": [
              0,
              0,
              0,
              1,
              0,
              1
            ],
            "scales": [
              "1",
              "1",
              "1",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "1/12",
              "1/12",
              "1/12",
              "1/3",
              "1/12",
              "1/3"
            ],
            "component_mass": [
              "1/12",
              "1/12",
              "1/12",
              "1/3",
              "1/12",
              "1/3"
            ],
            "expected_utility": "13/4",
            "edge_probabilities": []
          },
          {
            "id": 6,
            "sides": [
              0,
              0,
              0,
              1,
              1,
              0
            ],
            "scales": [
              "1",
              "1",
              "1",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "1/12",
              "1/12",
              "1/12",
              "1/3",
              "1/3",
              "1/12"
            ],
            "component_mass": [
              "1/12",
              "1/12",
              "1/12",
              "1/3",
              "1/3",
              "1/12"
            ],
            "expected_utility": "3",
            "edge_probabilities": []
          },
          {
            "id": 7,
            "sides": [
              0,
              0,
              0,
              1,
              1,
              1
            ],
            "scales": [
              "1",
              "1",
              "1",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "1",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "1/15",
              "1/15",
              "1/15",
              "4/15",
              "4/15",
              "4/15"
            ],
            "component_mass": [
              "1/15",
              "1/15",
              "1/15",
              "4/15",
              "4/15",
              "4/15"
            ],
            "expected_utility": "17/5",
            "edge_probabilities": []
          },
          {
            "id": 8,
            "sides": [
              0,
              0,
              1,
              0,
              0,
              0
            ],
            "scales": [
              "1",
              "1",
              "4",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "1/9",
              "1/9",
              "4/9",
              "1/9",
              "1/9",
              "1/9"
            ],
            "component_mass": [
              "1/9",
              "1/9",
              "4/9",
              "1/9",
              "1/9",
              "1/9"
            ],
            "expected_utility": "7/3",
            "edge_probabilities": []
          },
          {
            "id": 9,
            "sides": [
              0,
              0,
              1,
              0,
              0,
              1
            ],
            "scales": [
              "1",
              "1",
              "4",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "1/12",
              "1/12",
              "1/3",
              "1/12",
              "1/12",
              "1/3"
            ],
            "component_mass": [
              "1/12",
              "1/12",
              "1/3",
              "1/12",
              "1/12",
              "1/3"
            ],
            "expected_utility": "3",
            "edge_probabilities": []
          },
          {
            "id": 10,
            "sides": [
              0,
              0,
              1,
              0,
              1,
              0
            ],
            "scales": [
              "1",
              "1",
              "4",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "1/12",
              "1/12",
              "1/3",
              "1/12",
              "1/3",
              "1/12"
            ],
            "component_mass": [
              "1/12",
              "1/12",
              "1/3",
              "1/12",
              "1/3",
              "1/12"
            ],
            "expected_utility": "11/4",
            "edge_probabilities": []
          },
          {
            "id": 11,
            "sides": [
              0,
              0,
              1,
              0,
              1,
              1
            ],
            "scales": [
              "1",
              "1",
              "4",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "1/15",
              "1/15",
              "4/15",
              "1/15",
              "4/15",
              "4/15"
            ],
            "component_mass": [
              "1/15",
              "1/15",
              "4/15",
              "1/15",
              "4/15",
              "4/15"
            ],
            "expected_utility": "16/5",
            "edge_probabilities": []
          },
          {
            "id": 12,
            "sides": [
              0,
              0,
              1,
              1,
              0,
              0
            ],
            "scales": [
              "1",
              "1",
              "4",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "1/12",
              "1/12",
              "1/3",
              "1/3",
              "1/12",
              "1/12"
            ],
            "component_mass": [
              "1/12",
              "1/12",
              "1/3",
              "1/3",
              "1/12",
              "1/12"
            ],
            "expected_utility": "5/2",
            "edge_probabilities": []
          },
          {
            "id": 13,
            "sides": [
              0,
              0,
              1,
              1,
              0,
              1
            ],
            "scales": [
              "1",
              "1",
              "4",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "1/15",
              "1/15",
              "4/15",
              "4/15",
              "1/15",
              "4/15"
            ],
            "component_mass": [
              "1/15",
              "1/15",
              "4/15",
              "4/15",
              "1/15",
              "4/15"
            ],
            "expected_utility": "3",
            "edge_probabilities": []
          },
          {
            "id": 14,
            "sides": [
              0,
              0,
              1,
              1,
              1,
              0
            ],
            "scales": [
              "1",
              "1",
              "4",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "1/15",
              "1/15",
              "4/15",
              "4/15",
              "4/15",
              "1/15"
            ],
            "component_mass": [
              "1/15",
              "1/15",
              "4/15",
              "4/15",
              "4/15",
              "1/15"
            ],
            "expected_utility": "14/5",
            "edge_probabilities": []
          },
          {
            "id": 15,
            "sides": [
              0,
              0,
              1,
              1,
              1,
              1
            ],
            "scales": [
              "1",
              "1",
              "4",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "1",
              "4",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "1/18",
              "1/18",
              "2/9",
              "2/9",
              "2/9",
              "2/9"
            ],
            "component_mass": [
              "1/18",
              "1/18",
              "2/9",
              "2/9",
              "2/9",
              "2/9"
            ],
            "expected_utility": "19/6",
            "edge_probabilities": []
          },
          {
            "id": 16,
            "sides": [
              0,
              1,
              0,
              0,
              0,
              0
            ],
            "scales": [
              "1",
              "4",
              "1",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "1/9",
              "4/9",
              "1/9",
              "1/9",
              "1/9",
              "1/9"
            ],
            "component_mass": [
              "1/9",
              "4/9",
              "1/9",
              "1/9",
              "1/9",
              "1/9"
            ],
            "expected_utility": "2",
            "edge_probabilities": []
          },
          {
            "id": 17,
            "sides": [
              0,
              1,
              0,
              0,
              0,
              1
            ],
            "scales": [
              "1",
              "4",
              "1",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "1/12",
              "1/3",
              "1/12",
              "1/12",
              "1/12",
              "1/3"
            ],
            "component_mass": [
              "1/12",
              "1/3",
              "1/12",
              "1/12",
              "1/12",
              "1/3"
            ],
            "expected_utility": "11/4",
            "edge_probabilities": []
          },
          {
            "id": 18,
            "sides": [
              0,
              1,
              0,
              0,
              1,
              0
            ],
            "scales": [
              "1",
              "4",
              "1",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "1/12",
              "1/3",
              "1/12",
              "1/12",
              "1/3",
              "1/12"
            ],
            "component_mass": [
              "1/12",
              "1/3",
              "1/12",
              "1/12",
              "1/3",
              "1/12"
            ],
            "expected_utility": "5/2",
            "edge_probabilities": []
          },
          {
            "id": 19,
            "sides": [
              0,
              1,
              0,
              0,
              1,
              1
            ],
            "scales": [
              "1",
              "4",
              "1",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "1/15",
              "4/15",
              "1/15",
              "1/15",
              "4/15",
              "4/15"
            ],
            "component_mass": [
              "1/15",
              "4/15",
              "1/15",
              "1/15",
              "4/15",
              "4/15"
            ],
            "expected_utility": "3",
            "edge_probabilities": []
          },
          {
            "id": 20,
            "sides": [
              0,
              1,
              0,
              1,
              0,
              0
            ],
            "scales": [
              "1",
              "4",
              "1",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "1/12",
              "1/3",
              "1/12",
              "1/3",
              "1/12",
              "1/12"
            ],
            "component_mass": [
              "1/12",
              "1/3",
              "1/12",
              "1/3",
              "1/12",
              "1/12"
            ],
            "expected_utility": "9/4",
            "edge_probabilities": []
          },
          {
            "id": 21,
            "sides": [
              0,
              1,
              0,
              1,
              0,
              1
            ],
            "scales": [
              "1",
              "4",
              "1",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "1/15",
              "4/15",
              "1/15",
              "4/15",
              "1/15",
              "4/15"
            ],
            "component_mass": [
              "1/15",
              "4/15",
              "1/15",
              "4/15",
              "1/15",
              "4/15"
            ],
            "expected_utility": "14/5",
            "edge_probabilities": []
          },
          {
            "id": 22,
            "sides": [
              0,
              1,
              0,
              1,
              1,
              0
            ],
            "scales": [
              "1",
              "4",
              "1",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "1/15",
              "4/15",
              "1/15",
              "4/15",
              "4/15",
              "1/15"
            ],
            "component_mass": [
              "1/15",
              "4/15",
              "1/15",
              "4/15",
              "4/15",
              "1/15"
            ],
            "expected_utility": "13/5",
            "edge_probabilities": []
          },
          {
            "id": 23,
            "sides": [
              0,
              1,
              0,
              1,
              1,
              1
            ],
            "scales": [
              "1",
              "4",
              "1",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "1",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "1/18",
              "2/9",
              "1/18",
              "2/9",
              "2/9",
              "2/9"
            ],
            "component_mass": [
              "1/18",
              "2/9",
              "1/18",
              "2/9",
              "2/9",
              "2/9"
            ],
            "expected_utility": "3",
            "edge_probabilities": []
          },
          {
            "id": 24,
            "sides": [
              0,
              1,
              1,
              0,
              0,
              0
            ],
            "scales": [
              "1",
              "4",
              "4",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "1/12",
              "1/3",
              "1/3",
              "1/12",
              "1/12",
              "1/12"
            ],
            "component_mass": [
              "1/12",
              "1/3",
              "1/3",
              "1/12",
              "1/12",
              "1/12"
            ],
            "expected_utility": "2",
            "edge_probabilities": []
          },
          {
            "id": 25,
            "sides": [
              0,
              1,
              1,
              0,
              0,
              1
            ],
            "scales": [
              "1",
              "4",
              "4",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "1/15",
              "4/15",
              "4/15",
              "1/15",
              "1/15",
              "4/15"
            ],
            "component_mass": [
              "1/15",
              "4/15",
              "4/15",
              "1/15",
              "1/15",
              "4/15"
            ],
            "expected_utility": "13/5",
            "edge_probabilities": []
          },
          {
            "id": 26,
            "sides": [
              0,
              1,
              1,
              0,
              1,
              0
            ],
            "scales": [
              "1",
              "4",
              "4",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "1/15",
              "4/15",
              "4/15",
              "1/15",
              "4/15",
              "1/15"
            ],
            "component_mass": [
              "1/15",
              "4/15",
              "4/15",
              "1/15",
              "4/15",
              "1/15"
            ],
            "expected_utility": "12/5",
            "edge_probabilities": []
          },
          {
            "id": 27,
            "sides": [
              0,
              1,
              1,
              0,
              1,
              1
            ],
            "scales": [
              "1",
              "4",
              "4",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "1/18",
              "2/9",
              "2/9",
              "1/18",
              "2/9",
              "2/9"
            ],
            "component_mass": [
              "1/18",
              "2/9",
              "2/9",
              "1/18",
              "2/9",
              "2/9"
            ],
            "expected_utility": "17/6",
            "edge_probabilities": []
          },
          {
            "id": 28,
            "sides": [
              0,
              1,
              1,
              1,
              0,
              0
            ],
            "scales": [
              "1",
              "4",
              "4",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "1/15",
              "4/15",
              "4/15",
              "4/15",
              "1/15",
              "1/15"
            ],
            "component_mass": [
              "1/15",
              "4/15",
              "4/15",
              "4/15",
              "1/15",
              "1/15"
            ],
            "expected_utility": "11/5",
            "edge_probabilities": []
          },
          {
            "id": 29,
            "sides": [
              0,
              1,
              1,
              1,
              0,
              1
            ],
            "scales": [
              "1",
              "4",
              "4",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "1/18",
              "2/9",
              "2/9",
              "2/9",
              "1/18",
              "2/9"
            ],
            "component_mass": [
              "1/18",
              "2/9",
              "2/9",
              "2/9",
              "1/18",
              "2/9"
            ],
            "expected_utility": "8/3",
            "edge_probabilities": []
          },
          {
            "id": 30,
            "sides": [
              0,
              1,
              1,
              1,
              1,
              0
            ],
            "scales": [
              "1",
              "4",
              "4",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "1/18",
              "2/9",
              "2/9",
              "2/9",
              "2/9",
              "1/18"
            ],
            "component_mass": [
              "1/18",
              "2/9",
              "2/9",
              "2/9",
              "2/9",
              "1/18"
            ],
            "expected_utility": "5/2",
            "edge_probabilities": []
          },
          {
            "id": 31,
            "sides": [
              0,
              1,
              1,
              1,
              1,
              1
            ],
            "scales": [
              "1",
              "4",
              "4",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "1",
              "4",
              "4",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "1/21",
              "4/21",
              "4/21",
              "4/21",
              "4/21",
              "4/21"
            ],
            "component_mass": [
              "1/21",
              "4/21",
              "4/21",
              "4/21",
              "4/21",
              "4/21"
            ],
            "expected_utility": "20/7",
            "edge_probabilities": []
          },
          {
            "id": 32,
            "sides": [
              1,
              0,
              0,
              0,
              0,
              0
            ],
            "scales": [
              "4",
              "1",
              "1",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "4/9",
              "1/9",
              "1/9",
              "1/9",
              "1/9",
              "1/9"
            ],
            "component_mass": [
              "4/9",
              "1/9",
              "1/9",
              "1/9",
              "1/9",
              "1/9"
            ],
            "expected_utility": "5/3",
            "edge_probabilities": []
          },
          {
            "id": 33,
            "sides": [
              1,
              0,
              0,
              0,
              0,
              1
            ],
            "scales": [
              "4",
              "1",
              "1",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "1/3",
              "1/12",
              "1/12",
              "1/12",
              "1/12",
              "1/3"
            ],
            "component_mass": [
              "1/3",
              "1/12",
              "1/12",
              "1/12",
              "1/12",
              "1/3"
            ],
            "expected_utility": "5/2",
            "edge_probabilities": []
          },
          {
            "id": 34,
            "sides": [
              1,
              0,
              0,
              0,
              1,
              0
            ],
            "scales": [
              "4",
              "1",
              "1",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "1/3",
              "1/12",
              "1/12",
              "1/12",
              "1/3",
              "1/12"
            ],
            "component_mass": [
              "1/3",
              "1/12",
              "1/12",
              "1/12",
              "1/3",
              "1/12"
            ],
            "expected_utility": "9/4",
            "edge_probabilities": []
          },
          {
            "id": 35,
            "sides": [
              1,
              0,
              0,
              0,
              1,
              1
            ],
            "scales": [
              "4",
              "1",
              "1",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "4/15",
              "1/15",
              "1/15",
              "1/15",
              "4/15",
              "4/15"
            ],
            "component_mass": [
              "4/15",
              "1/15",
              "1/15",
              "1/15",
              "4/15",
              "4/15"
            ],
            "expected_utility": "14/5",
            "edge_probabilities": []
          },
          {
            "id": 36,
            "sides": [
              1,
              0,
              0,
              1,
              0,
              0
            ],
            "scales": [
              "4",
              "1",
              "1",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "1/3",
              "1/12",
              "1/12",
              "1/3",
              "1/12",
              "1/12"
            ],
            "component_mass": [
              "1/3",
              "1/12",
              "1/12",
              "1/3",
              "1/12",
              "1/12"
            ],
            "expected_utility": "2",
            "edge_probabilities": []
          },
          {
            "id": 37,
            "sides": [
              1,
              0,
              0,
              1,
              0,
              1
            ],
            "scales": [
              "4",
              "1",
              "1",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "4/15",
              "1/15",
              "1/15",
              "4/15",
              "1/15",
              "4/15"
            ],
            "component_mass": [
              "4/15",
              "1/15",
              "1/15",
              "4/15",
              "1/15",
              "4/15"
            ],
            "expected_utility": "13/5",
            "edge_probabilities": []
          },
          {
            "id": 38,
            "sides": [
              1,
              0,
              0,
              1,
              1,
              0
            ],
            "scales": [
              "4",
              "1",
              "1",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "4/15",
              "1/15",
              "1/15",
              "4/15",
              "4/15",
              "1/15"
            ],
            "component_mass": [
              "4/15",
              "1/15",
              "1/15",
              "4/15",
              "4/15",
              "1/15"
            ],
            "expected_utility": "12/5",
            "edge_probabilities": []
          },
          {
            "id": 39,
            "sides": [
              1,
              0,
              0,
              1,
              1,
              1
            ],
            "scales": [
              "4",
              "1",
              "1",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "1",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "2/9",
              "1/18",
              "1/18",
              "2/9",
              "2/9",
              "2/9"
            ],
            "component_mass": [
              "2/9",
              "1/18",
              "1/18",
              "2/9",
              "2/9",
              "2/9"
            ],
            "expected_utility": "17/6",
            "edge_probabilities": []
          },
          {
            "id": 40,
            "sides": [
              1,
              0,
              1,
              0,
              0,
              0
            ],
            "scales": [
              "4",
              "1",
              "4",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "1/3",
              "1/12",
              "1/3",
              "1/12",
              "1/12",
              "1/12"
            ],
            "component_mass": [
              "1/3",
              "1/12",
              "1/3",
              "1/12",
              "1/12",
              "1/12"
            ],
            "expected_utility": "7/4",
            "edge_probabilities": []
          },
          {
            "id": 41,
            "sides": [
              1,
              0,
              1,
              0,
              0,
              1
            ],
            "scales": [
              "4",
              "1",
              "4",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "4/15",
              "1/15",
              "4/15",
              "1/15",
              "1/15",
              "4/15"
            ],
            "component_mass": [
              "4/15",
              "1/15",
              "4/15",
              "1/15",
              "1/15",
              "4/15"
            ],
            "expected_utility": "12/5",
            "edge_probabilities": []
          },
          {
            "id": 42,
            "sides": [
              1,
              0,
              1,
              0,
              1,
              0
            ],
            "scales": [
              "4",
              "1",
              "4",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "4/15",
              "1/15",
              "4/15",
              "1/15",
              "4/15",
              "1/15"
            ],
            "component_mass": [
              "4/15",
              "1/15",
              "4/15",
              "1/15",
              "4/15",
              "1/15"
            ],
            "expected_utility": "11/5",
            "edge_probabilities": []
          },
          {
            "id": 43,
            "sides": [
              1,
              0,
              1,
              0,
              1,
              1
            ],
            "scales": [
              "4",
              "1",
              "4",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "2/9",
              "1/18",
              "2/9",
              "1/18",
              "2/9",
              "2/9"
            ],
            "component_mass": [
              "2/9",
              "1/18",
              "2/9",
              "1/18",
              "2/9",
              "2/9"
            ],
            "expected_utility": "8/3",
            "edge_probabilities": []
          },
          {
            "id": 44,
            "sides": [
              1,
              0,
              1,
              1,
              0,
              0
            ],
            "scales": [
              "4",
              "1",
              "4",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "4/15",
              "1/15",
              "4/15",
              "4/15",
              "1/15",
              "1/15"
            ],
            "component_mass": [
              "4/15",
              "1/15",
              "4/15",
              "4/15",
              "1/15",
              "1/15"
            ],
            "expected_utility": "2",
            "edge_probabilities": []
          },
          {
            "id": 45,
            "sides": [
              1,
              0,
              1,
              1,
              0,
              1
            ],
            "scales": [
              "4",
              "1",
              "4",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "2/9",
              "1/18",
              "2/9",
              "2/9",
              "1/18",
              "2/9"
            ],
            "component_mass": [
              "2/9",
              "1/18",
              "2/9",
              "2/9",
              "1/18",
              "2/9"
            ],
            "expected_utility": "5/2",
            "edge_probabilities": []
          },
          {
            "id": 46,
            "sides": [
              1,
              0,
              1,
              1,
              1,
              0
            ],
            "scales": [
              "4",
              "1",
              "4",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "2/9",
              "1/18",
              "2/9",
              "2/9",
              "2/9",
              "1/18"
            ],
            "component_mass": [
              "2/9",
              "1/18",
              "2/9",
              "2/9",
              "2/9",
              "1/18"
            ],
            "expected_utility": "7/3",
            "edge_probabilities": []
          },
          {
            "id": 47,
            "sides": [
              1,
              0,
              1,
              1,
              1,
              1
            ],
            "scales": [
              "4",
              "1",
              "4",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "1",
              "4",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "4/21",
              "1/21",
              "4/21",
              "4/21",
              "4/21",
              "4/21"
            ],
            "component_mass": [
              "4/21",
              "1/21",
              "4/21",
              "4/21",
              "4/21",
              "4/21"
            ],
            "expected_utility": "19/7",
            "edge_probabilities": []
          },
          {
            "id": 48,
            "sides": [
              1,
              1,
              0,
              0,
              0,
              0
            ],
            "scales": [
              "4",
              "4",
              "1",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "1/3",
              "1/3",
              "1/12",
              "1/12",
              "1/12",
              "1/12"
            ],
            "component_mass": [
              "1/3",
              "1/3",
              "1/12",
              "1/12",
              "1/12",
              "1/12"
            ],
            "expected_utility": "3/2",
            "edge_probabilities": []
          },
          {
            "id": 49,
            "sides": [
              1,
              1,
              0,
              0,
              0,
              1
            ],
            "scales": [
              "4",
              "4",
              "1",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "4/15",
              "4/15",
              "1/15",
              "1/15",
              "1/15",
              "4/15"
            ],
            "component_mass": [
              "4/15",
              "4/15",
              "1/15",
              "1/15",
              "1/15",
              "4/15"
            ],
            "expected_utility": "11/5",
            "edge_probabilities": []
          },
          {
            "id": 50,
            "sides": [
              1,
              1,
              0,
              0,
              1,
              0
            ],
            "scales": [
              "4",
              "4",
              "1",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "4/15",
              "4/15",
              "1/15",
              "1/15",
              "4/15",
              "1/15"
            ],
            "component_mass": [
              "4/15",
              "4/15",
              "1/15",
              "1/15",
              "4/15",
              "1/15"
            ],
            "expected_utility": "2",
            "edge_probabilities": []
          },
          {
            "id": 51,
            "sides": [
              1,
              1,
              0,
              0,
              1,
              1
            ],
            "scales": [
              "4",
              "4",
              "1",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "2/9",
              "2/9",
              "1/18",
              "1/18",
              "2/9",
              "2/9"
            ],
            "component_mass": [
              "2/9",
              "2/9",
              "1/18",
              "1/18",
              "2/9",
              "2/9"
            ],
            "expected_utility": "5/2",
            "edge_probabilities": []
          },
          {
            "id": 52,
            "sides": [
              1,
              1,
              0,
              1,
              0,
              0
            ],
            "scales": [
              "4",
              "4",
              "1",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "4/15",
              "4/15",
              "1/15",
              "4/15",
              "1/15",
              "1/15"
            ],
            "component_mass": [
              "4/15",
              "4/15",
              "1/15",
              "4/15",
              "1/15",
              "1/15"
            ],
            "expected_utility": "9/5",
            "edge_probabilities": []
          },
          {
            "id": 53,
            "sides": [
              1,
              1,
              0,
              1,
              0,
              1
            ],
            "scales": [
              "4",
              "4",
              "1",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "2/9",
              "2/9",
              "1/18",
              "2/9",
              "1/18",
              "2/9"
            ],
            "component_mass": [
              "2/9",
              "2/9",
              "1/18",
              "2/9",
              "1/18",
              "2/9"
            ],
            "expected_utility": "7/3",
            "edge_probabilities": []
          },
          {
            "id": 54,
            "sides": [
              1,
              1,
              0,
              1,
              1,
              0
            ],
            "scales": [
              "4",
              "4",
              "1",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "2/9",
              "2/9",
              "1/18",
              "2/9",
              "2/9",
              "1/18"
            ],
            "component_mass": [
              "2/9",
              "2/9",
              "1/18",
              "2/9",
              "2/9",
              "1/18"
            ],
            "expected_utility": "13/6",
            "edge_probabilities": []
          },
          {
            "id": 55,
            "sides": [
              1,
              1,
              0,
              1,
              1,
              1
            ],
            "scales": [
              "4",
              "4",
              "1",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "1",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "4/21",
              "4/21",
              "1/21",
              "4/21",
              "4/21",
              "4/21"
            ],
            "component_mass": [
              "4/21",
              "4/21",
              "1/21",
              "4/21",
              "4/21",
              "4/21"
            ],
            "expected_utility": "18/7",
            "edge_probabilities": []
          },
          {
            "id": 56,
            "sides": [
              1,
              1,
              1,
              0,
              0,
              0
            ],
            "scales": [
              "4",
              "4",
              "4",
              "1",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "1",
              "1",
              "1"
            ],
            "policy": [
              "4/15",
              "4/15",
              "4/15",
              "1/15",
              "1/15",
              "1/15"
            ],
            "component_mass": [
              "4/15",
              "4/15",
              "4/15",
              "1/15",
              "1/15",
              "1/15"
            ],
            "expected_utility": "8/5",
            "edge_probabilities": []
          },
          {
            "id": 57,
            "sides": [
              1,
              1,
              1,
              0,
              0,
              1
            ],
            "scales": [
              "4",
              "4",
              "4",
              "1",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "1",
              "1",
              "4"
            ],
            "policy": [
              "2/9",
              "2/9",
              "2/9",
              "1/18",
              "1/18",
              "2/9"
            ],
            "component_mass": [
              "2/9",
              "2/9",
              "2/9",
              "1/18",
              "1/18",
              "2/9"
            ],
            "expected_utility": "13/6",
            "edge_probabilities": []
          },
          {
            "id": 58,
            "sides": [
              1,
              1,
              1,
              0,
              1,
              0
            ],
            "scales": [
              "4",
              "4",
              "4",
              "1",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "1",
              "4",
              "1"
            ],
            "policy": [
              "2/9",
              "2/9",
              "2/9",
              "1/18",
              "2/9",
              "1/18"
            ],
            "component_mass": [
              "2/9",
              "2/9",
              "2/9",
              "1/18",
              "2/9",
              "1/18"
            ],
            "expected_utility": "2",
            "edge_probabilities": []
          },
          {
            "id": 59,
            "sides": [
              1,
              1,
              1,
              0,
              1,
              1
            ],
            "scales": [
              "4",
              "4",
              "4",
              "1",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "1",
              "4",
              "4"
            ],
            "policy": [
              "4/21",
              "4/21",
              "4/21",
              "1/21",
              "4/21",
              "4/21"
            ],
            "component_mass": [
              "4/21",
              "4/21",
              "4/21",
              "1/21",
              "4/21",
              "4/21"
            ],
            "expected_utility": "17/7",
            "edge_probabilities": []
          },
          {
            "id": 60,
            "sides": [
              1,
              1,
              1,
              1,
              0,
              0
            ],
            "scales": [
              "4",
              "4",
              "4",
              "4",
              "1",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "4",
              "1",
              "1"
            ],
            "policy": [
              "2/9",
              "2/9",
              "2/9",
              "2/9",
              "1/18",
              "1/18"
            ],
            "component_mass": [
              "2/9",
              "2/9",
              "2/9",
              "2/9",
              "1/18",
              "1/18"
            ],
            "expected_utility": "11/6",
            "edge_probabilities": []
          },
          {
            "id": 61,
            "sides": [
              1,
              1,
              1,
              1,
              0,
              1
            ],
            "scales": [
              "4",
              "4",
              "4",
              "4",
              "1",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "4",
              "1",
              "4"
            ],
            "policy": [
              "4/21",
              "4/21",
              "4/21",
              "4/21",
              "1/21",
              "4/21"
            ],
            "component_mass": [
              "4/21",
              "4/21",
              "4/21",
              "4/21",
              "1/21",
              "4/21"
            ],
            "expected_utility": "16/7",
            "edge_probabilities": []
          },
          {
            "id": 62,
            "sides": [
              1,
              1,
              1,
              1,
              1,
              0
            ],
            "scales": [
              "4",
              "4",
              "4",
              "4",
              "4",
              "1"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "4",
              "4",
              "1"
            ],
            "policy": [
              "4/21",
              "4/21",
              "4/21",
              "4/21",
              "4/21",
              "1/21"
            ],
            "component_mass": [
              "4/21",
              "4/21",
              "4/21",
              "4/21",
              "4/21",
              "1/21"
            ],
            "expected_utility": "15/7",
            "edge_probabilities": []
          },
          {
            "id": 63,
            "sides": [
              1,
              1,
              1,
              1,
              1,
              1
            ],
            "scales": [
              "4",
              "4",
              "4",
              "4",
              "4",
              "4"
            ],
            "merits": [
              "4",
              "4",
              "4",
              "4",
              "4",
              "4"
            ],
            "policy": [
              "1/6",
              "1/6",
              "1/6",
              "1/6",
              "1/6",
              "1/6"
            ],
            "component_mass": [
              "1/6",
              "1/6",
              "1/6",
              "1/6",
              "1/6",
              "1/6"
            ],
            "expected_utility": "5/2",
            "edge_probabilities": []
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              31
            ],
            "maximum_vertices": [
              32
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              47
            ],
            "maximum_vertices": [
              16
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              55
            ],
            "maximum_vertices": [
              8
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              59
            ],
            "maximum_vertices": [
              4
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              61
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              62
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              31
            ],
            "maximum_vertices": [
              32
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              47
            ],
            "maximum_vertices": [
              16
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              55
            ],
            "maximum_vertices": [
              8
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              59
            ],
            "maximum_vertices": [
              4
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              61
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "1/21",
            "maximum": "4/9",
            "minimum_vertices": [
              62
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "3/2",
          "maximum": "7/2",
          "minimum_vertices": [
            48
          ],
          "maximum_vertices": [
            3
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31
            ],
            "maximum_vertices": [
              32,
              33,
              34,
              35,
              36,
              37,
              38,
              39,
              40,
              41,
              42,
              43,
              44,
              45,
              46,
              47
            ]
          },
          {
            "left": 0,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31
            ],
            "maximum_vertices": [
              32,
              33,
              34,
              35,
              36,
              37,
              38,
              39,
              48,
              49,
              50,
              51,
              52,
              53,
              54,
              55
            ]
          },
          {
            "left": 0,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              4,
              5,
              6,
              7,
              12,
              13,
              14,
              15,
              20,
              21,
              22,
              23,
              28,
              29,
              30,
              31
            ],
            "maximum_vertices": [
              32,
              33,
              34,
              35,
              40,
              41,
              42,
              43,
              48,
              49,
              50,
              51,
              56,
              57,
              58,
              59
            ]
          },
          {
            "left": 0,
            "right": 4,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              2,
              3,
              6,
              7,
              10,
              11,
              14,
              15,
              18,
              19,
              22,
              23,
              26,
              27,
              30,
              31
            ],
            "maximum_vertices": [
              32,
              33,
              36,
              37,
              40,
              41,
              44,
              45,
              48,
              49,
              52,
              53,
              56,
              57,
              60,
              61
            ]
          },
          {
            "left": 0,
            "right": 5,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1,
              3,
              5,
              7,
              9,
              11,
              13,
              15,
              17,
              19,
              21,
              23,
              25,
              27,
              29,
              31
            ],
            "maximum_vertices": [
              32,
              34,
              36,
              38,
              40,
              42,
              44,
              46,
              48,
              50,
              52,
              54,
              56,
              58,
              60,
              62
            ]
          },
          {
            "left": 1,
            "right": 2,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              40,
              41,
              42,
              43,
              44,
              45,
              46,
              47
            ],
            "maximum_vertices": [
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              48,
              49,
              50,
              51,
              52,
              53,
              54,
              55
            ]
          },
          {
            "left": 1,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              4,
              5,
              6,
              7,
              12,
              13,
              14,
              15,
              36,
              37,
              38,
              39,
              44,
              45,
              46,
              47
            ],
            "maximum_vertices": [
              16,
              17,
              18,
              19,
              24,
              25,
              26,
              27,
              48,
              49,
              50,
              51,
              56,
              57,
              58,
              59
            ]
          },
          {
            "left": 1,
            "right": 4,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              2,
              3,
              6,
              7,
              10,
              11,
              14,
              15,
              34,
              35,
              38,
              39,
              42,
              43,
              46,
              47
            ],
            "maximum_vertices": [
              16,
              17,
              20,
              21,
              24,
              25,
              28,
              29,
              48,
              49,
              52,
              53,
              56,
              57,
              60,
              61
            ]
          },
          {
            "left": 1,
            "right": 5,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1,
              3,
              5,
              7,
              9,
              11,
              13,
              15,
              33,
              35,
              37,
              39,
              41,
              43,
              45,
              47
            ],
            "maximum_vertices": [
              16,
              18,
              20,
              22,
              24,
              26,
              28,
              30,
              48,
              50,
              52,
              54,
              56,
              58,
              60,
              62
            ]
          },
          {
            "left": 2,
            "right": 3,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              4,
              5,
              6,
              7,
              20,
              21,
              22,
              23,
              36,
              37,
              38,
              39,
              52,
              53,
              54,
              55
            ],
            "maximum_vertices": [
              8,
              9,
              10,
              11,
              24,
              25,
              26,
              27,
              40,
              41,
              42,
              43,
              56,
              57,
              58,
              59
            ]
          },
          {
            "left": 2,
            "right": 4,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              2,
              3,
              6,
              7,
              18,
              19,
              22,
              23,
              34,
              35,
              38,
              39,
              50,
              51,
              54,
              55
            ],
            "maximum_vertices": [
              8,
              9,
              12,
              13,
              24,
              25,
              28,
              29,
              40,
              41,
              44,
              45,
              56,
              57,
              60,
              61
            ]
          },
          {
            "left": 2,
            "right": 5,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1,
              3,
              5,
              7,
              17,
              19,
              21,
              23,
              33,
              35,
              37,
              39,
              49,
              51,
              53,
              55
            ],
            "maximum_vertices": [
              8,
              10,
              12,
              14,
              24,
              26,
              28,
              30,
              40,
              42,
              44,
              46,
              56,
              58,
              60,
              62
            ]
          },
          {
            "left": 3,
            "right": 4,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              2,
              3,
              10,
              11,
              18,
              19,
              26,
              27,
              34,
              35,
              42,
              43,
              50,
              51,
              58,
              59
            ],
            "maximum_vertices": [
              4,
              5,
              12,
              13,
              20,
              21,
              28,
              29,
              36,
              37,
              44,
              45,
              52,
              53,
              60,
              61
            ]
          },
          {
            "left": 3,
            "right": 5,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1,
              3,
              9,
              11,
              17,
              19,
              25,
              27,
              33,
              35,
              41,
              43,
              49,
              51,
              57,
              59
            ],
            "maximum_vertices": [
              4,
              6,
              12,
              14,
              20,
              22,
              28,
              30,
              36,
              38,
              44,
              46,
              52,
              54,
              60,
              62
            ]
          },
          {
            "left": 4,
            "right": 5,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1,
              5,
              9,
              13,
              17,
              21,
              25,
              29,
              33,
              37,
              41,
              45,
              49,
              53,
              57,
              61
            ],
            "maximum_vertices": [
              2,
              6,
              10,
              14,
              18,
              22,
              26,
              30,
              34,
              38,
              42,
              46,
              50,
              54,
              58,
              62
            ]
          }
        ]
      }
    }
  },
  {
    "id": "tiny_mass",
    "title": "Tiny reference mass stays exact",
    "input": {
      "items": [
        "A",
        "B"
      ],
      "reference": [
        "1/340282366920938463463374607431768211456",
        "340282366920938463463374607431768211455/340282366920938463463374607431768211456"
      ],
      "comparisons": [],
      "scale_bounds": [
        [
          "1",
          "4"
        ],
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        1,
        0
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A",
          "B"
        ],
        "reference": [
          "1/340282366920938463463374607431768211456",
          "340282366920938463463374607431768211455/340282366920938463463374607431768211456"
        ],
        "comparisons": [],
        "scale_bounds": [
          [
            "1",
            "4"
          ],
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "1",
          "0"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        },
        {
          "id": 1,
          "anchor": 1,
          "items": [
            1
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0,
        1
      ],
      "canonical_merits": [
        "1",
        "1"
      ],
      "anchor_paths": [
        [
          0
        ],
        [
          1
        ]
      ],
      "constraints": [],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 2,
      "relative_scale_degrees": 1,
      "policy_family": {
        "component_base_weights": [
          "1/340282366920938463463374607431768211456",
          "340282366920938463463374607431768211455/340282366920938463463374607431768211456"
        ],
        "within_component_policy": [
          "1",
          "1"
        ],
        "policy_identified_without_bounds": false,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0,
              0
            ],
            "scales": [
              "1",
              "1"
            ],
            "merits": [
              "1",
              "1"
            ],
            "policy": [
              "1/340282366920938463463374607431768211456",
              "340282366920938463463374607431768211455/340282366920938463463374607431768211456"
            ],
            "component_mass": [
              "1/340282366920938463463374607431768211456",
              "340282366920938463463374607431768211455/340282366920938463463374607431768211456"
            ],
            "expected_utility": "1/340282366920938463463374607431768211456",
            "edge_probabilities": []
          },
          {
            "id": 1,
            "sides": [
              0,
              1
            ],
            "scales": [
              "1",
              "4"
            ],
            "merits": [
              "1",
              "4"
            ],
            "policy": [
              "1/1361129467683753853853498429727072845821",
              "1361129467683753853853498429727072845820/1361129467683753853853498429727072845821"
            ],
            "component_mass": [
              "1/1361129467683753853853498429727072845821",
              "1361129467683753853853498429727072845820/1361129467683753853853498429727072845821"
            ],
            "expected_utility": "1/1361129467683753853853498429727072845821",
            "edge_probabilities": []
          },
          {
            "id": 2,
            "sides": [
              1,
              0
            ],
            "scales": [
              "4",
              "1"
            ],
            "merits": [
              "4",
              "1"
            ],
            "policy": [
              "4/340282366920938463463374607431768211459",
              "340282366920938463463374607431768211455/340282366920938463463374607431768211459"
            ],
            "component_mass": [
              "4/340282366920938463463374607431768211459",
              "340282366920938463463374607431768211455/340282366920938463463374607431768211459"
            ],
            "expected_utility": "4/340282366920938463463374607431768211459",
            "edge_probabilities": []
          },
          {
            "id": 3,
            "sides": [
              1,
              1
            ],
            "scales": [
              "4",
              "4"
            ],
            "merits": [
              "4",
              "4"
            ],
            "policy": [
              "1/340282366920938463463374607431768211456",
              "340282366920938463463374607431768211455/340282366920938463463374607431768211456"
            ],
            "component_mass": [
              "1/340282366920938463463374607431768211456",
              "340282366920938463463374607431768211455/340282366920938463463374607431768211456"
            ],
            "expected_utility": "1/340282366920938463463374607431768211456",
            "edge_probabilities": []
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "1/1361129467683753853853498429727072845821",
            "maximum": "4/340282366920938463463374607431768211459",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "340282366920938463463374607431768211455/340282366920938463463374607431768211459",
            "maximum": "1361129467683753853853498429727072845820/1361129467683753853853498429727072845821",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1/1361129467683753853853498429727072845821",
            "maximum": "4/340282366920938463463374607431768211459",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          },
          {
            "minimum": "340282366920938463463374607431768211455/340282366920938463463374607431768211459",
            "maximum": "1361129467683753853853498429727072845820/1361129467683753853853498429727072845821",
            "minimum_vertices": [
              2
            ],
            "maximum_vertices": [
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "1/1361129467683753853853498429727072845821",
          "maximum": "4/340282366920938463463374607431768211459",
          "minimum_vertices": [
            1
          ],
          "maximum_vertices": [
            2
          ]
        },
        "pair_probability_ranges": [
          {
            "left": 0,
            "right": 1,
            "identified_without_bounds": false,
            "minimum": "1/5",
            "maximum": "4/5",
            "minimum_vertices": [
              1
            ],
            "maximum_vertices": [
              2
            ]
          }
        ]
      }
    }
  },
  {
    "id": "single_item",
    "title": "One item has a unique policy without any comparison",
    "input": {
      "items": [
        "A"
      ],
      "reference": [
        "1/1"
      ],
      "comparisons": [],
      "scale_bounds": [
        [
          "1",
          "4"
        ]
      ],
      "utility": [
        1
      ]
    },
    "report": {
      "schema": "alignlab-identification-v1",
      "input": {
        "items": [
          "A"
        ],
        "reference": [
          "1"
        ],
        "comparisons": [],
        "scale_bounds": [
          [
            "1",
            "4"
          ]
        ],
        "utility": [
          "1"
        ]
      },
      "beta": 1,
      "components": [
        {
          "id": 0,
          "anchor": 0,
          "items": [
            0
          ],
          "scale_bounds": [
            "1",
            "4"
          ]
        }
      ],
      "component_of": [
        0
      ],
      "canonical_merits": [
        "1"
      ],
      "anchor_paths": [
        [
          0
        ]
      ],
      "constraints": [],
      "consistent": true,
      "cycle_witnesses": [],
      "free_component_scales": 1,
      "relative_scale_degrees": 0,
      "policy_family": {
        "component_base_weights": [
          "1"
        ],
        "within_component_policy": [
          "1"
        ],
        "policy_identified_without_bounds": true,
        "unbounded_component_mass_simplex_interior": true,
        "vertices": [
          {
            "id": 0,
            "sides": [
              0
            ],
            "scales": [
              "1"
            ],
            "merits": [
              "1"
            ],
            "policy": [
              "1"
            ],
            "component_mass": [
              "1"
            ],
            "expected_utility": "1",
            "edge_probabilities": []
          },
          {
            "id": 1,
            "sides": [
              1
            ],
            "scales": [
              "4"
            ],
            "merits": [
              "4"
            ],
            "policy": [
              "1"
            ],
            "component_mass": [
              "1"
            ],
            "expected_utility": "1",
            "edge_probabilities": []
          }
        ],
        "action_mass_ranges": [
          {
            "minimum": "1",
            "maximum": "1",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          }
        ],
        "component_mass_ranges": [
          {
            "minimum": "1",
            "maximum": "1",
            "minimum_vertices": [
              0,
              1
            ],
            "maximum_vertices": [
              0,
              1
            ]
          }
        ],
        "utility_range": {
          "minimum": "1",
          "maximum": "1",
          "minimum_vertices": [
            0,
            1
          ],
          "maximum_vertices": [
            0,
            1
          ]
        },
        "pair_probability_ranges": []
      }
    }
  }
];
