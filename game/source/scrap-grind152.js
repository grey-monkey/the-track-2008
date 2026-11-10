import * as T from './vendor/three.module.js';
import {roadPoints} from './world.js';
import {paintedMaterial} from './pigment.js';
import {spotMaterial} from './spot142/materials.js';
export function installScrapGrind(view){
 const a=roadPoints[54],b=roadPoints[56],p=roadPoints[55],heading=Math.atan2(b.z-a.z,b.x-a.x),tx=Math.cos(heading),tz=Math.sin(heading);
 const center={x:p.x-tz*3.05,z:p.z+tx*3.05},length=6.4,half=length/2;
 const floor=s=>view.hazards.skateHeight(center.x+tx*s,center.z+tz*s),y0=floor(-half),y1=floor(half),slope=(y1-y0)/length;
 const root=new T.Group();root.name='Homemade framing-lumber grind ledge';root.position.set(center.x,(y0+y1)/2,center.z);root.rotation.y=Math.PI/2-heading;view.scene.add(root);
 const wood=[0xc5a780,0xa68b69,0xbba17c].map(c=>spotMaterial(c)),cut=paintedMaterial(0xbfa37c,{architecture:true}),grain=paintedMaterial(0x74624c,{architecture:true}),steel=paintedMaterial(0x858b87,{architecture:true}),edge=paintedMaterial(0xb2b4a8,{architecture:true}),nail=paintedMaterial(0x555650,{architecture:true});
 const batches=new Map();
 function box(w,h,d,mat,x,y,z){const g=new T.BoxGeometry(w,h,d).toNonIndexed();g.rotateX(-Math.atan(slope));g.translate(x,y+slope*z,z);const list=batches.get(mat)??[];list.push(g);batches.set(mat,list);}
 // Two boards across, five courses high. Staggered butt joints and varied ends
 // use plausible residential framing offcuts instead of a single 21-foot beam.
 for(let layer=0;layer<5;layer++)for(let lane=0;lane<2;lane++){
  const x=-.333+lane*.236,y=.058+.019+layer*.038,joint=(layer%2?-.65:.45)+lane*.23;
  const start=-half+.012+(layer%3)*.012,end=half-.012-((layer+lane)%3)*.014;
  for(const [lo,hi] of [[start,joint-.004],[joint+.004,end]]){
   box(.233,.036,hi-lo,wood[(layer+lane)%3],x,y,(lo+hi)/2);
   for(const z of [lo,hi])box(.233,.035,.002,cut,x,y,z);
  }
 }
 // Crosswise dunnage keeps the stack low; a narrow angle caps only its street edge.
 for(const z of [-2.35,0,2.35])box(.64,.058,.22,wood[1],-.215,.029,z);
 box(.044,.012,length,steel,-.006,.256,0);
 box(.012,.048,length,steel,.010,.232,0);
 box(.006,.004,length,edge,.014,.260,0);
 // Long grain scratches, pencil cut marks and small flush nail heads.
 for(let i=0;i<14;i++){const z=-2.9+(i%7)*.83,x=-.43+(i%5)*.083;box(.002,.001,.30+(i%3)*.12,grain,x,.248,z);}
 for(const z of [-2.55,-.67,1.72])box(.17,.001,.003,grain,-.30,.249,z);
 for(const z of [-2.8,-1.5,.1,1.6,2.9])for(const x of [-.40,-.17])box(.008,.002,.008,nail,x,.249,z);
 for(let i=0;i<16;i++)box(.022,.001,.045+(i%3)*.02,i%3?edge:nail,-.006,.263,-3+i*.39);
 // Batch static details by material to keep phone draw calls low.
 for(const [mat,parts] of batches){const g=new T.BufferGeometry();for(const name of ['position','normal','uv']){const size=parts[0].attributes[name].itemSize,data=new Float32Array(parts.reduce((n,p)=>n+p.attributes[name].array.length,0));let offset=0;for(const p of parts){data.set(p.attributes[name].array,offset);offset+=p.attributes[name].array.length;}g.setAttribute(name,new T.BufferAttribute(data,size));}g.computeBoundingSphere();root.add(new T.Mesh(g,mat));for(const p of parts)p.dispose();}
 const points=Array.from({length:17},(_,i)=>{const s=i/16*length;return{x:center.x+tx*(s-half),y:y0+s*slope+.262,z:center.z+tz*(s-half),s};});
 const rail={id:'scrap-lumber154',points,length,streetSide:-1,entryAssist:{radius:.42,angle:50}};view.hazards.grindRails.push(rail);
 const solids=[];
 const register=(s,hx,hz,bottom,top)=>{const o={kind:'TIMBER',type:'solids',id:'scrap154-'+solids.length,x:center.x+tx*s-tz*.215,z:center.z+tz*s+tx*.215,hx,hz,yaw:heading-Math.PI/2,bottom,top};solids.push(o);view.hazards.layout.solids.push(o);const r=Math.hypot(hx,hz);for(let x=Math.floor((o.x-r)/8);x<=Math.floor((o.x+r)/8);x++)for(let z=Math.floor((o.z-r)/8);z<=Math.floor((o.z+r)/8);z++){const key=x+','+z,items=view.hazards.cells.get(key)??[];items.push(o);view.hazards.cells.set(key,items);}};
 for(let i=0;i<8;i++){const s=-half+(i+.5)*length/8,ground=y0+(s+half)*slope;register(s,.235,length/16,ground+.058,ground+.262+Math.abs(slope)*length/16);}
 for(const s of [-2.35,0,2.35])register(s,.32,.11,floor(s),floor(s)+.058);
 // Retain the existing inspection hook; all geometry/collision now represents lumber.
 view.scrapGrind152={root,rail,center,heading,solids,roadIndex:55};return view.scrapGrind152;
}
