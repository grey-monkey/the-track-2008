import {cachedSurfaces,releaseDecodedRider} from './baked131/runtime.js';
import {rideCarve} from './motion126/ride-carve.js';
import {installPush,applyPush} from './motion134/push-cycle.mjs';



import {kick} from './kickflip-data.js';

import * as T from './vendor/three.module.js';
import {NativeHuman} from './native-human.js';
import {PortraitRider} from './portrait-rider.js';
import {installEyeComparison} from './eye-comparison.js';



const decode=s=>{const b=Uint8Array.from(atob(s),c=>c.charCodeAt(0));return Float32Array.from(new Int16Array(b.buffer),x=>x/10000);};
import {RIDER_BODY_SCALE} from './rider-proportions.js';
const transform=(p,f,vector=false)=>f.map(r=>r[0]*p[0]+r[1]*p[1]+r[2]*p[2]+(vector?0:r[3]));
function tracking(m,u){const before=m.onBeforeCompile,key=m.customProgramCacheKey;m.customProgramCacheKey=()=>key()+'animated-portrait60';m.onBeforeCompile=s=>{before(s);s.uniforms.armPivot=u.armPivot;s.uniforms.armTurn=u.armTurn;s.uniforms.headPivot=u.pivot;s.uniforms.headTurn=u.turn;s.vertexShader='attribute float armWeight;attribute float headWeight;uniform vec3 armPivot;uniform vec4 armTurn;uniform vec3 headPivot;uniform vec4 headTurn;vec3 turnArm(vec3 v){return v+2.*cross(armTurn.xyz,cross(armTurn.xyz,v)+armTurn.w*v);}vec3 turnHead(vec3 v){return v+2.*cross(headTurn.xyz,cross(headTurn.xyz,v)+headTurn.w*v);}\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <defaultnormal_vertex>','objectNormal=mix(objectNormal,turnArm(objectNormal),armWeight);objectNormal=mix(objectNormal,turnHead(objectNormal),headWeight);\n#include <defaultnormal_vertex>').replace('#include <project_vertex>','transformed=mix(transformed,armPivot+turnArm(transformed-armPivot),armWeight);transformed=mix(transformed,headPivot+turnHead(transformed-headPivot),headWeight);\n#include <project_vertex>');};}
export class PortraitNativeHuman extends NativeHuman{
 constructor(){super();this.baseData=this.data;this.nativeSurfaces={...this.surfaces};this.portraitCache=new Map();this.select('DOG');}
 select(name){if(this.baseData)this.data=this.baseData;if(!this.portraitCache){super.select(name);return;}if(name==='SPRAD')name='DOG';if(!this.portraitCache.has(name))this.portraitCache.set(name,this.buildPortrait(name));for(const m of Object.values(this.surfaces))this.remove(m);this.surfaces=this.portraitCache.get(name);for(const m of Object.values(this.surfaces))this.add(m);this.name=name;const height=RIDER_BODY_SCALE[name];this.scale.setScalar(height);this.position.x=this.data.footCenter*height;this.weights.forEach((w,i)=>Object.values(this.surfaces).forEach(m=>m.morphTargetInfluences[i]=w));this.setStance(this.stance);}
 setStance(value){this.stance=value==='REGULAR'?'REGULAR':'GOOFY';const reverse=this.stance==='REGULAR';for(const mesh of Object.values(this.surfaces)){const u=mesh.material.userData.stancePrint;if(u)u.value=reverse?1:0;}this.rotation.y=0;this.scale.x=this.scale.y*(reverse?-1:1);this.position.x=this.baseData.footCenter*this.scale.y*(reverse?-1:1);}
 pose(lean,crouch,holding,time,dt=.016){
 if(this.rideResponse?.rampAir!=null&&(this.name!=='BLACK'||this.flipProgress==null))this.air=this.rideResponse.rampAir;
 // Grounded release settles over about half a second; grabs and airborne poses stay quick.
 this.releaseEaseRate=this.rideResponse?.enabled&&!holding&&this.air<.05?6:12;
 this.setStance(this.stance);
 this.data=this.baseData;for(const m of Object.values(this.surfaces))m.morphTargetInfluences.fill(0);super.pose(lean,crouch,holding,time,dt);
 if(this.name!=='BLACK'||this.flipProgress==null){rideCarve(this,lean,crouch,time,dt);applyPush(this);return;}
 for(const u of Object.values(this.pushUniforms??{}))u.value.identity();
 this.data=this.flipData;const p=T.MathUtils.clamp(this.flipProgress,0,1),f=p*(kick.poseNames.length-1),i=Math.min(kick.poseNames.length-2,Math.floor(f)),mix=f-i,fade=T.MathUtils.smoothstep(p,0,.07)*(1-T.MathUtils.smoothstep(p,.91,1));
 this.weights=this.flipData.poseNames.map(()=>0);this.weights[5+i]=(1-mix)*fade;this.weights[6+i]=mix*fade;
 for(const m of Object.values(this.surfaces))this.weights.forEach((w,j)=>m.morphTargetInfluences[j]=w);
 this.trackArm(dt);this.trackHead(dt);
 }
 releaseInactiveRiders(){for(const [name,surfaces]of this.portraitCache){if(name===this.name)continue;for(const m of Object.values(surfaces))m.material.dispose();this.portraitCache.delete(name);releaseDecodedRider(name);}}
 buildPortrait(name){
 if(name==='BLACK'){this.flipData={...this.baseData,poseNames:[...this.baseData.poseNames,...kick.poseNames]};for(const key of ['heads','arms','elbows','anchors'])this.flipData[key]={...kick[key],...this.baseData[key]};}
 const person=new PortraitRider(name);installEyeComparison(person);person.setEyeComparison('eyes');
 const extras=person.children.filter(m=>m.isMesh&&!person.bodyMeshes.includes(m)&&m.name!=='skin socket');
 const surfaces=cachedSurfaces(name,(role)=>role.startsWith('portrait')?extras[Number(role.slice(8))].material:person.bodyMeshes.find(m=>m.userData.bodyRole===role).material);
 for(const [role,mesh]of Object.entries(surfaces)){const material=mesh.material;
 if(['BLACK','DOG'].includes(name)&&role==='clothing'&&!material.userData.stancePrint){const uniform=material.userData.stancePrint={value:0},before=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);material.customProgramCacheKey=()=>key()+'stance-print95';material.onBeforeCompile=s=>{before(s);s.uniforms.stancePrint=uniform;s.fragmentShader='uniform float stancePrint;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('vec4 logoInk=texture2D(teeLogo,printUV);','if(stancePrint>.5)printUV.x=1.-printUV.x;vec4 logoInk=texture2D(teeLogo,printUV);');};}
 tracking(material,this.headUniforms);
 }
 installPush(this,surfaces);
 // These temporary standing meshes provided materials only; the cached meshes own them now.
 person.traverse(o=>{if(o.isMesh)o.geometry.dispose();});person.clear();person.bodyMeshes=[];person.socketGeometry=null;person.smoothGeometry=null;return surfaces;
 }
}
