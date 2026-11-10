// Gameplay authority: rider skill and board shape both matter.
export function canTrick(rider,board,kind='ollie'){
 if(!['STREET','CRUISER'].includes(board))return false;
 if(kind==='ollie')return ['SALLY','BLACK'].includes(rider);
 if(kind==='kickflip')return rider==='BLACK';
 if(['grind','fiftyfifty','boardslide'].includes(kind))return rider==='SALLY';
 return false;
}
export function ollieOutcome(rider,board){return canTrick(rider,board,'ollie')?'land':null;}
export function riderTrick(rider,board){return canTrick(rider,board)?'ollie':null;}
