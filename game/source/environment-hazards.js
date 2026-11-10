import * as T from './vendor/three.module.js';
import {PavementContact} from './car-contact.js';
import {HazardWorld} from './hazards.js';
// Build collision boundaries after placement/ground fitting, from the same assets.
export function installHazards(view){
 const layout={covers:[],drains:view.drainHazards??[],solids:[...(view.detailSolids??[])]};view.scene.updateMatrixWorld(true);
 view.site.traverse(o=>{
  if(o.userData.assetKind==='water_manhole_cover'){const box=new T.Box3().setFromObject(o),normal=new T.Vector3(0,1,0).applyQuaternion(o.quaternion);layout.covers.push({x:o.position.x,z:o.position.z,radius:.346,y:o.position.y+.00052/normal.y,gx:-normal.x/normal.y,gz:-normal.z/normal.y});}
  if(!['fire_hydrant','utility_box_02'].includes(o.userData.assetKind))return;
  const local=new T.Box3();for(const m of o.children){m.geometry.computeBoundingBox();local.union(m.geometry.boundingBox);}const c=local.getCenter(new T.Vector3()).applyMatrix4(o.matrixWorld),size=local.getSize(new T.Vector3()).multiply(o.scale);
  layout.solids.push({kind:o.userData.assetKind==='fire_hydrant'?'HYDRANT':'CABINET',x:c.x,z:c.z,hx:size.x/2,hz:size.z/2,yaw:-o.rotation.y,bottom:c.y-size.y/2,top:c.y+size.y/2});
  if(o.userData.assetKind==='utility_box_02')layout.solids.push({kind:'CABINET_BASE',x:o.position.x,z:o.position.z,hx:.60,hz:.36,yaw:-o.rotation.y,bottom:o.position.y-.32,top:o.position.y-.002});
 });
 for(const pole of view.streetlights){const y=pole.position.y;layout.solids.push({kind:'POST',x:pole.position.x,z:pole.position.z,radius:.105,bottom:y,top:y+4.4});layout.solids.push({kind:'POST_BASE',x:pole.position.x,z:pole.position.z,radius:.23,bottom:y-.08,top:y+.30});}
 const values=[];for(const name of ['Tapered rolled curb','Circuit poured curb','Junction poured curb','Bulb poured curb']){const m=view.scene.getObjectByName(name);if(m)for(const v of m.geometry.attributes.position.array)values.push(v);}
 const curb=new PavementContact(new Float32Array(values)),surface=view.surfaceGround;
 const world=new HazardWorld(layout,{surface,curb:(x,z)=>curb.height(x,z)});
 // The raised metal is also a support surface, so wheels and tumbling geometry
 // meet the visible fixture instead of passing through its top.
 view.surfaceGround=(x,z)=>{let y=surface(x,z);for(const o of world.cells.get(Math.floor(x/8)+','+Math.floor(z/8))??[]){if(o.type==='solids')continue;let inside;if(o.type==='covers')inside=Math.hypot(x-o.x,z-o.z)<=o.radius;else{const co=Math.cos(o.yaw),si=Math.sin(o.yaw),dx=x-o.x,dz=z-o.z;inside=Math.abs(dx*co+dz*si)<=o.hx&&Math.abs(-dx*si+dz*co)<=o.hz;}if(inside)y=Math.max(y,o.y+(o.gx??0)*(x-o.x)+(o.gz??0)*(z-o.z));}return y;};
 view.surfaceGround.upperBound=(xa,xb,za,zb)=>{let y=surface.upperBound?.(xa,xb,za,zb)??Infinity;for(const o of [...layout.covers,...layout.drains]){const radius=o.radius??Math.hypot(o.hx,o.hz);if(o.x+radius<xa||o.x-radius>xb||o.z+radius<za||o.z-radius>zb)continue;y=Math.max(y,o.y+Math.max((o.gx??0)*(xa-o.x),(o.gx??0)*(xb-o.x))+Math.max((o.gz??0)*(za-o.z),(o.gz??0)*(zb-o.z)));}return y;};
 view.surfaceGround.prepare=(xa,xb,za,zb)=>{const base=surface.prepare?.(xa,xb,za,zb)??surface,fixtures=world.nearby({x:xa,z:za},{x:xb,z:zb},0).filter(o=>o.type!=='solids');const local=(x,z)=>{if(x<xa||x>xb||z<za||z>zb)return view.surfaceGround(x,z);let y=base(x,z);for(const o of fixtures){let inside;if(o.type==='covers')inside=Math.hypot(x-o.x,z-o.z)<=o.radius;else{const co=Math.cos(o.yaw),si=Math.sin(o.yaw),dx=x-o.x,dz=z-o.z;inside=Math.abs(dx*co+dz*si)<=o.hx&&Math.abs(-dx*si+dz*co)<=o.hz;}if(inside)y=Math.max(y,o.y+(o.gx??0)*(x-o.x)+(o.gz??0)*(z-o.z));}return y;};local.upperBound=(xa,xb,za,zb)=>{let y=base.upperBound?.(xa,xb,za,zb)??Infinity;for(const o of fixtures){const r=o.radius??Math.hypot(o.hx,o.hz);if(o.x+r<xa||o.x-r>xb||o.z+r<za||o.z-r>zb)continue;y=Math.max(y,o.y+Math.max((o.gx??0)*(xa-o.x),(o.gx??0)*(xb-o.x))+Math.max((o.gz??0)*(za-o.z),(o.gz??0)*(zb-o.z)));}return y;};return local;};
 view.contactSurface=(x,z,radius=2)=>world.nearby({x,z},{x,z},radius).some(o=>o.type!=='solids'&&Math.hypot(o.x-x,o.z-z)<radius+(o.radius??Math.hypot(o.hx,o.hz)))?view.surfaceGround:surface;world.baseSurface=surface;world.surface=view.surfaceGround;view.hazards=world;view.hazardCounts=Object.fromEntries(Object.entries(layout).map(([k,v])=>[k,v.length]));
}

