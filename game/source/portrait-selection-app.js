import {CanopyRoute} from './canopy179/route.mjs';
import {installCanopyArt} from './canopy179/art.js';
import {EveningScores} from './evening-scores174.mjs';
import {installSettings} from './settings173.js';
import {carrySecondHandHits} from './second-hand-rules167.mjs';
import {installSecondHandSky} from './second-hand-sky165.js';
import {installWoodland159} from './woodland159.js';
import {installWorldArt159} from './world-art159.js';
import {installEnvironment157} from './environment157.js';
import {installScrapGrind} from './scrap-grind152.js';
import {installSecretGold} from './secret-gold151.js';
import {installSecretSpliff} from './secret-spliff-art149.js';
import {installWorld145} from './world145/art.js';
import {installGrindRails} from './spot142/rails.js';
import {installSpotArt} from './spot142/art.js';
import {installSurfaceWear} from './world141/surface-wear.js';
import {installSkateArea} from './skating139/area.js';
import {createScoreHud} from './hud137/score.js';
import {installSiteDetails} from './console135/site-details.js';
import {installWorldLook} from './console135/world-look.js';
import {installFallLab} from './motion135/lab.mjs';
import * as T from './vendor/three.module.js';
import {shareStaticVertices} from './static-geometry.js';
import {finishPavement} from './curb-profile.js';
import {installRideable} from './rideable.js';
import {warmNeighborhood} from './environment103/neighborhood.js';
import {installGround} from './ground.js';
import {RAMP,PATCHES,at,station,rideRoadDetails} from './road-details.js';
import {warmCrash} from './crash-limbs.js';
import {EveningClock} from './evening-clock.js';
import {MotionFrame} from './motion-frame.js';
import {createPerformanceRecorder} from './performance-recorder.js';
import {MemorySound} from './memory-sound.js';
import {Ride,STEP} from './physics.js';
import {Gestures} from './input.js';
import {FOOTPATH,height} from './world.js';
import {ENTRY_LENGTH,RIDERS,BOARDS,CUL_START,LENGTH,roadPoints,heading,route,throatPolygon,bulb,pixel,ROAD_HALF,SCALE,clamp} from './world.js';
const $=id=>document.getElementById(id),root=$('game');
if(new URLSearchParams(location.search).has('phone-study'))root.style.maxWidth='calc(100dvh * .555)';
let ready=false,launchRemaining=0,impactHold=false,impactHeld=false,impactEdge='entry',dynamicsScenario=null;
let view,sim,active=false,paused=false,last=0,accumulator=0,selection={stance:'GOOFY',rider:'DOG',board:'LONGBOARD',rope:.45,pace:1,seed:8,start:-10},hintUntil=0,lastLap=0,finishedShown=false;
const trickReview=location.hostname==='127.0.0.1'&&new URLSearchParams(location.search).has('trick-review');
const replay=new URLSearchParams(location.search).has('replay');const dev=new URLSearchParams(location.search).has('debug');$('debug').hidden=!dev;
function revealScene(){document.documentElement.classList.remove('boot-loading');$('boot-screen')?.setAttribute('hidden','');root.inert=false;root.setAttribute('aria-busy','false');}
function fail(e){revealScene();$('errorText').textContent='The game couldnÃ¢â‚¬â„¢t load. Please reload or open it in Chrome or Safari.';$('error').hidden=false;if(location.hostname==='127.0.0.1')$('errorText').textContent=e.stack||String(e);console.error(e);}
window.addEventListener('error',e=>fail(e.error));window.addEventListener('unhandledrejection',e=>fail(e.reason));
try{const saved=JSON.parse(localStorage.getItem('track-03-selection')||'null');if(saved&&(RIDERS[saved.rider]||saved.rider==='SPRAD')&&BOARDS[saved.board])selection={...selection,...saved,rope:clamp(Number(saved.rope)||0,0,1),pace:Number.isFinite(Number(saved.pace))?clamp(Number(saved.pace),.6,1.82):1};}catch{}
selection.seed=crypto.getRandomValues(new Uint32Array(1))[0];
selection.start=-10;selection.stance=selection.stance==='REGULAR'?'REGULAR':'GOOFY';
const evening=new EveningClock(),eveningScores=new EveningScores();
// Returning through the browser history starts a fresh evening, like reopening the game.
window.addEventListener('pageshow',e=>{if(e.persisted)location.reload();});
const sound=new MemorySound(),profiler=createPerformanceRecorder(),motion=new MotionFrame();
const canopyFade=document.createElement('div');canopyFade.id='canopyFade';canopyFade.style='position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:30';root.append(canopyFade);
const canopyNotice=document.createElement('div');canopyNotice.id='canopyNotice';canopyNotice.setAttribute('role','status');canopyNotice.style='position:absolute;top:20%;left:5%;right:5%;text-align:center;color:white;font:clamp(22px,4vw,40px) TrackMarker, sans-serif;pointer-events:none;z-index:31;opacity:0';root.append(canopyNotice);
let canopyNoticeTime=0;
function discoveryChime(){if(!sound.enabled||!sound.ctx||document.hidden)return;const a=sound.ctx;for(const [i,hz]of [523.25,659.25,783.99].entries()){const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+i*.09;o.type='triangle';o.frequency.value=hz;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.055,t+.012);g.gain.exponentialRampToValueAtTime(.001,t+.30);o.connect(g).connect(sound.master);o.start(t);o.stop(t+.32);o.onended=()=>{o.disconnect();g.disconnect();};}}
const canopyRoute=new CanopyRoute(null,{
 found:sound.albums.available('secret-mixtape'),
 onSwap:()=>{if(!view||!sim)return;view.camPos=null;view.camHeading=sim.rider.heading;view.freeRideView={blend:sim.rider.holding?0:1,heading:sim.rider.heading};motion.reset(sim);keys.clear();gesture.reset();},
 onReward:()=>{sound.albums.discoverSecretMixtape();canopyNotice.textContent='SECRET MIXTAPE FOUND';canopyNoticeTime=4;discoveryChime();},
 onEvent:key=>{const sample={plank:'wood',can:'metal',lumber:'wood',starter:'load',barrier:'scrape'}[key];if(sample)sound.shot(sample,key==='starter'?.065:.13,key==='barrier'?.65:1,0,1);}
});

function unlockAmbience(){if(ready&&sound.enabled)sound.start(active&&!paused);}
document.addEventListener('pointerdown',unlockAmbience,{passive:true});document.addEventListener('keydown',unlockAmbience);
function hint(text,seconds=5){$('hint').textContent=text;hintUntil=performance.now()+seconds*1000;}
const gesture=new Gestures({isHolding:()=>sim?.rider.holding??true,trick:kind=>{if(active&&!paused&&!canopyRoute.busy&&launchRemaining<=0)sim.performTrick(kind);},release:()=>{if(active&&!paused&&!canopyRoute.busy&&launchRemaining<=0&&sim.release())hint('',0);},ollie:()=>{if(active&&!paused&&!canopyRoute.busy&&launchRemaining<=0)sim.ollie();}});
const riderChoices=[...Object.keys(RIDERS),'SPRAD'],boardChoices=Object.keys(BOARDS);
for(const [kind,choices]of [['rider',riderChoices],['board',boardChoices]]){const slider=$(kind+'Slider');slider.max=choices.length-1;$(kind+'Stops').innerHTML=choices.map((_,i)=>'<i style="left:'+100*i/(choices.length-1)+'%"></i>').join('');slider.oninput=()=>{if(active)return;const choice=choices[Number(slider.value)];if(choice&&selection[kind]!==choice){selection[kind]=choice;updateSelection();}};}
function syncChoice(kind,choices,label){const i=choices.indexOf(selection[kind]),fraction=i/(choices.length-1),slider=$(kind+'Slider');slider.value=i;slider.setAttribute('aria-valuetext',label);$(kind+'Name').style.setProperty('--stop',fraction);}
// Compile the selected riding meshes while the loading screen is still present.
// The selection stage hides these meshes, so menu-only compilation misses them.
async function warmSelectedRide(){
 view.human.releaseInactiveRiders();await warmCrash(view);
 const riderVisible=view.rider.visible,boardVisible=view.board.visible;
 view.rider.visible=true;view.board.visible=true;
 if(view.renderer.compileAsync)await view.renderer.compileAsync(view.scene,view.camera);
 view.draw(sim,0,{},false);
 if(view.renderer.compileAsync)await view.renderer.compileAsync(view.memoryShadows.scene,view.memoryShadows.camera);
 view.rider.visible=riderVisible;view.board.visible=boardVisible;
 view.camPos=null;view.draw(sim,0,{},true);
}
function warmSelectionChange(){
 ready=false;$('start').disabled=true;root.inert=true;root.setAttribute('aria-busy','true');
 document.documentElement.classList.add('boot-loading');$('boot-screen')?.removeAttribute('hidden');
 // Yield so the loading indicator is painted before geometry preparation.
 requestAnimationFrame(()=>warmSelectedRide().then(()=>{ready=true;revealScene();$('start').disabled=selection.rider==='SPRAD';}).catch(fail));
}
function updateSelection(){$('start').disabled=!ready||selection.rider==='SPRAD';syncChoice('rider',riderChoices,selection.rider);syncChoice('board',boardChoices,BOARDS[selection.board].label);const o=selection;$('riderName').textContent=o.rider;$('driverName').textContent=(o.rider==='DOG'?'SALLY':'DOG')+'Ã¢â‚¬â„¢S DRIVING';$('boardName').textContent=BOARDS[o.board].label;$('rope').value=o.rope*100;$('pace').value=o.pace*100;$('pace').setAttribute('aria-valuetext',o.pace===1?'Normal pace':Math.round(o.pace*100)+' percent of normal pace');
 const cv=$('boardPreview'),c=cv.getContext('2d');c.clearRect(0,0,220,44);const b=BOARDS[o.board],w=b.length*155;c.fillStyle=o.board==='CRUISER'?'#b77158':o.board==='STREET'?'#8d9da0':'#bcab7e';c.beginPath();c.roundRect((220-w)/2,13,w,17,[9]);c.fill();c.strokeStyle='#32424c';c.lineWidth=3;c.beginPath();c.moveTo((220-w)/2+19,8);c.lineTo((220-w)/2+19,35);c.moveTo((220+w)/2-19,8);c.lineTo((220+w)/2-19,35);c.stroke();
 const previousRider=view?.human?.name,previousBoard=view?.assetBoardKey;
 if(view){sim=canopyRoute.attach(view.hazards.attach(eveningScores.bind(new Ride({...selection,rider:selection.rider==='SPRAD'?'DOG':selection.rider}))));view.setSelection(selection);view.consoleWorldLook?.refresh();view.camPos=null;if(ready&&(previousRider!==view.human.name||previousBoard!==view.assetBoardKey))warmSelectionChange();}try{localStorage.setItem('track-03-selection',JSON.stringify(selection));}catch{}
}

$('rope').oninput=e=>{selection.rope=Number(e.target.value)/100;updateSelection();};
$('pace').oninput=e=>{selection.pace=Number(e.target.value)/100;updateSelection();};
function start(options={}){if(!view||!ready||selection.rider==='SPRAD')return;launchRemaining=active?0:1.05;selection.seed++;view.skating=null;view.riderFall=null;sim=canopyRoute.attach(view.hazards.attach(eveningScores.bind(new Ride({...selection,...options}))));view.setSelection(selection);view.consoleWorldLook?.refresh();view.camPos=null;view.camHeading=sim.car.heading;active=true;paused=false;finishedShown=false;accumulator=0;lastLap=0;gesture.reset();root.classList.add('playing');$('toolbar').hidden=false;$('panel').hidden=true;$('instructions').hidden=true;$('lapMessage').textContent='';$('scene').focus();sound.start(true);$('hint').textContent='';}
$('start').onclick=()=>start();
const scoreDisplay=createScoreHud(root),scoreHud=scoreDisplay.scoreHud;
function updateTrickHud(){scoreDisplay.update(sim,active,selection);$('minimalPause').hidden=!active||paused||!root.classList.contains('hud-off')||['ended','regroup'].includes(sim.phase);}
function showPanel(kind){$('pauseHow').hidden=kind!=='pause';$('panel').hidden=false;$('panel').classList.toggle('quiet',kind!=='pause');const cfg=kind==='pause'?['','Paused','','Resume']:['',sim.gateExit?'Run complete':'Wipeout','','Another run'];$('panelKicker').textContent=cfg[0];$('panelTitle').textContent=cfg[1];$('panelBody').textContent=cfg[2];$('resume').textContent=cfg[3];$('restart').textContent='Back to the car';$('hint').textContent='';}
function pauseRide(){if(!active||paused||sim.phase==='ended')return;paused=true;keys.clear();touch.clear();gesture.reset();showPanel('pause');}
 scoreHud.onclick=()=>{if(paused)$('resume').click();else pauseRide();};scoreHud.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();scoreHud.click();}};
$('resume').onclick=()=>{if(paused){paused=false;last=0;accumulator=0;$('panel').hidden=true;return;}if(sim.phase==='ended'){const previous=sim,s=sim.restartS??sim.car.s,time=sim.time;start({start:s});sim.time=time;carrySecondHandHits(previous,sim);if(previous.area==='canopy')canopyRoute.place(sim,'canopy',0);lastLap=sim.laps=Math.floor(s/LENGTH);}else if(sim.phase==='regroup'){const previous=sim,s=sim.car.s,time=sim.time;start({start:s});sim.time=time;carrySecondHandHits(previous,sim);if(previous.area==='canopy')canopyRoute.place(sim,'canopy',0);lastLap=sim.laps=Math.floor(s/LENGTH);}};
$('restart').onclick=()=>{canopyRoute.leave();active=false;paused=false;gesture.reset();root.classList.remove('playing');$('panel').hidden=true;$('toolbar').hidden=true;$('hint').textContent='';updateSelection();};
const settings=installSettings({root,sound,getStance:()=>selection.stance,setStance:value=>{
 selection.stance=value;
 if(active){view.human.setStance(value);sim.options.stance=value;if(view.chosen)view.chosen.stance=value;try{localStorage.setItem('track-03-selection',JSON.stringify(selection));}catch{}}
 else updateSelection();
}});
$('how').onclick=()=>settings.open();$('pauseHow').onclick=()=>settings.open();$('minimalPause').onclick=pauseRide;
const canvas=$('scene');canvas.addEventListener('pointerdown',e=>{if(!active||paused||canopyRoute.busy||launchRemaining>0||e.button>0)return;canvas.setPointerCapture(e.pointerId);gesture.down(e.pointerId,e.clientX,e.clientY,performance.now());});canvas.addEventListener('pointermove',e=>{if(active&&!paused)gesture.move(e.pointerId,e.clientX,e.clientY,performance.now());});canvas.addEventListener('pointerup',e=>gesture.up(e.pointerId,performance.now()));canvas.addEventListener('pointercancel',e=>gesture.cancel(e.pointerId));canvas.addEventListener('lostpointercapture',e=>gesture.cancel(e.pointerId));canvas.addEventListener('contextmenu',e=>e.preventDefault());
const keys=new Set(),touch=new Set();
window.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(e.target.closest?.('input,select,textarea')||(k!=='escape'&&e.target.closest?.('button,a')))return;if(['arrowleft','arrowright','arrowup','a','d','w','s','e','x','z','m','g','b',' ','escape'].includes(k)){e.preventDefault();if(k==='escape'){if(!$('instructions').hidden){$('closeHow').click();return;}if(paused)$('resume').click();else pauseRide();return;}if(!active||paused||canopyRoute.busy||launchRemaining>0)return;keys.add(k);if(k==='x'&&!e.repeat)sim.performTrick('kickflip');if((k==='arrowup'||k==='e')&&!e.repeat)gesture.actions.release();}});
window.addEventListener('keyup',e=>{const k=e.key.toLowerCase();if(k===' '&&keys.has(k)&&active&&!paused&&!canopyRoute.busy)sim.ollie();keys.delete(k);});
document.addEventListener('visibilitychange',()=>{last=0;if(document.hidden)pauseRide();sound.radio?.sync(sound.enabled&&!document.hidden);});
window.addEventListener('blur',()=>{keys.clear();touch.clear();gesture.reset();});
window.addEventListener('resize',()=>{keys.clear();touch.clear();gesture.reset();view?.resize();});
$('lab').onclick=()=>start({start:CUL_START-45});$('stress').onclick=()=>start({start:CUL_START-60,speedFactor:1.7});
function debug(){if(!dev)return;const ctx=$('map').getContext('2d'),sx=p=>(p.x+175)*1.12,sz=p=>(p.z+55)*1.12;ctx.fillStyle='#152332';ctx.fillRect(0,0,340,390);const trace=(ps,close)=>{ctx.beginPath();ps.forEach((p,i)=>i?ctx.lineTo(sx(p),sz(p)):ctx.moveTo(sx(p),sz(p)));if(close)ctx.closePath();};ctx.lineWidth=ROAD_HALF*2*1.12;ctx.strokeStyle='#818c90';trace(roadPoints,true);ctx.stroke();ctx.fillStyle='#818c90';trace(throatPolygon,true);ctx.fill();ctx.beginPath();ctx.arc(sx(bulb),sz(bulb),bulb.r*1.12,0,7);ctx.fill();ctx.strokeStyle='#cdb279';ctx.lineWidth=1;trace(route,true);ctx.stroke();for(const [p,color]of [[sim.car,'#fc7954'],[sim.rider,'#faf3d9']]){ctx.fillStyle=color;ctx.beginPath();ctx.arc(sx(p),sz(p),3,0,7);ctx.fill();}$('telemetry').textContent=`${sim.phase} Ã‚ /  ${sim.driver} driving\nlap ${sim.laps+1} Ã‚ /  ${sim.car.speed.toFixed(2)} m/s\nrope ${sim.rope.toFixed(2)} m Ã‚ /  pull ${sim.rider.tension.toFixed(2)} m/sÃ‚Â²\nwobble ${sim.rider.wobble.toFixed(2)} Ã‚ /  ${view.renderer.info.render.calls} draws`;}
function frame(t){if(!ready){last=t;requestAnimationFrame(frame);return;}try{if(trickReview&&active&&sim.phase==='riding'&&sim.time-(sim.rider.trickStart??-5)>3)sim.ollie();profiler?.begin(t,active&&!paused?sim.phase:'inactive');const elapsed=last?(t-last)/1000:0;const dt=Math.min(elapsed,.1);const launching=launchRemaining>0;if(active&&!document.hidden)launchRemaining=Math.max(0,launchRemaining-dt);canopyRoute.advance(active&&!paused&&!document.hidden?dt:0,sim);if(canopyNoticeTime>0&&!paused)canopyNoticeTime-=dt;canopyNotice.style.opacity=active&&canopyNoticeTime>0?String(Math.min(1,canopyNoticeTime)):"0";canopyFade.style.opacity=active&&!paused?String(canopyRoute.fade(sim)):"0";evening.advance(elapsed,active&&!paused&&!canopyRoute.busy&&!launching&&!document.hidden&&!['ended','regroup'].includes(sim.phase));last=t;gesture.tick(t);const input={...gesture.state};if(keys.has('arrowleft')||keys.has('a')||touch.has('left'))input.steer=-.7;if(keys.has('arrowright')||keys.has('d')||touch.has('right'))input.steer=.7;if(keys.has(' ')||touch.has('jump'))input.crouch=true;input.push=!!input.push||keys.has('w');input.brake=!!input.brake||keys.has('s');input.manual=false;input.grind=gesture.secondary!=null||keys.has('g')||keys.has('b');input.boardslide=keys.has('b')||(gesture.secondary!=null&&Math.abs(input.steer)>.35);if(['crashed','ended'].includes(sim.phase))gesture.reset();if(replay){input.steer=Math.sin(sim.time*.6)*.18;input.crouch=false;}if(dynamicsScenario){input.steer=sim.time>.30&&sim.time<1.05?(dynamicsScenario==='slide'?.9:dynamicsScenario==='slide-right'?-.9:0):0;input.crouch=false;}
 if(active&&!paused&&!canopyRoute.busy&&!launching&&!document.hidden){accumulator+=dt;while(accumulator>=STEP&&!canopyRoute.busy){if(replay)input.steer=Math.sin(sim.time*.6)*.18;if(dynamicsScenario)input.steer=sim.time>.30&&sim.time<1.05?(dynamicsScenario==='slide'?.9:dynamicsScenario==='slide-right'?-.9:0):0;if(dynamicsScenario==='release'&&sim.time>=.8&&sim.rider.holding)sim.release();const oldCanopyPoint={x:sim.rider.x,z:sim.rider.z};motion.step(sim,input);canopyRoute.afterStep(sim,oldCanopyPoint,STEP);accumulator-=STEP;if(canopyRoute.busy)accumulator=0;}if(sim.laps>lastLap){lastLap=sim.laps;$('lapMessage').textContent='AROUND AGAIN';setTimeout(()=>{$('lapMessage').textContent='';},3500);}if(['ended','regroup'].includes(sim.phase)&&!finishedShown){finishedShown=true;showPanel(sim.phase);}}
 if(impactHold&&!impactHeld&&active){const e=['load','brake','release','speed'].includes(dynamicsScenario)?{time:dynamicsScenario==='load'?5.39:dynamicsScenario==='release'?1.09:dynamicsScenario==='speed'?1.89:1.64}:dynamicsScenario?(dynamicsScenario==='takeup'?sim.rider.towCatchEvent:sim.rider.gripCatchEvent):sim.rider.rideLanding??sim.hazardEvents?.find(e=>e.kind==='PATCH'&&(e.edge??'entry')===impactEdge);if(e&&sim.time-e.time>=.11){paused=true;impactHeld=true;document.getElementById('responsePause').textContent='Resume';}}
 updateTrickHud();profiler?.simulated();if(t>hintUntil)$('hint').textContent='';view.evening=evening;view.draw(motion.sample(sim,active&&!paused&&!canopyRoute.busy?accumulator/STEP:1),dt,input,!active);profiler?.drawn();sound.update(sim,active&&!paused&&!canopyRoute.busy&&!document.hidden,view,!active&&ready&&!document.hidden);profiler?.end(active,paused,sim.phase,sim);if(dev)debug();requestAnimationFrame(frame);}catch(e){fail(e);}}
try{const importStart=performance.now();const {View}=await import('./portrait-selection-view.js');profiler?.stage('moduleReadyMs',performance.now());const buildStart=performance.now();view=new View(canvas);installGround(view);finishPavement(view);installWorldLook(view);installSiteDetails(view);view.consoleWorldLook.refresh();shareStaticVertices(view);installRideable(view);installSkateArea(view);installSurfaceWear(view);installSpotArt(view);installGrindRails(view);installScrapGrind(view);installWorld145(view);installEnvironment157(view);installWoodland159(view);installWorldArt159(view);installSecretSpliff(view);installSecretGold(view);installSecondHandSky(view);canopyRoute.trackHazards=view.hazards;installCanopyArt(view,canopyRoute);view.consoleWorldLook.refresh();if(location.hostname==='127.0.0.1'&&new URLSearchParams(location.search).has('verify95'))window.verify95={canopyRoute,sound,view,Ride,RAMP,at,rideRoadDetails,start,reset:()=>motion.reset(sim),gesture,get sim(){return sim},stop:()=>{paused=true}};profiler?.stage('sceneConstructionMs',performance.now()-buildStart);if(replay)selection={...selection,rider:'SALLY',board:'LONGBOARD',rope:.26,pace:1.2,seed:52};if(trickReview)selection={...selection,rider:'BLACK',board:'STREET',rope:.45,pace:.8};updateSelection();view.evening=evening;
 const review=new URLSearchParams(location.search).get('evening');if(review!==null)evening.seconds=Math.max(0,Math.min(600,Number(review)||0));
 if(new URLSearchParams(location.search).has('lighting-review')){const ui=document.createElement('div');ui.style='position:fixed;top:8px;left:8px;z-index:999;background:#132036;padding:10px;color:#fff';ui.innerHTML='<label>Evening study <input aria-label="Evening preview time" type="range" min="0" max="600" step="1" value="'+evening.seconds+'"></label><output></output>';document.body.append(ui);const slider=ui.querySelector('input'),out=ui.querySelector('output');const update=()=>{evening.seconds=Number(slider.value);out.textContent=Math.round(evening.seconds)+' / 600 seconds';};slider.oninput=update;update();}

 // Establish the actual selected meshes, shadow casters and finishing material
 // before compiling, so their first use during riding does not compile shaders.
 const warmStart=performance.now();await warmCrash(view);view.scene.updateMatrixWorld(true);if(view.renderer.compileAsync)await view.renderer.compileAsync(view.scene,view.camera);view.draw(sim,0,{},true);if(view.renderer.compileAsync){await view.renderer.compileAsync(view.memoryShadows.scene,view.memoryShadows.camera);await view.renderer.compileAsync(view.finish.scene,view.finish.camera);}profiler?.stage('warmupMs',performance.now()-warmStart);await warmSelectedRide();profiler?.stage('firstPreviewMs',performance.now());await new Promise(requestAnimationFrame);view.draw(sim,0,{},true);await warmNeighborhood(view,sim);view.draw(sim,0,{},true);profiler?.ready(view);ready=true;revealScene();sound.start(false,false);$('start').disabled=selection.rider==='SPRAD';if(trickReview){start({rider:'BLACK',board:'STREET',rope:.45,pace:.8,seed:52});}else if(replay){start({rider:'SALLY',board:'LONGBOARD',rope:.26,pace:1.2,seed:52});}installImpactReview();installCrewReview();if(new URLSearchParams(location.search).has('motion'))installFallLab({view,start:()=>{start({start:40});launchRemaining=0;motion.reset(sim);},getSim:()=>sim,pause:v=>paused=v,reset:()=>motion.reset(sim)});requestAnimationFrame(frame);}catch(e){fail(e);}

if(location.hostname==='127.0.0.1'&&new URLSearchParams(location.search).has('wipeout-review')){const b=document.createElement('button');b.textContent='Test wipeout';b.style.cssText='position:fixed;top:12px;right:12px;z-index:9999';b.onclick=()=>{if(active&&sim?.phase==='riding')sim.crash('WIPEOUT REVIEW');};document.body.append(b);}

// Isolated prototype controls: absent from normal gameplay.
function installImpactReview(){
 if(!new URLSearchParams(location.search).has('impact-review')&&!new URLSearchParams(location.search).has('dynamics-review')||document.getElementById('impactReviewBar'))return;
 const bar=document.createElement('div');bar.id='impactReviewBar';bar.style='position:fixed;top:5px;left:5px;z-index:999;background:#17222ddb;color:#fff;padding:8px;font:13px system-ui;max-width:90vw';
 bar.innerHTML='<b>Impacts 130</b> <a style="color:#ffe1b5" href="../falls130-study/">Open Before / After comparison</a> <button data-fall="WOBBLE">Hip slide</button> <button data-fall="GRATE">Shoulder roll</button> <button data-fall="TRIP">Slow trip</button> <button data-fall="CAR">Backward fall</button> <button data-motion="slide">Slide and catch</button> <button data-motion="slide-right">Opposite slide</button> <button data-motion="takeup">Rope take-up</button> <button data-motion="release">Release and coast</button> <button data-motion="speed">Speed posture</button> <button data-motion="load">Sustained pull</button> <button data-motion="brake">Braking slack</button> <button data-kind="ramp">Ride ramp</button> <button data-kind="patch">Ride patch</button> <button data-kind="exit">Ride patch exit</button> <button id="responsePause">Pause</button> <label><input id="responseEnabled" type="checkbox" checked>Body response</label><label><input id="impactHold" type="checkbox" checked>Pause at impact</label><div id="responseReadout"></div>';
 document.body.append(bar);impactHold=true;bar.querySelector('#impactHold').onchange=e=>impactHold=e.target.checked;
 for(const button of bar.querySelectorAll('[data-fall]'))button.onclick=()=>{dynamicsScenario=null;start({start:40});launchRemaining=0;impactHeld=true;const r=sim.rider;const speed=button.dataset.fall==='TRIP'?2:button.dataset.fall==='GRATE'?9:7;sim.car.speed=7;Object.assign(r,{vx:speed*Math.cos(r.heading),vz:speed*Math.sin(r.heading),lean:.3});sim.crash(button.dataset.fall);motion.reset(sim);view.camPos=null;};
 for(const button of bar.querySelectorAll('[data-kind]'))button.onclick=()=>{dynamicsScenario=null;impactEdge=button.dataset.kind==='exit'?'exit':'entry';const ramp=button.dataset.kind==='ramp',f=ramp?RAMP:PATCHES[0],p=at(f,ramp?0:f.u,ramp?-3:f.v-4);selection={...selection,rider:'SALLY',board:'LONGBOARD'};start({start:station(f)+18});launchRemaining=0;impactHeld=false;bar.querySelector('#responsePause').textContent='Pause';sim.phase='coasting';Object.assign(sim.rider,p,{holding:false,heading:f.h,vx:7*f.co,vz:7*f.si});sim.car.speed=7.3;motion.reset(sim);view.camPos=null;};
 for(const button of bar.querySelectorAll('[data-motion]'))button.onclick=()=>{dynamicsScenario=button.dataset.motion;selection={...selection,rider:'SALLY',board:'HANDMEDOWN',rope:.44};start({start:dynamicsScenario==='brake'?300:40});launchRemaining=0;impactHeld=false;bar.querySelector('#responsePause').textContent='Pause';if(['brake','release','speed'].includes(dynamicsScenario)){sim.car.speed=8;Object.assign(sim.rider,{vx:8*Math.cos(sim.rider.heading),vz:8*Math.sin(sim.rider.heading)});}if(['slide','slide-right'].includes(dynamicsScenario)){sim.phase='coasting';sim.rider.holding=false;sim.car.speed=7;Object.assign(sim.rider,{vx:7*Math.cos(sim.rider.heading),vz:7*Math.sin(sim.rider.heading)});}motion.reset(sim);view.camPos=null;};
 bar.querySelector('#responsePause').onclick=()=>{paused=!paused;bar.querySelector('#responsePause').textContent=paused?'Resume':'Pause';};
 bar.querySelector('#responseEnabled').onchange=e=>view.responseDisabled=!e.target.checked;
 const info=bar.querySelector('#responseReadout');let lastInfo=0;function status(t){if(t-lastInfo>100){lastInfo=t;const a=view.human.rideResponse;info.textContent=`${sim.time.toFixed(2)} s  /  ${a?.kind??'steady'}  /  ${Math.round((a?.compression??0)*100)}% absorb / ${Math.round(Math.abs(a?.slide??0)*100)}% slide / ${Math.round((a?.yank??0)*100)}% pull /  ${sim.phase}`;}requestAnimationFrame(status);}requestAnimationFrame(status);
}

if(new URLSearchParams(location.search).has('freeride-review')){
 const bar=document.createElement('div');bar.style='position:fixed;top:5px;left:5px;z-index:999;background:#17222ddd;color:white;padding:10px;font:14px system-ui';bar.innerHTML='<b>Free ride 128</b> <button id="freeRoad">Release on road</button> <button id="freePath">Footpath downhill</button> <button id="freeStop">Test slow finish</button> <button id="freePause">Pause</button><div id="freeReadout"></div>';document.body.append(bar);
 document.querySelector('#freeRoad').onclick=()=>{selection={...selection,rider:'DOG',board:'LONGBOARD'};start({start:40});launchRemaining=0;sim.car.speed=8;Object.assign(sim.rider,{vx:8*Math.cos(sim.rider.heading),vz:8*Math.sin(sim.rider.heading)});sim.release();motion.reset(sim);};
 document.querySelector('#freePath').onclick=()=>{selection={...selection,rider:'DOG',board:'LONGBOARD'};start({start:40});launchRemaining=0;let a=FOOTPATH[3],b=FOOTPATH[4];if(height(a.x,a.z)<height(b.x,b.z))[a,b]=[b,a];const dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz),h=Math.atan2(dz,dx);sim.release();Object.assign(sim.rider,{x:a.x+dx*.20,z:a.z+dz*.20,heading:h,vx:dx/l*3,vz:dz/l*3,height:0,up:0,dirt:false});sim.car.speed=8;motion.reset(sim);view.camPos=null;view.camHeading=h;view.freeRideView={time:sim.time,heading:h,blend:1};};
 document.querySelector('#freeStop').onclick=()=>{start({start:40});launchRemaining=0;sim.release();sim.rider.vx=0;sim.rider.vz=0;motion.reset(sim);};
 document.querySelector('#freePause').onclick=()=>{paused=!paused;document.querySelector('#freePause').textContent=paused?'Resume':'Pause';};
 setInterval(()=>{if(!sim)return;const r=sim.rider;document.querySelector('#freeReadout').textContent=`${sim.phase} | ${(Math.hypot(r.vx,r.vz)*2.23694).toFixed(1)} mph | paved ${view.hazards.rideable(r.x,r.z)} | camera ${(view.freeRideView?.blend??0).toFixed(2)} | ${sim.stats.crashReason??'no crash'} | audio ${sound.ctx?.state??'pending'} | radio ${sound.radio?.media.paused?'paused':'playing'} ${sound.radio?.media.currentTime.toFixed(1)??0}s | wind ${sound.loops.wind?.gain.gain.value.toFixed(3)??0} | ${sound.radio?.error??''}`;},200);
}

function installCrewReview(){
 if(!new URLSearchParams(location.search).has('crew-review'))return;
 const bar=document.createElement('div');bar.style='position:fixed;top:6px;left:6px;z-index:9999;padding:10px;background:#17222df0;color:white;font:14px system-ui';bar.innerHTML='<b>Car crew 129</b> <label>Riding <select id="crewRider"><option>DOG</option><option>SALLY</option><option>BLACK</option><option>BOSS</option></select></label> <button data-angle="driver">Driver side</button> <button data-angle="passenger">Passenger side</button> <button data-angle="front">Windshield</button> <button id="crewDrive">Play / pause</button><div id="crewAudit"></div>';document.body.append(bar);
 let angle='driver';const stage=view.stageSelection.bind(view);
 view.stageSelection=(sim,dt,menu)=>{stage(sim,dt,menu);if(menu)return;const p=angle==='driver'?[-3.5,1.45,.25]:angle==='passenger'?[3.5,1.45,.25]:[0,1.5,-4.2];view.car.updateWorldMatrix(true,true);view.camera.position.copy(view.car.localToWorld(new T.Vector3(...p)));view.camera.lookAt(view.car.localToWorld(new T.Vector3(0,1.05,.22)));view.sky.position.copy(view.camera.position);};
 const choose=()=>{selection.rider=bar.querySelector('select').value;start({start:40});launchRemaining=0;paused=true;};bar.querySelector('select').onchange=choose;for(const b of bar.querySelectorAll('[data-angle]'))b.onclick=()=>angle=b.dataset.angle;bar.querySelector('#crewDrive').onclick=()=>paused=!paused;
 setInterval(()=>{const crew=view.crewMoment;if(!crew?.seats)return;let triangles=0;for(const p of [crew.driver,crew.sprad,crew.friend,crew.other])p?.traverse(o=>{if(o.isMesh&&o.visible)triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;});bar.querySelector('#crewAudit').textContent=Object.entries(crew.seats).map(([seat,name])=>seat+': '+name).join(' | ')+' | '+Math.round(triangles)+' passenger triangles';},300);choose();
}
