// Metres, traced against the supplied 1366 x 768 aerial. North is -z.
// Scale bar: approximately 67 pixels / 200 feet. These are estimates, not a survey.
export const SCALE=60.96/67, ROAD_HALF=3.65;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const mix=(a,b,t)=>a+(b-a)*t;
export const angle=a=>Math.atan2(Math.sin(a),Math.cos(a));
export const point=(x,y)=>({x:(x-693)*SCALE,z:(y-339)*SCALE});
export const pixel=p=>({x:p.x/SCALE+693,y:p.z/SCALE+339});
export const bulb={...point(550,592),r:16*SCALE};
const bez=(a,b,c,d,n=40)=>Array.from({length:n},(_,i)=>{const t=i/n,u=1-t;return{x:u*u*u*a.x+3*u*u*t*b.x+3*u*t*t*c.x+t*t*t*d.x,z:u*u*u*a.z+3*u*u*t*b.z+3*u*t*t*c.z+t*t*t*d.z};});
const B=(a,b,c,d,n)=>bez(point(...a),point(...b),point(...c),point(...d),n);
export const roadPoints=[
 ...B([693,339],[675,374],[620,472],[601,513],100),
 ...B([601,513],[587,541],[587,564],[584,587],40),
 ...B([584,587],[584,601],[633,578],[656,564],40),
 ...B([656,564],[688,545],[756,514],[776,489],65),
 ...B([776,489],[800,465],[787,428],[780,391],50),
 ...B([780,391],[774,359],[761,313],[735,298],45),
 ...B([735,298],[716,280],[703,319],[693,339],45)
];
export const throat=[point(584,592),point(559,598)];
export const throatPolygon=[[588,587],[588,597],[561,605],[560,579]].map(p=>point(...p));
// Car path is independent of the curb geometry. A clockwise bulb arc has
// distinct entry/exit tangents; there is no instantaneous reversal at the throat.
const R=10.4, a0=.65,a1=5.64;
const cp=a=>({x:bulb.x+R*Math.cos(a),z:bulb.z+R*Math.sin(a)});
const e=cp(a0),out=cp(a1);
const routeRaw=[
 ...B([693,339],[675,374],[620,472],[601,513],100),
 ...B([601,513],[587,541],[589,572],[581,590],50),
 ...bez(point(581,590),point(577,600),{x:e.x+5,z:e.z-4},e,28),
 ...Array.from({length:110},(_,i)=>cp(mix(a0,a1,i/110))),
 ...bez(out,{x:out.x+5,z:out.z+6},point(576,595),point(590,592),28),
 ...B([590,592],[607,589],[633,578],[656,564],40),
 ...B([656,564],[688,545],[756,514],[776,489],65),
 ...B([776,489],[800,465],[787,428],[780,391],50),
 ...B([780,391],[774,359],[761,313],[735,298],45),
 ...B([735,298],[716,280],[703,319],[693,339],45)
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
export const FOOTPATH=[point(744,315),point(727,336),point(728,386),point(725,451),point(716,484),point(680,493),point(653,510),point(649,548)];
export const RIDERS={DOG:{ollie:false,grip:1,control:.8,shirt:0x27282b,pants:0x20272d,hair:0x352922},SALLY:{ollie:true,grip:1.12,control:1.12,shirt:0x202630,pants:0x79745f,hair:0x443426},BLACK:{ollie:true,grip:1.08,control:1,shirt:0x363b41,pants:0x6c7e88,hair:0x9b845e},BOSS:{ollie:true,grip:.95,control:.92,shirt:0xd1cdbf,pants:0x323741,hair:0x3c2d23}};
export const BOARDS={LONGBOARD:{label:'The nice longboard',ollie:false,grip:4.6,steer:.62,length:1.05},CRUISER:{label:'The little cruiser',ollie:true,grip:3.8,steer:.95,length:.76},HANDMEDOWN:{label:'The hand-me-down',ollie:false,grip:3.9,steer:.64,length:.98},STREET:{label:'The street deck',ollie:true,grip:3.5,steer:.9,length:.79}};
