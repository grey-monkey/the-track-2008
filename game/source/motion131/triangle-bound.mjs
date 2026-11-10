// Maximum height minus a slope plane over the triangle/footprint intersection.
// Clipping keeps distant terrain vertices from inflating a tiny wheel footprint.
export function clippedHeightBound(triangle,xa,xb,za,zb,gx=0,gz=0){
 const [A,B,C]=triangle;
 if(Math.max(A[0],B[0],C[0])<xa||Math.min(A[0],B[0],C[0])>xb||Math.max(A[2],B[2],C[2])<za||Math.min(A[2],B[2],C[2])>zb)return -Infinity;
 const den=(B[2]-C[2])*(A[0]-C[0])+(C[0]-B[0])*(A[2]-C[2]);
 const inside=(x,z)=>{const a=((B[2]-C[2])*(x-C[0])+(C[0]-B[0])*(z-C[2]))/den,b=((C[2]-A[2])*(x-C[0])+(A[0]-C[0])*(z-C[2]))/den;return a>=0&&b>=0&&a+b<=1;};
 if(den&&inside(xa,za)&&inside(xa,zb)&&inside(xb,za)&&inside(xb,zb)){const dx=((A[1]-C[1])*(B[2]-C[2])+(B[1]-C[1])*(C[2]-A[2]))/den,dz=((A[1]-C[1])*(C[0]-B[0])+(B[1]-C[1])*(A[0]-C[0]))/den;return C[1]-dx*C[0]-dz*C[2]+(dx-gx)*(dx>gx?xb:xa)+(dz-gz)*(dz>gz?zb:za);}
 let points=triangle;
 for(const [axis,edge,sign]of [[0,xa,1],[0,xb,-1],[2,za,1],[2,zb,-1]]){
  const next=[];if(!points.length)return -Infinity;
  let a=points[points.length-1],da=(a[axis]-edge)*sign;
  for(const b of points){const db=(b[axis]-edge)*sign;if((da>=0)!==(db>=0)){const t=da/(da-db);next.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]);}if(db>=0)next.push(b);a=b;da=db;}points=next;
 }let top=-Infinity;for(const p of points)top=Math.max(top,p[1]-gx*p[0]-gz*p[2]);return top;
}
