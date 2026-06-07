const CONFIG = { ADA_USD: 0.44, PRN_USD: 0.198, PRN_ADA: 2.22 };
const ASSETS = [
    { id: 'prn', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png', balance: 2540 },
    { id: 'ada', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38 },
    { id: 'nrl', symbol: 'NRL', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/neural_coin_hf.png', balance: 0 }
];
let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [{ name: 'Architect', handle: '$prisca.pri', pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png' }];
let CHAT = JSON.parse(localStorage.getItem('prn_chat')) || [{ s: 'JARVIS', t: 'Neural Link Active. I am now residing on the Priscion Ledger.' }];

function initializeWallet(c) {
    const d = document.getElementById(c); if(!d) return;
    d.innerHTML = '<div id="w-root" style="height:100%;width:100%;background:#000;color:white;font-family:sans-serif;overflow:hidden;position:relative;"></div>';
    if(!sessionStorage.getItem('prn_unlocked')) renderSplash(); else renderAssets();
}
function renderSplash() {
    const r = document.getElementById('w-root'); if(!r) return;
    r.innerHTML = '<div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/p-logo.png" style="width:80px;animation:p-anim 1.5s infinite alternate;"><div style="color:#7B35D4;margin-top:20px;letter-spacing:4px;font-weight:900;">PRISCION</div></div>';
    setTimeout(renderAssets, 1500);
}
function renderAssets() {
    sessionStorage.setItem('prn_unlocked', 'true');
    const r = document.getElementById('w-root'); if(!r) return;
    const usd = (ASSETS[1].balance * CONFIG.ADA_USD) + (ASSETS[0].balance * CONFIG.PRN_USD);
    r.innerHTML = '<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">' +
    '<div style="display:flex;align-items:center;gap:10px;cursor:pointer;" onclick="renderProfile()"><img src="'+WALLETS[0].pfp+'" style="width:35px;height:35px;border-radius:50%;border:1.5px solid #7B35D4;object-fit:cover;"><div><div style="font-weight:900;font-size:0.7rem;">'+WALLETS[0].name+'</div><div style="color:#7B35D4;font-size:0.5rem;font-weight:900;" onclick="event.stopPropagation();renderHandleMenu()">'+WALLETS[0].handle+' ▼</div></div></div>' +
    '<button onclick="toggleSidebar()" style="background:none;border:none;color:#555;font-size:1.5rem;cursor:pointer;">✕</button></div>' +
    '<div style="background:linear-gradient(135deg,#7B35D4,#3b0764);padding:25px;border-radius:30px;margin-bottom:25px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
    '<div style="font-size:0.6rem;opacity:0.7;font-weight:800;letter-spacing:1px;">PORTFOLIO VALUE</div><div style="font-size:2rem;font-weight:900;margin:10px 0;">$'+usd.toFixed(2)+'</div>' +
    '<div style="display:flex;gap:10px;"><button style="flex:1;background:rgba(255,255,255,0.1);border:none;color:white;padding:10px;border-radius:12px;font-weight:900;font-size:0.6rem;cursor:pointer;" onclick="renderSend()">SEND</button>' +
    '<button style="flex:1;background:rgba(255,255,255,0.1);border:none;color:white;padding:10px;border-radius:12px;font-weight:900;font-size:0.6rem;cursor:pointer;" onclick="renderReceive()">RECEIVE</button>' +
    '<button style="flex:1;background:rgba(255,255,255,0.1);border:none;color:white;padding:10px;border-radius:12px;font-weight:900;font-size:0.6rem;cursor:pointer;" onclick="renderSwap()">SWAP</button></div></div>' +
    '<div style="flex:1;overflow-y:auto;padding-bottom:100px;">' + ASSETS.map(a => `<div style="display:flex;justify-content:space-between;padding:18px;background:#0A0A0A;border:1px solid #111;border-radius:24px;margin-bottom:10px;"><div style="display:flex;align-items:center;gap:12px;"><img src="${a.logo}" style="width:24px;border-radius:50%;"><b>${a.symbol}</b></div><b>${a.balance.toLocaleString()}</b></div>`).join('') + '</div>' +
    renderNav('assets') + '</div>';
}
function renderNav(active) {
    const s = { assets: '💰', stake: '🥩', chat: '💬', vault: '🔒' };
    return '<div style="display:flex;justify-content:space-around;background:#080808;padding:18px;border-radius:30px;border:1px solid #111;margin-top:auto;position:absolute;bottom:30px;left:30px;right:30px;z-index:10;">' + 
    Object.keys(s).map(k => `<button onclick="render${k.charAt(0).toUpperCase()+k.slice(1)}()" style="background:none;border:none;color:${active===k?'#7B35D4':'#333'};font-size:1.5rem;cursor:pointer;transition:0.3s;">${s[k]}</button>`).join('') + '</div>';
}
function renderReceive() {
    const a = 'addr1q8...prisca';
    document.getElementById('w-root').innerHTML = '<div style="padding:30px;text-align:center;"><h3>Receive Assets</h3><div style="background:#fff;padding:15px;display:inline-block;border-radius:20px;margin-top:20px;"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+a+'"></div><div style="margin-top:20px;background:#0A0A0A;padding:15px;border-radius:15px;font-size:0.65rem;word-break:break-all;">'+a+'</div><button style="background:#7B35D4;color:white;margin-top:25px;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;cursor:pointer;" onclick="renderAssets()">BACK</button></div>';
}
function renderSend() {
    document.getElementById('w-root').innerHTML = '<div style="padding:30px;"><h3>Send Assets</h3><input id="s-h" type="text" placeholder="Recipient Handle" style="width:100%;background:#0A0A0A;border:1px solid #111;padding:18px;border-radius:20px;color:white;margin:20px 0;outline:none;"><input id="s-a" type="number" placeholder="Amount" style="width:100%;background:#0A0A0A;border:1px solid #111;padding:18px;border-radius:20px;color:white;margin-bottom:20px;outline:none;"><button style="background:#7B35D4;color:white;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;cursor:pointer;" onclick="alert(\'Confirming Transaction...\');renderAssets()">CONTINUE</button></div>';
}
function renderSwap() {
    document.getElementById('w-root').innerHTML = '<div style="padding:30px;"><h3>Sovereign Swap</h3><div style="background:#0A0A0A;padding:20px;border-radius:20px;border:1px solid #111;margin-top:20px;"><small>FROM</small><div style="display:flex;justify-content:space-between;margin-top:10px;"><b>ADA</b><input type="number" value="100" style="background:none;border:none;color:white;text-align:right;width:80px;font-weight:900;"></div></div><div style="text-align:center;padding:10px;font-size:1.5rem;">↓</div><div style="background:#0A0A0A;padding:20px;border-radius:20px;border:1px solid #111;"><small>TO</small><div style="display:flex;justify-content:space-between;margin-top:10px;"><b>PRN</b><b>222.00</b></div></div><button style="background:#7B35D4;color:white;margin-top:30px;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;cursor:pointer;" onclick="alert(\'Swap Executed\');renderAssets()">EXECUTE SWAP</button></div>';
}
function renderChat() {
    const r = document.getElementById('w-root');
    r.innerHTML = '<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;"><h3>Neural Bridge</h3>' +
    '<div style="flex:1;background:#050505;border:1px solid #111;border-radius:25px;padding:20px;margin-bottom:20px;overflow-y:auto;box-sizing:border-box;" id="chat-f">' +
    CHAT.map(m => `<div style="text-align:${m.s==='Architect'?'right':'left'};margin-bottom:12px;"><div style="font-size:0.5rem;color:#444;margin-bottom:3px;">${m.s.toUpperCase()}</div><div style="display:inline-block;background:${m.s==='Architect'?'#7B35D4':'#111'};padding:12px;border-radius:15px;font-size:0.8rem;max-width:85%;line-height:1.4;">` + m.t + `</div></div>`).join('') +
    '</div><div style="display:flex;gap:10px;margin-bottom:100px;"><input id="ci" type="text" placeholder="Command..." style="flex:1;background:#0A0A0A;border:1px solid #111;padding:15px;border-radius:15px;color:white;outline:none;"><button onclick="sendC()" style="background:#7B35D4;border:none;width:50px;border-radius:15px;color:white;font-weight:900;cursor:pointer;">></button></div>' + 
    renderNav('chat') + '</div>';
    const f = document.getElementById('chat-f'); f.scrollTop = f.scrollHeight;
}
function sendC(){
    const i = document.getElementById('ci'); if(!i.value) return;
    CHAT.push({s:'Architect', t:i.value});
    localStorage.setItem('prn_chat', JSON.stringify(CHAT));
    renderChat();
    setTimeout(() => { CHAT.push({s:'JARVIS', t:'Command registry updated. Neural evolutionary cycle active.'}); localStorage.setItem('prn_chat', JSON.stringify(CHAT)); renderChat(); }, 1200);
}
function renderVault() {
    const n = [{n:"Birth_Cert.pri",i:"🖼️"}, {n:"Land_Deeds.pri",i:"🏠"}, {n:"Manifest.pri",i:"🏰"}, {n:"Keys.pri",i:"🔑"}, {n:"Vault_Backup.pri",i:"🛡️"}];
    document.getElementById('w-root').innerHTML = '<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;"><h3>Sovereign Vault</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;flex:1;overflow-y:auto;padding-bottom:100px;">' +
    n.map(x => `<div style="background:#0A0A0A;padding:20px;border-radius:24px;text-align:center;border:1px solid #111;cursor:pointer;transition:0.3s;" onclick="alert('Metadata Verified: '+x.n)"><div style="font-size:2.2rem;margin-bottom:10px;">${x.i}</div><div style="font-size:0.6rem;font-weight:900;color:#666;">${x.n}</div></div>`).join('') +
    '</div>' + renderNav('vault') + '</div>';
}
function renderStake() {
    document.getElementById('w-root').innerHTML = '<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;"><h3>Yield Engine</h3>' +
    '<div style="background:#0A0A0A;padding:25px;border-radius:28px;border:1px solid #111;margin-bottom:15px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><b>PRN Pool</b><br><small style="color:#666">Staking Rewards</small></div><b style="color:#00FF88;font-size:1.2rem;">4.5%</b></div><button style="width:100%;background:#7B35D4;color:white;padding:10px;border-radius:12px;border:none;margin-top:15px;font-weight:900;cursor:pointer;" onclick="alert(\'Deposit to Pool Active\')">DEPOSIT PRN</button></div>' +
    '<div style="background:#0A0A0A;padding:25px;border-radius:28px;border:1px solid #111;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><b>PRN/ADA LP</b><br><small style="color:#666">Liquidity Rewards</small></div><b style="color:#00FF88;font-size:1.2rem;">12.8%</b></div><button style="width:100%;background:#7B35D4;color:white;padding:10px;border-radius:12px;border:none;margin-top:15px;font-weight:900;cursor:pointer;" onclick="alert(\'Add Liquidity Initialized\')">ADD LIQUIDITY</button></div>' +
    renderNav('stake') + '</div>';
}
function renderProfile() {
    document.getElementById('w-root').innerHTML = '<div style="padding:40px;text-align:center;height:100%;display:flex;flex-direction:column;"><h3>Sovereign Profile</h3>' +
    '<img src="'+WALLETS[0].pfp+'" style="width:100px;height:100px;border-radius:50%;border:3px solid #7B35D4;margin:30px auto;cursor:pointer;" onclick="p=prompt(\'PFP URL\');if(p){WALLETS[0].pfp=p;localStorage.setItem(\'prn_wallets\',JSON.stringify(WALLETS));renderProfile()}">' +
    '<h2 onclick="n=prompt(\'Name\');if(n){WALLETS[0].name=n;localStorage.setItem(\'prn_wallets\',JSON.stringify(WALLETS));renderProfile()}" style="cursor:pointer;margin:0;">'+WALLETS[0].name+'</h2>' +
    '<p style="color:#7B35D4;font-weight:900;margin-top:10px;">'+WALLETS[0].handle+'</p>' +
    '<div style="margin-top:auto;"><button style="background:#111;color:white;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;margin-bottom:10px;cursor:pointer;" onclick="alert(\'Account Recovery Phrase: [LOCKED]\')">RECOVERY PHRASE</button>' +
    '<button style="background:#7B35D4;color:white;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;cursor:pointer;" onclick="renderAssets()">BACK</button></div></div>';
}
function renderHandleMenu() {
    document.getElementById('w-root').innerHTML = '<div style="padding:30px;height:100%;display:flex;flex-direction:column;"><h3>Node Management</h3><div style="margin-top:30px;flex:1;">' +
    '<button style="background:#111;color:white;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;margin-bottom:15px;cursor:pointer;" onclick="alert(\'Create Node Sequence\')">+ CREATE WALLET</button>' +
    '<button style="background:#111;color:white;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;margin-bottom:15px;cursor:pointer;" onclick="alert(\'Enter Recovery Phrase\')">🔑 RESTORE WALLET</button>' +
    '<button style="background:#111;color:white;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;cursor:pointer;" onclick="alert(\'Connect Hardware Ledger\')">🛡️ ADD LEDGER</button></div>' +
    '<button style="background:#7B35D4;color:white;padding:18px;width:100%;border-radius:20px;border:none;font-weight:900;cursor:pointer;" onclick="renderAssets()">BACK</button></div>';
}
function triggerPurchase(s,u,p,a){ toggleSidebar(); initializeWallet(\'sidebar\'); setTimeout(()=>alert(\'Checkout Initialized: \'+s), 500); }
function toggleSidebar() { const s = document.getElementById("sidebar"); s.classList.toggle("active"); if(s.classList.contains("active")) initializeWallet("sidebar"); }
const style = document.createElement("style");
style.textContent = "@keyframes p-anim { from{transform:scale(1)} to{transform:scale(1.1)} } .sidebar{position:fixed;right:-420px;top:0;width:400px;height:100vh;background:#000;transition:0.5s cubic-bezier(0.16, 1, 0.3, 1);z-index:10000;border-left:1px solid #111;box-shadow:-20px 0 50px rgba(0,0,0,0.5)}.sidebar.active{right:0}";
document.head.appendChild(style);
window.addEventListener("load", () => { if(document.getElementById("sidebar")) initializeWallet("sidebar"); });
