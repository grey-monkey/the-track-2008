import * as T from '../vendor/three.module.js';
import {roadShadowUniforms} from '../road-shadows.js';
import {roadDistance,roadPoints,FOOTPATH,CUL_START} from '../world.js';
import {HazardWorld} from '../hazards.js';
import {PavementContact} from '../car-contact.js';
import {Ride} from '../physics.js';

const f=n=>Number(n).toFixed(3);
function pathDistance(x,z){return Math.min(...FOOTPATH.slice(1).map((b,i)=>{const a=FOOTPATH[i],dx=b.x-a.x,dz=b.z-a.z,t=T.MathUtils.clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(x-a.x-t*dx,z-a.z-t*dz);}));}
export async function extendNeighborhood(view){
 const root=new T.Group();root.name='Neighborhood finishing';view.scene.add(root);
 const casters=[],contacts=[],areas=[];
 const data=roadShadowUniforms.roadShadowData.value.image.data;
 // Select two existing undeveloped cul-de-sac lots and two open roadside lots.
 const pileNames=['Construction spoil pile 1','Construction spoil pile 5'];
 const supportMeshes=[];
 for(const [i,name]of pileNames.entries()){
  const mound=view.scene.getObjectByName(name),g=mound.geometry.clone(),p=g.attributes.position;
  g.computeBoundingBox();const center=g.boundingBox.getCenter(new T.Vector3());
  for(let j=0;j<p.count;j++){const x=p.getX(j),z=p.getZ(j),base=view.surfaceGround(x,z)+.016,h=Math.max(0,p.getY(j)-base),dx=x-center.x,dz=z-center.z,t=Math.exp(-h*2.5);const nx=center.x+dx*(1.09+.11*t)+.22*t*Math.sin(dz*1.6+i),nz=center.z+dz*(1.04+.10*t);p.setXYZ(j,nx,view.surfaceGround(nx,nz)+.016+h*(.76+.08*Math.tanh(dx*(i?-.6:.6))),nz);}
  g.computeVertexNormals();g.computeBoundingSphere();mound.geometry=g;supportMeshes.push(mound);
  for(let k=0;k<data.length;k+=24)if(Math.hypot(data[k]-center.x,data[k+2]-center.z)<.05&&data[k+19]===2)data[k]=100000;
  const nearest=[...view.contactAudit.cabinets].sort((a,b)=>Math.hypot(a.x-center.x,a.z-center.z)-Math.hypot(b.x-center.x,b.z-center.z))[0];
  areas.push({x:center.x,z:center.z,angle:i?.7:-.5,scale:i?1.05:.85,seed:i+2});casters.push({x:center.x,z:center.z,h:i?.85:.72,w:i?2.5:2.1,tree:false,pile:name});
  if(i===0){const source=view.environmentRoot.children.find(o=>o.name==='Study cabinet-front concrete block'),block=source.clone(true);block.position.set(nearest.x+.8,view.surfaceGround(nearest.x+.8,nearest.z-.45),nearest.z-.45);block.rotation.y+=.8;root.add(block);const b=new T.Box3().setFromObject(block);block.position.y+=view.surfaceGround(block.position.x,block.position.z)+.008-b.min.y;block.name='Spare lot concrete block';block.traverse(m=>{if(m.isMesh)supportMeshes.push(m);});const size=b.getSize(new T.Vector3());casters.push({x:block.position.x,z:block.position.z,h:size.y,w:.24,tree:false});}
 }
 for(const [index,side,scale]of [[65,1,.95],[300,-1,.80]]){const p=roadPoints[index],a=roadPoints[index-1],b=roadPoints[index+1],angle=Math.atan2(b.z-a.z,b.x-a.x),x=p.x-Math.sin(angle)*side*12,z=p.z+Math.cos(angle)*side*12;if(roadDistance(x,z)<5)continue;areas.push({x,z,angle,scale,seed:index});}

 view.scene.updateMatrixWorld(true);
 // Shared localized shader additions, using the established sun/car/lamp shadow path.
 const receivers=[];view.scene.traverse(o=>{if(!o.isMesh||Array.isArray(o.material))return;const key=o.material.customProgramCacheKey();if(key.includes('cinematic-casts-v2'))receivers.push(o);});
 const groups=[];for(const c of casters){let g=groups.find(g=>Math.hypot(g.x-c.x,g.z-c.z)<14);if(!g)groups.push(g={x:c.x,z:c.z,items:[]});g.items.push(c);}
 for(const o of receivers){const old=o.material,m=old.clone(),prior=old.onBeforeCompile,key=old.customProgramCacheKey.bind(old),isEarth=key().includes('"earth":true');m.customProgramCacheKey=()=>key()+'neighborhood102-'+(o.name.startsWith('Construction spoil pile')?o.name:'shared');m.onBeforeCompile=s=>{prior(s);
  // Insert BEFORE the clearing-only early exit, so remote clusters can cast too.
  const cast=groups.map(g=>`if(distance(p.xz,vec2(${f(g.x)},${f(g.z)}))<40.){${g.items.filter(c=>c.pile!==o.name).map(c=>`shadeAmount=max(shadeAmount,siteCast(p,d,reach,vec2(${f(c.x)},${f(c.z)}),${f(c.h)},${f(c.w)},${c.tree?'2.':'1.'}));`).join('')}}`).join('\n');
  s.fragmentShader=s.fragmentShader.replace('float shadeAmount=legacyRoadOcclusion(p,d,reach);','float shadeAmount=legacyRoadOcclusion(p,d,reach);\n'+cast);
  if(isEarth){const marks=areas.map(a=>`{vec2 q=mat2(${f(Math.cos(a.angle))},${f(-Math.sin(a.angle))},${f(Math.sin(a.angle))},${f(Math.cos(a.angle))})*(pw.xz-vec2(${f(a.x)},${f(a.z)}))/${f(a.scale)};
 if(length(q)<13.){float safe=smoothstep(.8,2.8,vergeDistance);float pad=(1.-smoothstep(.65,1.,length((q-vec2(1.,-1.))/vec2(5.5,4.))))*safe;float scrape=(1.-smoothstep(.65,1.,length((q-vec2(-2.,3.))/vec2(4.,2.5))))*safe;
 diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.30,.24,.20)*(.94+.06*pigment(pw.xz*.6)),pad*.68);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.45,.30,.19)*(.94+.06*pigment(pw.xz*.7)),scrape*.58);
 float passes=exp(-pow((q.y-2.6-.12*sin(q.x*.8+${f(a.seed)}))/.34,2.))+.6*exp(-pow((q.y-3.6-.08*q.x)/.48,2.));diffuseColor.rgb*=1.-passes*scrape*.12*(1.-smoothstep(14.,36.,dist));
 float drain=exp(-pow((q.y+3.4-.04*q.x*q.x)/.55,2.))*(1.-smoothstep(3.,7.,abs(q.x)))*safe;diffuseColor.rgb*=1.-drain*.10;
 }}`).join('\n');const contact=contacts.map(c=>`diffuseColor.rgb*=1.-.18*exp(-dot(pw.xz-vec2(${f(c.x)},${f(c.z)}),pw.xz-vec2(${f(c.x)},${f(c.z)}))/${f(c.r)});`).join('\n');s.fragmentShader=s.fragmentShader.replace('float plane=',marks+'\n'+contact+'\nfloat plane=');}
 };o.material=m;}
 // New solid trunks and a spare block use the existing hazard system.
 const old=view.hazards,layout={...old.layout,solids:[...old.layout.solids]};for(const c of casters.filter(c=>c.tree)){if(layout.solids.some(o=>o.kind==='YOUNG_TREE'&&Math.hypot(o.x-c.x,o.z-c.z)<.2))continue;const y=view.surfaceGround(c.x,c.z);layout.solids.push({kind:'YOUNG_TREE',x:c.x,z:c.z,radius:.1,bottom:y,top:y+c.h*.75});}
 const spare=root.getObjectByName('Spare lot concrete block');if(spare){const b=new T.Box3().setFromObject(spare),c=b.getCenter(new T.Vector3()),size=b.getSize(new T.Vector3());layout.solids.push({kind:'CINDER_BLOCK',x:c.x,z:c.z,hx:size.x/2,hz:size.z/2,yaw:0,bottom:b.min.y,top:b.max.y});}
 // Local, exact pile/block support; no full-landscape contact copies.
 const values=[],v=new T.Vector3();for(const m of supportMeshes){const g=m.geometry,p=g.attributes.position;for(let i=0;i<(g.index?.count??p.count);i++){v.fromBufferAttribute(p,g.index?g.index.getX(i):i).applyMatrix4(m.matrixWorld);values.push(v.x,v.y,v.z);}}
 const supports=new PavementContact(new Float32Array(values)),base=view.surfaceGround,contact=view.contactSurface;
 const wrap=(b,s)=>{const fn=(x,z)=>Math.max(b(x,z),s.height(x,z)??-Infinity);fn.upperBound=(...a)=>Math.max(b.upperBound?.(...a)??Infinity,s.upperBound(...a));if(b.planeBound)fn.planeBound=(...a)=>Math.max(b.planeBound(...a),s.planeBound(...a));return fn;};
 const surface=wrap(base,supports);surface.prepare=(xa,xb,za,zb)=>wrap(base.prepare?.(xa,xb,za,zb)??base,supports.prepare(xa,xb,za,zb));view.surfaceGround=surface;view.contactSurface=(x,z,r)=>supports.cells.has(Math.floor(x/4)+','+Math.floor(z/4))?surface:contact(x,z,r);view.hazards=new HazardWorld(layout,{surface,curb:old.curb});view.hazards.baseSurface=old.baseSurface;
 view.neighborhoodRoot=root;view.neighborhoodAudit={replacedTrees:0,plantCount:0,workAreas:areas,shadowGroups:groups.length};
}

// Warm actual visible geometry/material variants behind the black loading screen.
export async function warmNeighborhood(view,selectionSim){
 const saved=view.camera.clone(),camPos=view.camPos?.clone(),camHeading=view.camHeading;
 const hallway=view.hallway,hallwayState=hallway?{...hallway,cue:hallway.cue?Object.assign(Object.create(Object.getPrototypeOf(hallway.cue)),hallway.cue):undefined}:null;
 const sim=view.hazards.attach(new Ride({...selectionSim.options,start:CUL_START}));
 for(const s of [CUL_START-10,CUL_START+25,CUL_START+48,0,80,500]){sim.car.s=s;sim.updateCarPosition();const c=sim.car,r=sim.rider;r.x=c.hx-Math.cos(c.heading)*sim.rope;r.z=c.hz-Math.sin(c.heading)*sim.rope;r.heading=c.heading;view.camPos=null;view.draw(sim,0,{},false);await new Promise(requestAnimationFrame);}
 // Warm the moving turn as well: visible animation variants can appear between
 // the fixed viewpoints. All of this stays behind the black loading screen.
 view.camPos=null;
 for(let i=0;i<100;i++){sim.car.s=CUL_START-10+i*.65;sim.updateCarPosition();const c=sim.car,r=sim.rider;r.x=c.hx-Math.cos(c.heading)*sim.rope;r.z=c.hz-Math.sin(c.heading)*sim.rope;r.heading=c.heading;r.vx=Math.cos(c.heading)*5;r.vz=Math.sin(c.heading)*5;c.speed=5;sim.time=i*.13;view.draw(sim,.13,{},false);if(i%10===0)await new Promise(requestAnimationFrame);}
 view.camera.copy(saved);view.camPos=camPos;view.camHeading=camHeading;if(hallwayState)Object.assign(hallway,hallwayState);
}
