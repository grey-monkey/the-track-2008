// Isolated materials: the staged board must not change the playable board's shared materials.
export function lightSelectionBoard(board, person){
 board.traverse(mesh=>{
  if(!mesh.isMesh)return;
  const source=mesh.material,m=source.clone(),prior=source.onBeforeCompile,key=source.customProgramCacheKey;
  m.customProgramCacheKey=()=>key.call(source)+'-selection-board79';
  m.onBeforeCompile=s=>{
   prior.call(source,s);
   s.uniforms.boardLamp=person.selectionLamp;
   s.fragmentShader='uniform vec3 boardLamp;\n'+s.fragmentShader;
   s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>',`vec3 boardDelta=boardLamp-pw;
    float boardFace=abs(dot(normalize(pn),normalize(boardDelta)));
    float boardFalloff=1./(1.+dot(boardDelta,boardDelta)*.055);
    outgoingLight+=paintedAlbedo*vec3(1.25,1.06,.84)*(.24+.76*pow(boardFace,.85))*boardFalloff*eveningNight;
    #include <opaque_fragment>`);
  };
  mesh.material=m;
 });
}
