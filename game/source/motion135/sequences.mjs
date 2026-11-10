// High speed or a large collision impulse keeps the rider down after impact.
export function chooseFall(sim){
 const c=sim.rider.crashMotion??{},reason=c.reason??sim.stats?.crashReason,speed=c.speed??0;
 const impactHard=speed>=6.5||(c.impactSpeed??0)>=4.5||(c.fallHeight??0)>.55&&(c.verticalSpeed??0)<-2.8;
 const dirt=!!c.landedDirt,hard=impactHard&&!dirt;
 const variant=reason==='WOBBLE'||reason==='SLIDE'||Math.abs(c.lateralSpeed??0)>Math.abs(c.forwardSpeed??Infinity)*.65?'HIP_SLIDE':reason==='CAR'||(c.forwardSpeed??1)<-.5?'BACK_RECOIL':speed>=4.5&&reason!=='TRIP'?'SHOULDER_ROLL':'FORWARD_TRIP';
 if(variant==='HIP_SLIDE')return {variant,hard,fall:'Hips',getup:hard?null:'GetUpHips',duration:1.533333,recoveryDuration:hard?0:1.533333};
 if(variant==='BACK_RECOIL')return {variant,hard,fall:'SlipBackwards',getup:hard?null:'GetUpBackwards',duration:1.7,recoveryDuration:hard?0:1.833333};
 if(impactHard)return {variant,hard,fall:'Shoulders',getup:dirt?'GetUpForwards':null,duration:3.433333,recoveryDuration:dirt?1.533333:0};
 return {variant,hard,fall:variant==='SHOULDER_ROLL'?'Rolling':'RunOutQuick',getup:null,duration:variant==='SHOULDER_ROLL'?2.733333:2.066667,recoveryDuration:0};
}
