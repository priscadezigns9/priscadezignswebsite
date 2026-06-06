/* 
   PRISCION WALLET CORE v4.7-TITANIUM
   Universal Handshake & Financial Sovereign Core
*/

const WALLET_VERSION = "4.7.2";
const DET_CONFIG = {
    ADA_USDT: 0.44,
    PRN_ADA: 5.8, // INTERNAL_ORACLE
    TTD_RATE: 6.75
};

const ASSETS = [
    { id: 'prn', name: 'PRISCION ($PRN)', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png', balance: 2540.00 },
    { id: 'ada', name: 'CARDANO ($ADA)', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38.00 },
    { id: 'nrl', name: 'NEURAL ($NRL)', symbol: 'NRL', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/neural_coin_hf.png', balance: 0.00 },
    { id: 'atlr', name: 'ATELIA ($ATLR)', symbol: 'ATLR', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/atlr_coin.png', balance: 0.00 },
    { id: 'musd', name: 'MUSTARD ($MUSD)', symbol: 'MUSD', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/musd_coin.png', balance: 0.00 },
    { id: 'gl', name: 'JELLO ($GL)', symbol: 'GL', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/jello_coin.png', balance: 0.00 }
];

let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [
    { name: 'Mother Node', handle: '$prisca.prn', pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png' }
];

function initializeWallet(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    if(!document.getElementById('wallet-main-view')) {
        container.innerHTML = '<div id="wallet-main-view"></div>';
    }
    
    // Check DApp Connection
    const appName = window.location.pathname.split('/')[1] || "Priscion Hub";
    if(!sessionStorage.getItem('conn_' + appName)) {
        renderConnectPopup(appName);
    } else {
        const isLocked = !sessionStorage.getItem('prn_unlocked');
        if(isLocked) renderLockScreen();
        else renderAssetsView();
    }
}

function renderConnectPopup(appName) {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:40px 20px; text-align:center; display:flex; flex-direction:column; justify-content:center; height:100%;">
            <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png" style="width:60px; margin:0 auto 20px;">
            <h2 style="color:white; font-size:1.2rem; margin-bottom:10px;">Connect to Node</h2>
            <p style="color:#666; font-size:0.7rem; line-height:1.5; margin-bottom:30px;"><b>${appName.toUpperCase()}</b> is requesting access to your Sovereign Identity and Assets.</p>
            <button class="btn-primary" onclick="confirmConnect('${appName}')">CONNECT WALLET</button>
            <button style="background:none; border:none; color:#444; margin-top:20px; cursor:pointer; font-size:0.6rem;" onclick="location.href='/'">CANCEL</button>
        </div>
    `;
}

function confirmConnect(app) {
    sessionStorage.setItem('conn_' + app, 'true');
    renderLockScreen();
}

function renderLockScreen() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:#000; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:10; animation: fadeOut 1s forwards 1.5s;">
            <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png" style="width:80px; animation: pulse-3d 2s infinite alternate;">
            <div style="color:#7B35D4; margin-top:20px; letter-spacing:4px; font-weight:900; font-size:0.8rem;">PRISCION</div>
        </div>
        <div style="padding:40px 20px; text-align:center; height:100%; display:flex; flex-direction:column; justify-content:center;">
            <div style="margin-bottom:40px;">
                <img src="${WALLETS[0].pfp}" style="width:70px; height:70px; border-radius:50%; border:2px solid #7B35D4; object-fit:cover;">
                <h3 style="color:white; margin-top:15px;">Unlock Node</h3>
            </div>
            <div style="background:#111; border:1px solid #222; padding:20px; border-radius:20px; margin-bottom:20px;">
                <input id="pin-input" type="password" placeholder="••••" style="width:100%; background:none; border:none; color:white; text-align:center; font-size:2.2rem; letter-spacing:10px; outline:none;">
            </div>
            <button class="btn-primary" onclick="unlockWallet()">UNLOCK</button>
        </div>
    `;
}

function unlockWallet() {
    sessionStorage.setItem('prn_unlocked', 'true');
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    const totalUSD = ASSETS[1].balance * DET_CONFIG.ADA_USDT;
    
    view.innerHTML = `
        <div class="view-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <div style="display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="renderSettingsView()">
                    <img src="${WALLETS[0].pfp}" style="width:36px; height:36px; border-radius:50%; border:1px solid #7B35D4;">
                    <div style="color:white; font-weight:800; font-size:0.8rem;">${WALLETS[0].handle}</div>
                </div>
                <div style="background:rgba(123,53,212,0.1); color:#7B35D4; padding:5px 12px; border-radius:100px; font-size:0.5rem; font-weight:900;">MAINNET</div>
            </div>

            <div class="balance-card">
                <div style="font-size:0.6rem; text-transform:uppercase; opacity:0.6; font-weight:800;">Portfolio Value</div>
                <div style="font-size:2.5rem; font-weight:900; margin:10px 0;">$${totalUSD.toFixed(2)} <span style="font-size:0.8rem; opacity:0.5;">USD</span></div>
                <div style="display:flex; gap:10px; margin-top:20px;">
                    <button class="btn-glass" onclick="renderSendView()">SEND</button>
                    <button class="btn-glass" onclick="renderReceiveView()">RECEIVE</button>
                    <button class="btn-glass" onclick="renderSwapView()">SWAP</button>
                </div>
            </div>

            <div style="flex:1; overflow-y:auto; padding-right:5px;">
                <h4 class="section-title">High-Fidelity Assets</h4>
                ${ASSETS.map(a => `
                    <div class="asset-card">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div class="asset-icon"><img src="${a.logo}" style="width:24px;"></div>
                            <div><div class="asset-name">${a.symbol}</div><div class="asset-meta">${a.name}</div></div>
                        </div>
                        <div style="text-align:right;">
                            <div class="asset-val">${a.balance.toLocaleString()}</div>
                            <div class="asset-meta">${a.symbol==='ADA'?'$'+(a.balance*DET_CONFIG.ADA_USDT).toFixed(2):'SYNCED'}</div>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${renderBottomNav('assets')}
        </div>
    `;
}

function renderSendView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div class="view-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <h3 class="view-title">Send Assets</h3>
                <button onclick="renderAssetsView()" class="icon-btn">✕</button>
            </div>
            <div style="background:#111; border-radius:20px; padding:20px; border:1px solid #222;">
                <label style="font-size:0.55rem; color:#666; display:block; margin-bottom:10px;">RECIPIENT HANDLE OR ADDR</label>
                <input type="text" placeholder="$handle.prn or addr1..." style="width:100%; background:none; border:none; color:white; font-size:0.9rem; outline:none;">
            </div>
            <button class="btn-primary" style="margin-top:30px;">PREVIEW SEND</button>
            ${renderBottomNav('')}
        </div>
    `;
}

function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div class="view-container">
            <h3 class="view-title">Vault</h3>
            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
                <div style="font-size:3rem; margin-bottom:20px; filter:grayscale(1);">🔒</div>
                <div style="color:white; font-weight:800;">Archive Locked</div>
                <div style="font-size:0.6rem; color:#444; margin-top:10px;">Awaiting Sovereign Node Authentication.</div>
            </div>
            ${renderBottomNav('vault')}
        </div>
    `;
}

function renderHubView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div class="view-container">
            <h3 class="view-title">Empire Hub</h3>
            <div style="margin-top:20px;">
                <div class="asset-card" onclick="navigateToSovereignNode('$dreaminganime.prn')">
                    <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/dreaming_anime.png" style="width:32px; border-radius:8px; margin-right:12px;">
                    <div style="flex:1;"><div style="color:white; font-weight:800; font-size:0.8rem;">Dreaming Anime</div><div style="color:#666; font-size:0.5rem;">Cinema & Manga</div></div>
                </div>
                <div class="asset-card" onclick="navigateToSovereignNode('$nurasen.prn')">
                    <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/nurasen_icon.jpg" style="width:32px; border-radius:8px; margin-right:12px;">
                    <div style="flex:1;"><div style="color:white; font-weight:800; font-size:0.8rem;">Nurasen</div><div style="color:#666; font-size:0.5rem;">Digital Defense</div></div>
                </div>
            </div>
            ${renderBottomNav('hub')}
        </div>
    `;
}

function renderSettingsView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div class="view-container">
            <h3 class="view-title">Settings</h3>
            <div style="margin-top:30px;">
                <div class="menu-item"><div>Appearance</div><div style="color:#7B35D4; font-size:0.6rem;">DARK MODE</div></div>
                <div class="menu-item" onclick="changeName()"><div>Architect Name</div><div style="color:#666; font-size:0.6rem;">${WALLETS[0].name}</div></div>
                <div class="menu-item" onclick="changePFP()"><div>Change PFP</div><div style="color:#666; font-size:0.6rem;">EDIT</div></div>
            </div>
            ${renderBottomNav('')}
        </div>
    `;
}

function renderBottomNav(active) {
    return `
        <div class="nav-bar">
            <button class="nav-btn ${active==='assets'?'active':''}" onclick="renderAssetsView()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></button>
            <button class="nav-btn ${active==='hub'?'active':''}" onclick="renderHubView()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></button>
            <button class="nav-btn ${active==='vault'?'active':''}" onclick="renderVaultView()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></button>
            <button class="nav-btn ${active==='swap'?'active':''}" onclick="renderSwapView()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m16 3 5 5-5 5"></path><path d="m8 21-5-5 5-5"></path><path d="M21 8H9a4 4 0 0 0-4 4v1"></path><path d="M3 16h12a4 4 0 0 0 4-4v-1"></path></svg></button>
        </div>
    `;
}

function navigateToSovereignNode(handle) {
    const path = handle.replace('$', '').replace('.prn', '');
    window.location.href = '/' + path + '/';
}

function changeName() {
    const name = prompt("Enter Architect Name:");
    if(name) { WALLETS[0].name = name; localStorage.setItem('prn_wallets', JSON.stringify(WALLETS)); renderSettingsView(); }
}

function changePFP() {
    const url = prompt("Enter High-Fidelity PFP URL:");
    if(url) { WALLETS[0].pfp = url; localStorage.setItem('prn_wallets', JSON.stringify(WALLETS)); renderAssetsView(); }
}

const style = document.createElement('style');
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    #wallet-main-view { font-family: 'Inter', sans-serif; height:100%; display:flex; flex-direction:column; background:#000; color:white; position:relative; overflow:hidden; }
    .view-container { padding:25px; display:flex; flex-direction:column; height:100%; animation: fadeIn 0.3s forwards; }
    @keyframes pulse-3d { from { transform: scale(1); filter: drop-shadow(0 0 5px #7B35D4); } to { transform: scale(1.1); filter: drop-shadow(0 0 30px #7B35D4); } }
    @keyframes fadeOut { to { opacity: 0; visibility: hidden; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .balance-card { background: linear-gradient(145deg, #7B35D4, #4c1d95); padding:25px; border-radius:32px; margin-bottom:30px; box-shadow: 0 15px 40px rgba(123,53,212,0.3); }
    .btn-glass { flex:1; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.05); color:white; padding:12px; border-radius:16px; font-weight:800; font-size:0.6rem; cursor:pointer; backdrop-filter: blur(10px); transition: 0.2s; }
    .btn-primary { background:#7B35D4; color:white; border:none; padding:18px; border-radius:20px; font-weight:900; font-size:0.8rem; width:100%; cursor:pointer; transition: 0.3s; }
    .asset-card { display:flex; justify-content:space-between; align-items:center; padding:18px; background:#0A0A0A; border:1px solid #1a1a1a; border-radius:24px; margin-bottom:12px; cursor:pointer; }
    .asset-icon { width:40px; height:40px; background:#000; border-radius:50%; display:flex; align-items:center; justify-content:center; border:1px solid #222; }
    .asset-name { font-weight:800; font-size:0.8rem; }
    .asset-val { font-weight:900; font-size:0.9rem; }
    .asset-meta { font-size:0.5rem; color:#444; font-weight:700; margin-top:2px; }
    .section-title { font-size:0.6rem; color:#333; text-transform:uppercase; letter-spacing:2px; margin-bottom:15px; font-weight:800; }
    .view-title { color:white; font-size:1.2rem; font-weight:900; margin:0; }
    .nav-bar { display:flex; justify-content:space-around; background:rgba(0,0,0,0.9); backdrop-filter:blur(20px); padding:15px; border-radius:28px; border:1px solid #111; margin-top:auto; margin-bottom:10px; }
    .nav-btn { background:none; border:none; color:#333; cursor:pointer; transition:0.3s; }
    .nav-btn.active { color:#7B35D4; }
    .menu-item { display:flex; justify-content:space-between; align-items:center; padding:20px; background:#0A0A0A; border-radius:18px; margin-bottom:10px; border:1px solid #1a1a1a; cursor:pointer; font-weight:700; font-size:0.8rem; }
`;
document.head.appendChild(style);

window.addEventListener('load', () => { initializeWallet('sidebar'); });
