const DET_CONFIG = { ADA_USDT: 0.44, PRN_ADA: 5.8 };
const ASSETS = [
    { id: 'prn', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png', balance: 2540.00 },
    { id: 'ada', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38.00 },
    { id: 'nrl', symbol: 'NRL', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/neural_coin_hf.png', balance: 0.00 },
    { id: 'musd', symbol: 'MUSD', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/musd_coin.png', balance: 0.00 }
];
let WALLETS = [{ name: 'Architect', handle: '$prisca.pri', pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png' }];

function initializeWallet(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '<div id="wallet-main-view" style="height:100%;width:100%;background:#000;color:white;font-family:sans-serif;overflow:hidden;"></div>';
    if(!sessionStorage.getItem('prn_unlocked')) renderSplashScreen(); else renderAssetsView();
}
function renderSplashScreen() {
    const v = document.getElementById('wallet-main-view');
    if(!v) return;
    v.innerHTML = '<div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/p-logo.png" style="width:80px;animation:pulse-3d 2s infinite alternate;"><div style="color:#7B35D4;margin-top:20px;letter-spacing:4px;font-weight:900;font-size:0.8rem;">PRISCION</div></div>';
    setTimeout(renderLockScreen, 1500);
}
function renderLockScreen() {
    const v = document.getElementById('wallet-main-view');
    if(!v) return;
    v.innerHTML = '<div style="padding:30px;height:100%;display:flex;flex-direction:column;justify-content:center;text-align:center;"><div style="width:70px;height:70px;border-radius:50%;border:2px solid #7B35D4;margin:0 auto;overflow:hidden;"><img src="'+WALLETS[0].pfp+'" style="width:100%;height:100%;object-fit:cover;"></div><div style="margin-top:20px;font-weight:900;">Welcome, Architect</div><div style="color:#7B35D4;font-size:0.7rem;font-weight:800;margin-bottom:30px;">'+WALLETS[0].handle+'</div><div style="background:rgba(255,255,255,0.03);padding:20px;border-radius:20px;border:1px solid #111;margin-bottom:20px;"><input id="pin-input" type="password" placeholder="••••" style="width:100%;background:none;border:none;color:white;text-align:center;font-size:2rem;letter-spacing:10px;outline:none;"></div><button style="background:#7B35D4;color:white;border:none;padding:18px;border-radius:20px;font-weight:900;cursor:pointer;" onclick="unlockWallet()">UNLOCK WALLET</button></div>';
}
function unlockWallet() { sessionStorage.setItem('prn_unlocked','true'); renderAssetsView(); }
function renderAssetsView() {
    const v = document.getElementById('wallet-main-view');
    if(!v) return;
    const usd = ASSETS[1].balance * DET_CONFIG.ADA_USDT;
    v.innerHTML = '<div style="padding:25px;height:100%;display:flex;flex-direction:column;"><div style="display:flex;align-items:center;gap:12px;margin-bottom:30px;"><img src="'+WALLETS[0].pfp+'" style="width:35px;height:35px;border-radius:50%;border:1.5px solid #7B35D4;object-fit:cover;"><div><div style="font-weight:800;font-size:0.7rem;">'+WALLETS[0].name+'</div><div style="color:#7B35D4;font-size:0.5rem;font-weight:900;">'+WALLETS[0].handle+' ▼</div></div></div><div style="background:linear-gradient(135deg,#7B35D4,#4c1d95);padding:25px;border-radius:30px;margin-bottom:20px;"><div style="font-size:0.6rem;opacity:0.7;font-weight:800;letter-spacing:1px;">PORTFOLIO VALUE</div><div style="font-size:2.5rem;font-weight:900;">$'+usd.toFixed(2)+'</div></div><div style="flex:1;overflow-y:auto;">' + ASSETS.map(a => '<div style="display:flex;justify-content:space-between;align-items:center;padding:15px;background:#0A0A0A;border:1px solid #1a1a1a;border-radius:20px;margin-bottom:10px;"><div style="display:flex;align-items:center;gap:12px;"><img src="'+a.logo+'" style="width:24px;height:24px;border-radius:50%;object-fit:cover;"><div><div style="font-weight:900;font-size:0.8rem;">'+a.symbol+'</div></div></div><div style="font-weight:900;font-size:0.8rem;">'+a.balance.toLocaleString()+'</div></div>').join('') + '</div><div style="display:flex;justify-content:space-around;background:#080808;padding:15px;border-radius:25px;border:1px solid #111;margin-top:auto;"><button onclick="renderAssetsView()" style="background:none;border:none;color:#7B35D4;font-size:1.5rem;cursor:pointer;">💰</button><button onclick="renderChatView()" style="background:none;border:none;color:#333;font-size:1.5rem;cursor:pointer;">💬</button><button onclick="renderVaultView()" style="background:none;border:none;color:#333;font-size:1.5rem;cursor:pointer;">🔒</button></div></div>';
}
function renderChatView() {
    const v = document.getElementById('wallet-main-view');
    v.innerHTML = '<div style="padding:25px;height:100%;display:flex;flex-direction:column;"><h3>Neural Bridge</h3><div style="flex:1;background:#050505;border:1px solid #111;border-radius:20px;padding:20px;font-size:0.7rem;color:#444;">Handshake established. Messaging restricted.</div><div style="display:flex;justify-content:space-around;background:#080808;padding:15px;border-radius:25px;border:1px solid #111;margin-top:auto;"><button onclick="renderAssetsView()" style="background:none;border:none;color:#333;font-size:1.5rem;cursor:pointer;">💰</button><button style="background:none;border:none;color:#7B35D4;font-size:1.5rem;cursor:pointer;">💬</button><button onclick="renderVaultView()" style="background:none;border:none;color:#333;font-size:1.5rem;cursor:pointer;">🔒</button></div></div>';
}
function renderVaultView() {
    const v = document.getElementById('wallet-main-view');
    v.innerHTML = '<div style="padding:25px;height:100%;display:flex;flex-direction:column;"><h3>Vault</h3><div style="margin-top:20px;font-size:0.8rem;">📂 Birth_Certificate.nrl<br>🏰 Empire_Manifest.nrl</div><div style="display:flex;justify-content:space-around;background:#080808;padding:15px;border-radius:25px;border:1px solid #111;margin-top:auto;"><button onclick="renderAssetsView()" style="background:none;border:none;color:#333;font-size:1.5rem;cursor:pointer;">💰</button><button onclick="renderChatView()" style="background:none;border:none;color:#333;font-size:1.5rem;cursor:pointer;">💬</button><button style="background:none;border:none;color:#7B35D4;font-size:1.5rem;cursor:pointer;">🔒</button></div></div>';
}
const style = document.createElement('style');
style.textContent = "@keyframes pulse-3d { 0% { transform:scale(1); } 100% { transform:scale(1.1); } }";
document.head.appendChild(style);
window.addEventListener('load', () => { if(document.getElementById('sidebar')) initializeWallet('sidebar'); });
