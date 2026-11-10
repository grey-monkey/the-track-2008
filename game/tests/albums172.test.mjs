import test from 'node:test';
import assert from 'node:assert/strict';
import {AlbumLibrary,ALBUMS} from '../source/albums172.js';
import {MercedesStereo} from '../source/car-music.js';
const storage=()=>{let value=null;return{getItem:()=>value,setItem:(k,v)=>value=v};};
test('four named albums, secret only after persistent discovery',()=>{
 const store=storage(),a=new AlbumLibrary(store);
 assert.deepEqual(a.visible().map(x=>x.title),['Lo and Behold','Dude Ranch','Nevermind','In Rainbows']);
 assert.deepEqual(ALBUMS.map(x=>x.tracks.length),[6,16,12,10,10]);
 assert.equal(a.select('secret-mixtape'),false);assert.equal(a.select('missing'),false);
 assert(a.select('in-rainbows'));assert.equal(new AlbumLibrary(store).selectedId,'in-rainbows');
 assert(a.discoverSecretMixtape());assert(!a.discoverSecretMixtape());assert(a.select('secret-mixtape'));
 const restored=new AlbumLibrary(store);assert.equal(restored.selectedId,'secret-mixtape');assert.equal(restored.visible().length,5);
});
test('malformed or inaccessible storage does not stop playback',()=>{
 for(const store of [{getItem:()=>'{broken'}, {getItem:()=>{throw Error('blocked');},setItem:()=>{throw Error('blocked');}}]){
  const a=new AlbumLibrary(store);assert.equal(a.selectedId,'lo-and-behold');assert(a.select('dude-ranch'));
 }
});
function makeStereo(){
 class Media{
  paused=true;currentTime=0;events={};
  set src(value){this.url=value;this.currentTime=0;}get src(){return this.url;}
  addEventListener(k,fn){this.events[k]=fn;}pause(){this.paused=true;}
  play(){this.paused=false;return Promise.resolve();}load(){}
 }
 globalThis.Audio=Media;
 const node=()=>new Proxy({connect(){return this;}},{get:(o,k)=>k in o?o[k]:(o[k]={value:0,setTargetAtTime(){}})});
 const ctx={createMediaElementSource:node,createBiquadFilter:node,createWaveShaper:node,createGain:node,createPanner:node};
 return new MercedesStereo(ctx,node(),new AlbumLibrary(storage()));
}
test('menu/ride sync preserves the same stream and position; only album changes restart',async()=>{
 const s=makeStereo(),media=s.media;s.sync(true);await Promise.resolve();await Promise.resolve();media.currentTime=73;
 for(let i=0;i<10;i++)s.sync(true);
 assert.equal(s.media,media);assert.equal(media.currentTime,73);assert.equal(media.paused,false);
 assert.equal(s.selectAlbum('lo-and-behold'),false);assert.equal(media.currentTime,73);
 assert.equal(s.selectAlbum('secret-mixtape'),false);assert.equal(media.currentTime,73);
 assert(s.selectAlbum('nevermind'));assert.equal(s.index,0);assert.equal(media.currentTime,0);assert.match(media.src,/nevermind\/01/);
 s.index=11;s.next();assert.equal(s.index,0);assert.match(media.src,/nevermind\/01/);
 s.albums.discoverSecretMixtape();assert(s.selectAlbum('secret-mixtape'));assert.match(media.src,/secret-mixtape\/01/);
});
test('stale blocked autoplay rejection cannot poison a new album',async()=>{
 const s=makeStereo();let rejectOld;
 s.media.play=()=>new Promise((resolve,reject)=>{rejectOld=reject;});s.sync(true);
 s.media.play=()=>{s.media.paused=false;return Promise.resolve();};assert(s.selectAlbum('dude-ranch'));
 rejectOld(Object.assign(new Error(),{name:'NotAllowedError'}));
 await new Promise(resolve=>setTimeout(resolve,0));assert.equal(s.error,null);assert.equal(s.pending,false);assert(!s.media.paused);
});
