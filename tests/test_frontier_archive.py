"""Full frozen/retrained comparisons. No original gate/test is changed."""
import gzip
import json
import math
from pathlib import Path
import unittest
from alignlab.frontier_fixtures import reproduce_original
from alignlab.frontier_witnesses import witnesses
from alignlab.frontier_report import report

class ArchiveTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        root = Path(__file__).resolve().parents[1]
        cls.frozen = json.loads(gzip.decompress((root/'alignlab/frontier_data/3-frozen.json.gz').read_bytes()))
        cls.witnesses = json.loads(gzip.decompress((root/'alignlab/frontier_data/4-witnesses.json.gz').read_bytes()))
        cls.web = json.loads((root/'docs/2-data.js').read_text().split('window.ALIGN_DATA=',1)[1].rstrip().removesuffix(';'))

    def compare(self, a, b, tol=1e-12, path='root'):
        if isinstance(a,dict):
            self.assertEqual(a.keys(), b.keys(), path)
            for k in a: self.compare(a[k],b[k],tol,path+'/'+k)
        elif isinstance(a,list):
            self.assertEqual(len(a),len(b),path)
            for i,(x,y) in enumerate(zip(a,b)):self.compare(x,y,tol,path+'/'+str(i))
        elif type(a) in (float,int):
            self.assertIn(type(b),(float,int),path)
            self.assertTrue(math.isclose(a,b,abs_tol=tol,rel_tol=tol),(path,a,b))
        else:self.assertEqual(a,b,path)

    def test_full_retraining_archive_all_data_models_1005_states(self):
        self.compare(self.frozen,reproduce_original(),tol=1e-11)

    def test_all_35_complete_frozen_witnesses_regenerated(self):
        self.assertEqual(len(self.witnesses['witnesses']),35)
        self.compare(self.witnesses,witnesses(self.frozen))
        for w in self.witnesses['witnesses']:self.compare(w['report'],report(w['input']))

    def test_browser_fixture_retains_every_original_record(self):
        for k,v in self.frozen.items():
            if k=='runs':
                for name,run in v.items():
                    self.assertEqual(len(run['trajectory']),201)
                    for row in run['trajectory']:
                        self.compare({k:v for k,v in row.items() if k!='audit'},self.web['runs'][name]['trajectory'][row['step']])
            else:self.compare(v,self.web[k])
