/* Sovereign Wallet Core v5.5.0 [Absolute Integrity & Private Layer] */

// Persistent State
let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [
    { name: 'Mother Node', handle: '$prisca.prn', address: 'addr1q8...prisca', balance: 2540.00 },
    { name: 'Business Node', handle: '$priscion.prn', address: 'addr1q9...priscion', balance: 15000.00 }
];

let currentWalletIndex = 0;
let developerMode = localStorage.getItem('prn_dev_mode') === 'true';
let privacyShield = localStorage.getItem('prn_privacy_shield') === 'true';

const ASSETS_DATA = [
    { id: 'prn', name: 'PRISCION ($PRN)', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png' },
    { id: 'nrl', name: 'NEURAL ($NRL)', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/nrl_coin.png' },
    { id: 'atlr', name: 'ATELIA ($ATLR)', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/atlr_coin.png' },
    { id: 'musd', name: 'MUSTARD ($MUSD)', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/musd_coin.png' },
    { id: 'jello', name: 'JELLO ($JELLO)', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/jello_coin.png' }
];

function saveWallets() { localStorage.setItem('prn_wallets', JSON.stringify(WALLETS)); }

function earnPRN(amount, reason) {
    WALLETS[currentWalletIndex].balance += amount;
    saveWallets();
    const toast = document.createElement('div');
    toast.style = "position:fixed; bottom:100px; left:50%; transform:translateX(-50%); background:#00FF88; color:black; padding:10px 20px; border-radius:100px; font-weight:900; font-size:0.7rem; z-index:10000; box-shadow:0 0 20px rgba(0,255,136,0.3);";
    toast.innerText = `+${amount} PRN EARNED: ${reason}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    const balanceEl = document.getElementById('top-prn-balance');
    if(balanceEl) balanceEl.innerText = WALLETS[currentWalletIndex].balance.toLocaleString();
}

function initializeWallet(containerId) {
    const sidebar = document.getElementById(containerId);
    if(!sidebar) return;
    if(!sessionStorage.getItem('prn_sess')) sessionStorage.setItem('prn_sess', 'true');
    if(!localStorage.getItem('priscion_pin')) localStorage.setItem('priscion_pin', 'true');
    renderWalletMain(sidebar);
}

function switchWalletTabCore(tab) {
    const view = document.getElementById('wallet-main-view');
    if(!view) return;
    
    // UI Feedback for Tabs
    const tabs = ['tab-assets', 'tab-vault', 'tab-shop', 'tab-sync'];
    tabs.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.color = '#444';
    });
    const activeTab = document.getElementById('tab-' + tab);
    if(activeTab) activeTab.style.color = '#7B35D4';

    if(tab === 'assets') {
        renderAssetsView();
    } else if(tab === 'vault') {
        renderVaultView();
    } else if(tab === 'shop') {
        renderHubView();
    } else if(tab === 'sync') {
        renderSecurityView();
    }
}

function renderWalletMain(sidebar) {
    if(!document.getElementById('wallet-main-view')) {
        sidebar.innerHTML += '<div id="wallet-main-view"></div>';
    }
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    const pfp = localStorage.getItem('user_pfp') || 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/priscion_primary_small.jpg';
    const wallet = WALLETS[currentWalletIndex];
    
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:30px;">
                <div style="display:flex; align-items:center; gap:15px; cursor:pointer;" onclick="renderMultiWalletView()">
                    <div style="width:55px; height:55px; border-radius:50%; border:2px solid #7B35D4; overflow:hidden; background:#000;">
                        <img src="${pfp}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div>
                        <div style="font-weight:900; font-size:1.1rem; color:white; letter-spacing:0.5px;">${wallet.handle}</div>
                        <div style="font-size:0.5rem; color:#7B35D4; text-transform:uppercase; font-weight:800;">${wallet.name}</div>
                    </div>
                </div>
                <div onclick="window.open('/mint-live.html')" style="cursor:pointer; background:#111; padding:8px; border-radius:10px; border:1px solid #222;" title="Live Mint View">
                    📊
                </div>
            </div>
            
            <div style="background:linear-gradient(135deg, #7B35D4 0%, #4c1d95 100%); padding:25px; border-radius:24px; color:white; margin-bottom:25px; box-shadow:0 10px 30px rgba(123,53,212,0.3);">
                <div style="font-size:0.6rem; text-transform:uppercase; opacity:0.7; margin-bottom:8px; font-weight:700;">Wallet Net Worth</div>
                <div style="font-size:2.2rem; font-weight:900; margin-bottom:20px;">$${wallet.balance.toLocaleString()}</div>
                <div style="display:flex; gap:8px;">
                    <button class="btn-action" onclick="renderSendView()">SEND</button>
                    <button class="btn-action" onclick="renderReceiveView()">RECEIVE</button>
                    <button class="btn-action" onclick="renderSwapView()">SWAP</button>
                    <button class="btn-action" onclick="renderBuyView()">BUY</button>
                    <button class="btn-action" onclick="renderStakingView()">STAKE</button>
                </div>
            </div>

            <div id="asset-list-container"></div>
        </div>
    `;
    
    const assets = [
        { ...ASSETS_DATA[0], balance: wallet.balance, usd: wallet.balance },
        { ...ASSETS_DATA[1], balance: 0.00, usd: 0.00 },
        { ...ASSETS_DATA[2], balance: 0.00, usd: 0.00 },
        { ...ASSETS_DATA[3], balance: 0.00, usd: 0.00 }
    ];

    document.getElementById('asset-list-container').innerHTML = assets.map(a => `
        <div style="background:#111; border:1px solid rgba(255,255,255,0.03); border-radius:18px; padding:18px; display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <img src="${a.logo}" style="width:32px; height:32px; border-radius:50%;">
                <div>
                    <div style="font-weight:800; font-size:0.75rem; color:white;">${a.name}</div>
                    <div style="font-size:0.55rem; color:#666;">${a.balance.toLocaleString()}</div>
                </div>
            </div>
            <div style="text-align:right;">
                <div style="font-weight:900; font-size:0.8rem; color:white;">$${a.usd.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = '<div style="padding:40px; color:#444; font-size:0.65rem; text-align:center;">VAULT SYNCHRONIZING...</div>';
    fetch('/vault_manifest.json').then(r => r.json()).then(data => {
        view.innerHTML = `
            <div style="padding:20px;">
                <h2 style="color:white; font-size:1.2rem; margin-bottom:20px; font-family:'Playfair Display';">Sovereign Vault</h2>
                ${data.map(i => `
                    <div onclick="window.open('${i.url}')" style="background:#080808; padding:18px; border-radius:15px; margin-bottom:12px; border:1px solid #222; cursor:pointer; transition:0.3s;">
                        <div style="display:flex; justify-content:space-between; align-items:start;">
                            <div>
                                <div style="color:white; font-weight:800; font-size:0.75rem;">${i.name}</div>
                                <div style="color:#666; font-size:0.5rem; margin-top:4px;">${i.category} • ${i.type}</div>
                            </div>
                            <div style="color:#00FF88; font-size:0.45rem; font-weight:900; text-transform:uppercase; background:rgba(0,255,136,0.1); padding:4px 8px; border-radius:4px;">${i.ledger_status}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    });
}

function renderHubView() {
    const view = document.getElementById('wallet-main-view');
    const brands = [
        { name: "Dreaming Anime", url: "/dreaminganime/", desc: "Media & Cinema Node" },
        { name: "Atelia Gaming", url: "/ateliagaming/", desc: "Gaming Lab Node" },
        { name: "Nurasen", url: "/nurasen/", desc: "Cybersecurity Node" },
        { name: "Calalloo", url: "/calalloo/", desc: "Heritage Node" },
        { name: "The Way Made Known", url: "/thewaymadeknown/", desc: "Mission Backbone" }
    ];
    view.innerHTML = `
        <div style="padding:20px;">
            <h2 style="color:white; font-size:1.2rem; margin-bottom:20px; font-family:'Playfair Display';">Empire Hub</h2>
            ${brands.map(b => `
                <div onclick="window.open('${b.url}')" style="background:#080808; padding:18px; border-radius:15px; margin-bottom:12px; border:1px solid #222; cursor:pointer;">
                    <div style="color:white; font-weight:800; font-size:0.75rem;">${b.name}</div>
                    <div style="color:#666; font-size:0.55rem; margin-top:4px;">${b.desc}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderSecurityView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <h2 style="color:white; font-size:1.2rem; margin-bottom:20px; font-family:'Playfair Display';">Security & Privacy</h2>
            <div class="settings-item">
                <div>
                    <div style="color:white; font-weight:800; font-size:0.75rem;">Neural Shield</div>
                    <div style="color:#666; font-size:0.55rem;">Advanced AI Threat Protection</div>
                </div>
                <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
            </div>
            <div class="settings-item">
                <div>
                    <div style="color:white; font-weight:800; font-size:0.75rem;">Private Layer</div>
                    <div style="color:#666; font-size:0.55rem;">$JELLO Privacy Protocol</div>
                </div>
                <label class="switch"><input type="checkbox" onchange="togglePrivacy()" ${privacyShield ? 'checked' : ''}><span class="slider"></span></label>
            </div>
            <div class="settings-item">
                <div>
                    <div style="color:white; font-weight:800; font-size:0.75rem;">Hardware Bridge</div>
                    <div style="color:#666; font-size:0.55rem;">Anchored to Sovereign Hardware</div>
                </div>
                <div id="ledger-status" onclick="bridgeLedger()" style="color:#00ff88; font-size:0.5rem; font-weight:900; cursor:pointer;">ANCHORED</div>
            </div>
        </div>
    `;
}

function togglePrivacy() { 
    privacyShield = !privacyShield; 
    localStorage.setItem('prn_privacy_shield', privacyShield); 
    alert("Midnight Private Layer Active."); 
}

function bridgeLedger() {
    const btn = document.getElementById('ledger-status');
    btn.innerText = "CONNECTING...";
    setTimeout(() => { btn.innerText = "ANCHORED"; btn.style.color = "#00ff88"; alert("Sovereign Hardware Bridge Active."); }, 2000);
}

// Wallet Connect Protocol
function requestWalletConnection(b) {
    const sb = document.getElementById('sidebar'); if (!sb) return;
    sb.classList.add('active');
    renderWalletMain(sb);
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = '<div style="padding:20px;text-align:center;background:#050505;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;"><img src="../assets/p-logo.png" style="width:80px;margin-bottom:20px;"><div style="color:white;font-weight:900;">Connect to '+b+'?</div><button onclick=\'localStorage.setItem("conn_"+ "'+b.toLowerCase()+'", "true");location.reload();\' style="width:100%;padding:15px;background:#7B35D4;color:white;border-radius:12px;margin-top:20px;cursor:pointer;border:none;font-weight:900;">APPROVE</button></div>';
}

window.addEventListener('load', () => {
    const p = window.location.pathname;
    let b = p.includes('/nurasen/') ? "Nurasen" : p.includes('/ateliagaming/') ? "Atelia" : "";
    if(b && !localStorage.getItem('conn_' + b.toLowerCase())) {
        const overlay = document.createElement('div');
        overlay.style = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:9999;display:flex;flex-direction:column;justify-content:center;align-items:center;color:white;font-family:sans-serif;';
        overlay.innerHTML = '<img src="../assets/p-logo.png" style="width:60px;margin-bottom:20px;"><div>AWAITING WALLET HANDSHAKE</div><button onclick="requestWalletConnection(\''+b+'\')" style="margin-top:20px;background:#7B35D4;color:white;padding:10px 20px;border-radius:8px;cursor:pointer;border:none;font-weight:900;">LINK WALLET</button>';
        document.body.appendChild(overlay);
    }
});

// Global Styles Injection
const style = document.createElement('style');
style.textContent = `
    .btn-action { flex:1; background:rgba(255,255,255,0.1); border:none; color:white; padding:12px; border-radius:12px; font-size:0.5rem; font-weight:800; cursor:pointer; transition:0.2s; }
    .btn-action:hover { background:rgba(255,255,255,0.2); }
    .settings-item { padding:20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #222; }
    .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #333; transition: .4s; border-radius: 20px; }
    .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: #7B35D4; }
    input:checked + .slider:before { transform: translateX(20px); }
`;
document.head.appendChild(style);
