"use strict";
const test = require("node:test"),
  assert = require("node:assert/strict");
const E = require("../docs/identification-engine.js");
require("../docs/identification-data.js");
const fixtures = globalThis.AlignLabIdentificationFixtures;
test("independent BigInt evaluator equals every field of all 12 Python reports", () => {
  for (const f of fixtures) assert.deepEqual(E.audit(f.input), f.report, f.id);
});
test("strict browser JSON parser rejects duplicate/escaped keys, unsafe integers, floats and depth", () => {
  for (const s of [
    '{"a":1,"a":2}',
    '{"a":1,"\\u0061":2}',
    '{"a":0.5}',
    '{"a":NaN}',
    '{"a":1e2}',
    '{"a":9007199254740992}',
    "[".repeat(49) + "]".repeat(49),
  ])
    assert.throws(() => E.parse(s), s);
  assert.deepEqual(E.parse('{"a":[1,"1/2",true,false,null]}'), {
    a: [1, "1/2", true, false, null],
  });
  assert.deepEqual(
    E.parse("[".repeat(48) + "1" + "]".repeat(48)),
    JSON.parse("[".repeat(48) + "1" + "]".repeat(48)),
  );
});
test("all exact-control input bounds and orientation invariance", () => {
  const x = structuredClone(fixtures[0].input);
  x.comparisons.reverse();
  for (const e of x.comparisons) {
    [e.left, e.right] = [e.right, e.left];
    e.probability = E.rational(1).sub(E.rational(e.probability)).toString();
  }
  assert.deepEqual(E.audit(x), fixtures[0].report);
  for (const mutate of [
    (x) => (x.reference[0] = 0.25),
    (x) => (x.reference[0] = 0),
    (x) => (x.comparisons[0].probability = 1),
    (x) => x.scale_bounds.pop(),
    (x) => (x.items[1] = "A"),
    (x) => x.comparisons.push(x.comparisons[0]),
    (x) => (x.comparisons[0].left = true),
    (x) => (x.extra = 1),
  ]) {
    const bad = structuredClone(fixtures[0].input);
    mutate(bad);
    assert.throws(() => E.audit(bad));
  }
});
