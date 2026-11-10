import {RAMP,rampHeight} from './road-details.js';
import {PavementContact} from './car-contact.js';
import {roadDistance} from './world.js';
// Build once from approved meshes. Never expand the road mask into soil shoulders.
export function installRideable(view){
 // Reuse the existing curb contact index instead of duplicating its dense triangles.
 const positions=[],meshes=[];view.scene.updateMatrixWorld(true);
 view.scene.traverse(o=>{if(!o.isMesh||!(o===view.detailPathMesh||o.name.startsWith('Radiused footpath connection ')))return;
  meshes.push(o.name||'Footpath');const p=o.geometry.attributes.position,idx=o.geometry.index,m=o.matrixWorld.elements;
  for(let j=0;j<(idx?idx.count:p.count);j++){const i=idx?idx.getX(j):j,x=p.getX(i),y=p.getY(i),z=p.getZ(i);positions.push(m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14]);}
 });
 const paved=new PavementContact(new Float32Array(positions));
 view.hazards.rideable=(x,z)=>roadDistance(x,z)<=0||view.roadContact.height(x,z)!==undefined||view.hazards.curb(x,z)!==undefined||paved.height(x,z)!==undefined;
 view.hazards.asphalt=(x,z)=>view.roadContact.height(x,z)!==undefined&&view.hazards.curb(x,z)===undefined&&paved.height(x,z)===undefined;
 const rampBase=view.scene.getObjectByName('Quarter-sheet plywood on hollow blocks').position.y;
 view.hazards.skateHeight=(x,z)=>Math.max(view.terrainSurface?.(x,z)??-Infinity,view.roadContact.height(x,z)??-Infinity,view.hazards.curb(x,z)??-Infinity,paved.height(x,z)??-Infinity,rampHeight(x,z)==null?-Infinity:rampBase+rampHeight(x,z));
 view.rideableAudit={meshes,reusedCurbIndex:true,triangles:paved.triangles.length};view.rideableContact=paved;
}
