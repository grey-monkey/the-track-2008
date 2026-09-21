import {rideCarve} from './motion126/ride-carve.js';
import {tuckClothes} from './crash-tuck-data.js';
import {prepareCrash} from './crash-limbs.js';
import {outfitGeometry,outfits,clothingZone,hideCoveredCalves,easeShortSleeves} from './clothing70.js';
import {kick} from './kickflip-data.js';
import {flipFrames} from './kickflip-frames.js';
import * as T from './vendor/three.module.js';
import {NativeHuman} from './native-human.js';
import {PortraitRider} from './portrait-rider.js';
import {installEyeComparison} from './eye-comparison.js';
import {standing} from './standing-data.js';
import {frames as originalFrames} from './portrait-pose-frames.js';
const frames={...flipFrames,...originalFrames};
const decode=s=>{const b=Uint8Array.from(atob(s),c=>c.charCodeAt(0));return Float32Array.from(new Int16Array(b.buffer),x=>x/10000);};
import {RIDER_BODY_SCALE} from './rider-proportions.js';
const transform=(p,f,vector=false)=>f.map(r=>r[0]*p[0]+r[1]*p[1]+r[2]*p[2]+(vector?0:r[3]));
function tracking(m,u){const before=m.onBeforeCompile,key=m.customProgramCacheKey;m.customProgramCacheKey=()=>key()+'animated-portrait60';m.onBeforeCompile=s=>{before(s);s.uniforms.armPivot=u.armPivot;s.uniforms.armTurn=u.armTurn;s.uniforms.headPivot=u.pivot;s.uniforms.headTurn=u.turn;s.vertexShader='attribute float armWeight;attribute float headWeight;uniform vec3 armPivot;uniform vec4 armTurn;uniform vec3 headPivot;uniform vec4 headTurn;vec3 turnArm(vec3 v){return v+2.*cross(armTurn.xyz,cross(armTurn.xyz,v)+armTurn.w*v);}vec3 turnHead(vec3 v){return v+2.*cross(headTurn.xyz,cross(headTurn.xyz,v)+headTurn.w*v);}\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <defaultnormal_vertex>','objectNormal=mix(objectNormal,turnArm(objectNormal),armWeight);objectNormal=mix(objectNormal,turnHead(objectNormal),headWeight);\n#include <defaultnormal_vertex>').replace('#include <project_vertex>','transformed=mix(transformed,armPivot+turnArm(transformed-armPivot),armWeight);transformed=mix(transformed,headPivot+turnHead(transformed-headPivot),headWeight);\n#include <project_vertex>');};}
function morphGeometry(base,positions,posePositions){const g=base.clone();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.morphAttributes={};g.computeVertexNormals();const normal=g.attributes.normal.array.slice();g.morphTargetsRelative=true;g.morphAttributes.position=[];g.morphAttributes.normal=[];for(const posed of posePositions){const temp=new T.BufferGeometry();temp.setIndex(g.index?.clone()??null);temp.setAttribute('position',new T.Float32BufferAttribute(posed,3));temp.computeVertexNormals();g.morphAttributes.position.push(new T.Float32BufferAttribute(posed.map((v,i)=>v-positions[i]),3));g.morphAttributes.normal.push(new T.Float32BufferAttribute(Array.from(temp.attributes.normal.array,(v,i)=>v-normal[i]),3));temp.dispose();}g.computeBoundingSphere();return g;}
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
 if(this.name!=='BLACK'||this.flipProgress==null){rideCarve(this,lean,crouch,time,dt);return;}
 this.data=this.flipData;const p=T.MathUtils.clamp(this.flipProgress,0,1),f=p*(kick.poseNames.length-1),i=Math.min(kick.poseNames.length-2,Math.floor(f)),mix=f-i,fade=T.MathUtils.smoothstep(p,0,.07)*(1-T.MathUtils.smoothstep(p,.91,1));
 this.weights=this.flipData.poseNames.map(()=>0);this.weights[5+i]=(1-mix)*fade;this.weights[6+i]=mix*fade;
 for(const m of Object.values(this.surfaces))this.weights.forEach((w,j)=>m.morphTargetInfluences[j]=w);
 this.trackArm(dt);this.trackHead(dt);
 }
 buildPortrait(name){
 const originalNative=this.nativeSurfaces;if(name==='BLACK'){this.flipData={...this.baseData,poseNames:[...this.baseData.poseNames,...kick.poseNames]};for(const key of ['heads','arms','elbows','anchors'])this.flipData[key]={...kick[key],...this.baseData[key]};this.data=this.flipData;this.nativeSurfaces={};for(const [role,mesh]of Object.entries(originalNative)){const g=mesh.geometry.clone(),p=kick.parts.find(p=>p.role===role);for(const k of ['position','normal'])g.morphAttributes[k]=[...g.morphAttributes[k],...kick.poseNames.map(n=>new T.BufferAttribute(decode(p.poses[n][k]),3))];this.nativeSurfaces[role]={geometry:g};}}
 const person=new PortraitRider(name);installEyeComparison(person);person.setEyeComparison('eyes');const surfaces={};
 for(const [role,native] of Object.entries(this.nativeSurfaces)){
  const variant=role==='clothing'?outfits[name]:null,src=variant?.standing??standing.parts.find(p=>p.role===role),portrait=person.bodyMeshes.find(m=>m.userData.bodyRole===role),ng=variant?outfitGeometry(name,true):native.geometry;
  if(!portrait)throw Error('Missing matching portrait body '+role);
  const pa=portrait.geometry.attributes.position,delta=src.position.map((v,i)=>role==='clothing'?0:pa.array[i]-v);
  const pose=(label)=>{const f=frames[label],morph=label==='base'?null:ng.morphAttributes.position[this.data.poseNames.indexOf(label)].array,out=[];for(let i=0;i<ng.attributes.position.count;i++){const d=transform(delta.slice(i*3,i*3+3),f,true);for(let k=0;k<3;k++)out.push(ng.attributes.position.array[i*3+k]+(morph?.[i*3+k]??0)+d[k]);}return out;};
  const g=morphGeometry(ng,pose('base'),this.data.poseNames.map(pose));g.setAttribute('faceCoord',new T.Float32BufferAttribute(src.position,3));if(role==='clothing'){const coord=variant?{...variant.native,position:variant.native.standingPosition}:src;g.setAttribute('outfitCoord',new T.Float32BufferAttribute(coord.position,3));clothingZone(g,coord);easeShortSleeves(g,name,coord.position);}
  const tuckSource=variant?tuckClothes[name]:null,tuckBase=tuckSource?decode(tuckSource.position):originalNative[role].geometry.attributes.position.array,tuckDelta=decode(tuckSource?tuckSource.delta:kick.parts.find(p=>p.role===role).poses.flip12.position);g.userData.tuckPosition=Array.from({length:g.attributes.position.count*3},(_,j)=>{const i=Math.floor(j/3),d=transform(delta.slice(i*3,i*3+3),frames.flip12,true);return tuckBase[j]+tuckDelta[j]+d[j%3];});
  const restIndex=variant?new Map(src.keys.map((k,i)=>[JSON.stringify(k),i])):null;g.userData.restPosition=Array.from({length:g.attributes.position.count*3},(_,j)=>{const i=Math.floor(j/3),k=j%3,si=variant?restIndex.get(JSON.stringify(variant.native.keys[i])):i;const a=portrait.geometry.attributes.position.array;return k===0?-a[si*3+2]:k===1?a[si*3+1]:a[si*3];});
  if(role==='skin')hideCoveredCalves(g,name,g.attributes.position.array);const material=portrait.material;if(name==='BLACK'&&role==='clothing'&&!material.userData.stancePrint){const uniform=material.userData.stancePrint={value:0},before=material.onBeforeCompile,key=material.customProgramCacheKey.bind(material);material.customProgramCacheKey=()=>key()+'stance-print95';material.onBeforeCompile=s=>{before(s);s.uniforms.stancePrint=uniform;s.fragmentShader='uniform float stancePrint;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('vec4 logoInk=texture2D(teeLogo,printUV);','if(stancePrint>.5)printUV.x=1.-printUV.x;vec4 logoInk=texture2D(teeLogo,printUV);');};}tracking(material,this.headUniforms);const mesh=new T.Mesh(g,material);mesh.frustumCulled=false;mesh.castShadow=mesh.receiveShadow=true;mesh.userData.memoryCaster=true;surfaces[role]=mesh;
 }
 let j=0;for(const source of person.children.filter(m=>m.isMesh&&!person.bodyMeshes.includes(m)&&m.name!=='skin socket')){
  const input=source.geometry.attributes.position.array,pose=label=>{const out=[];for(let i=0;i<input.length;i+=3)out.push(...transform([input[i],input[i+1],input[i+2]],frames[label]));return out;};
  const g=morphGeometry(source.geometry,pose('base'),this.data.poseNames.map(pose)),count=g.attributes.position.count;g.userData.tuckPosition=pose('flip12');g.userData.restPosition=Array.from(input,(v,j)=>j%3===0?-input[j+2]:j%3===1?v:input[j-2]);g.setAttribute('headWeight',new T.Float32BufferAttribute(new Float32Array(count).fill(1),1));g.setAttribute('armWeight',new T.Float32BufferAttribute(new Float32Array(count),1));tracking(source.material,this.headUniforms);const mesh=new T.Mesh(g,source.material);mesh.name=source.name;mesh.frustumCulled=false;mesh.castShadow=mesh.receiveShadow=true;mesh.userData.memoryCaster=true;surfaces['portrait'+j++]=mesh;
 }
 this.nativeSurfaces=originalNative;this.data=this.baseData;prepareCrash(surfaces,name);return surfaces;
 }
}


