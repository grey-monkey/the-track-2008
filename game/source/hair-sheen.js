// Broad fiber highlights for the existing hair shells; no new geometry or render pass.
// Inspired by longitudinal hair scattering; deliberately simplified for mobile.
export const hairSheenFunctions=`
vec3 fiberUnit(vec3 v){return v*inversesqrt(max(dot(v,v),.00000001));}
vec3 fiberSurfaceNormal(vec3 N,vec3 P,float relief){
 vec3 px=dFdx(P),py=dFdy(P);vec3 rx=cross(py,N),ry=cross(N,px);float det=dot(px,rx);
 vec3 gradient=(dFdx(relief)*rx+dFdy(relief)*ry)/max(abs(det),.000000001)*sign(det);
 gradient*=min(1.,.32/max(length(gradient),.00001));return normalize(N-gradient);
}
float fiberSheen(vec3 N,vec3 tangent,vec3 V,vec3 L){
 vec3 H=fiberUnit(L+V);float longitudinal=dot(tangent,H);
 float primary=pow(max(0.,1.-pow(longitudinal-.10,2.)),32.);
 float secondary=pow(max(0.,1.-pow(longitudinal+.17,2.)),12.);
 float face=smoothstep(-.08,.42,dot(N,L));
 float rim=.65+.35*pow(1.-max(0.,dot(N,V)),2.);
 return (primary*.24+secondary*.09)*face*rim;
}
`;
export const hairSheenLighting=`
// Derivatives keep the fiber direction attached to the surface through poses/head turns.
vec3 dx=dFdx(pw),dy=dFdy(pw);
float ax=dFdx(strandAngle),ay=dFdy(strandAngle);
vec3 strandTangent=dy*ax-dx*ay;
if(dot(strandTangent,strandTangent)<.000000001)strandTangent=cross(n,vec3(.73,.21,.64));
strandTangent=fiberUnit(strandTangent);vec3 hairView=fiberUnit(cameraPosition-pw);
float fiberVariation=.62+.38*pnoise(vec2(strandAngle*19.,pl.y*51.));
vec3 hairTint=mix(vec3(1.,.83,.61),sqrt(max(accessoryBase,vec3(.001))),.20);
float sunVisible=eveningDirect*(1.-smoothstep(.70,.95,eveningNight))*smoothstep(-.035,.015,eveningSun.y);
outgoingLight+=hairTint*fiberSheen(n,strandTangent,hairView,normalize(eveningSun))*sunVisible*fiberVariation;
float selectedFalloff=1./(1.+dot(keyDelta,keyDelta)*.055);
outgoingLight+=vec3(1.,.68,.36)*fiberSheen(n,strandTangent,hairView,fiberUnit(keyDelta))*selectedWarmth*selectedFalloff*.80;
for(int hi=0;hi<4;hi++){
 vec3 lampDelta=lampPositions[hi]-pw;float lampReach=pow(1.-smoothstep(1.,8.5,length(lampDelta.xz)),2.)*min(1.,22./max(1.,dot(lampDelta,lampDelta)));
 outgoingLight+=vec3(1.,.59,.27)*fiberSheen(n,strandTangent,hairView,fiberUnit(lampDelta))*lampReach*eveningLamp*.75;
}
`;
