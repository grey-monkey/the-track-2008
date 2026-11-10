const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const SLIPS=new Set(['WOBBLE','BALANCE','SLIDE']);
const BODY_IMPACTS=new Set(['CAR','BODY_IMPACT']);

// Stable crash-entry selection; do not change family as sliding slows down.
export function fallProfile(crash={},rider={},fallbackReason=''){
 const speed=Math.max(0,crash.speed??Math.hypot(rider.vx??0,rider.vz??0));
 const impact=Math.max(0,crash.impactSpeed??0);
 const severity=clamp((Math.max(speed,impact)-2)/9);
 const reason=String(crash.reason??fallbackReason).toUpperCase();
 const side=(crash.side??1)<0?-1:1;
 const slip=SLIPS.has(reason);
 // Existing solid-body collisions supply impactSpeed; wheel catches supply
 // throwForward. This also covers barriers without hardcoding every prop name.
 const bodyImpact=(BODY_IMPACTS.has(reason)||impact>=1.8)&&!rider.throwForward;
 const roll=!slip&&!bodyImpact&&speed>=7.2;
 const variant=slip?'HIP_SLIDE':bodyImpact?'BACK_RECOIL':roll?'SHOULDER_ROLL':'FORWARD_TRIP';
 const family=slip?'HIP_SLIDE':bodyImpact?'BACKWARD_FALL':roll?
  (speed>=10?'UNCONTROLLED_TUMBLE':'FORWARD_TUMBLE'):'FORWARD_TRIP';
 return {family,variant,severity,side,
  duration:slip?1.55+.5*severity:bodyImpact?1.8+.5*severity:roll?2.05+.55*severity:1.45+.5*severity,
  rollTime:roll?.80+.28*severity:.50+.20*severity};
}
