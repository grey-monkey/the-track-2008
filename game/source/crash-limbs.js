import * as T from './vendor/three.module.js';
import {fallMotion} from './motion131/fall-motion.mjs';
export function useCrashGeometry(h,active){for(const m of Object.values(h.surfaces)){const g=active?m.userData.crashGeometry:m.userData.rideGeometry;if(g&&m.geometry!==g){m.geometry=g;m.updateMorphTargets();if(!active)h.weights.forEach((w,i)=>{if(i<m.morphTargetInfluences.length)m.morphTargetInfluences[i]=w;});}}}
export function crashPose(sim){return fallMotion(sim).weights;}
const warmed=new WeakSet();
export async function warmCrash(view){
 const h=view.human;if(warmed.has(h.surfaces))return;
 const renderer=view.renderer,scene=new T.Scene();scene.fog=view.scene.fog;const camera=new T.PerspectiveCamera(55,1,.01,20);camera.position.set(0,1,4);camera.lookAt(0,1,0);const target=new T.WebGLRenderTarget(32,32),previous=renderer.getRenderTarget();
 try{for(const surfaces of [h.surfaces]){scene.clear();for(const m of Object.values(surfaces)){const copy=new T.Mesh(m.userData.crashGeometry,m.material);copy.frustumCulled=false;scene.add(copy);}if(renderer.compileAsync)await renderer.compileAsync(scene,camera,view.scene);renderer.setRenderTarget(target);renderer.render(scene,camera);}}
 finally{renderer.setRenderTarget(previous);target.dispose();}warmed.add(h.surfaces);
}

