import {bulb,height} from '../world.js';
export const CANOPY={x:600,z:600,radius:10.8,wallHeight:.55,wallThickness:.24,gap:1.7};
export const ISLAND={x:bulb.x,z:bulb.z,radius:4,height:.09,bevel:.18};
const a=-Math.PI/4,h=a-Math.PI/2;
export const TRIGGER={x:bulb.x+Math.cos(a)*(bulb.r-1.2),z:bulb.z+Math.sin(a)*(bulb.r-1.2),y:height(bulb.x,bulb.z)+.015,heading:h,yaw:h,hx:.95,hz:.48};
export const ENTRY={x:bulb.x-4,z:bulb.z,y:height(bulb.x,bulb.z),yaw:Math.PI/2,width:2.8,length:6.5};
export function entryLocal(x,z){const dx=x-ENTRY.x,dz=z-ENTRY.z,c=Math.cos(ENTRY.yaw),s=Math.sin(ENTRY.yaw);return{u:dx*c-dz*s,v:dx*s+dz*c};}
export function entryPoint(u,v){const c=Math.cos(ENTRY.yaw),s=Math.sin(ENTRY.yaw);return{x:ENTRY.x+c*u+s*v,z:ENTRY.z-s*u+c*v};}
export function tunnelFloor(x,z){const q=entryLocal(x,z);if(Math.abs(q.u)>1.4||q.v<-.3||q.v>6.5)return undefined;return ENTRY.y-Math.max(0,q.v)*.45;}
export function islandFloor(x,z){const d=Math.hypot(x-ISLAND.x,z-ISLAND.z);return d>ISLAND.radius?undefined:ENTRY.y+ISLAND.height*Math.min(1,(ISLAND.radius-d)/ISLAND.bevel);}
export const CHAIR_CENTERS=[0,1,2,3].map(i=>({x:CANOPY.x+Math.cos(i*Math.PI/2)*1.28,z:CANOPY.z+Math.sin(i*Math.PI/2)*1.28}));
export function canopyWalls(){const walls=[],count=96,R=CANOPY.radius;for(let i=0;i<count;i++){const a=(i+.5)*Math.PI*2/count,x=Math.cos(a)*R,z=Math.sin(a)*R;if(z>0&&Math.abs(x)<CANOPY.gap+.22)continue;walls.push({kind:'CANOPY_WALL',x:600+x,z:600+z,hx:Math.PI*R/count+.02,hz:CANOPY.wallThickness/2,yaw:a+Math.PI/2,bottom:0,top:CANOPY.wallHeight});}for(const side of [-1,1])walls.push({kind:'CANOPY_PASSAGE',x:600+side*1.8,z:612,hx:.12,hz:2.1,yaw:0,bottom:0,top:.55});return walls;}
