import {bakeCarve,applyCarve} from './bake-carve.js';
import {field} from './carve-field.js';
const indices=Object.fromEntries(field.bones.map((n,i)=>[n,i]));
function moved(p,bone,value,vector=false,out=[0,0,0],tow=0,compress=0,slide=0,yank=0,load=0,brake=0,flight=0){
 const index=indices[bone];out[0]=p[0];out[1]=p[1];out[2]=p[2];
 const add=(name,w)=>{if(!w)return;const m=field.poses[name][index];for(let k=0;k<3;k++)out[k]+=w*(m[k*4]*p[0]+m[k*4+1]*p[1]+m[k*4+2]*p[2]+(vector?0:m[k*4+3])-p[k]);};
 add(value<0?'left':'right',Math.abs(value));add('tow',tow);add('compress',compress);add(slide<0?'slideLeft':'slideRight',Math.abs(slide));add('yank',yank);add('load',load);add('brake',brake);add('flight',flight);return out;
}
// Add the authored carve only to grounded riding. Existing crouch/air/trick poses win.
export function rideCarve(h,lean,crouch,time,dt){
 if(h.surfaces.skin.userData.carveStart===undefined)bakeCarve(h);
 const reset=h.motionLastTime==null||time<h.motionLastTime||time-h.motionLastTime>.3;
 h.motionLastTime=time;
 const air=1-Math.min(1,h.air||0),slide=(h.rideResponse?.slide??0)*(h.stance==='REGULAR'?-1:1)*air*(1-.35*h.crouch);
 h.motionSlide=slide;h.motionYank=(h.rideResponse?.yank??0)*air*(1-.45*h.crouch);
 const target=Math.max(-1,Math.min(1,lean*1.65))*.95*(h.rideResponse?.rampAir!=null?.15:1)*(1-Math.min(1,h.air||0))*(1-.45*Math.min(1,h.crouch||0))*(1-.65*Math.abs(slide));
 h.motionAmount=reset?target:(h.motionAmount??0)+(target-(h.motionAmount??0))*(1-Math.exp(-Math.min(.1,dt)*10));
 h.motionLoad=(h.rideResponse?.load??0)*air*(1-.6*h.crouch);h.motionBrake=Math.max(h.rideResponse?.brake??0,h.rideResponse?.coast??0)*air*(1-.6*h.crouch);h.motionFlight=(h.rideResponse?.flight??0)*(1-.4*h.crouch);
 h.motionTow=(1-h.release)*(1-.5*h.motionBrake)*(h.rideResponse?.rampAir!=null?.45:1)*(1-Math.min(1,h.air||0))*(1-.65*h.crouch);const compression=Math.min(h.rideResponse?.compression??0,Math.max(0,.95-Math.abs(slide)*.35-h.motionYank*.25))*(1-.55*h.crouch)*(1-Math.min(1,h.air||0));h.motionCompression=compression;applyCarve(h,h.motionAmount,h.motionTow,compression,h.motionSlide,h.motionYank,h.motionLoad,h.motionBrake,h.motionFlight);
 // Metadata follows the same bone-space deformation as the rendered surfaces,
 // keeping the existing head/rope solvers aligned with the shifted body.
 const d=h.data;
 if(h.motionMetadataSource!==d){h.motionMetadataSource=d;h.motionMetadata={...d,heads:{},arms:{},elbows:{},anchors:{}};for(const label of ['base',...d.poseNames]){h.motionMetadata.heads[label]={pivot:[0,0,0],forward:[0,0,0]};for(const key of ['arms','elbows','anchors'])h.motionMetadata[key][label]=[0,0,0];}}
 const n=h.motionMetadata;
 for(const label of ['base',...d.poseNames]){
  moved(d.heads[label].pivot,'head',h.motionAmount,false,n.heads[label].pivot,h.motionTow,h.motionCompression,h.motionSlide,h.motionYank,h.motionLoad,h.motionBrake,h.motionFlight);moved(d.heads[label].forward,'head',h.motionAmount,true,n.heads[label].forward,h.motionTow,h.motionCompression,h.motionSlide,h.motionYank,h.motionLoad,h.motionBrake,h.motionFlight);
  moved(d.arms[label],'upperarm_r',h.motionAmount,false,n.arms[label],h.motionTow,h.motionCompression,h.motionSlide,h.motionYank,h.motionLoad,h.motionBrake,h.motionFlight);
  moved(d.elbows[label],'lowerarm_r',h.motionAmount,false,n.elbows[label],h.motionTow,h.motionCompression,h.motionSlide,h.motionYank,h.motionLoad,h.motionBrake,h.motionFlight);
  moved(d.anchors[label],'hand_r',h.motionAmount,false,n.anchors[label],h.motionTow,h.motionCompression,h.motionSlide,h.motionYank,h.motionLoad,h.motionBrake,h.motionFlight);
 }
 h.data=n;h.rotation.z=0;h.trackArm(dt);h.trackHead(dt);
}

