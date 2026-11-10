import {SMOKE_LIFETIME,smokePosition} from './second-hand165.mjs';
import {SeatedPortrait,upperBody} from './crew129/seated-portrait.js';
import {fitPassenger} from './crew129/seated-fit.mjs';
import {crewSeats} from './crew129/seats.mjs';
// Handoff and steering assist disabled pending a future ability pass.

import * as T from './vendor/three.module.js';
import {PassengerSprad} from './passenger-sprad.js';


export class CrewMoment {
 constructor(view){this.view=view;this.rearWindow={value:0};
 // Roll down only the rear driver-side door glass; retain trim and the fixed quarter pane.
 for(const o of view.carBody.children){const m=o.material;if(!o.isMesh||!m?.transparent||m.opacity!==.55)continue;const before=m.onBeforeCompile,key=m.customProgramCacheKey.bind(m);m.customProgramCacheKey=()=>key()+'rear-handoff-window93';m.onBeforeCompile=shader=>{before(shader);shader.uniforms.rearHandoffWindow=this.rearWindow;shader.fragmentShader='uniform float rearHandoffWindow;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','if(rearHandoffWindow>.5&&pl.x<-.65&&pl.z>.28&&pl.z<1.24&&pl.y>.96)discard;\n#include <opaque_fragment>');};m.needsUpdate=true;}
this.sprad=new PassengerSprad();for(const mesh of this.sprad.bodyMeshes){const old=mesh.geometry;mesh.geometry=upperBody(old);old.dispose();}fitPassenger(this.sprad,.39,.18);view.carBody.add(this.sprad);this.passengerCache=new Map();}
 passenger(name){if(!this.passengerCache.has(name))this.passengerCache.set(name,new SeatedPortrait(name));return this.passengerCache.get(name);}
 updateSmoke(sim,dt,menu){
 if(!this.smoke){const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d'),g=x.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(170,164,154,.55)');g.addColorStop(1,'rgba(170,164,154,0)');x.fillStyle=g;x.fillRect(0,0,32,32);const map=new T.CanvasTexture(c);this.smoke=Array.from({length:8},()=>{const sprite=new T.Sprite(new T.SpriteMaterial({map,transparent:true,opacity:0,depthWrite:false}));sprite.name='Sprad smoke puff';this.view.scene.add(sprite);return {sprite};});}
 const puffs=sim.spradSmoke?.puffs??[];
 this.smoke.forEach(({sprite},i)=>{const p=puffs[i],age=p?sim.time-p.born:99;sprite.visible=!menu&&!!p&&!p.collected&&age>=0&&age<SMOKE_LIFETIME;if(!sprite.visible)return;
 const pos=smokePosition(p,sim.time);sprite.position.set(pos.x,pos.y,pos.z);sprite.scale.setScalar(.16+age*.16);sprite.material.opacity=.38*Math.sin(Math.PI*age/SMOKE_LIFETIME);sprite.userData.puffId=p.id;
 });
 }

 reset(sim){this.sim=sim;this.rearWindow.value=0;this.seats=crewSeats(sim.options.rider,sim.driver);
 for(const person of this.passengerCache.values())this.view.carBody.remove(person);
 this.driver=this.passenger(this.seats.driver);this.friend=this.passenger(this.seats.rearLeft);this.other=this.passenger(this.seats.rearRight);this.friendName=this.seats.rearLeft;
 // Seatback alignment: local +Z points toward the rear of the Mercedes.
 fitPassenger(this.driver,-.39,.18);fitPassenger(this.friend,-.38,1.06);fitPassenger(this.other,.38,1.06);
 this.view.carBody.add(this.driver,this.friend,this.other);
 }
 update(sim,dt,menu){if(this.sim!==sim)this.reset(sim);for(const p of [this.driver,this.sprad,this.friend,this.other])p.visible=!menu;
 this.sprad.updatePassenger(sim.time);this.updateSmoke(sim,dt,menu);
 }
}
