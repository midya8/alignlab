#!/usr/bin/env bash
set -euo pipefail
root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
python -m pip wheel --no-deps "$root" --wheel-dir "$tmp/wheels" >/dev/null
python -m venv "$tmp/venv"
"$tmp/venv/bin/python" -m pip install --no-index "$tmp"/wheels/*.whl >/dev/null
cd "$tmp"
"$tmp/venv/bin/python" -m alignlab frontier-demo regenerated.json > demo.json
"$tmp/venv/bin/python" -m alignlab evaluate --format json > evaluate.json
"$tmp/venv/bin/python" -m alignlab gates --min-reward-accuracy .75 --min-true-utility-gain 2 --max-kl 1.2 --max-control-gain .2 --min-nokl-kl 1.5 > gates.txt
"$tmp/venv/bin/python" - <<'PY'
import gzip,importlib,json,pathlib,math
for name in ['cli','data','eval','policy','reward','frontier','frontier_report','frontier_fixtures','frontier_witnesses']:
    importlib.import_module('alignlab.'+name)
import alignlab
from alignlab.frontier import audit_policy
from alignlab.frontier_report import report
from alignlab.frontier_witnesses import controls,witnesses
root=pathlib.Path(alignlab.__file__).parent/'frontier_data'
f=json.loads(gzip.decompress((root/'3-frozen.json.gz').read_bytes()))
r=json.loads(pathlib.Path('regenerated.json').read_text())
def compare(a,b,path='',tol=1e-11):
    if isinstance(a,dict):
        assert a.keys()==b.keys(),path
        for k in a:compare(a[k],b[k],path+'/'+k,tol)
    elif isinstance(a,list):
        assert len(a)==len(b),path
        for i,(x,y)in enumerate(zip(a,b)):compare(x,y,path+'/'+str(i),tol)
    elif type(a)in(int,float):
        assert type(b)in(int,float)and math.isclose(a,b,abs_tol=tol,rel_tol=tol),(path,a,b)
    else:assert a==b,(path,a,b)
compare(f,r)
assert json.load(open('evaluate.json'))==json.load(open('demo.json'))['original_report']
compare(json.load(open('evaluate.json')),f['original_report'])
w=json.loads(gzip.decompress((root/'4-witnesses.json.gz').read_bytes()))
assert len(w['witnesses'])==35
for item in w['witnesses']:compare(item['report'],report(item['input']),tol=1e-12)
for name,run in f['runs'].items():
    rewards=f['noise_rewards']if name=='original_noise_control'else f['learned_rewards']
    assert len(run['trajectory'])==201
    for row in run['trajectory']:compare(row['audit'],audit_policy(rewards,f['reference'],row['policy'],run['beta']),tol=1e-12)
assert 'All gates passed' in open('gates.txt').read()
pathlib.Path('input.json').write_text(json.dumps(controls()['two_action_exact']))
print('9 modules import; original reward/control training, all data, all1005states and originalreport reconstructed at1e-11;35frozen reports and1005frozen audit states checked at1e-12 outside checkout')
PY
"$tmp/venv/bin/python" -m alignlab frontier-audit input.json > audit.json
"$tmp/venv/bin/python" - <<'PY'
import json
r=json.load(open('audit.json'))
assert abs(r['current']['optimum']['probabilities'][0]-.25)<1e-14
assert abs(r['current']['identity_residual'])<1e-12
print('All four commands execute; installed analytic two-action optimum equals [1/4,3/4]')
PY
"$tmp/venv/bin/python" -m alignlab.identification_cli demo --output identification.json
"$tmp/venv/bin/python" - "$root" <<'PY'
import json,pathlib,sys,subprocess
from alignlab.identification_verify import verify
root=pathlib.Path(sys.argv[1])
source=(root/'docs/identification-data.js').read_text()
expected=json.loads(source.removeprefix('globalThis.AlignLabIdentificationFixtures = ').removesuffix(';\n'))
actual=json.loads(pathlib.Path('identification.json').read_text())
assert actual==expected
for f in actual:
    verify(f['input'],f['report'])
    pathlib.Path('exact-input.json').write_text(json.dumps(f['input']))
    subprocess.run([sys.executable,'-m','alignlab.identification_cli','audit','exact-input.json','--output','exact-report.json'],check=True)
    assert json.loads(pathlib.Path('exact-report.json').read_text())==f['report']
    result=subprocess.run([sys.executable,'-m','alignlab.identification_cli','verify','exact-input.json','exact-report.json'],check=True,capture_output=True,text=True)
    assert json.loads(result.stdout)['verified'] is True
print('Installed exact CLI reconstructs and independently verifies all12complete reports,107corners, every audit/verify roundtrip outside checkout')
PY
