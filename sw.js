const C='djpedidos-v1';
const A=['./','index.html','manifest.json','icon-192.png','icon-512.png',
 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.allSettled(A.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!='GET'||u.hostname=='api.github.com')return;
 const net=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x});
 e.respondWith(r.mode=='navigate'
  ?net.catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html')))
  :caches.match(r).then(m=>m||net));
});
