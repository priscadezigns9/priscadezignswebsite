(function() {
    function init() {
        document.querySelectorAll('.t-iframe-placeholder').forEach(ph => {
            if (ph.dataset.cin) return; ph.dataset.cin = '1';
            const o = document.createElement('div'); o.className = 'cinematic-overlay'; ph.appendChild(o);
            const l = document.createElement('div'); l.className = 'cinematic-label'; l.textContent = 'View Preview'; ph.appendChild(l);
            ph.onmousemove = e => {
                const r = ph.getBoundingClientRect();
                ph.style.setProperty('--x', ((e.clientX - r.left) / r.width) * 100 + '%');
                ph.style.setProperty('--y', ((e.clientY - r.top) / r.height) * 100 + '%');
            };
            ph.onmouseenter = () => {
                const i = ph.querySelector('.t-thumb-img');
                if (i) { i.style.transform = 'scale(1.1)'; i.style.filter = 'brightness(0.7) contrast(1.2)'; i.style.transition = 'all 0.5s ease'; }
            };
            ph.onmouseleave = () => {
                const i = ph.querySelector('.t-thumb-img');
                if (i) { i.style.transform = 'scale(1)'; i.style.filter = 'none'; }
            };
        });
    }
    init();
    new MutationObserver(init).observe(document.body, { childList: true, subtree: true });
})();
