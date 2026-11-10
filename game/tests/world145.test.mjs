import test from 'node:test';
import assert from 'node:assert/strict';
import {clearFootprint145,pathDistance145,worldPoint145} from '../source/world145/layout.mjs';
import {RAMP,at} from '../source/road-details.js';
import {FOOTPATH,sample,heading} from '../source/world.js';
test('scenery footprint rejects pavement and central path, including rotated corners',()=>{
 for(const s of [20,40,96,138,350,490]){const p=sample(s),a=-heading(s)+Math.PI/2;assert.equal(clearFootprint145({...p,a},3.2,5.3),false);}
 for(const p of FOOTPATH){assert.equal(pathDistance145(p.x,p.z),0);assert.equal(clearFootprint145({...p,a:.6},4,5),false);}
 const sites=[9,12,15].map(u=>({...at(RAMP,u,8),a:Math.PI/2-RAMP.h}));assert(sites.some(c=>clearFootprint145(c,5.7,6.4)));
});
test('layout local frame is orthonormal so footprint safety survives rotation',()=>{
 for(const a of [-3,-1,0,.7,2.8]){const c={x:12,z:9,a},p=worldPoint145(c,3,4);assert(Math.abs(Math.hypot(p.x-c.x,p.z-c.z)-5)<1e-10);}
});
