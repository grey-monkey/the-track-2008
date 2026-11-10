import {Ride,STEP} from '../source/physics.js';
const sim=new Ride({rider:process.env.RIDER??'BLACK',board:process.env.BOARD??'LONGBOARD',rope:+(process.env.ROPE??.45),pace:1,start:-10,seed:8});let t=0,next=0,pa=null;
while(t<150&&!['crashed','ended'].includes(sim.phase)){const r=sim.rider,c=sim.car;const a0=Math.atan2(r.vz,r.vx);sim.step({steer:0},STEP);t+=STEP;const a1=Math.atan2(r.vz,r.vx);const w=Math.atan2(Math.sin(a1-a0),Math.cos(a1-a0))/STEP,v=Math.hypot(r.vx,r.vz);
 if(c.s>=+(process.argv[2]??318)&&t>=next){next=t+.3;const slip=Math.atan2(Math.sin(r.heading-a1),Math.cos(r.heading-a1));const tow=Math.atan2(c.hz-r.z,c.hx-r.x),ropeOff=Math.atan2(Math.sin(tow-a1),Math.cos(tow-a1));
  console.log(`s=${c.s.toFixed(0)} carV=${c.speed.toFixed(1)} v=${v.toFixed(2)} off=${(r.trackOffset??0).toFixed(2)} carveA=${(r.carveA??0).toFixed(2)} actualLatA=${(w*v).toFixed(2)} slip=${slip.toFixed(3)} pull=${r.tension.toFixed(1)} ropeAngle=${(ropeOff*57.3).toFixed(0)} scrub=${(r.edgeScrub??0).toFixed(1)} check=${(r.checking??0).toFixed(1)}`);}}
console.log(sim.phase,sim.stats.crashReason);
