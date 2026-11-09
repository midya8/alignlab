'use strict';
const fs=require('node:fs'),zlib=require('node:zlib'),path=require('node:path'),assert=require('node:assert/strict');
const load=name=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.resolve(__dirname,'../alignlab/frontier_data/'+name+'.json.gz'))));
const fixture=load('frozen'),witnesses=load('witnesses').witnesses;
function equal(actual,expected,p='root'){if(typeof expected==='number'){assert.ok(Number.isFinite(actual)&&Math.abs(actual-expected)<=1e-12*Math.max(1,Math.abs(expected)),p+': '+actual+' vs '+expected)}else if(expected===null||typeof expected!=='object'){assert.equal(actual,expected,p)}else{assert.deepEqual(Object.keys(actual).sort(),Object.keys(expected).sort(),p+' keys');for(const k of Object.keys(expected))equal(actual[k],expected[k],p+'.'+k)}}
module.exports={fixture,witnesses,equal};
