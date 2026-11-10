import * as T from './vendor/three.module.js';
import {spotMaterial} from './spot142/materials.js';
import {siteMaterial} from './barriers90.js';
import {heading,terrainHeight} from './world.js';
import {worldPoint145,clearFootprint145} from './world145/layout.mjs';

// Small residential-site dressing, fitted to existing lots. Shared geometry
// batches and existing surface textures keep the console-era material language.
export function installEnvironment157(view){
 const root=new T.Group();root.name='Residential lot finishing details';const batches=new Map(),audit=[];
 const mats={wood:spotMaterial(0xab865e,'wood'),cut:spotMaterial(0xc0a07a,'plywood'),wrap:siteMaterial(0xc3beb0),tarp:siteMaterial(0x545c56),dark:siteMaterial(0x343a36),grass:siteMaterial(0x77734e)};
 Object.values(mats).forEach(m=>m.vertexColors=true);
 const ground=(x,z)=>view.terrainSurface?.(x,z)??terrainHeight(x,z);
 function emit(g,m){const n=g.attributes.normal,p=g.attributes.position,c=[];for(let i=0;i<p.count;i++){const shade=.66+.25*Math.max(0,n.getY(i))+.07*Math.max(0,-n.getX(i)),v=shade*(.96+.04*Math.sin(p.getX(i)*.81+p.getZ(i)*1.1));c.push(v,v*.985,v*.955);}g.setAttribute('color',new T.Float32BufferAttribute(c,3));const a=batches.get(m)??[];a.push(g);batches.set(m,a);}
 function box(c,x,y,z,w,h,d,m,angle=0){const q=worldPoint145(c,x,z),g=new T.BoxGeometry(w,h,d).toNonIndexed();g.applyMatrix4(new T.Matrix4().compose(new T.Vector3(q.x,c.y+y,q.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),c.a+angle),new T.Vector3(1,1,1)));emit(g,m);}
 function footprint(c,w,d){if(!clearFootprint145(c,w,d,2.8))return false;const ys=[];for(const x of [-w/2,0,w/2])for(const z of [-d/2,0,d/2]){const p=worldPoint145(c,x,z);ys.push(ground(p.x,p.z));}c.y=Math.max(...ys);return c.y-Math.min(...ys)<.35;}
 function pallet(c){for(const x of [-.5,0,.5]){const a=worldPoint145(c,x,-.6),b=worldPoint145(c,x,.6),bottom=Math.min(ground(a.x,a.z),ground(b.x,b.z))-c.y-.025;box(c,x,(bottom+.13)/2,0,.09,.13-bottom,1.2,mats.wood);}for(let i=0;i<7;i++)box(c,0,.155,-.53+i*.176,1.28,.05,.13,mats.wood);}
 function tarp(c){const vertices=[],nx=8,nz=12,pt=(i,j)=>{const x=-.73+i/nx*1.46,z=-.94+j/nz*1.88,edge=Math.max(Math.abs(x)/.73,Math.abs(z)/.94),y=.61-Math.max(0,edge-.73)*1.34+.025*Math.sin(i*1.8+j*.8);const p=worldPoint145(c,x,z);return[p.x,c.y+y,p.z];};for(let i=0;i<nx;i++)for(let j=0;j<nz;j++)for(const p of [pt(i,j),pt(i+1,j),pt(i+1,j+1),pt(i,j),pt(i+1,j+1),pt(i,j+1)])vertices.push(...p);const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.computeVertexNormals();emit(g,mats.tarp);}
 for(const [i,site] of (view.consoleSiteDetails?.clusters??[]).entries()){
  const c={...worldPoint145({...site,a:Math.PI/2-heading(site.s)},-3.8,.4),a:Math.PI/2-heading(site.s)+.08*Math.sin(i),y:0};
  if(!footprint(c,3.1,3.5))continue;
  pallet(c);
  if(i%3===0){
   for(let row=0;row<4;row++)for(let col=0;col<4;col++)box(c,(col-1.5)*.24,.23+row*.085,.15,.215,.075,1.6,mats.cut);
   tarp(c);for(const x of [-.5,.5])box(c,x,.63,0,.036,.025,1.65,mats.dark);
  }else if(i%3===1){
   // Short rolls of housewrap with cardboard cores, on an open slatted pallet.
   for(const x of [-.32,.32]){const q=worldPoint145(c,x,0),g=new T.CylinderGeometry(.22,.22,1.08,12,1,true).toNonIndexed();g.rotateX(Math.PI/2);g.applyMatrix4(new T.Matrix4().compose(new T.Vector3(q.x,c.y+.40,q.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),c.a),new T.Vector3(1,1,1)));emit(g,mats.wrap);for(const z of [-.54,.54]){const p=worldPoint145(c,x,z),ring=new T.RingGeometry(.048,.22,12).toNonIndexed();ring.applyMatrix4(new T.Matrix4().compose(new T.Vector3(p.x,c.y+.40,p.z),new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),c.a),new T.Vector3(1,1,1)));emit(ring,mats.wrap);}box(c,x,.624,0,.45,.012,.045,mats.dark);}
  }else{
   // Uneven sheathing offcuts; avoid identical, perfectly aligned delivery piles.
   for(let layer=0;layer<5;layer++)box(c,.02*Math.sin(layer*2),.21+layer*.025,.05*Math.cos(layer),1.20-layer*.065,.021,1.1+layer*.075,mats.cut,.025*layer);
   for(let j=0;j<3;j++)box(c,.50-j*.12,.38+j*.06,0,.09,.075,1.5-j*.17,mats.wood,-.18+j*.08);
  }
  audit.push({kind:['tarp-covered-lumber','housewrap-rolls','sheathing-offcuts'][i%3],...c,width:3.1,depth:3.5});
  // Small, irregular tufts around the work area; never in the riding corridor.
  for(let j=0;j<18;j++){const a=j*2.399+i,r=1.1+(j%5)*.11,local={...worldPoint145(c,Math.cos(a)*r,Math.sin(a)*r),a:0};if(!clearFootprint145(local,.20,.20,2.8))continue;const y=ground(local.x,local.z),h=.10+.16*(.5+.5*Math.sin(j*17+i)),p=[];for(let k=0;k<3;k++){const t=a+k*1.047,dx=Math.cos(t)*.035,dz=Math.sin(t)*.035;p.push(local.x-dx,y,local.z-dz,local.x+dx,y,local.z+dz,local.x+dx*.8,y+h,local.z+dz*.8);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.computeVertexNormals();emit(g,mats.grass);}
 }
 // Ground the existing pallet, block and lumber faces with restrained baked
 // shading. It preserves their palette while making undersides read clearly.
 view.consoleSiteDetails?.root.traverse(m=>{if(!m.isMesh)return;const surface={'Weathered pallet timber':'wood','Sawn construction lumber':'wood','Concrete block faces':'worn'}[m.name];if(surface){const prior=m.material;m.material=spotMaterial(prior.color.getHex(),surface);const finish=m.material.onBeforeCompile,key=m.material.customProgramCacheKey();m.material.customProgramCacheKey=()=>key+'-subtle157';m.material.onBeforeCompile=shader=>{finish(shader);shader.fragmentShader=shader.fragmentShader.replace('diffuseColor.rgb=spotLinear*spotValue*mix(vec3(1.),spotTint,.16);','diffuseColor.rgb=mix(diffuseColor.rgb,spotLinear*spotValue*mix(vec3(1.),spotTint,.16),.88);');};prior.dispose();}const n=m.geometry.attributes.normal,c=[];for(let i=0;i<n.count;i++){const v=.73+.25*Math.max(0,n.getY(i));c.push(v,v,v);}m.geometry.setAttribute('color',new T.Float32BufferAttribute(c,3));m.material.vertexColors=true;m.material.needsUpdate=true;});
 let triangles=0;for(const [m,parts] of batches){const g=new T.BufferGeometry();for(const attr of ['position','normal','color']){const a=new Float32Array(parts.reduce((n,p)=>n+p.attributes[attr].array.length,0));let offset=0;for(const p of parts){a.set(p.attributes[attr].array,offset);offset+=p.attributes[attr].array.length;}g.setAttribute(attr,new T.BufferAttribute(a,3));}g.computeBoundingSphere();const mesh=new T.Mesh(g,m);mesh.name='Residential dressing '+Object.keys(mats).find(k=>mats[k]===m);root.add(mesh);triangles+=g.attributes.position.count/3;parts.forEach(p=>p.dispose());}
 view.scene.add(root);view.consoleWorldLook?.refresh();return view.environment157={root,audit,drawCalls:root.children.length,triangles,physicsChanged:false};
}
