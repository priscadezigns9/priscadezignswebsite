
(function(){
    function initCinematic(){
        const items = document.querySelectorAll('.t-iframe-placeholder');
        items.forEach(el => {
            if (el.dataset.cinematic) return;
            el.dataset.cinematic = 'true';
            const overlay = document.createElement('div');
            overlay.className = 'marquee-overlay';
            el.appendChild(overlay);
            const label = document.createElement('div');
            label.className = 'view-label-cinematic';
            label.textContent = 'View Preview';
            el.appendChild(label);
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                el.style.setProperty('--x', x + '%');
                el.style.setProperty('--y', y + '%');
            });
        });
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initCinematic); } else { initCinematic(); }
    const target = document.querySelector('.t-grid') || document.body;
    new MutationObserver(initCinematic).observe(target, { childList: true, subtree: true });
})();
