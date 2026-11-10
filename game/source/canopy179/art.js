import {REVEAL_SECONDS} from './route.mjs';
import {installIslandContact} from './contact.mjs';
import * as T from '../vendor/three.module.js';
import {CANOPY,TRIGGER,ENTRY,ISLAND,entryPoint,tunnelFloor,entryLocal,islandFloor,canopyWalls} from './layout.mjs';
import {eveningUniforms} from '../evening-light.js';
import {memoryLight} from '../memory-light.js';
import {height} from '../world.js';
import {HazardWorld} from '../hazards.js';
import {installRoadShadows} from '../road-shadows.js';
import {siteMaterial} from '../barriers90.js';
const smooth=(a,b,x)=>T.MathUtils.smoothstep(x,a,b);
function grainMap(kind){
 const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');let seed=177;
 const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)|0)>>>0)/4294967296;
 g.fillStyle=kind==='wood'?'#a39070':'#a3a4a0';g.fillRect(0,0,256,256);
 for(let i=0;i<3500;i++){const v=random(),x=random()*256,y=random()*256;g.fillStyle=`rgba(${v>.5?'240,235,213':'45,44,42'},${random()*.09})`;g.fillRect(x,y,kind==='wood'?20+random()*70:1+random()*2,kind==='wood'?.4:1+random()*2);}
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;
}
const material=(color,map)=>new T.MeshLambertMaterial({color,map,side:T.DoubleSide});
function mesh(root,geo,mat,x=0,y=0,z=0){const m=new T.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;root.add(m);return m;}
function box(root,w,h,d,mat,x=0,y=0,z=0){return mesh(root,new T.BoxGeometry(w,h,d),mat,x,y,z);}
function tube(root,points,r,mat){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));return mesh(root,new T.TubeGeometry(curve,Math.max(2,points.length*4),r,5,false),mat);}
function rod(root,a,b,r,mat){const va=new T.Vector3(...a),vb=new T.Vector3(...b),m=mesh(root,new T.CylinderGeometry(r,r,va.distanceTo(vb),6),mat);m.position.copy(va).add(vb).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),vb.sub(va).normalize());return m;}
function shadow(root,x,z,r,opacity=.32){const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),grad=g.createRadialGradient(32,32,2,32,32,32);grad.addColorStop(0,`rgba(0,0,0,${opacity})`);grad.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=grad;g.fillRect(0,0,64,64);const m=mesh(root,new T.PlaneGeometry(r*2,r*2),new T.MeshBasicMaterial({map:new T.CanvasTexture(c),transparent:true,depthWrite:false}),x,.009,z);m.rotation.x=-Math.PI/2;m.castShadow=false;return m;}
export function makeCanopy(){
 const scene=new T.Scene();scene.background=new T.Color(0x000103);scene.fog=new T.Fog(0x000103,9,24);
 const root=new T.Group();root.name='The Canopy â€” moonlit concrete and bistro';root.position.set(CANOPY.x,0,CANOPY.z);scene.add(root);
 const floorMap=grainMap('concrete');floorMap.wrapS=floorMap.wrapT=T.RepeatWrapping;floorMap.repeat.set(6,6);
 const concrete=material(0x858a8d,floorMap),metal=material(0x69747d),rim=material(0x88939c),fabric=material(0x676d70),dark=material(0x262d33);
 mesh(root,new T.CylinderGeometry(CANOPY.radius,CANOPY.radius,.12,96),concrete,0,-.06,0);box(root,3.4,.12,5,concrete,0,-.06,11.5);
 const joint=new T.MeshBasicMaterial({color:0x252c32});
 for(let i=-9;i<=9;i+=3){const span=2*Math.sqrt(CANOPY.radius**2-i*i);box(root,.018,.002,span,joint,i,.003,0);box(root,span,.002,.018,joint,0,.003,i);}
 // Table: slender metal rim, radial meshwork, folding cross braces and pole hole.
 const table=new T.Group();table.name='Round metal bistro table';root.add(table);
 mesh(table,new T.CylinderGeometry(.56,.55,.035,40),metal,0,.76,0);
 for(const rad of [.15,.30,.44,.56]){const t=mesh(table,new T.TorusGeometry(rad,.008,5,40),rim,0,.782,0);t.rotation.x=Math.PI/2;}
 for(let i=0;i<24;i++){const a=i*Math.PI/12;rod(table,[Math.cos(a)*.07,.786,Math.sin(a)*.07],[Math.cos(a)*.54,.786,Math.sin(a)*.54],.0045,dark);}
 for(const sign of [-1,1]){rod(table,[-.37,.035,.29*sign],[.36,.74,.29*sign],.014,metal);rod(table,[.37,.035,.29*sign],[-.36,.74,.29*sign],.014,metal);}
 shadow(root,0,0,.85,.5);
 for(let i=0;i<4;i++){
  const a=i*Math.PI/2,c=new T.Group();c.name='Metal bistro chair '+(i+1);c.position.set(Math.cos(a)*1.28,0,Math.sin(a)*1.28);c.rotation.y=-a-Math.PI/2;root.add(c);
  mesh(c,new T.CylinderGeometry(.25,.25,.025,24),metal,0,.43,0);
  for(let k=-3;k<=3;k++){const x=k*.055,l=Math.sqrt(Math.max(0,.24*.24-x*x));rod(c,[x,.446,-l],[x,.446,l],.005,dark);}
  for(const side of [-1,1]){
   tube(c,[[side*.26,.02,-.25],[side*.20,.43,-.17],[side*.21,.75,-.19],[side*.20,.91,-.14]],.013,metal);
   rod(c,[side*.25,.02,.24],[side*.20,.43,.16],.013,metal);
   rod(c,[side*.20,.21,-.21],[side*.20,.21,.21],.008,dark);
  }
  tube(c,[[-.20,.91,-.14],[-.13,.97,-.13],[.13,.97,-.13],[.20,.91,-.14]],.014,rim);
  for(const yy of [.65,.74,.83])tube(c,[[-.20,yy,-.19],[0,yy+.025,-.22],[.20,yy,-.19]],.012,metal);
  shadow(root,c.position.x,c.position.z,.48,.4);
 }
 // Eight fabric gores, a scalloped valance, and visible umbrella ribs.
 const umbrella=new T.Group();umbrella.name='Retractable patio umbrella';root.add(umbrella);
 rod(umbrella,[0,0,0],[0,2.43,0],.022,rim);mesh(umbrella,new T.CylinderGeometry(.17,.20,.055,24),dark,0,.035,0);
 for(let i=0;i<8;i++){
  const a=i*Math.PI/4,b=(i+1)*Math.PI/4,positions=[];
  const point=(angle,r,y)=>[Math.cos(angle)*r,y,Math.sin(angle)*r];
  const v0=[0,2.43,0],v1=point(a,.60,2.30),v2=point(b,.60,2.30),v3=point(a,1.32,2.08),v4=point(b,1.32,2.08),v5=point((a+b)/2,1.33,2.04);
  for(const tri of [[v0,v1,v2],[v1,v3,v5],[v1,v5,v2],[v2,v5,v4]])positions.push(...tri.flat());
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.computeVertexNormals();const m=mesh(umbrella,g,i%2?fabric:material(0x727778));m.castShadow=true;
  tube(umbrella,[[0,2.39,0],point(a,.60,2.27),point(a,1.32,2.055)],.008,dark);
  tube(umbrella,[v3,point((a+b)/2,1.33,1.96),v4],.009,fabric);
  rod(umbrella,[0,1.83,0],point(a,.65,2.24),.007,metal);
 }
 box(umbrella,.07,.12,.05,dark,.03,1.24,0);rod(umbrella,[.05,1.24,0],[.12,1.24,0],.008,rim);rod(umbrella,[.12,1.24,0],[.12,1.18,0],.008,rim);
 const cd=new T.Group();cd.name='Secret Mixtape CD';cd.position.set(.26,.98,.12);root.add(cd);
 mesh(cd,new T.RingGeometry(.018,.135,40),new T.MeshPhongMaterial({color:0xb9c3ca,specular:0xe6e9ef,shininess:70,side:T.DoubleSide}));
 const labelCanvas=document.createElement('canvas');labelCanvas.width=256;labelCanvas.height=256;const ctx=labelCanvas.getContext('2d');ctx.fillStyle='#b5ac8c';ctx.beginPath();ctx.arc(128,128,118,0,7);ctx.fill();ctx.fillStyle='#34322f';ctx.textAlign='center';ctx.font='25px TrackMarker, sans-serif';ctx.fillText('SECRET',128,85);ctx.fillText('MIXTAPE',128,184);const tex=new T.CanvasTexture(labelCanvas);tex.colorSpace=T.SRGBColorSpace;mesh(cd,new T.RingGeometry(.025,.125,40),new T.MeshLambertMaterial({map:tex,transparent:true,side:T.DoubleSide}),0,0,.001);
 // Low circular wall defines a skateable room; the only break is the return passage.
 const wallMaterial=material(0x777e83,grainMap('concrete')),cap=material(0x919699);
 for(const o of canopyWalls()){const wall=box(root,o.hx*2,o.top,o.hz*2,wallMaterial,o.x-600,o.top/2,o.z-600);wall.rotation.y=-o.yaw;const top=box(root,o.hx*2+.012,.035,o.hz*2+.035,cap,o.x-600,o.top+.015,o.z-600);top.rotation.y=-o.yaw;}
 const lightCanvas=document.createElement('canvas');lightCanvas.width=lightCanvas.height=128;const lg=lightCanvas.getContext('2d'),gradient=lg.createRadialGradient(64,64,2,64,64,64);gradient.addColorStop(0,'rgba(229,174,94,.26)');gradient.addColorStop(.45,'rgba(211,154,78,.12)');gradient.addColorStop(1,'rgba(194,132,59,0)');lg.fillStyle=gradient;lg.fillRect(0,0,128,128);const glowMap=new T.CanvasTexture(lightCanvas);
 function pathLamp(a,r=10.62){
  const x=Math.cos(a)*r,z=Math.sin(a)*r,g=new T.Group();g.position.set(x,0,z);g.rotation.y=-a+Math.PI/2;root.add(g);
  box(g,.22,.12,.10,dark,0,.36,0);box(g,.16,.018,.055,new T.MeshBasicMaterial({color:0xb48b51}),0,.299,-.025);
  const glow=mesh(root,new T.PlaneGeometry(2.8,2.5),new T.MeshBasicMaterial({map:glowMap,transparent:true,depthWrite:false,blending:T.AdditiveBlending}),Math.cos(a)*(r-.9),.008,Math.sin(a)*(r-.9));glow.rotation.x=-Math.PI/2;glow.rotation.z=-a;glow.castShadow=false;
 }
 for(let i=0;i<12;i++){const a=i*Math.PI/6;if(i===3)continue;pathLamp(a);}
 for(const side of [-1,1]){const g=new T.Group();g.position.set(side*1.8,0,11.8);root.add(g);box(g,.15,.14,.12,dark,0,.42,0);box(g,.12,.025,.09,new T.MeshBasicMaterial({color:0xd2a86a}),0,.35,0);}
 // Paired low lights and the wall opening lead naturally into the return passage.
 box(root,.18,2.65,3,dark,-1.8,1.25,12.5);box(root,.18,2.65,3,dark,1.8,1.25,12.5);box(root,3.8,.18,3,dark,0,2.6,12.5);
 const moon=new T.DirectionalLight(0xb6c9e8,1.05);moon.position.set(604,10,593);moon.target.position.set(600,0,600);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);Object.assign(moon.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:1,far:35});moon.shadow.bias=-.0003;moon.shadow.normalBias=.025;scene.add(moon,moon.target);
 scene.add(new T.HemisphereLight(0x8caccd,0x11151c,.22));
 const moonBounce=new T.PointLight(0x9eb5ce,1.1,5,1.6);moonBounce.position.set(600,1.8,600);scene.add(moonBounce);
 root.traverse(o=>{if(o.isMesh&&o.position.y<.015)o.castShadow=false;});
 const riderShade=shadow(root,0,0,.6,.5);
 return{scene,root,cd,table,umbrella,moon,riderShade};
}

export function installCanopyArt(view,route){
 const room=makeCanopy(),wood=material(0xb2a187,grainMap('wood')),iron=material(0x3e464a),orange=material(0xb76231),concrete=material(0x96958c,grainMap('concrete'));
 const chain=new T.Group();chain.name='Canopy construction chain reaction';chain.position.set(TRIGGER.x,TRIGGER.y,TRIGGER.z);chain.rotation.y=-TRIGGER.heading;view.scene.add(chain);
 const drawer=new T.Group();chain.add(drawer);const pivot=new T.Group();drawer.add(pivot);box(pivot,1.85,.035,.72,wood,0,.018,0);box(drawer,.08,.055,.60,iron,-.55,.025,0);
 // A lumber chute carries the can from the pavement to the starter button.
 const planks=[];for(let i=0;i<4;i++){const p=box(chain,.6,.08,.9,wood,-.75,.30-i*.06,.65+i*.58);p.rotation.x=.15;planks.push(p);}
 const can=new T.Group();can.position.set(-.75,.42,.52);drawer.add(can);mesh(can,new T.CylinderGeometry(.12,.12,.28,16),material(0xc4c4b1));mesh(can,new T.TorusGeometry(.12,.009,5,16),iron,0,.14,0).rotation.x=Math.PI/2;
 box(can,.13,.12,.003,material(0x516b6a),0,0,.12);tube(can,[[-.12,.08,0],[-.13,.27,0],[.13,.27,0],[.12,.08,0]],.005,iron);
 const generator=new T.Group();generator.name='Old portable generator';generator.position.set(-.75,.03,3.25);chain.add(generator);
 for(const side of [-1,1])tube(generator,[[side*.38,.05,.35],[side*.38,.72,.35],[side*.38,.72,-.35],[side*.38,.05,-.35]],.025,iron);
 box(generator,.68,.23,.58,orange,0,.62,0);mesh(generator,new T.CylinderGeometry(.17,.17,.36,16),iron,0,.30,0).rotation.x=Math.PI/2;
 box(generator,.5,.22,.10,iron,0,.37,-.36);const starter=mesh(generator,new T.CylinderGeometry(.04,.04,.025,12),material(0xa83b26),-.13,.43,-.425);starter.rotation.x=Math.PI/2;
 mesh(generator,new T.CircleGeometry(.047,16),material(0xc2c4aa),.12,.43,-.416).rotation.y=Math.PI;for(let i=0;i<6;i++)box(generator,.28,.012,.012,material(0x181b1d),0,.20+i*.027,-.19);
 const lamp=mesh(generator,new T.SphereGeometry(.025,8,6),new T.MeshBasicMaterial({color:0x292715}),.22,.40,-.43);
 const paddle=box(generator,.26,.23,.045,orange,0,.26,-.43);
 const wheel=mesh(generator,new T.TorusGeometry(.14,.018,6,16),iron,0,.30,-.22);const spoke=box(wheel,.24,.025,.02,orange);
 tube(chain,[[-.75,.03,3.5],[-.3,.02,4.1],[.8,.015,4.5],[1.3,.015,5]],.013,iron);
 // The existing barrier moves; replace its collision index once fully clear.
 const barrier=view.scene.getObjectByName('Upright plastic barrier'),barrierShadow=view.scene.getObjectByName('Barrier ground contact');
 const barrierPosition=entryPoint(0,3.7);barrier.position.set(barrierPosition.x,ENTRY.y+ISLAND.height+.008,barrierPosition.z);barrier.rotation.y=ENTRY.yaw;
 const barrierStart=barrier.position.clone();if(barrierShadow){barrierShadow.position.set(barrier.position.x,ENTRY.y+ISLAND.height+.004,barrier.position.z);barrierShadow.rotation.z=ENTRY.yaw;}const shadowStart=barrierShadow?.position.clone();
 const solid=view.hazards.layout.solids.find(o=>o.kind==='PLASTIC_BARRIER');if(solid){solid.x=barrierPosition.x;solid.z=barrierPosition.z;solid.yaw=-ENTRY.yaw;solid.bottom=ENTRY.y+ISLAND.height;solid.top+=ISLAND.height;}
 const solidStart=solid?{x:solid.x,z:solid.z}:null;
 const dirt=view.scene.getObjectByName('Accumulated construction grit');if(dirt){
  dirt.geometry.translate(-(ISLAND.x-.05),0,-(ISLAND.z+.25));dirt.position.set(barrierPosition.x,ENTRY.y+ISLAND.height+.003,barrierPosition.z);
  const soil=siteMaterial(0x8a7155),paint=soil.onBeforeCompile;soil.transparent=true;soil.depthWrite=false;soil.onBeforeCompile=shader=>{paint(shader);shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.a*=1.-smoothstep(.70,1.,length(pl.xz/vec2(1.6,.95)));');};soil.customProgramCacheKey=()=> 'island-grit178';dirt.material=soil;
 }
 const dirtStart=dirt?.position.clone();
 const oldTimber=view.scene.getObjectByName('Discarded two-by-four offcut');if(oldTimber){oldTimber.position.set(ISLAND.x+.6,ISLAND.height+.03,ISLAND.z+2.7);const t=view.hazards.layout.solids.find(o=>o.kind==='TIMBER'&&Math.hypot(o.x-ISLAND.x,o.z-ISLAND.z)<4);if(t){t.x=oldTimber.position.x;t.z=oldTimber.position.z;t.bottom+=ISLAND.height;t.top+=ISLAND.height;}}
 view.detailRoot?.traverse(o=>{if(o.geometry?.type==='IcosahedronGeometry'&&o.scale.x<.08&&Math.hypot(o.position.x-ISLAND.x,o.position.z-ISLAND.z)<5){o.position.z=ISLAND.z+2.5+Math.abs(o.position.z-ISLAND.z)*.15;o.position.y+=ISLAND.height;}});
 const islandMat=siteMaterial(0xb0afa5);islandMat.map=grainMap('concrete');
 const island=mesh(view.scene,new T.CylinderGeometry(ISLAND.radius-ISLAND.bevel,ISLAND.radius,ISLAND.height,96),islandMat,ISLAND.x,ENTRY.y+ISLAND.height/2,ISLAND.z);island.name='Three-and-a-half-inch concrete island';
 const tunnel=new T.Group();tunnel.name='Descending concrete Canopy passage';tunnel.position.set(ENTRY.x,ENTRY.y,ENTRY.z);tunnel.rotation.y=ENTRY.yaw;view.scene.add(tunnel);
 const floor=box(tunnel,2.8,.12,Math.hypot(6.5,6.5*.45),concrete,0,-1.5225,3.25);floor.rotation.x=Math.atan(.45);
 for(const side of [-1,1])box(tunnel,.22,3.18,6.5,concrete,side*1.51,ISLAND.height-1.59,3.25);
 box(tunnel,3.25,.12,1.8,concrete,0,ISLAND.height-.06,5.8);box(tunnel,2.8,3.2,.08,new T.MeshBasicMaterial({color:0x000000}),0,-1.5,6.5);
 for(let i=1;i<7;i++){const j=box(tunnel,2.8,.006,.018,iron,0,-i*.45+.005,i);j.rotation.x=Math.atan(.45);}
 const converted=new Map();for(const group of [chain,tunnel])group.traverse(o=>{if(!o.isMesh||!o.material.isMeshLambertMaterial)return;const old=o.material;if(!converted.has(old)){const m=siteMaterial(old.color);m.map=old.map;converted.set(old,m);}o.material=converted.get(old);});
 const hatch=new T.Group();hatch.name='Recessed split concrete access hatch';hatch.position.copy(tunnel.position);hatch.rotation.y=ENTRY.yaw;view.scene.add(hatch);
 const leaves=[],seams=new T.Group();hatch.add(seams);
 for(const side of [-1,1]){
  const leaf=new T.Group();hatch.add(leaf);leaves.push(leaf);
  const positions=[],uvs=[],steps=65;
  for(let i=0;i<steps;i++)for(const ids of [[0,1,2],[0,2,3]]){
   const v0=i*6.5/steps,v1=(i+1)*6.5/steps,u0=side<0?-1.4:0,u1=side<0?0:1.4;
   const points=[[u0,v0],[u1,v0],[u1,v1],[u0,v1]];
   for(const k of ids){const[u,v]=points[k],p=entryPoint(u,v),y=(islandFloor(p.x,p.z)??ENTRY.y)-ENTRY.y+.004;positions.push(u,y,v);uvs.push((u+1.4)/2.8,v/6.5);}
  }
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));geo.computeVertexNormals();mesh(leaf,geo,material(0xa09e94,grainMap('concrete')));
  // The seam and inset lifting plates make the hatch intentional while shut.
  box(leaf,.012,.006,5.9,iron,side*.012,ISLAND.height+.008,3.45);
  box(leaf,.19,.008,.30,iron,side*.30,ISLAND.height+.01,3.8);
 }
 const railMaterial=material(0x595c59);for(const side of [-1,1])box(tunnel,.055,.055,5.8,railMaterial,side*1.43,-.12,3.5);
 tunnel.visible=false;
 // Shader cutout exposes the actual sloping surface instead of drawing over asphalt.
 const hole={value:0},seen=new Set();view.scene.traverse(o=>{if(!o.isMesh||o===floor||o.parent===tunnel)return;for(const m of Array.isArray(o.material)?o.material:[o.material]){
  if(!m||seen.has(m))continue;const key=m.customProgramCacheKey?.()??'';
  if(m!==islandMat&&!/"road":true|"earth":true|"ground":true/.test(key))continue;seen.add(m);const before=m.onBeforeCompile,oldKey=m.customProgramCacheKey.bind(m);
  m.customProgramCacheKey=()=>oldKey()+'canopy-cutout177';m.onBeforeCompile=s=>{before(s);s.uniforms.canopyHole=hole;s.vertexShader='varying vec3 canopyWorld;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ncanopyWorld=(modelMatrix*vec4(transformed,1.)).xyz;');s.fragmentShader='varying vec3 canopyWorld;uniform float canopyHole;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <clipping_planes_fragment>',`#include <clipping_planes_fragment>\nvec2 d=canopyWorld.xz-vec2(${ENTRY.x},${ENTRY.z});vec2 q=vec2(d.x*${Math.cos(ENTRY.yaw).toFixed(10)}-d.y*${Math.sin(ENTRY.yaw).toFixed(10)},d.x*${Math.sin(ENTRY.yaw).toFixed(10)}+d.y*${Math.cos(ENTRY.yaw).toFixed(10)});if(canopyHole>.5&&abs(q.x)<1.405&&q.y>-.02&&q.y<6.55)discard;`);};m.needsUpdate=true;
 }});
 for(const leaf of leaves)leaf.traverse(o=>{if(!o.isMesh)return;o.castShadow=false;const m=o.material.clone();o.material=m;const before=m.onBeforeCompile;m.onBeforeCompile=shader=>{before(shader);shader.vertexShader='varying vec3 hatchWorld;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nhatchWorld=(modelMatrix*vec4(transformed,1.)).xyz;');shader.fragmentShader='varying vec3 hatchWorld;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>',`#include <clipping_planes_fragment>\nvec2 hd=hatchWorld.xz-vec2(${ENTRY.x},${ENTRY.z});float hu=hd.x*${Math.cos(ENTRY.yaw).toFixed(10)}-hd.y*${Math.sin(ENTRY.yaw).toFixed(10)};if(abs(hu)>1.405)discard;`);};m.customProgramCacheKey=()=> 'canopy-hatch179';});
 const h=view.hazards,baseGround=view.surfaceGround,baseContact=view.contactSurface?.bind(view),extra=installIslandContact(h,route);
 const support=(x,z)=>x>580&&z>580?0:extra(x,z)??baseGround(x,z);support.upperBound=(xa,xb,za,zb)=>xa>580&&za>580?0:Math.max(baseGround.upperBound?.(xa,xb,za,zb)??height(xa,za),ENTRY.y+ISLAND.height);view.surfaceGround=support;
 view.contactSurface=(x,z,r)=>x>580&&z>580||extra(x,z)!==undefined?support:baseContact?.(x,z,r)??support;
 let opened=false,cinemaStart=null;
 const open=()=>{hole.value=1;tunnel.visible=true;if(opened)return;opened=true;if(solid&&solidStart){solid.x=solidStart.x;solid.z=solidStart.z-2.45;}
  for(const side of [-1,1]){const p=entryPoint(side*1.51,3.25);h.layout.solids.push({kind:'TUNNEL_WALL',...p,hx:.11,hz:3.25,yaw:-ENTRY.yaw,bottom:ENTRY.y-3.1,top:ENTRY.y+ISLAND.height});}
  h.cells=new HazardWorld(h.layout).cells;
  barrier.position.copy(barrierStart);barrier.position.z-=2.45;if(barrierShadow){barrierShadow.position.copy(shadowStart);barrierShadow.position.z-=2.45;}if(dirt){dirt.position.copy(dirtStart);dirt.position.z-=2.45;}view.scene.updateMatrixWorld(true);installRoadShadows(view);
 };
 // Only the flush activation plank is exempt. The machinery remains a solid obstacle.
 chain.updateMatrixWorld(true);const generatorCenter=generator.getWorldPosition(new T.Vector3());
 h.layout.solids.push({kind:'GENERATOR',x:generatorCenter.x,z:generatorCenter.z,hx:.41,hz:.43,yaw:TRIGGER.heading,bottom:TRIGGER.y,top:TRIGGER.y+.8});h.cells=new HazardWorld(h.layout).cells;
 const oldOpen=route.callbacks.onOpen;route.callbacks.onOpen=()=>{open();oldOpen?.();};
 view.scene.updateMatrixWorld(true);installRoadShadows(view);
 view.canopy={room,chain,drawer,pivot,can,generator,tunnel,barrier,island,hole,hatch,leaves,starter,lamp,
  render(sim,dt,menu){
   const a=route.state==='open'?REVEAL_SECONDS:route.state==='reaction'?route.age:0;
   const opening=smooth(6.2,8.6,a);if(a>=6.2){hole.value=1;tunnel.visible=true;}
   leaves.forEach((leaf,i)=>{leaf.position.y=-.15*smooth(6.2,6.8,a);leaf.position.x=(i===0?-1:1)*1.43*smooth(6.7,8.6,a);});hatch.visible=a<8.6;
   const deploy=smooth(0,1,route.deployment);drawer.position.z=(1-deploy)*2.3;planks.forEach((p,i)=>{p.position.z=.65+i*.58+(1-deploy)*2*(1-i/3);});
   pivot.rotation.z=-.10*smooth(0,.7,a);
   const roll=smooth(.7,3.25,a);can.position.set(-.75,.42-.18*roll,.52+2.22*roll-(a>=3.3?drawer.position.z:0));can.rotation.x=roll*18.5;
   const pressed=smooth(3.22,3.42,a);paddle.rotation.x=-.18*pressed;starter.position.z=-.425+.018*pressed;
   generator.rotation.z=a>3.3?Math.sin(a*48)*.006*smooth(3.3,3.6,a):0;wheel.rotation.z=Math.max(0,a-3.3)*17;
   lamp.material.color.setHex(a>3.45?0xe1ba60:0x292715);
   const slide=smooth(4.8,6.5,a);barrier.position.copy(barrierStart);barrier.position.z-=2.45*slide;if(barrierShadow){barrierShadow.position.copy(shadowStart);barrierShadow.position.z-=2.45*slide;}
   if(dirt){dirt.position.copy(dirtStart);dirt.position.z-=2.45*slide;}
   if(route.state==='reaction'&&a>=4.8&&a<=6.55)view.updateMovingRoadShadows?.();
   if(route.state==='reaction'&&!menu){
    const normalPos=view.camera.position.clone(),normalTarget=new T.Vector3(sim.rider.x,sim.rider.groundY+1,sim.rider.z);
    if(!cinemaStart)cinemaStart={pos:normalPos.clone(),target:normalTarget.clone()};
    // One unbroken dolly: track the rolling can, linger on ignition, then reveal the hatch.
    const canFocus=chain.localToWorld(new T.Vector3(-.75,.32,.52+2.22*roll)),genFocus=chain.localToWorld(new T.Vector3(-.75,.40,3.0));
    const focus=canFocus.clone().lerp(genFocus,smooth(2.7,3.3,a));
    const near=chain.localToWorld(new T.Vector3(2.3,1.65,1.1));
    const islandFocus=new T.Vector3(ISLAND.x,ENTRY.y+.1,ISLAND.z),wide=islandFocus.clone().add(new T.Vector3(-7,5,-7));
    const pan=smooth(4.1,6.4,a);focus.lerp(islandFocus,pan);const pos=near.lerp(wide,pan);
    const portraitRoom=1+pan*Math.max(0,Math.min(.65,(.85/view.camera.aspect)-1));pos.sub(focus).multiplyScalar(portraitRoom).add(focus);
    const intro=smooth(0,1.0,a),outro=smooth(8.6,REVEAL_SECONDS,a);
    pos.lerp(cinemaStart.pos,1-intro).lerp(normalPos,outro);focus.lerp(cinemaStart.target,1-intro).lerp(normalTarget,outro);
    view.camera.position.copy(pos);view.camera.lookAt(focus);view.camera.updateMatrixWorld(true);view.sky.position.copy(pos);
   }else cinemaStart=null;
   if(menu||sim.area!=='canopy')return false;
   const scene=room.scene,objects=[view.rider,view.board],parents=objects.map(o=>o.parent);
   objects.forEach(o=>scene.add(o));
   const night=eveningUniforms.eveningNight.value,direct=eveningUniforms.eveningDirect.value,lampPower=eveningUniforms.eveningLamp.value,shadowReady=memoryLight.shadowReady.value;
   eveningUniforms.eveningNight.value=.68;eveningUniforms.eveningDirect.value=.1;eveningUniforms.eveningLamp.value=0;memoryLight.shadowReady.value=0;
   room.riderShade.position.set(sim.rider.x-600,.009,sim.rider.z-600);room.riderShade.material.opacity=Math.exp(-sim.rider.height);
   const cd=room.cd;cd.visible=!route.found||route.rewardAge<1.1;
   cd.position.set(.26,1.01+Math.sin(sim.time*2)*.035,.12);cd.rotation.set(.45,sim.time*1.6,.15);
   if(route.found&&route.rewardAge<1.1){const f=smooth(0,1.1,route.rewardAge);cd.position.lerp(new T.Vector3(sim.rider.x-600,sim.rider.height+1.1,sim.rider.z-600),f);cd.position.y+=Math.sin(f*Math.PI)*.7;cd.rotation.y+=f*16;cd.scale.setScalar(1-.75*f);}else cd.scale.setScalar(1);
   const shadows=view.renderer.shadowMap.enabled;view.renderer.shadowMap.enabled=true;view.renderer.shadowMap.type=T.PCFSoftShadowMap;
   view.finish.material.uniforms.secretGold.value=0;view.finish.material.uniforms.exitFade.value=0;
   view.finish.render(view.renderer,scene,view.camera);
   view.renderer.shadowMap.enabled=shadows;objects.forEach((o,i)=>parents[i].add(o));
   eveningUniforms.eveningNight.value=night;eveningUniforms.eveningDirect.value=direct;eveningUniforms.eveningLamp.value=lampPower;memoryLight.shadowReady.value=shadowReady;
   return true;
  }
 };
 return view.canopy;
}
