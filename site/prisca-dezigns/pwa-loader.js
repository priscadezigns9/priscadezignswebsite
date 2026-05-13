// Prisca Dezigns PWA Loader
(function() {
  // Add manifest link
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = '/prisca-dezigns/manifest.json';
  document.head.appendChild(link);

  // Theme color
  const tc = document.createElement('meta');
  tc.name = 'theme-color';
  tc.content = '#7B35D4';
  document.head.appendChild(tc);

  // iOS PWA
  const ios = document.createElement('meta');
  ios.name = 'apple-mobile-web-app-capable';
  ios.content = 'yes';
  document.head.appendChild(ios);

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/prisca-dezigns/sw.js').catch(() => {});
  }

  // Install button
  const btn = document.createElement('button');
  btn.id = 'pwa-install-btn';
  btn.innerHTML = '&#8659; Install App';
  btn.style.cssText = 'display:none;position:fixed;bottom:210px;right:24px;z-index:9999;' +
    'background:linear-gradient(135deg,#7B35D4,#EC4899);color:#fff;border:none;' +
    'border-radius:50px;padding:10px 18px;font-size:0.78rem;font-weight:700;' +
    'cursor:pointer;align-items:center;gap:8px;' +
    'box-shadow:0 4px 20px rgba(123,53,212,0.5);font-family:inherit;';
  document.body.appendChild(btn);

  let dp;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    dp = e;
    btn.style.display = 'flex';
  });
  btn.addEventListener('click', async () => {
    if (!dp) return;
    dp.prompt();
    await dp.userChoice;
    dp = null;
    btn.style.display = 'none';
  });
  window.addEventListener('appinstalled', () => {
    btn.style.display = 'none';
  });
})();
