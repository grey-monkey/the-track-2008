import assert from 'node:assert/strict';
import fs from 'node:fs';import zlib from 'node:zlib';
import {Locomotion142,landingClip,grindClips} from '../source/motion135/locomotion142.mjs';
import {createRetarget} from '../source/motion135/retarget.mjs';
const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(new URL('../source/assets/articulated135.json.gz',import.meta.url))));
const clips=data.clips,rig=createRetarget(data.rig,data.skeleton);
const make=()=>({time:0,rider:{height:0,up:0,steer:0,lean:0,holding:false}});
function advance(controller,sim,h,to){let out;while(sim.time<to){sim.time=Math.min(to,sim.time+1/60);out=controller.sample(sim,h);}return out??controller.sample(sim,h);}
for(const stance of ['REGULAR','GOOFY']){
 const sim=make(),h={stance,crouch:0},s=new Locomotion142(clips);s.sample(sim,h);sim.rider.steer=.7;
 const entry=advance(s,sim,h,.02);assert.equal(entry.kind,'turn');assert.equal(entry.clip,stance==='REGULAR'?'TurnLeft':'TurnRight');
 const at=.02+clips[entry.clip].duration;
 const idle=advance(s,sim,h,at+.03);assert.equal(idle.clip,entry.clip+'Idle');
 // A held turn must not restart its entry every rendering frame.
 assert(advance(s,sim,h,at+.17).time>idle.time);
 sim.rider.steer=.13;assert.equal(advance(s,sim,h,at+.2).kind,'turn','hysteresis retains a light held carve');
 sim.rider.steer=0;assert.equal(advance(s,sim,h,at+.24).kind,'idle');
 h.crouch=1;assert.equal(advance(s,sim,h,at+.26).clip,'Crouch');
 assert.equal(advance(s,sim,h,at+.7).clip,'CrouchIdle');
 sim.rider.steer=-.7;assert.equal(advance(s,sim,h,at+.72).clip,stance==='REGULAR'?'CrouchTurnRight':'CrouchTurnLeft');
}
assert.equal(landingClip(.1,false),'IdleBump');assert.equal(landingClip(.1,true),'CrouchBumpDown');
assert.equal(landingClip(.4),'CrouchBumpDown');assert.equal(landingClip(.6),'CrouchedLand1_small');assert.equal(landingClip(.9),'CrouchedLand1');
{
 const sim=make(),h={stance:'REGULAR',crouch:0},s=new Locomotion142(clips);s.sample(sim,h);
 sim.rider.rideLanding={time:0,airtime:.9};sim.rider.steer=.7;
 assert.equal(advance(s,sim,h,.05).kind,'land','first contact absorbs before a held steer');
 assert.equal(advance(s,sim,h,.12).kind,'turn','landing can be interrupted by steering');
 sim.rider.steer=0;assert.equal(advance(s,sim,h,.2).kind,'idle','interrupted landing never restarts');
 sim.rider.rideLanding={time:.21,airtime:.6};assert.equal(advance(s,sim,h,.23).clip,'CrouchedLand2_small');
 sim.rider.pushStart=.34;assert.equal(advance(s,sim,h,.35).kind,'push');
 const push=advance(s,sim,h,.79);assert(Math.abs(push.time/clips.PushCycle.duration-.5)<1e-8,'push animation stays synchronized with .9s physics stroke');
 sim.rider.height=.1;sim.rider.up=1;sim.rider.trick='ollie';sim.rider.trickStart=.8;sim.rider.trickDuration=.5;
 assert.equal(advance(s,sim,h,.81).kind,'air','new jump immediately supersedes ground animation');
 sim.rider.holding=true;assert.equal(advance(s,sim,h,.82),null,'rope retains its original reach pose');
}
// Real source motions, not generated poses: blending their joints must preserve
// every limb length and remain a proper rotation, including extreme turn/land pairs.
const pairs=[['Idle','TurnLeft'],['TurnLeftIdle','TurnRight'],['CrouchIdle','CrouchTurnLeft'],['AirIdle','CrouchedLand1'],['CrouchedLand2','PushCycle']];
const pelvis=data.rig.bones.findIndex(b=>b.name==='pelvis');let checked=0;
for(const [a,b]of pairs)for(let i=0;i<=20;i++){
 const from=rig.sample(clips[a],clips[a].duration*.65),to=rig.sample(clips[b],clips[b].duration*i/20),p=rig.blend(from,to,i/20);
 for(let j=0;j<p.world.length;j++){
  assert(p.world[j].elements.every(Number.isFinite));assert(Math.abs(p.world[j].determinant()-1)<1e-5,'no skin-matrix shear at transition');
  const parent=data.rig.bones[j].parent;if(parent>=0&&j!==pelvis)assert(Math.abs(p.positions[j].distanceTo(p.positions[parent])-from.positions[j].distanceTo(from.positions[parent]))<1e-5,'limbs retain length');
 }
 checked++;
}
console.log(`PASS authored turn/stance dispatch, landing absorption and interruption, push timing, ${checked} rigid motion blends.`);
for(const stance of ['REGULAR','GOOFY'])for(const direction of [-1,1])for(const kind of ['fiftyfifty','boardslide']){
 const sim=make(),h={stance,crouch:0},s=new Locomotion142(clips),bank=grindClips(kind,direction,stance);
 sim.rider.grind={kind,direction,side:direction,balance:0,started:0};sim.rider.height=.01;
 const entry=s.sample(sim,h);assert.equal(entry.kind,'grind');assert.equal(entry.clip,bank.entry);assert.equal(entry.grindPhase,'entry');
 const hold=advance(s,sim,h,clips[bank.entry].duration+.05);assert.equal(hold.clip,bank.range);assert.equal(hold.time,clips[bank.range].duration*.5);
 const still=advance(s,sim,h,sim.time+.3);assert.equal(still.time,hold.time,'balance animation does not play as a time loop');
 sim.rider.grind.balance=1.8;const edge=advance(s,sim,h,sim.time+.02);assert(edge.time>0&&edge.time<clips[bank.range].duration,'range avoids broken extreme poses');
 const limit=kind==='boardslide'?.6:.96;
 assert.equal(edge.sourceBalance,stance==='REGULAR'?-limit:limit,'balance mirrors with body stance and garment-safe visual range');
 sim.rider.grind=null;sim.rider.grindExit={kind,side:direction,time:sim.time};
 let exit=advance(s,sim,h,sim.time+.02);assert.equal(exit.kind,'grind-exit');assert.equal(exit.clip,bank.exit);
 const oldTime=exit.time;exit=advance(s,sim,h,sim.time+.02);assert.equal(exit.time>oldTime,!bank.reverseExit,'50-50 reverses entry; boardslide uses authored out');
 sim.rider.trick='ollie';sim.rider.trickStart=sim.time;sim.rider.trickDuration=.5;
 assert.equal(advance(s,sim,h,sim.time+.02).kind,'air','a deliberate jump interrupts exit');
 sim.rider.trick=null;assert.notEqual(advance(s,sim,h,sim.time+.02).kind,'grind-exit','interrupted exit cannot resume');
}
assert.equal(grindClips('boardslide',1,'REGULAR').entry,grindClips('boardslide',-1,'GOOFY').entry,'travel side and stance each mirror front/back');
console.log('PASS grind entry, balance range, both travel directions/stances, authored exits and interruption.');
