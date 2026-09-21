import {clamp,carLevel} from './audio-model.js';
import {aerialPoint,ENTRANCE_HOUSES} from './world.js';
import {PATCHES,patchAmount,rampHeight} from './road-details.js';
// Same canopy-edge trace as approved environment103/boundary.js, without importing renderer code.
const woods=[[724,199],[691,222],[670,270],[641,310],[617,351],[592,394],[561,454],[530,505],[505,563],[504,621],[526,674],[582,659],[643,627],[704,602],[759,580],[814,544],[841,503],[842,440],[823,375],[800,315],[773,273],[774,235]].map(([x,y])=>aerialPoint(443+(x-550)*1.75,786+(y-590)*1.75));
export function nearestWoods(r){let best={x:0,z:0,d:Infinity};for(let i=0;i<woods.length;i++){const a=woods[i],b=woods[(i+1)%woods.length],dx=b.x-a.x,dz=b.z-a.z,u=clamp(((r.x-a.x)*dx+(r.z-a.z)*dz)/(dx*dx+dz*dz)),x=a.x+dx*u,z=a.z+dz*u,d=Math.hypot(x-r.x,z-r.z);if(d<best.d)best={x,z,d};}return best;}
export function nightBlend(seconds){const x=clamp((seconds-230)/300);return x*x*(3-2*x);}
export function patchMask(c){let mask=0,i=0;for(const p of PATCHES)for(const axle of [-1.3,1.3])for(const side of [-.72,.72]){const x=c.x+Math.cos(c.heading)*axle-Math.sin(c.heading)*side,z=c.z+Math.sin(c.heading)*axle+Math.cos(c.heading)*side;if(patchAmount(p,x,z)>.12)mask|=1<<i;i++;}return mask;}
const dogHome={x:ENTRANCE_HOUSES[1].x-18,y:1,z:ENTRANCE_HOUSES[1].z-25};
export class SceneAudio{
 constructor(sound){this.s=sound;this.enabled=true;this.reset();}
 reset(){this.lastUpdate=-Infinity;this.lastMaterial=-Infinity;this.lastWood=-Infinity;this.lastCloth=-Infinity;this.nextDog=70;this.nextCar=0;this.mask=null;this.onRamp=false;this.wasDirt=undefined;}
 riderEvent(kind,state){if(!this.enabled)return;const t=this.s.ctx.currentTime;if(t-this.lastCloth<.28)return;this.lastCloth=t;this.s.shot(kind==='fall'?'clothGround':'cloth',kind==='fall'?.08:.04,.96+(this.s.counter++%3)*.025,0);}
 material(e,state,sim){if(!this.enabled)return false;const s=this.s,t=s.ctx.currentTime,power=clamp(e.strength,.1,1.5)*state.board.click;
  if(!['PATCH','MANHOLE','GRATE','RAMP_LAUNCH'].includes(e.kind))return false;
  if(e.kind==='RAMP_LAUNCH'){if(t-this.lastWood>.35){s.shot('wood',.25*power,.95,0,2);this.lastWood=t;}return true;}
  if(e.kind!=='GRATE'&&!state.ground)return true;
  if(t-this.lastMaterial<.065)return true;this.lastMaterial=t;
  s.shot(e.kind==='PATCH'?'patch':'metal',(e.kind==='PATCH'?.25:e.kind==='GRATE'?.38:.22)*power,clamp(state.speed/6,.8,1.25),0,1);return true;
 }
 neighborhood(sim){if(!this.enabled)return;const d=Math.hypot(dogHome.x-sim.rider.x,dogHome.z-sim.rider.z);this.s.shot('dog',.055/(1+(d/85)**1.5),1,0,0,dogHome);}
 update(sim,state,view){const s=this.s,t=s.ctx.currentTime,r=sim.rider,c=sim.car;
  if(!this.enabled){s.spatialLoop('wind',0,{},4000);s.spatialLoop('night',0,{},7000);return;}
  const onRamp=state.ground&&state.speed>.4&&rampHeight(r.x,r.z)!=null;
  if(onRamp&&!this.onRamp){s.shot('wood',.22*state.board.click*clamp(state.speed/5,.4,1),1,0,2);this.lastWood=t;}this.onRamp=onRamp;
  if(state.ground&&this.wasDirt===false&&r.dirt&&state.speed>1)s.shot('dirtScuff',.075*state.board.click,.95);this.wasDirt=r.dirt;
  if(t-this.lastUpdate<.1)return;this.lastUpdate=t;
  const edge=nearestWoods(r),night=nightBlend(view?.evening?.seconds??0),carDistance=Math.hypot(c.x-r.x,c.z-r.z),quiet=(1-.35*clamp(state.speed/8))*(1-.25*carLevel(carDistance)),near=.4+.6/(1+(edge.d/65)**1.5);
  const gust=.70+.20*Math.sin(t*.071)+.10*Math.sin(t*.193),insects=.65+.35*Math.sin(t*.039)**2;
  s.spatialLoop('wind',.105*quiet*near*gust,{x:edge.x,y:5,z:edge.z},3600-1400*night);
  s.spatialLoop('night',.115*night*quiet*near*insects,{x:edge.x,y:1,z:edge.z},6500);
  const mask=patchMask(c);if(this.mask!=null&&(mask&~this.mask)&&c.speed>.5&&t>this.nextCar){const m=view?.camera?.matrixWorld?.elements,dx=c.x-r.x,dz=c.z-r.z,pan=m?(dx*m[0]+dz*m[2])/Math.max(2,carDistance):0;s.shot('suspension',.075*carLevel(carDistance)*clamp(c.speed/6,.3,1),.95,pan);this.nextCar=t+.35;}this.mask=mask;
  if(t>this.nextDog){if((sim.phase==='selection'||carDistance>6.5)&&state.slide<.1&&sim.phase!=='crashed')this.neighborhood(sim);this.nextDog=t+95+(s.counter++*37%66);}
  this.audit={night,edgeDistance:edge.d,quiet,patchMask:mask,nextDog:this.nextDog};
 }
}
