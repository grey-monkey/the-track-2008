import {secondHandStrength} from './second-hand165.mjs';

export function installSecondHandSky(view){
 const material=view.sky.material;
 material.uniforms.secondHandStrength={value:0};material.uniforms.secondHandAge={value:0};
 material.fragmentShader='uniform float secondHandStrength;uniform float secondHandAge;\n'+material.fragmentShader;
 material.fragmentShader=material.fragmentShader.replace('gl_FragColor=vec4(c,1.);',`
 // Recolor the existing painted sky, never replacing or distorting its clouds.
 float rings165=acos(clamp(dot(v,normalize(vec3(-.4,.65,-.3))),-1.,1.))/3.14159265;
 float wave165=rings165*1.45-secondHandAge*.110;
 vec3 rainbow165=.48+.32*cos(6.2831853*(wave165+vec3(0.,-.3333,.3333)));
 float originalValue165=max(dot(c,vec3(.299,.587,.114)),dot(paint,vec3(.299,.587,.114))*.32);
 rainbow165*=originalValue165/max(.12,dot(rainbow165,vec3(.299,.587,.114)));
 float breathe165=.76+.07*sin(secondHandAge*1.70-rings165*4.);
 c=mix(c,rainbow165,secondHandStrength*breathe165);
 gl_FragColor=vec4(c,1.);`);
 material.needsUpdate=true;
 const draw=view.draw;view.draw=function(sim,...args){
  material.uniforms.secondHandStrength.value=secondHandStrength(sim,args[2]);
  material.uniforms.secondHandAge.value=sim.secondHandAt==null?0:Math.max(0,sim.time-sim.secondHandAt);
  return draw.call(this,sim,...args);
 };
}
