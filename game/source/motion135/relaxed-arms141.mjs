import * as T from '../vendor/three.module.js';
const around=(q,a,b=a)=>new T.Matrix4().makeTranslation(b.x,b.y,b.z).multiply(new T.Matrix4().makeRotationFromQuaternion(q)).multiply(new T.Matrix4().makeTranslation(-a.x,-a.y,-a.z));
// Relaxed elbows and low, separated hands for coasting. Work in the chest's
// frame, retaining limb lengths and carrying the complete hand/finger chain.
export function relaxSkatingArms(pose,rig,lean=0,amount=1){
 const ids=new Map(rig.bones.map((b,i)=>[b.name,i])),pos=n=>pose.positions[ids.get(n)];
 const up=pos('neck_01').clone().sub(pos('spine_02')).normalize(),side=pos('upperarm_l').clone().sub(pos('upperarm_r')).normalize(),front=side.clone().cross(up).normalize();
 for(const [sideName,sign]of [['l',1],['r',-1]]){
  const ia=ids.get('upperarm_'+sideName),ib=ids.get('lowerarm_'+sideName),ic=ids.get('hand_'+sideName),a=pose.positions[ia].clone(),b=pose.positions[ib].clone(),c=pose.positions[ic].clone();
  const goal=a.clone().addScaledVector(up,sign===1?-.43:-.44).addScaledVector(side,sign*(.075+Math.abs(lean)*.055)).addScaledVector(front,.14+sign*lean*.045).lerp(c,1-amount);
  const u=a.distanceTo(b),l=b.distanceTo(c),axis=goal.clone().sub(a),d=T.MathUtils.clamp(axis.length(),Math.abs(u-l)+.001,u+l-.001);axis.normalize();
  const along=(u*u-l*l+d*d)/(2*d),pole=up.clone().multiplyScalar(-1).addScaledVector(side,sign*.18);pole.addScaledVector(axis,-pole.dot(axis)).normalize();
  const elbow=a.clone().addScaledVector(axis,along).addScaledVector(pole,Math.sqrt(Math.max(0,u*u-along*along))),end=a.clone().addScaledVector(axis,d);
  const q1=new T.Quaternion().setFromUnitVectors(b.clone().sub(a).normalize(),elbow.clone().sub(a).normalize()),q2=new T.Quaternion().setFromUnitVectors(c.clone().sub(b).normalize(),end.clone().sub(elbow).normalize()),upper=around(q1,a),lower=around(q2,b,elbow);
  for(let i=0;i<rig.bones.length;i++){let ancestor=i;while(ancestor>=0&&ancestor!==ib)ancestor=rig.bones[ancestor].parent;const m=i===ia?upper:ancestor===ib?lower:null;if(!m)continue;pose.skin[i].premultiply(m);pose.world[i].premultiply(m);pose.positions[i].applyMatrix4(m);}
 }
 return pose;
}
