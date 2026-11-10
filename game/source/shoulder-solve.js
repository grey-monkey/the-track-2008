import * as T from './vendor/three.module.js';

// Aim from the shoulder, then resolve arm roll using the elbow bend plane.
// A shortest-arc aim alone leaves the elbow free to point out of the chest.
export function shoulderTurn(from,elbow,to,pole,limit=1.40){
 const swing=new T.Quaternion().setFromUnitVectors(from.clone().normalize(),to.clone().normalize());
 const angle=2*Math.acos(T.MathUtils.clamp(swing.w,-1,1));
 if(angle>limit)swing.identity().slerp(new T.Quaternion().setFromUnitVectors(from.clone().normalize(),to.clone().normalize()),limit/angle);
 const axis=from.clone().normalize().applyQuaternion(swing);
 const bend=elbow.clone().applyQuaternion(swing);bend.addScaledVector(axis,-bend.dot(axis));
 const down=pole.clone().addScaledVector(axis,-pole.dot(axis));
 if(bend.lengthSq()<1e-8||down.lengthSq()<1e-8)return swing;
 bend.normalize();down.normalize();
 const roll=Math.atan2(axis.dot(bend.clone().cross(down)),bend.dot(down));
 return new T.Quaternion().setFromAxisAngle(axis,roll).multiply(swing);
}
