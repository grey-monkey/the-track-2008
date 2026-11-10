import {RIDER_BODY_SCALE,RIDER_HEIGHT_METRES} from '../rider-proportions.js';
// Scale around the seated pelvis, not the floor: longer legs stay below the cushion.
// Keep Sally's approved cabin fit; preserve the established standing proportions.
const cabinFit=.91/RIDER_BODY_SCALE.SALLY;
const pelvisFraction=.55;
const seatY=-.34+.91*pelvisFraction*(RIDER_HEIGHT_METRES.SALLY/RIDER_BODY_SCALE.SALLY);
export function seatedFit(name){
 const scale=RIDER_BODY_SCALE[name]*cabinFit;
 const pelvis=pelvisFraction*RIDER_HEIGHT_METRES[name]/RIDER_BODY_SCALE[name];
 return {scale,y:seatY-pelvis*scale,scalpY:seatY+(1-pelvisFraction)*RIDER_HEIGHT_METRES[name]*cabinFit};
}
export function fitPassenger(person,x,z){const fit=seatedFit(person.name);person.scale.setScalar(fit.scale);person.position.set(x,fit.y,z);}
