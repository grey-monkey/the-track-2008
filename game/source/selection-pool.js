import * as T from './vendor/three.module.js';
import {eveningUniforms} from './evening-light.js';
// Project the selected model's silhouette from the same warm key-light position.
export class SelectionPool{
 constructor(view,crew=false){this.crew=crew;this.view=view;this.links=[];this.clear=new T.Color();this.elapsed=1;this.target=new T.WebGLRenderTarget(512,512);this.scene=new T.Scene();this.scene.background=new T.Color(0);this.camera=new T.PerspectiveCamera(crew?110:58,1,.1,30);this.white=new T.MeshBasicMaterial({color:0xffffff,side:T.DoubleSide});this.uniforms={crew:{value:crew?1:0},night:eveningUniforms.eveningNight,image:{value:this.target.texture},projection:{value:new T.Matrix4()}};this.material=new T.ShaderMaterial({transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,uniforms:this.uniforms,vertexShader:'varying vec4 lightCoord;uniform mat4 projection;void main(){vec4 world=modelMatrix*vec4(position,1.);lightCoord=projection*world;gl_Position=projectionMatrix*viewMatrix*world;}',fragmentShader:`uniform sampler2D image;uniform float crew;uniform float night;varying vec4 lightCoord;void main(){vec2 uv=lightCoord.xy/lightCoord.w*.5+.5;float radius=length(uv-.5);float pool=1.-smoothstep(.12,.44,radius);pool*=pool;if(lightCoord.w<=0.||pool<.001)discard;float mask=texture2D(image,uv).r*.6;mask+=(texture2D(image,uv+vec2(.0018,0.)).r+texture2D(image,uv-vec2(.0018,0.)).r)*.2;gl_FragColor=crew>.5?vec4(vec3(.004,.006,.009),mask*pool*.62*night):vec4(mix(vec3(.54,.30,.105),vec3(.006,.008,.014),mask),pool*mix(.22,.49,mask));}`});this.receiver=new T.Mesh(new T.BufferGeometry(),this.material);this.receiver.name='Selected rider warm light and cast shadow';view.staging.add(this.receiver);}
 update(person,lamp,extra=null,dt=0){
 const roots=[person,...(Array.isArray(extra)?extra:extra?.visible?[extra]:[])];
 const key=person.name+person.position.toArray().join(',')+roots.map(r=>r.uuid+String(r.visible)).join();
 const changed=key!==this.key;this.elapsed+=dt;if(!changed&&this.elapsed<.10)return;this.elapsed=0;
 if(changed){this.key=key;this.scene.clear();this.links=[];
 for(const root of new Set(roots)){root.updateWorldMatrix(true,true);root.traverseVisible(src=>{if(!src.isMesh||src.material.transparent||src.userData.memoryCaster===false)return;const m=new T.Mesh(src.geometry,this.white);m.matrixAutoUpdate=false;m.frustumCulled=false;this.scene.add(m);this.links.push([src,m]);});}}
 for(const root of roots)root.updateWorldMatrix(true,true);
 for(const [src,m]of this.links){m.matrix.copy(src.matrixWorld);m.visible=true;for(let n=src;n;n=n.parent)if(!n.visible){m.visible=false;break;}if(src.morphTargetInfluences)m.morphTargetInfluences=src.morphTargetInfluences;}
 this.camera.position.copy(lamp);this.camera.lookAt(person.position.clone().add(new T.Vector3(0,.55,0)));this.camera.updateMatrixWorld(true);this.uniforms.projection.value.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse);
 if(changed){const g=new T.PlaneGeometry(this.crew?22:7,this.crew?22:7,96,96);g.rotateX(-Math.PI/2);const a=g.attributes.position;for(let i=0;i<a.count;i++){const x=a.getX(i)+person.position.x,z=a.getZ(i)+person.position.z;a.setXYZ(i,x,this.view.surfaceGround(x,z)+.045,z);}g.computeBoundingSphere();this.receiver.geometry.dispose();this.receiver.geometry=g;}
 const r=this.view.renderer,target=r.getRenderTarget(),clear=r.getClearColor(this.clear),alpha=r.getClearAlpha();r.setRenderTarget(this.target);r.setClearColor(0,1);r.clear();r.render(this.scene,this.camera);r.setRenderTarget(target);r.setClearColor(clear,alpha);

 }
}
