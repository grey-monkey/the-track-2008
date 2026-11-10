import * as T from '../vendor/three.module.js';
import {sample,heading,LENGTH,roadDistance,FOOTPATH} from '../world.js';
import {eveningUniforms} from '../evening-light.js';

// World-scale wear follows the existing surfaces. Two static batches; no new
// collision geometry or scenery objects in the riding line.
export function installSurfaceWear(view){
 const root=new T.Group();root.name='Track 2008 - road use and graded lots';view.scene.add(root);
 const batches={road:{positions:[],colors:[]},soil:{positions:[],colors:[]}};
 const point=(s,u)=>{const p=sample(s),h=heading(s);return{x:p.x-Math.sin(h)*u,z:p.z+Math.cos(h)*u};};
 const pathDistance=(x,z)=>{let d=Infinity;for(let i=1;i<FOOTPATH.length;i++){const a=FOOTPATH[i-1],b=FOOTPATH[i],dx=b.x-a.x,dz=b.z-a.z,t=T.MathUtils.clamp(((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz),0,1);d=Math.min(d,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));}return d;};
 function ribbon(kind,a,b,width,alpha,color){
  const dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(len<.001)return;
  const nx=-dz/len*width/2,nz=dx/len*width/2,points=[[a.x-nx,a.z-nz],[a.x+nx,a.z+nz],[b.x+nx,b.z+nz],[b.x-nx,b.z-nz]],out=[];
  for(const [x,z]of points){
   if(kind==='road'&&(view.roadContact.height(x,z)===undefined||view.hazards.curb(x,z)!==undefined))return;
   if(kind==='soil'&&(roadDistance(x,z)<1.4||pathDistance(x,z)<2.1))return;
   const y=kind==='road'?view.roadContact.height(x,z):view.terrainSurface(x,z);if(!Number.isFinite(y))return;out.push([x,y+.008,z]);
  }
  const batch=batches[kind],c=new T.Color(color);for(const i of [0,1,2,0,2,3]){batch.positions.push(...out[i]);batch.colors.push(c.r,c.g,c.b,alpha);}
 }
 // Intermittent grit accumulated beside the rolled curb, broken by clean stretches.
 for(let s=5;s<LENGTH-3;s+=.75)for(const side of [-1,1]){
  const fade=Math.max(0,Math.sin(s*.071+side*.8));if(fade<.12)continue;
  ribbon('road',point(s,side*3.48),point(s+.73,side*(3.48+.025*Math.sin(s))),.24+.07*Math.sin(s*.21),.11*fade,0x66574c);
 }
 // Repeated passes through bends have softened edges, not two perfect racing stripes.
 for(const station of [35,92,185,290,370,435,535,620,755,815])for(const side of [-1,1])for(let i=0;i<65;i++){
  const t=i/65,s=station+t*19,u=side*.85+Math.sin(t*2.2)*.22,fade=Math.sin(t*Math.PI)**2;
  ribbon('road',point(s,u),point(s+.28,u+.004),.17+.05*Math.sin(i*.73),.075*fade,0x141822);
 }
 // Grader/truck traces belong beside the existing construction staging areas.
 for(const [index,site]of (view.consoleSiteDetails?.clusters??[]).entries()){
  const h=heading(site.s),cx=site.x+Math.cos(h)*4.5,cz=site.z+Math.sin(h)*4.5;
  const at=(u,v)=>({x:cx-Math.sin(h)*u+Math.cos(h)*v,z:cz+Math.cos(h)*u+Math.sin(h)*v});
  for(let i=0;i<95;i++){
   const t=i/95,v=-9+t*20,bend=.65*Math.sin(t*2.5+index),fade=Math.sin(t*Math.PI)**.7;
   ribbon('soil',at(bend,v),at(bend+.01,v+.22),2.1,.10*fade,0x9b765b);
   for(const wheel of [-.82,.82]){
    ribbon('soil',at(bend+wheel,v),at(bend+wheel+.01,v+.19),.29,.23*fade,0x654f49);
    if(i%2===0)ribbon('soil',at(bend+wheel-.13,v),at(bend+wheel+.13,v+.07),.036,.15*fade,0x493b3b);
   }
  }
 }
 for(const [kind,batch]of Object.entries(batches)){
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(batch.positions,3));g.setAttribute('color',new T.Float32BufferAttribute(batch.colors,4));g.computeBoundingSphere();
  const m=new T.MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  m.onBeforeCompile=s=>{s.uniforms.wearNight=eveningUniforms.eveningNight;s.fragmentShader='uniform float wearNight;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),wearNight);');};m.customProgramCacheKey=()=> 'grounded-wear141';
  const mesh=new T.Mesh(g,m);mesh.name=kind==='road'?'Asphalt edge deposits and worn wheel lines':'Grading and delivery tire traces';mesh.renderOrder=2;root.add(mesh);
 }
 return view.worldArt141={root,drawCalls:root.children.length,triangles:Object.values(batches).reduce((n,b)=>n+b.positions.length/9,0)};
}
