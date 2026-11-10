import {Ride,STEP} from '../source/physics.js';
const [rider='SALLY',board='LONGBOARD',from='250',to='320']=process.argv.slice(2);
const sim=new Ride({rider,board,rope:.45,pace:1,start:-10,seed:8});let t=0,next=0;
while(t<150&&!['crashed','ended'].includes(sim.phase)){sim.step({steer:0},STEP);t+=STEP;const c=sim.car,r=sim.rider;
 if(c.s>=+from&&c.s<=+to&&t>=next){next=t+.5;const dx=r.x-c.hx,dz=r.z-c.hz,d=Math.hypot(dx,dz);const rel=Math.atan2(Math.sin(Math.atan2(-dz,-dx)-c.heading),Math.cos(Math.atan2(-dz,-dx)-c.heading));
  console.log(`t=${t.toFixed(1)} s=${c.s.toFixed(0)} car v=${c.speed.toFixed(2)} a=${c.accel.toFixed(2)} brake=${c.brake?1:0} k=${c.curvature.toFixed(3)} | rider v=${Math.hypot(r.vx,r.vz).toFixed(2)} dist=${d.toFixed(2)}/${sim.rope.toFixed(2)} offAxis=${(rel*57.3).toFixed(0)}deg pull=${r.tension.toFixed(1)} wob=${r.wobble.toFixed(2)}`);}}
console.log(sim.phase,sim.stats.crashReason,'s',sim.car.s.toFixed(0));
