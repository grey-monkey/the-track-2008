(() => {
'use strict';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { alpha: false });
const setup = document.getElementById('setup');
const rideBtn = document.getElementById('rideBtn');
const restartBtn = document.getElementById('restartBtn');
const setupBtn = document.getElementById('setupBtn');
const ropeSlider = document.getElementById('ropeSlider');
const statusEl = document.getElementById('status');
const debugEl = document.getElementById('debug');

const TAU = Math.PI * 2;
const clamp = (v,a,b) => Math.max(a, Math.min(b,v));
const lerp = (a,b,t) => a + (b-a)*t;
const len = (x,y) => Math.hypot(x,y);
const wrapAngle = a => { while (a > Math.PI) a -= TAU; while (a < -Math.PI) a += TAU; return a; };
const angleLerp = (a,b,t) => a + wrapAngle(b-a)*t;
const mph = fps => fps * 0.681818;

// ---------- Prototype setup ----------
const riders = {
  DOG:   { turn: .96, stability: .92, ollie: false, highSpeedControl: .58 },
  SALLY: { turn: 1.12, stability: 1.00, ollie: true,  highSpeedControl: .94 },
  BLACK: { turn: 1.02, stability: 1.02, ollie: true,  highSpeedControl: .90 },
  BOSS:  { turn: .98, stability: 1.04, ollie: true,  highSpeedControl: .90 },
};
const boards = {
  'NICE LONGBOARD': { turn: .88, stability: 1.22, ollie: false, pop: 0 },
  'CRUISER / SURFER': { turn: 1.08, stability: .94, ollie: true, pop: 10.2 },
  'HAND-ME-DOWN': { turn: .92, stability: .98, ollie: false, pop: 0 },
  'STREET DECK': { turn: 1.15, stability: .84, ollie: true, pop: 11.2 },
};
const tests = ['FULL LAP', 'CUL-DE-SAC'];
let selection = { rider: 'DOG', board: 'NICE LONGBOARD', test: 'CUL-DE-SAC' };

function makeChips(rootId, values, key) {
  const root = document.getElementById(rootId);
  values.forEach(v => {
    const b = document.createElement('button');
    b.className = 'chip' + (selection[key] === v ? ' active' : '');
    b.textContent = v;
    b.addEventListener('click', () => {
      selection[key] = v;
      [...root.children].forEach(x => x.classList.toggle('active', x === b));
    });
    root.appendChild(b);
  });
}
makeChips('riders', Object.keys(riders), 'rider');
makeChips('boards', Object.keys(boards), 'board');
makeChips('tests', tests, 'test');

// ---------- Track ----------
// Feet, intentionally simplified from Grey's annotated aerial. Shape and section rhythm matter more than survey accuracy in 0.1.
const control = [
  {x: 0, y: 320}, {x:-18,y:278}, {x:-37,y:220}, {x:-55,y:158}, {x:-72,y:105},
  {x:-82,y:72},
  // Open asphalt cul-de-sac / bulb, ~150 ft working diameter.
  {x:-122,y:58}, {x:-151,y:22}, {x:-151,y:-22}, {x:-123,y:-58}, {x:-78,y:-75},
  {x:-32,y:-58}, {x:-7,y:-22}, {x:-12,y:20}, {x:-34,y:53},
  // Lower flat connector.
  {x:20,y:69}, {x:78,y:83}, {x:137,y:104},
  // Slight downhill while travelling this section.
  {x:181,y:134}, {x:211,y:180}, {x:225,y:231}, {x:224,y:268},
  // Back uphill toward start / flat.
  {x:211,y:309}, {x:184,y:347}, {x:143,y:374}, {x:96,y:387}, {x:51,y:374}, {x:17,y:348},
  {x:0,y:320}
];

function catmull(p0,p1,p2,p3,t) {
  const t2=t*t, t3=t2*t;
  return {
    x: .5*((2*p1.x)+(-p0.x+p2.x)*t+(2*p0.x-5*p1.x+4*p2.x-p3.x)*t2+(-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
    y: .5*((2*p1.y)+(-p0.y+p2.y)*t+(2*p0.y-5*p1.y+4*p2.y-p3.y)*t2+(-p0.y+3*p1.y-3*p2.y+p3.y)*t3)
  };
}

let raw=[];
const pts = control.slice(0,-1);
for (let i=0;i<pts.length;i++) {
  const p0=pts[(i-1+pts.length)%pts.length], p1=pts[i], p2=pts[(i+1)%pts.length], p3=pts[(i+2)%pts.length];
  for (let j=0;j<18;j++) raw.push(catmull(p0,p1,p2,p3,j/18));
}
// Arc-length table.
let track=[]; let totalS=0;
for (let i=0;i<raw.length;i++) {
  const prev = raw[(i-1+raw.length)%raw.length];
  if (i>0) totalS += Math.hypot(raw[i].x-prev.x, raw[i].y-prev.y);
  const next=raw[(i+1)%raw.length];
  const ang=Math.atan2(next.y-prev.y,next.x-prev.x);
  track.push({x:raw[i].x,y:raw[i].y,s:totalS,ang});
}
const closing = Math.hypot(track[0].x-track[track.length-1].x, track[0].y-track[track.length-1].y);
const TRACK_LEN = totalS + closing;

function sNorm(s) { s %= TRACK_LEN; if (s<0) s += TRACK_LEN; return s; }
function sampleAtS(s) {
  s=sNorm(s);
  let lo=0, hi=track.length-1;
  while (lo<hi) { const mid=(lo+hi)>>1; if (track[mid].s < s) lo=mid+1; else hi=mid; }
  let i=lo;
  if (i===0 && s > track[track.length-1].s) i=track.length-1;
  const a=track[i===0?track.length-1:i-1], b=track[i];
  let as=a.s, bs=b.s;
  if (i===0) { as=track[track.length-1].s; bs=TRACK_LEN; if (s < track[0].s+1) s += TRACK_LEN; }
  const t=clamp((s-as)/Math.max(.001,bs-as),0,1);
  const ang=angleLerp(a.ang,b.ang,t);
  return {x:lerp(a.x,b.x,t), y:lerp(a.y,b.y,t), ang, s:sNorm(s)};
}
function nearestTrack(x,y) {
  let best=Infinity, bi=0;
  for (let i=0;i<track.length;i++) {
    const dx=x-track[i].x, dy=y-track[i].y, d=dx*dx+dy*dy;
    if (d<best) { best=d; bi=i; }
  }
  const p=track[bi];
  const nx=-Math.sin(p.ang), ny=Math.cos(p.ang);
  const signed=(x-p.x)*nx+(y-p.y)*ny;
  return {dist:Math.sqrt(best), signed, s:p.s, ang:p.ang, index:bi};
}
function nearestSForPoint(x,y) { return nearestTrack(x,y).s; }
const CULDE_START_S = nearestSForPoint(-72,120);

// Fixed obstacles. These are prototype placements, not claims about exact historical positions.
const manholes = [
  {s: sNorm(CULDE_START_S-55), lateral: 2},
  {s: sNorm(CULDE_START_S+260), lateral: -4},
  {s: sNorm(CULDE_START_S+525), lateral: 3}
];

// ---------- Game state ----------
const ROAD_HALF = 14.5;
let W=0,H=0,DPR=1;
let running=false, ended=false, lastTime=0, elapsed=0, runStart=0;
let car, rider, looseBoard, input, camera, lapBase=0, lastLap=0, releaseTime=0;
let ropeLength=14;
let audio=null;
let debug = new URLSearchParams(location.search).has('debug');
if (debug) debugEl.classList.remove('hidden');

function resize() {
  DPR=Math.min(2, window.devicePixelRatio||1);
  W=innerWidth; H=innerHeight;
  canvas.width=Math.round(W*DPR); canvas.height=Math.round(H*DPR);
  ctx.setTransform(DPR,0,0,DPR,0,0);
}
addEventListener('resize', resize, {passive:true}); resize();

function configRope() { ropeLength = lerp(8,25, Number(ropeSlider.value)/100); }

function startRun() {
  configRope();
  setup.classList.remove('show'); restartBtn.classList.add('hidden'); setupBtn.classList.add('hidden');
  ended=false; running=true; elapsed=0; runStart=performance.now(); releaseTime=0;
  const startS = selection.test === 'CUL-DE-SAC' ? sNorm(CULDE_START_S-115) : 0;
  const cp=sampleAtS(startS);
  const carHeading=cp.ang;
  car={s:startS, distance:0, speed: selection.test==='CUL-DE-SAC'?31:25, x:cp.x,y:cp.y,ang:carHeading,lateral:0, targetLat:0, brake:0, seed:Math.random()*10};
  const rearX=car.x-Math.cos(carHeading)*7, rearY=car.y-Math.sin(carHeading)*7;
  rider={
    x:rearX-Math.cos(carHeading)*(ropeLength-.8), y:rearY-Math.sin(carHeading)*(ropeLength-.8),
    vx:Math.cos(carHeading)*car.speed, vy:Math.sin(carHeading)*car.speed, heading:carHeading,
    z:0,vz:0,wobble:0,holding:true,crashed:false,crashSpin:0, roadPrev:0,
    tension:0, dirt:false
  };
  looseBoard=null;
  const behind=14;
  camera={x:rider.x-Math.cos(carHeading)*behind,y:rider.y-Math.sin(carHeading)*behind,heading:carHeading};
  input={active:false,id:null,startX:0,startY:0,lastX:0,lastY:0,lastT:0,steer:0,crouch:false,downAt:0,moved:0,minVy:0};
  lapBase=Math.floor(startS/TRACK_LEN); lastLap=0;
  initAudio();
  toast(selection.test==='CUL-DE-SAC'?'CUL-DE-SAC TEST':'FULL LAP', 1000);
}

function resetRun(){ startRun(); }
function backToSetup(){ running=false; ended=false; setup.classList.add('show'); restartBtn.classList.add('hidden'); setupBtn.classList.add('hidden'); stopAudio(); }
rideBtn.addEventListener('click', startRun);
restartBtn.addEventListener('click', resetRun);
setupBtn.addEventListener('click', backToSetup);

function toast(txt, ms=900) {
  statusEl.textContent=txt; statusEl.classList.add('show');
  clearTimeout(toast.t); toast.t=setTimeout(()=>statusEl.classList.remove('show'),ms);
}

// ---------- Pointer / keyboard controls ----------
function pos(e){ return {x:e.clientX,y:e.clientY}; }
canvas.addEventListener('pointerdown', e => {
  if (!running || ended || rider.crashed) return;
  e.preventDefault(); canvas.setPointerCapture?.(e.pointerId);
  const p=pos(e); input.active=true; input.id=e.pointerId; input.startX=p.x; input.startY=p.y; input.lastX=p.x; input.lastY=p.y; input.lastT=performance.now(); input.downAt=input.lastT; input.moved=0; input.steer=0; input.crouch=false;
});
canvas.addEventListener('pointermove', e => {
  if (!input?.active || e.pointerId!==input.id) return;
  e.preventDefault(); const p=pos(e); const now=performance.now();
  const dx=p.x-input.startX, dy=p.y-input.startY;
  input.moved=Math.max(input.moved,Math.hypot(dx,dy));
  input.steer=clamp(dx/Math.max(62,W*.22),-1,1);
  const segDt=Math.max(8,now-input.lastT)/1000;
  input.minVy=Math.min(input.minVy,(p.y-input.lastY)/segDt);
  if (now-input.downAt>150 && dy>-42) input.crouch=true;
  input.lastX=p.x; input.lastY=p.y; input.lastT=now;
});
function endPointer(e) {
  if (!input?.active || e.pointerId!==input.id) return;
  e.preventDefault(); const p=pos(e), now=performance.now();
  const dy=p.y-input.startY, dt=Math.max(16,now-input.lastT), vy=(p.y-input.lastY)/(dt/1000);
  const held=Math.max(1,now-input.downAt);
  const avgVy=dy/(held/1000);
  const throwRope = dy < -Math.max(48,H*.055) && Math.min(vy,avgVy,input.minVy) < -250;
  if (throwRope) releaseRope();
  else if (input.crouch && held>240) tryOllie();
  input.active=false; input.steer=0; input.crouch=false;
}
canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', e=>{ if(input){input.active=false;input.steer=0;input.crouch=false;} });

const keys={};
addEventListener('keydown',e=>{
  keys[e.key]=true;
  if (e.key==='ArrowUp' && running) releaseRope();
  if (e.key===' ' && running) { e.preventDefault(); tryOllie(); }
  if ((e.key==='r'||e.key==='R') && running) resetRun();
});
addEventListener('keyup',e=>keys[e.key]=false);

function releaseRope(){
  if (!rider?.holding || rider.crashed) return;
  rider.holding=false; rider.tension=0; releaseTime=elapsed; input.active=false; input.steer=0; input.crouch=false;
  toast('ROPE THROWN',700);
  tensionPulse();
}
function canOllie(){ return riders[selection.rider].ollie && boards[selection.board].ollie; }
function tryOllie(){
  if (!running || rider.crashed || rider.z>.03 || !canOllie()) return;
  rider.vz=boards[selection.board].pop; rider.z=.02;
  softPulse();
}

// ---------- Audio (procedural placeholder, no external files) ----------
function initAudio(){
  if (audio) { audio.ctx.resume?.(); return; }
  try {
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    const ac=new AC();
    const master=ac.createGain(); master.gain.value=.14; master.connect(ac.destination);
    const buffer=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate); const d=buffer.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*.55;
    const src=ac.createBufferSource(); src.buffer=buffer; src.loop=true;
    const filter=ac.createBiquadFilter(); filter.type='bandpass'; filter.frequency.value=850; filter.Q.value=.7;
    const wheel=ac.createGain(); wheel.gain.value=.02;
    src.connect(filter); filter.connect(wheel); wheel.connect(master); src.start();
    const osc=ac.createOscillator(); osc.type='triangle'; osc.frequency.value=62;
    const eng=ac.createGain(); eng.gain.value=.035; osc.connect(eng); eng.connect(master); osc.start();
    const hum=ac.createOscillator(); hum.type='sine'; hum.frequency.value=145;
    const tg=ac.createGain(); tg.gain.value=0; hum.connect(tg); tg.connect(master); hum.start();
    audio={ctx:ac,master,wheel,filter,osc,eng,hum,tg};
  } catch(_){}
}
function stopAudio(){ if(audio?.ctx?.state==='running') audio.ctx.suspend?.(); }
function updateAudio(){
  if(!audio||!rider) return;
  const sp=len(rider.vx,rider.vy);
  audio.filter.frequency.setTargetAtTime(lerp(500,1600,clamp(sp/55,0,1)),audio.ctx.currentTime,.06);
  audio.wheel.gain.setTargetAtTime(rider.crashed?.06:lerp(.015,.065,clamp(sp/50,0,1)),audio.ctx.currentTime,.05);
  audio.osc.frequency.setTargetAtTime(54+car.speed*1.45,audio.ctx.currentTime,.08);
  audio.tg.gain.setTargetAtTime(rider.holding?rider.tension*.045:0,audio.ctx.currentTime,.04);
}
function softPulse(){ if(navigator.vibrate) navigator.vibrate(9); }
function tensionPulse(){ if(navigator.vibrate) navigator.vibrate(12); }

// ---------- Physics ----------
function roadZone(s) {
  const p=sampleAtS(s);
  if (p.x>130 && p.y>95 && p.y<275) return 'down';
  if (p.y>270 && p.x>-5) return 'up';
  return 'flat';
}
function curvatureAt(s) {
  const a=sampleAtS(s-12).ang, b=sampleAtS(s+12).ang;
  return Math.abs(wrapAngle(b-a))/24;
}
function driverLateral(t, s) {
  const curvSign = wrapAngle(sampleAtS(s+18).ang-sampleAtS(s).ang);
  const setupWide = clamp(-curvSign*65,-4.0,4.0);
  const human = 1.4*Math.sin(t*.41+car.seed)+.8*Math.sin(t*.17+car.seed*2.1);
  return clamp(setupWide+human,-5.2,5.2);
}
function update(dt) {
  elapsed=(performance.now()-runStart)/1000;
  if(!running) return;

  if(!rider.crashed && !ended) {
    // Car: deliberately human, variable, imperfect.
    const zone=roadZone(car.s); const curv=curvatureAt(car.s+15);
    let target=34 + 2.0*Math.sin(elapsed*.23+car.seed) + 1.0*Math.sin(elapsed*.71);
    if(zone==='down') target+=3.2;
    if(zone==='up') target-=2.4;
    target-=clamp(curv*95,0,6.0);
    if(selection.test==='CUL-DE-SAC' && elapsed<1.5) target-=2;
    if(car.brake>0) { target=10; car.brake-=dt; }
    car.speed += clamp(target-car.speed,-5*dt,3.5*dt);
    car.distance += car.speed*dt;
    car.s=sNorm(car.s+car.speed*dt);
    car.targetLat=driverLateral(elapsed,car.s);
    car.lateral += (car.targetLat-car.lateral)*(1-Math.exp(-dt*1.0));
    const cp=sampleAtS(car.s); car.ang=cp.ang;
    const cnx=-Math.sin(cp.ang), cny=Math.cos(cp.ang);
    car.x=cp.x+cnx*car.lateral; car.y=cp.y+cny*car.lateral;

    // Controls.
    let steer=input?.active?input.steer:0;
    if(keys.ArrowLeft) steer=-1; if(keys.ArrowRight) steer=1;
    if(input?.active && performance.now()-input.downAt>150 && input.lastY-input.startY>-42) input.crouch=true;
    const crouch=!!(input?.crouch||keys.ArrowDown);
    const sp=Math.max(1,len(rider.vx,rider.vy));
    const rCfg=riders[selection.rider], bCfg=boards[selection.board];
    const speedT=clamp((sp-20)/30,0,1);
    let controlAtSpeed=lerp(1,.63,speedT);
    if(selection.rider==='DOG') controlAtSpeed*=lerp(1,rCfg.highSpeedControl,speedT);
    const yawRate=1.22*rCfg.turn*bCfg.turn*controlAtSpeed;
    rider.heading += steer*yawRate*dt;

    // Surface + traction.
    const near=nearestTrack(rider.x,rider.y);
    const absRoad=Math.abs(near.signed); const wasRoad=rider.roadPrev<=ROAD_HALF;
    rider.dirt=absRoad>ROAD_HALF;
    const grip=rider.dirt?1.15:4.1;
    const fx=Math.cos(rider.heading), fy=Math.sin(rider.heading), rx=-fy, ry=fx;
    let fwd=rider.vx*fx+rider.vy*fy, lat=rider.vx*rx+rider.vy*ry;
    lat*=Math.exp(-grip*dt*(crouch?1.16:1));
    rider.vx=fx*fwd+rx*lat; rider.vy=fy*fwd+ry*lat;

    // Rolling resistance, much worse in clay/dirt.
    const drag=rider.dirt?.78:.035;
    const dragMul=Math.exp(-drag*dt);
    rider.vx*=dragMul; rider.vy*=dragMul;

    // Grade is subtle; towing remains dominant.
    const zoneR=roadZone(near.s); const gradeA=zoneR==='down'?1.0:zoneR==='up'?-.75:0;
    rider.vx+=Math.cos(near.ang)*gradeA*dt; rider.vy+=Math.sin(near.ang)*gradeA*dt;

    // Rope spring-damper.
    let lateralLoad=0;
    if(rider.holding) {
      const rearX=car.x-Math.cos(car.ang)*7, rearY=car.y-Math.sin(car.ang)*7;
      const dx=rearX-rider.x, dy=rearY-rider.y, dist=Math.max(.001,len(dx,dy));
      const nx=dx/dist, ny=dy/dist;
      const carVx=Math.cos(car.ang)*car.speed, carVy=Math.sin(car.ang)*car.speed;
      const rel=(carVx-rider.vx)*nx+(carVy-rider.vy)*ny;
      const stretch=Math.max(0,dist-ropeLength);
      let acc=stretch*10.5+Math.max(0,rel)*1.7;
      acc=clamp(acc,0,70);
      if(stretch>0 || rel>1) { rider.vx+=nx*acc*dt; rider.vy+=ny*acc*dt; }
      rider.tension=clamp(acc/48,0,1);
      const velAng=Math.atan2(rider.vy,rider.vx);
      lateralLoad=Math.abs(Math.sin(wrapAngle(Math.atan2(dy,dx)-velAng)))*rider.tension;
    } else rider.tension+=(0-rider.tension)*(1-Math.exp(-dt*8));

    // Vertical / ollie.
    if(rider.z>0 || rider.vz>0) {
      rider.vz-=32.2*dt; rider.z+=rider.vz*dt;
      if(rider.z<=0){ rider.z=0; if(rider.vz<-7) rider.wobble+=.10; rider.vz=0; softPulse(); }
    }

    // Wobble: readable, recoverable, but not fake.
    const speedRisk=clamp((sp-25)/25,0,1);
    let gain=(Math.abs(steer)*speedRisk*.22 + lateralLoad*.64);
    if(rider.dirt) gain+=.78;
    gain/=Math.max(.65,rCfg.stability*bCfg.stability);
    if(crouch) gain*=.52;
    rider.wobble += gain*dt;
    rider.wobble -= (crouch?.48:.28)*rCfg.stability*bCfg.stability*dt;
    rider.wobble=clamp(rider.wobble,0,1.3);

    // Curbs. New residential curb = serious consequence.
    if(wasRoad && absRoad>ROAD_HALF && rider.z<.28 && sp>9) {
      const shallow=Math.abs(Math.sin(wrapAngle(Math.atan2(rider.vy,rider.vx)-near.ang)));
      if(sp>20 || shallow>.2) crash('CURB'); else rider.wobble+=.5;
    }
    rider.roadPrev=absRoad;

    // Manholes.
    if(rider.z<.16 && !rider.dirt) {
      for(const m of manholes) {
        const mp=sampleAtS(m.s), mnx=-Math.sin(mp.ang),mny=Math.cos(mp.ang);
        const mx=mp.x+mnx*m.lateral,my=mp.y+mny*m.lateral;
        if(Math.hypot(rider.x-mx,rider.y-my)<2.2) {
          rider.wobble+=.16+Math.abs(steer)*.12; softPulse();
        }
      }
    }
    if(rider.wobble>1.02) crash('WOBBLE');

    // Cap absurd numerical explosions while keeping big slingshots possible.
    const nsp=len(rider.vx,rider.vy);
    if(nsp>62){ rider.vx*=62/nsp; rider.vy*=62/nsp; }
    rider.x+=rider.vx*dt; rider.y+=rider.vy*dt;

    // Clean release ends after a few seconds of coasting; in final game the car would circle/stop naturally.
    if(!rider.holding && elapsed-releaseTime>4.3) endRun('COASTED OUT');

    // Lap indicator.
    const lap=Math.floor(car.distance/TRACK_LEN);
    if(lap>lastLap){lastLap=lap;toast(`${lap} ${lap===1?'LAP':'LAPS'}`,900);}
  }

  if(rider.crashed) {
    // Simple crash continuation: body and board separate, car brakes.
    const drag=Math.exp(-(rider.dirt?.9:.36)*dt);
    rider.vx*=drag; rider.vy*=drag; rider.x+=rider.vx*dt; rider.y+=rider.vy*dt; rider.crashSpin+=dt*(4+len(rider.vx,rider.vy)*.08);
    if(looseBoard){looseBoard.vx*=Math.exp(-.28*dt);looseBoard.vy*=Math.exp(-.28*dt);looseBoard.x+=looseBoard.vx*dt;looseBoard.y+=looseBoard.vy*dt;looseBoard.spin+=dt*7;}
    if(elapsed-rider.crashAt>2.6 && !ended) endRun('WIPEOUT');
  }

  // Camera: follows rider, but does not snap. Stable horizon > racing-game shake.
  const sp=len(rider.vx,rider.vy);
  const desiredHeading = sp>3?Math.atan2(rider.vy,rider.vx):nearestTrack(rider.x,rider.y).ang;
  camera.heading=angleLerp(camera.heading,desiredHeading,1-Math.exp(-dt*2.2));
  const behind=14;
  const tx=rider.x-Math.cos(camera.heading)*behind, ty=rider.y-Math.sin(camera.heading)*behind;
  camera.x+= (tx-camera.x)*(1-Math.exp(-dt*5.0)); camera.y+=(ty-camera.y)*(1-Math.exp(-dt*5.0));

  updateAudio();
}

function crash(reason){
  if(rider.crashed) return;
  rider.crashed=true; rider.holding=false; rider.crashAt=elapsed; rider.crashReason=reason; car.brake=3;
  looseBoard={x:rider.x,y:rider.y,vx:rider.vx*1.08+Math.cos(rider.heading)*2,vy:rider.vy*1.08+Math.sin(rider.heading)*2,spin:0};
  rider.vx*=.88; rider.vy*=.88; rider.wobble=1.2;
  if(navigator.vibrate) navigator.vibrate([22,35,36]);
  toast(reason==='CURB'?'CURB.':'NOPE.',650);
}
function endRun(label){
  ended=true; running=true; restartBtn.classList.remove('hidden'); setupBtn.classList.remove('hidden'); toast(label,1800);
}

// ---------- Rendering ----------
function dayT(){ return clamp(elapsed/145,0,1); }
function mixRGB(a,b,t){return [Math.round(lerp(a[0],b[0],t)),Math.round(lerp(a[1],b[1],t)),Math.round(lerp(a[2],b[2],t))];}
function rgb(c,a=1){return `rgba(${c[0]},${c[1]},${c[2]},${a})`;}
function skyColors(){
  const t=dayT();
  if(t<.42){const u=t/.42;return [mixRGB([144,169,182],[92,119,143],u),mixRGB([230,174,125],[215,130,96],u)];}
  if(t<.72){const u=(t-.42)/.30;return [mixRGB([92,119,143],[40,55,80],u),mixRGB([215,130,96],[87,80,104],u)];}
  const u=(t-.72)/.28;return [mixRGB([40,55,80],[12,17,29],u),mixRGB([87,80,104],[24,27,39],u)];
}
function project(x,y,z=0){
  const dx=x-camera.x, dy=y-camera.y;
  const c=Math.cos(camera.heading),s=Math.sin(camera.heading);
  const forward=dx*c+dy*s, right=-dx*s+dy*c;
  const camH=6.4, pitch=.17, cp=Math.cos(pitch),sp=Math.sin(pitch), zr=z-camH;
  const depth=forward*cp+zr*sp;
  if(depth<1.2) return null;
  const vert=zr*cp-forward*sp;
  const focal=H*.82;
  return {x:W*.5+right/depth*focal,y:H*.40-vert/depth*focal,depth,scale:focal/depth};
}
function groundPalette(){
  const t=dayT();
  return {
    clay: rgb(mixRGB([122,82,57],[40,41,44],t*.9)),
    road: rgb(mixRGB([47,50,52],[22,25,30],t*.82)),
    curb: rgb(mixRGB([188,184,171],[92,91,91],t*.8)),
    woods: rgb(mixRGB([45,67,53],[12,19,20],clamp(t*1.2,0,1))),
  };
}
function render(){
  const sc=skyColors(), pal=groundPalette();
  const grad=ctx.createLinearGradient(0,0,0,H*.78); grad.addColorStop(0,rgb(sc[0])); grad.addColorStop(1,rgb(sc[1])); ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);

  // Distant woods silhouette + raw clay foreground.
  const horizon=H*.42;
  ctx.fillStyle=pal.woods; ctx.beginPath(); ctx.moveTo(0,horizon+24);
  for(let x=0;x<=W;x+=18){const yy=horizon+7+Math.sin(x*.055)*7+Math.sin(x*.13)*3;ctx.lineTo(x,yy);}ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.fill();
  ctx.fillStyle=pal.clay;ctx.fillRect(0,horizon+48,W,H);

  // Road quads from far to near.
  const nr=nearestTrack(rider?.x||0,rider?.y||320); const baseS=nr.s;
  const samples=[];
  for(let d=-20;d<=290;d+=6){
    const p=sampleAtS(baseS+d),nx=-Math.sin(p.ang),ny=Math.cos(p.ang);
    samples.push({d,p,
      l:project(p.x+nx*ROAD_HALF,p.y+ny*ROAD_HALF,0),
      r:project(p.x-nx*ROAD_HALF,p.y-ny*ROAD_HALF,0),
      lo:project(p.x+nx*(ROAD_HALF+1.15),p.y+ny*(ROAD_HALF+1.15),.15),
      ro:project(p.x-nx*(ROAD_HALF+1.15),p.y-ny*(ROAD_HALF+1.15),.15)
    });
  }
  for(let i=samples.length-2;i>=0;i--){
    const a=samples[i],b=samples[i+1]; if(!a.l||!a.r||!b.l||!b.r) continue;
    // Curbs first, then asphalt.
    ctx.fillStyle=pal.curb;
    if(a.lo&&b.lo){ctx.beginPath();ctx.moveTo(a.lo.x,a.lo.y);ctx.lineTo(a.l.x,a.l.y);ctx.lineTo(b.l.x,b.l.y);ctx.lineTo(b.lo.x,b.lo.y);ctx.closePath();ctx.fill();}
    if(a.ro&&b.ro){ctx.beginPath();ctx.moveTo(a.r.x,a.r.y);ctx.lineTo(a.ro.x,a.ro.y);ctx.lineTo(b.ro.x,b.ro.y);ctx.lineTo(b.r.x,b.r.y);ctx.closePath();ctx.fill();}
    ctx.fillStyle=pal.road;ctx.beginPath();ctx.moveTo(a.l.x,a.l.y);ctx.lineTo(a.r.x,a.r.y);ctx.lineTo(b.r.x,b.r.y);ctx.lineTo(b.l.x,b.l.y);ctx.closePath();ctx.fill();
  }

  drawTrackFurniture(baseS);
  drawManholes();
  drawRopeAndActors();

  // Subtle darkening at night, preserving amber/red points.
  const night=clamp((dayT()-.70)/.30,0,1);
  if(night>0){const vg=ctx.createRadialGradient(W*.5,H*.55,H*.08,W*.5,H*.55,H*.72);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,`rgba(0,0,0,${night*.32})`);ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);}

  if(debug && rider){
    const n=nearestTrack(rider.x,rider.y);
    debugEl.textContent=`${selection.rider} / ${selection.board}\n${mph(len(rider.vx,rider.vy)).toFixed(1)} mph\nrope ${(ropeLength).toFixed(1)} ft (hidden)\ntension ${rider.tension.toFixed(2)}\nwobble ${rider.wobble.toFixed(2)}\nroad ${Math.abs(n.signed).toFixed(1)} ft\n${rider.holding?'TOWED':'RELEASED'}${rider.dirt?' / DIRT':''}`;
  }
}
function drawTrackFurniture(baseS){
  const night=clamp((dayT()-.55)/.45,0,1);
  for(let d=25;d<280;d+=72){
    const p=sampleAtS(baseS+d), side=((Math.floor((baseS+d)/72)%2)*2-1), nx=-Math.sin(p.ang),ny=Math.cos(p.ang);
    const gx=p.x+nx*(ROAD_HALF+7)*side, gy=p.y+ny*(ROAD_HALF+7)*side;
    const b=project(gx,gy,0), top=project(gx,gy,15);
    if(!b||!top||b.depth>260) continue;
    ctx.strokeStyle=`rgba(35,34,32,${.75-night*.2})`;ctx.lineWidth=clamp(1.1*b.scale,1,4);ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(top.x,top.y);ctx.stroke();
    if(night>.05){const r=clamp(28*b.scale,3,24);const g=ctx.createRadialGradient(top.x,top.y,0,top.x,top.y,r);g.addColorStop(0,`rgba(255,194,91,${.55*night})`);g.addColorStop(1,'rgba(255,180,70,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(top.x,top.y,r,0,TAU);ctx.fill();}
  }
}
function drawManholes(){
  for(const m of manholes){
    const p=sampleAtS(m.s),nx=-Math.sin(p.ang),ny=Math.cos(p.ang), q=project(p.x+nx*m.lateral,p.y+ny*m.lateral,.03); if(!q||q.depth>220)continue;
    const r=clamp(q.scale*1.4,2,28);ctx.fillStyle='rgba(23,25,26,.82)';ctx.beginPath();ctx.ellipse(q.x,q.y,r,r*.35,0,0,TAU);ctx.fill();ctx.strokeStyle='rgba(130,132,129,.35)';ctx.stroke();
  }
}
function drawRopeAndActors(){
  if(!rider)return;
  // Rope behind bumper to hands.
  const rearX=car.x-Math.cos(car.ang)*7,rearY=car.y-Math.sin(car.ang)*7;
  const carP=project(rearX,rearY,1.65), handP=project(rider.x,rider.y,rider.z+3.0);
  if(carP&&handP&&rider.holding){
    const slack=clamp(1-rider.tension,0,1);
    const mx=(carP.x+handP.x)/2, my=(carP.y+handP.y)/2+slack*12;
    ctx.strokeStyle=`rgba(221,207,166,${.74+.2*rider.tension})`;ctx.lineWidth=clamp(1.1*handP.scale,1.2,3.2);ctx.beginPath();ctx.moveTo(carP.x,carP.y);ctx.quadraticCurveTo(mx,my,handP.x,handP.y);ctx.stroke();
  }
  drawCar();
  if(looseBoard) drawBoard(looseBoard.x,looseBoard.y,0,looseBoard.spin,true);
  drawRider();
}
function drawCar(){
  const p=project(car.x,car.y,0); if(!p)return;
  const s=clamp(p.scale,2.5,16), w=6.1*s, h=3.1*s;
  ctx.save();ctx.translate(p.x,p.y-h*.62);
  // Gray-box W124-ish rear, deliberately simple.
  ctx.fillStyle='rgba(12,13,14,.97)';ctx.beginPath();ctx.moveTo(-w*.50,h*.45);ctx.lineTo(-w*.43,-h*.42);ctx.lineTo(-w*.27,-h*.72);ctx.lineTo(w*.27,-h*.72);ctx.lineTo(w*.43,-h*.42);ctx.lineTo(w*.50,h*.45);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(54,65,70,.72)';ctx.fillRect(-w*.27,-h*.58,w*.54,h*.28);
  const brake=rider?.crashed||car.brake>0; const glow=brake?.98:.72;
  ctx.fillStyle=`rgba(214,46,35,${glow})`;ctx.fillRect(-w*.43,h*.02,w*.20,h*.19);ctx.fillRect(w*.23,h*.02,w*.20,h*.19);
  if(dayT()>.64){ctx.shadowBlur=16;ctx.shadowColor='rgba(230,40,35,.75)';ctx.fillStyle='rgba(225,48,37,.86)';ctx.fillRect(-w*.40,h*.05,w*.14,h*.12);ctx.fillRect(w*.26,h*.05,w*.14,h*.12);ctx.shadowBlur=0;}
  ctx.strokeStyle='rgba(195,197,192,.55)';ctx.lineWidth=Math.max(1,s*.14);ctx.beginPath();ctx.moveTo(-w*.46,h*.31);ctx.lineTo(w*.46,h*.31);ctx.stroke();
  ctx.restore();
}
function drawBoard(x,y,z,spin=0,loose=false){
  const p=project(x,y,z+.18);if(!p)return; const s=clamp(p.scale,2,16), L=(selection.board==='NICE LONGBOARD'?3.5:selection.board==='HAND-ME-DOWN'?3.2:selection.board==='CRUISER / SURFER'?2.55:2.6)*s, ww=.78*s;
  ctx.save();ctx.translate(p.x,p.y);ctx.rotate((loose?spin:wrapAngle(rider.heading-camera.heading))*.25);ctx.fillStyle='rgba(87,74,59,.95)';ctx.fillRect(-ww/2,-L/2,ww,L);ctx.fillStyle='rgba(18,18,18,.9)';ctx.fillRect(-ww*.58,-L*.36,ww*1.16,Math.max(1,s*.12));ctx.fillRect(-ww*.58,L*.30,ww*1.16,Math.max(1,s*.12));ctx.restore();
}
function drawRider(){
  const p=project(rider.x,rider.y,rider.z);if(!p)return; const s=clamp(p.scale,2.4,17); const crouch=!!input?.crouch && !rider.crashed;
  drawBoard(rider.x,rider.y,rider.z,0,false);
  ctx.save();ctx.translate(p.x,p.y);ctx.rotate(rider.crashed?rider.crashSpin*.35:wrapAngle(rider.heading-camera.heading)*.18 + Math.sin(elapsed*21)*rider.wobble*.06);
  const bodyH=(crouch?3.5:4.5)*s;
  const lean=(input?.steer||0)*.16 + rider.wobble*Math.sin(elapsed*28)*.11;
  ctx.rotate(lean);
  ctx.strokeStyle='rgba(225,218,204,.96)';ctx.lineWidth=clamp(.22*s,2,6);ctx.lineCap='round';
  // legs
  ctx.beginPath();ctx.moveTo(-.25*s,-.35*s);ctx.lineTo(-.48*s,-1.55*s);ctx.lineTo(-.35*s,-2.05*s);ctx.moveTo(.25*s,-.35*s);ctx.lineTo(.46*s,-1.5*s);ctx.lineTo(.58*s,-2.0*s);ctx.stroke();
  // torso / arms
  ctx.strokeStyle=selection.rider==='DOG'?'rgba(39,42,45,.98)':selection.rider==='SALLY'?'rgba(30,31,34,.98)':selection.rider==='BLACK'?'rgba(69,69,66,.98)':'rgba(225,224,215,.95)';
  ctx.lineWidth=clamp(.45*s,3,9);ctx.beginPath();ctx.moveTo(0,-1.8*s);ctx.lineTo(0,-bodyH*.78);ctx.stroke();
  ctx.strokeStyle='rgba(225,218,204,.96)';ctx.lineWidth=clamp(.18*s,2,5);ctx.beginPath();ctx.moveTo(0,-bodyH*.58);ctx.lineTo(-.65*s,-bodyH*.47);ctx.moveTo(0,-bodyH*.58);ctx.lineTo(.65*s,-bodyH*.47);ctx.stroke();
  // head
  ctx.fillStyle='rgba(202,174,145,.98)';ctx.beginPath();ctx.arc(0,-bodyH*.92,.42*s,0,TAU);ctx.fill();
  ctx.restore();
}

// ---------- Loop ----------
function frame(t){
  if(!lastTime)lastTime=t; let dt=(t-lastTime)/1000;lastTime=t;dt=clamp(dt,0,.033);
  if(running&&!ended) update(dt); else if(running&&rider?.crashed) update(dt);
  if(rider) render(); else { // atmospheric placeholder behind setup
    const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#708698');g.addColorStop(.55,'#bd8a70');g.addColorStop(1,'#1a2021');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

if('serviceWorker' in navigator && location.protocol.startsWith('http')) addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
})();
