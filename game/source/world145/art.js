import * as T from '../vendor/three.module.js';
import {spotMaterial,surfaces} from '../spot142/materials.js';
import {RAMP,at} from '../road-details.js';
import {roadDistance,heading,FOOTPATH,terrainHeight} from '../world.js';
import {eveningUniforms} from '../evening-light.js';
import {clearFootprint145,pathDistance145,worldPoint145} from './layout.mjs';

// THPS4's decoded scenes carry vertex colour on every inspected sector, while
// material stacks separate base surfaces from grime/trim/contact layers. This
// scene applies that construction to the Track's existing unfinished lots.
export function installWorld145(view){
 if(view.world145)return view.world145;
 const root=new T.Group();root.name='Track neighborhood - framed lots and grounded materials';
 const batches=new Map(),audit=[],base=new T.BoxGeometry(1,1,1).toNonIndexed();
 const materials={wood:spotMaterial(0xae845c,'wood'),cut:spotMaterial(0xc4a47d,'plywood'),panel:spotMaterial(0xad8a66,'plywood'),concrete:spotMaterial(0xaaa59e,'worn'),iron:spotMaterial(0x494954,'concrete'),tarp:spotMaterial(0x444c60,'concrete')};
 for(const m of Object.values(materials))m.vertexColors=true;
 const ground=(x,z)=>view.terrainSurface?.(x,z)??view.surfaceGround?.(x,z)??terrainHeight(x,z);
 const batches145={contact:{p:[],c:[],uv:[]},earth:{p:[],c:[],uv:[]},dust:{p:[],c:[],uv:[]},seam:{p:[],c:[],uv:[]}};
 let solids=0;
 function emit(g,mat){const p=g.attributes.position,n=g.attributes.normal,c=[];for(let i=0;i<p.count;i++){
   // Broad face and low-edge values survive a low-resolution chase camera.
   const light=.74+.22*Math.max(0,n.getY(i))+.035*Math.sin(p.getX(i)*1.7+p.getZ(i)*.6);
   c.push(light,light*.98,light*.95);
  }g.setAttribute('color',new T.Float32BufferAttribute(c,3));const a=batches.get(mat)??[];a.push(g);batches.set(mat,a);solids++;}
 function box(c,x,y,z,w,h,d,mat,turn=0){const p=worldPoint145(c,x,z),g=base.clone();g.applyMatrix4(new T.Matrix4().compose(new T.Vector3(p.x,c.y+y,p.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),c.a+turn),new T.Vector3(w,h,d)));emit(g,mat);}
 function beam(c,a,b,width,depth,mat){const pa=worldPoint145(c,a[0],a[2]),pb=worldPoint145(c,b[0],b[2]),start=new T.Vector3(pa.x,c.y+a[1],pa.z),end=new T.Vector3(pb.x,c.y+b[1],pb.z),delta=end.clone().sub(start);const g=base.clone();g.applyMatrix4(new T.Matrix4().compose(start.clone().add(end).multiplyScalar(.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),delta.clone().normalize()),new T.Vector3(width,delta.length(),depth)));emit(g,mat);}
 function surfaceY(x,z,kind){if(kind==='seam')return view.hazards.skateHeight(x,z);if(roadDistance(x,z)<1.1||pathDistance145(x,z)<1.8)return null;return ground(x,z);}
 function triangle(kind,points,alpha,color){const b=batches145[kind],col=new T.Color(color);for(let i=0;i<3;i++){const [x,z]=points[i],y=surfaceY(x,z,kind);if(y===null||!Number.isFinite(y))return;}for(let i=0;i<3;i++){const [x,z]=points[i],y=surfaceY(x,z,kind);b.p.push(x,y+.014,z);b.c.push(col.r,col.g,col.b,alpha[i]);b.uv.push(x*.43,z*.43);}}
 function patch(c,w,d,kind,opacity,color){const rings=Math.min(6,Math.max(2,Math.ceil(Math.max(w,d)/2))),n=24;for(let ring=0;ring<rings;ring++){const r0=ring/rings,r1=(ring+1)/rings;for(let i=0;i<n;i++){
   const angle=i/n*Math.PI*2,next=(i+1)/n*Math.PI*2,edge=a=>1+.075*Math.sin(a*5+.7)+.05*Math.sin(a*9);
   const pt=(a,r)=>{const p=worldPoint145(c,Math.cos(a)*w*.5*r*edge(a),Math.sin(a)*d*.5*r*edge(a));return[p.x,p.z];};
   const a=pt(angle,r0),b=pt(next,r0),cc=pt(next,r1),dd=pt(angle,r1),fade=r=>opacity*(1-r*r)*(1-r*r);
   triangle(kind,[a,b,cc],[fade(r0),fade(r0),fade(r1)],color);triangle(kind,[a,cc,dd],[fade(r0),fade(r1),fade(r1)],color);
  }}}
 function strip(c,x0,z0,x1,z1,w,kind,opacity,color){const p=worldPoint145(c,x0,z0),q=worldPoint145(c,x1,z1),dx=q.x-p.x,dz=q.z-p.z,l=Math.hypot(dx,dz),nx=-dz/l*w/2,nz=dx/l*w/2,a=[p.x-nx,p.z-nz],b=[p.x+nx,p.z+nz],cc=[q.x+nx,q.z+nz],d=[q.x-nx,q.z-nz];triangle(kind,[a,b,cc],[opacity,opacity,opacity],color);triangle(kind,[a,cc,d],[opacity,opacity,opacity],color);}
 function fitted(c,w,d){const pts=[];for(const x of [-w/2,0,w/2])for(const z of [-d/2,0,d/2]){const p=worldPoint145(c,x,z);pts.push(ground(p.x,p.z));}c.y=Math.max(...pts);return Math.max(...pts)-Math.min(...pts);}
 // The existing formwork becomes a recognizable partly framed outbuilding.
 // Keep the open front and every original collision/route definition intact.
 const foundation=view.spotArt142?.audit?.[0];
 if(foundation){const p=at(RAMP,foundation.site.u,foundation.site.v),c={...p,a:Math.PI/2-RAMP.h,y:0};
  if(clearFootprint145(c,5.7,6.4)){fitted(c,5,6);
   for(const x of [-2.48,2.48]){for(const z of [-2.8,-1.4,0,1.4,2.8]){const p=worldPoint145(c,x,z),bottom=ground(p.x,p.z)-c.y-.025;box(c,x,(2.52+bottom)/2,z,.10,2.52-bottom,.10,materials.wood);}box(c,x,2.52,0,.15,.11,6,materials.cut);}
   for(const z of [-2.8,-1.4,0,1.4,2.8]){
    beam(c,[-2.60,2.54,z],[0,3.92,z],.095,.11,materials.cut);beam(c,[0,3.92,z],[2.60,2.54,z],.095,.11,materials.cut);
    beam(c,[-2.42,2.59,z],[2.42,2.59,z],.075,.095,materials.wood);
    beam(c,[-1.48,2.59,z],[0,3.88,z],.065,.075,materials.wood);beam(c,[0,3.88,z],[1.48,2.59,z],.065,.075,materials.wood);
   }
   box(c,0,3.94,0,.10,.13,6.05,materials.wood);
   // Only the far wall is partly sheathed; the silhouette stays open and light.
   for(const z of [-1.9,-.65,.60])box(c,2.53,1.32,z,.025,2.36,1.22,materials.panel);
   for(const z of [-2.8,2.8])beam(c,[-2.4,.12,z],[2.35,2.48,z],.055,.075,materials.wood);
   // Roof battens over the far half describe the slope without a solid roof.
   for(const x of [.65,1.3,1.95])box(c,x,3.94-x*.53,.3,.06,.06,5.5,materials.cut);
   patch(c,7.3,8.2,'contact',.29,0x151722);patch(c,11,12,'earth',.42,0x6b5142);patch({...c,x:c.x+1.6,z:c.z-1.1},5,7,'dust',.25,0xbba080);
   // Delivery ruts stop at the work area, not across the riding corridor.
   for(const side of [-1,1])for(let i=0;i<36;i++){const z=-7+i*.17,fade=Math.sin(i/35*Math.PI);strip(c,side*.9,z,side*.9+.015,z+.18,.29,'earth',.17*fade,0x57473f);if(i%3===0)strip(c,side*.9-.14,z,side*.9+.14,z+.035,.022,'contact',.12*fade,0x20202a);}
   audit.push({kind:'framed-lot',x:c.x,z:c.z,width:5.7,depth:6.4,yaw:c.a,height:3.99,roadClearance:roadDistance(c.x,c.z),pathClearance:pathDistance145(c.x,c.z)});
  }
 }
 // Two purposefully different delivery clusters give long straights landmarks.
 const clusters=view.consoleSiteDetails?.clusters??[];
 for(const [k,site]of clusters.filter(s=>[96,350,490].includes(s.s)).entries()){
  const a=-heading(site.s)+Math.PI/2,p=worldPoint145({...site,a},4.4,.5),c={...p,a,y:0};
  if(!clearFootprint145(c,3.2,5.3)||fitted(c,3,5)>.55)continue;
  if(k%2===0){
   // Prebuilt roof trusses stacked vertically on sleepers, with bound feet.
   for(const z of [-1.7,1.7]){const p=worldPoint145(c,0,z),bottom=ground(p.x,p.z)-c.y-.04;box(c,0,(.25+bottom)/2,z,2.9,.25-bottom,.18,materials.wood);}
   for(let i=0;i<4;i++){const z=-.23+i*.16;beam(c,[-1.35,.28,z],[0,2.15,z],.10,.10,materials.cut);beam(c,[0,2.15,z],[1.35,.28,z],.10,.10,materials.cut);beam(c,[-1.35,.32,z],[1.35,.32,z],.10,.10,materials.wood);}
   for(const x of [-.85,.85])box(c,x,.50,0,.035,.48,.68,materials.iron);
  }else{
   // Bundled concrete sections: visible open bores, modeled with eight sides.
   for(const x of [-.62,.62])for(const z of [-1,0,1]){const yy=.45;const g=new T.CylinderGeometry(.43,.43,.82,12,1,true);g.rotateX(Math.PI/2);const p=worldPoint145(c,x,z);g.applyMatrix4(new T.Matrix4().compose(new T.Vector3(p.x,c.y+yy,p.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),c.a),new T.Vector3(1,1,1)));emit(g.toNonIndexed(),materials.concrete);for(const dz of [-.41,.41]){const ring=new T.RingGeometry(.32,.43,12),p=worldPoint145(c,x,z+dz);ring.applyMatrix4(new T.Matrix4().compose(new T.Vector3(p.x,c.y+yy,p.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),c.a),new T.Vector3(1,1,1)));emit(ring.toNonIndexed(),materials.concrete);}}
   for(const z of [-1.5,1.5])box(c,0,.055,z,2.5,.11,.15,materials.wood);
  }
  patch(c,4.3,6,'contact',.28,0x171925);patch(c,7,8,'earth',.32,0x73604c);
  audit.push({kind:k%2===0?'truss-delivery':'drain-sections',x:c.x,z:c.z,width:3.2,depth:5.3,yaw:c.a,roadClearance:roadDistance(c.x,c.z),pathClearance:pathDistance145(c.x,c.z)});
 }
 // Existing scattered supplies now sit in compressed soil, not float over it.
 for(const site of clusters){const c={...site,a:-heading(site.s)+Math.PI/2};patch(c,5.2,6.9,'earth',.30,0x77604b);patch(c,2.2,4.9,'contact',.23,0x171a25);}
 let triangles=0;
 for(const [mat,parts]of batches){const g=new T.BufferGeometry();for(const attr of ['position','normal','color']){const a=new Float32Array(parts.reduce((n,p)=>n+p.attributes[attr].array.length,0));let off=0;for(const p of parts){a.set(p.attributes[attr].array,off);off+=p.attributes[attr].array.length;}g.setAttribute(attr,new T.BufferAttribute(a,3));}g.computeBoundingSphere();triangles+=g.attributes.position.count/3;const mesh=new T.Mesh(g,mat);mesh.name='World145 '+Object.keys(materials).find(k=>materials[k]===mat);mesh.userData.memoryCaster=true;root.add(mesh);parts.forEach(g=>g.dispose());}
 for(const [kind,b]of Object.entries(batches145)){if(!b.p.length)continue;const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(b.p,3));g.setAttribute('color',new T.Float32BufferAttribute(b.c,4));g.setAttribute('uv',new T.Float32BufferAttribute(b.uv,2));g.computeBoundingSphere();const m=new T.MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2,map:kind==='earth'||kind==='dust'?surfaces.soil:null});m.onBeforeCompile=s=>{s.uniforms.world145Night=eveningUniforms.eveningNight;s.fragmentShader='uniform float world145Night;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>','outgoingLight*=mix(vec3(1.),vec3(.026,.041,.067),world145Night);\n#include <opaque_fragment>');};const mesh=new T.Mesh(g,m);mesh.name='World145 '+kind+' surface layer';mesh.renderOrder=3;root.add(mesh);triangles+=b.p.length/9;}
 base.dispose();view.scene.add(root);view.consoleWorldLook?.refresh();
 return view.world145={root,audit,triangles,drawCalls:root.children.length,geometryParts:solids,physicsChanged:false};
}
