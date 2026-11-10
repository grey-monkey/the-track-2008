import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as T from '../vendor/three.module.js';
import {installPush,applyPush,solvePushLeg,pushFootOffset} from './push-cycle.mjs';
globalThis.fetch=async p=>new Response(await readFile(new URL('../'+p,import.meta.url)));
const {cachedSurfaces}=await import('../baked131/runtime.js');
test('push cycle keeps bone lengths and returns to the deck exactly',()=>{
 const a=new T.Vector3(.19960633,.84444513,.07054905),b=new T.Vector3(-.09148063,.55465339,.14925895),c=new T.Vector3(-.02978483,.1398746,.20754611);
 for(let i=0;i<=100;i++){
  const s=solvePushLeg(a,b,c,c.clone().add(pushFootOffset(i/100)));
  assert.ok(Math.abs(a.distanceTo(s.elbow)-a.distanceTo(b))<1e-6);
  assert.ok(Math.abs(s.elbow.distanceTo(s.end)-b.distanceTo(c))<1e-6);
 }
 assert.equal(pushFootOffset(0).length(),0);assert.equal(pushFootOffset(1).length(),0);
 assert.ok(pushFootOffset(.22).z<pushFootOffset(.58).z,'foot sweeps backward during contact');
});
for(const name of ['DOG','SALLY','BOSS','BLACK'])test(name+' maps leg weights and cancels safely for crashes/air',()=>{
 const h={surfaces:cachedSurfaces(name,()=>new T.MeshBasicMaterial()),air:0,crouch:0,release:1,pushPhase:.45};
 installPush(h,h.surfaces);
 const skin=h.surfaces.skin.geometry.attributes,skinPos=skin.position.array,skinWeight=skin.pushWeight.array;
 let pushingAnkle=0,supportAnkle=0;
 for(let i=0;i<skinPos.length;i+=3){
  const weight=skinWeight[i]+skinWeight[i+1]+skinWeight[i+2];
  if(skinPos[i+1]>.5)assert.equal(weight,0,'upper skin must remain unaffected');
  else if(skinPos[i+2]>.1){assert.ok(weight>.95,'exposed pushing ankle must follow the calf');pushingAnkle++;}
  else {assert.equal(weight,0,'support ankle must remain planted');supportAnkle++;}
 }
 assert.ok(pushingAnkle>0&&supportAnkle>0);
 for(const role of ['skin','clothing','shoes']){
  const mesh=h.surfaces[role],w=mesh.geometry.attributes.pushWeight.array;
  for(let i=0;i<w.length;i+=3)assert.ok(w[i]+w[i+1]+w[i+2]<=1.0001);
  const shader={uniforms:{},vertexShader:'#include <defaultnormal_vertex>\n#include <project_vertex>'};
  mesh.material.onBeforeCompile(shader);assert.ok(shader.vertexShader.includes('uniform mat4 pushUpper'));
  const shadow=new T.MeshBasicMaterial();mesh.userData.installReachShadow(shadow);
  const s={uniforms:{},vertexShader:'#include <project_vertex>'};shadow.onBeforeCompile(s);assert.equal(s.uniforms.pushFoot,h.pushUniforms.pushFoot);
 }
 applyPush(h);assert.ok(!h.pushUniforms.pushFoot.value.equals(new T.Matrix4()));
 h.air=1;applyPush(h);assert.ok(h.pushUniforms.pushFoot.value.equals(new T.Matrix4()));
 h.air=0;h.surfaces.skin.geometry=h.surfaces.skin.userData.crashGeometry;applyPush(h);assert.ok(h.pushUniforms.pushFoot.value.equals(new T.Matrix4()));
 h.surfaces.skin.geometry=h.surfaces.skin.userData.rideGeometry;h.pushPhase=null;applyPush(h);assert.ok(h.pushUniforms.pushFoot.value.equals(new T.Matrix4()));
});
