const C='cc-v21';const A=['./','./index.html','./config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./plantilla-importacion.xlsx'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
// Recibir comprobantes compartidos desde otras apps (Web Share Target)
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='POST'||!u.pathname.endsWith('/share-target'))return;
 e.respondWith((async()=>{try{const fd=await e.request.formData();const files=fd.getAll('files').filter(f=>f&&f.size);const text=['title','text','url'].map(k=>fd.get(k)).filter(Boolean).join('\n');
   await caches.delete('cc-share');const c=await caches.open('cc-share');
   for(let i=0;i<files.length;i++)await c.put('./__share/f'+i,new Response(files[i],{headers:{'Content-Type':files[i].type||'application/octet-stream'}}));
   await c.put('./__share/meta',new Response(JSON.stringify({text,files:files.map(f=>({name:f.name,type:f.type}))}),{headers:{'Content-Type':'application/json'}}))}catch(_){}
  return Response.redirect('./?share=1',303)})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
// Notificaciones push (gastos de tarjetas adicionales)
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
 e.waitUntil(Promise.all([
  self.registration.showNotification(d.title||'Cuentas Claras',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.tag||undefined,renotify:!!d.tag,data:{url:d.url||'./'}}),
  self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>cs.forEach(c=>c.postMessage({tipo:'sync'})))
 ]))});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.url)||'./';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus' in c){c.postMessage({tipo:'sync'});return c.focus()}}return self.clients.openWindow(url)}))});
