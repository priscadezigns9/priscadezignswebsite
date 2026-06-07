
/* PRISCION WALLET CORE v5.4.0-HYBRID-STABLE */
const DET_CONFIG = { ADA_USDT: 0.44, PRN_ADA: 5.8 };
const ASSETS = [
    { id: 'prn', name: 'PRISCION', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png', balance: 2540.00 },
    { id: 'ada', name: 'CARDANO', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38.00 },
    { id: 'nrl', name: 'NEURAL', symbol: 'NRL', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/neural_coin_hf.png', balance: 0.00 },
    { id: 'atlr', name: 'ATELIA', symbol: 'ATLR', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/atlr_coin.png', balance: 0.00 },
    { id: 'jlo', name: 'JELLO', symbol: 'JLO', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/jlo_coin.png', balance: 0.00 },
    { id: 'musd', name: 'MUSTARD', symbol: 'MUSD', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/musd_coin.png', balance: 0.00 }
];
let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [
    { name: 'Architect', handle: '.pri', pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png' }
];
function initializeWallet(c) {
    const d = document.getElementById(c); if(!d) return;
    d.innerHTML = '<div id="wallet-main-view" style="height:100%;background:#000;"></div>';
    if(!sessionStorage.getItem('prn_unlocked')) renderLockScreen(); else renderAssetsView();
}
function renderLockScreen() {
    const v = document.getElementById('wallet-main-view');
    v.innerHTML = '<div style="padding:40px 20px;text-align:center;color:white;font-family:sans-serif;"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png" style="width:80px;margin-bottom:30px;"><h2>Unlock Node</h2><div style="background:#111;padding:20px;border-radius:20px;margin-bottom:20px;"><input id="pin-input" type="password" placeholder="••••" style="width:100%;background:none;border:none;color:white;text-align:center;font-size:2rem;outline:none;"></div><button class="huge-btn" style="background:#7B35D4;color:white;padding:15px;width:100%;border-radius:15px;border:none;font-weight:900;" onclick="unlockWallet()">UNLOCK</button></div>';
}
function unlockWallet() { sessionStorage.setItem('prn_unlocked', 'true'); renderAssetsView(); }
function renderAssetsView() {
    const v = document.getElementById('wallet-main-view');
    const u = ASSETS[1].balance * DET_CONFIG.ADA_USDT;
    v.innerHTML = '<div class="view-container"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;"><div style="display:flex;align-items:center;gap:12px;" onclick="renderSettingsView()"><img src="'+WALLETS[0].pfp+'" style="width:35px;height:36px;border-radius:50%;border:1.5px solid #7B35D4;"><div style="color:white;font-weight:800;font-size:0.8rem;">'+WALLETS[0].handle+'</div></div><button onclick="toggleSidebar()" style="background:none;border:none;color:#555;font-size:1.5rem;cursor:pointer;">&times;</button></div><div class="balance-card"><div style="font-size:0.6rem;opacity:0.6;">Portfolio Value</div><div style="font-size:2.5rem;font-weight:900;">$'+u.toFixed(2)+'</div><div style="display:flex;gap:10px;margin-top:20px;"><button class="btn-glass" onclick="renderSendView()">SEND</button><button class="btn-glass" onclick="renderReceiveView()">RECEIVE</button><button class="btn-glass" onclick="renderSwapView()">SWAP</button></div></div><div style="flex:1;overflow-y:auto;">' + ASSETS.map(a => '<div class="asset-card"><div style="display:flex;align-items:center;gap:12px;"><div class="asset-icon"><img src="'+a.logo+'" style="width:24px;"></div><div><div class="asset-name">'+a.symbol+'</div><div class="asset-meta">'+a.name+'</div></div></div><div style="text-align:right;"><div class="asset-val">'+a.balance+'</div></div></div>').join('') + '</div>'+renderBottomNav('assets')+'</div>';
}
function renderSendView() { document.getElementById('wallet-main-view').innerHTML = '<div class="view-container"><h3>Send</h3><button onclick="renderAssetsView()">BACK</button></div>'; }
function renderReceiveView() { document.getElementById('wallet-main-view').innerHTML = '<div class="view-container"><h3>Receive</h3><button onclick="renderAssetsView()">BACK</button></div>'; }
function renderSwapView() { document.getElementById('wallet-main-view').innerHTML = '<div class="view-container"><h3>Swap</h3><button onclick="renderAssetsView()">BACK</button></div>'; }
function renderStakeView() { document.getElementById('wallet-main-view').innerHTML = '<div class="view-container"><h3>Stake</h3><button onclick="renderAssetsView()">BACK</button></div>'; }
function renderHubView() { document.getElementById('wallet-main-view').innerHTML = '<div class="view-container"><h3>Hub</h3><button onclick="renderAssetsView()">BACK</button></div>'; }
function renderVaultView() { document.getElementById('wallet-main-view').innerHTML = '<div class="view-container"><h3>Vault</h3><button onclick="renderAssetsView()">BACK</button></div>'; }
function renderSettingsView() { document.getElementById('wallet-main-view').innerHTML = '<div class="view-container"><h3>Settings</h3><button onclick="renderAssetsView()">BACK</button></div>'; }
function renderBottomNav(a) { return '<div class="huge-nav"><button onclick="renderAssetsView()">💰</button><button onclick="renderStakeView()">🥩</button><button onclick="renderHubView()">🏛️</button><button onclick="renderVaultView()">🔒</button></div>'; }
function toggleSidebar() { const s = document.getElementById("sidebar"); s.classList.toggle("active"); if(s.classList.contains("active")) initializeWallet("sidebar"); }
function navigateToSovereignNode(h) { window.location.href = "/" + h.replace("$","").replace(".pri","") + "/"; }
const style = document.createElement('style');
style.textContent = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap'); #wallet-main-view { font-family: 'Inter', sans-serif; background:#000; height:100%; color:white; overflow:hidden; } .view-container { padding:30px; display:flex; flex-direction:column; height:100%; box-sizing:border-box; } .balance-card { background: linear-gradient(145deg, #7B35D4, #4c1d95); padding:25px; border-radius:32px; margin-bottom:30px; } .btn-glass { flex:1; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.05); color:white; padding:12px; border-radius:16px; font-weight:800; font-size:0.6rem; cursor:pointer; } .asset-card { display:flex; justify-content:space-between; align-items:center; padding:18px; background:#0A0A0A; border:1px solid #1a1a1a; border-radius:24px; margin-bottom:12px; } .asset-icon { width:40px; height:40px; background:#000; border-radius:50%; display:flex; align-items:center; justify-content:center; border:1px solid #222; } .huge-nav { display:flex; justify-content:space-around; background:#0F0F0F; padding:18px; border-radius:28px; border:1px solid #1a1a1a; margin-top:auto; } .huge-nav button { background:none; border:none; color:#333; font-size:1.5rem; cursor:pointer; }";
document.head.appendChild(style);
window.addEventListener('load', () => { if(document.getElementById('sidebar')) initializeWallet('sidebar'); });
