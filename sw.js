// Offline support for the installed app. Opening the app asks the network for the newest page first (so a deploy shows up
// straight away, not one launch late) and falls back to the cached copy when offline or slow. Other files are served from the
// cache and refreshed in the background. Firebase and other sites are never cached.
const CACHE = 'r42-v88';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', 'index.html', 'manifest.webmanifest', 'firebase-config.js'])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  const page = req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/');
  if (page) {
    // network first (revalidating past the HTTP cache), cached copy if that fails or takes over 4 s
    e.respondWith(caches.open(CACHE).then(async c => {
      const net = fetch(req, { cache: 'no-cache' }).then(res => { if (res.ok) c.put(req, res.clone()); return res; });
      const slow = new Promise(r => setTimeout(r, 4000));
      try {
        const res = await Promise.race([net, slow.then(() => null)]);
        if (res) return res;
      } catch (_) {}
      const hit = await c.match(req, { ignoreSearch: true }) || await c.match('./');
      if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
      return net;
    }));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req);
    const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; });
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
