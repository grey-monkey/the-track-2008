import * as T from '../vendor/three.module.js';
import {RAMP,at} from '../road-details.js';

// Tire wear belongs to the existing spot; no new obstacles or changes to its footprint.
export function installSkateArea(view){
 const root=new T.Group();root.name='Skating spot - plywood, curb and path wear';view.scene.add(root);
 const geometry=new T.BufferGeometry(),capacity=1024,data=new Float32Array(capacity*18);
 geometry.setAttribute('position',new T.BufferAttribute(data,3));geometry.setDrawRange(0,0);
 const material=new T.MeshBasicMaterial({color:0x171e28,transparent:true,opacity:.26,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
 const marks=new T.Mesh(geometry,material);marks.name='Live wheel scuffs';marks.frustumCulled=false;marks.renderOrder=2;root.add(marks);
 const staticVertices=[];let cursor=0,count=0,previous=null,lastTime=-1,lastLanding=-1;
 const ground=(x,z)=>view.hazards.skateHeight(x,z);
 function strip(a,b,width,output){const dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz);if(l<.001)return;const nx=-dz/l*width/2,nz=dx/l*width/2,points=[[a.x-nx,a.z-nz],[a.x+nx,a.z+nz],[b.x+nx,b.z+nz],[b.x-nx,b.z-nz]],vertices=[];for(const i of [0,1,2,0,2,3]){const[x,z]=points[i];vertices.push(x,ground(x,z)+.006,z);}output(vertices);}
 const worn=vertices=>staticVertices.push(...vertices);
 // Broken tracks at the lip and run-out, with a wide carving arc on the asphalt.
 for(const side of [-1,1]){
  for(let i=0;i<11;i++){const v=-RAMP.length/2+i*.095;strip(at(RAMP,side*.105,v),at(RAMP,side*.105,v+.092),.017,worn);}
  for(let i=0;i<22;i++){const v=1.7+i*.21,u=side*.09+.06*Math.sin(i*.29);strip(at(RAMP,u,v),at(RAMP,u+.01,v+.11),.018+(i%3)*.005,worn);}
  for(let i=0;i<50;i++){const t=i/50,tn=(i+.65)/50,a=at(RAMP,-1.35+side*.08+1.15*Math.sin(t*Math.PI),7+t*9),b=at(RAMP,-1.35+side*.08+1.15*Math.sin(tn*Math.PI),7+tn*9);if(view.hazards.rideable(a.x,a.z)&&view.hazards.rideable(b.x,b.z))strip(a,b,.024,worn);}
 }
 // Light seams at the existing radiused path mouths make the paved connection legible.
 for(const ret of view.pathReturns??[]){const f=ret.frame;for(const d of [.5,1.6,2.8]){const width=Math.max(.86,ret.halfMouth-d),a={x:f.x-f.tx*width+f.nx*d,z:f.z-f.tz*width+f.nz*d},b={x:f.x+f.tx*width+f.nx*d,z:f.z+f.tz*width+f.nz*d};strip(a,b,.012,worn);}}
 const wornGeometry=new T.BufferGeometry();wornGeometry.setAttribute('position',new T.Float32BufferAttribute(staticVertices,3));wornGeometry.computeBoundingSphere();const wear=new T.Mesh(wornGeometry,material);wear.name='Plywood and run-out wheel wear';wear.renderOrder=2;root.add(wear);
 function emit(vertices){data.set(vertices,cursor*18);cursor=(cursor+1)%capacity;count=Math.min(capacity,count+1);}
 function update(sim,menu){const r=sim.rider;if(sim.time<lastTime||menu){cursor=count=0;previous=null;lastLanding=-1;geometry.setDrawRange(0,0);}lastTime=sim.time;
  const active=!menu&&['riding','coasting'].includes(sim.phase)&&r.height<=.01&&!r.dirt,speed=Math.hypot(r.vx,r.vz);
  const landing=r.rideLanding&&r.rideLanding.time!==lastLanding&&sim.time-r.rideLanding.time<.12;if(landing)lastLanding=r.rideLanding.time;
  if(!active){previous=null;return;}
  const p={x:r.x,z:r.z,heading:r.heading};if(previous&&speed>1.1&&((r.slide??0)>.08||r.braking||landing)){
   const distance=Math.hypot(p.x-previous.x,p.z-previous.z);if(distance>.012&&distance<.65)for(const side of [-.09,.09]){const a={x:previous.x-Math.sin(previous.heading)*side,z:previous.z+Math.cos(previous.heading)*side},b={x:p.x-Math.sin(p.heading)*side,z:p.z+Math.cos(p.heading)*side};strip(a,b,.025,emit);}
   geometry.attributes.position.needsUpdate=true;geometry.setDrawRange(0,count*6);
  }
  previous=p;
 }
 return view.skateArea={root,update,staticTriangles:staticVertices.length/9,get liveSegments(){return count;}};
}
