import * as T from '../vendor/three.module.js';
import {siteMaterial} from '../barriers90.js';
import {sample,heading,roadDistance,FOOTPATH,ENTRANCE_HOUSES,terrainHeight} from '../world.js';

// Small, off-road construction staging areas in the unfinished neighborhood.
// All geometry is static and merged by material. No route or collision changes.
export function installSiteDetails(view){
 if(view.consoleSiteDetails)return view.consoleSiteDetails;
 const root=new T.Group();root.name='Unfinished neighborhood lot details';
 const batches=new Map(),audit=[],unit=new T.BoxGeometry(1,1,1).toNonIndexed();
 const wood=siteMaterial(0xaa8157),freshWood=siteMaterial(0xc7a375),concrete=siteMaterial(0xa9a69b),metal=siteMaterial(0x464749),orange=siteMaterial(0xdd6a2f),grass=siteMaterial(0x737047),dark=siteMaterial(0x39362e);
 const materials=[wood,freshWood,concrete,metal,orange,grass,dark];
 materials.forEach((m,i)=>{m.name=['Weathered pallet timber','Sawn construction lumber','Concrete block faces','Binding straps','Survey orange','Dry lot-edge grass','Grounded contact'][i];});
 const ground=(x,z)=>view.surfaceGround?.(x,z)??terrainHeight(x,z);
 function pathDistance(x,z){let best=Infinity;for(let i=1;i<FOOTPATH.length;i++){const a=FOOTPATH[i-1],b=FOOTPATH[i],dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((x-a.x)*dx+(z-a.z)*dz)/(dx*dx+dz*dz)));best=Math.min(best,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));}return best;}
 function permitted(x,z,r=0){return roadDistance(x,z)>2.3+r&&pathDistance(x,z)>2.4+r&&ENTRANCE_HOUSES.every(h=>Math.hypot(x-h.x,z-h.z)>20+r);}
 function addGeometry(g,mat){const a=batches.get(mat)??[];a.push(g);batches.set(mat,a);}
 function box(c,mat,x,y,z,w,h,d,angle=0){const p=new T.Vector3(c.x+x*Math.cos(c.a)+z*Math.sin(c.a),c.y+y,c.z-x*Math.sin(c.a)+z*Math.cos(c.a));const g=unit.clone();g.applyMatrix4(new T.Matrix4().compose(p,new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),c.a+angle),new T.Vector3(w,h,d)));addGeometry(g,mat);}
 function anchor(s,side,setback=10){const p=sample(s),a=heading(s),x=p.x-Math.sin(a)*side*setback,z=p.z+Math.cos(a)*side*setback;return{x,y:ground(x,z),z,a:-a+Math.PI/2};}
 function fit(c,w,d){const heights=[];for(const x of [-w/2,w/2])for(const z of [-d/2,d/2])heights.push(ground(c.x+x*Math.cos(c.a)+z*Math.sin(c.a),c.z-x*Math.sin(c.a)+z*Math.cos(c.a)));const support=[];for(const x of [-.62,.62])for(const z of [-.57,2.85])support.push(ground(c.x+x*Math.cos(c.a)+z*Math.sin(c.a),c.z-x*Math.sin(c.a)+z*Math.cos(c.a)));c.y=Math.max(...support);return Math.max(...heights)-Math.min(...heights)<.65;}
 function pallet(c,y=0){
  for(const x of [-.48,0,.48]){const wx=c.x+x*Math.cos(c.a),wz=c.z-x*Math.sin(c.a),bottom=Math.min(...[-.55,.55].map(z=>ground(wx+z*Math.sin(c.a),wz+z*Math.cos(c.a))))-c.y,top=y+.18;box(c,wood,x,(bottom+top)/2,0,.09,Math.max(.06,top-bottom),1.1);}
  for(let i=0;i<7;i++)box(c,wood,0,y+.205,-.48+i*.16,1.2,.045,.115);
  for(const z of [-.44,.44])box(c,wood,0,y+.025,z,1.2,.05,.13);
 }
 function lumber(c){
  pallet(c);pallet({...c,x:c.x+Math.sin(c.a)*2.1,z:c.z+Math.cos(c.a)*2.1});
  for(let row=0;row<6;row++)for(let col=0;col<5;col++)box(c,row%2?wood:freshWood,(col-2)*.215,.27+row*.085,1.05+(col%2)*.045,.19,.072,3.6);
  for(const z of [-.18,2.24]){box(c,metal,0,.70,z,1.15,.018,.035);for(const x of [-.56,.56])box(c,metal,x,.48,z,.018,.48,.035);}
 }
 function hollowBlock(c,x,y,z){
  // Two genuine open cells, not painted black squares on a solid box.
  for(const dx of [-.185,.185])box(c,concrete,x+dx,y+.10,z,.045,.20,.39);
  for(const dz of [-.17,0,.17])box(c,concrete,x,y+.10,z+dz,.36,.20,.045);
 }
 function blocks(c){const level=[];for(const x of [-.62,.62])for(const z of [-.57,.57])level.push(ground(c.x+x*Math.cos(c.a)+z*Math.sin(c.a),c.z-x*Math.sin(c.a)+z*Math.cos(c.a)));c.y=Math.max(...level);pallet(c);for(let y=0;y<3;y++)for(let x=0;x<3;x++)for(let z=0;z<2;z++)hollowBlock(c,(x-1)*.405,.235+y*.207,(z-.5)*.41);const spare={...c,x:c.x+Math.cos(c.a)*1.65,z:c.z-Math.sin(c.a)*1.65};spare.y=ground(spare.x,spare.z);pallet(spare);}
 function stake(c,x,z,flag=true){const wx=c.x+x*Math.cos(c.a)+z*Math.sin(c.a),wz=c.z-x*Math.sin(c.a)+z*Math.cos(c.a),y=ground(wx,wz)-c.y;box(c,wood,x,y+.40,z,.045,.8,.045);if(flag){box(c,orange,x+.07,y+.73,z,.18,.11,.009);box(c,orange,x+.16,y+.66,z+.025,.035,.16,.012,.25);}}
 function fence(c){
  for(const x of [-2,0,2]){const wx=c.x+x*Math.cos(c.a)-2*Math.sin(c.a),wz=c.z-x*Math.sin(c.a)-2*Math.cos(c.a),bottom=ground(wx,wz)-c.y;box(c,metal,x,(bottom+1.14)/2,-2,.035,1.14-bottom,.035);box(c,orange,x,1.15,-2,.07,.025,.07);}
  // Open safety mesh; ten-centimetre high gaps read from the chase camera.
  for(let y=0;y<7;y++)box(c,orange,0,.24+y*.12,-2,4,.019,.012);
  for(let x=-2;x<=2;x+=.22)box(c,orange,x,.60,-2,.014,.78,.012);
 }
 function grassPatch(c,seed){
  const positions=[],normals=[];
  for(let i=0;i<36;i++){const u=Math.sin((i+1)*19.73+seed*3.6)*43758.5453,v=Math.sin((i+1)*57.19+seed)*14387.281,f=u-Math.floor(u),q=v-Math.floor(v),x=c.x+(f-.5)*7,z=c.z+(q-.5)*4;
   if(!permitted(x,z,.1))continue;const y=ground(x,z)+.012,h=.12+f*.21,w=.025+q*.025,a=i*2.399,dx=Math.cos(a)*w,dz=Math.sin(a)*w;
   positions.push(x-dx,y,z-dz,x+dx,y,z+dz,x+Math.sin(a)*.08,y+h,z+Math.cos(a)*.08);const n=new T.Vector3(-dz,0,dx).normalize();for(let k=0;k<3;k++)normals.push(n.x,n.y,n.z);
  }
  if(positions.length){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));addGeometry(g,grass);}
 }
 const specs=[{s:12,side:1,type:'lumber',setback:20},{s:30,side:1,type:'blocks',setback:10.8},{s:63,side:-1,type:'blocks',setback:11.4},{s:96,side:1,type:'lumber',setback:10.6},{s:138,side:-1,type:'lumber',setback:11.8},{s:185,side:1,type:'blocks',setback:11.2},{s:350,side:-1,type:'blocks',setback:11.5},{s:425,side:1,type:'lumber',setback:11.2},{s:490,side:-1,type:'blocks',setback:11.5}];
 for(let i=0;i<specs.length;i++){
  const spec=specs[i];let c=null,actualSetback=spec.setback;
  for(const extra of [0,2,4,6]){const trial=anchor(spec.s,spec.side,spec.setback+extra);if(permitted(trial.x,trial.z,3.2)&&fit(trial,5.3,5.8)){c=trial;actualSetback+=extra;break;}}
  if(!c)continue;
  if(spec.type==='lumber')lumber(c);else blocks(c);
  if(i%2===0)fence(c);
  for(const [x,z]of [[-2.7,-2.5],[2.7,-2.5],[-2.7,3.3],[2.7,3.3]])stake(c,x,z);
  grassPatch({...c,x:c.x+Math.cos(c.a)*3.2,z:c.z-Math.sin(c.a)*3.2},i);
  audit.push({...spec,setback:actualSetback,x:c.x,z:c.z,roadClearance:roadDistance(c.x,c.z)-3.2,pathClearance:pathDistance(c.x,c.z)-3.2});
 }
 // Survey markers between staging areas establish lot rhythm without clutter.
 for(let s=7;s<225;s+=24)for(const side of [-1,1]){const c=anchor(s,side,8.1);if(!permitted(c.x,c.z,.2))continue;stake(c,0,0);stake(c,0,5,false);}
 let triangles=0;
 for(const [material,parts]of batches){
  const g=new T.BufferGeometry();for(const attr of ['position','normal']){const arrays=parts.map(p=>p.attributes[attr].array),len=arrays.reduce((n,a)=>n+a.length,0),data=new Float32Array(len);let off=0;for(const a of arrays){data.set(a,off);off+=a.length;}g.setAttribute(attr,new T.BufferAttribute(data,3));}
  g.computeBoundingSphere();triangles+=g.attributes.position.count/3;const mesh=new T.Mesh(g,material);mesh.name=material.name;mesh.userData.memoryCaster=true;root.add(mesh);parts.forEach(p=>p.dispose());
 }
 unit.dispose();view.scene.add(root);view.consoleWorldLook?.refresh();
 view.consoleSiteDetails={root,clusters:audit,drawCalls:root.children.length,triangles};return view.consoleSiteDetails;
}
