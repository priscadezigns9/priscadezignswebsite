const CACHE_NAME = 'riddiim-v1.6';
const ASSETS = [
  'index.html',
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&family=Space+Mono:wght@400;700&display=swap',
  'https://www.youtube.com/iframe_api'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
