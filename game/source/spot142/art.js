import {eveningUniforms} from '../evening-light.js';
import * as T from '../vendor/three.module.js';
import {spotMaterial} from './materials.js';
import {RAMP,at,local} from '../road-details.js';
import {roadDistance,FOOTPATH} from '../world.js';
// A recognizable work site beside the existing plywood. Authored broad color
// bands and contact shading follow the original vertex-lit material approach.
export function installSpotArt(view){
 const root=new T.Group();root.name='Plywood corner construction detail';view.scene.add(root);
 const batches=new Map(),solids=[],audit=[];
 const wood=spotMaterial(0xbd956c),cut=spotMaterial(0xd0ae80),cement=spotMaterial(0xb2aaa0,'worn'),dark=spotMaterial(0x413c39,'concrete');
 const base=new T.BoxGeometry(1,1,1).toNonIndexed();
 function box(u,v,y,w,h,d,mat,solid=true){
  const p=at(RAMP,u,v),floor=view.surfaceGround(p.x,p.z),g=base.clone();
  g.applyMatrix4(new T.Matrix4().compose(new T.Vector3(p.x,floor+y,p.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),Math.PI/2-RAMP.h),new T.Vector3(w,h,d)));
  const a=batches.get(mat)??[];a.push(g);batches.set(mat,a);
  if(solid)solids.push({kind:'TIMBER',x:p.x,z:p.z,hx:w/2,hz:d/2,yaw:RAMP.h-Math.PI/2,bottom:floor+y-h/2,top:floor+y+h/2});
 }
 const pathClear=(x,z)=>FOOTPATH.slice(1).every((b,i)=>{const a=FOOTPATH[i],dx=b.x-a.x,dz=b.z-a.z,t=T.MathUtils.clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(x-a.x-dx*t,z-a.z-dz*t)>4;});
 // Low foundation formwork and a stored stack of wall frames: construction,
 // not a new skatepark. Leave the roadway and path approaches untouched.
 let site=null;
 for(const u of [9,12,15]){const p=at(RAMP,u,8);if(roadDistance(p.x,p.z)>5&&pathClear(p.x,p.z)){site={u,v:8};break;}}
 if(site){const {u,v}=site;
  for(const side of [-1,1]){box(u+side*2.5,v,.16,.14,.32,6.2,wood);box(u,v+side*3,.16,5,.32,.12,wood);}
  for(const side of [-1,1])for(let k=-3;k<=3;k++)box(u+side*2.62,v+k,.28,.065,.56,.065,cut);
  // Stacked framed panels give a readable diagonal silhouette without a building.
  for(let layer=0;layer<3;layer++){
   for(const side of [-1,1])box(u+side*1.5,v+.5,.45+layer*.13,.09,.09,2.8,cut);
   for(let k=0;k<6;k++)box(u-1.5+k*.6,v+.5,.45+layer*.13,.07,.09,2.8,wood);
   for(const side of [-1,1])box(u,v+.5+side*1.4,.45+layer*.13,3.1,.09,.09,cut);
  }
  // Two upright timber form panels with visible studs and concrete contact feet.
  for(const side of [-1,1]){const center=u+side*2.15;box(center,v+2.4,.22,.60,.44,.7,cement);box(center,v+2.4,1.25,.10,2.0,.10,wood);}
  for(const y of [.65,1.65,2.2])box(u,v+2.4,y,4.4,.11,.10,cut);
  for(let k=0;k<7;k++)box(u-2.1+k*.7,v+2.4,1.38,.07,1.6,.08,wood);
  for(let k=0;k<5;k++)box(u+3.5,v-1.5+k*.25,.15,1.25,.30,.20,cement);
  audit.push({site,position:at(RAMP,u,v),roadClearance:roadDistance(at(RAMP,u,v).x,at(RAMP,u,v).z)});
 }
 let triangles=0;
 for(const [material,parts]of batches){const g=new T.BufferGeometry();for(const attr of ['position','normal']){const a=new Float32Array(parts.reduce((n,p)=>n+p.attributes[attr].array.length,0));let i=0;for(const p of parts){a.set(p.attributes[attr].array,i);i+=p.attributes[attr].array.length;}g.setAttribute(attr,new T.BufferAttribute(a,3));}g.computeBoundingSphere();triangles+=g.attributes.position.count/3;const mesh=new T.Mesh(g,material);mesh.userData.memoryCaster=true;root.add(mesh);for(const g of parts)g.dispose();}
 // Broad contact patches, cracks and wax marks stay on actual receiving surfaces.
 const vertices=[],colors=[];
 function strip(a,b,w,color,kind='road'){
  const dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz);if(l<.001)return;const nx=-dz/l*w/2,nz=dx/l*w/2;
  const points=[[a.x-nx,a.z-nz],[a.x+nx,a.z+nz],[b.x+nx,b.z+nz],[b.x-nx,b.z-nz]];
  const heights=points.map(([x,z])=>kind==='road'?(view.roadContact.height(x,z)??null):view.surfaceGround(x,z));if(heights.some(y=>y===null))return;
  for(const i of [0,1,2,0,2,3]){vertices.push(points[i][0],heights[i]+.009,points[i][1]);colors.push(...color);}
 }
 // Broken, sealed asphalt joints at distinct scales; no fake rideable geometry.
 for(let k=0;k<8;k++){const v=-13+k*4.8;for(let j=0;j<12;j++){const u=-5+j*.5,aa=at(RAMP,u,v+Math.sin(j*1.7+k)*.12),bb=at(RAMP,u+.5,v+Math.sin((j+1)*1.7+k)*.12);strip(aa,bb,.025,[.018,.022,.030]);}}
 if(site){for(let j=0;j<6;j++)strip(at(RAMP,site.u-2.5,site.v-3+j*1.1),at(RAMP,site.u+2.5,site.v-3+j*1.1),1.2,[.29,.23,.20],'soil');}
 // Broad local scuffs and compressed dust have irregular broken outlines.
 for(let j=0;j<90;j++){
  const v=-4+j*.12,width=.024+.009*Math.sin(j*1.9),u=.08*Math.sin(j*.16);
  for(const side of [-.10,.10])strip(at(RAMP,u+side,v),at(RAMP,u+side+.004,v+.115),width,[.028,.030,.037]);
 }
 // Contact pads below the visible block and plywood; no hovering blob shadow.
 for(const [u,v,w,d]of [[0,.20,.56,.48],[.49,-.81,.31,.28]])for(let j=0;j<4;j++)strip(at(RAMP,u-w/2,v-d/2+j*d/4),at(RAMP,u+w/2,v-d/2+j*d/4),d/4+.012,[.009,.012,.018]);
 const geom=new T.BufferGeometry();geom.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geom.setAttribute('color',new T.Float32BufferAttribute(colors,3));geom.computeBoundingSphere();
 const mat=new T.MeshBasicMaterial({vertexColors:true,transparent:true,opacity:.36,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,side:T.DoubleSide});
 mat.onBeforeCompile=s=>{s.uniforms.spotNight=eveningUniforms.eveningNight;s.fragmentShader='uniform float spotNight;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>','outgoingLight*=1.-spotNight*.94;\n#include <opaque_fragment>');};
 const marks=new T.Mesh(geom,mat);marks.renderOrder=2;root.add(marks);
 // Register the same dimensions in the spatial collision grid.
 for(const o of solids){o.type='solids';o.id='spot142-'+view.hazards.layout.solids.length;view.hazards.layout.solids.push(o);const r=Math.hypot(o.hx,o.hz);for(let x=Math.floor((o.x-r)/8);x<=Math.floor((o.x+r)/8);x++)for(let z=Math.floor((o.z-r)/8);z<=Math.floor((o.z+r)/8);z++){const key=x+','+z,items=view.hazards.cells.get(key)??[];items.push(o);view.hazards.cells.set(key,items);}}
 const shadowGeometry=new T.BufferGeometry(),shadowPosition=new Float32Array(24*9);shadowGeometry.setAttribute('position',new T.BufferAttribute(shadowPosition,3));
 const shadowMaterial=new T.MeshBasicMaterial({color:0x101522,transparent:true,opacity:.28,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1});
 const shadow=new T.Mesh(shadowGeometry,shadowMaterial);shadow.frustumCulled=false;root.add(shadow);
 function update(sim,menu){const r=sim.rider;shadow.visible=!menu&&!['crashed','ended'].includes(sim.phase);if(!shadow.visible)return;const co=Math.cos(r.heading),si=Math.sin(r.heading);let n=0;
  for(let i=0;i<24;i++)for(const a of [null,i/24*Math.PI*2,(i+1)/24*Math.PI*2]){const x=a===null?0:Math.cos(a)*.53,z=a===null?0:Math.sin(a)*.17,wx=r.x+x*co-z*si,wz=r.z+x*si+z*co;shadowPosition[n++]=wx;shadowPosition[n++]=view.hazards.skateHeight(wx,wz)+.012;shadowPosition[n++]=wz;}
  shadowMaterial.opacity=.28*Math.exp(-r.height*2.2);shadowGeometry.attributes.position.needsUpdate=true;
 }
 base.dispose();view.consoleWorldLook.refresh();return view.spotArt142={root,audit,solids,update,triangles:triangles+vertices.length/9+24,drawCalls:root.children.length};
}
