import * as T from './vendor/three.module.js';
import {paintedMaterial} from './pigment.js';
import {entrancePoints,height,terrainHeight} from './world.js';
// Reference: public Strawberry Lane panorama, Nov 2025. Modern planting omitted.
export function buildMemoryGate(view){
 const p=entrancePoints[58],a=entrancePoints[56],b=entrancePoints[60],g=new T.Group();g.name='Strawberry Lane memory entrance';g.position.set(p.x,view.roadContact.height(p.x,p.z)+.02,p.z);g.rotation.y=Math.atan2(b.x-a.x,b.z-a.z);view.scene.add(g);
 g.updateMatrixWorld(true);const baseAt=(x,z)=>{const w=g.localToWorld(new T.Vector3(x,0,z));return(view.entranceGround(w.x,w.z)-g.position.y)+.045;};
 const pale=paintedMaterial(0xc2b9a4,{architecture:true}),cap=paintedMaterial(0xb9ae96,{architecture:true}),iron=paintedMaterial(0x242b2d,{architecture:true}),stone=[0x978f80,0xafa18b,0x8f8b80,0xaaa292].map(c=>paintedMaterial(c,{architecture:true})),glow=new T.MeshBasicMaterial({color:0xffcf81});
 const box=(parent,w,h,d,m,x,y,z)=>{const v=new T.Mesh(new T.BoxGeometry(w,h,d),m);v.position.set(x,y+(parent===g?baseAt(x,z):0),z);parent.add(v);return v;};
 const rod=(parent,points,r=.021)=>{const c=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));parent.add(new T.Mesh(new T.TubeGeometry(c,Math.max(8,points.length*4),r,5,false),iron));};
 function lamp(x,z){box(g,.15,.32,.09,iron,x,1.83,z);box(g,.035,.08,.25,iron,x,1.78,z+.1);box(g,.25,.36,.22,glow,x,1.88,z+.25);for(const dx of [-.14,.14])for(const dz of [-.12,.12])box(g,.022,.42,.022,iron,x+dx,1.88,z+.25+dz);box(g,.33,.065,.3,iron,x,1.65,z+.25);const roof=new T.Mesh(new T.ConeGeometry(.26,.22,4),iron);roof.rotation.y=Math.PI/4;roof.position.set(x,2.2+baseAt(x,z),z+.25);g.add(roof);}
 function pier(x,z,w=.95){box(g,w,2.7,w,pale,x,1.35,z);box(g,w+.13,.12,w+.13,cap,x,2.68,z);box(g,w+.06,.09,w+.06,cap,x,2.78,z);lamp(x,z+w/2);}
 function stonePanel(parent,w,h,x,y,z){box(parent,w,h,.46,stone[0],x,y,z);for(let row=0;row<Math.floor(h/.16);row++){let xx=-w/2;let j=0;while(xx<w/2-.03){const ww=Math.min(.27+((row*7+j*3)%5)*.065,w/2-xx);box(parent,ww-.014,.145,.025,stone[(row+j)%4],x+xx+ww/2,y-h/2+row*.16+.075,z+.244);xx+=ww;j++;}}}
 // Main opening stays aligned with the driving path. The monument and second
 // gated opening sit beside it, as seen from the public approach.
 pier(-5.9,0);pier(5.9,0);
 function leaf(x,width,sign,open=true){const l=new T.Group();l.position.set(x,Math.max(...[0,1,2,3,4].map(t=>baseAt(x,-t)))+.12,0);l.rotation.y=open?sign*1.48:0;g.add(l);const top=t=>2.1+.36*Math.sin(Math.PI*t);box(l,width,.24,.055,iron,sign*width/2,.3,0);for(let i=0;i<=Math.round(width/.19);i++){const t=i/Math.round(width/.19),xx=sign*width*t,h=top(t);box(l,.024,h-.42,.024,iron,xx,(h+.42)/2,0);const tip=new T.Mesh(new T.ConeGeometry(.043,.12,4),iron);tip.position.set(xx,h+.06,0);l.add(tip);}for(const y of [.48,1.03])box(l,width,.035,.045,iron,sign*width/2,y,0);rod(l,Array.from({length:15},(_,i)=>[sign*width*i/14,top(i/14),0]),.032);for(let i=0;i<4;i++){const x=sign*width*(i+.5)/4;rod(l,Array.from({length:17},(_,j)=>[x+Math.cos(j/16*Math.PI*2)*width/10,1.4+Math.sin(j/16*Math.PI*2)*.25,0]),.012);} }
 // Blank center monument, without a neighborhood placard or extended median.
 box(g,1.9,.18,1.2,cap,0,.09,0);stonePanel(g,1.45,2.2,0,1.28,0);box(g,1.66,.15,.7,cap,0,2.43,0);box(g,.98,.9,.035,pale,0,1.55,.26);
 leaf(-5.42,4.65,1);leaf(5.42,4.65,-1);
 // Curving rendered walls, stone inset courses and generous stepped caps.
 for(const [side,start]of [[-1,-6.40],[1,6.40]]){for(let j=0;j<20;j++){const t=j/19,x=start+side*t*9,z=2.4*t*t,h=1.48+.42*(1-t)*(1-t),seg=new T.Group();seg.position.set(x,0,z);seg.rotation.y=-side*Math.atan2(4.8*t,9);g.add(seg);box(seg,.51,h,.48,pale,0,h/2,0);stonePanel(seg,.49,.63,0,.65,.016);box(seg,.55,.12,.6,cap,0,h+.025,0);box(seg,.52,.12,.54,cap,0,.15,0);}pier(start+side*9,2.4,.72);}
 return g;
}
