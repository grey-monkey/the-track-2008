import {SegmentIndex} from './segment-index.js';
import {junctionPolygon} from './junction-shape.js';
// Metres; north is -z. Legacy pixel conversion below serves approximate terrain only.
// Scale bar: approximately 67 pixels / 200 feet. These are estimates, not a survey.
export const SCALE=60.96/67, ROAD_HALF=4.25;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const mix=(a,b,t)=>a+(b-a)*t;
export const angle=a=>Math.atan2(Math.sin(a),Math.cos(a));
export const point=(x,y)=>({x:(x-693)*SCALE,z:(y-339)*SCALE});
export const pixel=p=>({x:p.x/SCALE+693,y:p.z/SCALE+339});
// Google Maps north-up aerial, inspected 2026-09-10 at 1400 x 1000 CSS pixels.
// Displayed scale: 200 ft / 114 px. Close-up check: 100 ft / 113 px.
// Asphalt between curb edges is about 8.5 m; sidewalks are excluded.
export const AERIAL_SCALE=60.96/114;
export const aerialPoint=(x,y)=>({x:(x-717)*AERIAL_SCALE,z:(y-310)*AERIAL_SCALE});
export const bulb={...aerialPoint(443,786),r:28*AERIAL_SCALE};
const bez=(a,b,c,d,n=40)=>Array.from({length:n},(_,i)=>{const t=i/n,u=1-t;return{x:u*u*u*a.x+3*u*u*t*b.x+3*u*t*t*c.x+t*t*t*d.x,z:u*u*u*a.z+3*u*u*t*b.z+3*u*t*t*c.z+t*t*t*d.z};});
const B=(a,b,c,d,n)=>bez(aerialPoint(...a),aerialPoint(...b),aerialPoint(...c),aerialPoint(...d),n);
const west=[...B([717,310],[668,405],[594,529],[544,614],100),...B([544,614],[522,654],[508,699],[510,746],50)];
const east=[
 ...B([550,791],[620,761],[739,700],[816,657],70),
 ...B([816,657],[865,630],[883,610],[883,554],45),
 ...B([883,554],[886,508],[855,467],[850,420],45),
 ...B([850,420],[845,374],[845,344],[825,308],40),
 ...B([825,308],[810,277],[785,237],[762,239],40),
 ...B([762,239],[749,240],[730,285],[717,310],40)
];
export const roadPoints=[...west,...B([510,746],[511,788],[500,813],[550,791],45),...east];
// Entrance close-up registered to the northern junction. The approach is not part of the lap.
export const entrancePoints=[...B([762,239],[779,207],[799,174],[834,161],48),...B([834,161],[851,155],[865,150],[878,148],24),aerialPoint(878,148)];
export const entranceJunction=junctionPolygon;
const junctionBox=entranceJunction.reduce((b,p)=>[Math.min(b[0],p.x),Math.min(b[1],p.z),Math.max(b[2],p.x),Math.max(b[3],p.z)],[Infinity,Infinity,-Infinity,-Infinity]);
function junctionDistance(x,z,nearest){const d=Math.hypot(Math.max(junctionBox[0]-x,0,x-junctionBox[2]),Math.max(junctionBox[1]-z,0,z-junctionBox[3]));return d>0&&d>=nearest?Infinity:polygonDistance(x,z,entranceJunction);}
export const ENTRANCE_HOUSES=[
 {name:'Blue roof',...aerialPoint(784,129),roof:0x4b6477,wall:0xd3cdc0,width:17,depth:13,rotation:.85,drive:aerialPoint(808,164)},
 {name:'Gray roof',...aerialPoint(753,176),roof:0x818681,wall:0xc8c4b5,width:16,depth:12,rotation:.85,drive:aerialPoint(783,202)},
 {name:'Brown roof',...aerialPoint(715,217),roof:0x796653,wall:0xd2bea4,width:18,depth:13,rotation:.85,drive:aerialPoint(745,238)}
];
export function entranceDistance(x,z){return indexFor(entrancePoints,false).distance(x,z)-ROAD_HALF;}
export const throat=[aerialPoint(512,797),aerialPoint(463,787)];
export const throatPolygon=[[461,772],[480,784],[501,785],[512,774],[526,792],[535,805],[492,810],[460,805]].map(p=>aerialPoint(...p));
// Traced directional sweep: cut inward on approach, arc around the obstacle,
// then cross the open throat diagonally. This is not a curb-following circle.
const lp=(x,z)=>({x:bulb.x+x,z:bulb.z+z});
export function bulbSpeedAllowance(x,z){const t=clamp((34-Math.hypot(x-bulb.x,z-bulb.z))/10,0,1);return 1+.55*t*t*(3-2*t);}
const routeRaw=[...west,
 ...B([510,746],[511,763],[513,779],[503,791],28),
 ...bez(aerialPoint(503,791),lp(22,5),lp(13,3.8),lp(7,4),38),
 ...bez(lp(7,4),lp(1,4.2),lp(-5,7),lp(-7,2),32),
 ...bez(lp(-7,2),lp(-9,-3),lp(-6,-8),lp(0,-8),36),
 ...bez(lp(0,-8),lp(6,-8),lp(10,-4),lp(16,-1),34),
 ...bez(lp(16,-1),lp(22,2),aerialPoint(518,803),aerialPoint(526,800),36),
 ...B([526,800],[534,797],[542,794.5],[550,791],20),...east
];
function makeTable(raw){let s=0;return raw.map((p,i)=>{if(i)s+=Math.hypot(p.x-raw[i-1].x,p.z-raw[i-1].z);return {...p,s};});}
export const route=makeTable(routeRaw);
export const LENGTH=route.at(-1).s+Math.hypot(route.at(-1).x-route[0].x,route.at(-1).z-route[0].z);
const entryRaw=[...entrancePoints].reverse().concat(B([762,239],[749,261],[730,288],[717,310],45));
const entryTable=makeTable(entryRaw);export const ENTRY_LENGTH=entryTable.at(-1).s+Math.hypot(entryTable.at(-1).x-route[0].x,entryTable.at(-1).z-route[0].z);
// Entry traffic passes beside the blank gate monument, returning to the road center.
function gateBypass(p){const c=entrancePoints[58],a=entrancePoints[56],b=entrancePoints[60],len=Math.hypot(b.x-a.x,b.z-a.z),tx=(b.x-a.x)/len,tz=(b.z-a.z)/len,z=(p.x-c.x)*tx+(p.z-c.z)*tz,weight=Math.abs(z)<18?Math.pow(Math.cos(z/18*Math.PI/2),2):0;return{x:p.x-tz*2.5*weight,z:p.z+tx*2.5*weight};}
export function sample(s){if(s<0){const d=Math.max(0,s+ENTRY_LENGTH);let i=0;while(i<entryTable.length-1&&entryTable[i+1].s<d)i++;const a=entryTable[i],b=entryTable[i+1]??{...route[0],s:ENTRY_LENGTH},t=(d-a.s)/Math.max(.001,b.s-a.s);return gateBypass({x:mix(a.x,b.x,t),z:mix(a.z,b.z,t)});}s=((s%LENGTH)+LENGTH)%LENGTH;let lo=0,hi=route.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(route[m].s<=s)lo=m;else hi=m-1;}const a=route[lo],b=route[(lo+1)%route.length],bs=lo===route.length-1?LENGTH:b.s,t=(s-a.s)/(bs-a.s);return {x:mix(a.x,b.x,t),z:mix(a.z,b.z,t)};}
export function heading(s){const a=sample(s-.7),b=sample(s+.7);return Math.atan2(b.z-a.z,b.x-a.x);}
export function curvature(s){return angle(heading(s+2)-heading(s-2))/4;}
export function baseHeight(x,z){const p=pixel({x,z});return -4.8*clamp((p.x-690)/60,0,1)*Math.exp(-(((p.y-402)/102)**2));}
export function height(x,z){const original=baseHeight(x,z);
 const inside=x>-150&&x<105&&z>0&&z<270&&polygonDistance(x,z,roadPoints)<0;
 const central=inside?2.6*Math.exp(-(((x-3)/57)**2+((z-112)/88)**2))*clamp((roadDistance(x,z)-1)/15,0,1):0;
 // Visual grading is confined to the entrance verges; asphalt and driving heights stay exact.
 if(x < -95 || x > 160 || z < -185 || z > 45)return original+central;
 const fade=clamp(Math.min(x+95,160-x,z+185,45-z)/24,0,1);
 const d=Math.max(0,roadDistance(x,z)-.45),rise=clamp(d/16,0,1);
 const grade=rise*rise*(3-2*rise);
 return original+central+fade*grade*(1.85+.22*Math.sin(x*.055+z*.035));}
function segmentDistance(p,a,b){const dx=b.x-a.x,dz=b.z-a.z,t=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);}
export function laneDistance(x,z){return indexFor(roadPoints).distance(x,z);}
// Union of road ribbon, throat and open asphalt disk. Never distance to car path.
export function polygonDistance(x,z,poly){const index=indexFor(poly),d=index.distance(x,z);return index.contains(x,z)?-d:d;}
const segmentIndices=new WeakMap();
function indexFor(points,closed=true){let index=segmentIndices.get(points);if(!index){index=new SegmentIndex(points,closed);segmentIndices.set(points,index);}return index;}
export function roadDistance(x,z){const d=Math.min(laneDistance(x,z)-ROAD_HALF,entranceDistance(x,z),polygonDistance(x,z,throatPolygon),Math.hypot(x-bulb.x,z-bulb.z)-bulb.r);return Math.min(d,junctionDistance(x,z,d));}
export const CUL_START=route.find(p=>Math.hypot(p.x-bulb.x,p.z-bulb.z)<15)?.s??260;
// Visible central path; obscured sections are interpolated, not surveyed.
export const FOOTPATH=[[782,264],[766,287],[754,334],[750,396],[750,465],[741,525],[720,568],[687,585],[648,598],[618,631],[607,673],[610,727],[630,750]].map(p=>aerialPoint(...p));
export const RIDERS={DOG:{ollie:false,grip:1,control:.8,shirt:0x27282b,pants:0x20272d,hair:0x352922},SALLY:{ollie:true,grip:1.12,control:1.12,shirt:0x202630,pants:0x79745f,hair:0x443426},BLACK:{ollie:true,grip:1.08,control:1,shirt:0x363b41,pants:0x6c7e88,hair:0x9b845e},BOSS:{ollie:false,grip:.95,control:.92,shirt:0xd1cdbf,pants:0x323741,hair:0x3c2d23}};
export const BOARDS={LONGBOARD:{label:'Luxury Longboard',ollie:false,grip:4.6,steer:.62,length:1.05},CRUISER:{label:'Lords of Dogtown',ollie:true,grip:3.8,steer:.95,length:.80},HANDMEDOWN:{label:'Hand-Me-Down Pintail',ollie:false,grip:3.9,steer:.64,length:.98},STREET:{label:'Element Street Deck',ollie:true,grip:3.5,steer:.9,length:.79}};

// Dense terrain drops beneath the pavement corridor, preventing interpolation through road dips.
export function terrainHeight(x,z){return roadDistance(x,z)<3.2?baseHeight(x,z)-.48:height(x,z)-.035;}
