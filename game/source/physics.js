import {stepPintailDrift,driftSteering,driftTraction,driftSlipAllowance} from './pintail-drift169.mjs';
import {secondHandProtected} from './second-hand-rules167.mjs';
import {stepSecondHand} from './second-hand165.mjs';
import {detectGateExit,stepGateExit} from './gate-exit152.mjs';
import {riderGravity,collectSecretSpliff,flightTimeRemaining} from './secret-spliff149.mjs';
import {scorePowerslide} from './powerslide143.mjs';
import {tryGrind,stepGrind,exitGrind} from './spot142/grind.mjs';
import {bossSurfaceContact,riderSpeedWobble} from './character-rules140.js';
import {stepFlight,skateSlope} from './skating139/surface.js';
import {Driver} from './driving138/driver.js';
import {chooseFall} from './motion135/sequences.mjs';
import {fallMotion} from './motion131/fall-motion.mjs';
import {observeTravel} from './motion126/travel.mjs';
import {observeRideDynamics} from './motion126/dynamics.mjs';
import {carPath,carHeading,roadSlope,rideRoadDetails} from './road-details.js';
import {canTrick,ollieOutcome} from './trick-rules.js';
import {carCollision} from './car-collision.js';
import {BOARD_FEEL,SLIDE_INTENT,personalitySlide,TOW_FEEL,CARVE,carryCarveMomentum,ropePull} from './board-personalities.js';
import {bulbSpeedAllowance,sample,heading,curvature,height,roadDistance,clamp,mix,angle,LENGTH,RIDERS,BOARDS} from './world.js';
export const STEP=1/120;
// Rolling loss is shared whether towed or released; releasing is not braking.
export const COAST_FEEL=Object.freeze({roadResistance:.108,dirtResistance:1.35,airDrag:.007,restSpeed:.22352,restSeconds:.5});
export class Ride {
 constructor(options={}){this.options={rider:'DOG',board:'LONGBOARD',rope:.45,seed:8,...options};this.driver=this.options.rider==='DOG'?'SALLY':'DOG';this.rope=mix(2.44,7.62,this.options.rope);this.score=0;this.combo=null;this.lastCombo=null;this.time=0;this.phase='riding';this.phaseTime=0;this.laps=0;const pace=Number.isFinite(options.pace)?clamp(options.pace,.6,1.82):1;this.speedFactor=1.05*pace*(options.speedFactor??1);this.turnSpeedFactor=1.05*(pace<1?pace:1)*(options.speedFactor??1);this.driving=new Driver(this.options.seed,this.driver==='SALLY',this.speedFactor,this.turnSpeedFactor,this.rope+2.3+(options.trailMargin??1.5));this.car={s:options.start??0,speed:0,accel:0,brake:false};this.updateCarPosition();const c=this.car;this.rider={x:c.hx-Math.cos(c.heading)*(this.rope-.08),z:c.hz-Math.sin(c.heading)*(this.rope-.08),vx:0,vz:0,heading:c.heading,lean:0,wobble:0,tension:0,height:0,up:0,holding:true,dirt:false};this.prevRoad=roadDistance(this.rider.x,this.rider.z);this.stats={maxStretch:0,maxSpeed:0,maxStep:0,maxAhead:-Infinity,crashReason:null};}
 updateCarPosition(){const c=this.car,p=this.driving.sample(c.s);c.x=p.x;c.z=p.z;c.heading=p.heading;c.curvature=p.curvature;c.line=this.driving.index(c.s);c.hx=c.x-Math.cos(c.heading)*2.28;c.hz=c.z-Math.sin(c.heading)*2.28;}
 targetSpeed(){return this.driving.target(this.car.s);}

 release(){if(this.phase!=='riding'||!this.rider.holding)return false;this.rider.holding=false;this.rider.tension=0;this.phase='coasting';this.phaseTime=0;return true;}
 addTrick(kind){const value={ollie:50,kickflip:150,shoveit:120,manual:40,fiftyfifty:100,boardslide:200,powerslide:100}[kind]??0;if(!this.combo)this.combo={names:[],base:0,multiplier:0};this.combo.names.push(kind);this.combo.base+=value;this.combo.multiplier++;this.combo.landedAt=null;}
 ollie(kind='ollie'){
  const r=this.rider;if(this.gateExit||!['riding','coasting'].includes(this.phase)||!['ollie','kickflip','shoveit'].includes(kind))return false;
  if(r.grind)return kind==='ollie'?exitGrind(this,{pop:true}):false;
  const outcome=kind==='ollie'?ollieOutcome(this.options.rider,this.options.board):canTrick(this.options.rider,this.options.board,kind)&&!r.holding?'land':null;
  if(!outcome)return false;
  if(r.height>0||r.up>0){
   // A deliberate input just before touchdown is remembered, never an input from mid-flight.
   if(outcome==='land'&&!r.ollieMustBail&&r.up<0){const remaining=flightTimeRemaining(this);if(remaining<=.12){r.bufferedTrick={kind,until:this.time+.14};return true;}}
   return false;
  }
  r.airY=null;r.up={LONGBOARD:2.15,HANDMEDOWN:2.25,CRUISER:2.55,STREET:2.75}[this.options.board];r.trick=kind;r.trickStart=this.time;r.trickDuration=flightTimeRemaining(this,0,r.up);r.manual=false;r.pushStart=null;r.airStarted=this.time;r.airSource='ollie';r.ollieMustBail=outcome==='bail';r.bufferedTrick=null;
  if(!r.ollieMustBail)this.addTrick(kind);return true;
 }
 performTrick(kind){
  const r=this.rider;if(this.gateExit||r.grind||r.airSource==='secret-spliff')return false;if(!['kickflip','shoveit'].includes(kind)||!['riding','coasting'].includes(this.phase)||!canTrick(this.options.rider,this.options.board,kind)||r.holding||r.ollieMustBail)return false;
  if(r.height===0)return this.ollie(kind);
  if(r.up<-.7)return this.ollie(kind);
  if(r.trick!=='ollie'&&r.trick&&this.time-r.trickStart<.3)return false;
  this.addTrick(kind);r.trick=kind;r.trickStart=this.time;r.trickDuration=Math.max(.30,flightTimeRemaining(this));return true;
 }
 crash(reason,impactSpeed=0){if(secondHandProtected(this))return;if(this.phase==='crashed'||this.phase==='ended')return;if(this.combo){this.lastCombo={...this.combo,value:0,failed:true,time:this.time};this.combo=null;}this.rider.powerslide=null;this.rider.grind=null;this.rider.grindExit=null;this.rider.bufferedTrick=null;this.rider.ollieMustBail=false;this.restartS=this.car.s;this.phase='crashed';this.phaseTime=0;this.rider.holding=false;this.rider.tension=0;this.stats.crashReason=reason;this.rider.crashMotion={reason,impactSpeed,fallHeight:this.rider.height,verticalSpeed:this.rider.up,speed:Math.hypot(this.rider.vx,this.rider.vz),side:Math.sign(this.rider.lean||this.rider.steer||1),forwardSpeed:this.rider.vx*Math.cos(this.rider.heading)+this.rider.vz*Math.sin(this.rider.heading),lateralSpeed:-this.rider.vx*Math.sin(this.rider.heading)+this.rider.vz*Math.cos(this.rider.heading),heading:this.rider.heading,travelHeading:Math.atan2(this.rider.vz,this.rider.vx)};this.rider.pushStart=null;this.rider.manual=false;this.rider.recoverStart=null;this.rider.groundContactAt=null;this.rider.fallLift=Math.max(.10,this.rider.height+.12);this.rider.fallUp=Math.max(0,this.rider.up)*.35+.35;this.board={x:this.rider.x,z:this.rider.z,vx:this.rider.vx*1.06,vz:this.rider.vz*1.06,heading:this.rider.heading};}
 step(input={},dt=STEP){this.time+=dt;this.phaseTime+=dt;this.hazards?.tick(this,dt);collectSecretSpliff(this);stepSecondHand(this);if(this.phase==='crashed'){const r=this.rider;r.fallUp=(r.fallUp??0)-riderGravity(this)*dt;r.fallLift=Math.max(0,(r.fallLift??0)+r.fallUp*dt);if(!r.fallLift){r.fallUp=0;if(r.groundContactAt==null)r.groundContactAt=this.phaseTime;}}const previousCar={x:this.car.x,z:this.car.z,heading:this.car.heading};const c=this.car,r=this.rider,oldHx=c.hx,oldHz=c.hz,oldX=r.x,oldZ=r.z,oldHeading=r.heading,oldAirY=r.airY,oldHeight=r.height;
 // Free ride: the Mercedes continues its own route at normal straight/turn speeds.
 this.driving.advance(c,dt);this.laps=Math.floor(c.s/LENGTH);this.updateCarPosition();c.hvx=(c.hx-oldHx)/dt;c.hvz=(c.hz-oldHz)/dt;
 if(this.phase==='ended'||this.phase==='regroup')return;
 if(stepGateExit(this,dt))return;
 let sp=Math.hypot(r.vx,r.vz);const onRoad=roadDistance(r.x,r.z);r.dirt=!(this.hazards?.rideable?.(r.x,r.z)??onRoad<=0);
 if(this.phase==='crashed'){const oldR={x:r.x,z:r.z},oldB={x:this.board.x,z:this.board.z};const fall=fallMotion(this),drag=fall.dragPhase==='AIR'?.04:fall.dragPhase==='CONTACT'?7.5:fall.dragPhase==='SLIDE'?(r.dirt?2.6:1.25):2.1;const dec=Math.exp(-drag*dt);r.vx*=dec;r.vz*=dec;r.x+=r.vx*dt;r.z+=r.vz*dt;const b=this.board;b.vx*=Math.exp(-(.35+(this.phaseTime>2.4?1.6:0))*dt);b.vz*=Math.exp(-(.35+(this.phaseTime>2.4?1.6:0))*dt);if(!b.pinned){b.x+=b.vx*dt;b.z+=b.vz*dt;}this.hazards?.crashed(this,oldR,oldB,dt);carCollision(this,r,oldR,previousCar,false,dt);carCollision(this,b,oldB,previousCar,true,dt);if(r.fallLift===0&&!(this.hazards?.rideable?.(r.x,r.z)??roadDistance(r.x,r.z)<=0))r.crashMotion.landedDirt=true;const sequence=chooseFall(this);
 if(!this.reviewLegacy&&this.phaseTime>sequence.duration+.35&&Math.hypot(r.vx,r.vz)<1.2){
  if(!sequence.hard&&sequence.getup&&r.recoverStart==null){r.recoverStart=this.time;r.vx=r.vz=0;}
  const complete=sequence.hard||!sequence.getup||(r.recoverStart!=null&&this.time-r.recoverStart>=sequence.recoveryDuration);
  if(complete){r.vx=r.vz=b.vx=b.vz=0;r.fallLift=r.fallUp=0;this.phase='ended';}
 }else if(this.reviewLegacy&&fall.recoveryReady&&Math.hypot(r.vx,r.vz)<.15&&Math.hypot(b.vx,b.vz)<.15){r.vx=r.vz=0;this.phase='ended';}return;}
 if(stepGrind(this,input,dt)){this.stats.maxStep=Math.max(this.stats.maxStep,Math.hypot(r.x-oldX,r.z-oldZ));this.stats.maxSpeed=Math.max(this.stats.maxSpeed,Math.hypot(r.vx,r.vz));carCollision(this,r,{x:oldX,z:oldZ,heading:oldHeading},previousCar,false,dt);return;}
 if(r.bufferedTrick&&r.height===0&&r.up<=0){const queued=r.bufferedTrick;r.bufferedTrick=null;if(queued.until>=this.time)this.ollie(queued.kind);}
 if(r.trick&&r.height===0&&r.up<=0&&this.time-r.trickStart>r.trickDuration+.15)r.trick=null;
 const b=BOARDS[this.options.board],feel=BOARD_FEEL[this.options.board],cfg=RIDERS[this.options.rider],steer=clamp(input.steer||0,-1,1),crouch=!!input.crouch;
 const wasManual=r.manual;r.manual=canTrick(this.options.rider,this.options.board,'manual')&&!!input.manual&&!r.holding&&r.height===0&&r.up<=0&&sp>1;if(r.manual&&!wasManual)this.addTrick('manual');if(r.manual&&this.combo){this.combo.base+=25*dt;this.combo.landedAt=null;}else if(wasManual&&this.combo)this.combo.landedAt=this.time;
 if(this.combo?.landedAt!=null&&this.time-this.combo.landedAt>.5){const value=Math.round(this.combo.base)*this.combo.multiplier;this.score+=value;this.lastCombo={...this.combo,value,time:this.time};this.combo=null;}
 const towAngle=Math.atan2(c.hz-r.z,c.hx-r.x),velAngle=sp>.25?Math.atan2(r.vz,r.vx):r.heading;
 // Dog loses some edge as the speed climbs, but not so much that an ordinary tow defeats him.
 const novice=this.options.rider==='DOG'?mix(1,.76,clamp((sp-6.5)/5,0,1)):1;
 // Steering commands a turn (lateral acceleration), the way leaning a deck does.
 // The board points along its travel with only the small slip angle that turn
 // needs, so a held carve is an arc across the road rather than a skid.
 const gripBase=b.grip*feel.cornerGrip*cfg.grip*novice;
 r.carve=(r.carve??0)+(steer-(r.carve??0))*(1-Math.exp(-dt*CARVE.inputRate*feel.response));
 const authority=Math.min(CARVE.maxAuthority,CARVE.authority[this.options.board]*cfg.control);
 // The rope leans the rider back toward the hitch when they are not carving.
 // Left alone, the rider settles into the car's tracks: they hold the line the
 // Mercedes just drove at the spot the rope trails them. Carving overrides it.
 let towReturn=0;
 if(r.holding&&sp>.6){
  // Find the point of the car's line that is level with the rider (not merely a
  // rope-length back along it), so a tight bend is not misread as being off-line.
  let ts=c.s-(this.rope+2.1),trail=this.driving.sample(ts);
  for(let i=0;i<3;i++){const along=(r.x-trail.x)*Math.cos(trail.heading)+(r.z-trail.z)*Math.sin(trail.heading);ts=Math.min(c.s-1,ts+clamp(along,-4,4)/Math.max(.5,trail.metric));trail=this.driving.sample(ts);}
  const h=trail.heading,off=-(r.x-trail.x)*Math.sin(h)+(r.z-trail.z)*Math.cos(h);
  const settle=sp*sp*trail.curvature+CARVE.trackHeading*sp*Math.sin(clamp(angle(h-velAngle),-1.2,1.2))-CARVE.trackOffset*clamp(off,-3.5,3.5);
  r.trackOffset=off;towReturn=settle*(1-Math.min(1,Math.abs(r.carve)*1.25));}
 // The rider's own carve is limited by their skill; settling behind the car can use
 // whatever the wheels will hold. Neither can turn tighter than the trucks allow.
 const tightest=sp*sp/CARVE.minRadius[this.options.board];
 const carveA=clamp(clamp(r.carve*authority*gripBase,-tightest,tightest)+towReturn,-Math.min(gripBase,tightest),Math.min(gripBase,tightest));
 r.carveA=carveA;
 const drift=stepPintailDrift(this,steer,sp,dt);
 const carveSlip=Math.asin(clamp(carveA/(CARVE.stiffness*Math.max(sp,.6)),-.6,.6));
 const yawLimit=drift?2.8:r.height>.05?2.5:CARVE.yawLimit;
 if(r.height>.05){r.heading+=clamp(angle(velAngle+carveSlip-r.heading)*3.2*feel.response,-yawLimit,yawLimit)*dt;}
 else{
  // Track the slip angle itself, so the deck keeps pace with a turning line of
  // travel instead of lagging behind it and under-delivering the carve.
  const slipNow=angle(r.heading-velAngle),slipWant=drift?driftSteering(drift,carveSlip):carveSlip;
  // The carve itself swings the line of travel round; the deck yaws with it.
  const carveYaw=sp>.6?Math.sign(slipNow)*Math.min(CARVE.stiffness*sp*Math.abs(Math.sin(slipNow)),gripBase)/sp*dt:0;
  const slipNext=slipNow+(slipWant-slipNow)*(1-Math.exp(-dt*CARVE.follow))+carveYaw;
  r.heading+=clamp(angle(velAngle+slipNext-r.heading),-yawLimit*dt,yawLimit*dt);
 }
 riderSpeedWobble(this,steer,sp,dt);if(this.phase==='crashed')return;
 r.steer=steer;
 r.lean+=((steer*.48+(r.speedWobbleLean??0))-r.lean)*(1-Math.exp(-dt*7));
 // Limited steering in flight redirects momentum without adding speed.
 if(!r.holding&&r.height>.05&&sp>.1){const turn=steer*1.3*dt,co=Math.cos(turn),si=Math.sin(turn),vx=r.vx;r.vx=vx*co-r.vz*si;r.vz=vx*si+r.vz*co;}
 const fx=Math.cos(r.heading),fz=Math.sin(r.heading),nx=-fz,nz=fx;
 const lat=r.vx*nx+r.vz*nz;
 const slideTraction=drift?driftTraction(drift,angle(r.heading-velAngle)):personalitySlide(r,feel,steer,sp,lat,dt);
 // A held thumb can crouch while sliding; don't let that silently cancel slide entry.
 const crouchGrip=crouch?1+.15*Math.max(0,1-(r.slide??0)/SLIDE_INTENT.maximumAmount):1;
 const grip=b.grip*feel.cornerGrip*cfg.grip*novice*crouchGrip*(r.dirt?.28:1)*(r.height>.05?.04:1);
 const traction=grip*slideTraction;
 const lateralA=clamp(-lat*CARVE.stiffness,-traction,traction);
 r.vx+=nx*lateralA*dt;r.vz+=nz*lateralA*dt;
 carryCarveMomentum(r,sp);
 // Gentle automatic speed checking when the driver brakes and the rope slackens.
 // Dissipative assistance only: it cannot accelerate or reposition the rider.
 const hitchGap=Math.hypot(r.x-c.hx,r.z-c.hz),slack=r.holding&&hitchGap<this.rope-.06;
 const airborne=r.height>.025||r.up>0;
 const rolling=airborne?0:r.dirt?COAST_FEEL.dirtResistance:COAST_FEEL.roadResistance*feel.rolling;
 // Overrunning a slack rope, the rider checks their speed (a dragged foot, a
 // sit-back) rather than sailing past the bumper. Dissipative only; letting go keeps the speed.
 const overrun=slack&&!airborne?Math.max(0,sp-c.speed):0;
 const checking=overrun?Math.min(TOW_FEEL.slackCheckLimit,overrun*(c.brake?2:TOW_FEEL.slackCheck)+Math.max(0,this.rope*.55-hitchGap)*3):0;
 r.checking=checking;
 const resist=rolling+COAST_FEEL.airDrag*sp*sp+checking;
 if(sp>.001){const loss=Math.min(sp,resist*dt);r.vx-=r.vx/sp*loss;r.vz-=r.vz/sp*loss;}
 // Surface gravity derives from a smooth height field, not an ambiguous path index.
 if(r.height<=.005&&r.up<=0){const surface=skateSlope(this,r.x,r.z);if(surface){r.vx-=riderGravity(this)*surface.x*dt;r.vz-=riderGravity(this)*surface.z*dt;}else{const ds=roadSlope(r.x,r.z),gx=(height(r.x+.1,r.z)-height(r.x-.1,r.z))/.2,gz=(height(r.x,r.z+.1)-height(r.x,r.z-.1))/.2;r.vx-=riderGravity(this)*(ds.x+gx)*dt;r.vz-=riderGravity(this)*(ds.z+gz)*dt;}}

 // A deliberate foot stroke: acceleration happens only while the foot presses
 // the ground. Releasing the button finishes this cycle; airborne input cannot push.
 const canPush=this.phase==='coasting'&&!r.holding&&r.height===0&&r.up<=0;r.braking=canPush&&!!input.brake;
 if(r.pushStart!=null&&this.time-r.pushStart>=.9)r.pushStart=null;
 if(!canPush||input.brake||input.crouch||r.manual)r.pushStart=null;
 if(canPush&&input.push&&!(drift?.amount>.15)&&r.pushStart==null&&sp<7.5&&!input.brake&&!input.crouch&&!r.manual)r.pushStart=this.time;
 r.pushActive=r.pushStart!=null;
 if(r.pushActive){const p=(this.time-r.pushStart)/.9;if(p>.07&&p<.18){const force=29.5*Math.sin(Math.PI*(p-.07)/.11)*Math.max(0,1-sp/8.5);r.vx+=fx*force*dt;r.vz+=fz*force*dt;}}
 if(canPush&&input.brake){const speed=Math.hypot(r.vx,r.vz),loss=Math.min(speed,4.8*dt);if(speed>0){r.vx-=r.vx/speed*loss;r.vz-=r.vz/speed*loss;}}
 r.tension=0;
 if(r.holding){const dx=r.x-c.hx,dz=r.z-c.hz,dist=Math.max(.001,Math.hypot(dx,dz)),ux=dx/dist,uz=dz/dist;const radial=(r.vx-c.hvx)*ux+(r.vz-c.hvz)*uz;const extension=dist-this.rope;
  // Damped one-way spring with the give of an arm and a braided rope: it only
  // pulls, takes up slack as a firm tug rather than a hammer blow, and still
  // cannot stretch far. No position projection, motor or velocity cap.
  const a=ropePull(extension,radial,dt);
  if(a>0){r.vx-=ux*a*dt;r.vz-=uz*a*dt;r.tension=a;
   // A rope hauling across the deck is resisted by the wheels' edges: the
   // rider is swung around, but part of that sling is scrubbed off as they dig in.
   const across=ux*nx+uz*nz,v=Math.hypot(r.vx,r.vz);
   if(v>.5&&r.height<=.05){const scrub=Math.min(TOW_FEEL.edgeScrubLimit,TOW_FEEL.edgeScrub*a*across*across),loss=Math.min(v*.5,scrub*dt);r.vx-=r.vx/v*loss;r.vz-=r.vz/v*loss;r.edgeScrub=scrub;}
  }else r.edgeScrub=0;
  this.stats.maxStretch=Math.max(this.stats.maxStretch,extension);
 }
 observeRideDynamics(this,dt,lat,traction);
 observeTravel(this,dt);
 r.x+=r.vx*dt;r.z+=r.vz*dt;
 if(detectGateExit(this,{x:oldX,z:oldZ}))return;
 if(bossSurfaceContact(this,{x:oldX,z:oldZ,heading:oldHeading}))return;
 if(tryGrind(this,{x:oldX,z:oldZ,airY:oldAirY,height:oldHeight},input,dt))return;
 const landed=stepFlight(this,{x:oldX,z:oldZ},dt);if(this.phase==='crashed')return;
 if(landed&&bossSurfaceContact(this,{x:r.x,z:r.z,heading:r.heading}))return;
 if(landed){r.rideLanding={time:this.time,speed:landed.speed,airtime:this.time-(r.airStarted??this.time)};if(r.ollieMustBail){r.ollieMustBail=false;r.bufferedTrick=null;this.crash('TRIP');return;}r.airSource=null;if(r.trick==='shoveit')r.boardReversed=!r.boardReversed;if(this.combo)this.combo.landedAt=this.time;}

 const slip=Math.abs(lat),load=Math.max(0,slip-.48-(drift?driftSlipAllowance(drift,sp,slip):(r.slide??0)*SLIDE_INTENT.controlledSlipAllowance));r.wobble=airborne?Math.max(0,r.wobble-dt*.4):clamp(r.wobble+(load*.53*(1-(r.slide??0)*.35)+(r.dirt?.4:0)+feel.fastLoad*Math.min(2,Math.max(0,(sp-8)/5)**2)*(crouch?.65:1)-(crouch?.65:.4)*feel.recovery)*dt,0,1.3);
 rideRoadDetails(this,{x:oldX,z:oldZ,heading:oldHeading},dt);this.hazards?.riding(this,{x:oldX,z:oldZ,heading:oldHeading},dt);if(this.phase==='crashed')return;
 // Concrete curb faces/tops and connected footpath are paved support, not dirt.
 r.dirt=!(this.hazards?.rideable?.(r.x,r.z)??roadDistance(r.x,r.z)<=0);
 if(!r.dirt&&r.height===0)r.lastSafe={x:r.x,z:r.z};
 if(r.dirt&&r.height<=.025&&r.up<=0){this.crash('DIRT');return;}
 if(r.wobble>1)this.crash('WOBBLE');
 // A collision with the actual car is preferable to an invisible rearward force.
 const relx=r.x-c.x,relz=r.z-c.z,along=relx*Math.cos(c.heading)+relz*Math.sin(c.heading),across=-relx*Math.sin(c.heading)+relz*Math.cos(c.heading);
 if(this.time>2){const ridingOld={x:oldX,z:oldZ,heading:oldHeading};if(this.phase!=='crashed'){const deck={x:r.x,z:r.z,vx:r.vx,vz:r.vz,heading:r.heading,height:r.height};if(carCollision(this,deck,ridingOld,previousCar,true,dt)){this.crash('CAR');if(this.phase==='crashed'){Object.assign(this.board,deck);r.fallLift=Math.max(.01,r.height);r.fallUp=.4;}else{for(const key of ['x','z','vx','vz'])r[key]=deck[key];}}}carCollision(this,r,ridingOld,previousCar,false,dt);if(this.phase==='crashed')carCollision(this,this.board,ridingOld,previousCar,true,dt);}
 scorePowerslide(this,dt);
 // Free riding remains available at rest; the car keeps circulating.
 this.stats.maxStep=Math.max(this.stats.maxStep,Math.hypot(r.x-oldX,r.z-oldZ));this.stats.maxSpeed=Math.max(this.stats.maxSpeed,sp);this.stats.maxAhead=Math.max(this.stats.maxAhead,along);
 }
 snapshot(){return {phase:this.phase,driver:this.driver,laps:this.laps,time:this.time,car:{...this.car},rider:{...this.rider},stats:{...this.stats}};}
}
