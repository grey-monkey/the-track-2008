import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {performance} from 'node:perf_hooks';
import {sampleRideResponse as sample} from '../../outputs/painted-prototype/motion126/response.mjs';
import {sampleRideResponse as prior} from '../../outputs/painted-prototype/motion125/response.mjs';
import {clips} from '../../outputs/painted-prototype/motion126/clips.js';
const require=createRequire(import.meta.url),cur=require('./physics.cjs'),old=require('../playtest125/physics.cjs');
const strip=r=>Object.fromEntries(Object.entries(r).filter(([k])=>!['motionLoad','motionBrake','rampDeparture','rampApproach','motionHolding','motionReleaseAge','motionRelease','motionSpeed','motionReleaseStart'].includes(k)));
for(const board of ['LONGBOARD','HANDMEDOWN','CRUISER','STREET']){
 const a=new old.Ride({board,rider:'SALLY',start:40}),b=new cur.Ride({board,rider:'SALLY',start:40});
 for(const s of [a,b])s.hazards={tick(){},riding(){},event(){},rideable(){return true}};
 for(let i=0;i<600;i++){if(i===420){a.release();b.release();}const input={steer:i>280&&i<350?.8:0,crouch:i%100<30};a.step(input,cur.STEP);b.step(input,cur.STEP);assert.deepEqual(strip(b.rider),strip(a.rider));assert.deepEqual(b.car,a.car);}
}
// Identical ramp impulses, flight trajectory and landing speed.
for(const board of ['LONGBOARD','HANDMEDOWN','CRUISER','STREET']){
 const pair=[old,cur].map(m=>{const s=new m.Ride({board,rider:'SALLY',start:m.station(m.RAMP)});s.phase='coasting';Object.assign(s.rider,m.at(m.RAMP,0,-2),{heading:m.RAMP.h,vx:7*m.RAMP.co,vz:7*m.RAMP.si,holding:false});s.hazards={tick(){},riding(){},event(){},rideable(){return true}};return s;});
 for(let i=0;i<216;i++){pair.forEach(s=>s.step({},cur.STEP));assert.deepEqual(strip(pair[1].rider),strip(pair[0].rider));assert.deepEqual(pair[1].car,pair[0].car);}
}
const field=n=>JSON.parse(readFileSync(`outputs/painted-prototype/motion${n}/carve-field.js`,'utf8').replace(/^export const field=/,'').replace(/;\s*$/,''));
const a=field(125),b=field(126);assert.deepEqual(a.points,b.points);for(const k of Object.keys(a.poses))assert.deepEqual(a.poses[k],b.poses[k]);
const ankleMax=Math.max(...['load','brake','flight'].flatMap(k=>Object.values(b.footErrors[k])));assert(ankleMax<1e-5);
const peaks={};for(const c of clips){peaks[c.kind]={load:0,brake:0,flight:0,compression:0};for(const f of c.frames){const n=sample(f);for(const k of ['load','brake','flight','compression']){assert(Number.isFinite(n[k])&&n[k]>=0&&n[k]<=1);peaks[c.kind][k]=Math.max(peaks[c.kind][k],n[k]);}if(['slide','slide-right','patch'].includes(c.kind)){const p=prior(f);for(const k of ['slide','yank','grip'])assert.equal(n[k],p[k]);assert(n.compression>=p.compression-1e-10&&n.compression<=p.compression+.201);}}}
assert(peaks.load.load>.7);assert(peaks.brake.brake>.6);assert(peaks.ramp.flight>.7);
const ramp=clips.find(c=>c.kind==='ramp');assert(ramp.frames.some(f=>sample(f).kind==='RAMP_PREPARE'));assert(ramp.frames.some(f=>sample(f).kind==='RAMP_EXTENSION'));assert(ramp.frames.some(f=>sample(f).kind==='LANDING'));assert.equal(sample(ramp.frames.at(-1)).flight,0);
const peak=ramp.frames.find(f=>sample(f).flight>.7);
for(const phase of ['crashed','ended','regroup']){const n=sample({...peak,phase});for(const k of ['load','brake','flight','compression'])assert.equal(n[k],0);assert.equal(n.rampAir,null);}
assert.equal(sample(peak,{},true).flight,0);assert.equal(sample({...peak,rider:{...peak.rider,trick:'kickflip'}}).rampAir,null);
const time=performance.now(),out={};for(let i=0;i<100000;i++)sample(peak,out);const us=(performance.now()-time)*.01;
const result={physicsUnchangedAllFourBoards:true,rampTrajectoryUnchanged:true,acceptedFieldsPreserved:true,slidePatchRegression:true,menuCrashTrickOwnership:true,lockedAnkleMaxErrorMetres:ankleMax,peaks,samplerMicroseconds:us};writeFileSync('work/playtest126/check-results.json',JSON.stringify(result,null,2));console.log(result);

const release=clips.find(c=>c.kind==='release').frames.filter(f=>!f.rider.holding);
assert(release.length>100);
let previous=0;for(const f of release){const r=sample(f);assert(r.release>=previous-1e-10);assert(r.release-previous<.03);previous=r.release;}assert.equal(previous,1);
for(const speed of [0,2,4,7,11,15]){const f=structuredClone(clips.find(c=>c.kind==='speed').frames[20]);f.hazardEvents=[];Object.assign(f.rider,{motionSpeed:Math.max(0,Math.min(1,(speed-4)/7)),height:0,up:0,bump:0,bumpVelocity:0,motionSlide:0,towCatchEvent:null,gripCatchEvent:null,rideLanding:null});const n=sample(f);assert(n.speedPosture>=0&&n.speedPosture<=.2);if(speed<=4)assert.equal(n.speedPosture,0);}
for(const c of clips)for(const f of c.frames){const n=sample(f);for(const k of ['coast','speedPosture'])assert(Number.isFinite(n[k])&&n[k]>=0&&n[k]<=.2);for(const phase of ['crashed','ended','regroup']){const suppressed=sample({...f,phase});assert.equal(suppressed.coast,0);assert.equal(suppressed.speedPosture,0);assert.equal(suppressed.release,null);}}
console.log('Release continuity, speed limits, and all recorded gesture ownership passed');

const {observeTravel}=await import('../../outputs/painted-prototype/motion126/travel.mjs');
const probe={phase:'riding',time:0,rope:4,car:{hx:0,hz:4,accel:0},rider:{x:0,z:0,vx:0,vz:8,height:0,up:0,tension:1,holding:true}};
for(let i=0;i<10;i++)observeTravel(probe,1/120);
probe.rider.holding=false;for(let i=0;i<30;i++)observeTravel(probe,1/120);
probe.rider.holding=true;observeTravel(probe,1/120);const carry=probe.rider.motionRelease;
probe.rider.holding=false;observeTravel(probe,1/120);assert(Math.abs(probe.rider.motionRelease-carry)<.01);
console.log('Rapid release/regrab continuity passed');

for(const kind of ['SEAM','MANHOLE','BUMP','PATCH']){
 const f=structuredClone(clips.find(c=>c.kind==='release').frames.at(-1));Object.assign(f.rider,{motionSpeed:0,bump:0,bumpVelocity:0,rideLanding:null,gripCatchEvent:null,towCatchEvent:null,motionSlide:0});f.hazardEvents=[{kind,time:0,strength:.5}];
 let peak=0;for(let i=0;i<120;i++){f.time=i/120;const n=sample(f);peak=Math.max(peak,n.compression);assert(Number.isFinite(n.compression));}assert(peak>0);assert.equal(sample(f).compression,0);
}
const report=JSON.parse(readFileSync('work/playtest126/check-results.json','utf8'));Object.assign(report,{releaseContinuity:true,rapidRegrabContinuity:true,speedPostureBounds:true,allRecordedGestureOwnership:true,seamManholeBumpPatchEnvelopes:true,noAdditionalMorphFields:true});writeFileSync('work/playtest126/check-results.json',JSON.stringify(report,null,2));
console.log('Seam, manhole, bump and patch attack/recovery passed');
