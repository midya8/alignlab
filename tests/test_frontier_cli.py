import contextlib
import io
import json
import pathlib
import tempfile
import unittest

from alignlab.cli import main
from alignlab.frontier_report import report
from alignlab.frontier_witnesses import controls

class FrontierCLITests(unittest.TestCase):
    def test_audit_command_matches_imported_report(self):
        value = controls()['two_action_exact']
        with tempfile.TemporaryDirectory() as d:
            p = pathlib.Path(d)/'input.json'; p.write_text(json.dumps(value))
            output = io.StringIO()
            with contextlib.redirect_stdout(output):
                self.assertEqual(main(['frontier-audit', str(p)]), 0)
            self.assertEqual(json.loads(output.getvalue()), report(value))

    def test_bad_file_and_duplicate_key_fail_closed(self):
        with tempfile.TemporaryDirectory() as d:
            p=pathlib.Path(d)/'input.json'
            for content in [b'{"x":1,"x":2}', b'\xff', b' '*1000001]:
                p.write_bytes(content)
                with contextlib.redirect_stderr(io.StringIO()):
                    self.assertEqual(main(['frontier-audit',str(p)]), 2)
            with contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(main(['frontier-audit',str(p)+'missing']), 2)

    def test_demo_reproduces_full_original_fixture(self):
        with tempfile.TemporaryDirectory() as d:
            p=pathlib.Path(d)/'fixture.json'; output=io.StringIO()
            with contextlib.redirect_stdout(output):
                self.assertEqual(main(['frontier-demo',str(p)]), 0)
            value=json.loads(p.read_text())
            summary=json.loads(output.getvalue())
            self.assertEqual(summary['states'], 1005)
            self.assertEqual(summary['original_report'],value['original_report'])
