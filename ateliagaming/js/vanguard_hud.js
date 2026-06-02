(function() {
    // Create the HUD element
    const hud = document.createElement('div');
    hud.id = 'vanguard-hud';
    hud.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:32px; background:#000; color:#FF6B00; display:none; align-items:center; justify-content:space-between; padding:0 20px; z-index:20000; font-family:"Russo One", sans-serif; font-size:12px; border-bottom:1px solid #D32F2F; box-shadow:0 0 15px rgba(211,47,47,0.4); box-sizing:border-box;';
    hud.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <img src="https://priscadezigns.org/logos/atelier-gaming.png" style="height:18px;">
            <span style="letter-spacing:1px;">VANGUARD: <span id="hud-rank" style="color:#FFF;">AUTHENTICATING...</span></span>
        </div>
        <div style="display:flex; align-items:center; gap:20px;">
            <span style="color:#FFF;">PRESTIGE: <span id="hud-atlr" style="color:#FF6B00; font-weight:900;">0 ATLR</span></span>
            <a href="https://priscadezigns.org/ateliagaming/arena.html" style="color:#D32F2F; text-decoration:none; border:1px solid #D32F2F; padding:2px 10px; border-radius:3px; font-size:10px; transition:0.3s;">ENTER ARENA</a>
        </div>
    `;
    document.body.prepend(hud);

    async function updateHUD() {
        if (!window.Atelia) return;
        try {
            const { data } = await Atelia.auth.getUser();
            hud.style.display = 'flex';
            // Adjust body padding to avoid content overlap
            document.body.style.paddingTop = '32px';
            
            if (data?.user) {
                const p = await Atelia.arena.getProfile(data.user.id);
                document.getElementById('hud-rank').innerText = (p.username || "Vanguard").toUpperCase();
                document.getElementById('hud-atlr').innerText = (p.atlr_prestige || 0) + " ATLR";
            } else {
                document.getElementById('hud-rank').innerText = "GUEST";
                document.getElementById('hud-atlr').innerText = "LOG IN TO STORE";
            }
        } catch(e) { 
            console.log("HUD Sync Blip");
            hud.style.display = 'none';
        }
    }

    // Wait for Atelia to be available
    const checkAtelia = setInterval(() => {
        if (window.Atelia) {
            clearInterval(checkAtelia);
            Atelia.auth.onAuthStateChange(() => updateHUD());
            updateHUD();
        }
    }, 500);
})();
