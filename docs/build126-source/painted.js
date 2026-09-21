import {sampleRideResponse} from './motion126/response.mjs';
import {sculptRoad,repairMaterial} from './detail-geometry.js';
import {visual85} from './visual85/state.js';
import {updateHallway} from './hallway-light.js';
import {applyEvening,eveningSkyGLSL,eveningUniforms} from './evening-light.js';
import {CrewMoment} from './crew-moment.js';
import {addBoundaryWoods} from './boundary.js';

import {atmosphereGLSL} from './atmosphere.js';
/*! W124 sedan geometry adapted from w124zbyszek, https://blendswap.com/blend/11083 . CC BY-NC-SA 3.0 https://creativecommons.org/licenses/by-nc-sa/3.0/ . Changes: simplification, scaling, painted materials. Adapted car geometry remains CC BY-NC-SA 3.0. */
import * as T from './vendor/three.module.js';
import {View as BaseView} from './render.js';
import {ENTRANCE_HOUSES,height,terrainHeight,roadDistance,entrancePoints,heading,angle,curvature,aerialPoint} from './world.js';
import {paintedMaterial,noiseGLSL,brushTexture,loadBrush,setReflectionSky} from './pigment.js';
import {PaintedHuman} from './human.js';
import {PavementContact,groundCar} from './car-contact.js';
import {MemoryShadows,memoryLight} from './memory-light.js';
import {IllustrationFinish} from './illustration.js';
await loadBrush();
const forest=await new T.TextureLoader().loadAsync('./assets/woodland.png');forest.colorSpace=T.SRGBColorSpace;

const paintedSky=await new T.TextureLoader().loadAsync('./assets/evening-sky.jpg');paintedSky.colorSpace=T.SRGBColorSpace;setReflectionSky(paintedSky);
const carData=await fetch('./assets/mercedes-painted.json').then(r=>{if(!r.ok)throw Error('Car artwork unavailable');return r.json();});
function paint(color,ground=false){return paintedMaterial(color,{ground});}
function woodlandMaterial(color){
 const m=new T.MeshBasicMaterial({map:forest,color,alphaTest:.18,side:T.DoubleSide});
 m.onBeforeCompile=s=>{Object.assign(s.uniforms,eveningUniforms,visual85);s.fragmentShader='uniform float eveningNight;'+s.fragmentShader;s.vertexShader='varying vec3 forestWorld;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nforestWorld=(modelMatrix*vec4(position,1.)).xyz;');s.fragmentShader='varying vec3 forestWorld;\n'+noiseGLSL+atmosphereGLSL+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
  float edge=min(vMapUv.x,1.-vMapUv.x);float cut=pnoise(vMapUv*vec2(29.,17.));
  diffuseColor.a*=smoothstep(.005,.12,edge+(cut-.5)*.08);diffuseColor.a*=smoothstep(-.025,.045,vMapUv.y+(cut-.5)*.10);
  float mass=pigment(vMapUv*vec2(7.,3.));
  diffuseColor.rgb*=(.84+mass*.30)*mix(vec3(1.),vec3(.022,.034,.055),eveningNight);
  diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(.85,.92,1.08),smoothstep(.40,.72,mass)*.38);
 `);s.fragmentShader=s.fragmentShader.replace('#include <fog_fragment>',`
 #ifdef USE_FOG
 float fd=distance(cameraPosition,forestWorld);vec3 air=memoryAirColor(fogColor,fd);
 float lowMist=(1.-smoothstep(0.,22.,forestWorld.y))*.12;
 lowMist*=mix(1.,smoothstep(24.,90.,fd)*.55,illustrationExperiment*(1.-eveningNight));
 gl_FragColor.rgb=mix(gl_FragColor.rgb,air,min(.83,memoryAirAmount(fd)*.78+lowMist));
 #endif
 `);};return m;
}
function contactShadow(w,d){
 const mat=new T.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{brush:{value:brushTexture},eveningNight:eveningUniforms.eveningNight},vertexShader:'varying vec2 suv;void main(){suv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform float eveningNight;uniform sampler2D brush;varying vec2 suv;void main(){float r=length((suv-.5)*2.);float edge=1.-smoothstep(.25,1.,r);float mark=texture2D(brush,suv*1.3).r;gl_FragColor=vec4(mix(vec3(.055,.065,.12),vec3(0.),eveningNight),edge*(.17+mark*.13));}'});
 const m=new T.Mesh(new T.PlaneGeometry(w,d),mat);m.rotation.x=-Math.PI/2;m.position.y=.06;return m;
}
function gateWoodland(view,x,z,tall,color){
 const mat=woodlandMaterial(color),positions=[],uvs=[];
 for(let k=0;k<3;k++){
  const a=.35+k*Math.PI/3,geo=new T.PlaneGeometry(16,tall,4,1).toNonIndexed(),pa=geo.attributes.position;
  for(let i=0;i<pa.count;i++){const lx=pa.getX(i),wx=x+lx*Math.cos(a),wz=z-lx*Math.sin(a);pa.setXYZ(i,wx,terrainHeight(wx,wz)+pa.getY(i)+tall/2-.25,wz);}
  positions.push(...pa.array);uvs.push(...geo.attributes.uv.array);geo.dispose();
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));g.computeVertexNormals();const stand=new T.Mesh(g,mat);stand.name='Entrance woodland stand';view.scene.add(stand);
}
export class View extends BaseView{
 surface(points,mat,lift){const mesh=super.surface(points,mat,lift);if(lift===.015)this.detailPathMesh=mesh;if(mat===this.asphalt){this.detailAsphalt=mesh;this.roadContact=new PavementContact(mesh.geometry.attributes.position.array);}return mesh;}
 mat(color){this.materials??={};return this.materials[color]??=paint(color);}
 buildWorld(){
  super.buildWorld();
  this.scene.children.filter(o=>o.isInstancedMesh).forEach(o=>o.removeFromParent());

  for(const i of [18,48]){const p=entrancePoints[i],q=entrancePoints[i+1],a=Math.atan2(q.z-p.z,q.x-p.x),x=p.x-Math.sin(a)*6,z=p.z+Math.cos(a)*6;this.lamp(x,z,a,1);}
  // Original painted woodland strips overlap in depth and never turn toward the camera.
  const h=ENTRANCE_HOUSES[1],r=h.rotation;
  for(let row=0;row<4;row++)for(let j=0;j<7;j++){
   const x=-155+j*52+(row%2)*20,z=-24-row*23,p={x:h.x+x*Math.cos(r)+z*Math.sin(r),z:h.z-x*Math.sin(r)+z*Math.cos(r)};
   if(roadDistance(p.x,p.z)<16)continue;
   const mat=woodlandMaterial([0x7b88b0,0x8592b8,0x8b94b9,0x939cbe][row]);
   const tall=23+row*3.5+Math.sin(j*2)*2;
   const card=new T.Mesh(new T.PlaneGeometry(67,tall),mat);card.position.set(p.x,height(p.x,p.z)+tall/2-.15,p.z);card.rotation.y=r+Math.sin(j*3)*.07;this.scene.add(card);
  }
  addBoundaryWoods(this,woodlandMaterial);
  // Existing painted woodland brought around the entry wings in loose stands.
  const gate=aerialPoint(852,155);let gateTrees=0;
  for(const side of [-1,1])for(let j=0;j<5;j++){
   const lx=side*(22+j*4.8),lz=-9-(j%3)*9,x=gate.x+lx*Math.cos(1.15)+lz*Math.sin(1.15),z=gate.z-lx*Math.sin(1.15)+lz*Math.cos(1.15);
   if(roadDistance(x,z)<11||ENTRANCE_HOUSES.some(h=>Math.hypot(x-h.x,z-h.z)<19))continue;
   const tall=9+(j%3)*1.2;gateWoodland(this,x,z,tall,0x65758d);gateTrees++;
  }
  for(const [lx,lz] of [[-18,4],[18,-6]]){
   const x=gate.x+lx*Math.cos(1.15)+lz*Math.sin(1.15),z=gate.z-lx*Math.sin(1.15)+lz*Math.cos(1.15),tall=10;
   gateWoodland(this,x,z,tall,0x586b82);gateTrees++;
  }
  this.groundStudy={clumps:0,species:[],gateWoodlandStands:gateTrees};
  // Matte painted earth and asphalt. Large-scale pigment marks stay attached to ground.
  this.scene.traverse(o=>{if(!o.isMesh||o===this.sky||o.material.map)return;const g=o.geometry;
   if(o.material===this.asphalt){o.material=paintedMaterial(0x344266,{ground:true,road:true});repairMaterial(o.material);o.material.polygonOffset=true;o.material.polygonOffsetFactor=0;o.material.polygonOffsetUnits=-1;}
   else if(g?.parameters?.width===700)o.material=paintedMaterial(0xae754e,{ground:true,earth:true});
   else if(o.material.isMeshStandardMaterial&&o.material.color.getHex()===0xbbb8a5)o.material=paintedMaterial(0xaaa79b,{ground:true,concrete:true});
  });
  const sky=this.sky.material;sky.uniforms.paintedSky={value:paintedSky};
  Object.assign(sky.uniforms,eveningUniforms);sky.fragmentShader=eveningSkyGLSL;sky.needsUpdate=true;
 }
 makeRider(){
  const group=super.makeRider();this.hips.visible=false;for(const shoe of this.shoes)shoe.visible=false;
  this.human=new PaintedHuman(true);this.human.position.y=.023;group.add(this.human);return group;
 }
 makeBoard(){const group=super.makeBoard(),shape=new T.Shape();shape.moveTo(-.12,-.38);shape.quadraticCurveTo(-.12,-.525,0,-.525);shape.quadraticCurveTo(.12,-.525,.12,-.38);shape.lineTo(.12,.38);shape.quadraticCurveTo(.12,.525,0,.525);shape.quadraticCurveTo(-.12,.525,-.12,.38);shape.closePath();const g=new T.ExtrudeGeometry(shape,{depth:.025,bevelEnabled:true,bevelSize:.005,bevelThickness:.004,bevelSegments:2,steps:1,curveSegments:10});g.rotateX(-Math.PI/2);this.deck.geometry.dispose();this.deck.geometry=g;this.deck.position.y=.11;return group;}
 setSelection(o){super.setSelection(o);this.human.select(o.rider);}
 lamp(x,z,h,side){
  const group=new T.Group();group.position.set(x,height(x,z),z);
  const pole=this.cylinder(.035,.07,5.3,0x333a4d);pole.position.y=2.65;group.add(pole);
  const arm=this.box(.38,.045,.045,0x434456);arm.position.set(.13,5.23,0);group.add(arm);
  const cap=this.box(.30,.07,.25,0x3c4254);cap.position.set(.29,5.2,0);group.add(cap);
  const bulb=new T.Mesh(new T.SphereGeometry(.09,8,5),new T.MeshBasicMaterial({color:0xffca74}));bulb.position.set(.29,5.12,0);group.add(bulb);
  const canvas=document.createElement('canvas');canvas.width=64;canvas.height=64;const ctx=canvas.getContext('2d'),g=ctx.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,195,105,.7)');g.addColorStop(.15,'rgba(255,168,66,.28)');g.addColorStop(1,'rgba(255,153,61,0)');ctx.fillStyle=g;ctx.fillRect(0,0,64,64);
  const glow=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(canvas),transparent:true,depthWrite:false}));glow.position.copy(bulb.position);glow.scale.set(1.65,1.65,1);group.add(glow);
  this.scene.add(group);
  (this.memoryLamps??=[]).push(new T.Vector3(x+.29,group.position.y+5.12,z));
 }
 makeCar(){const group=new T.Group();this.carBody=new T.Group();group.add(this.carBody);this.carBody.add(contactShadow(2.7,5.3));this.tails=[];this.carWheels=[];const wheelGroups={};for(const part of carData){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(part.position,3));g.setAttribute('normal',new T.Float32BufferAttribute(part.normal,3));if(part.index)g.setIndex(part.index);const c=new T.Color(...part.color).convertSRGBToLinear(),m=paintedMaterial(c,{glass:part.name==='glass',car:['body','cladding','chrome'].includes(part.name),blackCar:(['body','cladding'].includes(part.name)||(part.name==='rubber'&&!part.wheel))?part.name:false});if(part.name==='tail'){m.color.setHex(0xc64e36);const compile=m.onBeforeCompile,key=m.customProgramCacheKey;const brake={value:0};m.userData.brake=brake;m.customProgramCacheKey=()=>key()+'sedanLens1992';m.onBeforeCompile=s=>{compile(s);s.uniforms.braking=brake;s.fragmentShader='uniform float braking;'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>',`float upper=smoothstep(.763,.766,pl.y);float amber=step(.655,abs(pl.x));
 vec3 upperLens=mix(vec3(.29,.30,.27),vec3(.52,.16,.018),amber);
 vec3 redLens=vec3(.36,.018,.010)+vec3(.36,.075,.022)*braking;
 float ribs=.83+.17*cos((pl.y-.674)*241.66);float groove=smoothstep(.91,.995,sin((pl.y-.674)*241.66));
 outgoingLight=mix(redLens,upperLens,upper)*ribs*(1.-.28*groove)*(1.+eveningNight*.65);
 float lensRim=1.-smoothstep(.002,.006,min(pl.y-.6675,.8256-pl.y));outgoingLight=mix(outgoingLight,vec3(.018,.016,.017),lensRim*.85);\n#include <opaque_fragment>`);};}if(part.name==='glass'){m.transparent=true;m.opacity=.55;m.depthWrite=false;}const obj=new T.Mesh(g,m);obj.userData.memoryCaster=part.wheel?part.name==='rubber':['body','cladding','glass'].includes(part.name);if(part.wheel){const w=part.wheel;let assembly=wheelGroups[w.id];if(!assembly){const steering=new T.Group(),rolling=new T.Group();steering.position.fromArray(w.pivot);steering.add(rolling);group.add(steering);assembly=wheelGroups[w.id]={...w,steering,rolling};this.carWheels.push(assembly);}assembly.rolling.add(obj);}else this.carBody.add(obj);if(part.name==='tail')this.tails.push(obj);}const plate=new T.Mesh(new T.BoxGeometry(.305,.1524,.014),paintedMaterial(0x9e9a87));plate.position.set(0,.733,2.343);this.carBody.add(plate);return group;}
 draw(sim,dt,input,menu){
  // The portrait camera is closer to the rider; tow physics are unchanged.
  
  this.deferRender=true;super.draw(sim,dt,input,menu);
  this.sky.material.uniforms.top.value.set('#505e88');this.sky.material.uniforms.bottom.value.set('#f3a16b');
  this.scene.fog.color.set('#7e8099');this.scene.fog.density=.0058;
  for(const l of this.lamps)if(l.material.transparent)l.material.opacity=.20;
  if(this.memoryAir)this.memoryAir.value.copy(this.scene.fog.color);
  if(this.evening)applyEvening(this,this.evening);
  for(const lamp of this.tails)lamp.material.userData.brake.value=sim.car.brake?1:0;
  // Wheel roll follows actual distance, so acceleration and braking stay synchronized.
  const c=sim.car,k=curvature(c.s),step=1-Math.exp(-Math.min(dt,.1)*10);
  if(this.wheelS===undefined||sim.time<(this.wheelTime??0))this.wheelS=c.s;
  const travel=c.s-this.wheelS;this.wheelS=c.s;this.wheelTime=sim.time;
  for(const w of this.carWheels){
   // Local -Z is forward. Inner and outer front wheels follow different radii.
   const steer=w.front?-Math.atan(2.8*k/(1+k*w.pivot[0])):0;
   w.steering.rotation.y+=(steer-w.steering.rotation.y)*step;
   if(Math.abs(travel)<3)w.rolling.rotation.x=(w.rolling.rotation.x-travel*(1+k*w.pivot[0])/w.radius)%(Math.PI*2);
  }
  this.carPitch??=0;this.carPitch+=(c.accel*.007-this.carPitch)*step;groundCar(this.car,this.carBody,this.carWheels,this.roadContact,this.carPitch);
  const elapsed=sim.time-(this.lastPoseTime??sim.time);
  const riderTurn=sim.visualTurnRate??(elapsed>0&&elapsed<.2&&this.lastRiderHeading!==undefined?angle(sim.rider.heading-this.lastRiderHeading)/elapsed:0);this.lastRiderHeading=sim.rider.heading;this.lastPoseTime=sim.time;
  const speed=Math.hypot(sim.rider.vx,sim.rider.vz),balance=T.MathUtils.clamp(sim.rider.lean*1.4-riderTurn*speed*.075,-.85,.85);
  this.correctBoard?.(sim,dt);
  this.human.rideResponse=sampleRideResponse(sim,this.human.rideResponse,menu||this.responseDisabled);this.human.pose(balance,input.crouch,sim.rider.holding,sim.time,dt);this.correctRider?.(sim,dt);this.handle.scale.x=.67;
  this.crewMoment??=new CrewMoment(this);this.crewMoment.update(sim,dt,menu);
  if(sim.rider.holding){this.rider.updateMatrixWorld(true);const grip=this.human.localToWorld(this.human.grip());this.handle.position.copy(grip);const car=sim.car,slack=Math.max(0,Math.min(1.8,sim.rope-Math.hypot(car.hx-sim.rider.x,car.hz-sim.rider.z)));for(let i=0;i<33;i++){const t=i/32,x=car.hx+(grip.x-car.hx)*t,z=car.hz+(grip.z-car.hz)*t;this.ropePositions[i*3]=x;this.ropePositions[i*3+1]=Math.max(height(x,z)+.055,(height(car.hx,car.hz)+.39)*(1-t)+grip.y*t-Math.sin(t*Math.PI)*(.12+slack*.7));this.ropePositions[i*3+2]=z;}this.rope.geometry.attributes.position.needsUpdate=true;}
  if(!this.boardShade){this.boardShade=contactShadow(1.35,1.9);this.scene.add(this.boardShade);}
  this.boardShade.position.set(this.board.position.x,height(this.board.position.x,this.board.position.z)+.038,this.board.position.z);this.boardShade.rotation.z=-this.board.rotation.y;
  const review=new URLSearchParams(location.search).get('art');
  if(review){const h=ENTRANCE_HOUSES[1],r=h.rotation,to=(x,y,z)=>new T.Vector3(h.x+x*Math.cos(r)+z*Math.sin(r),height(h.x,h.z)+y,h.z-x*Math.sin(r)+z*Math.cos(r));
   this.camera.position.copy(review==='side'?to(27,3.5,15):review==='distance'?to(0,2.7,115):to(19,3.2,37));this.camera.lookAt(to(0,4,0));this.sky.position.copy(this.camera.position);
  }
  if(review==='hill'){this.camera.position.set(-58,9,180);this.camera.lookAt(5,1,85);this.sky.position.copy(this.camera.position);}
  if(review==='car'||review==='rider'){const subject=review==='car'?this.car:this.rider;subject.updateMatrixWorld(true);const near=review==='car'?new T.Vector3(4,2.1,6):new T.Vector3(1.7,1.55,3.4),aim=review==='car'?new T.Vector3(0,.85,0):new T.Vector3(0,.92,0);this.camera.position.copy(subject.localToWorld(near));this.camera.lookAt(subject.localToWorld(aim));this.sky.position.copy(this.camera.position);}
  this.stageSelection?.(sim,dt,menu);
  updateHallway(this,sim,dt,menu);
  this.finish??=new IllustrationFinish(this.renderer);
  const nearest=[...(this.memoryLamps??[])].sort((a,b)=>a.distanceToSquared(this.car.position)-b.distanceToSquared(this.car.position));
  memoryLight.lampPositions.value.forEach((p,i)=>nearest[i]?p.copy(nearest[i]):p.set(0,-1000,0));
  this.renderer.info.autoReset=false;this.renderer.info.reset();
  this.memoryShadows??=new MemoryShadows();this.memoryShadows.render(this);
  if(new URLSearchParams(location.search).has('raw-paint'))this.renderer.render(this.scene,this.camera);else this.finish.render(this.renderer,this.scene,this.camera);
  if(new URLSearchParams(location.search).has('paint-bench')){
   this.paintBench??={last:performance.now(),frames:[]};const b=this.paintBench,now=performance.now(),gap=now-b.last;b.last=now;if(gap>0&&gap<250)b.frames.push(gap);
   if(b.frames.length===180){const sorted=[...b.frames].sort((a,b)=>a-b);let output=document.getElementById('paint-benchmark');if(!output){output=document.createElement('output');output.id='paint-benchmark';output.style='position:fixed;top:70px;left:10px;background:#101b2a;color:white;padding:12px;z-index:99;font:12px monospace';document.body.append(output);}output.textContent=JSON.stringify({medianMs:sorted[90].toFixed(1),p95Ms:sorted[171].toFixed(1),drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles});}
  }

 }
}
