const CACHE='track-2008-v033-entrance-1';
const ASSETS=['./','./index.html','./style.css','./app.js','./render.js','./world.js','./physics.js','./input.js','./vendor/three.module.js','./vendor/three.core.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
 const keys=await caches.keys();
 const migrating=keys.some(k=>k.startsWith('the-track-proto-'));
 await Promise.all(keys.filter(k=>k!==CACHE&&(k.startsWith('track-2008-')||k.startsWith('the-track-proto-'))).map(k=>caches.delete(k)));
 await self.clients.claim();
 // Refresh only during the legacy upgrade, after all v0.3 assets are cached.
 if(migrating){const pages=await self.clients.matchAll({type:'window'});await Promise.all(pages.filter(p=>p.url.startsWith(self.registration.scope)).map(p=>p.navigate(p.url)));}
})()));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.type==='basic'){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
