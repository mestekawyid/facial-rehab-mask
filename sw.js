// Offline-friendly cache: pages are network-first (always the newest when online), versioned assets are cache-first,
// so a second visit — even on a weak connection — opens the site and the 3D model at once. Encrypted files are not cached.
const C = 'kfs-1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin || u.pathname.includes('/files/')) return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r).then(h => h || caches.match(u.pathname.replace(/[^/]*$/, 'index.html')))));
    return;
  }
  if (!(u.searchParams.has('v') || /\/(fonts|vendor)\//.test(u.pathname))) return;
  e.respondWith(caches.open(C).then(c => c.match(r).then(hit => hit || fetch(r).then(res => {
    if (res.ok) { c.put(r, res.clone()); // drop older versions of the same file
      c.keys().then(ks => ks.forEach(k => { const ku = new URL(k.url); if (ku.pathname === u.pathname && ku.search !== u.search) c.delete(k); })); }
    return res; }))));
});
