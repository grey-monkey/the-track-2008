// Conservative bounds of the base plus each absolute authored pose. A convex
// blend stays inside the blended box. Only the surviving boxes need exact vertices.
export function contactClusters(g){
 if(g.userData.contactClusters)return g.userData.contactClusters;
 const base=g.attributes.position.array,morph=(g.morphAttributes.position??[]).map(a=>a.array),groups=new Map();
 const indices=g.userData.supportIndices??Array.from({length:base.length/3},(_,i)=>i);
 for(const i of indices){const j=i*3,key=[0,1,2].map(k=>Math.floor(base[j+k]/.16)).join(',');let c=groups.get(key);if(!c){c={indices:[],bounds:new Float64Array((morph.length+1)*6)};for(let p=0;p<=morph.length;p++){c.bounds.fill(Infinity,p*6,p*6+3);c.bounds.fill(-Infinity,p*6+3,p*6+6);}groups.set(key,c);}c.indices.push(i);for(let p=0;p<=morph.length;p++)for(let k=0;k<3;k++){const v=base[j+k]+(p?morph[p-1][j+k]:0),o=p*6;c.bounds[o+k]=Math.min(c.bounds[o+k],v);c.bounds[o+k+3]=Math.max(c.bounds[o+k+3],v);}}
 return g.userData.contactClusters=[...groups.values()];
}
export function supportContact(samples,weights,e,ox,oz,surface){
 const candidates=[];let x0=Infinity,x1=-Infinity,z0=Infinity,z1=-Infinity;
 const sum=weights.reduce((a,b)=>a+b,0),baseWeight=1-sum;
 if(baseWeight<-.00001||weights.some(w=>w<0))throw Error('Contact bounds require convex fall poses');
 for(const {mesh} of samples){const g=mesh.geometry;for(const cluster of contactClusters(g)){
  const lo=[0,0,0],hi=[0,0,0];for(let p=0;p<=weights.length;p++){const w=p?weights[p-1]:Math.max(0,baseWeight);if(!w)continue;for(let k=0;k<3;k++){lo[k]+=w*cluster.bounds[p*6+k];hi[k]+=w*cluster.bounds[p*6+k+3];}}
  const lower=[ox+e[12],e[13],oz+e[14]],upper=[...lower];for(let row=0;row<3;row++)for(let col=0;col<3;col++){const a=e[col*4+row];lower[row]+=a*(a<0?hi[col]:lo[col]);upper[row]+=a*(a<0?lo[col]:hi[col]);}
  // Allow floating point roundoff at shared surface boundaries.
  for(let k=0;k<3;k++){lower[k]-=1e-6;upper[k]+=1e-6;}
  x0=Math.min(x0,lower[0]);x1=Math.max(x1,upper[0]);z0=Math.min(z0,lower[2]);z1=Math.max(z1,upper[2]);candidates.push({g,cluster,low:lower[1]});
 }}
 const local=surface.prepare?.(x0,x1,z0,z1)??surface,ceiling=surface.upperBound?.(x0,x1,z0,z1)??Infinity;
 candidates.sort((a,b)=>a.low-b.low);let support=-Infinity,tested=0,skipped=0;
 for(const {g,cluster,low}of candidates){if(ceiling-low<=support){skipped+=cluster.indices.length;continue;}const a=g.attributes.position.array,m=g.morphAttributes.position;
  for(const i of cluster.indices){const j=i*3;let x=a[j],y=a[j+1],z=a[j+2];for(let p=0;p<weights.length;p++){const w=weights[p];if(w){const b=m[p].array;x+=b[j]*w;y+=b[j+1]*w;z+=b[j+2]*w;}}const wy=e[1]*x+e[5]*y+e[9]*z+e[13];tested++;if(ceiling-wy<=support)continue;const wx=ox+e[0]*x+e[4]*y+e[8]*z+e[12],wz=oz+e[2]*x+e[6]*y+e[10]*z+e[14];support=Math.max(support,local(wx,wz)-wy);}
 }return {support,tested,skipped,clusters:candidates.length};
}
