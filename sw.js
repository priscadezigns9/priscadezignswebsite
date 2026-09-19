const CACHE_NAME = 'priscion-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/wallet-core.js',
  '/manifest.json',
  '/assets/logos/priscion_primary_small.jpg',
  '/assets/coins/prn_coin.png',
  '/assets/coins/nrl_coin.png',
  '/assets/coins/atlr_coin.webp',
  '/assets/coins/musd_coin.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
