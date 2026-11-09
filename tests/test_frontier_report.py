import json
import math
import unittest
from copy import deepcopy

from alignlab.cli import main
from alignlab.frontier_report import parse_json, report, validate

PAYLOAD = {'rewards': [0, math.log(3)], 'reference': [.5, .5],
           'policy': [.5, .5], 'beta': 1, 'budget': .1,
           'evaluation_utilities': [1, 0], 'labels': ['first', 'second']}

class ReportTests(unittest.TestCase):
    def test_report_is_strict_complete_json(self):
        r = report(PAYLOAD)
        json.dumps(r, allow_nan=False)
        self.assertEqual(len(r['styles']), 2)
        self.assertEqual(len(r['beta_samples']), 13)
        self.assertEqual(len(r['budget_samples']), 33)
        self.assertEqual(r['styles'][1]['position'], 1)
        self.assertAlmostEqual(r['evaluation_utilities']['optimum'], .25)
        self.assertAlmostEqual(r['current']['identity_residual'], 0)

    def test_evaluation_utilities_are_optional_not_inferred(self):
        v = dict(PAYLOAD)
        del v['evaluation_utilities']
        self.assertTrue(all(x is None for x in report(v)['evaluation_utilities'].values()))
        v['evaluation_utilities'] = None
        with self.assertRaises(ValueError): validate(v)

    def test_unknown_keys_and_bad_labels(self):
        for key, value in [('extra', 1), ('labels', ['a']), ('labels', [True, 'b']),
                           ('labels', ['a'*65, 'b']), ('evaluation_utilities', [0, math.inf])]:
            v = deepcopy(PAYLOAD); v[key] = value
            with self.assertRaises(ValueError): validate(v)
        v = deepcopy(PAYLOAD); v['labels'] = ['😀'*64, 'b']
        self.assertEqual(validate(v)['labels'][0], '😀'*64)

    def test_strict_parser(self):
        for text in ['{"x":1,"x":2}', 'NaN', '[1e999]', '{"x":Infinity}',
                     'x', '{} []', '{"\\u0078":1,"x":2}', '['*65+'0'+']'*65,
                     ' '*1000001]:
            with self.assertRaises(ValueError): parse_json(text)
        self.assertEqual(parse_json('{"x":[null,true,1.5]}'), {'x':[None,True,1.5]})

    def test_report_does_not_change_input(self):
        v = deepcopy(PAYLOAD)
        before = deepcopy(v)
        report(v)
        self.assertEqual(v, before)
