import * as T from '../vendor/three.module.js';
const around=(q,a,b=a)=>new T.Matrix4().makeTranslation(b.x,b.y,b.z).multiply(new T.Matrix4().makeRotationFromQuaternion(q)).multiply(new T.Matrix4().makeTranslation(-a.x,-a.y,-a.z));
const transform=(pose,i,m)=>{pose.skin[i].premultiply(m);pose.world[i].premultiply(m);pose.positions[i].applyMatrix4(m);};

// Weight shifts are articulated above planted feet. Preserve the source foot
// transforms, solve both knees, then let the existing sole/deck contact pass run.
export function skatePosture(pose,rig,{lean=0,compression=0}={}){
 lean=T.MathUtils.clamp(lean,-1,1);compression=T.MathUtils.clamp(compression,0,.16);
 const ids=new Map(rig.bones.map((b,i)=>[b.name,i])),hip=pose.positions[ids.get('pelvis')].clone();
 const feet=['l','r'].map(side=>['foot_','ball_'].map(n=>{const i=ids.get(n+side);return {i,world:pose.world[i].clone(),skin:pose.skin[i].clone(),position:pose.positions[i].clone()};}));
 const shift=hip.clone().add(new T.Vector3(lean*.055,-compression,0));
 const m=around(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),-lean*.16),hip,shift);
 for(let i=1;i<rig.bones.length;i++)transform(pose,i,m);
 for(const [k,side]of ['l','r'].entries()){
  const ia=ids.get('thigh_'+side),ib=ids.get('calf_'+side),ic=ids.get('foot_'+side),a=pose.positions[ia].clone(),b=pose.positions[ib].clone(),c=pose.positions[ic].clone(),goal=feet[k][0].position;
  const u=a.distanceTo(b),l=b.distanceTo(c),axis=goal.clone().sub(a),d=T.MathUtils.clamp(axis.length(),Math.abs(u-l)+.00001,u+l-.00001);axis.normalize();
  const along=(u*u-l*l+d*d)/(2*d),pole=b.clone().sub(a);pole.addScaledVector(axis,-pole.dot(axis));if(pole.lengthSq()<1e-9)pole.set(0,0,1).addScaledVector(axis,-axis.z);pole.normalize();
  const knee=a.clone().addScaledVector(axis,along).addScaledVector(pole,Math.sqrt(Math.max(0,u*u-along*along))),end=a.clone().addScaledVector(axis,d);
  const q1=new T.Quaternion().setFromUnitVectors(b.clone().sub(a).normalize(),knee.clone().sub(a).normalize()),q2=new T.Quaternion().setFromUnitVectors(c.clone().sub(b).normalize(),end.clone().sub(knee).normalize());
  transform(pose,ia,around(q1,a));transform(pose,ib,around(q2,b,knee));
  for(const saved of feet[k]){pose.world[saved.i].copy(saved.world);pose.skin[saved.i].copy(saved.skin);pose.positions[saved.i].copy(saved.position);}
 }
 return pose;
}
