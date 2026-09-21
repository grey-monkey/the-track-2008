import * as T from './vendor/three.module.js';
import {PortraitNativeHuman} from './portrait-native-human.js';
import {buildAssetBoard} from './asset-boards.js';
import {clips} from './motion126/clips.js';
import {sampleRideResponse} from './motion126/response.mjs';
import {sampleRideResponse as priorResponse} from './motion125/response.mjs';
const renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,Math.max(320,innerHeight-document.querySelector('header').offsetHeight));renderer.setClearColor(0x20242d);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;document.querySelector('#canvas').append(renderer.domElement);
renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();const message=document.querySelector('#loading');message.hidden=false;message.textContent='The preview lost its graphics context. Reload this page to restart the comparison.';});
const scene=new T.Scene();scene.add(new T.HemisphereLight(0xcbd7ef,0x705342,2));const sun=new T.DirectionalLight(0xffd7b1,3);sun.position.set(-3,5,4);scene.add(sun);
const camera=new T.PerspectiveCamera(34,1,.01,100),humans=[],groups=[];
for(let i=0;i<2;i++){const group=new T.Group();group.position.x=i? .85:-.85;scene.add(group);groups.push(group);const h=new PortraitNativeHuman();h.select('SALLY');h.release=1;group.add(h);humans.push(h);const deck=buildAssetBoard('HANDMEDOWN');group.add(deck);h.position.y=deck.userData.deckHeight-.0365;group.userData.deck=deck;group.userData.humanY=h.position.y;
 const line=new T.Line(new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(new Float32Array(33*3),3)),new T.LineBasicMaterial({color:0xe1d5b9}));group.add(line);group.userData.rope=line;
 const floor=new T.Mesh(new T.PlaneGeometry(2.6,2.6),new T.MeshStandardMaterial({color:0x555567,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.016;group.add(floor);
}
const header=document.querySelector('header');function select(options,change){const el=document.createElement('select');for(const [value,label]of options){const o=document.createElement('option');o.value=value;o.textContent=label;el.append(o);}header.append(el);el.onchange=()=>change(el.value);return el;}
let clip=clips.find(c=>c.kind==='release'),time=1.15,playing=false,last=Date.now(),rear=false,crouched=false;
const ranges={release:[.4,3,1.15],speed:[.1,3.9,2],ramp:[.1,1.35,.53],load:[.35,7.8,5.5],brake:[.1,3.5,1.75],slide:[.2,2,.98],'slide-right':[.2,2,.98],takeup:[.35,1.6,.79],patch:[.1,1.6,.28]};
select([['release','Release / free coast'],['speed','Speed posture'],['ramp','Ramp / flight / landing'],['load','Sustained pull'],['brake','Braking / slack'],['slide','Powerslide left'],['slide-right','Powerslide right'],['grip','Grip recovery'],['takeup','Rope take-up'],['patch','Patch entry and exit']],v=>{clip=clips.find(c=>c.kind===(v==='grip'?'slide':v));time=v==='grip'?1.41:ranges[clip.kind][2];playing=false;document.querySelector('#play').textContent='Replay motion';});
select(['SALLY','DOG','BOSS','BLACK'].map(n=>[n,n]),v=>humans.forEach(h=>h.select(v)));
select([['GOOFY','Goofy'],['REGULAR','Regular']],v=>humans.forEach(h=>h.setStance(v)));
select([['standing','Relaxed'],['crouch','Crouched']],v=>crouched=v==='crouch');
select([['side','Three-quarter'],['rear','Behind rider']],v=>rear=v==='rear');
const status=document.createElement('span');status.style.marginLeft='8px';header.append(status);
const slider=document.querySelector('#scrub');document.querySelector('#play').onclick=()=>{playing=!playing;if(playing)time=ranges[clip.kind][0];document.querySelector('#play').textContent=playing?'Pause':'Replay motion';};slider.oninput=()=>{time=+slider.value;playing=false;document.querySelector('#play').textContent='Replay motion';};
let lastWidth=0,lastHeight=0;
function draw(){const desiredHeight=Math.max(320,innerHeight-header.offsetHeight);if(lastWidth!==innerWidth||lastHeight!==desiredHeight){lastWidth=innerWidth;lastHeight=desiredHeight;renderer.setSize(lastWidth,lastHeight);}const frame=clip.frames[Math.min(clip.frames.length-1,Math.floor(time*120))],state={...frame,time:frame.time},response=sampleRideResponse(state),lift=frame.rider.height+frame.surface;
 for(let i=0;i<2;i++){const h=humans[i],g=groups[i];h.air=Math.min(1,frame.rider.height/.2);h.crouch=crouched?1:0;h.release=i?(response.release??(frame.rider.holding?0:1)):(frame.rider.holding?0:clip.kind==='release'?1-Math.exp(-6*Math.max(0,time-.8)):1);h.rideResponse=i?response:priorResponse(state);h.motionLastTime=null;g.rotation.y=-(frame.rider.heading-clip.frames[0].rider.heading);h.position.y=g.userData.humanY+lift;g.updateMatrixWorld(true);h.towTarget=frame.rider.holding?g.localToWorld(new T.Vector3(0,.39,-Math.hypot(frame.car.hx-frame.rider.x,frame.car.hz-frame.rider.z))):null;h.pose(frame.rider.lean,crouched,frame.rider.holding,time,1/60);g.rotation.y=-(frame.rider.heading-clip.frames[0].rider.heading);h.position.y=g.userData.humanY+lift;g.userData.deck.position.y=lift;
  const rope=g.userData.rope;rope.visible=frame.rider.holding;if(rope.visible){g.updateMatrixWorld(true);const hand=g.worldToLocal(h.localToWorld(h.grip())),slack=Math.max(0,4.7192-Math.hypot(frame.car.hx-frame.rider.x,frame.car.hz-frame.rider.z)),a=rope.geometry.attributes.position;for(let j=0;j<33;j++){const t=j/32;a.setXYZ(j,hand.x*(1-t),hand.y*(1-t)+.45*t-Math.sin(t*Math.PI)*(.06+slack*.7),hand.z*(1-t)-3.2*t);}a.needsUpdate=true;}
 }
 status.textContent=response.kind+'  /  '+Math.round(response.load*100)+'% load / '+Math.round(response.brake*100)+'% braking / '+Math.round(response.flight*100)+'% balance  /  '+'  /  '+Math.round(response.compression*100)+'% absorption / '+Math.round(Math.abs(response.slide)*100)+'% slide / '+Math.round(response.yank*100)+'% take-up';
 renderer.setScissorTest(true);const w=innerWidth/2,height=Math.max(320,innerHeight-document.querySelector('header').offsetHeight);camera.aspect=w/height;camera.updateProjectionMatrix();for(let i=0;i<2;i++){groups.forEach((g,j)=>g.visible=i===j);camera.position.set(groups[i].position.x+(rear?.3:-2.4),rear?1.55:1.65,rear?4.8:3.2);camera.lookAt(groups[i].position.x,.95,0);renderer.setViewport(i*w,0,w,height);renderer.setScissor(i*w,0,w,height);renderer.render(scene,camera);}renderer.setScissorTest(false);document.querySelector('#loading').hidden=true;document.querySelector('#viewLabels').hidden=false;slider.max=ranges[clip.kind][1];slider.value=time;document.querySelector('#clock').textContent=time.toFixed(2)+' s';
}
function tick(){const now=Date.now();if(playing){time+=Math.min(.05,Math.max(0,now-last)/1000)*.65;if(time>ranges[clip.kind][1])time=ranges[clip.kind][0];}last=now;draw();requestAnimationFrame(tick);}requestAnimationFrame(tick);
addEventListener('resize',()=>renderer.setSize(innerWidth,Math.max(320,innerHeight-document.querySelector('header').offsetHeight)));
// Contact sheet uses the actual rendered rider, not illustrative replacement poses.
const audit=document.createElement('button');audit.textContent='Review hand contact sheet';header.append(audit);
const sheet=document.createElement('div');sheet.id='handSheet';sheet.style.cssText='position:fixed;inset:0;background:#20242d;overflow:auto;z-index:10;padding:12px;display:none';document.body.append(sheet);
audit.onclick=async()=>{
 playing=false;document.querySelector('#play').textContent='Replay motion';
 const keep={clip,time};sheet.replaceChildren();
 const close=document.createElement('button');close.textContent='Back to motion comparison';close.onclick=()=>sheet.style.display='none';sheet.append(close);
 const title=document.createElement('p');title.textContent=humans[1].name+' / '+humans[1].stance+'  -  actual poses: both hands, elbows, shoulders and feet';sheet.append(title);
 const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px';sheet.append(grid);
 for(const [kind,t,label]of [['release',1.05,'Rope release'],['release',2,'Free coast'],['speed',2,'Fast steady stance'],['ramp',.23,'Ramp preparation'],['ramp',.53,'Air balance'],['ramp',.90,'Landing absorption'],['load',5.5,'Sustained pull'],['brake',1.75,'Braking slack'],['takeup',.79,'Rope yank'],['slide',.98,'Left slide'],['slide-right',.98,'Right slide'],['slide',1.41,'Grip recovery'],['patch',.28,'Patch entry'],['patch',.8,'Patch exit']]){
  clip=clips.find(c=>c.kind===kind);time=t;
  for(let i=0;i<12;i++)draw();
  const c=document.createElement('canvas'),src=renderer.domElement;c.width=400;c.height=Math.round(400*src.height/(src.width/2));c.getContext('2d').drawImage(src,src.width/2,0,src.width/2,src.height,0,0,c.width,c.height);
  const figure=document.createElement('figure');figure.style.margin='0';const img=document.createElement('img');img.src=c.toDataURL();img.style.width='100%';const caption=document.createElement('figcaption');caption.textContent=label;figure.append(caption,img);grid.append(figure);
 }
 clip=keep.clip;time=keep.time;sheet.style.display='block';
};
