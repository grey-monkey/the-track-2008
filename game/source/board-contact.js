import {deckCarveBank} from './ride-feel155.mjs';
import * as T from './vendor/three.module.js';
import {terrainHeight} from './world.js';

// Support the actual deck (both faces and edges) and wheel meshes against the
// rendered pavement triangles. Collision height is never interpolated downward.
export class BoardContact {

 constructor(board,road){this.board=board;this.road=road;this.parts=[];this.supportCache=new Map();board.traverse(mesh=>{if(!mesh.isMesh)return;let tree=trees.get(mesh.geometry);if(!tree){const seen=new Set(),points=[],p=mesh.geometry.attributes.position;for(let i=0;i<p.count;i++){const v=new T.Vector3().fromBufferAttribute(p,i),key=v.toArray().map(n=>n.toFixed(5)).join(',');if(!seen.has(key)){seen.add(key);points.push(v);}}tree=buildTree(points);trees.set(mesh.geometry,tree);}this.parts.push({mesh,tree,wheel:mesh.userData.boardWheel||mesh.geometry.type==='CylinderGeometry',restY:mesh.position.y});});}
 ground(x,z){return this.querySurface?this.querySurface(x,z):this.surface?this.surface(x,z):(this.road.height(x,z)??terrainHeight(x,z));}
 support(part){
  if(this.supportCache.has(part))return this.supportCache.get(part);
  const b=this.board;part.mesh.updateMatrix();const matrix=(this.matrix??=new T.Matrix4()).makeRotationFromQuaternion(b.quaternion).multiply(part.mesh.matrix),e=matrix.elements,v=this.point??=new T.Vector3();let best=-Infinity;
  const previous=part.previous;if(this.allowStaticCache&&previous&&previous.surface===this.surface&&previous.revision===(this.surface?.revision??0)&&previous.x===b.position.x&&previous.z===b.position.z&&e.every((value,i)=>value===previous.matrix[i])){this.supportCache.set(part,previous.result);return previous.result;}
  const plane=this.querySurface?.planeBound,gx=this.gx??0,gz=this.gz??0;
  let planeBase=Infinity,px=0,py=0,pz=0;
  if(plane){const n=part.tree,cx=e[0]*n.cx+e[4]*n.cy+e[8]*n.cz+e[12]+b.position.x,cz=e[2]*n.cx+e[6]*n.cy+e[10]*n.cz+e[14]+b.position.z,hx=Math.abs(e[0])*n.hx+Math.abs(e[4])*n.hy+Math.abs(e[8])*n.hz,hz=Math.abs(e[2])*n.hx+Math.abs(e[6])*n.hy+Math.abs(e[10])*n.hz;
   planeBase=plane(cx-hx,cx+hx,cz-hz,cz+hz,gx,gz)+gx*(b.position.x+e[12])+gz*(b.position.z+e[14])-e[13];px=gx*e[0]+gz*e[2]-e[1];py=gx*e[4]+gz*e[6]-e[5];pz=gx*e[8]+gz*e[10]-e[9];}
  const planeTop=n=>planeBase+px*n.cx+py*n.cy+pz*n.cz+Math.abs(px)*n.hx+Math.abs(py)*n.hy+Math.abs(pz)*n.hz;
  // A transformed local box encloses every original vertex. Only discard a
  // branch when even its lowest possible point cannot beat known support.
  const bounds=(n,query=false)=>{n.low=e[1]*n.cx+e[5]*n.cy+e[9]*n.cz+e[13]-Math.abs(e[1])*n.hx-Math.abs(e[5])*n.hy-Math.abs(e[9])*n.hz;if(!query)return Infinity;const cx=e[0]*n.cx+e[4]*n.cy+e[8]*n.cz+e[12]+b.position.x,cz=e[2]*n.cx+e[6]*n.cy+e[10]*n.cz+e[14]+b.position.z,hx=Math.abs(e[0])*n.hx+Math.abs(e[4])*n.hy+Math.abs(e[8])*n.hz,hz=Math.abs(e[2])*n.hx+Math.abs(e[6])*n.hy+Math.abs(e[10])*n.hz;return (this.querySurface??this.surface)?.upperBound?.(cx-hx,cx+hx,cz-hz,cz+hz)??Infinity;};
  // Last frame's winning vertex is a cheap valid lower bound at this new pose.
  const sample=(p,ceiling=Infinity)=>{v.copy(p).applyMatrix4(matrix);if(ceiling-v.y<best-1e-10)return;const y=this.ground(b.position.x+v.x,b.position.z+v.z)-v.y;if(y>best){best=y;part.winner=p;}};
  sample(part.winner??part.tree.seed);
  const visit=(n,ceiling)=>{if(Math.min(ceiling-n.low,planeTop(n))<best-1e-10)return;if(n.points){for(const p of n.points)sample(p,ceiling);return;}const ca=bounds(n.a),cb=bounds(n.b);if(n.a.low<n.b.low){visit(n.a,Math.min(ceiling,ca));visit(n.b,Math.min(ceiling,cb));}else{visit(n.b,Math.min(ceiling,cb));visit(n.a,Math.min(ceiling,ca));}};
  visit(part.tree,bounds(part.tree,true));const result=best+.002;this.supportCache.set(part,result);part.previous=this.allowStaticCache?{surface:this.surface,revision:this.surface?.revision??0,x:b.position.x,z:b.position.z,matrix:e.slice(),result}:null;return result;
 }
 update(sim){this.allowStaticCache=sim.phase==='ended';this.supportCache.clear();const pos=this.board.position;this.querySurface=this.surface?.prepare?.(pos.x-1,pos.x+1,pos.z-1,pos.z+1)??this.surface;if(sim.phase!=='ended'){this.gx=this.ground(pos.x+.3,pos.z)-this.ground(pos.x-.3,pos.z);this.gx/=.6;this.gz=(this.ground(pos.x,pos.z+.3)-this.ground(pos.x,pos.z-.3))/.6;}const airborne=sim.rider.height>0&&Number.isFinite(sim.rider.airY)&&['riding','coasting'].includes(sim.phase);
  if(airborne){const level=sim.rider.airY,plane=()=>level;plane.upperBound=()=>level;plane.planeBound=(xa,xb,za,zb,gx=0,gz=0)=>level+Math.max(-gx*xa,-gx*xb)+Math.max(-gz*za,-gz*zb);this.querySurface=plane;this.gx=this.gz=0;}
  const b=this.board,crashed=sim.phase==='crashed'||sim.phase==='ended',before=b.position.y;
  for(const p of this.parts)if(p.wheel)p.mesh.position.y=p.restY;
  b.rotation.order='YXZ';
  if(crashed&&sim.board?.pinned){b.rotation.z=.045*Math.exp(-sim.phaseTime*9);b.rotation.x=-.07*(1-Math.exp(-sim.phaseTime*12));b.position.y=Math.max(...this.parts.map(p=>this.support(p)));
  }else if(crashed){const t=sim.phaseTime,speed=Math.hypot(sim.board?.vx??0,sim.board?.vz??0),violent=(sim.rider.crashMotion?.speed??0)>7.2&&!['WOBBLE','SLIDE','BALANCE'].includes(sim.stats.crashReason),settle=T.MathUtils.smoothstep(t,1.2,2.2),spin=violent?Math.PI*2*(1-Math.exp(-t*2.3)):.65*Math.sin(t*4)*Math.exp(-t*2);b.rotation.z=T.MathUtils.lerp(spin,violent?Math.PI*2:0,settle);b.rotation.x=Math.sin(t*5)*.38*Math.exp(-t*1.25)*(1-settle);b.rotation.y+=.45*(1-Math.exp(-t))+(sim.board?.impactTurn??0);b.position.y=Math.max(...this.parts.map(p=>this.support(p)))+Math.abs(Math.sin(t*8))*.055*Math.exp(-t*1.6)*Math.min(1,speed/2);
  }else{
   if(sim.rider.height<=0){const co=Math.cos(b.rotation.y),si=Math.sin(b.rotation.y),at=(x,z)=>this.ground(b.position.x+co*x+si*z,b.position.z-si*x+co*z);b.rotation.x=-Math.atan2(at(0,.31)-at(0,-.31),.62);b.rotation.z=Math.atan2(at(.15,0)-at(-.15,0),.30)+deckCarveBank(sim.rider);}
   b.rotation.z+=sim.rider.bumpRoll??0;b.rotation.x+=sim.rider.bumpPitch??0;b.position.y=Math.max(...this.parts.map(p=>this.support(p)))+(airborne?0:Math.max(0,sim.rider.height))+Math.max(0,sim.rider.bump??0);
   // Tiny independent axle corrections keep all four tires touching on bends
   // and triangle seams, while the deck remains a rigid supported shape.
   const upAxis=(this.upAxis??=new T.Vector3()).set(0,1,0).applyQuaternion(b.quaternion);
   if(sim.rider.height<=0&&(sim.rider.bump??0)<.001)for(const p of this.parts)if(p.wheel){const delta=this.support(p)-b.position.y;p.mesh.position.y+=delta/Math.max(.7,upAxis.y-this.gx*upAxis.x-this.gz*upAxis.z);}
  }
  return b.position.y-before;
 }
}

// Shared across board instances; geometry stays immutable after construction.
const trees=new WeakMap();
function buildTree(points){let xa=Infinity,ya=Infinity,za=Infinity,xb=-Infinity,yb=-Infinity,zb=-Infinity;for(const p of points){xa=Math.min(xa,p.x);xb=Math.max(xb,p.x);ya=Math.min(ya,p.y);yb=Math.max(yb,p.y);za=Math.min(za,p.z);zb=Math.max(zb,p.z);}const n={cx:(xa+xb)/2,cy:(ya+yb)/2,cz:(za+zb)/2,hx:(xb-xa)/2,hy:(yb-ya)/2,hz:(zb-za)/2,seed:points.reduce((a,b)=>a.y<b.y?a:b)};if(points.length<=24)n.points=points;else{const axis=n.hx>=n.hy&&n.hx>=n.hz?'x':n.hy>=n.hz?'y':'z';points.sort((a,b)=>a[axis]-b[axis]);const mid=points.length>>1;n.a=buildTree(points.slice(0,mid));n.b=buildTree(points.slice(mid));}return n;}


