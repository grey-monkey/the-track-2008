import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DRIVING_LINES,lineSample,lineForLap} from '../source/driving138/driver.js';
import {Ride,STEP} from '../source/physics.js';
import {LENGTH,roadDistance,bulb,angle} from '../source/world.js';

// Swept sedan footprint, not just the route's center point, stays inside asphalt.
const geometry=[];
for(let line=0;line<6;line++){
 let curvature=0,edge=-Infinity,center=Infinity;
 for(let s=0;s<LENGTH;s+=.2){const p=lineSample(s,line);curvature=Math.max(curvature,Math.abs(p.curvature));
  for(const forward of [-2.4,0,2.4])for(const side of [-.9,0,.9]){const x=p.x+forward*Math.cos(p.heading)-side*Math.sin(p.heading),z=p.z+forward*Math.sin(p.heading)+side*Math.cos(p.heading);edge=Math.max(edge,roadDistance(x,z));center=Math.min(center,Math.hypot(x-bulb.x,z-bulb.z));}
 }
 assert(curvature<.23,'turning radius must remain plausible for the sedan');assert(edge<-.25,'body has at least 25 cm pavement clearance');assert(center>3.1,'body clears the central debris');geometry.push({line:DRIVING_LINES[line].name,maximumCurvature:curvature,curbClearance:-edge,centerClearance:center});
 for(let next=0;next<6;next++){const a=lineSample(LENGTH-.001,line),b=lineSample(.001,next);assert(Math.hypot(a.x-b.x,a.z-b.z)<.003);assert(Math.abs(angle(a.heading-b.heading))<.0001,'lap changes must not snap the heading');}
}
for(let seed=0;seed<30;seed++){const sequence=Array.from({length:30},(_,lap)=>lineForLap(seed,lap));assert.deepEqual(sequence,Array.from({length:30},(_,lap)=>lineForLap(seed,lap)));for(let lap=0;lap<30;lap+=6)assert.equal(new Set(sequence.slice(lap,lap+6)).size,6);for(let i=1;i<30;i++)assert.notEqual(sequence[i],sequence[i-1]);}
const runs=[];
for(let line=0;line<6;line++)for(const rider of ['DOG','SALLY'])for(const pace of [.6,1,1.82]){
 let seed=0;while(lineForLap(seed,0)!==line)seed++;
 const sim=new Ride({seed,rider,pace});sim.phase='regroup';let maxYaw=0,maxYawAccel=0,previousYaw=0,maxLateral=0,brakes=0,inBrake=false,maxVelocityError=0;
 while(sim.car.s<LENGTH+8){const c=sim.car,old={...c};sim.step();const yaw=angle(c.heading-old.heading)/STEP;maxYaw=Math.max(maxYaw,Math.abs(yaw));maxYawAccel=Math.max(maxYawAccel,Math.abs(yaw-previousYaw)/STEP);previousYaw=yaw;maxLateral=Math.max(maxLateral,c.speed*c.speed*Math.abs(c.curvature));
  if(c.speed>1)maxVelocityError=Math.max(maxVelocityError,Math.abs(Math.hypot(c.x-old.x,c.z-old.z)/STEP-c.speed)/c.speed);
  if(c.s>285&&c.s<425)assert(!c.brake,'no repeated braking in the circle or before the exit straight');
  if(c.s>230&&c.s<425&&c.brake&&!inBrake)brakes++;inBrake=c.brake;
  assert(Math.abs(c.accel-old.accel)/STEP<1.051,'no abrupt pedal changes');
 }
 assert.equal(brakes,1,'one approach braking event');assert(maxYaw<1.38,'15% faster corner stays within proportionally increased heading-rate bound');assert(maxYawAccel<1.6,'steering acceleration stays within the previous smoothness bound');assert(maxVelocityError<.015,'station spacing must not cause speed surges');
 runs.push({line,rider,pace,maxYaw,maxYawAccel,maxLateral,maxVelocityError,approachBrakeEvents:brakes});
}
const report={geometry,runs};fs.writeFileSync(new URL('../driving138-report.json',import.meta.url),JSON.stringify(report,null,2));console.log('PASS six lines: paved sedan footprint, deterministic shuffled laps, smooth seams, 36 complete circuits, one cul-de-sac braking event, physical speed and bounded steering/pedals.');
