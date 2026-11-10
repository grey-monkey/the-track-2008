import fs from 'node:fs';import zlib from 'node:zlib';import assert from 'node:assert/strict';
import * as T from '../source/vendor/three.module.js';
import {Locomotion144} from '../source/motion135/locomotion144.mjs';
import {createRetarget} from '../source/motion135/retarget.mjs';
import {adaptSlidePose,slideTime,boardYaw} from '../source/motion135/slide-pose144.mjs';
const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/articulated135.json.gz',import.meta.url)))),rt=createRetarget(d.rig,d.skeleton),bi=d.skeleton.bones.findIndex(b=>b.name==='burnq_board'),inv=rt.sourcePose(null).rotation[bi].clone().invert();
const sim=()=>({time:0,rider:{holding:false,vx:5,vz:0,height:0,up:0,heading:.5,slide:.7,steer:.8}});
for(const stance of ['REGULAR','GOOFY']){
 const s=sim(),l=new Locomotion144(d.clips),h={stance};let p=l.sample(s,h);assert.equal(p.kind,'powerslide');assert.equal(p.clip,stance==='REGULAR'?'FSPowerslide':'BSPowerslide');
 s.rider.slide=0;s.rider.braking=true;s.time=.1;p=l.sample(s,h);assert.equal(p.clip,'SlowDownBrake');s.time=.3;p=l.sample(s,h);assert(Math.abs(p.time-.2)<1e-10);
 s.rider.braking=false;s.rider.steer=0;s.rider.pushStart=.3;s.time=.35;p=l.sample(s,h);assert.equal(p.clip,'PushCycle');s.time=.6;assert.equal(l.sample(s,h).clip,p.clip);s.rider.pushStart=.7;s.time=.75;assert.equal(l.sample(s,h).clip,'PushCycleArms3');
 s.rider.pushStart=null;s.rider.height=.5;s.rider.up=1;s.rider.airStarted=.7;s.rider.steer=.5;s.time=.9;p=l.sample(s,h);assert.equal(p.clip,stance==='REGULAR'?'AirTurnLeft':'AirTurnRight');
 s.rider.height=.05;s.rider.up=-2;s.time=1.1;p=l.sample(s,h);assert.equal(p.kind,'prepare-land');
 s.rider.trick='kickflip';s.rider.trickStart=.8;s.rider.trickDuration=.6;p=l.sample(s,h);assert.equal(p.clip,'KickFlip');
 s.rider.holding=true;assert.equal(l.sample(s,h),null);
}
let samples=0;
for(const name of ['FSPowerslide','BSPowerslide'])for(let k=0;k<=30;k++){
 const yaw=(name.startsWith('FS')?1:-1)*(.015+k/30*.765),time=slideTime(rt,d.clips[name],inv,yaw);assert(time>=0&&time<=d.clips[name].duration*.35);
 const pose=rt.sample(d.clips[name],time),lengths=pose.positions.map((p,i)=>d.rig.bones[i].parent<0?0:p.distanceTo(pose.positions[d.rig.bones[i].parent]));
 adaptSlidePose(pose,d.rig,inv,new T.Vector3(Math.sin(yaw),0,Math.cos(yaw)));assert(Math.abs(boardYaw(pose,inv))<1e-7);
 for(let i=0;i<pose.positions.length;i++){assert(pose.positions[i].toArray().every(Number.isFinite));const parent=d.rig.bones[i].parent;if(parent>=0)assert(Math.abs(pose.positions[i].distanceTo(pose.positions[parent])-lengths[i])<1e-7);}
 samples++;
}
console.log('PASS source powerslide/brake/push/air dispatch, both stances, active flip priority, stable push variants, '+samples+' yaw-neutralized rigid poses.');

{const s=sim(),l=new Locomotion144(d.clips);s.options={rider:'BOSS'};assert.notEqual(l.sample(s).kind,'powerslide');s.options.rider='SALLY';s.rider.manual=true;s.time=.1;assert.equal(l.sample(s).kind,'manual');s.rider.manual=false;s.rider.rideLanding={time:.15,airtime:.6};s.time=.17;assert.equal(l.sample(s).kind,'land');}

for(const stance of ['REGULAR','GOOFY']){const s=sim(),l=new Locomotion144(d.clips);Object.assign(s,{secretSpliffAt:0,secretSpliffUntil:30});Object.assign(s.rider,{height:3,up:2,trick:'secret-backflip',trickStart:0,trickDuration:1.85});s.time=.9;assert.equal(l.sample(s,{stance}).clip,'StalefishBackFlip');s.time=2.2;assert.equal(l.sample(s,{stance}).clip,stance==='REGULAR'?'AirTurnLeft':'AirTurnRight');s.time=7;s.rider.height=.04;s.rider.up=-4;assert.equal(l.sample(s,{stance}).kind,'prepare-land');}
