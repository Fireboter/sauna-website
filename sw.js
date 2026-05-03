const CACHE = 'sauna-v1';
const ASSETS = [
  '/sauna-website/',
  '/sauna-website/index.html',
  '/sauna-website/manifest.json',
  '/sauna-website/img/icon-192.png',
  '/sauna-website/img/icon-512.png',
  '/sauna-website/img/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
