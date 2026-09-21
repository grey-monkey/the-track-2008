import {removeArmTattoo} from './clean-arm.js';
/*! Adapted from Skater with animation by SpatialNeglect / jeandiz, CC BY-NC 4.0.
https://sketchfab.com/3d-models/skater-with-animation-8e2e5783b3e14cce858a023f4ee7c567
Original skating poses retained; rope arm, pose blending and materials adapted for The Track. */
import * as T from './vendor/three.module.js';
import {paintedMaterial} from './pigment.js';
import {data} from './native-skater-data.js';
import {shoulderTurn} from './shoulder-solve.js';
const maps={};for(const p of data.parts){maps[p.role]=await new T.TextureLoader().loadAsync(p.texture);maps[p.role].colorSpace=T.SRGBColorSpace;}
function decode(s){const b=Uint8Array.from(atob(s),c=>c.charCodeAt(0));return Float32Array.from(new Int16Array(b.buffer),x=>x/10000);}
export class NativeHuman extends T.Group{
 constructor(){super();this.data=data;this.surfaces={};this.crouch=0;this.release=0;this.air=0;this.weights=data.poseNames.map(()=>0);this.towTarget=null;this.armTurn=new T.Quaternion();this.armPivot=new T.Vector3();this.lookTarget=null;this.headTurn=new T.Quaternion();this.headUniforms={pivot:{value:new T.Vector3()},turn:{value:new T.Vector4(0,0,0,1)},armPivot:{value:new T.Vector3()},armTurn:{value:new T.Vector4(0,0,0,1)}};
  for(const p of data.parts){const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(decode(p.position),3));g.setAttribute('normal',new T.BufferAttribute(decode(p.normal),3));g.setAttribute('uv',new T.BufferAttribute(decode(p.uv),2));g.setAttribute('armWeight',new T.Float32BufferAttribute(p.armWeight,1));g.setAttribute('headWeight',new T.Float32BufferAttribute(p.headWeight,1));g.setIndex(p.index);g.morphTargetsRelative=true;for(const k of ['position','normal'])g.morphAttributes[k]=data.poseNames.map(n=>new T.BufferAttribute(decode(p.poses[n][k]),3));const m=paintedMaterial(0xffffff,{human:true});m.map=maps[p.role];if(p.role==='skin')removeArmTattoo(m);const compile=m.onBeforeCompile,cache=m.customProgramCacheKey;
const uniforms=this.headUniforms;m.customProgramCacheKey=()=>cache()+'plate-look-v1';m.onBeforeCompile=shader=>{compile(shader);shader.uniforms.armPivot=uniforms.armPivot;shader.uniforms.armTurn=uniforms.armTurn;shader.uniforms.headPivot=uniforms.pivot;shader.uniforms.headTurn=uniforms.turn;shader.vertexShader='attribute float armWeight;uniform vec3 armPivot;uniform vec4 armTurn;vec3 turnArm(vec3 v){return v+2.*cross(armTurn.xyz,cross(armTurn.xyz,v)+armTurn.w*v); }attribute float headWeight;uniform vec3 headPivot;uniform vec4 headTurn;vec3 turnHead(vec3 v){return v+2.*cross(headTurn.xyz,cross(headTurn.xyz,v)+headTurn.w*v); }\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <defaultnormal_vertex>','objectNormal=mix(objectNormal,turnArm(objectNormal),armWeight);objectNormal=mix(objectNormal,turnHead(objectNormal),headWeight);\n#include <defaultnormal_vertex>').replace('#include <project_vertex>','transformed=mix(transformed,armPivot+turnArm(transformed-armPivot),armWeight);transformed=mix(transformed,headPivot+turnHead(transformed-headPivot),headWeight);\n#include <project_vertex>');};const mesh=new T.Mesh(g,m);mesh.frustumCulled=false;mesh.castShadow=true;mesh.receiveShadow=true;this.add(mesh);this.surfaces[p.role]=mesh;}
  this.select('DOG');
 }
 select(name){this.name=name;const height={DOG:1,SALLY:1.025,BOSS:1.055,BLACK:1.09,SPRAD:1}[name]??1;this.scale.setScalar(height);this.position.x=data.footCenter*height;}
 pose(lean,crouch,holding,time,dt=.016){const ease=1-Math.exp(-Math.min(dt,.1)*12);this.crouch+=((crouch?1:0)-this.crouch)*ease;this.release+=((holding?0:1)-this.release)*(1-Math.exp(-Math.min(dt,.1)*(this.releaseEaseRate??12)));if(this.rideResponse?.release!=null)this.release=this.rideResponse.release;const c=this.crouch,r=this.release,a=T.MathUtils.clamp(this.air,0,1);this.weights=[c*(1-r)*(1-a),r*(1-c)*(1-a),r*c*(1-a),a*(1-r),a*r];for(const mesh of Object.values(this.surfaces))this.weights.forEach((w,i)=>mesh.morphTargetInfluences[i]=w);this.rotation.z+=(T.MathUtils.clamp(lean,-1,1)*-.09-this.rotation.z)*ease;this.trackArm(dt);this.trackHead(dt);}
 trackHead(dt){const data=this.data;
  const base=data.heads.base,pivot=new T.Vector3(...base.pivot),forward=new T.Vector3(...base.forward);
  data.poseNames.forEach((n,i)=>{const h=data.heads[n],w=this.weights[i];for(let k=0;k<3;k++){pivot.setComponent(k,pivot.getComponent(k)+(h.pivot[k]-base.pivot[k])*w);forward.setComponent(k,forward.getComponent(k)+(h.forward[k]-base.forward[k])*w);}});
  const desired=new T.Quaternion();if(this.lookTarget){this.updateWorldMatrix(true,false);const direction=this.worldToLocal(this.lookTarget.clone()).sub(pivot).normalize();forward.normalize();let yaw=Math.atan2(-direction.z,direction.x)-Math.atan2(-forward.z,forward.x);yaw=Math.atan2(Math.sin(yaw),Math.cos(yaw));const yawTurn=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),T.MathUtils.clamp(yaw,-1.55,1.55));const turned=forward.clone().applyQuaternion(yawTurn),side=turned.clone().cross(new T.Vector3(0,1,0)).normalize();const pitch=T.MathUtils.clamp(Math.asin(T.MathUtils.clamp(direction.y,-1,1))-Math.asin(T.MathUtils.clamp(forward.y,-1,1)),-.32,.32);desired.setFromAxisAngle(side,pitch).multiply(yawTurn);}
  this.headTurn.slerp(desired,1-Math.exp(-Math.min(dt,.1)*7));this.headUniforms.pivot.value.copy(pivot);this.headUniforms.turn.value.set(this.headTurn.x,this.headTurn.y,this.headTurn.z,this.headTurn.w);
 }
 trackArm(dt){const data=this.data;
 const pivot=new T.Vector3(...data.arms.base);data.poseNames.forEach((n,i)=>{const p=data.arms[n],b=data.arms.base,w=this.weights[i];pivot.add(new T.Vector3(p[0]-b[0],p[1]-b[1],p[2]-b[2]).multiplyScalar(w));});this.armPivot.copy(pivot);
 const desired=new T.Quaternion();if(this.towTarget){
  this.updateWorldMatrix(true,false);
  const elbow=new T.Vector3(...data.elbows.base);data.poseNames.forEach((n,i)=>{const e=data.elbows[n],b=data.elbows.base;elbow.add(new T.Vector3(e[0]-b[0],e[1]-b[1],e[2]-b[2]).multiplyScalar(this.weights[i]));});
  const from=this.rawGrip().sub(pivot),to=this.worldToLocal(this.towTarget.clone()).sub(pivot).normalize();to.y-=.035;to.normalize();
  // Keep the point of the elbow below the arm and slightly toward the ribs.
  const pole=new T.Vector3(-pivot.x*.35,-1,-pivot.z*.35);
  desired.slerp(shoulderTurn(from,elbow.sub(pivot),to,pole),1-this.release);
 }
 this.armTurn.slerp(desired,1-Math.exp(-Math.min(dt,.1)*10));this.headUniforms.armPivot.value.copy(pivot);this.headUniforms.armTurn.value.set(this.armTurn.x,this.armTurn.y,this.armTurn.z,this.armTurn.w);
 }
 grip(){return this.rawGrip().sub(this.armPivot).applyQuaternion(this.armTurn).add(this.armPivot);}
 rawGrip(){const data=this.data;const p=new T.Vector3(...data.anchors.base);data.poseNames.forEach((n,i)=>{const q=data.anchors[n],w=this.weights[i];p.x+=(q[0]-data.anchors.base[0])*w;p.y+=(q[1]-data.anchors.base[1])*w;p.z+=(q[2]-data.anchors.base[2])*w;});return p;}
}
