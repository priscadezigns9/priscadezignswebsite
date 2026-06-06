/* Sovereign Wallet Core v4.6.0 [Neural & High-Fidelity] */

const ASSETS_DATA = [
    { id: 'prn', name: 'PRISCION ($PRN)', balance: '2,540.00', usd: '$2,540.00', logo: 'https://drive.google.com/uc?export=view&id=1Q3xqSqxA5QciLWWAXEXzDSUTWNiJzeI4' },
    { id: 'nrl', name: 'NEURAL ($NRL)', balance: '15,000', usd: '$15,000', logo: 'https://drive.google.com/uc?export=view&id=1To_XBjrXDO6ZRoQ2YzTleweTg6sEHgOL' },
    { id: 'atlr', name: 'ATELIA ($ATLR)', balance: '82,400', usd: '$2,472.00', logo: 'https://drive.google.com/uc?export=view&id=1DJqBy1SThRorrgD87rbkDCQ8W4ygyGC-' },
    { id: 'musd', name: 'MUSTARD ($MUSD)', balance: '867.85', usd: '$867.85', logo: 'https://drive.google.com/uc?export=view&id=1RJfigGY8p5kg0-4WV8_DExrDd4Hj2mtz' }
];

const EMPIRE_NODES = [
    { name: 'ATELIA', url: 'ateliagaming/index.html', logo: 'https://drive.google.com/uc?export=view&id=1d0RGyRxGX4K-tK-KrWofcduDRB-SYrCE' },
    { name: 'DREAMING', url: 'dreaminganime/index.html', logo: 'https://drive.google.com/uc?export=view&id=1LKlvVSg4UJB0T0Qb1fyVPs6COTmtDSko' },
    { name: 'RIDDIIM', url: 'riddiim/index.html', logo: 'https://drive.google.com/uc?export=view&id=1EPmsqgYmNoom_B1ptQ4Hghu5HPDg4xmL' },
    { name: 'CALALLOO', url: 'calalloo/index.html', logo: 'https://drive.google.com/uc?export=view&id=1MOdc4fha-Guqo1X3Y8l9JdlBuMdDuuzB' },
    { name: 'NURASEN', url: 'nurasen/index.html', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/nurasen_icon.jpg' },
    { name: 'ESSENCE', url: 'essenceelite/index.html', icon: '✨' },
    { name: 'GEN PLAY', url: 'thegenplay/index.html', icon: '🎮' },
    { name: 'AUTODROME', url: 'theautodrome/index.html', icon: '🏎️' },
    { name: 'GLOW', url: 'glowprotocol/index.html', icon: '🧴' },
    { name: 'PEAK FIT', url: 'peakfit/index.html', icon: '⚡' },
    { name: 'SOLE', url: 'soleprestige/index.html', icon: '👟' },
    { name: 'ESCAPIST', url: 'theescapist/index.html', icon: '🏝️' },
    { name: 'TECH SCOUT', url: 'techscout/index.html', icon: '🔭' },
    { name: 'WATCHLIST', url: 'thewatchlist/index.html', icon: '⌚' },
    { name: 'VERDANT', url: 'verdantco/index.html', icon: '🌱' },
    { name: 'DESKWELL', url: 'deskwell/index.html', icon: '🪑' }
];

const SAAS_NODES = [
    { name: 'CUPYX', icon: '☕' },
    { name: 'MOBLYNC', icon: '📱' },
    { name: 'KARJOV', icon: '⚔️' },
    { name: 'ROSELL', icon: '🌹' },
    { name: 'VELLOQ', icon: '⚡' }
];

function initializeWallet(containerId) {
    const sidebar = document.getElementById(containerId);
    if(!sidebar) return;
    const hasPin = localStorage.getItem('priscion_pin');
    const isSess = sessionStorage.getItem('prn_sess');
    if(!hasPin) renderOnboarding(sidebar);
    else if(!isSess) renderAuth(sidebar);
    else renderWalletMain(sidebar);
}

function renderOnboarding(sidebar) {
    const content = sidebar.querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding-top:40px;">
            <img src="https://drive.google.com/uc?export=view&id=1YMkt8FVv4RwG3zLmEw-DfycGg7G9S-7E" style="width:80px; border-radius:50%; border:2px solid #7B35D4; margin-bottom:20px;">
            <h2 style="font-family:'Playfair Display'; margin-bottom:10px; color:white;">Initialize Identity</h2>
            <button onclick="startWalletCreation()" class="btn btn-primary" style="width:100%; margin-bottom:15px; justify-content:center;">CREATE NEW WALLET</button>
            <button onclick="startRestore()" class="btn btn-outline" style="width:100%; margin-bottom:15px; justify-content:center;">RESTORE FROM SEED</button>
        </div>
    `;
}

function startWalletCreation() {
    const seed = "nebula orbit galaxy pulse neural ledger sovereign mustard architect high fidelity empire";
    const content = document.getElementById('sidebar').querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding-top:20px;">
            <h3 style="margin-bottom:15px; color:white;">Secure Your Seed</h3>
            <div style="background:#000; padding:20px; border-radius:16px; border:1.5px solid #7B35D4; font-family:'Space Mono'; font-size:0.7rem; display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px;">
                ${seed.split(' ').map((w, i) => `<span style="text-align:left; color:#fff;">${i+1}. ${w}</span>`).join('')}
            </div>
            <input type="password" id="new-pin" placeholder="Set 4-Digit PIN" style="width:100%; padding:15px; background:#000; border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:white; text-align:center; margin-bottom:20px; font-size:1.2rem;">
            <button onclick="finalizeCreation('${seed}')" class="btn btn-primary" style="width:100%; justify-content:center;">FINALIZE IDENTITY</button>
        </div>
    `;
}

function finalizeCreation(seed) {
    const pin = document.getElementById('new-pin').value;
    if(pin.length < 4) { alert("PIN must be 4 digits."); return; }
    localStorage.setItem('priscion_pin', pin);
    localStorage.setItem('priscion_seed', seed);
    sessionStorage.setItem('prn_sess', '1');
    renderWalletMain(document.getElementById('sidebar'));
}

function renderAuth(sidebar) {
    const content = sidebar.querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding-top:60px;">
            <img src="https://drive.google.com/uc?export=view&id=1YMkt8FVv4RwG3zLmEw-DfycGg7G9S-7E" style="width:80px; border-radius:50%; border:2px solid #7B35D4; margin-bottom:20px;">
            <h2 style="font-family:'Playfair Display'; margin-bottom:30px; color:white;">Unlock Vault</h2>
            <input type="password" id="auth-pin" placeholder="••••" style="width:100%; padding:15px; background:#000; border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:white; text-align:center; margin-bottom:30px; font-size:1.5rem;">
            <button onclick="checkAuthPin()" class="btn btn-primary" style="width:100%; justify-content:center;">UNLOCK</button>
        </div>
    `;
}

function checkAuthPin() {
    if(document.getElementById('auth-pin').value === localStorage.getItem('priscion_pin')) {
        sessionStorage.setItem('prn_sess', '1');
        renderWalletMain(document.getElementById('sidebar'));
    } else { alert("Incorrect PIN."); }
}

function renderWalletMain(sidebar) {
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    const pfp = localStorage.getItem('user_pfp') || '';
    view.innerHTML = `
        <div style="text-align:center; margin:20px 0;">
            <div onclick="changePFP()" style="width:75px; height:70px; border-radius:50%; border:2.5px solid #7B35D4; margin:0 auto 15px; overflow:hidden; background:#050505; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                ${pfp ? `<img src="${pfp}" style="width:100%; height:100%; object-fit:cover;">` : `<span style="font-size:1.5rem;">👤</span>`}
            </div>
            <div style="font-weight:900; font-size:1.2rem; color:white;">$prisca.prn</div>
            <div style="font-size:0.6rem; color:#888; text-transform:uppercase; margin-top:5px; letter-spacing:1px;">Balance: <span style="color:white; font-weight:900;">$4,240.50</span></div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
            <button class="btn btn-primary" onclick="alert('Send Module Ready')" style="justify-content:center; font-size:0.6rem;">Send</button>
            <button class="btn btn-outline" onclick="alert('Receive Module Ready')" style="justify-content:center; font-size:0.6rem;">Receive</button>
        </div>
        <div id="asset-list-container"></div>
    `;
    document.getElementById('asset-list-container').innerHTML = ASSETS_DATA.map(a => `
        <div style="background:#111; border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:15px; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <img src="${a.logo}" style="width:28px; border-radius:50%;">
                <div><div style="font-weight:800; font-size:0.7rem; color:white;">${a.name}</div><div style="font-size:0.55rem; color:#888;">${a.balance}</div></div>
            </div>
            <div style="text-align:right;"><div style="font-weight:900; font-size:0.75rem; color:#7B35D4;">${a.usd}</div></div>
        </div>
    `).join('');
}

async function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
            <h2 style="font-family:'Playfair Display'; font-size:1.1rem; color:white;">Vault</h2>
            <button class="btn btn-primary" style="padding:6px 12px; font-size:0.45rem;" onclick="document.getElementById('vault-up-core').click()">+ UPLOAD</button>
        </div>
        <input type="file" id="vault-up-core" style="display:none;" onchange="alert('Asset Minted')">
        <div id="vault-items-grid-core" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;"></div>
    `;
    try {
        const resp = await fetch('https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/vault_manifest.json');
        const data = await resp.json();
        document.getElementById('vault-items-grid-core').innerHTML = data.map(item => `
            <div style="background:#111; border:1px solid rgba(255,255,255,0.05); padding:12px; border-radius:12px; text-align:center; cursor:pointer;" onclick="window.open('${item.url}')">
                <div style="font-size:1.2rem;">${item.type.includes('image') ? '🖼️' : (item.type.includes('pdf') ? '🪪' : '📄')}</div>
                <div style="font-size:0.5rem; font-weight:800; color:#fff; margin-top:8px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${item.name}</div>
            </div>
        `).join('');
    } catch(e) {}
}

function renderEmpireHub() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <h2 style="font-family:'Playfair Display'; font-size:1.1rem; margin-bottom:15px; color:white;">Ecosystem</h2>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            ${EMPIRE_NODES.map(node => `
                <a href="${node.url}" style="background:#111; border:1px solid rgba(255,255,255,0.05); padding:15px; border-radius:12px; text-align:center; text-decoration:none; color:white;">
                    ${node.logo ? `<img src="${node.logo}" style="width:35px; height:35px; border-radius:50%; border:1px solid #7B35D4; margin-bottom:8px;">` : `<div style="font-size:1.5rem; margin-bottom:8px;">${node.icon}</div>`}
                    <div style="font-size:0.6rem; font-weight:900;">${node.name}</div>
                </a>
            `).join('')}
        </div>
        <h3 style="font-size:0.6rem; color:#888; text-transform:uppercase; margin:20px 0 10px; letter-spacing:1px;">Blockchain SaaS</h3>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
            ${SAAS_NODES.map(s => `
                <div style="background:#111; border:1px solid rgba(255,255,255,0.05); padding:10px; border-radius:10px; text-align:center;">
                    <div style="font-size:1.2rem; margin-bottom:5px;">${s.icon}</div>
                    <div style="font-size:0.45rem; font-weight:900; color:white;">${s.name}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function switchWalletTabCore(tab) {
    ['assets', 'vault', 'shop', 'sync'].forEach(t => {
        const b = document.getElementById('tab-' + t);
        if(b) { b.style.color = '#888'; b.style.borderTop = 'none'; b.style.background = 'none'; }
    });
    const active = document.getElementById('tab-' + tab);
    if(active) { active.style.color = '#7B35D4'; active.style.borderTop = '2px solid #7B35D4'; active.style.background = 'rgba(123,53,212,0.05)'; }
    if(tab === 'assets') renderAssetsView();
    if(tab === 'vault') renderVaultView();
    if(tab === 'shop') renderEmpireHub();
    if(tab === 'sync') {
        document.getElementById('wallet-main-view').innerHTML = `
            <h2 style="font-family:'Playfair Display'; font-size:1.1rem; margin-bottom:20px; color:white;">Ledger Sync</h2>
            <div style="background:#111; border:1px solid rgba(255,255,255,0.05); border-radius:15px; padding:25px; text-align:center;">
                <p style="font-size:0.75rem; margin-bottom:20px; color:#888;">Connect Hardware / Dev Mode</p>
                <button class="btn btn-outline" style="width:100%; margin-bottom:10px; justify-content:center;">HW WALLET</button>
                <button class="btn btn-outline" style="width:100%; justify-content:center; border-color:#00ff88; color:#00ff88;">DEV MODE</button>
            </div>
        `;
    }
}

function changePFP() { document.getElementById('pfp-upload-core').click(); }
function handlePFPCore(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        localStorage.setItem('user_pfp', event.target.result);
        renderAssetsView();
    };
    reader.readAsDataURL(file);
}
