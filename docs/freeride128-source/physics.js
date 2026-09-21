import {observeTravel} from './motion126/travel.mjs';
import {observeRideDynamics} from './motion126/dynamics.mjs';
import {carPath,carHeading,roadSlope,rideRoadDetails} from './road-details.js';
import {riderTrick} from './trick-rules.js';
import {carCollision} from './car-collision.js';
import {BOARD_FEEL,SLIDE_INTENT,personalitySlide,TOW_FEEL,carryCarveMomentum} from './board-personalities.js';
import {sample,heading,curvature,height,roadDistance,clamp,mix,angle,LENGTH,RIDERS,BOARDS} from './world.js';
export const STEP=1/120;
// Rolling loss is shared whether towed or released; releasing is not braking.
export const COAST_FEEL=Object.freeze({roadResistance:.108,dirtResistance:1.35,airDrag:.007,restSpeed:.22352,restSeconds:.5});
export class Ride {
 constructor(options={}){this.options={rider:'DOG',board:'LONGBOARD',rope:.45,seed:8,...options};this.driver=this.options.rider==='DOG'?'SALLY':'DOG';this.rope=mix(2.44,7.62,this.options.rope);this.time=0;this.phase='riding';this.phaseTime=0;this.laps=0;this.car={s:options.start??0,speed:0,accel:0,brake:false};this.updateCarPosition();const c=this.car;this.rider={x:c.hx-Math.cos(c.heading)*(this.rope-.08),z:c.hz-Math.sin(c.heading)*(this.rope-.08),vx:0,vz:0,heading:c.heading,lean:0,wobble:0,tension:0,height:0,up:0,holding:true,dirt:false};this.prevRoad=roadDistance(this.rider.x,this.rider.z);this.stats={maxStretch:0,maxSpeed:0,maxStep:0,maxAhead:-Infinity,crashReason:null};const pace=Number.isFinite(options.pace)?clamp(options.pace,.6,1.82):1;this.speedFactor=1.05*pace*(options.speedFactor??1);this.turnSpeedFactor=1.05*(pace<1?pace:1)*(options.speedFactor??1);}
 updateCarPosition(){const c=this.car,p=carPath(c.s);c.x=p.x;c.z=p.z;c.heading=carHeading(c.s);c.hx=c.x-Math.cos(c.heading)*2.28;c.hz=c.z-Math.sin(c.heading)*2.28;}
 targetSpeed(){const c=this.car,sally=this.driver==='SALLY';const burst=!sally&&Math.sin((Math.floor(c.s/LENGTH)+this.options.seed)*1.71)>.2;const base=(sally?7.4:burst?7.1:5.9)*this.speedFactor;let v=base;for(let d=0;d<48;d+=2){const k=Math.abs(curvature(c.s+d));const curve=Math.sqrt((sally?2.15:1.55)/Math.max(.0001,k))*this.turnSpeedFactor;v=Math.min(v,Math.sqrt(curve*curve+2*1.45*d));}return v;}
 release(){if(this.phase!=='riding'||!this.rider.holding)return false;this.rider.holding=false;this.rider.tension=0;this.phase='coasting';this.phaseTime=0;return true;}
 ollie(){const r=this.rider;const trick=riderTrick(this.options.rider,this.options.board);if(this.phase!=='riding'||!trick||r.height>0||r.up>0)return false;r.up=BOARD_FEEL[this.options.board].ollieImpulse;r.trick=trick;r.trickStart=this.time;r.trickDuration=2*r.up/9.81;return true;}
 crash(reason){if(this.phase==='crashed'||this.phase==='ended')return;this.restartS=this.car.s;this.phase='crashed';this.phaseTime=0;this.rider.holding=false;this.rider.tension=0;this.stats.crashReason=reason;this.rider.groundContactAt=null;this.rider.fallLift=Math.max(.38,this.rider.height+.30);this.rider.fallUp=1.15+Math.min(.65,Math.hypot(this.rider.vx,this.rider.vz)*.065);this.board={x:this.rider.x,z:this.rider.z,vx:this.rider.vx*1.06,vz:this.rider.vz*1.06,heading:this.rider.heading};}
 step(input={},dt=STEP){if(this.phase==='ended'||this.phase==='regroup')return;this.time+=dt;this.phaseTime+=dt;this.hazards?.tick(this,dt);if(this.phase==='crashed'){const r=this.rider;r.fallUp=(r.fallUp??0)-9.81*dt;r.fallLift=Math.max(0,(r.fallLift??0)+r.fallUp*dt);if(!r.fallLift){r.fallUp=0;if(r.groundContactAt==null)r.groundContactAt=this.phaseTime;}}const previousCar={x:this.car.x,z:this.car.z,heading:this.car.heading};const c=this.car,r=this.rider,oldHx=c.hx,oldHz=c.hz,oldX=r.x,oldZ=r.z,oldHeading=r.heading;
 // Free ride: the Mercedes continues its own route at normal straight/turn speeds.
 const target=['riding','coasting'].includes(this.phase)?this.targetSpeed():0;
 const desired=clamp((target-c.speed)*1.5,-1.7,.85);c.accel+=clamp(desired-c.accel,-1.5*dt,1.5*dt);c.speed=Math.max(0,c.speed+c.accel*dt);c.brake=c.accel<-.18;c.s+=c.speed*dt;this.laps=Math.floor(c.s/LENGTH);this.updateCarPosition();c.hvx=(c.hx-oldHx)/dt;c.hvz=(c.hz-oldHz)/dt;
 let sp=Math.hypot(r.vx,r.vz);const onRoad=roadDistance(r.x,r.z);r.dirt=!(this.hazards?.rideable?.(r.x,r.z)??onRoad<=0);
 if(this.phase==='crashed'){const oldR={x:r.x,z:r.z},oldB={x:this.board.x,z:this.board.z};const dec=Math.exp(-(r.dirt?2.2:.9)*dt);r.vx*=dec;r.vz*=dec;r.x+=r.vx*dt;r.z+=r.vz*dt;const b=this.board;b.vx*=Math.exp(-(.35+(this.phaseTime>2.4?1.6:0))*dt);b.vz*=Math.exp(-(.35+(this.phaseTime>2.4?1.6:0))*dt);if(!b.pinned){b.x+=b.vx*dt;b.z+=b.vz*dt;}this.hazards?.crashed(this,oldR,oldB,dt);carCollision(this,r,oldR,previousCar,false,dt);carCollision(this,b,oldB,previousCar,true,dt);if(this.phaseTime>3.8&&c.speed<.12&&Math.hypot(r.vx,r.vz)<.15&&Math.hypot(b.vx,b.vz)<.15)this.phase='ended';return;}
 const b=BOARDS[this.options.board],feel=BOARD_FEEL[this.options.board],cfg=RIDERS[this.options.rider],steer=clamp(input.steer||0,-1,1),crouch=!!input.crouch;
 const towAngle=Math.atan2(c.hz-r.z,c.hx-r.x),velAngle=sp>.25?Math.atan2(r.vz,r.vx):r.heading;
 const novice=this.options.rider==='DOG'?mix(1,.64,clamp((sp-5)/5,0,1)):1;
 // The trucks follow the board's momentum; the rope pulls the body but
 // does not automatically point the board at the hitch. Carving supplies that turn.
 const neutral=r.holding?velAngle+angle(towAngle-velAngle)*.12:velAngle;
 const desiredHeading=neutral+steer*b.steer*feel.turn*cfg.control*novice;
 r.heading+=clamp(angle(desiredHeading-r.heading)*3.2*feel.response,-1.3,1.3)*dt;
 r.lean+=((steer*.48)-r.lean)*(1-Math.exp(-dt*7));
 const fx=Math.cos(r.heading),fz=Math.sin(r.heading),nx=-fz,nz=fx;
 const lat=r.vx*nx+r.vz*nz;
 const slideTraction=personalitySlide(r,feel,steer,sp,lat,dt);
 // A held thumb can crouch while sliding; don't let that silently cancel slide entry.
 const crouchGrip=crouch?1+.15*(1-(r.slide??0)/SLIDE_INTENT.maximumAmount):1;
 const grip=b.grip*feel.cornerGrip*cfg.grip*novice*crouchGrip*(r.dirt?.28:1)*(r.height>.05?.04:1);
 const traction=grip*slideTraction;
 const lateralA=clamp(-lat*9,-traction,traction);
 r.vx+=nx*lateralA*dt;r.vz+=nz*lateralA*dt;
 carryCarveMomentum(r,sp);
 // Gentle automatic speed checking when the driver brakes and the rope slackens.
 // Dissipative assistance only: it cannot accelerate or reposition the rider.
 const slack=r.holding&&Math.hypot(r.x-c.hx,r.z-c.hz)<this.rope-.06;
 const rolling=r.dirt?COAST_FEEL.dirtResistance:COAST_FEEL.roadResistance*feel.rolling;
 const resist=rolling+COAST_FEEL.airDrag*sp*sp+(slack&&c.brake?Math.max(0,sp-c.speed)*2:0);
 if(sp>.001){const loss=Math.min(sp,resist*dt);r.vx-=r.vx/sp*loss;r.vz-=r.vz/sp*loss;}
 // Surface gravity derives from a smooth height field, not an ambiguous path index.
 if(r.height<.05){const ds=roadSlope(r.x,r.z),gx=9.81*(height(r.x+.1,r.z)-height(r.x-.1,r.z))/.2,gz=9.81*(height(r.x,r.z+.1)-height(r.x,r.z-.1))/.2;r.vx-=9.81*ds.x*dt;r.vz-=9.81*ds.z*dt;r.vx-=gx*dt;r.vz-=gz*dt;}
 r.tension=0;
 if(r.holding){const dx=r.x-c.hx,dz=r.z-c.hz,dist=Math.max(.001,Math.hypot(dx,dz)),ux=dx/dist,uz=dz/dist;const radial=(r.vx-c.hvx)*ux+(r.vz-c.hvz)*uz;const extension=dist-this.rope;
  // Implicit damped unilateral spring. Only pulls. No position projection,
  // rear cone, forward motor, road attraction or velocity cap on the rider.
  const omega=TOW_FEEL.springFrequency,damping=2*omega*TOW_FEEL.dampingRatio;
  if(extension>0||extension+radial*dt>0){const a=Math.max(0,(omega*omega*extension+(damping+omega*omega*dt)*radial)/(1+damping*dt+omega*omega*dt*dt));r.vx-=ux*a*dt;r.vz-=uz*a*dt;r.tension=a;}
  this.stats.maxStretch=Math.max(this.stats.maxStretch,extension);
 }
 observeRideDynamics(this,dt,lat,traction);
 observeTravel(this,dt);
 r.x+=r.vx*dt;r.z+=r.vz*dt;
 if(r.height>0||r.up>0){r.up-=9.81*dt;r.height=Math.max(0,r.height+r.up*dt);if(!r.height){r.rideLanding={time:this.time,speed:Math.max(0,-r.up)};r.up=0;}}
 const slip=Math.abs(lat),load=Math.max(0,slip-.48-(r.slide??0)*SLIDE_INTENT.controlledSlipAllowance);r.wobble=clamp(r.wobble+(load*.53*(1-(r.slide??0)*.35)+(r.dirt?.4:0)+feel.fastLoad*Math.min(2,Math.max(0,(sp-8)/5)**2)*(crouch?.65:1)-(crouch?.65:.4)*feel.recovery)*dt,0,1.3);
 rideRoadDetails(this,{x:oldX,z:oldZ,heading:oldHeading},dt);this.hazards?.riding(this,{x:oldX,z:oldZ,heading:oldHeading},dt);if(this.phase==='crashed')return;
 // Concrete curb faces/tops and connected footpath are paved support, not dirt.
 r.dirt=!(this.hazards?.rideable?.(r.x,r.z)??roadDistance(r.x,r.z)<=0);
 if(r.dirt&&r.height<=.025&&r.up<=0){this.crash('DIRT');return;}
 if(r.wobble>1)this.crash('WOBBLE');
 // A collision with the actual car is preferable to an invisible rearward force.
 const relx=r.x-c.x,relz=r.z-c.z,along=relx*Math.cos(c.heading)+relz*Math.sin(c.heading),across=-relx*Math.sin(c.heading)+relz*Math.cos(c.heading);
 if(this.time>2){const ridingOld={x:oldX,z:oldZ,heading:oldHeading};if(this.phase!=='crashed'){const deck={x:r.x,z:r.z,vx:r.vx,vz:r.vz,heading:r.heading,height:r.height};if(carCollision(this,deck,ridingOld,previousCar,true,dt)){this.crash('CAR');Object.assign(this.board,deck);r.fallLift=Math.max(.01,r.height);r.fallUp=.4;}}carCollision(this,r,ridingOld,previousCar,false,dt);if(this.phase==='crashed')carCollision(this,this.board,ridingOld,previousCar,true,dt);}
 // End a spent coast below 0.5 mph, regardless of car speed or slope.
 // Sustained low speed avoids ending on a brief slowdown; never interrupt a jump.
 const resting=this.phase==='coasting'&&r.height===0&&r.up<=0&&Math.hypot(r.vx,r.vz)<COAST_FEEL.restSpeed;
 this.coastRest=resting?(this.coastRest??0)+dt:0;
 if(this.coastRest>=COAST_FEEL.restSeconds){this.phase='regroup';r.vx=0;r.vz=0;c.speed=0;c.accel=0;}
 this.stats.maxStep=Math.max(this.stats.maxStep,Math.hypot(r.x-oldX,r.z-oldZ));this.stats.maxSpeed=Math.max(this.stats.maxSpeed,sp);this.stats.maxAhead=Math.max(this.stats.maxAhead,along);
 }
 snapshot(){return {phase:this.phase,driver:this.driver,laps:this.laps,time:this.time,car:{...this.car},rider:{...this.rider},stats:{...this.stats}};}
}
