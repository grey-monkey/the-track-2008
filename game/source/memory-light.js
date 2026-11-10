import * as T from './vendor/three.module.js';
export const sunDirection=new T.Vector3(-.68,.42,-.60).normalize();
export const memoryLight={shadowImage:{value:null},shadowDepth:{value:null},shadowMatrix:{value:new T.Matrix4()},shadowReady:{value:0},shadowSelection:{value:0},lampPositions:{value:Array.from({length:4},()=>new T.Vector3(0,-1000,0))}};
// A small moving silhouette pass: real car/pose contours, soft painted edges.
// Only foreground actors are drawn again, rather than the entire neighborhood.
export class MemoryShadows{
 constructor(){this.target=new T.WebGLRenderTarget(512,512,{depthBuffer:true});this.target.depthTexture=new T.DepthTexture(512,512,T.UnsignedIntType);this.target.depthTexture.minFilter=this.target.depthTexture.magFilter=T.NearestFilter;this.scene=new T.Scene();this.scene.background=new T.Color(0);this.camera=new T.OrthographicCamera(-12,12,12,-12,.1,80);this.links=[];this.material=new T.MeshBasicMaterial({color:0xffffff,side:T.DoubleSide});this.center=new T.Vector3();this.clear=new T.Color();memoryLight.shadowImage.value=this.target.texture;memoryLight.shadowDepth.value=this.target.depthTexture;}
 rebuild(view){for(const m of this.cutoutMaterials??[])m.dispose();this.cutoutMaterials=[];this.scene.clear();this.links=[];const roots=view.staging?.visible?[view.car,...Object.values(view.people),view.displayBoard]:[view.car,view.human,view.board];for(const root of roots.filter(Boolean))root.traverseVisible(src=>{if(!src.isMesh||!src.visible||src.material.transparent||src.userData.memoryCaster===false)return;let mat=this.material;if(src.material.alphaTest&&src.material.map){mat=new T.MeshBasicMaterial({color:0xffffff,map:src.material.map,alphaTest:src.material.alphaTest,side:T.DoubleSide});mat.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>','outgoingLight=vec3(1.);\n#include <opaque_fragment>');};this.cutoutMaterials.push(mat);}if(src.userData.installReachShadow){mat=mat.clone();src.userData.installReachShadow(mat);this.cutoutMaterials.push(mat);}const copy=new T.Mesh(src.geometry,mat);copy.matrixAutoUpdate=false;copy.frustumCulled=false;this.scene.add(copy);this.links.push([src,copy]);});this.rider=view.human.name;this.selection=!!view.staging?.visible;this.selectionBoard=view.displayBoard;this.menuRider=view.chosen?.rider;
  // Cache the stationary gathering bounds; idle poses must not make the capture breathe.
  this.menuBounds=new T.Box3();if(this.selection)for(const [src] of this.links){src.updateWorldMatrix(true,false);if(!src.geometry.boundingBox)src.geometry.computeBoundingBox();this.menuBounds.union(src.geometry.boundingBox.clone().applyMatrix4(src.matrixWorld));}
 }
 render(view){const changed=this.rider!==view.human.name||this.selection!==!!view.staging?.visible||this.selectionBoard!==view.displayBoard||this.menuRider!==view.chosen?.rider;if(!changed&&view.staging?.visible&&view.menuTime-(this.lastMenuShadow??-1)<.10)return;if(view.staging?.visible)this.lastMenuShadow=view.menuTime;if(changed)this.rebuild(view);for(const root of [view.car,view.rider,view.board,...(view.staging?.visible?[view.staging]:[])])root.updateWorldMatrix(true,true);for(const [src,copy] of this.links){copy.visible=true;for(let node=src;node;node=node.parent)if(!node.visible){copy.visible=false;break;}if(copy.geometry!==src.geometry){copy.geometry=src.geometry;copy.updateMorphTargets();}copy.matrix.copy(src.matrixWorld);if(src.morphTargetInfluences)copy.morphTargetInfluences=src.morphTargetInfluences;}
  this.center.copy(view.car.position).lerp(view.staging?.visible?view.people[view.chosen.rider].position:view.rider.position,.5);this.camera.position.copy(this.center).addScaledVector(sunDirection,35);this.camera.lookAt(this.center);this.camera.updateMatrixWorld(true);
  memoryLight.shadowSelection.value=this.selection?1:0;
  if(this.selection&&!this.menuBounds.isEmpty()){
   // Low sun compresses the casters into a narrow strip. Spend the existing
   // 512px capture on that strip instead of blurring it across a 24m square.
   const b=this.menuBounds,fit=new T.Box3();
   for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])fit.expandByPoint(new T.Vector3(x,y,z).applyMatrix4(this.camera.matrixWorldInverse));
   this.camera.left=fit.min.x-.7;this.camera.right=fit.max.x+.7;
   this.camera.bottom=fit.min.y-.35;this.camera.top=fit.max.y+.35;
  }else{this.camera.left=this.camera.bottom=-12;this.camera.right=this.camera.top=12;}
  this.camera.updateProjectionMatrix();memoryLight.shadowMatrix.value.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse);
  const renderer=view.renderer,target=renderer.getRenderTarget();renderer.getClearColor(this.clear);const alpha=renderer.getClearAlpha();renderer.setRenderTarget(this.target);renderer.setClearColor(0,1);renderer.clear();renderer.render(this.scene,this.camera);renderer.setRenderTarget(target);renderer.setClearColor(this.clear,alpha);memoryLight.shadowReady.value=1;
 }
}
