export function crewSeats(rider,driver=rider==='DOG'?'SALLY':'DOG'){
 const rear=['SALLY','BLACK','BOSS','DOG'].filter(n=>n!==rider&&n!==driver);
 return {driver,front:'SPRAD',rearLeft:rear[0],rearRight:rear[1]};
}
