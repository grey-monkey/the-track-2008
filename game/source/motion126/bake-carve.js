export function bakeCarve(){throw Error('Missing pre-baked riding geometry');}
export function applyCarve(human,value,tow=0,compress=0,slide=0,yank=0,load=0,brake=0,flight=0){for(const mesh of Object.values(human.surfaces)){const i=mesh.userData.carveStart;mesh.morphTargetInfluences[i]=Math.max(0,-value);mesh.morphTargetInfluences[i+1]=Math.max(0,value);mesh.morphTargetInfluences[i+2]=tow;mesh.morphTargetInfluences[i+3]=compress;mesh.morphTargetInfluences[i+4]=Math.max(0,-slide);mesh.morphTargetInfluences[i+5]=Math.max(0,slide);mesh.morphTargetInfluences[i+6]=yank;mesh.morphTargetInfluences[i+7]=load;mesh.morphTargetInfluences[i+8]=brake;mesh.morphTargetInfluences[i+9]=flight;}}


