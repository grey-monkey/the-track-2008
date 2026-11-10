// Shared diffuse lighting for Track scenery, clothes, skin and accessories.
// Source reference establishes authored color/shading, not these coefficients.
export const lightingGLSL160=`
vec3 surfaceLight160(vec3 normal160,vec3 sun160,float direct160){
 vec3 n160=normalize(normal160);
 float sky160=clamp(n160.y*.5+.5,0.,1.);
 float face160=pow(max(0.,dot(n160,normalize(sun160))),.72);
 vec3 fill160=mix(vec3(.22,.225,.26),vec3(.46,.53,.63),sky160);
 vec3 key160=vec3(1.04,.81,.56)*face160*direct160;
 return fill160+key160;
}
`;
