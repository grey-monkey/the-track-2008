export const SECOND_HAND_HITS=30,SECOND_HAND_SECONDS=60,SECOND_HAND_FADE=6;
export function secondHandProtected(sim){
 const age=sim.time-(sim.secondHandAt??-Infinity);
 return sim.options?.rider==='BOSS'&&['riding','coasting'].includes(sim.phase)&&age>=0&&age<SECOND_HAND_SECONDS;
}

// Another run keeps earned hits, never old particles, immunity or a teleport sweep.
// Back to the car creates a fresh Ride and deliberately does not call this helper.
export function carrySecondHandHits(previous,next){
 if(previous.options?.rider!=='BOSS'||next.options?.rider!=='BOSS')return;
 const count=Math.max(0,Math.min(SECOND_HAND_HITS-1,Math.floor(previous.spradSmoke?.count??0)));
 next.spradSmoke={puffs:[],serial:0,next:next.time,count,lastHead:null};
}
