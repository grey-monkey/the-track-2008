import {ReachArm} from './reach-arm.js';
import * as T from './vendor/three.module.js';
import {PortraitRider} from './portrait-rider.js';
import {installEyeComparison} from './eye-comparison.js';
// The approved portrait, cropped below the seat rather than substituting a different head.
export class PassengerSprad extends PortraitRider {
 constructor(){super('SPRAD');installEyeComparison(this);this.setEyeComparison('eyes');this.turn={value:0};this.rotation.y=Math.PI;this.surfaces={};this.reachArm=new ReachArm(this);
  for(const mesh of this.bodyMeshes){const g=mesh.geometry.clone(),a=g.attributes.position,idx=g.index.array,keep=[];for(let i=0;i<idx.length;i+=3)if([idx[i],idx[i+1],idx[i+2]].every(k=>a.getY(k)>.98)||[idx[i],idx[i+1],idx[i+2]].some(k=>(g.attributes.handoffWeight?.getX(k)??0)>.01))keep.push(idx[i],idx[i+1],idx[i+2]);g.setIndex(keep);mesh.geometry=g;}
  const materials=new Set();this.traverse(o=>{if(o.isMesh)materials.add(o.material);});
  for(const m of materials){const prior=m.onBeforeCompile,key=m.customProgramCacheKey.bind(m);m.customProgramCacheKey=()=>key()+'passenger-neck62';m.onBeforeCompile=s=>{prior(s);s.uniforms.passengerTurn=this.turn;s.vertexShader='uniform float passengerTurn;mat3 neckTurn(float y){float a=passengerTurn*smoothstep(1.43,1.51,y);float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <defaultnormal_vertex>','objectNormal=neckTurn(position.y)*objectNormal;\n#include <defaultnormal_vertex>');s.vertexShader=s.vertexShader.replace('#include <morphtarget_vertex>','#include <morphtarget_vertex>\ntransformed=neckTurn(position.y)*(transformed-vec3(0.,1.46,.035))+vec3(0.,1.46,.035);');};}
  this.cigarette.visible=false;
 }
 social(){} select(){}
 updatePassenger(time){const phase=time%26;this.turn.value=-1.08*T.MathUtils.smoothstep(phase,4,6)*(1-T.MathUtils.smoothstep(phase,10,12));this.idle(time+2,true);this.rotation.z=0;}
 mouthWorld(){const p=new T.Vector3(0,1.56,.145).sub(new T.Vector3(0,1.46,.035)).applyAxisAngle(new T.Vector3(0,1,0),this.turn.value).add(new T.Vector3(0,1.46,.035));return this.localToWorld(p);}
}

