import {Ride,STEP} from '../source/physics.js';
import {roadDistance,bulb} from '../source/world.js';
const sim=new Ride({rider:process.env.RIDER??'SALLY',board:process.env.BOARD??'LONGBOARD',rope:+(process.env.ROPE??.45),pace:1,start:-10,seed:8});let t=0,next=0;
while(t<150&&!['crashed','ended'].includes(sim.phase)){sim.step({steer:0},STEP);t+=STEP;const c=sim.car,r=sim.rider;
 if(c.s>=+(process.argv[2]??325)&&t>=next){next=t+.35;const side=-(r.x-c.x)*Math.sin(c.heading)+(r.z-c.z)*Math.cos(c.heading);
  console.log(`s=${c.s.toFixed(0)} carV=${c.speed.toFixed(1)} k=${c.curvature.toFixed(3)} carEdge=${(-roadDistance(c.x,c.z)).toFixed(1)}m bulbR=${Math.hypot(c.x-bulb.x,c.z-bulb.z).toFixed(1)}/${bulb.r} | riderV=${Math.hypot(r.vx,r.vz).toFixed(1)} edge=${(-roadDistance(r.x,r.z)).toFixed(1)}m side=${side.toFixed(1)} riderBulbR=${Math.hypot(r.x-bulb.x,r.z-bulb.z).toFixed(1)} pull=${r.tension.toFixed(1)} carveA=${(r.carveA??0).toFixed(1)} off=${(r.trackOffset??0).toFixed(2)} dist=${Math.hypot(r.x-c.hx,r.z-c.hz).toFixed(2)}`);}}
console.log(sim.phase,sim.stats.crashReason);
