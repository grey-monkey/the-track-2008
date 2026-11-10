import assert from 'node:assert/strict';
import fs from 'node:fs';import zlib from 'node:zlib';
import {createRetarget} from '../source/motion135/retarget.mjs';
const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/articulated135.json.gz',import.meta.url))));
const retarget=createRetarget(d.rig,d.skeleton);assert.equal(d.rig.bones.length,53);
let vertices=0,samples=0;
for(const parts of Object.values(d.rig.characters))for(const p of Object.values(parts)){assert.equal(p.joints.length,p.count*8);assert.equal(p.weights.length,p.count*8);for(let i=0;i<p.count;i++){let sum=0;for(let k=0;k<8;k++){const at=i*8+k;assert(p.joints[at]>=0&&p.joints[at]<d.rig.bones.length);assert(Number.isFinite(p.weights[at])&&p.weights[at]>=0);sum+=p.weights[at];}assert(Math.abs(sum-1)<1e-5);vertices++;}}
for(const c of Object.values(d.clips))for(let i=0;i<=20;i++){const p=retarget.sample(c,c.duration*i/20);assert.equal(p.skin.length,d.rig.bones.length);for(const m of p.skin)assert(m.elements.every(Number.isFinite));assert(p.board.position.toArray().every(Number.isFinite));assert(p.board.rotation.toArray().every(Number.isFinite));samples++;}
for(const ids of Object.values(d.contacts.soleVertexIds))for(const id of ids)assert(id>=0&&id<d.rig.characters.DOG.shoes.count);
console.log(`PASS ${vertices} normalized vertex bindings; ${samples} sampled full-body poses; both shoe-contact sets.`);
