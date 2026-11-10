import {lightingGLSL160} from './lighting160.js';
import {roadShadowUniforms,roadShadowGLSL} from './road-shadows.js';
import {visual85} from './visual85/state.js';
import {eveningUniforms} from './evening-light.js';
import {atmosphereGLSL} from './atmosphere.js';
import * as T from './vendor/three.module.js';
import {memoryLight} from './memory-light.js';
export let brushTexture;
export let reflectionSky;
export function setReflectionSky(texture){reflectionSky=texture;}
export async function loadBrush(){brushTexture=await new T.TextureLoader().loadAsync('./assets/brush-pigment.jpg');brushTexture.wrapS=brushTexture.wrapT=T.RepeatWrapping;brushTexture.colorSpace=T.NoColorSpace;brushTexture.anisotropy=4;}
export const noiseGLSL=`
float phash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float pnoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(phash(i),phash(i+vec2(1,0)),f.x),mix(phash(i+vec2(0,1)),phash(i+vec2(1,1)),f.x),f.y);}
float pigment(vec2 p){return .57*pnoise(p)+.28*pnoise(p*2.13)+.15*pnoise(p*5.7);}
`;
// Surface marks stay in world coordinates, with diminishing fine detail in the distance.
export function paintedMaterial(color,{ground=false,earth=false,roof=false,architecture=false,glass=false,car=false,road=false,human=false,blackCar=false,concrete=false}={}){
 const m=new T.MeshBasicMaterial({color,side:T.DoubleSide});
 m.customProgramCacheKey=()=>JSON.stringify({ground,earth,roof,architecture,glass,car,road,human,blackCar,concrete});
 m.onBeforeCompile=s=>{
  s.uniforms.brushAtlas={value:brushTexture};
  Object.assign(s.uniforms,memoryLight,eveningUniforms,visual85,roadShadowUniforms);
  s.uniforms.reflectionSky={value:reflectionSky??brushTexture};
  s.vertexShader='varying vec3 pl;varying vec3 pw;varying vec3 pn;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\npl=position;pw=(modelMatrix*vec4(position,1.)).xyz;pn=normalize(mat3(modelMatrix)*normal);');
  if(human){s.vertexShader=s.vertexShader.replace('#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )','#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING ) || defined ( USE_MORPHNORMALS )');s.vertexShader=s.vertexShader.replace('#include <morphtarget_vertex>',`#include <morphtarget_vertex>
   pw=(modelMatrix*vec4(transformed,1.)).xyz;
   #ifdef USE_MORPHNORMALS
   pn=normalize(mat3(modelMatrix)*objectNormal);
   #endif
  `);}
  s.vertexShader=s.vertexShader.replace('#include <skinning_vertex>',`#include <skinning_vertex>
   #ifdef USE_SKINNING
   mat4 paintedSkin=skinWeight.x*boneMatX+skinWeight.y*boneMatY+skinWeight.z*boneMatZ+skinWeight.w*boneMatW;
   pn=normalize(mat3(modelMatrix)*mat3(bindMatrixInverse*paintedSkin*bindMatrix)*normal);
   pw=(modelMatrix*vec4(transformed,1.)).xyz;
   #endif
  `);
  s.fragmentShader='uniform float subjectIntegration;uniform vec3 eveningCar;uniform vec3 eveningForward;uniform float eveningNight;uniform float eveningDirect;uniform float eveningLamp;uniform vec3 eveningSun;uniform sampler2D shadowImage;uniform sampler2D shadowDepth;uniform mat4 shadowMatrix;uniform float shadowReady;uniform float shadowSelection;uniform vec3 lampPositions[4];uniform sampler2D brushAtlas;uniform sampler2D reflectionSky;varying vec3 pl;varying vec3 pw;varying vec3 pn;\n'+noiseGLSL+lightingGLSL160+atmosphereGLSL+roadShadowGLSL+`
float actorShadow157(vec2 uv,float receiverDepth){float casterDepth=texture2D(shadowDepth,uv).r;return texture2D(shadowImage,uv).r*step(casterDepth+.0003,receiverDepth);}
`+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   vec3 paintedAlbedo=diffuseColor.rgb;
   vec3 lightNormal=normalize(pn)*(gl_FrontFacing?1.:-1.);
   float dist=distance(cameraPosition,pw);
   vec2 uv=${road?'pw.xz':'abs(pn.y)>.5?pl.xz:vec2(pl.x+pl.z,pl.y)'};
   float broad=pigment(uv*.32);
   float brush=texture2D(brushAtlas,uv*${ground?'.065':'.27'}).r;
   float scumble=texture2D(brushAtlas,uv*${ground?'.18':'.73'}+vec2(.37,.19)).r;
   float grain=phash(floor(uv*95.));
   float detail=1.-smoothstep(12.,90.,dist);
   float surfaceResponse=1.;
   ${road?'diffuseColor.rgb*=mix(vec3(1.),vec3(1.12,1.06,.84),illustrationExperiment*(1.-eveningNight));':''}
   ${road?`float aggregate=pnoise(pw.xz*44.);float aggregateFade=1.-smoothstep(.35,1.5,length(fwidth(pw.xz*44.)));
   diffuseColor.rgb*=.91+(aggregate-.5)*.24*aggregateFade;
   surfaceResponse=.76+(aggregate-.5)*.20*aggregateFade;`:''}
   ${concrete?`float chalk=pigment(pw.xz*2.5+pw.y);float pores=pnoise(pw.xz*67.+pw.y*11.);
   float poreFade=1.-smoothstep(.35,1.5,length(fwidth(pw.xz*67.)));
   diffuseColor.rgb*=.98+(chalk-.5)*.10-(1.-smoothstep(.24,.34,pores))*.07*poreFade;
   surfaceResponse=1.15+(chalk-.5)*.12;`:''}
   float facing=smoothstep(-.5,.8,dot(${road?'vec3(0.,1.,0.)':'normalize(pn)'},normalize(eveningSun)));
   ${human?'diffuseColor.rgb=paintedAlbedo*surfaceLight160(lightNormal,eveningSun,eveningDirect);':`diffuseColor.rgb*=.76+facing*.24+(broad-.5)*${ground?'.46':'.33'}+(brush-.5)*${ground?'.62':'.68'}*(.35+.65*detail)+(scumble-.5)*.18*detail+(grain-.5)*.07*detail;`}
   ${earth?`vec2 drift=pw.xz+vec2(pigment(pw.xz*.12),pigment(pw.zx*.11))*4.;
   float deposit=pigment(drift*.18),edge=pigment(drift*1.7),clods=pnoise(drift*vec2(1.7,2.9));
   float dust=smoothstep(.47,.56,deposit+(edge-.5)*.19);
   float damp=1.-smoothstep(.39,.47,pigment(drift*.36)+(edge-.5)*.22);
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.48,.31,.19),dust*.52);
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.15,.075,.047),damp*.58);
   float broken=smoothstep(.58,.69,clods+(scumble-.5)*.20)*(1.-dust*.65);
   diffuseColor.rgb*=1.-broken*.28*(.35+.65*detail);
   float straw=smoothstep(.61,.73,pigment(drift*vec2(.8,3.7))+(brush-.5)*.19);
   diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.36,.26,.145),straw*.29*detail);`:''}
   float plane=smoothstep(.32,.62,facing+(brush-.5)*.7);
   vec3 planeTint=mix(vec3(.66,.72,.94),vec3(1.06,.91,.76),plane);
   vec3 duskPlane=mix(vec3(.76,.82,.96),vec3(1.10,.98,.85),smoothstep(.08,.92,facing));
   planeTint=mix(planeTint,duskPlane,illustrationExperiment*(1.-eveningNight)*eveningDirect);
   ${human?'':`diffuseColor.rgb*=mix(vec3(1.),planeTint,${car||glass?'.68':'1.'});
   diffuseColor.rgb+=vec3(.018,.014,.032)*(1.-plane);`}
   ${architecture?'diffuseColor.rgb*=.71;':''}
   ${glass?'diffuseColor.rgb=mix(vec3(.035,.055,.085),vec3(.12,.10,.12),smoothstep(1.1,1.65,pl.y));diffuseColor.rgb+=vec3(.040,.018,.010)*exp(-pow((pl.y-1.30)*9.,2.))*(.45+brush);':''}
   ${(car||glass)&&!blackCar?`vec3 reflected=reflect(normalize(pw-cameraPosition),normalize(pn));vec3 skyPaint=texture2D(reflectionSky,vec2(abs(atan(reflected.z,reflected.x))/3.14159265,clamp(reflected.y*1.8+.1,0.,1.))).rgb;float fresnel=pow(1.-abs(dot(normalize(pn),normalize(cameraPosition-pw))),2.);diffuseColor.rgb=mix(diffuseColor.rgb,skyPaint*.34,${glass?'.24+fresnel*.18':'.06+fresnel*.13'});`:''}
   ${blackCar?`// Black enamel stays neutral between sharply bounded reflected sky shapes.
   vec3 enamelN=normalize(pn),enamelV=normalize(cameraPosition-pw);
   vec3 enamelR=reflect(-enamelV,enamelN);
   vec3 enamelSky=texture2D(reflectionSky,vec2(abs(atan(enamelR.z,enamelR.x))/3.14159265,clamp(enamelR.y*1.8+.10,0.,1.))).rgb;
   float enamelLuma=dot(enamelSky,vec3(.299,.587,.114));
   float enamelEdge=pow(1.-abs(dot(enamelN,enamelV)),3.);
   float skyBand=smoothstep(.08,.18,enamelR.y)*(1.-smoothstep(.54,.68,enamelR.y));
   float brightCloud=smoothstep(.24,.38,enamelLuma);
   float castReflection=skyBand*brightCloud*smoothstep(.08,.26,abs(enamelN.y)+enamelEdge);
   ${blackCar==='body'?`// Wider, quieter reflected sky shapes; retain neutral black between them.
   float broadReflection=smoothstep(-.22,.32,enamelR.y)*(1.-smoothstep(.48,.92,enamelR.y));
   broadReflection*=smoothstep(.08,.46,enamelLuma)*smoothstep(.0,.48,abs(enamelN.y)+enamelEdge);
   castReflection=mix(castReflection,broadReflection*.20,subjectIntegration*(1.-eveningNight));`:''}
   vec3 enamelBase=${blackCar!=='body'?'vec3(.0045,.0048,.0052)':'vec3(.005,.006,.0075)'};
   ${blackCar==='cladding'?`// The existing lower-panel material defines the factory body/trim break.
   enamelBase=mix(enamelBase,vec3(.016,.017,.018),subjectIntegration);`:''}
   diffuseColor.rgb=enamelBase*(.90+.10*plane);
   diffuseColor.rgb+=enamelSky*castReflection*${blackCar==='body'?'.25':'.018'};
   diffuseColor.rgb+=vec3(.009,.010,.011)*smoothstep(.40,.70,enamelEdge);
   `:''}
   
   ${ground||concrete?`vec4 sc=shadowMatrix*vec4(pw,1.);vec2 su=sc.xy/sc.w*.5+.5;
   float receiverDepth=sc.z/sc.w*.5+.5;float shadowStep=mix(.0029,.0015,shadowSelection);float inShadow=0.;if(shadowReady>.5&&receiverDepth>0.&&receiverDepth<1.&&min(su.x,su.y)>.008&&max(su.x,su.y)<.992){
    inShadow=actorShadow157(su,receiverDepth)*.28;
    inShadow+=actorShadow157(su+vec2(shadowStep,0.),receiverDepth)*.18;
    inShadow+=actorShadow157(su-vec2(shadowStep,0.),receiverDepth)*.18;
    inShadow+=actorShadow157(su+vec2(0.,shadowStep),receiverDepth)*.18;
    inShadow+=actorShadow157(su-vec2(0.,shadowStep),receiverDepth)*.18;
   }diffuseColor.rgb*=mix(vec3(1.),mix(vec3(.53,.60,.81),vec3(.25,.32,.48),shadowSelection),inShadow*(.85+brush*.15)*eveningDirect${ground?'':'*shadowSelection'});`:''}
   diffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),eveningNight);
   ${ground||human||car||architecture?`for(int li=0;li<4;li++){
    vec3 delta=lampPositions[li]-pw;float radius=length(delta.xz);float pool=pow(1.-smoothstep(1.,8.5,radius),2.);
    float lampFace=max(0.,dot(lightNormal,normalize(delta)));
    float attenuation=pool*min(1.,22./max(1.,dot(delta,delta)))*lampFace;
    diffuseColor.rgb+=vec3(.15,.064,.017)*attenuation*surfaceResponse*(.70+brush*.30)*eveningLamp*(1.+2.*eveningNight);
   }`:''}
   ${ground||architecture?`vec2 beamDelta=pw.xz-eveningCar.xz;float along=dot(beamDelta,normalize(eveningForward.xz));
   float across=abs(beamDelta.x*eveningForward.z-beamDelta.y*eveningForward.x);
   float beamWidth=1.0+max(0.,along)*.13;
   float beamShape=min(1.,exp(-2.*pow((across-.65)/beamWidth,2.))+exp(-2.*pow((across+.65)/beamWidth,2.)));
   float beam=smoothstep(1.9,3.,along)*(1.-smoothstep(18.,32.,along))*exp(-max(0.,along-3.)/13.)*beamShape;
   diffuseColor.rgb+=vec3(.24,.18,.095)*beam*surfaceResponse*eveningLamp*(.25+.75*max(0.,lightNormal.y));` :''}
   ${human?`// Headlights illuminate the actual fabric/skin color, with a soft vertical beam.
   vec2 personDelta=pw.xz-eveningCar.xz;
   float personAlong=dot(personDelta,normalize(eveningForward.xz));
   float personAcross=abs(personDelta.x*eveningForward.z-personDelta.y*eveningForward.x);
   float personWidth=1.15+max(0.,personAlong)*.19;
   float personBeam=smoothstep(1.8,2.7,personAlong)*(1.-smoothstep(15.,26.,personAlong));
   personBeam*=exp(-pow(personAcross/personWidth,2.))*exp(-max(0.,personAlong-3.)/15.);
   personBeam*=1.-smoothstep(.9,2.9,pw.y-eveningCar.y);
   vec3 headlightDelta=eveningCar+vec3(0.,.65,0.)+eveningForward*2.-pw;
   float personFace=.16+.84*max(0.,dot(lightNormal,normalize(headlightDelta)));
   vec3 humanHeadlight=paintedAlbedo*vec3(1.,.86,.67)*personBeam*personFace*eveningNight*1.6;
   diffuseColor.rgb+=humanHeadlight;`:''}
   ${ground||human||architecture?`vec2 tailDelta=pw.xz-eveningCar.xz;float behind=-dot(tailDelta,normalize(eveningForward.xz));
   float tailAcross=abs(tailDelta.x*eveningForward.z-tailDelta.y*eveningForward.x);
   float tailDistance=max(0.,behind-2.35);
   float tailWidth=.85+tailDistance*.20;
   float tailShape=min(1.,exp(-pow((tailAcross-.62)/tailWidth,2.))+exp(-pow((tailAcross+.62)/tailWidth,2.)));
   float tailPool=smoothstep(2.,2.65,behind)*exp(-tailDistance/2.65)*(1.-smoothstep(8.,13.,tailDistance))*tailShape;
   diffuseColor.rgb+=vec3(.18,.007,.002)*tailPool*surfaceResponse*eveningNight;`:''}
   float rim=pow(1.-abs(dot(normalize(cameraPosition-pw),normalize(pn))),3.);
   diffuseColor.rgb+=vec3(.052,.021,.008)*rim*plane*eveningDirect*(.4+brush*.6)*${human?'.16':car||glass?'.52':'1.'};

  `);
  // Lose selected upper contours into the same colored air as the distance fog.
  s.fragmentShader=s.fragmentShader.replace('#include <fog_fragment>',`
   #ifdef USE_FOG
   vec3 air=memoryAirColor(fogColor,dist);
   gl_FragColor.rgb=mix(gl_FragColor.rgb,air,memoryAirAmount(dist));
   float wash=smoothstep(16.,105.,dist)*${roof?'.48':'.15'};
   wash*=mix(1.,.35,illustrationExperiment*(1.-eveningNight));wash*=smoothstep(.25,.8,pigment(pw.xz*.14+pw.y*.12));
   gl_FragColor.rgb=mix(gl_FragColor.rgb,air,wash);
   ${architecture?'float distant=smoothstep(28.,115.,dist);gl_FragColor.rgb=mix(gl_FragColor.rgb,air,distant*.42);':''}
   #endif
  `);
  if(ground||concrete){
   s.fragmentShader=s.fragmentShader.replace('diffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),eveningNight);',`diffuseColor.rgb*=mix(vec3(1.),vec3(.50,.57,.73),(eveningDirect>.001?roadOcclusion(pw,normalize(eveningSun),40.):0.)*eveningDirect);
   diffuseColor.rgb*=mix(vec3(1.),vec3(.026,.041,.067),eveningNight);`);
   s.fragmentShader=s.fragmentShader.replace('float attenuation=pool*','float attenuation=(pool*eveningLamp>.001?1.-.88*roadOcclusion(pw,normalize(delta),length(delta)):1.)*pool*');
   s.fragmentShader=s.fragmentShader.replace('*beam*surfaceResponse','*beam*(1.-.90*(beam*eveningLamp>.001?roadOcclusion(pw,normalize(eveningCar+vec3(0.,.55,0.)-pw),length(eveningCar+vec3(0.,.55,0.)-pw)):0.))*surfaceResponse');
   s.fragmentShader=s.fragmentShader.replace('*tailPool*surfaceResponse','*tailPool*(1.-.85*(tailPool*eveningNight>.001?roadOcclusion(pw,normalize(eveningCar+vec3(0.,.55,0.)-pw),length(eveningCar+vec3(0.,.55,0.)-pw)):0.))*surfaceResponse');
  }
 };return m;
}

