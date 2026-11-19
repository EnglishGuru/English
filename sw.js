const C='eg-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.json','icon-192.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;
 // نسيب أي حاجة مش من الموقع نفسه (Supabase وCloudinary وImageKit) وطلبات التقديم (Range) تعدّي مباشرة
 if(r.method!=='GET'||new URL(r.url).origin!==location.origin||r.headers.has('range'))return;
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))});
