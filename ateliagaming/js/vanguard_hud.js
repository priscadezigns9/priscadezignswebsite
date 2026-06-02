(function() {
    // High-Fidelity Vanguard HUD v1.2
    const hud = document.createElement('div');
    hud.id = 'vanguard-hud';
    hud.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:40px; background:#000; color:#FF6B00; display:none; align-items:center; justify-content:space-between; padding:0 20px; z-index:20000; font-family:"Russo One", sans-serif; font-size:12px; border-bottom:1px solid #D32F2F; box-shadow:0 0 15px rgba(211,47,47,0.4); box-sizing:border-box;';
    
    hud.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
            <div id="hud-avatar-wrap" style="width:30px; height:30px; border-radius:50%; border:2px solid #FFF; overflow:hidden; background:#000; display:flex; align-items:center; justify-content:center;">
                <img id="hud-avatar" src="" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <span style="letter-spacing:1px; color:#FFF;">VANGUARD: <span id="hud-rank" style="color:#FF6B00;">...</span></span>
        </div>
        <div style="display:flex; align-items:center; gap:25px;">
            <div style="display:flex; flex-direction:column; align-items:flex-end;">
                <span style="color:#666; font-size:8px; line-height:1;">STORED PRESTIGE</span>
                <span id="hud-atlr" style="color:#FF6B00; font-weight:900; font-size:14px;">0 ATLR</span>
            </div>
            <a href="https://priscadezigns.org/ateliagaming/arena.html" style="color:#D32F2F; text-decoration:none; border:1px solid #D32F2F; padding:3px 12px; border-radius:3px; font-size:10px; transition:0.3s; font-weight:bold;">ENTER ARENA</a>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        body.hud-active { padding-top: 40px !important; }
        .hud-active nav { top: 40px !important; }
        .hud-active header { top: 40px !important; }
        #hud-avatar.crop-astra { object-position: 50% 12%; transform: scale(3.5); }
        #hud-avatar.crop-mimi { object-position: 50% 10%; transform: scale(3.2); }
        #hud-avatar.crop-nova { object-position: 50% 8%; transform: scale(3.8); }
        #hud-avatar.crop-echo { object-position: 50% 15%; transform: scale(3.0); }
    `;
    document.head.appendChild(style);
    document.body.prepend(hud);

    const assets = {
        astra: 'https://priscadezigns.org/ateliagaming/assets/astra/astra_full_body_hf.webp',
        mimi: 'https://priscadezigns.org/ateliagaming/assets/mimi/mimi_full_body_2d.webp',
        nova: 'https://priscadezigns.org/ateliagaming/assets/nova/nova_v4.webp',
        echo: 'https://priscadezigns.org/ateliagaming/assets/echo/echo_2d_hf.webp'
    };

    async function updateHUD(profile) {
        if (!window.Atelia) return;
        try {
            const { data } = await Atelia.auth.getUser();
            if (data?.user) {
                hud.style.display = 'flex';
                document.body.classList.add('hud-active');
                
                const p = profile || await Atelia.arena.getProfile(data.user.id);
                document.getElementById('hud-rank').innerText = (p.username || "Vanguard").toUpperCase();
                document.getElementById('hud-atlr').innerText = (p.atlr_prestige || 0) + " ATLR";
                
                // Avatar face crop logic
                const img = document.getElementById('hud-avatar');
                const lastChar = localStorage.getItem('atelia_last_char') || 'astra';
                img.src = assets[lastChar];
                img.className = 'crop-' + lastChar;
            } else {
                hud.style.display = 'none';
                document.body.classList.remove('hud-active');
            }
        } catch(e) { 
            console.error("HUD Error:", e);
        }
    }

    const checkAtelia = setInterval(() => {
        if (window.Atelia) {
            clearInterval(checkAtelia);
            Atelia.auth.onAuthStateChange(() => updateHUD());
            window.addEventListener('vanguard-sync', (e) => updateHUD(e.detail));
            updateHUD();
        }
    }, 500);
})();
