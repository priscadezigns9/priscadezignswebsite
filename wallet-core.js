const CONFIG = { ADA_USD: 0.44, PRN_USD: 0.198, PRN_ADA: 2.22 };
const ASSETS = [
    { id: 'prn', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/neural_coin_hf.png', balance: 2540 },
    { id: 'ada', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38 }
];
let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [{ name: 'Architect', handle: '$prisca.pri', pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/priscion.svg' }];
let CHAT = JSON.parse(localStorage.getItem('prn_chat')) || [{ s: 'JARVIS', t: 'Neural Bridge Active.' }];
let VAULT = JSON.parse(localStorage.getItem('prn_vault')) || [
    { n: "Birth_Cert.pri", i: "🖼️" },
    { n: "Land_Deeds.pri", i: "🏠" },
    { n: "Manifest.pri", i: "🏰" },
    { n: "Identity_Core.pri", i: "🔑" }
];

const ICONS = {
    assets: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    stake: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    chat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>',
    vault: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
};

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = 0.9;
        msg.pitch = 0.7;
        window.speechSynthesis.speak(msg);
    }
}

function initializeWallet(c) {
    const root = document.getElementById(c); if (!root) return;
    root.innerHTML = '<div id="w-root" style="height:100%;width:100%;background:#000;color:white;font-family:sans-serif;overflow:hidden;position:relative;display:flex;flex-direction:column;"></div>';
    renderAssets();
}

function renderAssets() {
    const r = document.getElementById('w-root'); if(!r) return;
    const usd = (ASSETS[1].balance * CONFIG.ADA_USD) + (ASSETS[0].balance * CONFIG.PRN_USD);
    r.innerHTML = `
    <div style="padding:25px;flex:1;display:flex;flex-direction:column;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
            <div style="display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="renderProfile()">
                <img src="${WALLETS[0].pfp}" style="width:38px;height:38px;border-radius:50%;border:1.5px solid #7B35D4;object-fit:cover;background:#111;">
                <div>
                    <div style="font-weight:900;font-size:0.75rem;">${WALLETS[0].name}</div>
                    <div style="color:#7B35D4;font-size:0.55rem;font-weight:900;" onclick="event.stopPropagation();renderHandleMenu()">${WALLETS[0].handle} ▼</div>
                </div>
            </div>
            <button onclick="toggleSidebar()" style="background:none;border:none;color:#555;font-size:1.5rem;cursor:pointer;">✕</button>
        </div>
        <div style="background:linear-gradient(135deg,#7B35D4,#3b0764);padding:25px;border-radius:30px;margin-bottom:25px;box-shadow:0 10px 30px rgba(123,53,212,0.3);">
            <div style="font-size:0.6rem;opacity:0.6;font-weight:900;letter-spacing:1px;">TOTAL EQUITY</div>
            <div style="font-size:2.4rem;font-weight:900;margin:10px 0;">$${usd.toFixed(2)}</div>
            <div style="display:flex;gap:10px;"><button class="w-btn" onclick="renderSend()">SEND</button><button class="w-btn" onclick="renderReceive()">RECEIVE</button><button class="w-btn" onclick="renderSwap()">SWAP</button></div>
        </div>
        <div style="flex:1;overflow-y:auto;padding-bottom:100px;">
            ${ASSETS.map(a => `<div style="display:flex;justify-content:space-between;padding:18px;background:#0A0A0A;border:1px solid #111;border-radius:24px;margin-bottom:10px;"><div style="display:flex;align-items:center;gap:12px;"><img src="${a.logo}" style="width:24px;border-radius:50%;"><b>${a.symbol}</b></div><b>${a.balance.toLocaleString()}</b></div>`).join('')}
        </div>
        ${renderNav('assets')}
    </div>`;
}

function renderNav(active) {
    return `<div style="display:flex;justify-content:space-around;background:#050505;padding:18px;border-radius:35px;border:1px solid #111;position:absolute;bottom:30px;left:25px;right:25px;z-index:100;">
        ${Object.keys(ICONS).map(k => `<button onclick="render${k.charAt(0).toUpperCase()+k.slice(1)}()" style="background:none;border:none;color:${active===k?'#7B35D4':'#222'};cursor:pointer;transition:0.3s;">${ICONS[k]}</button>`).join('')}
    </div>`;
}

function renderChat() {
    const r = document.getElementById('w-root');
    r.innerHTML = `<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;">
        <h3>Neural Bridge</h3>
        <div id="chat-f" style="flex:1;background:#050505;border:1px solid #111;border-radius:25px;padding:20px;margin-bottom:20px;overflow-y:auto;scrollbar-width:none;">
            ${CHAT.map(m => `<div style="text-align:${m.s==='Architect'?'right':'left'};margin-bottom:12px;"><div style="display:inline-block;background:${m.s==='Architect'?'#7B35D4':'#111'};padding:12px;border-radius:15px;font-size:0.8rem;max-width:85%;line-height:1.5;${m.s==='Architect'?'':'border:1px solid #111'}">${m.t}</div></div>`).join('')}
        </div>
        <div style="display:flex;gap:10px;margin-bottom:100px;align-items:center;">
            <label style="cursor:pointer;font-size:1.5rem;color:#444;">📎<input type="file" style="display:none" onchange="attachFile(this)"></label>
            <input id="ci" type="text" placeholder="Command..." style="flex:1;background:#0A0A0A;border:1px solid #111;padding:15px;border-radius:15px;color:white;outline:none;">
            <button onclick="sendC()" style="background:#7B35D4;border:none;width:50px;height:50px;border-radius:15px;color:white;">></button>
        </div>
        ${renderNav('chat')}
    </div>`;
    const f = document.getElementById('chat-f'); f.scrollTop = f.scrollHeight;
}

function attachFile(input) {
    if(!input.files || !input.files[0]) return;
    const name = input.files[0].name;
    const type = input.files[0].type;
    const icon = type.includes('image') ? "🖼️" : "📄";
    CHAT.push({s:'Architect', t:'📎 Attached: ' + name});
    VAULT.push({n: name, i: icon});
    localStorage.setItem('prn_chat', JSON.stringify(CHAT));
    localStorage.setItem('prn_vault', JSON.stringify(VAULT));
    renderChat();
    const resp = 'Asset ' + name + ' has been minted on the Sovereign Ledger and stored in your Vault.';
    setTimeout(() => { 
        speak(resp);
        CHAT.push({s:'JARVIS', t:resp}); 
        localStorage.setItem('prn_chat', JSON.stringify(CHAT)); 
        renderChat(); 
    }, 1200);
}

function sendC() {
    const i = document.getElementById('ci'); if(!i.value) return;
    CHAT.push({s:'Architect', t:i.value});
    localStorage.setItem('prn_chat', JSON.stringify(CHAT));
    renderChat();
    const resp = 'Command received, Architect. Synchronizing with the Priscion Neural Core.';
    setTimeout(() => { 
        speak(resp);
        CHAT.push({s:'JARVIS', t:resp}); 
        localStorage.setItem('prn_chat', JSON.stringify(CHAT)); 
        renderChat(); 
    }, 1000);
}

function syncDrive() {
    speak('Initiating full synchronization with Google Drive. Minting Empire assets to the ledger.');
    setTimeout(() => {
        const driveItems = [
            {n:"Empire_Financials.pdf", i:"📄"},
            {n:"Priscion_Brand_Kit.zip", i:"📦"},
            {n:"Verdant_Co_Blueprints.dwg", i:"📐"},
            {n:"Atelia_Genesis_Assets.png", i:"🖼️"}
        ];
        driveItems.forEach(item => { if(!VAULT.find(v=>v.n===item.n)) VAULT.push(item); });
        localStorage.setItem('prn_vault', JSON.stringify(VAULT));
        alert('Google Drive Assets Synchronized.');
        renderVault();
    }, 2000);
}

function renderVault() {
    document.getElementById('w-root').innerHTML = `<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3>Sovereign Vault</h3>
            <button onclick="syncDrive()" style="background:var(--accent);border:none;color:white;font-size:0.55rem;font-weight:900;padding:8px 12px;border-radius:10px;cursor:pointer;">SYNC DRIVE</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;flex:1;overflow-y:auto;padding-bottom:100px;scrollbar-width:none;">
            ${VAULT.map(d => `<div onclick="alert('Verifying: '+d.n)" style="background:#080808;padding:25px;border-radius:30px;text-align:center;border:1px solid #111;cursor:pointer;"><div style="font-size:2.5rem;margin-bottom:10px;">${d.i}</div><div style="font-size:0.55rem;font-weight:900;color:#666;word-break:break-all;">${d.n}</div></div>`).join('')}
        </div>
        ${renderNav('vault')}
    </div>`;
}

function renderStake() {
    document.getElementById('w-root').innerHTML = `<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;">
        <h3>Yield Engine</h3>
        <div style="background:#080808;padding:25px;border-radius:30px;border:1px solid #111;margin-bottom:15px;"><b>PRN Staking</b><br><small style="color:#00FF88">4.5% APY</small></div>
        <div style="background:#080808;padding:25px;border-radius:30px;border:1px solid #111;"><b>Liquidity</b><br><small style="color:#00FF88">12.8% APY</small></div>
        ${renderNav('stake')}
    </div>`;
}

function renderProfile() {
    document.getElementById('w-root').innerHTML = `<div style="padding:40px;text-align:center;height:100%;display:flex;flex-direction:column;">
        <h3 style="margin:0;font-weight:900;letter-spacing:2px;">Profile</h3>
        <img src="${WALLETS[0].pfp}" style="width:100px;height:100px;border-radius:50%;border:3px solid #7B35D4;margin:40px auto;object-fit:cover;cursor:pointer;background:#111;" onclick="p=prompt('URL');if(p){WALLETS[0].pfp=p;localStorage.setItem('prn_wallets',JSON.stringify(WALLETS));renderProfile()}">
        <h2>${WALLETS[0].name}</h2>
        <p style="color:#7B35D4;font-weight:900;">${WALLETS[0].handle}</p>
        <button onclick="renderAssets()" style="margin-top:auto;background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;">BACK</button>
    </div>`;
}

function renderHandleMenu() {
    document.getElementById('w-root').innerHTML = `<div style="padding:30px;">
        <h3>Management</h3>
        <button onclick="alert('Create Node')" style="width:100%;background:#080808;border:1px solid #111;color:white;padding:20px;border-radius:25px;font-weight:900;margin-bottom:15px;cursor:pointer;text-align:left;">+ CREATE WALLET</button>
        <button onclick="renderAssets()" style="background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;margin-top:40px;cursor:pointer;">BACK</button>
    </div>`;
}

function renderReceive() {
    const addr = 'addr1q8...prisca';
    document.getElementById('w-root').innerHTML = `<div style="padding:40px;text-align:center;height:100%;display:flex;flex-direction:column;">
        <h3>Receive</h3>
        <div style="background:#fff;padding:20px;display:inline-block;border-radius:30px;margin-bottom:30px;"><img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${addr}"></div>
        <div style="background:#080808;padding:20px;border:1px solid #111;border-radius:20px;font-size:0.6rem;word-break:break-all;">${addr}</div>
        <button onclick="renderAssets()" style="margin-top:auto;background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;">BACK</button>
    </div>`;
}

function renderSend() {
    document.getElementById('w-root').innerHTML = `<div style="padding:30px;height:100%;display:flex;flex-direction:column;">
        <h3>Send</h3>
        <input type="text" placeholder="Handle" style="width:100%;background:#080808;border:1px solid #111;padding:20px;border-radius:20px;color:white;margin:20px 0;outline:none;font-weight:900;">
        <button onclick="alert('Signing...');renderAssets()" style="background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;margin-top:auto;">CONTINUE</button>
    </div>`;
}

function renderSwap() {
    document.getElementById('w-root').innerHTML = `<div style="padding:30px;height:100%;display:flex;flex-direction:column;">
        <h3>Swap</h3>
        <div style="background:#080808;padding:25px;border-radius:25px;border:1px solid #111;margin-bottom:10px;">
            <small style="color:#444;">SELL ADA</small>
            <div style="display:flex;justify-content:space-between;margin-top:10px;"><b>ADA</b><input type="number" value="100" style="background:none;border:none;color:white;text-align:right;width:80px;font-weight:900;"></div>
        </div>
        <div style="text-align:center;padding:10px;font-size:1.5rem;color:#7B35D4;">↓</div>
        <div style="background:#080808;padding:25px;border-radius:25px;border:1px solid #111;">
            <small style="color:#444;">BUY PRN</small>
            <div style="display:flex;justify-content:space-between;margin-top:10px;"><b>PRN</b><b style="color:#7B35D4;">222.00</b></div>
        </div>
        <button onclick="alert('Swap Executed');renderAssets()" style="background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;margin-top:auto;">SWAP</button>
    </div>`;
}

function renderPayment(s,u) {
    const r = document.getElementById('w-root');
    r.innerHTML = `<div style="padding:30px;height:100%;display:flex;flex-direction:column;animation:fadeIn 0.5s;">
        <h3 style="margin:0 0 40px 0;font-weight:900;">Confirm Payment</h3>
        <div style="background:#080808;padding:30px;border-radius:30px;border:1px solid #111;text-align:center;">
            <div style="font-size:0.6rem;color:#444;font-weight:900;letter-spacing:2px;">TOTAL DUE</div>
            <div style="font-size:2.5rem;font-weight:900;margin:15px 0;">$${u}</div>
            <div style="font-size:0.75rem;color:#7B35D4;font-weight:900;">${s}</div>
        </div>
        <div style="margin-top:auto;display:flex;flex-direction:column;gap:12px;">
            <button onclick="speak('Transaction signed. Confirming on blockchain.'); alert('Transaction Signed'); renderAssets();" style="background:#7B35D4;border:none;color:white;padding:20px;border-radius:20px;width:100%;font-weight:900;cursor:pointer;">CONFIRM & PAY</button>
            <button onclick="renderAssets()" style="background:#111;border:none;color:#444;padding:20px;border-radius:20px;width:100%;font-weight:900;cursor:pointer;">CANCEL</button>
        </div>
    </div>`;
}

function triggerPurchase(s,u,p,a){ 
    const side = document.getElementById('sidebar');
    if(side) {
        side.classList.add('active');
        initializeWallet('sidebar');
        renderPayment(s,u);
    }
}

function toggleSidebar() { 
    const s = document.getElementById("sidebar"); 
    if(!s) return; 
    if(!s.classList.contains("active")) {
        s.classList.add("active");
        initializeWallet("sidebar");
    } else {
        s.classList.remove("active");
    }
}

const st = document.createElement("style");
st.textContent = "@keyframes p-pulse { from{transform:scale(1)} to{transform:scale(1.1)} } @keyframes fadeIn { from{opacity:0} to{opacity:1} } .w-btn{flex:1;background:rgba(255,255,255,0.1);border:none;color:white;padding:10px;border-radius:12px;font-weight:900;font-size:0.6rem;cursor:pointer} .sidebar{position:fixed;right:-420px;top:0;width:400px;height:100vh;background:#000;transition:0.5s cubic-bezier(0.16, 1, 0.3, 1);z-index:10000;border-left:1px solid #111;box-shadow:-20px 0 50px rgba(0,0,0,0.5);}.sidebar.active{right:0} #chat-f::-webkit-scrollbar{display:none;}";
document.head.appendChild(st);

window.addEventListener("load", () => { if(document.getElementById("sidebar")) initializeWallet("sidebar"); });
