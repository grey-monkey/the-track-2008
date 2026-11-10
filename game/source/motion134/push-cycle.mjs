import * as T from '../vendor/three.module.js';
import {standing} from '../standing-data.js';
import {field} from '../motion126/carve-field.js';
import {pushRig} from './push-rig.mjs';

// Original authored cycle, timed to the simulation's contact stroke (.22–.58).
// Coordinates follow the handoff's native rider: forward is -Z; stance mirrors X.
const clamp=T.MathUtils.clamp, smooth=T.MathUtils.smoothstep;
const hip=new T.Vector3(.19960633,.84444513,.07054905);
const knee=new T.Vector3(-.09148063,.55465339,.14925895);
const ankle=new T.Vector3(-.02978483,.13987460,.20754611);
const path=[
 [0,0,0,0], [.12,.17,.085,-.13], [.22,.25,-.102,-.28],
 [.58,.25,-.102,.09], [.76,.19,.145,.23], [1,0,0,0]
];
export function pushFootOffset(phase){
 if(phase==null||!Number.isFinite(phase))return new T.Vector3();
 const p=clamp(phase,0,1);let i=0;while(i<path.length-2&&p>path[i+1][0])i++;
 const a=path[i],b=path[i+1],t=smooth(p,a[0],b[0]);
 return new T.Vector3(...a.slice(1)).lerp(new T.Vector3(...b.slice(1)),t);
}
function bonePoint(p,bone,h){
 const out=p.clone(),index=field.bones.indexOf(bone);
 const add=(name,w)=>{if(!w)return;const m=field.poses[name][index];for(let k=0;k<3;k++)out.setComponent(k,out.getComponent(k)+w*(m[k*4]*p.x+m[k*4+1]*p.y+m[k*4+2]*p.z+m[k*4+3]-p.getComponent(k)));};
 add(h.motionAmount<0?'left':'right',Math.abs(h.motionAmount||0));
 for(const [name,key]of [['tow','motionTow'],['compress','motionCompression'],['yank','motionYank'],['load','motionLoad'],['brake','motionBrake'],['flight','motionFlight']])add(name,h[key]||0);
 add(h.motionSlide<0?'slideLeft':'slideRight',Math.abs(h.motionSlide||0));return out;
}
export function solvePushLeg(a,b,c,goal){
 const upper=a.distanceTo(b),lower=b.distanceTo(c),axis=goal.clone().sub(a);
 const distance=clamp(axis.length(),Math.abs(upper-lower)+.001,upper+lower-.004);axis.normalize();
 const along=(upper*upper-lower*lower+distance*distance)/(2*distance);
 const pole=b.clone().sub(a).addScaledVector(axis,-b.clone().sub(a).dot(axis));
 if(pole.lengthSq()<1e-8)pole.set(-1,0,0).addScaledVector(axis,axis.x);
 const elbow=a.clone().addScaledVector(axis,along).addScaledVector(pole.normalize(),Math.sqrt(Math.max(0,upper*upper-along*along)));
 const end=a.clone().addScaledVector(axis,distance);
 const q1=new T.Quaternion().setFromUnitVectors(b.clone().sub(a).normalize(),elbow.clone().sub(a).normalize());
 const q2=new T.Quaternion().setFromUnitVectors(c.clone().sub(b).normalize(),end.clone().sub(elbow).normalize());
 const transform=(q,from,to)=>new T.Matrix4().makeTranslation(to.x,to.y,to.z).multiply(new T.Matrix4().makeRotationFromQuaternion(q)).multiply(new T.Matrix4().makeTranslation(-from.x,-from.y,-from.z));
 return {upper:transform(q1,a,a),lower:transform(q2,b,elbow),foot:new T.Matrix4().makeTranslation(...end.clone().sub(c).toArray()),end,elbow};
}
function exactWeights(role,g){
 const keys=standing.parts.find(p=>p.role===role)?.keys,raw=pushRig.weights[role];
 if(!raw||keys?.length!==g.attributes.position.count)return null;
 const result=new Float32Array(keys.length*3);
 keys.forEach(([vertex],i)=>{const w=raw[vertex];result.set([w[0],w[1],w[2]+w[3]],i*3);});return result;
}
function transferLowerWeights(g,reference,maxY=.98){
 // Sally's hoodie uses a separate topology. Transfer only lower-body weights
 // from the handoff trousers, keeping the upper body completely untouched.
 const src=reference.geometry.attributes.position.array,w=reference.weights,out=new Float32Array(g.attributes.position.count*3),p=g.attributes.position.array;
 for(let i=0;i<p.length;i+=3){if(p[i+1]>maxY)continue;let best=Infinity,id=-1;
  for(let j=0;j<src.length;j+=3){if(src[j+1]>.99)continue;const d=(p[i]-src[j])**2+(p[i+1]-src[j+1])**2+(p[i+2]-src[j+2])**2;if(d<best){best=d;id=j;}}
  if(id>=0)for(let k=0;k<3;k++)out[i+k]=w[id+k];
 }return out;
}
let trousers;
export function installPush(h,surfaces){
 h.pushUniforms??={pushUpper:{value:new T.Matrix4()},pushLower:{value:new T.Matrix4()},pushFoot:{value:new T.Matrix4()}};
 const shoeReference={geometry:surfaces.shoes.userData.rideGeometry};shoeReference.weights=exactWeights('shoes',shoeReference.geometry);
 for(const [role,mesh]of Object.entries(surfaces)){
  if(!['skin','clothing','shoes'].includes(role))continue;
  const g=mesh.userData.rideGeometry;
  // Body skin was compacted before export, so its index keys cannot address
  // the authoring Body mesh. The only exposed leg skin is at the ankles:
  // transfer those vertices from the adjacent correctly mapped sock/shoe rig.
  // Keeping all skin above the ankle region at zero protects face and hands.
  let weights=role==='skin'?transferLowerWeights(g,shoeReference,.5):exactWeights(role,g);
  if(role==='clothing'&&weights)trousers??={geometry:g,weights};
  if(!weights&&role==='clothing'&&trousers)weights=transferLowerWeights(g,trousers);
  if(!weights)throw Error('Push rig mapping unavailable for '+role);
  const attribute=new T.BufferAttribute(weights,3);g.setAttribute('pushWeight',attribute);mesh.userData.crashGeometry.setAttribute('pushWeight',attribute);
  const install=mat=>{const before=mat.onBeforeCompile,key=mat.customProgramCacheKey.bind(mat);mat.customProgramCacheKey=()=>key()+'push134-three-joint';mat.onBeforeCompile=s=>{
   before(s);Object.assign(s.uniforms,h.pushUniforms);
   s.vertexShader='attribute vec3 pushWeight;uniform mat4 pushUpper;uniform mat4 pushLower;uniform mat4 pushFoot;\n'+s.vertexShader;
   s.vertexShader=s.vertexShader.replace('#include <defaultnormal_vertex>','objectNormal=objectNormal*(1.-dot(pushWeight,vec3(1.)))+mat3(pushUpper)*objectNormal*pushWeight.x+mat3(pushLower)*objectNormal*pushWeight.y+mat3(pushFoot)*objectNormal*pushWeight.z;\n#include <defaultnormal_vertex>');
   s.vertexShader=s.vertexShader.replace('#include <project_vertex>','transformed=transformed*(1.-dot(pushWeight,vec3(1.)))+(pushUpper*vec4(transformed,1.)).xyz*pushWeight.x+(pushLower*vec4(transformed,1.)).xyz*pushWeight.y+(pushFoot*vec4(transformed,1.)).xyz*pushWeight.z;\n#include <project_vertex>');
  };mat.needsUpdate=true;};
  install(mesh.material);const previous=mesh.userData.installReachShadow;mesh.userData.installReachShadow=mat=>{previous?.(mat);install(mat);};
 }
}
export function applyPush(h){
 if(!h.pushUniforms)return;
 for(const u of Object.values(h.pushUniforms))u.value.identity();
 if(h.pushPhase==null||h.air>.05||h.crouch>.2||h.release<.6||h.surfaces.skin.geometry!==h.surfaces.skin.userData.rideGeometry)return;
 const a=bonePoint(hip,'thigh_l',h),b=bonePoint(knee,'calf_l',h),c=bonePoint(ankle,'foot_l',h);
 const d=pushFootOffset(h.pushPhase);if(d.lengthSq()<1e-10)return;
 const solved=solvePushLeg(a,b,c,c.clone().add(d));
 // Unturn the pushing shoe from its sideways deck stance toward travel during
 // contact, then restore it before the foot lands back over the rear bolts.
 const turn=smooth(h.pushPhase,0,.2)*(1-smooth(h.pushPhase,.65,1));
 solved.foot.makeTranslation(solved.end.x,solved.end.y,solved.end.z)
  .multiply(new T.Matrix4().makeRotationY(-1.05*turn))
  .multiply(new T.Matrix4().makeTranslation(-c.x,-c.y,-c.z));
 h.pushUniforms.pushUpper.value.copy(solved.upper);h.pushUniforms.pushLower.value.copy(solved.lower);h.pushUniforms.pushFoot.value.copy(solved.foot);
}
