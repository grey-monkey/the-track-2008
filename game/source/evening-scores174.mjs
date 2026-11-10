// Page-lifetime totals: intentionally no localStorage or sessionStorage.
// Only the existing banked score enters this ledger; pending combos stay on each Ride.
export class EveningScores {
 #totals=new Map();
 bind(ride){
  const rider=ride.options.rider;
  if(!this.#totals.has(rider))this.#totals.set(rider,0);
  Object.defineProperty(ride,'score',{
   enumerable:true,
   configurable:true,
   get:()=>this.#totals.get(rider),
   set:value=>{if(Number.isFinite(value)&&value>=0)this.#totals.set(rider,value);}
  });
  return ride;
 }
}
