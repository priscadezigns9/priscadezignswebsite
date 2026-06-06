/* Sovereign Wallet Core v4.7.0 [High-Fidelity & Blockchain SaaS] */

const ASSETS_DATA = [
    { id: 'prn', name: 'PRISCION ($PRN)', balance: '2,540.00', usd: '$2,540.00', logo: 'https://drive.google.com/uc?export=view&id=1Q3xqSqxA5QciLWWAXEXzDSUTWNiJzeI4' },
    { id: 'nrl', name: 'NEURAL ($NRL)', balance: '15,000', usd: '$15,000', logo: 'https://drive.google.com/uc?export=view&id=1To_XBjrXDO6ZRoQ2YzTleweTg6sEHgOL' },
    { id: 'atlr', name: 'ATELIA ($ATLR)', balance: '82,400', usd: '$2,472.00', logo: 'https://drive.google.com/uc?export=view&id=11BZOAz1dm9ALneaf-gOA3aGx0pGKM5gd' },
    { id: 'musd', name: 'MUSTARD ($MUSD)', balance: '867.85', usd: '$867.85', logo: 'https://drive.google.com/uc?export=view&id=1RJfigGY8p5kg0-4WV8_DExrDd4Hj2mtz' }
];

const EMPIRE_NODES = [
    { name: 'ATELIA', url: '/ateliagaming/', logo: 'https://drive.google.com/uc?export=view&id=11BZOAz1dm9ALneaf-gOA3aGx0pGKM5gd' },
    { name: 'DREAMING', url: '/dreaminganime/', logo: 'https://drive.google.com/uc?export=view&id=1LKlvVSg4UJB0T0Qb1fyVPs6COTmtDSko' },
    { name: 'RIDDIIM', url: '/riddiim/', logo: 'https://drive.google.com/uc?export=view&id=1gDFu34kqiGtiFqqgXR9bplqipa0QkJVT' },
    { name: 'CALALLOO', url: '/calalloo/', logo: 'https://drive.google.com/uc?export=view&id=1MOdc4fha-Guqo1X3Y8l9JdlBuMdDuuzB' },
    { name: 'NURASEN', url: '/nurasen/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/nurasen_icon.jpg' },
    { name: 'ESSENCE', url: '/essenceelite/', icon: '✨' },
    { name: 'GEN PLAY', url: '/thegenplay/', icon: '🎮' },
    { name: 'AUTODROME', url: '/theautodrome/', icon: '🏎️' },
    { name: 'GLOW', url: '/glowprotocol/', icon: '🧴' },
    { name: 'PEAK FIT', url: '/peakfit/', icon: '⚡' },
    { name: 'SOLE', url: '/soleprestige/', icon: '👟' },
    { name: 'ESCAPIST', url: '/theescapist/', icon: '🏝️' },
    { name: 'TECH SCOUT', url: '/techscout/', icon: '🔭' },
    { name: 'WATCHLIST', url: '/thewatchlist/', icon: '⌚' },
    { name: 'VERDANT', url: '/verdantco/', icon: '🌱' },
    { name: 'DESKWELL', url: '/deskwell/', icon: '🪑' }
];

const SAAS_NODES = [
    { name: 'CUPYX', url: 'https://cupyx.prn', icon: '☕' },
    { name: 'MOBLYNC', url: 'https://moblync.prn', icon: '📱' },
    { name: 'KARJOV', url: 'https://karjov.prn', icon: '⚔️' },
    { name: 'ROSELL', url: 'https://rosell.prn', icon: '🌹' },
    { name: 'VELLOQ', url: 'https://velloq.prn', icon: '⚡' }
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
        <div style="text-align:center; padding:60px 25px;">
            <div class="hologram-glow" style="width:100px; height:100px; margin:0 auto 30px; border-radius:50%; background:url('https://drive.google.com/uc?export=view&id=1YMkt8FVv4RwG3zLmEw-DfycGg7G9S-7E') center/cover;"></div>
            <h2 style="font-family:'Playfair Display'; margin-bottom:15px; color:white; font-size:1.8rem;">Sovereign Identity</h2>
            <p style="color:#888; font-size:0.8rem; margin-bottom:40px;">Initialize your neural handshake on the Priscion Ledger.</p>
            <button onclick="startWalletCreation()" class="btn btn-primary" style="width:100%; margin-bottom:15px; padding:18px;">CREATE IDENTITY</button>
            <button onclick="startRestore()" class="btn btn-outline" style="width:100%; padding:18px;">RESTORE VAULT</button>
        </div>
    `;
}

function startWalletCreation() {
    const seed = "nebula orbit galaxy pulse neural ledger sovereign mustard architect high fidelity empire";
    const content = document.getElementById('sidebar').querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding:30px 20px;">
            <h3 style="margin-bottom:20px; color:white;">Neural Seed Phrase</h3>
            <div style="background:#050505; padding:25px; border-radius:20px; border:1px solid #7B35D4; font-family:'Space Mono'; font-size:0.75rem; display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:30px; text-align:left;">
                ${seed.split(' ').map((w, i) => `<span style="color:#aaa;"><b style="color:#7B35D4;">${i+1}.</b> ${w}</span>`).join('')}
            </div>
            <input type="password" id="new-pin" placeholder="Create 4-Digit PIN" maxlength="4" style="width:100%; padding:18px; background:#111; border:1px solid #222; border-radius:15px; color:white; text-align:center; margin-bottom:25px; font-size:1.5rem;">
            <button onclick="finalizeCreation('${seed}')" class="btn btn-primary" style="width:100%; padding:18px;">FINALIZE IDENTITY</button>
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
        <div style="text-align:center; padding:80px 30px;">
            <div class="hologram-glow" style="width:80px; height:80px; margin:0 auto 40px; border-radius:50%; background:url('https://drive.google.com/uc?export=view&id=1YMkt8FVv4RwG3zLmEw-DfycGg7G9S-7E') center/cover; border:2px solid #7B35D4;"></div>
            <h2 style="font-family:'Playfair Display'; margin-bottom:40px; color:white;">Unlock Vault</h2>
            <input type="password" id="auth-pin" placeholder="••••" maxlength="4" style="width:100%; padding:20px; background:#111; border:1px solid #222; border-radius:15px; color:white; text-align:center; margin-bottom:40px; font-size:2rem; letter-spacing:10px;">
            <button onclick="checkAuthPin()" class="btn btn-primary" style="width:100%; padding:18px;">UNLOCK</button>
        </div>
    `;
}

function checkAuthPin() {
    if(document.getElementById('auth-pin').value === localStorage.getItem('priscion_pin')) {
        sessionStorage.setItem('prn_sess', '1');
        renderWalletMain(document.getElementById('sidebar'));
    } else { alert("Handshake Failed. Incorrect PIN."); }
}

function renderWalletMain(sidebar) {
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    const pfp = localStorage.getItem('user_pfp') || 'https://drive.google.com/uc?export=view&id=1YMkt8FVv4RwG3zLmEw-DfycGg7G9S-7E';
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
                <div onclick="openVaultForPFP()" style="width:55px; height:55px; border-radius:50%; border:2px solid #7B35D4; overflow:hidden; cursor:pointer; background:#000;">
                    <img src="${pfp}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div>
                    <div style="font-weight:900; font-size:1.1rem; color:white; letter-spacing:0.5px;">$prisca.prn</div>
                    <div style="font-size:0.5rem; color:#7B35D4; text-transform:uppercase; font-weight:800;">Sovereign Node Active</div>
                </div>
            </div>
            
            <div style="background:linear-gradient(135deg, #7B35D4 0%, #4c1d95 100%); padding:25px; border-radius:24px; color:white; margin-bottom:25px; box-shadow:0 10px 30px rgba(123,53,212,0.3);">
                <div style="font-size:0.6rem; text-transform:uppercase; opacity:0.7; margin-bottom:8px; font-weight:700;">Net Worth</div>
                <div style="font-size:2.2rem; font-weight:900; margin-bottom:20px;">$4,240.50</div>
                <div style="display:flex; gap:10px;">
                    <button class="btn" style="flex:1; background:rgba(255,255,255,0.15); border:none; color:white; padding:10px; font-size:0.6rem;" onclick="alert('Send Module Interface Active')">SEND</button>
                    <button class="btn" style="flex:1; background:rgba(255,255,255,0.15); border:none; color:white; padding:10px; font-size:0.6rem;" onclick="alert('Receive Module Interface Active')">RECEIVE</button>
                    <button class="btn" style="flex:1; background:rgba(255,255,255,0.15); border:none; color:white; padding:10px; font-size:0.6rem;" onclick="openPayPalBuy()">BUY</button>
                </div>
            </div>

            <div id="asset-list-container"></div>
        </div>
    `;
    document.getElementById('asset-list-container').innerHTML = ASSETS_DATA.map(a => `
        <div style="background:#111; border:1px solid rgba(255,255,255,0.03); border-radius:18px; padding:18px; display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <img src="${a.logo}" style="width:32px; height:32px; border-radius:50%;">
                <div>
                    <div style="font-weight:800; font-size:0.75rem; color:white;">${a.name}</div>
                    <div style="font-size:0.55rem; color:#666;">${a.balance}</div>
                </div>
            </div>
            <div style="text-align:right;">
                <div style="font-weight:900; font-size:0.8rem; color:white;">${a.usd}</div>
            </div>
        </div>
    `).join('');
}

function openPayPalBuy() {
    window.open('https://www.paypal.com/signin', '_blank');
    alert('Sovereign Fiat Gateway Initialized (PayPal). Please sign in to finalize purchase.');
}

async function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white;">Sovereign Vault</h2>
                <button class="btn btn-primary" style="padding:8px 15px; font-size:0.5rem;" onclick="document.getElementById('vault-up-core').click()">+ ADD ASSET</button>
            </div>
            <input type="file" id="vault-up-core" style="display:none;" onchange="alert('Asset Minted to Sovereign Ledger.')">
            
            <div id="vault-categories" style="display:flex; gap:10px; overflow-x:auto; padding-bottom:15px; margin-bottom:15px;">
                <button class="btn btn-outline" style="font-size:0.5rem; padding:6px 12px; white-space:nowrap;">ALL</button>
                <button class="btn" style="font-size:0.5rem; padding:6px 12px; border:1px solid #222; color:#888; white-space:nowrap;">IDENTITY</button>
                <button class="btn" style="font-size:0.5rem; padding:6px 12px; border:1px solid #222; color:#888; white-space:nowrap;">FINANCIAL</button>
                <button class="btn" style="font-size:0.5rem; padding:6px 12px; border:1px solid #222; color:#888; white-space:nowrap;">MEDIA</button>
            </div>

            <div id="vault-items-grid-core" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;"></div>
        </div>
    `;
    try {
        const resp = await fetch('https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/vault_manifest.json');
        const data = await resp.json();
        document.getElementById('vault-items-grid-core').innerHTML = data.map(item => `
            <div style="background:#111; border:1px solid rgba(255,255,255,0.03); padding:15px; border-radius:20px; text-align:center; cursor:pointer;" onclick="window.open('${item.url}')">
                <div style="font-size:1.8rem; margin-bottom:10px;">${item.type.includes('image') ? '🖼️' : (item.type.includes('pdf') ? '🪪' : '📄')}</div>
                <div style="font-size:0.55rem; font-weight:800; color:#fff; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${item.name}</div>
                <div style="font-size:0.45rem; color:#555; margin-top:4px;">${item.category}</div>
            </div>
        `).join('');
    } catch(e) {
        document.getElementById('vault-items-grid-core').innerHTML = '<p style="color:#555; font-size:0.6rem; grid-column:span 2; text-align:center;">No assets found in Ledger.</p>';
    }
}

function renderEmpireHub() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin-bottom:20px;">Empire Ecosystem</h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                ${EMPIRE_NODES.map(node => `
                    <a href="${node.url}" style="background:#111; border:1px solid rgba(255,255,255,0.03); padding:20px; border-radius:22px; text-align:center; text-decoration:none; color:white; display:block;">
                        ${node.logo ? `<img src="${node.logo}" style="width:45px; height:45px; border-radius:50%; border:2px solid #7B35D4; margin-bottom:12px;">` : `<div style="font-size:2rem; margin-bottom:12px;">${node.icon}</div>`}
                        <div style="font-size:0.65rem; font-weight:900;">${node.name}</div>
                        <div style="font-size:0.45rem; color:#7B35D4; font-weight:800; margin-top:5px;">.PRN NODE</div>
                    </a>
                `).join('')}
            </div>
            
            <h3 style="font-size:0.6rem; color:#888; text-transform:uppercase; margin:30px 0 15px; letter-spacing:2px; font-weight:900;">Blockchain SaaS</h3>
            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px;">
                ${SAAS_NODES.map(s => `
                    <div onclick="window.open('${s.url}')" style="background:#111; border:1px solid rgba(255,255,255,0.03); padding:15px; border-radius:18px; text-align:center; cursor:pointer;">
                        <div style="font-size:1.5rem; margin-bottom:8px;">${s.icon}</div>
                        <div style="font-size:0.55rem; font-weight:900; color:white;">${s.name}</div>
                        <div style="font-size:0.4rem; color:#888; margin-top:3px;">Sovereign Protocol</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function switchWalletTabCore(tab) {
    const tabs = ['assets', 'vault', 'shop', 'sync'];
    tabs.forEach(t => {
        const b = document.getElementById('tab-' + t);
        if(b) { b.style.color = '#555'; b.style.borderTop = 'none'; b.style.background = 'none'; }
    });
    const active = document.getElementById('tab-' + tab);
    if(active) { active.style.color = '#7B35D4'; active.style.borderTop = '3px solid #7B35D4'; active.style.background = 'rgba(123,53,212,0.02)'; }
    if(tab === 'assets') renderAssetsView();
    if(tab === 'vault') renderVaultView();
    if(tab === 'shop') renderEmpireHub();
    if(tab === 'sync') renderSettingsView();
}

function renderSettingsView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin-bottom:25px;">Settings</h2>
            <div style="background:#111; border-radius:20px; overflow:hidden;">
                <div class="settings-item" onclick="alert('Neural Sync Active')">
                    <span style="font-size:0.75rem; color:white;">Neural Engine</span>
                    <span style="color:#7B35D4; font-size:0.6rem;">v4.7.0</span>
                </div>
                <div class="settings-item" onclick="alert('Nurasen Shield Active')">
                    <span style="font-size:0.75rem; color:white;">Security Shield</span>
                    <span style="color:#00ff88; font-size:0.6rem;">Nurasen v1.0</span>
                </div>
                <div class="settings-item" onclick="alert('Developer Mode Active')">
                    <span style="font-size:0.75rem; color:white;">Developer Node</span>
                    <span style="color:#888; font-size:0.6rem;">ENABLED</span>
                </div>
                <div class="settings-item" style="border-bottom:none;" onclick="alert('Identity Reset Initiated')">
                    <span style="font-size:0.75rem; color:#ff4444;">Wipe Identity</span>
                    <span style="color:#ff4444; font-size:0.6rem;">RESET</span>
                </div>
            </div>
            <p style="text-align:center; color:#444; font-size:0.45rem; margin-top:30px;">PRISCION SOVEREIGN BLOCKCHAIN — 2026</p>
        </div>
    `;
}

function openVaultForPFP() {
    alert("Vault Access Initialized. Please select an NFT to anchor as your Sovereign Profile Picture.");
    switchWalletTabCore('vault');
}

// Global Styles Injection
const style = document.createElement('style');
style.textContent = `
    .settings-item { padding:20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #222; cursor:pointer; }
    .settings-item:hover { background:rgba(255,255,255,0.02); }
    .hologram-glow { box-shadow:0 0 20px rgba(123,53,212,0.5); animation:hologramPulse 3s infinite ease-in-out; }
    @keyframes hologramPulse { 0% { transform:scale(1); opacity:0.8; } 50% { transform:scale(1.05); opacity:1; } 100% { transform:scale(1); opacity:0.8; } }
`;
document.head.appendChild(style);
