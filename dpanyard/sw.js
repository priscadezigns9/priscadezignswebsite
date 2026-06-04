// Service Worker for D' PanYard PWA
const CACHE_NAME = 'dpanyard-v2';
const URLS_TO_CACHE = [
  '/dpanyard/',
  '/dpanyard/index.html',
  '/dpanyard/login/index.html',
  '/dpanyard/login/personal.html',
  '/dpanyard/login/business.html',
  '/dpanyard/signup/index.html',
  '/dpanyard/signup/personal.html',
  '/dpanyard/signup/business.html',
  '/dpanyard/dashboard/personal.html',
  '/dpanyard/dashboard/business.html',
  '/dpanyard/dashboard/permissions.html',
  '/dpanyard/assets/css/payment.css',
  '/dpanyard/assets/js/payment.js',
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&family=Inter:wght@400;500;600&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://unpkg.com/lucide@latest'
];

// Install event: cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: network-first for HTML pages, cache-first for other static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isHTML = request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname.endsWith('/login/') || url.pathname.endsWith('/');

  if (request.url.includes('supabase') || request.url.includes('googleapis')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') return response;
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          return response;
        })
        .catch(() => caches.match(request).then((response) => response || new Response('Offline', { status: 503 })))
    );
    return;
  }

  if (isHTML) {
    event.respondWith(
      fetch(request)
        .then((response) => response || caches.match(request))
        .catch(() => caches.match(request).then((response) => response || new Response('Offline', { status: 503 })))
    );
  } else {
    event.respondWith(
      caches.match(request)
        .then((response) => response || fetch(request))
        .catch(() => new Response('Offline', { status: 503 }))
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-profile') {
    event.waitUntil(syncProfileData());
  }
});

async function syncProfileData() {
  try {
    const db = await openIndexedDB();
    const pendingUpdates = await db.getAll('pending-updates');
    for (const update of pendingUpdates) {
      await fetch(update.url, {
        method: update.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update.data)
      });
      await db.delete('pending-updates', update.id);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('dpanyard', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    return request.result;
    request.onupgradeneeded = (event) => {
      event.target.result.createObjectStore('pending-updates', { keyPath: 'id' });
    };
  });
}