import * as T from '../vendor/three.module.js';
// Dual-quaternion blending keeps the sleeve cross-section from collapsing
// when upper arm and forearm rotate in opposite directions at the elbow.
export function buildDualQuaternions(matrices,out){
 const m=new T.Matrix4(),q=new T.Quaternion();
 for(let i=0;i<matrices.length/16;i++){
  m.fromArray(matrices,i*16);q.setFromRotationMatrix(m).normalize();const x=m.elements[12],y=m.elements[13],z=m.elements[14],at=i*8;
  out.set([q.x,q.y,q.z,q.w,.5*(x*q.w+y*q.z-z*q.y),.5*(-x*q.z+y*q.w+z*q.x),.5*(x*q.y-y*q.x+z*q.w),-.5*(x*q.x+y*q.y+z*q.z)],at);
 }
}
export function dualSkin(dq,joints,weights,offset,x,y,z,nx,ny,nz,out){
 const ref=joints[offset]*8;let rx=0,ry=0,rz=0,rw=0,dx=0,dy=0,dz=0,dw=0;
 for(let k=0;k<8;k++){const i=joints[offset+k]*8;let w=weights[offset+k];if(!w)continue;if(dq[ref]*dq[i]+dq[ref+1]*dq[i+1]+dq[ref+2]*dq[i+2]+dq[ref+3]*dq[i+3]<0)w=-w;rx+=dq[i]*w;ry+=dq[i+1]*w;rz+=dq[i+2]*w;rw+=dq[i+3]*w;dx+=dq[i+4]*w;dy+=dq[i+5]*w;dz+=dq[i+6]*w;dw+=dq[i+7]*w;}
 const inv=1/Math.hypot(rx,ry,rz,rw);rx*=inv;ry*=inv;rz*=inv;rw*=inv;dx*=inv;dy*=inv;dz*=inv;dw*=inv;
 const dot=rx*dx+ry*dy+rz*dz+rw*dw;dx-=rx*dot;dy-=ry*dot;dz-=rz*dot;dw-=rw*dot;
 const rotate=(x,y,z,at)=>{const tx=2*(ry*z-rz*y),ty=2*(rz*x-rx*z),tz=2*(rx*y-ry*x);out[at]=x+rw*tx+ry*tz-rz*ty;out[at+1]=y+rw*ty+rz*tx-rx*tz;out[at+2]=z+rw*tz+rx*ty-ry*tx;};
 rotate(x,y,z,0);out[0]+=2*(-dw*rx+dx*rw-dy*rz+dz*ry);out[1]+=2*(-dw*ry+dx*rz+dy*rw-dz*rx);out[2]+=2*(-dw*rz-dx*ry+dy*rx+dz*rw);rotate(nx,ny,nz,3);
}

export function sleeveMask(binding,bones){
 const mask=new Float32Array(binding.count);
 for(let i=0;i<mask.length;i++){let arm=0;for(let k=0;k<8;k++){const name=bones[binding.joints[i*8+k]].name;if(name.startsWith('upperarm_')||name.startsWith('lowerarm_'))arm+=binding.weights[i*8+k];}mask[i]=T.MathUtils.smoothstep(arm,.65,.98);}
 return mask;
}

