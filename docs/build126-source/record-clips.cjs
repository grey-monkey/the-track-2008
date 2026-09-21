const fs=require('fs'),path=require('path'),esbuild=require('../painted/node_modules/esbuild');
const root=path.resolve('outputs/painted-prototype');
const pack=fs.readFileSync('work/playtest126/package.cjs','utf8');
const expr=pack.split('const override=')[1].split(';let s=')[0];
const resolveOverride=new Function('args','root','path',`return ${expr}`);
(async()=>{
 await esbuild.build({stdin:{contents:"export {Ride,STEP} from './physics.js';export {RAMP,PATCHES,at,station,rampHeight,rideRoadDetails} from './road-details.js';",resolveDir:root},bundle:true,platform:'node',format:'cjs',outfile:'work/playtest126/physics.cjs',plugins:[{name:'source',setup(b){b.onResolve({filter:/.*/},a=>({path:path.resolve(a.resolveDir||root,a.path.split('?')[0]),namespace:'audit'}));b.onLoad({filter:/\.m?js$/,namespace:'audit'},args=>{const override=resolveOverride(args,root,path);return{contents:fs.readFileSync(override&&fs.existsSync(override)?override:args.path,'utf8'),loader:'js',resolveDir:path.dirname(args.path)};});}}]});
 const {Ride,STEP,RAMP,PATCHES,at,station,rampHeight}=require('./physics.cjs');const clips=[];
 for(const kind of ['slide','slide-right','takeup','load','brake','ramp','patch','release','speed']){
  const sim=new Ride({rider:'SALLY',board:'HANDMEDOWN',start:kind==='brake'?300:40,rope:.44,seed:52,pace:1.82});
  sim.hazardEvents=[];sim.hazardSerial=0;
  sim.hazards={tick(){},riding(){},rideable(){return true},event(s,kind,strength,detail={}){s.hazardEvents.push({serial:++s.hazardSerial,time:s.time,kind,strength,...detail});}};
  if(['slide','slide-right'].includes(kind)){
   sim.phase='coasting';sim.rider.holding=false;sim.car.speed=7;
   Object.assign(sim.rider,{vx:7*Math.cos(sim.rider.heading),vz:7*Math.sin(sim.rider.heading)});
  }
  if(['brake','release','speed'].includes(kind)){sim.car.speed=8;Object.assign(sim.rider,{vx:8*Math.cos(sim.rider.heading),vz:8*Math.sin(sim.rider.heading)});}
  if(['ramp','patch'].includes(kind)){const f=kind==='ramp'?RAMP:PATCHES[0],p=at(f,kind==='ramp'?0:f.u,kind==='ramp'?-2:f.v-3);sim.phase='coasting';Object.assign(sim.rider,p,{heading:f.h,vx:7*f.co,vz:7*f.si,holding:false});}
  const frames=[];
  for(let i=0;i<(kind==='load'?960:480);i++){
   const input={steer:!['slide','slide-right'].includes(kind)?0:(sim.time>.30&&sim.time<1.05?(kind==='slide'?.9:-.9):0),crouch:false};
   if(kind==='release'&&i===96)sim.release();
   sim.step(input,STEP);
   frames.push({time:sim.time,phase:sim.phase,rider:{...sim.rider},car:{...sim.car},input,hazardEvents:sim.hazardEvents.map(e=>({...e})),surface:kind==='ramp'?(rampHeight(sim.rider.x,sim.rider.z)??0):0});
  }
  clips.push({kind,board:'HANDMEDOWN',description:'Actual fixed-step physics with unrelated scenery collisions omitted. Load starts at rest; braking starts at 8 m/s on the actual turn approach; ramp and patch are coasting crossings at 7 m/s.',frames});
 }
 fs.writeFileSync('outputs/painted-prototype/motion126/clips.js','export const clips='+JSON.stringify(clips)+';');
 console.log(clips.map(c=>({kind:c.kind,maxSlide:Math.max(...c.frames.map(f=>Math.abs(f.rider.motionSlide??0))),grip:c.frames.at(-1).rider.gripCatchEvent,tow:c.frames.at(-1).rider.towCatchEvent,maxTension:Math.max(...c.frames.map(f=>f.rider.tension)),phase:c.frames.at(-1).phase,maxLoad:Math.max(...c.frames.map(f=>f.rider.motionLoad??0)),maxBrake:Math.max(...c.frames.map(f=>f.rider.motionBrake??0))})));
})();
