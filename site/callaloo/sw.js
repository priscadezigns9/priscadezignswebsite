// Callaloo Service Worker v3
const CACHE = "callaloo-v3";
const ASSETS = [
  "/callaloo/",
  "/callaloo/index.html",
  "/callaloo/recipes/",
  "/callaloo/scan/",
  "/callaloo/feed/",
  "/callaloo/blog/",
  "/callaloo/waitlist/",
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => caches.match(e.request))
  );
});