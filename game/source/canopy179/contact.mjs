import {islandFloor,tunnelFloor,ENTRY} from './layout.mjs';
export function installIslandContact(h,route){
 const original={surface:h.surface.bind(h),skate:h.skateHeight.bind(h),curb:h.curb.bind(h),asphalt:h.asphalt.bind(h),rideable:h.rideable.bind(h)};
 const ramp=(x,z)=>route.state==='open'?tunnelFloor(x,z):undefined;
 const level=(x,z)=>ramp(x,z)??islandFloor(x,z);
 h.skateHeight=(x,z)=>level(x,z)??original.skate(x,z);
 h.surface=(x,z)=>level(x,z)??original.surface(x,z);
 h.curb=(x,z)=>ramp(x,z)!==undefined?undefined:(islandFloor(x,z)>ENTRY.y+.004?islandFloor(x,z):original.curb(x,z));
 h.asphalt=(x,z)=>ramp(x,z)!==undefined||islandFloor(x,z)===undefined&&original.asphalt(x,z);
 h.rideable=(x,z)=>level(x,z)!==undefined||original.rideable(x,z);
 return level;
}
