import {installAlbumSelector} from './albums172.js';
export function installSettings({root,sound,getStance,setStance}){
 const panel=document.getElementById('instructions'),select=document.getElementById('albumSelector');
 let hud=true,returnFocus=null,background=[];
 try{const saved=JSON.parse(localStorage.getItem('track-settings-v1')||'null');sound.enabled=saved?.sound!==false;hud=saved?.hud!==false;}catch{}
 const save=()=>{try{localStorage.setItem('track-settings-v1',JSON.stringify({sound:sound.enabled,hud}));}catch{}};
 const refresh=()=>{
  root.classList.toggle('hud-off',!hud);
  for(const b of panel.querySelectorAll('[data-sound]'))b.setAttribute('aria-pressed',String((b.dataset.sound==='on')===sound.enabled));
  for(const b of panel.querySelectorAll('[data-hud]'))b.setAttribute('aria-pressed',String((b.dataset.hud==='on')===hud));
  for(const b of panel.querySelectorAll('[data-stance]'))b.setAttribute('aria-pressed',String(b.dataset.stance===getStance()));
 };
 for(const b of panel.querySelectorAll('[data-sound]'))b.onclick=()=>{sound.enabled=b.dataset.sound==='on';if(sound.enabled)sound.start();else sound.radio?.sync(false);save();refresh();};
 for(const b of panel.querySelectorAll('[data-hud]'))b.onclick=()=>{hud=b.dataset.hud==='on';save();refresh();};
 for(const b of panel.querySelectorAll('[data-stance]'))b.onclick=()=>{setStance(b.dataset.stance);refresh();};
 installAlbumSelector(select,sound);
 const cycle=delta=>{const albums=sound.albums.visible().filter(a=>sound.albums.available(a.id)),i=albums.findIndex(a=>a.id===sound.albums.selectedId);sound.selectAlbum(albums[(i+delta+albums.length)%albums.length].id);};
 document.getElementById('albumPrev').onclick=()=>cycle(-1);document.getElementById('albumNext').onclick=()=>cycle(1);
 const close=()=>{panel.hidden=true;for(const [el,inert]of background)el.inert=inert;background=[];if(returnFocus?.isConnected&&!returnFocus.closest('[hidden]'))returnFocus.focus();};
 document.getElementById('closeHow').onclick=close;
 panel.addEventListener('keydown',e=>{
  // Controls inside this modal never steer, jump or resume the game underneath.
  e.stopPropagation();
  if(e.key==='Escape'&&e.target!==select){e.preventDefault();close();return;}
  if(e.key==='Tab'){
   const choices=[...panel.querySelectorAll('button,select,summary,a[href],[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length&&(!el.closest('details:not([open])')||el.matches('summary')));
   const first=choices[0],last=choices.at(-1);
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
 });
 refresh();
 return {open(){if(!panel.hidden)return;returnFocus=document.activeElement;refresh();panel.hidden=false;panel.scrollTop=0;background=[...root.children].filter(el=>el!==panel).map(el=>[el,el.inert]);for(const [el]of background)el.inert=true;document.getElementById('closeHow').focus();},close};
}
