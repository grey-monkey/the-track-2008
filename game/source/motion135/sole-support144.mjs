import * as T from '../vendor/three.module.js';
import {raiseFootToFloor} from './contact-ik.mjs';

// These are the actual weighted sole vertices, not ankle proxies. The THPS4
// source keeps its authored foot/ankle rotation; contact only solves leg reach.
export function solePoints(pose,positions,binding,indices){
 const out=[];
 for(const i of indices){
  const x=positions[i*3],y=positions[i*3+1],z=positions[i*3+2];let vx=0,vy=0,vz=0;
  for(let k=0;k<8;k++){const w=binding.weights[i*8+k];if(!w)continue;const m=pose.skin[binding.joints[i*8+k]].elements;vx+=w*(m[0]*x+m[4]*y+m[8]*z+m[12]);vy+=w*(m[1]*x+m[5]*y+m[9]*z+m[13]);vz+=w*(m[2]*x+m[6]*y+m[10]*z+m[14]);}
  out.push(new T.Vector3(vx,vy,vz));
 }
 return out;
}
export function supportFootOnDeck(pose,rig,side,positions,binding,indices,plane,airOffset){
 const normal=plane?.normal??plane,offset=plane?.offset??0;
 if(!Number.isFinite(offset))return;
 if(!normal||!Number.isFinite(normal.y)||Math.abs(normal.y)<.15)return;
 // Rendering lowers the rider along local Y, not along the board normal.
 // Project that exact translation onto the plane so tilted decks do not gain
 // a gap that grows with pitch. Keep the source X/Z stance and ankle rotation.
 const target=airOffset*normal.y+offset;
 for(let pass=0;pass<2;pass++){
  const low=Math.min(...solePoints(pose,positions,binding,indices).map(v=>v.sub(pose.board.position).dot(normal)));
  const dy=(target-low)/normal.y;
  if(!Number.isFinite(dy)||Math.abs(dy)<1e-7)break;
  raiseFootToFloor(pose,rig,side,dy);
 }
}
export function supportPushFoot(pose,rig,positions,binding,soleIds,floor){
 const right=Math.min(...solePoints(pose,positions,binding,soleIds.r).map(v=>v.y));
 for(let pass=0;pass<2;pass++){
  const left=solePoints(pose,positions,binding,soleIds.l);
  // A callback can resolve sloped ground at each real sole vertex. Its return
  // value is a height in the pose's unanchored local coordinates.
  const dy=Math.max(0,...left.map(v=>(typeof floor==='function'?floor(v,{pose,supportHeight:right}):floor+right)-v.y));
  if(!Number.isFinite(dy)||dy<1e-7)break;
  raiseFootToFloor(pose,rig,'l',dy);
 }
}
