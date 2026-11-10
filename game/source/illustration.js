import {visual85} from './visual85/state.js';
import {eveningUniforms} from './evening-light.js';
import {graphics} from './graphics-profile.js';
import * as T from './vendor/three.module.js';
import {noiseGLSL} from './pigment.js';
// A restrained edge-aware finish. UI is outside the canvas and stays crisp.
// Five or nine samples per pixel, no frame history and no animated noise.
export class IllustrationFinish{
 constructor(renderer){
  // Multisampled so edges are actually smoothed (the canvas's own antialias flag never
  // reaches an offscreen target), and mipmapped so the grade can read a soft copy for bloom.
  // iPhone and iPad browsers get the plain target: their WebGL is the least forgiving of
  // multisampled, mipmapped render targets, and a game that loads beats a smoother edge.
  // ?msaa=1 or ?msaa=0 overrides the choice for testing.
  const query=new URLSearchParams(globalThis.location?.search??''),apple=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  this.smooth=query.has('msaa')?query.get('msaa')!=='0':!apple;
  this.target=new T.WebGLRenderTarget(1,1,this.smooth?{depthBuffer:true,samples:4}:{depthBuffer:true});
  if(this.smooth){this.target.texture.generateMipmaps=true;this.target.texture.minFilter=T.LinearMipmapLinearFilter;}
  this.target.texture.colorSpace=T.LinearSRGBColorSpace;
  this.scene=new T.Scene();this.camera=new T.OrthographicCamera(-1,1,1,-1,0,1);
  this.material=new T.ShaderMaterial({depthTest:false,depthWrite:false,uniforms:{...visual85,eveningNight:eveningUniforms.eveningNight,eveningBlue:eveningUniforms.eveningBlue,dusk:{value:1},softCopy:{value:this.smooth?1:0},picture:{value:this.target.texture},pixel:{value:new T.Vector2()},amount:{value:1},secretGold:{value:0},exitFade:{value:0}},vertexShader:'varying vec2 uvp;void main(){uvp=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`
  uniform float illustrationExperiment;uniform float eveningNight;uniform float eveningBlue;uniform float dusk;uniform float softCopy;uniform sampler2D picture;uniform vec2 pixel;uniform float amount;uniform float secretGold;uniform float exitFade;varying vec2 uvp;
  ${noiseGLSL}
  void main(){
   vec2 paper=uvp/pixel;
   float mark=pnoise(paper*vec2(.17,.055));
   vec2 bend=vec2(mark-.5,pnoise(paper*.083)-.5)*pixel*.85;
   vec2 center=clamp(uvp+bend*(1.-illustrationExperiment),vec2(0),vec2(1));
   vec3 c=texture2D(picture,center).rgb,sum=c*2.;float total=2.;
   // Approved integration sets this blend to zero. Skip unused neighbor reads.
   if(illustrationExperiment<1. && amount>0.){
   for(int i=0;i<${graphics.paintSamples};i++){
    float a=float(i)*${(Math.PI*2/graphics.paintSamples).toFixed(8)};vec2 delta=vec2(cos(a),sin(a))*pixel*(1.15+mark*1.0);
    vec3 n=texture2D(picture,clamp(center+delta,vec2(0),vec2(1))).rgb;
    float weight=exp(-dot(n-c,n-c)*95.);sum+=n*weight;total+=weight;
   }
   c=mix(c,sum/total,.52*amount*(1.-illustrationExperiment));
   }
   float tooth=phash(floor(paper*.8))-.5;
   // Small pigment variation, with lifted blue-violet shadow color.
   c*=1.+tooth*.038*amount*(1.-illustrationExperiment*.65);
   float dark=1.-smoothstep(.015,.16,dot(c,vec3(.2126,.7152,.0722)));
   c+=vec3(.005,.004,.012)*dark*amount*(1.-eveningNight);
   // Night has true dark intervals. Retain bright lamp/lens values instead of
   // lowering exposure globally and dimming the lights along with the landscape.
   float luminance=dot(c,vec3(.2126,.7152,.0722));
   c*=mix(1.,mix(.38,1.,smoothstep(.025,.19,luminance)),eveningNight);
   // --- Dusk grade: one place that decides how the evening feels. ---
   const vec3 LUM=vec3(.2126,.7152,.0722);
   // A soft copy of the frame, from its mip chain: bright things bleed light
   // (lamps, tail lights, the last of the sky) and the whole image gains a faint haze.
   if(softCopy>.5){
    vec3 soft=texture2D(picture,uvp,3.5).rgb*.55+texture2D(picture,uvp,5.5).rgb*.45;
    vec3 bleed=max(soft-vec3(.30),0.);
    c+=bleed*(.35+.45*eveningBlue+.55*eveningNight)*dusk;
    c=mix(c,1.-(1.-clamp(c,0.,1.))*(1.-clamp(soft,0.,1.)*.5),.16*dusk);
   }
   // Split tone: shadows lean indigo, lights lean peach; stronger as blue hour arrives.
   float tone=smoothstep(.03,.46,dot(c,LUM));
   vec3 shade=mix(vec3(.94,.98,1.09),vec3(.78,.93,1.24),eveningBlue);
   vec3 light=mix(vec3(1.05,1.0,.94),vec3(1.12,.99,.84),eveningBlue);
   c*=mix(vec3(1.),mix(shade,light,tone),dusk);
   // Gentle contrast and a little more colour.
   vec3 k=clamp(c,0.,1.);k=k*k*(3.-2.*k);c=mix(c,k,.22*dusk);
   c=mix(vec3(dot(c,LUM)),c,1.+.10*dusk);
   // The edges of the frame fall away, a little more after dark.
   vec2 away=(uvp-vec2(.5,.47))*vec2(1.,.86);
   c*=1.-smoothstep(.12,.62,dot(away,away)*1.9)*mix(.30,.48,eveningNight)*dusk;
   // A subtle warm exposure lift, strongest on lit surfaces; preserve deep
   // shadows and the existing time of day. HUD is outside this render pass.
   float goldLit=smoothstep(.015,.42,dot(c,vec3(.2126,.7152,.0722)));
   vec3 gold=c*vec3(1.14,1.055,.955)+vec3(.014,.007,.001)*goldLit;
   c=mix(c,gold,secretGold);
   // Darkness closes in from the edges as the rider leaves the gate.
   float tunnelRadius=length((uvp-vec2(.5,.48))*vec2(1.,.82));
   float tunnel=smoothstep(max(0.,.78-exitFade*.9),max(.03,1.-exitFade*.9),tunnelRadius);
   c*=pow(1.-exitFade,1.25)*(1.-tunnel*min(1.,exitFade*2.));
   gl_FragColor=vec4(c,1.);
   #include <colorspace_fragment>
  }`});
  this.scene.add(new T.Mesh(new T.PlaneGeometry(2,2),this.material));this.size=new T.Vector2();
 }
 render(renderer,scene,camera){
  renderer.getDrawingBufferSize(this.size);const {x:w,y:h}=this.size;
  if(this.target.width!==w||this.target.height!==h){this.target.setSize(w,h);this.material.uniforms.pixel.value.set(1/w,1/h);}
  renderer.info.autoReset=false;
  renderer.setRenderTarget(this.target);renderer.render(scene,camera);
  renderer.setRenderTarget(null);renderer.render(this.scene,this.camera);
 }
}
