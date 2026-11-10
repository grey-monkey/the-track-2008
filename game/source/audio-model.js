export const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,Number.isFinite(x)?x:0));
export const BOARD_SOUND=Object.freeze({
 LONGBOARD:{roll:.65,lowpass:2800,pitch:.86,click:.67,chatter:.45},
 HANDMEDOWN:{roll:.82,lowpass:4100,pitch:.94,click:.84,chatter:1},
 CRUISER:{roll:.90,lowpass:5500,pitch:1.02,click:.94,chatter:.7},
 STREET:{roll:1,lowpass:7200,pitch:1.10,click:1.05,chatter:.8}
});
export function musicLevel(distance){const d=Math.max(0,distance),t=clamp((d-12)/16);return .26/(1+Math.pow(Math.max(0,d-2)/5,1.65))*(1-t*t*(3-2*t));}
export function carLevel(distance){const t=clamp((distance-18)/22);return (1-t*t*(3-2*t))/(1+Math.pow(Math.max(0,distance-2)/7,1.5));}
export function soundState(sim){const r=sim.rider,c=sim.car,board=BOARD_SOUND[sim.options.board]??BOARD_SOUND.LONGBOARD,speed=Math.hypot(r.vx,r.vz),live=['riding','coasting','crashed'].includes(sim.phase),ground=live&&sim.phase!=='crashed'&&r.height<=.025&&r.up<=.15;
 const lateral=Math.abs(-Math.sin(r.heading)*r.vx+Math.cos(r.heading)*r.vz);
 const slide=ground&&!r.dirt&&speed>.7?clamp(lateral/2)*clamp((r.slide??0)*2.5+Math.max(0,lateral-.65)*.45):0;
 return {board,speed,live,ground,slide,roll:ground?clamp(speed/7.5)*board.roll:0,load:clamp((c.accel??0)/.85),carSpeed:Math.max(0,c.speed||0)};}

// Normal service braking; no skid or handbrake implied. Acceleration is in m/s�.
export function brakeLevel(car){return clamp((-(car.accel??0)-.18)/1.25)*clamp(((car.speed??0)-.2)/2);}
