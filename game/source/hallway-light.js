import {eveningUniforms} from './evening-light.js';
import * as T from './vendor/three.module.js';
import {HallwayCue} from './hallway-cue.js';
import {LENGTH} from './world.js';
export function updateHallway(view,sim,dt,menu){
 const h=view.hallway;if(!h)return;h.cue??=new HallwayCue();const active=!menu&&!document.hidden&&['riding','coasting'].includes(sim.phase);if(!active)return;
 const returned=sim.car.s+10>LENGTH*.60;
 let visible=h.visible??false;h.scan=(h.scan??0)+dt;
 if((h.cue.state==='waiting'||!h.cue.nightPlayed)&&returned&&h.scan>.12){h.scan=0;visible=false;view.camera.updateMatrixWorld(true);const ray=new T.Raycaster();for(const point of h.points){const distance=view.camera.position.distanceTo(point);if(distance>140)continue;const projected=point.clone().project(view.camera);if(projected.z<-1||projected.z>1||Math.abs(projected.x)>.97||Math.abs(projected.y)>.97)continue;ray.set(view.camera.position,point.clone().sub(view.camera.position).normalize());ray.far=distance+.15;const hit=ray.intersectObjects(view.houseOccluders??[],false)[0];if(!hit||hit.distance>=distance-.25){visible=true;break;}}}
 h.visible=visible;
 const fullNight=(view.evening?.progress??0)>=1,pass=Math.floor((sim.car.s+LENGTH*.15)/LENGTH);
 const level=h.cue.update(dt,{active,returned,visible,fullNight,pass});
 // A modest daytime lift; retain the approved night brightness.
 h.light.value=level*(1+.25*(1-eveningUniforms.eveningNight.value));
}
