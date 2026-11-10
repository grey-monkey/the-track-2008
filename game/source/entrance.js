import {facadePart,houseWall,roofDetail,windowMaterial158} from './house-detail.js';
import * as T from './vendor/three.module.js';
import {paintedMaterial} from './pigment.js';
import {ENTRANCE_HOUSES,aerialPoint,height,terrainHeight} from './world.js';

// Metres. Footprint placement follows the aerial trace; elevations are reconstructed.
// Static architecture is batched by material, keeping the phone's draw cost bounded.
export function buildEntrance(view){
 view.foundationAudit=[];view.architectureShadowVolumes=[];view.houseArt158={windows:0,garageDoors:0,roofVolumes:0};
 const root=new T.Group();root.name='Entrance study';view.scene.add(root);
 let currentHouse=-1;view.hallway={light:{value:0},points:[]};view.houseOccluders=[];
 const palette={brick:0xa19384,stone:0xb2a798,trim:0x9e968c,glass:0x344c59,dark:0x454b4d,door:0x554638,concrete:0xaaa096,recess:0x82857f,soil:0x766457,grass:0x8b815c};
 // Paint is anchored in the world; its marks do not crawl as the camera moves.
 const memoryAir={value:new T.Color('#929399')};view.memoryAir=memoryAir;
 const material=c=>paintedMaterial(c,{architecture:true});
 const masonry=mat=>mat;
 const mats=Object.fromEntries(Object.entries(palette).map(([k,c])=>[k,material(c)]));
 mats.concrete=paintedMaterial(palette.concrete,{architecture:true,concrete:true});
 const foliage=[0x424f46,0x485247,0x3d4a43].map(material); const batches=new Map();
 function mesh(parent,geometry,mat,x=0,y=0,z=0){
  const p=geometry.attributes.position,n=geometry.attributes.normal,uv=[];
  for(let i=0;i<p.count;i++){
   const nx=Math.abs(n.getX(i)),ny=Math.abs(n.getY(i)),nz=Math.abs(n.getZ(i));
   const u=nx>nz?p.getZ(i)+z:p.getX(i)+x;
   const v=ny>.25?(nx>nz?p.getX(i)+x:p.getZ(i)+z)/Math.max(.25,ny):p.getY(i)+y;
   uv.push(u,v);
  }
  geometry.setAttribute('architectureUV160',new T.Float32BufferAttribute(uv,2));
  const m=new T.Mesh(geometry,mat);m.position.set(x,y,z);parent.add(m);return m;}
 function box(parent,w,h,d,mat,x=0,y=0,z=0){return mesh(parent,new T.BoxGeometry(w,h,d),mat,x,y,z);}
 function shadowVolume(parent,w,h,d,x,y,z,type=0,ridge=0){parent.updateWorldMatrix(true,false);const matrix=parent.matrixWorld.clone().multiply(new T.Matrix4().makeTranslation(x,y,z));view.architectureShadowVolumes.push({matrix,lo:new T.Vector3(-w/2,-h/2,-d/2),hi:new T.Vector3(w/2,h/2,d/2),type,ridge});}
 function roof(parent,w,d,rise,y,x,z,mat,hip=false){
  const ridge=hip?Math.max(.4,w/2-d*.42):w/2;
  shadowVolume(parent,w,rise,d,x,y+rise/2,z,hip?6:5,ridge);view.houseArt158.roofVolumes++;
  const v=[[-w/2,0,-d/2],[w/2,0,-d/2],[w/2,0,d/2],[-w/2,0,d/2],[-ridge,rise,0],[ridge,rise,0]];
  const ids=[0,4,5,0,5,1,1,5,2,2,5,4,2,4,3,3,4,0];
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(ids.flatMap(i=>v[i]),3));geo.computeVertexNormals();
  mesh(parent,geo,mat,x,y,z);box(parent,w,.12,d,mats.dark,x,y-.045,z);box(parent,w+.035,.11,d+.035,mats.trim,x,y-.13,z);
  // A narrow ridge cap and dark soffit establish the roof's thickness.
  box(parent,Math.max(.3,ridge*2),.075,.19,mat,x,y+rise+.025,z);
 }
 function frontGable(parent,w,d,rise,y,x,z,roofMat,wallMat){
  const wing=new T.Group();wing.position.set(x,0,z);wing.rotation.y=Math.PI/2;parent.add(wing);
  roof(wing,d,w,rise,y,0,0,roofMat);
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute([-w/2,0,0,w/2,0,0,0,rise,0],3));geo.computeVertexNormals();
  const face=mesh(parent,geo,wallMat,x,y,z+d/2+.035);face.material.side=T.DoubleSide;
  // Slender rake boards make the roof thickness legible, without toy-like trim.
  for(const s of [-1,1]){const beam=box(parent,Math.hypot(w/2,rise),.12,.15,mats.trim,x+s*w/4,y+rise/2,z+d/2+.03);beam.rotation.z=-s*Math.atan2(rise,w/2);}
 }
 function window(parent,x,y,z,w=1.05,h=1.65,lit=false){
  let windowMats=mats;if(currentHouse===0&&y>3.8&&y<6.2){windowMats={...mats,glass:hallGlass};root.updateMatrixWorld(true);view.hallway.points.push(parent.localToWorld(new T.Vector3(x,y,z+.075)));}
  const glass=windowMaterial158(windowMats.glass),pane=new T.PlaneGeometry(w,h);
  pane.setAttribute('paneUV',pane.attributes.uv.clone());
  box(parent,w+.18,h+.18,.045,mats.dark,x,y,z+.018);
  mesh(parent,pane,glass,x,y,z+.048);
  // Recessed glass behind substantial jambs; six divided lights at human scale.
  for(const side of [-1,1])box(parent,.075,h+.18,.16,mats.trim,x+side*(w/2+.045),y,z+.105);
  for(const side of [-1,1])box(parent,w+.25,.075,.16,mats.trim,x,y+side*(h/2+.045),z+.105);
  box(parent,.034,h,.052,mats.trim,x,y,z+.105);
  for(const dy of [-h/6,h/6])box(parent,w,.03,.048,mats.trim,x,y+dy,z+.105);
  box(parent,w+.30,.085,.24,mats.stone,x,y-h/2-.10,z+.12);
  box(parent,w+.25,.045,.19,mats.dark,x,y+h/2+.065,z+.075);
  view.houseArt158.windows++;

 }
 const hallGlass=material(palette.glass),compileHall=hallGlass.onBeforeCompile;hallGlass.customProgramCacheKey=()=> 'indirect-hallway66';hallGlass.onBeforeCompile=shader=>{compileHall(shader);shader.uniforms.hallwayLight=view.hallway.light;shader.fragmentShader='uniform float hallwayLight;'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`float hallWall=.58+.24*sin(pw.x*.31+pw.z*.27)+.13*cos(pw.y*1.8);float hallCeiling=smoothstep(${(height(ENTRANCE_HOUSES[0].x,ENTRANCE_HOUSES[0].z)+4.5).toFixed(3)},${(height(ENTRANCE_HOUSES[0].x,ENTRANCE_HOUSES[0].z)+5.9).toFixed(3)},pw.y);outgoingLight+=vec3(.21,.115,.047)*hallwayLight*hallWall*(.50+.50*hallCeiling);\n#include <opaque_fragment>`);};
 const warm=new T.MeshStandardMaterial({color:0xc2a477,emissive:0xdca564,emissiveIntensity:.28,roughness:1});
 const houseStyles=[
  {w:13.8,d:12.6,eave:6.35,rise:3.9,garageX:5.5,garageZ:6.1,brick:0xa4a097},
  {w:14.2,d:12.2,eave:6.15,rise:3.6,garageX:4.8,garageZ:5.8,brick:0xa69887},
  {w:15.1,d:13.1,eave:6.5,rise:4.1,garageX:5.6,garageZ:6.2,brick:0x9c8876}
 ];
 ENTRANCE_HOUSES.forEach((h,i)=>{currentHouse=i;
  const s=houseStyles[i],g=new T.Group();g.position.set(h.x,height(h.x,h.z)+.32,h.z);g.rotation.y=h.rotation;root.add(g);
  const wall=houseWall([0xa48a77,0x9e8271,0x997f6b][i],g.position.y,[0xb4aca0,0xb0a694,0xa9a294][i],s.eave),rm=roofDetail(paintedMaterial([0x444a5d,0x50505b,0x5d5351][i],{roof:true,architecture:true}));
  const toWorld=(x,z)=>({x:h.x+x*Math.cos(h.rotation)+z*Math.sin(h.rotation),z:h.z-x*Math.sin(h.rotation)+z*Math.cos(h.rotation)});
  // Each mass has a continuous concrete plinth sunk below the lowest sampled grade.
  // The footprint is unchanged; modest skirt exposure replaces floating corners.
  const foundation=(w,d,x,z,label,top=.025)=>{
   let bottom=-.35;
   for(let ix=0;ix<=Math.ceil(w/.5);ix++)for(let iz=0;iz<=Math.ceil(d/.5);iz++){
    const q=toWorld(x-w/2+w*ix/Math.ceil(w/.5),z-d/2+d*iz/Math.ceil(d/.5));
    bottom=Math.min(bottom,terrainHeight(q.x,q.z)-g.position.y-.20,height(q.x,q.z)-g.position.y-.20);
   }
   const m=box(g,w+.025,top-bottom,d+.025,mats.concrete,x,(top+bottom)/2,z);m.name='Concrete foundation '+i+' '+label;
   view.foundationAudit.push({house:i,label,x,z,w,d,bottom:bottom+g.position.y,top:top+g.position.y,houseX:h.x,houseZ:h.z,rotation:h.rotation});
  };
  foundation(s.w,s.d,0,0,'main',-.01);
  foundation(6.5,7.5,s.garageX,s.garageZ,'garage');
  foundation(4.5,1.1,-s.w*.29,s.d/2+.35,'front bay');
  foundation(2.7,1.8,.2,s.d/2+(i===2?.75:0)+.75,'porch',-.075);
  // Main two-storey mass and lower projecting two-car garage: ~2.7 m door bays.
  box(g,s.w,.48,s.d,mats.stone,0,-.08,0);box(g,s.w,s.eave,s.d,wall,0,s.eave/2,0);shadowVolume(g,s.w,s.eave,s.d,0,s.eave/2,0);
  roof(g,s.w+.6,s.d+.6,s.rise,s.eave,0,0,rm,true);
  box(g,6.5,3.05,7.5,wall,s.garageX,1.525,s.garageZ);shadowVolume(g,6.5,3.05,7.5,s.garageX,1.525,s.garageZ);
  frontGable(g,6.95,8.05,2.75,3.05,s.garageX,s.garageZ,rm,wall);
  // An offset front gable and recessed entrance break up the broad facade.
  const bayX=-s.w*.29,front=s.d/2;
  box(g,4.5,s.eave,1.1,wall,bayX,s.eave/2,front+.35);shadowVolume(g,4.5,s.eave,1.1,bayX,s.eave/2,front+.35);
  frontGable(g,4.95,5.7,2.65,s.eave,bayX,front-1.75,rm,wall);
  window(g,bayX,s.eave+.8,front+1.12,.55,.82);
  if(i===2){
   box(g,2.9,5.95,.72,mats.stone,.7,2.975,front+.27);
   frontGable(g,3.3,3.6,1.9,5.95,.7,front-1.15,rm,mats.stone);
  }
  if(i===1){
   const dormer=new T.Group();dormer.position.set(3.2,s.eave+2.1,1.2);g.add(dormer);
   box(dormer,1.65,1.5,2.4,mats.trim,0,.65,0);frontGable(dormer,1.95,2.6,.9,1.4,0,0,rm,mats.trim);window(dormer,0,.65,1.24,.8,1.05);
  }
  for(const x of [bayX-1,bayX+1]){window(g,x,1.75,front+.92,.85,1.65);window(g,x,4.85,front+.92,.85,1.55,false);}
  const entryFront=front+(i===2?.75:0); window(g,.4,4.8,entryFront+.09,1.15,1.6);
  for(const x of [bayX-1.66,bayX+1.66])for(const y of [1.75,4.85])if(i!==1)box(g,.34,1.67,.1,mats.dark,x,y,front+1.04);
  // Recessed porch, human-scale 0.95 x 2.2 m door, and three shallow risers.
  box(g,2.4,2.9,.1,mats.dark,.2,1.45,entryFront+.12);facadePart(g,'door',.2,1.1,entryFront+.22,.95,2.2,mats);
  window(g,.2,1.52,entryFront+.29,.52,.78,i===0);
  box(g,2.7,.2,1.8,mats.stone,.2,.02,entryFront+.75);
  for(const x of [-1,1.4])box(g,.24,2.85,.24,mats.trim,x,1.42,entryFront+1.4);
  roof(g,3.05,2.25,.6,2.94,.2,entryFront+.7,rm,true);
  for(let k=0;k<3;k++)box(g,2.3,.12,1.65-k*.35,mats.stone,.2,-.22+k*.11,entryFront+1.25);
  const gz=s.garageZ+3.75;
  for(const x of [s.garageX-1.5,s.garageX+1.5]){
   box(g,2.8,2.42,.055,mats.dark,x,1.2,gz+.04);
   box(g,2.70,2.32,.035,mats.trim,x,1.2,gz+.085);
   for(const side of [-1,1])box(g,.11,2.52,.18,mats.stone,x+side*1.445,1.22,gz+.14);
   box(g,3.0,.14,.20,mats.stone,x,2.48,gz+.14);view.houseArt158.garageDoors++;
   // The lintel shadow and threshold give the closed door a real opening.
   box(g,2.78,.045,.07,mats.dark,x,2.38,gz+.12);
   box(g,2.8,.055,.09,mats.dark,x,.025,gz+.11);
   for(let row=0;row<4;row++)for(let col=0;col<4;col++){
    const px=x+(col-1.5)*.62,py=.32+row*.54;
    box(g,.55,.42,.018,mats.recess,px,py,gz+.156);
    box(g,.49,.36,.025,mats.concrete,px,py,gz+.17);
   }
   box(g,.20,.025,.055,mats.dark,x,1.05,gz+.205);
  }
  const ventZ=gz+.3,ventY=4.03;
  box(g,.64,.70,.045,mats.dark,s.garageX,ventY,ventZ);
  for(const side of [-1,1]){box(g,.065,.80,.09,mats.trim,s.garageX+side*.35,ventY,ventZ+.05);box(g,.76,.065,.09,mats.trim,s.garageX,ventY+side*.38,ventZ+.05);}
  for(let l=0;l<6;l++)box(g,.61,.035,.085,mats.trim,s.garageX,ventY-.28+l*.11,ventZ+.04);
  for(const x of [-1,1.4]){box(g,.34,.16,.34,mats.stone,x,.13,entryFront+1.4);box(g,.32,.13,.32,mats.trim,x,2.77,entryFront+1.4);}
  // Side and rear openings prevent flat uninhabitable-looking walls in aerial views.
  for(const side of [-1,1]){const face=new T.Group();face.position.set(side*(s.w/2+.04),0,0);face.rotation.y=side*Math.PI/2;g.add(face);for(const z of [-3,1.5])for(const y of [1.75,4.8])window(face,z,y,0,1,1.6);}
  const rear=new T.Group();rear.position.z=-s.d/2-.05;rear.rotation.y=Math.PI;g.add(rear);for(const x of [-4,0,4])for(const y of [1.75,4.8])window(rear,x,y,0,1.1,1.6);
  box(g,.9,2.1,1.25,mats.stone,-s.w*.35,s.eave+s.rise*.54,-2.5);box(g,1.05,.14,1.4,mats.trim,-s.w*.35,s.eave+s.rise*.54+1.1,-2.5);
  // Eave gutters, corner boards and downpipes give the envelope real thickness.
  for(const side of [-1,1]){
   box(g,s.w+.70,.12,.14,mats.trim,0,s.eave-.03,side*(s.d/2+.25));
   for(const x of [-s.w/2+.09,s.w/2-.09]){
    box(g,.15,s.eave,.15,mats.trim,x,s.eave/2,side*(s.d/2+.055));
    const pipe=mesh(g,new T.CylinderGeometry(.045,.045,s.eave-.20,8),mats.trim,x+(x<0?.20:-.20),s.eave/2,side*(s.d/2+.17));
    box(g,.22,.065,.12,mats.trim,pipe.position.x,.18,pipe.position.z+side*.05);
   }
  }
  // Unpaved lots: exposed earth continues from the road to each garage.
  // Exposed construction soil continues up to the foundations; no rectangular turf patches.
  // Closed architecture shares one painted material system across fronts, sides and roofs.
 });
 // Street View: pale capped piers and low curved stone-infill wings. Gates are open.
 const gate=new T.Group(),p=aerialPoint(852,155);gate.position.set(p.x,height(p.x,p.z),p.z);gate.rotation.y=1.15;root.add(gate);
 for(const side of [-1,1]){
  const x=side*5.1;box(gate,.83,2.3,.83,mats.trim,x,1.15,0);box(gate,1.03,.18,1.03,mats.trim,x,2.34,0);
  box(gate,.21,.38,.16,mats.dark,x,1.58,.49);box(gate,.12,.24,.18,warm,x,1.58,.51);
  for(let j=0;j<7;j++){const wx=side*(5.65+j*1.35),z=-.045*j*j,wh=1.5-j*.055;
   box(gate,1.4,wh,.36,mats.trim,wx,wh/2,z);box(gate,1.3,.55,.39,mats.stone,wx,.65,z);box(gate,1.44,.1,.46,mats.trim,wx,wh+.02,z);
  }
  const leaf=new T.Group();leaf.position.set(x,0,0);leaf.rotation.y=-side*1.43;gate.add(leaf);
  for(let j=0;j<17;j++)box(leaf,.035,1.62,.035,mats.dark,-side*j*.24,.98,0);
  for(const y of [.35,1.6])box(leaf,3.85,.045,.045,mats.dark,-side*1.92,y,0);
 }
 view.entranceGate=gate;gate.removeFromParent();view.scene.add(gate);
 // Merge transformed vertices by material: architecture does not cost a draw per window.
 root.updateMatrixWorld(true);const originals=[];
 root.traverse(o=>{if(!o.isMesh)return;const geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();geo.applyMatrix4(o.matrixWorld);const normals=geo.attributes.normal,colors=[];for(let i=0;i<normals.count;i++){const value=.83+.17*Math.max(0,normals.getY(i));colors.push(value,value,value);}geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));o.material.vertexColors=true;const list=batches.get(o.material)??[];list.push(geo);batches.set(o.material,list);originals.push(o);});
 for(const o of originals){o.removeFromParent();o.geometry.dispose();}
 for(const [mat,geos]of batches){const g=new T.BufferGeometry();for(const attr of ['position','normal','color','paneUV','architectureUV160']){if(!geos.some(g=>g.attributes[attr]))continue;const size=(attr==='paneUV'||attr==='architectureUV160')?2:3,data=new Float32Array(geos.reduce((n,g)=>n+g.attributes.position.count*size,0));let offset=0;for(const geo of geos){if(geo.attributes[attr])data.set(geo.attributes[attr].array,offset);offset+=geo.attributes.position.count*size;}g.setAttribute(attr,new T.BufferAttribute(data,size));}geos.forEach(g=>g.dispose());g.computeBoundingSphere();const batch=new T.Mesh(g,mat);batch.name='Entrance architecture 158';view.scene.add(batch);view.houseOccluders.push(batch);}
 view.houseArt158.batches=view.houseOccluders.length;

 // Soft contact shade grounds the buildings without expensive real-time shadow maps.
 const canvas=document.createElement('canvas');canvas.width=64;canvas.height=64;const ctx=canvas.getContext('2d'),fade=ctx.createRadialGradient(32,32,10,32,32,32);fade.addColorStop(0,'rgba(21,30,37,.35)');fade.addColorStop(.7,'rgba(21,30,37,.21)');fade.addColorStop(1,'rgba(21,30,37,0)');ctx.fillStyle=fade;ctx.fillRect(0,0,64,64);
 const tex=new T.CanvasTexture(canvas),shadow=new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,color:0xffffff});
 for(const h of ENTRANCE_HOUSES){const m=new T.Mesh(new T.PlaneGeometry(27,27),shadow);m.rotation.set(-Math.PI/2,0,-h.rotation);m.position.set(h.x,height(h.x,h.z)+.018,h.z);view.scene.add(m);}
}



