/* Sovereign Wallet Core v4.5.8 */
const ASSETS_DATA = [
    { id: 'prn', name: 'PRISCION ($PRN)', balance: '2,540.00', usd: '$2,540.00', logo: 'https://drive.google.com/uc?export=view&id=1Q3xqSqxA5QciLWWAXEXzDSUTWNiJzeI4' },
    { id: 'nrl', name: 'NEURAL ($NRL)', balance: '15,000', usd: '$15,000', logo: 'https://drive.google.com/uc?export=view&id=1To_XBjrXDO6ZRoQ2YzTleweTg6sEHgOL' },
    { id: 'atlr', name: 'ATELIA ($ATLR)', balance: '82,400', usd: '$2,472.00', logo: 'https://drive.google.com/uc?export=view&id=1DJqBy1SThRorrgD87rbkDCQ8W4ygyGC-' },
    { id: 'musd', name: 'MUSTARD ($MUSD)', balance: '867.85', usd: '$867.85', logo: 'https://drive.google.com/uc?export=view&id=1RJfigGY8p5kg0-4WV8_DExrDd4Hj2mtz' }
];

const EMPIRE_NODES = [
    { name: 'ATELIA', handle: '$ateliagaming.prn', url: 'ateliagaming/index.html', logo: 'https://drive.google.com/uc?export=view&id=1d0RGyRxGX4K-tK-KrWofcduDRB-SYrCE' },
    { name: 'DREAMING', handle: '$dreaminganime.prn', url: 'dreaminganime/index.html', logo: 'https://drive.google.com/uc?export=view&id=1LKlvVSg4UJB0T0Qb1fyVPs6COTmtDSko' },
    { name: 'RIDDIIM', handle: '$riddiim.prn', url: 'riddiim/index.html', logo: 'https://drive.google.com/uc?export=view&id=1EPmsqgYmNoom_B1ptQ4Hghu5HPDg4xmL' },
    { name: 'CALALLOO', handle: '$calalloo.prn', url: 'calalloo/index.html', logo: 'https://drive.google.com/uc?export=view&id=1MOdc4fha-Guqo1X3Y8l9JdlBuMdDuuzB' }
];

function initializeWallet(containerId) {
    const sidebar = document.getElementById(containerId);
    if(!sidebar) return;

    // Check if user is returning or new
    const hasPin = localStorage.getItem('priscion_pin');
    const isSess = sessionStorage.getItem('prn_sess');

    if(!hasPin) {
        renderOnboarding(sidebar);
    } else if(!isSess) {
        renderAuth(sidebar);
    } else {
        renderWalletMain(sidebar);
    }
}

function renderOnboarding(sidebar) {
    const content = sidebar.querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding-top:40px;">
            <img src="https://drive.google.com/uc?export=view&id=1YMkt8FVv4RwG3zLmEw-DfycGg7G9S-7E" style="width:80px; border-radius:50%; border:2px solid #7B35D4; margin-bottom:20px;">
            <h2 style="font-family:'Playfair Display'; margin-bottom:10px;">Initialize Identity</h2>
            <p style="color:#888; font-size:0.8rem; margin-bottom:40px;">No Sovereign Wallet detected. Secure your connection to the Ledger.</p>
            
            <button onclick="startWalletCreation()" class="btn btn-primary" style="width:100%; margin-bottom:15px; justify-content:center;">CREATE NEW WALLET</button>
            <button onclick="startRestore()" class="btn btn-outline" style="width:100%; margin-bottom:15px; justify-content:center;">RESTORE FROM SEED</button>
            <button onclick="connectHW()" class="btn btn-outline" style="width:100%; justify-content:center;">CONNECT HARDWARE (LEDGER)</button>
        </div>
    `;
}

function startWalletCreation() {
    const seed = "nebula orbit galaxy pulse neural ledger sovereign mustard architect high fidelity empire";
    const sidebar = document.getElementById('sidebar');
    const content = sidebar.querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding-top:20px;">
            <h3 style="margin-bottom:15px;">Secure Your Seed</h3>
            <p style="font-size:0.7rem; color:#888; margin-bottom:20px;">Write these 12 words down in order. Never share them.</p>
            <div style="background:#000; padding:20px; border-radius:16px; border:1px solid #7B35D4; font-family:'Space Mono'; font-size:0.8rem; display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:30px;">
                ${seed.split(' ').map((w, i) => `<span>${i+1}. ${w}</span>`).join('')}
            </div>
            <label style="display:block; font-size:0.6rem; color:#888; margin-bottom:10px; text-transform:uppercase;">Set 4-Digit Security PIN</label>
            <input type="password" id="new-pin" placeholder="••••" style="width:100%; padding:15px; background:#000; border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:white; text-align:center; margin-bottom:30px; font-size:1.5rem;">
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
            <h2 style="font-family:'Playfair Display'; margin-bottom:30px;">Unlock Vault</h2>
            <input type="password" id="auth-pin" placeholder="••••" style="width:100%; padding:15px; background:#000; border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:white; text-align:center; margin-bottom:30px; font-size:1.5rem;">
            <button onclick="checkAuthPin()" class="btn btn-primary" style="width:100%; justify-content:center;">UNLOCK</button>
        </div>
    `;
}

function checkAuthPin() {
    const pin = document.getElementById('auth-pin').value;
    if(pin === localStorage.getItem('priscion_pin')) {
        sessionStorage.setItem('prn_sess', '1');
        renderWalletMain(document.getElementById('sidebar'));
    } else { alert("Incorrect PIN."); }
}

function renderWalletMain(sidebar) {
    sidebar.querySelector('.sidebar-header h2').innerText = "Neural Vault";
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    const pfp = localStorage.getItem('user_pfp') || '';
    view.innerHTML = `
        <div style="text-align:center; margin:30px 0;">
            <div onclick="changePFP()" style="width:80px; height:80px; background:#050505; border-radius:50%; margin:0 auto 15px; border:2px solid #7B35D4; display:flex; align-items:center; justify-content:center; cursor:pointer; overflow:hidden;">
                ${pfp ? `<img src="${pfp}" style="width:100%; height:100%; object-fit:cover;">` : `<span style="font-size:2rem;">👤</span>`}
            </div>
            <div style="font-weight:900; font-size:1.2rem; letter-spacing:1px;">$prisca.prn</div>
            <div style="font-size:0.6rem; color:#888; text-transform:uppercase; margin-top:5px;">Sovereign Balance: <span style="color:white; font-weight:900;">$4,240.50</span></div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:30px;">
            <button class="btn btn-primary" onclick="alert('Sending Layer Initialized...')" style="justify-content:center; font-size:0.6rem;">Send</button>
            <button class="btn btn-outline" onclick="alert('Receiving Layer Initialized...')" style="justify-content:center; font-size:0.6rem;">Receive</button>
        </div>
        <h3 style="font-size:0.65rem; color:#888; letter-spacing:2px; text-transform:uppercase; margin-bottom:15px;">Your Assets</h3>
        <div id="asset-list-container"></div>
    `;

    const list = document.getElementById('asset-list-container');
    list.innerHTML = ASSETS_DATA.map(a => `
        <div style="background:#000; border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:18px; display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <img src="${a.logo}" style="width:35px; border-radius:50%; border:1px solid rgba(255,255,255,0.1);">
                <div><div style="font-weight:800; font-size:0.8rem;">${a.name}</div><div style="font-size:0.6rem; color:#888;">${a.balance}</div></div>
            </div>
            <div style="text-align:right;"><div style="font-weight:900; font-size:0.85rem;">${a.usd}</div></div>
        </div>
    `).join('');
}

async function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h2 style="font-family:'Playfair Display'; font-size:1.2rem;">Sovereign Vault</h2>
            <button class="btn btn-primary" style="padding:8px 15px; font-size:0.5rem;" onclick="document.getElementById('vault-up-core').click()">+ UPLOAD</button>
        </div>
        <input type="file" id="vault-up-core" style="display:none;" onchange="alert('Asset Minted to IPFS.')">
        <p style="font-size:0.7rem; color:#888; margin-bottom:20px;">Decentralized Storage Hub (Syncing...)</p>
        <div id="vault-items-grid-core" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;"></div>
    `;

    try {
        const resp = await fetch('https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/vault_manifest.json');
        const data = await resp.json();
        const grid = document.getElementById('vault-items-grid-core');
        grid.innerHTML = data.map(item => `
            <div style="background:#000; padding:15px; border-radius:15px; text-align:center; border:1px solid rgba(255,255,255,0.1); cursor:pointer;" onclick="window.open('https://drive.google.com/uc?export=view&id=${item.id}')">
                <div style="font-size:1.5rem;">${item.type.includes('image') ? '🖼️' : (item.type.includes('pdf') ? '🪪' : '📄')}</div>
                <div style="font-size:0.55rem; font-weight:800; margin-top:10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${item.name}</div>
                <div style="font-size:0.45rem; color:#00ff88; margin-top:4px;">${item.ledger_status}</div>
            </div>
        `).join('');
    } catch(e) { console.log(e); }
}

function renderEmpireHub() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <h2 style="font-family:'Playfair Display'; font-size:1.2rem; margin-bottom:20px;">Empire Hub</h2>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            ${EMPIRE_NODES.map(node => `
                <a href="${node.url}" style="background:#111; border:1px solid rgba(255,255,255,0.1); padding:20px; border-radius:16px; text-align:center; text-decoration:none; color:white;">
                    <img src="${node.logo}" style="width:45px; height:45px; border-radius:50%; border:1px solid #7B35D4; margin-bottom:10px;">
                    <div style="font-size:0.7rem; font-weight:900;">${node.name}</div>
                    <div style="font-size:0.55rem; color:#888;">${node.handle}</div>
                </a>
            `).join('')}
        </div>
    `;
}

function switchWalletTabCore(tab) {
    const tabs = ['assets', 'vault', 'shop', 'sync'];
    tabs.forEach(t => {
        const btn = document.getElementById('tab-' + t);
        if(btn) { btn.style.color = '#888'; btn.style.borderTop = 'none'; btn.style.fontWeight = '800'; }
    });
    const activeBtn = document.getElementById('tab-' + tab);
    if(activeBtn) { activeBtn.style.color = '#7B35D4'; activeBtn.style.borderTop = '2px solid #7B35D4'; activeBtn.style.fontWeight = '900'; }

    if(tab === 'assets') renderAssetsView();
    if(tab === 'vault') renderVaultView();
    if(tab === 'shop') renderEmpireHub();
    if(tab === 'sync') {
        document.getElementById('wallet-main-view').innerHTML = `
            <h2 style="font-family:'Playfair Display'; font-size:1.2rem; margin-bottom:20px;">Ledger Sync</h2>
            <div style="background:#000; border:1px solid rgba(255,255,255,0.1); border-radius:15px; padding:25px; text-align:center;">
                <p style="font-size:0.8rem; margin-bottom:30px;">Connect your Hardware Wallet for 100% sovereign security.</p>
                <button class="btn btn-outline" style="width:100%; margin-bottom:10px; justify-content:center;">LEDGER NANO S/X</button>
                <button class="btn btn-outline" style="width:100%; justify-content:center;">TREZOR MODEL T</button>
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
