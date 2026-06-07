/* PRISCION WALLET CORE v5.8.0-PLATINUM */
const CONFIG = { ADA_USD: 0.44, PRN_USD: 0.198, TWMK_TITHE: 0.10 };
const ASSETS = [
    { id: 'prn', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png', balance: 2540.00 },
    { id: 'ada', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38.00 },
    { id: 'nrl', symbol: 'NRL', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/neural_coin_hf.png', balance: 0.00 },
    { id: 'musd', symbol: 'MUSD', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/musd_coin.png', balance: 0.00 }
];
let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [{ name: 'Architect', handle: '$prisca.pri', pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png' }];
let CHAT_HISTORY = JSON.parse(localStorage.getItem('prn_chat')) || [{ sender: 'JARVIS', text: 'Handshake established. How shall we proceed, Architect?' }];

function initializeWallet(c) {
    const d = document.getElementById(c); if(!d) return;
    d.innerHTML = '<div id="w-root" style="height:100%;width:100%;background:#000;color:white;font-family:Inter,sans-serif;overflow:hidden;position:relative;"></div>';
    if(!sessionStorage.getItem('prn_unlocked')) renderSplash(); else renderAssets();
}
function renderSplash() {
    const r = document.getElementById('w-root'); if(!r) return;
    r.innerHTML = '<div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/p-logo.png" style="width:80px;animation:pulse-3d 2s infinite alternate;"><div style="color:#7B35D4;margin-top:20px;letter-spacing:4px;font-weight:900;">PRISCION</div></div>';
    setTimeout(renderAssets, 1500);
}
function renderAssets() {
    sessionStorage.setItem('prn_unlocked','true');
    const r = document.getElementById('w-root'); if(!r) return;
    const usd = (ASSETS[1].balance * CONFIG.ADA_USD) + (ASSETS[0].balance * CONFIG.PRN_USD);
    r.innerHTML = '<div class="view-container">' +
    '<div class="header-nav">' +
    '<div style="display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="renderProfile()"><img src="'+WALLETS[0].pfp+'" style="width:35px;height:35px;border-radius:50%;border:1.5px solid #7B35D4;object-fit:cover;"><div><div style="font-weight:800;font-size:0.75rem;">'+WALLETS[0].name+'</div><div style="color:#7B35D4;font-size:0.5rem;font-weight:900;">'+WALLETS[0].handle+'</div></div></div>' +
    '<div style="display:flex;gap:15px;"><button onclick="toggleSidebar()" style="background:none;border:none;color:#555;font-size:1.5rem;cursor:pointer;">✕</button></div></div>' +
    '<div class="balance-card"><div style="font-size:0.6rem;opacity:0.6;font-weight:800;letter-spacing:1px;">PORTFOLIO VALUE</div><div style="font-size:2.5rem;font-weight:900;margin:10px 0;">$'+usd.toFixed(2)+'</div>' +
    '<div style="display:flex;gap:10px;margin-top:15px;"><button class="btn-glass" onclick="renderSend()">SEND</button><button class="btn-glass" onclick="renderReceive()">RECEIVE</button><button class="btn-glass" onclick="renderSwap()">SWAP</button></div></div>' +
    '<div style="flex:1;overflow-y:auto;padding-bottom:120px;">' + ASSETS.map(a => `<div class="asset-card"><div style="display:flex;align-items:center;gap:12px;"><img src="${a.logo}" style="width:28px;height:28px;border-radius:50%;background:#111;"><div><div style="font-weight:900;font-size:0.85rem;">${a.symbol}</div></div></div><div style="text-align:right;"><div style="font-weight:900;">${a.balance.toLocaleString()}</div></div></div>`).join('') + '</div>' +
    renderNav('assets') + '</div>';
}
function renderReceive() {
    const addr = 'addr1q8...prisca';
    document.getElementById('w-root').innerHTML = '<div class="view-container"><h3>Receive Assets</h3><div style="text-align:center;margin-top:40px;"><div style="background:#fff;padding:20px;display:inline-block;border-radius:25px;"><img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='+addr+'"></div><div style="margin-top:25px;background:#0A0A0A;padding:15px;border-radius:15px;border:1px solid #111;word-break:break-all;font-size:0.7rem;">'+addr+'</div><button class="huge-btn" style="background:#7B35D4;color:white;margin-top:30px;" onclick="renderAssets()">BACK</button></div></div>';
}
function renderSend() {
    document.getElementById('w-root').innerHTML = '<div class="view-container"><h3>Send Assets</h3><div style="margin-top:30px;"><input type="text" placeholder="Recipient Handle or Address" class="w-input"><input type="number" placeholder="Amount" class="w-input"><button class="huge-btn" style="background:#7B35D4;color:white;margin-top:20px;" onclick="alert(\'Confirm Transaction with PIN\')">CONTINUE</button><button class="huge-btn" style="background:#111;margin-top:10px;" onclick="renderAssets()">CANCEL</button></div></div>';
}
function renderSwap() {
    document.getElementById('w-root').innerHTML = '<div class="view-container"><h3>Swap</h3><div style="margin-top:30px;background:#0A0A0A;padding:20px;border-radius:20px;border:1px solid #111;"><div style="font-size:0.6rem;opacity:0.5;">FROM</div><div style="display:flex;justify-content:space-between;margin-top:10px;"><b>ADA</b><b>0.00</b></div></div><div style="text-align:center;margin:10px 0;">↓</div><div style="background:#0A0A0A;padding:20px;border-radius:20px;border:1px solid #111;"><div style="font-size:0.6rem;opacity:0.5;">TO</div><div style="display:flex;justify-content:space-between;margin-top:10px;"><b>PRN</b><b>0.00</b></div></div><button class="huge-btn" style="background:#7B35D4;color:white;margin-top:30px;" onclick="renderAssets()">BACK</button></div>';
}
function renderChat() {
    const r = document.getElementById('w-root');
    r.innerHTML = '<div class="view-container"><h3>Neural Bridge</h3><div style="flex:1;background:#050505;border:1px solid #111;border-radius:25px;padding:20px;margin-bottom:20px;overflow-y:auto;" id="chat-flow">' + 
    CHAT_HISTORY.map(m => `<div style="text-align:${m.sender==='Architect'?'right':'left'};margin-bottom:15px;"><div style="font-size:0.5rem;color:#444;margin-bottom:3px;">${m.sender.toUpperCase()}</div><div style="display:inline-block;background:${m.sender==='Architect'?'#7B35D4':'#111'};padding:10px 15px;border-radius:15px;font-size:0.8rem;">${m.text}</div></div>`).join('') +
    '</div><div style="display:flex;gap:10px;margin-bottom:100px;"><input id="chat-msg" type="text" placeholder="Command..." style="flex:1;background:#0A0A0A;border:1px solid #1a1a1a;padding:15px;border-radius:15px;color:white;outline:none;"><button onclick="sendChat()" style="background:#7B35D4;border:none;padding:15px;border-radius:15px;color:white;font-weight:900;cursor:pointer;">SEND</button></div>' + renderNav('chat') + '</div>';
    const f = document.getElementById('chat-flow'); f.scrollTop = f.scrollHeight;
}
function sendChat() {
    const i = document.getElementById('chat-msg'); if(!i.value) return;
    CHAT_HISTORY.push({sender: 'Architect', text: i.value});
    localStorage.setItem('prn_chat', JSON.stringify(CHAT_HISTORY));
    renderChat();
}
function renderVault() {
    const nfts = [
        {name:"Birth_Certificate.pri", img:"🖼️"}, {name:"Land_Deed_01.pri", img:"🏠"}, 
        {name:"Empire_Manifest.pri", img:"🏰"}, {name:"Architect_Key.pri", img:"🔑"},
        {name:"Passport_NFT.pri", img:"🪪"}, {name:"Verdant_License.pri", img:"🌿"},
        {name:"Atelia_Beta_Pass.pri", img:"🎮"}, {name:"JLO_Founder_Node.pri", img:"🥁"}
    ];
    document.getElementById('w-root').innerHTML = '<div class="view-container"><h3>Sovereign Vault</h3><div style="flex:1;overflow-y:auto;padding-bottom:120px;display:grid;grid-template-columns:1fr 1fr;gap:15px;">' + nfts.map(n => `<div class="asset-card" style="flex-direction:column;gap:10px;padding:15px;"><div style="font-size:2rem;">${n.img}</div><div style="font-size:0.6rem;font-weight:900;">${n.name}</div></div>`).join('') + '</div>' + renderNav('vault') + '</div>';
}
function renderStake() {
    document.getElementById('w-root').innerHTML = '<div class="view-container"><h3>Staking</h3><div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;"><div style="font-size:3rem;margin-bottom:20px;">🥩</div><p style="color:#7B35D4;font-weight:900;">YIELD ENGINE STANDBY</p><p style="color:#444;font-size:0.7rem;">Minimum 5 ADA UTXO required for registration.</p></div>' + renderNav('stake') + '</div>';
}
function triggerPurchase(service, usd, prn, ada) {
    const r = document.getElementById('w-root'); if(!r) return;
    r.innerHTML = `<div class="view-container"><h3>Checkout</h3><div class="balance-card"><h3>${service}</h3><div style="font-size:1.5rem;font-weight:900;">$${usd}</div><p style="font-size:0.6rem;opacity:0.7;margin-top:10px;">TITHE: $${(usd*0.1).toFixed(2)} to TWMK Wallet</p></div><div style="background:#0A0A0A;padding:20px;border-radius:20px;border:1px solid #111;"><div style="display:flex;justify-content:space-between;margin-bottom:10px;"><span>Total PRN:</span><b>${prn}</b></div><div style="display:flex;justify-content:space-between;"><span>Total ADA:</span><b>${ada}</b></div></div><button class="huge-btn" style="background:#7B35D4;color:white;margin-top:30px;" onclick="alert('Transaction Signed to $prisca.pri')">CONFIRM PURCHASE</button><button class="huge-btn" style="background:#111;margin-top:10px;" onclick="renderAssets()">CANCEL</button></div>`;
}
function renderNav(active) {
    const svgs = {
        assets: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>',
        stake: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
        chat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>',
        vault: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
    };
    return '<div class="huge-nav">' + Object.keys(svgs).map(k => `<button class="${active===k?'active':''}" onclick="render${k.charAt(0).toUpperCase()+k.slice(1)}()">${svgs[k]}</button>`).join('') + '</div>';
}
function renderProfile() {
    const r = document.getElementById('w-root');
    r.innerHTML = '<div class="view-container"><h3>Sovereign Profile</h3><div style="text-align:center;margin-top:40px;"><img src="'+WALLETS[0].pfp+'" style="width:100px;height:100px;border-radius:50%;border:3px solid #7B35D4;margin-bottom:20px;cursor:pointer;" onclick="changePFP()"><h2 style="margin:0;cursor:pointer;" onclick="changeName()">'+WALLETS[0].name+'</h2><p style="color:#7B35D4;font-weight:900;">'+WALLETS[0].handle+'</p><button class="huge-btn" style="background:#7B35D4;color:white;margin-top:40px;" onclick="renderAssets()">BACK</button></div></div>';
}
function changePFP() { const u = prompt("PFP URL:"); if(u) { WALLETS[0].pfp = u; localStorage.setItem('prn_wallets', JSON.stringify(WALLETS)); renderProfile(); } }
function changeName() { const n = prompt("Name:"); if(n) { WALLETS[0].name = n; localStorage.setItem('prn_wallets', JSON.stringify(WALLETS)); renderProfile(); } }
function toggleSidebar() { const s = document.getElementById("sidebar"); s.classList.toggle("active"); if(s.classList.contains("active")) initializeWallet("sidebar"); }
const style = document.createElement('style');
style.textContent = ".view-container { padding:30px; height:100%; display:flex; flex-direction:column; box-sizing:border-box; animation:fadeIn 0.4s; } @keyframes fadeIn { from{opacity:0} to{opacity:1} } .header-nav { display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; } .balance-card { background:linear-gradient(135deg,#7B35D4,#3b0764); padding:30px; border-radius:35px; margin-bottom:30px; } .btn-glass { flex:1; background:rgba(255,255,255,0.1); border:none; color:white; padding:12px; border-radius:15px; font-weight:900; font-size:0.6rem; cursor:pointer; } .asset-card { display:flex; justify-content:space-between; align-items:center; padding:18px; background:#0A0A0A; border:1px solid #111; border-radius:24px; margin-bottom:12px; } .w-input { width:100%; background:#0A0A0A; border:1px solid #111; padding:15px; border-radius:15px; color:white; margin-bottom:10px; outline:none; } .huge-btn { border:none; padding:18px; border-radius:20px; font-weight:900; width:100%; cursor:pointer; } .huge-nav { position:absolute; bottom:30px; left:30px; right:30px; display:flex; justify-content:space-around; background:#080808; padding:18px; border-radius:30px; border:1px solid #111; z-index:100; } .huge-nav button { background:none; border:none; color:#333; cursor:pointer; transition:0.3s; } .huge-nav button.active { color:#7B35D4; transform:scale(1.1); } @keyframes pulse-3d { from{transform:scale(1)} to{transform:scale(1.1)} }";
document.head.appendChild(style);
window.addEventListener('load', () => { if(document.getElementById('sidebar')) initializeWallet('sidebar'); });
