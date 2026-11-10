import * as T from '../vendor/three.module.js';
// Apply after retarget.sample and before skinning. dy is the required upward
// correction for a free foot that penetrates the road, in unscaled native units.
export function raiseFootToFloor(pose,rig,side,dy){
 if(!Number.isFinite(dy)||Math.abs(dy)<1e-6)return;
 const names=['thigh_'+side,'calf_'+side,'foot_'+side,'ball_'+side],ids=names.map(n=>rig.bones.findIndex(b=>b.name===n));
 if(ids.some(i=>i<0))return;
 const [a,b,c]=ids.slice(0,3).map(i=>pose.positions[i].clone()),goal=c.clone().add(new T.Vector3(0,dy,0)),u=a.distanceTo(b),l=b.distanceTo(c),axis=goal.clone().sub(a),dist=T.MathUtils.clamp(axis.length(),Math.abs(u-l)+.001,u+l-.001);axis.normalize();
 const along=(u*u-l*l+dist*dist)/(2*dist),pole=b.clone().sub(a);pole.addScaledVector(axis,-pole.dot(axis));if(pole.lengthSq()<1e-8)pole.set(0,0,1).addScaledVector(axis,-axis.z);pole.normalize();
 const knee=a.clone().addScaledVector(axis,along).addScaledVector(pole,Math.sqrt(Math.max(0,u*u-along*along))),end=a.clone().addScaledVector(axis,dist);
 const q1=new T.Quaternion().setFromUnitVectors(b.clone().sub(a).normalize(),knee.clone().sub(a).normalize()),q2=new T.Quaternion().setFromUnitVectors(c.clone().sub(b).normalize(),end.clone().sub(knee).normalize());
 const around=(q,from,to)=>new T.Matrix4().makeTranslation(to.x,to.y,to.z).multiply(new T.Matrix4().makeRotationFromQuaternion(q)).multiply(new T.Matrix4().makeTranslation(-from.x,-from.y,-from.z));
 const changes=[around(q1,a,a),around(q2,b,knee),new T.Matrix4().makeTranslation(end.x-c.x,end.y-c.y,end.z-c.z)];
 ids.forEach((id,k)=>{const m=changes[Math.min(k,2)];pose.skin[id].premultiply(m);pose.world[id].premultiply(m);pose.positions[id].applyMatrix4(m);if(pose.rotations)pose.rotations[id].setFromRotationMatrix(pose.world[id]).normalize();});
}
