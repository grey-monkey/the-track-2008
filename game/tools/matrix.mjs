// Hands-off survival across rope lengths and paces. Run: node tools/matrix.mjs
import {Ride,STEP} from '../source/physics.js';
import {RIDERS,BOARDS} from '../source/world.js';
for(const pace of (process.env.PACES??".6,1,1.4,1.82").split(",").map(Number))for(const rope of [0,.45,1]){const out=[];
 for(const rider of Object.keys(RIDERS))for(const board of Object.keys(BOARDS)){const sim=new Ride({rider,board,rope,pace,start:-10,seed:8});let t=0;while(t<520&&sim.laps<6&&!['crashed','ended'].includes(sim.phase)){sim.step({steer:0},STEP);t+=STEP;}
  if(sim.phase==='crashed')out.push(`${rider}/${board}:${sim.stats.crashReason}@${sim.car.s.toFixed(0)}`);}
 console.log(`pace ${pace} rope ${rope}: ${16-out.length}/16 ok ${out.join(' ')}`);}
