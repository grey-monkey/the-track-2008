// Headless ride measurements. Run: node tools/ride-lab.mjs
// Prints the numbers that describe how the tow feels, so tuning is evidence-led.
import {Ride,STEP} from '../source/physics.js';
import {roadDistance,RIDERS,BOARDS} from '../source/world.js';

const speed=r=>Math.hypot(r.vx,r.vz);
const pct=(a,p)=>{const s=[...a].sort((x,y)=>x-y);return s.length?s[Math.min(s.length-1,Math.floor(s.length*p))]:0;};
const f=(v,d=2)=>Number(v).toFixed(d);

function run({rider='DOG',board='LONGBOARD',rope=.45,pace=1,start=-10,seconds=120,steer=()=>0,release=null,seed=8}){
 const sim=new Ride({rider,board,rope,pace,start,seed});
 const tension=[],ratio=[];let t=0,reach6=null,maxRatio=0,minEdge=Infinity;
 while(t<seconds&&!['crashed','ended'].includes(sim.phase)){
  if(release!=null&&t>=release&&sim.rider.holding)sim.release();
  sim.step({steer:steer(t,sim)},STEP);t+=STEP;
  const v=speed(sim.rider);
  if(sim.rider.holding&&sim.car.speed>3){tension.push(sim.rider.tension);ratio.push(v/sim.car.speed);maxRatio=Math.max(maxRatio,v/sim.car.speed);}
  if(reach6==null&&v>=6)reach6=t;
  minEdge=Math.min(minEdge,-roadDistance(sim.rider.x,sim.rider.z));
 }
 return{sim,t,phase:sim.phase,reason:sim.stats.crashReason,s:sim.car.s,laps:sim.laps,reach6,tMed:pct(tension,.5),t99:pct(tension,.99),tMax:pct(tension,1),maxRatio,minEdge,speed:speed(sim.rider),car:sim.car.speed};
}
const line=(label,o)=>console.log(label.padEnd(34),`${o.phase}${o.reason?'/'+o.reason:''}`.padEnd(18),`t=${f(o.t,1)}s s=${f(o.s,0)} laps=${o.laps}`.padEnd(30),`pull med/p99/max ${f(o.tMed)}/${f(o.t99,1)}/${f(o.tMax,1)}`.padEnd(34),`whip x${f(o.maxRatio)} edge ${f(o.minEdge,1)}m`);

console.log('--- hands off, two laps ---');
for(const rider of Object.keys(RIDERS))for(const board of Object.keys(BOARDS))line(`${rider} ${board}`,run({rider,board,seconds:150}));

console.log('\n--- launch ---');
{const o=run({seconds:30});console.log(`time to 6 m/s: ${o.reach6==null?'never':f(o.reach6,1)+'s'}`);}

console.log('\n--- held carve at cruise (steer 0.7 from t=22s) ---');
for(const board of Object.keys(BOARDS)){const o=run({rider:'SALLY',board,seconds:40,steer:t=>t>22?.7:0});line(`SALLY ${board} hold`,o);}

console.log('\n--- slalom on tow (steer +-0.7, 2.6s period, from t=20s) ---');
for(const rider of ['DOG','SALLY'])for(const board of Object.keys(BOARDS)){const o=run({rider,board,seconds:60,steer:(t,sim)=>t>20&&sim.car.s<200?(Math.sin((t-20)*2*Math.PI/2.6)>0?.7:-.7):0});line(`${rider} ${board} slalom`,o);}

console.log('\n--- gentle slalom on tow (steer +-0.35) ---');
for(const board of Object.keys(BOARDS)){const o=run({rider:'SALLY',board,seconds:60,steer:(t,sim)=>t>20&&sim.car.s<200?(Math.sin((t-20)*2*Math.PI/2.6)>0?.35:-.35):0});line(`SALLY ${board} gentle`,o);}

console.log('\n--- free ride: speed kept 2.5s after release at t=24s ---');
for(const board of Object.keys(BOARDS)){
 const straight=run({rider:'SALLY',board,seconds:26.5,release:24});
 const carve=run({rider:'SALLY',board,seconds:26.5,release:24,steer:t=>t>24?(Math.sin((t-24)*2*Math.PI/1.6)>0?.5:-.5):0});
 console.log(`${board.padEnd(12)} straight ${f(straight.speed)} m/s (${straight.phase})   slalom ${f(carve.speed)} m/s (${carve.phase}${carve.reason?'/'+carve.reason:''})`);
}
