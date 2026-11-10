// Album titles are the UI labels. Missing albums remain disabled until supplied.
export const ALBUMS=[
 {id:'lo-and-behold',title:'Lo and Behold',tracks:['./assets/car-radio/01.mp3','./assets/car-radio/02.mp3','./assets/car-radio/03.mp3','./assets/car-radio/04.mp3','./assets/car-radio/05.mp3','./assets/car-radio/06.mp3']},
 {id:'dude-ranch',title:'Dude Ranch',tracks:["./assets/dude-ranch/01.mp3", "./assets/dude-ranch/02.mp3", "./assets/dude-ranch/03.mp3", "./assets/dude-ranch/04.mp3", "./assets/dude-ranch/05.mp3", "./assets/dude-ranch/06.mp3", "./assets/dude-ranch/07.mp3", "./assets/dude-ranch/08.mp3", "./assets/dude-ranch/09.mp3", "./assets/dude-ranch/10.mp3", "./assets/dude-ranch/11.mp3", "./assets/dude-ranch/12.mp3", "./assets/dude-ranch/13.mp3", "./assets/dude-ranch/14.mp3", "./assets/dude-ranch/15.mp3", "./assets/dude-ranch/16.mp3"]},
 {id:'nevermind',title:'Nevermind',tracks:["./assets/nevermind/01.mp3", "./assets/nevermind/02.mp3", "./assets/nevermind/03.mp3", "./assets/nevermind/04.mp3", "./assets/nevermind/05.mp3", "./assets/nevermind/06.mp3", "./assets/nevermind/07.mp3", "./assets/nevermind/08.mp3", "./assets/nevermind/09.mp3", "./assets/nevermind/10.mp3", "./assets/nevermind/11.mp3", "./assets/nevermind/12.mp3"]},
 {id:'in-rainbows',title:'In Rainbows',tracks:["./assets/in-rainbows/01.mp3", "./assets/in-rainbows/02.mp3", "./assets/in-rainbows/03.mp3", "./assets/in-rainbows/04.mp3", "./assets/in-rainbows/05.mp3", "./assets/in-rainbows/06.mp3", "./assets/in-rainbows/07.mp3", "./assets/in-rainbows/08.mp3", "./assets/in-rainbows/09.mp3", "./assets/in-rainbows/10.mp3"]},
 {id:'secret-mixtape',title:'Secret Mixtape',secret:true,tracks:['./assets/secret-mixtape/01.mp3','./assets/secret-mixtape/02.mp3','./assets/secret-mixtape/03.mp3','./assets/secret-mixtape/04.mp3','./assets/secret-mixtape/05.mp3','./assets/secret-mixtape/06.mp3','./assets/secret-mixtape/07.mp3','./assets/secret-mixtape/08.mp3','./assets/secret-mixtape/09.mp3','./assets/secret-mixtape/10.mp3']}
];
const KEY='track-albums-v1';
export class AlbumLibrary{
 constructor(storage){
  this.listeners=new Set();this.unlocked=new Set();this.selectedId='lo-and-behold';
  try{this.storage=storage??globalThis.localStorage;const saved=JSON.parse(this.storage?.getItem(KEY)||'null');
   if(saved?.secretMixtapeFound===true)this.unlocked.add('secret-mixtape');
   if(this.available(saved?.selectedId))this.selectedId=saved.selectedId;
  }catch{}
 }
 get selected(){return ALBUMS.find(a=>a.id===this.selectedId);}
 visible(){return ALBUMS.filter(a=>!a.secret||this.unlocked.has(a.id));}
 available(id){return ALBUMS.some(a=>a.id===id&&a.tracks.length&&(!a.secret||this.unlocked.has(id)));}
 save(){try{this.storage?.setItem(KEY,JSON.stringify({selectedId:this.selectedId,secretMixtapeFound:this.unlocked.has('secret-mixtape')}));}catch{}for(const fn of this.listeners)fn();}
 select(id){if(id===this.selectedId||!this.available(id))return false;this.selectedId=id;this.save();return true;}
 // Called by the future in-world tape pickup, never by menu navigation.
 discoverSecretMixtape(){if(this.unlocked.has('secret-mixtape'))return false;this.unlocked.add('secret-mixtape');this.save();return true;}
}
export function installAlbumSelector(select,sound){
 const refresh=()=>{select.replaceChildren(...sound.albums.visible().map(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=a.title;o.disabled=!sound.albums.available(a.id);return o;}));select.value=sound.albums.selectedId;};
 sound.albums.listeners.add(refresh);select.addEventListener('change',()=>{sound.selectAlbum(select.value);refresh();});refresh();
}
