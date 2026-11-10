import * as T from './vendor/three.module.js';
import {paintedMaterial} from './pigment.js';
export function addRearDetails(view){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=100;const ctx=canvas.getContext('2d');ctx.font='bold 76px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#171719';ctx.fillText('300 E',258,56);const silver=ctx.createLinearGradient(0,15,0,90);silver.addColorStop(0,'#f4eee2');silver.addColorStop(.4,'#b8bbc0');silver.addColorStop(.56,'#555c67');silver.addColorStop(.75,'#e2ded5');silver.addColorStop(1,'#777d87');ctx.fillStyle=silver;ctx.fillText('300 E',256,50);
 const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;
 const badge=new T.Mesh(new T.PlaneGeometry(.47,.050),new T.MeshBasicMaterial({map,transparent:true,alphaTest:.15,depthWrite:false}));badge.position.set(-.475,.868,2.331);view.carBody.add(badge);
 const tips=[];
 // Rear silencer, inlet and hangers connect both black outlets to the underbody.
 const metal=paintedMaterial(0x16181a),silencer=new T.Mesh(new T.BoxGeometry(.30,.12,.40),metal);silencer.position.set(-.54,.345,2.04);view.carBody.add(silencer);
 for(const x of [-.64,-.44]){const hanger=new T.Mesh(new T.CylinderGeometry(.014,.014,.17,6),metal);hanger.position.set(x,.445,2.02);view.carBody.add(hanger);}
 const inlet=new T.Mesh(new T.CylinderGeometry(.028,.028,.55,8),metal);inlet.rotation.x=Math.PI/2;inlet.position.set(-.54,.35,1.62);view.carBody.add(inlet);
 for(const x of [-.575,-.512]){
  const group=new T.Group();group.position.set(x,.310,2.265);group.rotation.x=.12;
  const tube=new T.Mesh(new T.CylinderGeometry(.024,.024,.22,12,1,true),paintedMaterial(0x111318));tube.rotation.x=Math.PI/2;group.add(tube);
  const rim=new T.Mesh(new T.RingGeometry(.019,.024,16),paintedMaterial(0x17191e));rim.position.z=.111;group.add(rim);
  const hole=new T.Mesh(new T.CircleGeometry(.019,16),new T.MeshBasicMaterial({color:0x090b10}));hole.position.z=.102;group.add(hole);view.carBody.add(group);tips.push(group);
 }
 const smokeCanvas=document.createElement('canvas');smokeCanvas.width=64;smokeCanvas.height=64;const c=smokeCanvas.getContext('2d'),g=c.createRadialGradient(32,32,3,32,32,31);g.addColorStop(0,'rgba(170,168,175,.65)');g.addColorStop(.5,'rgba(153,154,164,.24)');g.addColorStop(1,'rgba(150,152,163,0)');c.fillStyle=g;c.fillRect(0,0,64,64);const smokeMap=new T.CanvasTexture(smokeCanvas);
 // Short-lived, pipe-local clouds stay close to the outlets as the car moves.
 const pool=Array.from({length:8},()=>{const sprite=new T.Sprite(new T.SpriteMaterial({map:smokeMap,transparent:true,opacity:0,depthWrite:false}));sprite.visible=false;view.carBody.add(sprite);return {sprite,age:99,velocity:new T.Vector3()};});let last=-1,cursor=0,lastPuff=-99;
 return (sim,menu=false)=>{
  const time=sim.time;
  const dt=last<0?0:Math.min(.1,Math.max(0,time-last));if(time<last){lastPuff=-99;for(const p of pool)p.age=99;}last=time;
  const speed=T.MathUtils.clamp(sim.car.speed/18,0,1),emitting=!menu&&sim.car.speed>.15&&!sim.car.brake;
  if(emitting&&time-lastPuff>T.MathUtils.lerp(.60,.13,speed)){const p=pool[cursor++%pool.length],tip=tips[cursor%2];tip.add(p.sprite);p.sprite.position.set(0,0,.125);p.age=0;p.strength=speed;p.velocity.set(.008,.045,.065+.025*speed);lastPuff=time;}
  for(const p of pool){p.age+=dt;const alive=p.age<.65;p.sprite.visible=alive&&!menu;if(!alive)continue;p.sprite.position.addScaledVector(p.velocity,dt);p.sprite.scale.setScalar(.075+(p.strength??0)*.05+p.age*.12);p.sprite.material.opacity=.22*(1+(p.strength??0)*.7)*Math.sin(Math.PI*p.age/.65);}
 };
}

