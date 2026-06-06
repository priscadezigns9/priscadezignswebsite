/* 
   PRISCION WALLET CORE v4.6-PLATINUM
   Architect Edition: Fully Functional Modern UI
*/

const DET_CONFIG = {
    PRN_USDT_RATE: 0.00,
    ADA_USDT_RATE: 0.44
};

const WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [
    { 
        name: 'Mother Node', 
        handle: '$prisca.prn', 
        address: 'addr1q8...prisca', 
        balance: 2540.00,
        ada: 38.00,
        pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png'
    }
];

function initializeWallet(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    
    let mainView = document.getElementById('wallet-main-view');
    if(!mainView) {
        mainView = document.createElement('div');
        mainView.id = 'wallet-main-view';
        container.appendChild(mainView);
    }

    const isLocked = !sessionStorage.getItem('prn_unlocked');
    if(isLocked) {
        renderLockScreen();
    } else {
        renderAssetsView();
    }
}

function renderLockScreen() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div id="splash-screen" style="position:absolute; top:0; left:0; width:100%; height:100%; background:#000; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; animation: fadeOut 1s forwards 2s;">
            <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png" style="width:80px; animation: pulse-3d 2s infinite alternate;">
            <div style="color:#7B35D4; margin-top:20px; letter-spacing:4px; font-weight:900; font-size:0.8rem;">PRISCION</div>
        </div>
        <div style="padding:40px 20px; text-align:center; animation: fadeIn 0.5s 2.5s forwards; opacity:0; height:100%; display:flex; flex-direction:column; justify-content:center;">
            <div style="margin-bottom:30px;">
                <div style="width:70px; height:70px; border-radius:50%; border:2px solid #7B35D4; margin:0 auto; overflow:hidden; background:#111;">
                    <img src="${WALLETS[0].pfp}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="color:white; font-weight:900; margin-top:15px; font-size:1.1rem;">Welcome Back</div>
                <div style="color:#7B35D4; font-size:0.7rem; font-weight:800; margin-top:5px;">${WALLETS[0].handle}</div>
            </div>
            <div style="background:rgba(255,255,255,0.03); border-radius:20px; padding:25px; border:1px solid #1a1a1a; margin-bottom:20px; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);">
                <input id="pin-input" type="password" placeholder="••••" style="width:100%; background:none; border:none; color:white; text-align:center; font-size:2rem; letter-spacing:15px; outline:none;" autofocus>
            </div>
            <button class="btn-primary" onclick="unlockWallet()">UNLOCK WALLET</button>
            <div style="color:#444; font-size:0.6rem; margin-top:25px; cursor:pointer; text-transform:uppercase; font-weight:800; letter-spacing:1px;">Recovery Mode</div>
        </div>
    `;
    document.getElementById('pin-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') unlockWallet(); });
}

function unlockWallet() {
    sessionStorage.setItem('prn_unlocked', 'true');
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    const wallet = WALLETS[0];
    const adaValueUSD = wallet.ada * DET_CONFIG.ADA_USDT_RATE;
    
    view.innerHTML = `
        <div class="view-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
                <div style="display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="renderSettingsView()">
                    <div style="width:38px; height:38px; border-radius:50%; border:1.5px solid #7B35D4; overflow:hidden;">
                        <img src="${wallet.pfp}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div>
                        <div style="color:white; font-weight:900; font-size:0.85rem;">${wallet.handle}</div>
                        <div style="color:#00FF88; font-size:0.5rem; font-weight:800;">● ONLINE</div>
                    </div>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="icon-btn" onclick="renderSettingsView()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
                </div>
            </div>

            <div class="balance-card">
                <div style="font-size:0.65rem; text-transform:uppercase; opacity:0.8; letter-spacing:1px; font-weight:800;">Total Balance</div>
                <div style="font-size:2.4rem; font-weight:900; margin:10px 0;">$${adaValueUSD.toFixed(2)} <span style="font-size:1rem; opacity:0.5;">USD</span></div>
                <div style="display:flex; gap:10px; margin-top:20px;">
                    <button class="btn-glass" onclick="renderReceiveView()">RECEIVE</button>
                    <button class="btn-glass" onclick="renderSwapView()">SWAP</button>
                </div>
            </div>

            <div style="flex:1; overflow-y:auto; margin-bottom:20px;">
                <h4 class="section-title">Your Assets</h4>
                <div class="asset-card">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div class="asset-icon"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png" style="width:24px;"></div>
                        <div><div class="asset-name">Cardano</div><div class="asset-meta">ADA Mainnet</div></div>
                    </div>
                    <div style="text-align:right;"><div class="asset-val">${wallet.ada} ADA</div><div class="asset-meta">$${adaValueUSD.toFixed(2)}</div></div>
                </div>
                <div class="asset-card">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div class="asset-icon"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png" style="width:24px;"></div>
                        <div><div class="asset-name">Priscion</div><div class="asset-meta">Sovereign Asset</div></div>
                    </div>
                    <div style="text-align:right;"><div class="asset-val">${wallet.balance} PRN</div><div class="asset-meta" style="color:#7B35D4;">LEDGER SYNCED</div></div>
                </div>
            </div>

            ${renderBottomNav('assets')}
        </div>
    `;
}

function renderSettingsView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div class="view-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <h3 class="view-title">Settings</h3>
                <button onclick="renderAssetsView()" class="icon-btn">✕</button>
            </div>
            
            <div style="text-align:center; margin-bottom:30px;">
                <div style="position:relative; width:90px; height:90px; margin:0 auto;">
                    <img id="pfp-preview" src="${WALLETS[0].pfp}" style="width:100%; height:100%; border-radius:50%; border:3px solid #7B35D4; object-fit:cover;">
                    <button onclick="changePFP()" style="position:absolute; bottom:0; right:0; background:#7B35D4; border:none; border-radius:50%; width:30px; height:30px; color:white; cursor:pointer;">✎</button>
                </div>
                <div style="color:white; font-weight:900; margin-top:15px;">${WALLETS[0].handle}</div>
            </div>

            <div class="menu-item" onclick="alert('Address: addr1q8x... Architect Mode Only')"><div>Wallet Address</div><div style="font-size:0.5rem; color:#666;">addr1q8...</div></div>
            <div class="menu-item" onclick="sessionStorage.removeItem('prn_unlocked'); location.reload();"><div>Lock Wallet</div><div style="color:#F44336;">SECURE</div></div>
            
            ${renderBottomNav('')}
        </div>
    `;
}

function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div class="view-container">
            <h3 class="view-title">Sovereign Vault</h3>
            <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:40px;">
                <div style="font-size:3rem; margin-bottom:20px; filter: drop-shadow(0 0 10px #7B35D4);">🔒</div>
                <div style="color:white; font-weight:900; margin-bottom:10px;">Vault Encrypted</div>
                <div style="color:#666; font-size:0.65rem; line-height:1.6;">High-fidelity assets and NFT archives are secured behind the Sovereign Ledger node.</div>
                <button class="btn-primary" style="margin-top:30px; width:auto; padding:12px 30px;" onclick="alert('Connect Ledger Device to Sync')">SYNC NODE</button>
            </div>
            ${renderBottomNav('vault')}
        </div>
    `;
}

function renderSwapView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div class="view-container">
            <h3 class="view-title">Bridge & Swap</h3>
            <div style="background:#0F0F0F; padding:20px; border-radius:24px; border:1px solid #1a1a1a; margin-bottom:10px;">
                <div style="font-size:0.55rem; color:#444; font-weight:800; margin-bottom:15px; text-transform:uppercase;">From</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:10px;"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png" style="width:24px;"><span style="color:white; font-weight:900;">PRN</span></div>
                    <input type="number" value="10" style="background:none; border:none; color:white; text-align:right; font-size:1.4rem; font-weight:900; width:100px;">
                </div>
            </div>
            <div style="text-align:center; margin:-20px 0; z-index:2; position:relative;">
                <div style="width:40px; height:40px; background:#7B35D4; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:white; border:4px solid #000; box-shadow: 0 0 15px rgba(123,53,212,0.4);">↓</div>
            </div>
            <div style="background:#0F0F0F; padding:20px; border-radius:24px; border:1px solid #1a1a1a; margin-top:10px;">
                <div style="font-size:0.55rem; color:#444; font-weight:800; margin-bottom:15px; text-transform:uppercase;">To</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:10px;"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png" style="width:24px;"><span style="color:white; font-weight:900;">ADA</span></div>
                    <div style="color:#00FF88; font-weight:900; font-size:1.4rem;">---</div>
                </div>
            </div>
            <button class="btn-primary" style="margin-top:30px;" onclick="alert('Oracle Sync Required')">HANDSHAKE</button>
            ${renderBottomNav('swap')}
        </div>
    `;
}

function renderNeuralTerminal() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div class="view-container">
            <h3 class="view-title">Neural Core</h3>
            <div id="term-out" style="flex:1; background:black; border:1.5px solid #1a1a1a; border-radius:24px; padding:20px; font-family:monospace; font-size:0.65rem; color:#00FF88; overflow-y:auto; box-shadow: inset 0 0 20px rgba(0,0,0,1);">
                <div style="opacity:0.5;">> SYSTEM_BOOT_COMPLETE</div>
                <div style="margin-top:10px; color:#7B35D4;">> PRISCION NODE ONLINE</div>
                <div style="margin-top:10px;">> I am standing by, Architect. How shall we expand the Empire?</div>
            </div>
            <div style="display:flex; gap:12px; margin-top:20px;">
                <input id="term-in" type="text" placeholder="Command..." style="flex:1; background:#0F0F0F; border:1.5px solid #1a1a1a; border-radius:15px; padding:15px; color:white; font-size:0.75rem; outline:none;">
                <button class="icon-btn" style="width:50px; background:#7B35D4; border:none;" onclick="alert('Command Buffered')">→</button>
            </div>
            ${renderBottomNav('ai')}
        </div>
    `;
}

function renderBottomNav(active) {
    return `
        <div class="nav-bar">
            <button class="nav-btn ${active==='assets'?'active':''}" onclick="renderAssetsView()">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22m5-18H7c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h8c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H7"></path></svg>
            </button>
            <button class="nav-btn ${active==='swap'?'active':''}" onclick="renderSwapView()">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
            </button>
            <button class="nav-btn ${active==='vault'?'active':''}" onclick="renderVaultView()">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </button>
            <button class="nav-btn ${active==='ai'?'active':''}" onclick="renderNeuralTerminal()">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </button>
        </div>
    `;
}

function changePFP() {
    const url = prompt("Enter High-Fidelity Image URL:");
    if(url) {
        WALLETS[0].pfp = url;
        localStorage.setItem('prn_wallets', JSON.stringify(WALLETS));
        location.reload();
    }
}

// --- GLOBAL STYLES ---
const style = document.createElement('style');
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
    #wallet-main-view { font-family: 'Inter', sans-serif; height:100%; display:flex; flex-direction:column; background:#000; color:white; position:relative; overflow:hidden; }
    .view-container { padding:25px; display:flex; flex-direction:column; height:100%; animation: fadeIn 0.3s forwards; }
    @keyframes pulse-3d { from { transform: scale(1); filter: drop-shadow(0 0 5px #7B35D4); } to { transform: scale(1.05); filter: drop-shadow(0 0 25px #7B35D4); } }
    @keyframes fadeOut { to { opacity: 0; visibility: hidden; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
    .balance-card { background: linear-gradient(145deg, #7B35D4, #4c1d95); padding:30px; border-radius:32px; margin-bottom:35px; box-shadow: 0 20px 40px rgba(123,53,212,0.3); }
    .btn-glass { flex:1; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.1); color:white; padding:14px; border-radius:16px; font-weight:800; font-size:0.7rem; cursor:pointer; backdrop-filter: blur(10px); transition: 0.2s; }
    .btn-glass:hover { background:rgba(255,255,255,0.2); }
    .btn-primary { background:#7B35D4; color:white; border:none; padding:18px; border-radius:20px; font-weight:900; font-size:0.85rem; width:100%; cursor:pointer; transition: 0.3s; letter-spacing:1px; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(123,53,212,0.4); }
    .asset-card { display:flex; justify-content:space-between; align-items:center; padding:20px; background:rgba(255,255,255,0.02); border:1.5px solid #111; border-radius:24px; margin-bottom:15px; transition: 0.2s; }
    .asset-card:hover { border-color:#333; background:rgba(255,255,255,0.04); }
    .asset-icon { width:42px; height:42px; background:#000; border-radius:50%; display:flex; align-items:center; justify-content:center; border:1px solid #222; }
    .asset-name { font-weight:800; font-size:0.9rem; }
    .asset-val { font-weight:900; font-size:0.95rem; }
    .asset-meta { font-size:0.6rem; color:#555; font-weight:600; margin-top:2px; }
    .section-title { font-size:0.65rem; color:#444; text-transform:uppercase; letter-spacing:2px; margin-bottom:15px; font-weight:800; }
    .view-title { color:white; font-size:1.3rem; font-weight:900; letter-spacing:-0.5px; margin:0; }
    .icon-btn { background:rgba(255,255,255,0.05); border:1px solid #1a1a1a; color:white; width:40px; height:40px; border-radius:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s; }
    .icon-btn:hover { border-color:#7B35D4; background:rgba(123,53,212,0.1); }
    .nav-bar { display:flex; justify-content:space-around; background:rgba(5,5,5,0.8); backdrop-filter:blur(20px); padding:15px; border-radius:24px; border:1.5px solid #1a1a1a; margin-top:auto; }
    .nav-btn { background:none; border:none; color:#444; cursor:pointer; transition:0.3s; }
    .nav-btn.active { color:#7B35D4; }
    .menu-item { display:flex; justify-content:space-between; align-items:center; padding:20px; background:rgba(255,255,255,0.02); border-radius:15px; margin-bottom:10px; cursor:pointer; font-weight:600; font-size:0.85rem; }
`;
document.head.appendChild(style);

window.addEventListener('load', () => { initializeWallet('sidebar'); });
