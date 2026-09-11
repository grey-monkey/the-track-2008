// Metres, traced against the supplied 1366 x 768 aerial. North is -z.
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
export const throat=[aerialPoint(512,797),aerialPoint(463,787)];
export const throatPolygon=[[461,772],[480,784],[501,785],[512,774],[526,792],[535,805],[492,810],[460,805]].map(p=>aerialPoint(...p));
// Preserve the remembered clockwise open-bulb driving route, independent of curbs.
const R=10.8,a0=.65,a1=5.64;
const cp=a=>({x:bulb.x+R*Math.cos(a),z:bulb.z+R*Math.sin(a)});
const e=cp(a0),out=cp(a1);
const routeRaw=[...west,
 ...B([510,746],[511,763],[513,779],[503,791],28),
 ...bez(aerialPoint(503,791),aerialPoint(490,807),{x:e.x+5,z:e.z-4},e,28),
 ...Array.from({length:110},(_,i)=>cp(mix(a0,a1,i/110))),
 ...bez(out,{x:out.x+5,z:out.z+6},aerialPoint(493,812),aerialPoint(526,800),32),
 ...B([526,800],[534,797],[542,794.5],[550,791],20),...east
];
function makeTable(raw){let s=0;return raw.map((p,i)=>{if(i)s+=Math.hypot(p.x-raw[i-1].x,p.z-raw[i-1].z);return {...p,s};});}
export const route=makeTable(routeRaw);
export const LENGTH=route.at(-1).s+Math.hypot(route.at(-1).x-route[0].x,route.at(-1).z-route[0].z);
export function sample(s){s=((s%LENGTH)+LENGTH)%LENGTH;let lo=0,hi=route.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(route[m].s<=s)lo=m;else hi=m-1;}const a=route[lo],b=route[(lo+1)%route.length],bs=lo===route.length-1?LENGTH:b.s,t=(s-a.s)/(bs-a.s);return {x:mix(a.x,b.x,t),z:mix(a.z,b.z,t)};}
export function heading(s){const a=sample(s-.7),b=sample(s+.7);return Math.atan2(b.z-a.z,b.x-a.x);}
export function curvature(s){return angle(heading(s+2)-heading(s-2))/4;}
export function height(x,z){const p=pixel({x,z});const east=clamp((p.x-690)/60,0,1);return -4.8*east*Math.exp(-(((p.y-402)/102)**2));}
function segmentDistance(p,a,b){const dx=b.x-a.x,dz=b.z-a.z,t=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);}
export function laneDistance(x,z){const p={x,z};let d=Infinity;for(let i=0;i<roadPoints.length;i++)d=Math.min(d,segmentDistance(p,roadPoints[i],roadPoints[(i+1)%roadPoints.length]));return d;}
// Union of road ribbon, throat and open asphalt disk. Never distance to car path.
export function polygonDistance(x,z,poly){let inside=false,d=Infinity;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a.z>z)!==(b.z>z)&&x<(b.x-a.x)*(z-a.z)/(b.z-a.z)+a.x)inside=!inside;d=Math.min(d,segmentDistance({x,z},a,b));}return inside?-d:d;}
export function roadDistance(x,z){return Math.min(laneDistance(x,z)-ROAD_HALF,polygonDistance(x,z,throatPolygon),Math.hypot(x-bulb.x,z-bulb.z)-bulb.r);}
export const CUL_START=route.find(p=>Math.hypot(p.x-bulb.x,p.z-bulb.z)<15)?.s??260;
// Visible central path; obscured sections are interpolated, not surveyed.
export const FOOTPATH=[[782,264],[766,287],[754,334],[750,396],[750,465],[741,525],[720,568],[687,585],[648,598],[618,631],[607,673],[610,727],[630,750]].map(p=>aerialPoint(...p));
export const RIDERS={DOG:{ollie:false,grip:1,control:.8,shirt:0x27282b,pants:0x20272d,hair:0x352922},SALLY:{ollie:true,grip:1.12,control:1.12,shirt:0x202630,pants:0x79745f,hair:0x443426},BLACK:{ollie:true,grip:1.08,control:1,shirt:0x363b41,pants:0x6c7e88,hair:0x9b845e},BOSS:{ollie:true,grip:.95,control:.92,shirt:0xd1cdbf,pants:0x323741,hair:0x3c2d23}};
export const BOARDS={LONGBOARD:{label:'The nice longboard',ollie:false,grip:4.6,steer:.62,length:1.05},CRUISER:{label:'The little cruiser',ollie:true,grip:3.8,steer:.95,length:.76},HANDMEDOWN:{label:'The hand-me-down',ollie:false,grip:3.9,steer:.64,length:.98},STREET:{label:'The street deck',ollie:true,grip:3.5,steer:.9,length:.79}};
