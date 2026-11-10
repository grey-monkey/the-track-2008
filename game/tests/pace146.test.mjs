import assert from 'node:assert/strict';
import fs from 'node:fs';
import {Ride,STEP} from '../source/physics.js';
import {lineForLap} from '../source/driving138/driver.js';
const rows=[];
for(let line=0;line<6;line++)for(const rider of ['SALLY','DOG']){
 let seed=0;while(lineForLap(seed,0)!==line)seed++;
 const sim=new Ride({rider,seed,pace:1});sim.phase='regroup';
 let min=Infinity,seconds=0,straight=0;
 while(sim.car.s<430){sim.step();if(sim.car.s>150&&sim.car.s<200)straight=Math.max(straight,sim.car.speed);if(sim.car.s>=285&&sim.car.s<400){min=Math.min(min,sim.car.speed);seconds+=STEP;}}
 assert(min>(rider==='SALLY'?4.3:4.8),'cul-de-sac must not fall back to the old crawl');
 assert(seconds<21,'circle/exit should keep moving');
 rows.push({line,rider,minimumMps:min,culDeSacSeconds:seconds,straightMps:straight});
 assert.equal(typeof sim.spin,'undefined','new 180/360 action removed');
 assert.equal(typeof sim.grab,'undefined','new grab action removed');
}
fs.mkdirSync(new URL('../validation147/',import.meta.url),{recursive:true});
fs.writeFileSync(new URL('../validation147/pace.json',import.meta.url),JSON.stringify(rows,null,2));
console.log('PASS faster cul-de-sac across six lines and both drivers; no added spin/grab actions.');
