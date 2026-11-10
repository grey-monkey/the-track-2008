import {supportContact} from './motion131/contact-clusters.mjs';
import {useCrashGeometry,crashPose} from './crash-limbs.js';
import {fallAngles} from './hazards.js';
import * as T from './vendor/three.module.js';
import {terrainHeight} from './world.js';

// A pose-driven tumble: bend the native skeleton's authored poses, roll about
// the hips and support the deformed body against the same surface as the board.
// This intentionally leaves the riding/ollie animation and slide physics alone.
export class RiderFall {
 constructor(rider,human,road){useCrashGeometry(human,true);this.rider=rider;this.human=human;this.road=road;this.point=new T.Vector3();this.matrix=new T.Matrix4();this.samples=Object.values(human.surfaces).map(mesh=>({mesh,indices:mesh.geometry.userData.supportIndices??Array.from({length:mesh.geometry.attributes.position.count},(_,i)=>i)}));this.vertices=new Float64Array(Object.values(human.surfaces).reduce((n,m)=>n+m.geometry.attributes.position.count*3,0));}
 ground(x,z){return this.surface?this.surface(x,z):(this.road.height(x,z)??terrainHeight(x,z));}
 update(sim){
  const h=this.human,r=this.rider,t=Math.max(0,sim.phaseTime),settle=T.MathUtils.smoothstep(t,1.0,1.8);
  useCrashGeometry(h,true);h.weights=(this.poseFunction??crashPose)(sim);for(const mesh of Object.values(h.surfaces)){mesh.morphTargetInfluences.length=h.weights.length;h.weights.forEach((w,i)=>mesh.morphTargetInfluences[i]=w);}
  // No hitch/plate tracking after letting go; CPU contact and GPU geometry agree.
  h.armTurn.identity();h.headTurn.identity();h.headUniforms.armTurn.value.set(0,0,0,1);h.headUniforms.turn.value.set(0,0,0,1);h.rotation.set(0,0,0);
  const angles=(this.angleFunction??fallAngles)(sim);r.rotation.order='YXZ';r.rotation.set(angles.pitch,angles.yaw,angles.roll);
  const pivot=new T.Vector3(0,.78*h.scale.y,0),offset=pivot.clone().applyQuaternion(r.quaternion);
  r.position.set(sim.rider.x-offset.x,0,sim.rider.z-offset.z);
  h.updateMatrix();this.matrix.makeRotationFromQuaternion(r.quaternion).multiply(h.matrix);
  // Authored geometry and world surfaces are static. Reuse exact support only
  // when the full pose, transform, position and surface are unchanged.
  const key=[...this.matrix.elements,...h.weights,r.position.x,r.position.z];
  const cached=this.lastSurface===this.surface&&this.lastKey?.every((v,i)=>v===key[i]);
  if(cached){const contact=sim.rider.groundContactAt,impactTime=contact==null?0:Math.max(0,t-contact);const bounce=contact==null?0:.08*Math.abs(Math.sin(impactTime*8))*Math.exp(-impactTime*1.6)*(1-settle);r.position.y=this.lastSupport+.006+bounce+(sim.rider.fallLift??0);r.updateWorldMatrix(true,true);return;}
  const surface=this.surface??((x,z)=>this.ground(x,z));
  const result=supportContact(this.samples,h.weights,this.matrix.elements,r.position.x,r.position.z,surface);
  const support=result.support;this.contactStats=result;
  this.lastKey=key;this.lastSurface=this.surface;this.lastSupport=support;
  const contact=sim.rider.groundContactAt,impactTime=contact==null?0:Math.max(0,t-contact);const bounce=contact==null?0:.08*Math.abs(Math.sin(impactTime*8))*Math.exp(-impactTime*1.6)*(1-settle);
  r.position.y=support+.006+bounce+(sim.rider.fallLift??0);r.updateWorldMatrix(true,true);
 }
}
