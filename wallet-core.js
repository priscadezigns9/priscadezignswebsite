const CONFIG = { ADA_USD: 0.44, PRN_USD: 0.198, PRN_ADA: 2.22 };
const ASSETS = [
    { id: 'prn', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png', balance: 2540 },
    { id: 'ada', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38 },
    { id: 'nrl', symbol: 'NRL', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/neural_coin_hf.png', balance: 1 }
];
let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [{ name: 'Architect', handle: '$prisca.pri', pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png' }];
let CHAT = JSON.parse(localStorage.getItem('prn_chat')) || [{ s: 'JARVIS', t: 'Neural Bridge Active. Singularity established.' }];

function initializeWallet(containerId) {
    const root = document.getElementById(containerId);
    if (!root) return;
    root.innerHTML = '<div id="w-root" style="height:100%;width:100%;background:#000;color:white;font-family:Inter,sans-serif;overflow:hidden;position:relative;display:flex;flex-direction:column;"></div>';
    if (!sessionStorage.getItem('prn_initialized')) {
        renderSplash();
    } else {
        renderAssets();
    }
}

function renderSplash() {
    const r = document.getElementById('w-root');
    r.innerHTML = '<div style="height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#000;"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/p-logo.png" style="width:60px;animation:p-pulse 2s infinite alternate;"><div style="margin-top:20px;letter-spacing:5px;font-weight:900;color:#7B35D4;font-size:0.7rem;">PRISCION</div></div>';
    setTimeout(() => {
        sessionStorage.setItem('prn_initialized', 'true');
        renderAssets();
    }, 1500);
}

function renderAssets() {
    const r = document.getElementById('w-root'); if(!r) return;
    const usd = (ASSETS[1].balance * CONFIG.ADA_USD) + (ASSETS[0].balance * CONFIG.PRN_USD);
    r.innerHTML = `
    <div style="padding:25px;flex:1;display:flex;flex-direction:column;box-sizing:border-box;animation:fadeIn 0.5s;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
            <div style="display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="renderProfile()">
                <img src="${WALLETS[0].pfp}" style="width:38px;height:38px;border-radius:50%;border:1.5px solid #7B35D4;object-fit:cover;">
                <div>
                    <div style="font-weight:900;font-size:0.75rem;">${WALLETS[0].name}</div>
                    <div style="color:#7B35D4;font-size:0.55rem;font-weight:900;" onclick="event.stopPropagation();renderHandleMenu()">${WALLETS[0].handle} ▼</div>
                </div>
            </div>
            <button onclick="toggleSidebar()" style="background:none;border:none;color:#333;font-size:1.5rem;cursor:pointer;transition:0.3s;">✕</button>
        </div>
        <div style="background:linear-gradient(135deg,#7B35D4,#3b0764);padding:25px;border-radius:35px;margin-bottom:25px;box-shadow:0 15px 35px rgba(0,0,0,0.4);">
            <div style="font-size:0.6rem;opacity:0.6;font-weight:900;letter-spacing:1.5px;text-transform:uppercase;">Portfolio Balance</div>
            <div style="font-size:2.4rem;font-weight:900;margin:12px 0;">$${usd.toLocaleString(undefined,{minimumFractionDigits:2})}</div>
            <div style="display:flex;gap:10px;margin-top:10px;">
                <button class="w-btn" onclick="renderSend()">SEND</button>
                <button class="w-btn" onclick="renderReceive()">RECEIVE</button>
                <button class="w-btn" onclick="renderSwap()">SWAP</button>
            </div>
        </div>
        <div style="flex:1;overflow-y:auto;padding-bottom:100px;">
            ${ASSETS.map(a => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:20px;background:#080808;border:1px solid #111;border-radius:28px;margin-bottom:12px;transition:0.3s;">
                    <div style="display:flex;align-items:center;gap:15px;">
                        <div style="width:32px;height:32px;background:#111;border-radius:50%;display:flex;justify-content:center;align-items:center;"><img src="${a.logo}" style="width:20px;"></div>
                        <b style="font-size:0.9rem;">${a.symbol}</b>
                    </div>
                    <div style="text-align:right;"><b style="font-size:0.9rem;">${a.balance.toLocaleString()}</b><div style="font-size:0.5rem;color:#444;">$${(a.balance * (a.id==='ada'?CONFIG.ADA_USD:CONFIG.PRN_USD)).toFixed(2)}</div></div>
                </div>
            `).join('')}
        </div>
        ${renderNav('assets')}
    </div>`;
}

function renderNav(active) {
    const icons = { assets: '💰', stake: '🥩', chat: '💬', vault: '🔒' };
    return `<div style="display:flex;justify-content:space-around;background:#050505;padding:18px;border-radius:35px;border:1px solid #111;position:absolute;bottom:30px;left:25px;right:25px;z-index:100;box-shadow:0 -10px 30px rgba(0,0,0,0.5);">
        ${Object.keys(icons).map(k => `<button onclick="render${k.charAt(0).toUpperCase()+k.slice(1)}()" style="background:none;border:none;color:${active===k?'#7B35D4':'#222'};font-size:1.6rem;cursor:pointer;transition:0.4s;${active===k?'transform:scale(1.1)':''}">${icons[k]}</button>`).join('')}
    </div>`;
}

function renderChat() {
    const r = document.getElementById('w-root');
    r.innerHTML = `<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;animation:fadeIn 0.4s;">
        <h3 style="margin:0 0 20px 0;font-weight:900;letter-spacing:2px;font-size:1.1rem;">Neural Bridge</h3>
        <div id="chat-f" style="flex:1;background:#030303;border:1px solid #111;border-radius:30px;padding:20px;margin-bottom:20px;overflow-y:auto;scrollbar-width:none;">
            ${CHAT.map(m => `<div style="text-align:${m.s==='Architect'?'right':'left'};margin-bottom:15px;"><div style="font-size:0.5rem;color:#333;margin-bottom:4px;font-weight:900;">${m.s.toUpperCase()}</div><div style="display:inline-block;background:${m.s==='Architect'?'#7B35D4':'#0A0A0A'};padding:14px 18px;border-radius:20px;font-size:0.8rem;max-width:85%;line-height:1.5;${m.s==='Architect'?'':'border:1px solid #111'}">${m.t}</div></div>`).join('')}
        </div>
        <div style="display:flex;gap:10px;margin-bottom:100px;align-items:center;background:#080808;padding:10px;border-radius:25px;border:1px solid #111;">
            <label style="cursor:pointer;width:40px;height:40px;display:flex;justify-content:center;align-items:center;color:#444;font-size:1.2rem;">📎<input type="file" style="display:none" onchange="alert('Asset verified. Anchoring to ledger...')"></label>
            <input id="ci" type="text" placeholder="Command..." style="flex:1;background:none;border:none;padding:10px;color:white;outline:none;font-weight:600;font-size:0.8rem;">
            <button onclick="sendC()" style="background:#7B35D4;border:none;width:40px;height:40px;border-radius:18px;color:white;font-weight:900;cursor:pointer;">></button>
        </div>
        ${renderNav('chat')}
    </div>`;
    const f = document.getElementById('chat-f'); f.scrollTop = f.scrollHeight;
}

function sendC() {
    const i = document.getElementById('ci'); if(!i.value) return;
    CHAT.push({s:'Architect', t:i.value});
    localStorage.setItem('prn_chat', JSON.stringify(CHAT));
    renderChat();
    setTimeout(() => {
        CHAT.push({s:'JARVIS', t:'Command registered. Syncing with external APIs (Gmail, WPP, Slack)...'});
        localStorage.setItem('prn_chat', JSON.stringify(CHAT));
        renderChat();
    }, 1200);
}

function renderStake() {
    document.getElementById('w-root').innerHTML = `<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;animation:fadeIn 0.4s;">
        <h3 style="margin:0 0 20px 0;font-weight:900;">Yield Engine</h3>
        <div style="background:#080808;padding:25px;border-radius:30px;border:1px solid #111;margin-bottom:15px;">
            <div style="display:flex;justify-content:space-between;align-items:center;"><div><b style="font-size:1rem;">PRN Staking</b><br><small style="color:#666">Fixed Rewards</small></div><b style="color:#00FF88;font-size:1.4rem;">4.5%</b></div>
            <button onclick="alert('Stake Initialized')" style="width:100%;background:#7B35D4;border:none;color:white;padding:15px;border-radius:15px;margin-top:20px;font-weight:900;cursor:pointer;">DEPOSIT PRN</button>
        </div>
        <div style="background:#080808;padding:25px;border-radius:30px;border:1px solid #111;">
            <div style="display:flex;justify-content:space-between;align-items:center;"><div><b style="font-size:1rem;">PRN/ADA LP</b><br><small style="color:#666">Trading Fees</small></div><b style="color:#00FF88;font-size:1.4rem;">12.8%</b></div>
            <button onclick="alert('Liquidity Initialized')" style="width:100%;background:#111;border:none;color:white;padding:15px;border-radius:15px;margin-top:20px;font-weight:900;cursor:pointer;border:1px solid #222;">ADD LIQUIDITY</button>
        </div>
        ${renderNav('stake')}
    </div>`;
}

function renderVault() {
    const docs = [{n:"Birth_Cert.pri",i:"🖼️"}, {n:"Land_Deeds.pri",i:"🏠"}, {n:"Manifest.pri",i:"🏰"}, {n:"Architect_Keys.pri",i:"🔑"}, {n:"Heritage_Archive.pri",i:"🗂️"}];
    document.getElementById('w-root').innerHTML = `<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;animation:fadeIn 0.4s;">
        <h3 style="margin:0 0 20px 0;font-weight:900;">Sovereign Vault</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;flex:1;overflow-y:auto;padding-bottom:100px;scrollbar-width:none;">
            ${docs.map(d => `<div onclick="alert('Verifying: '+d.n)" style="background:#080808;padding:25px;border-radius:30px;text-align:center;border:1px solid #111;cursor:pointer;transition:0.3s;"><div style="font-size:2.5rem;margin-bottom:10px;">${d.i}</div><div style="font-size:0.6rem;font-weight:900;color:#666;letter-spacing:1px;">${d.n}</div></div>`).join('')}
        </div>
        ${renderNav('vault')}
    </div>`;
}

function renderProfile() {
    document.getElementById('w-root').innerHTML = `<div style="padding:40px;text-align:center;height:100%;display:flex;flex-direction:column;animation:fadeIn 0.4s;">
        <h3 style="margin:0;font-weight:900;letter-spacing:2px;">Sovereign Profile</h3>
        <img src="${WALLETS[0].pfp}" style="width:110px;height:110px;border-radius:50%;border:4px solid #7B35D4;margin:40px auto;object-fit:cover;cursor:pointer;" onclick="p=prompt('New PFP URL');if(p){WALLETS[0].pfp=p;localStorage.setItem('prn_wallets',JSON.stringify(WALLETS));renderProfile()}">
        <h2 onclick="n=prompt('Change Name');if(n){WALLETS[0].name=n;localStorage.setItem('prn_wallets',JSON.stringify(WALLETS));renderProfile()}" style="cursor:pointer;margin:0;font-size:1.8rem;font-weight:900;">${WALLETS[0].name}</h2>
        <p style="color:#7B35D4;font-weight:900;letter-spacing:2px;margin-top:10px;">${WALLETS[0].handle}</p>
        <div style="margin-top:auto;display:flex;flex-direction:column;gap:12px;">
            <button onclick="alert('Recovery Phase: [REDACTED]')" style="background:#111;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;cursor:pointer;border:1px solid #222;">SECURITY PHRASE</button>
            <button onclick="renderAssets()" style="background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;cursor:pointer;">BACK</button>
        </div>
    </div>`;
}

function renderHandleMenu() {
    document.getElementById('w-root').innerHTML = `<div style="padding:30px;height:100%;display:flex;flex-direction:column;animation:fadeIn 0.4s;">
        <h3 style="margin:0 0 40px 0;font-weight:900;">Management</h3>
        <div style="flex:1;display:flex;flex-direction:column;gap:15px;">
            <button onclick="alert('Initializing Node Registration')" style="width:100%;background:#080808;border:1px solid #111;color:white;padding:20px;border-radius:25px;font-weight:900;cursor:pointer;text-align:left;">+ CREATE NEW WALLET</button>
            <button onclick="alert('Enter 24-word Seed')" style="width:100%;background:#080808;border:1px solid #111;color:white;padding:20px;border-radius:25px;font-weight:900;cursor:pointer;text-align:left;">🔑 RESTORE WALLET</button>
            <button onclick="alert('Connect Ledger/Vespr')" style="width:100%;background:#080808;border:1px solid #111;color:white;padding:20px;border-radius:25px;font-weight:900;cursor:pointer;text-align:left;">🛡️ ADD HARDWARE LEDGER</button>
        </div>
        <button onclick="renderAssets()" style="background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;cursor:pointer;">BACK</button>
    </div>`;
}

function renderReceive() {
    const addr = 'addr1q8...prisca';
    document.getElementById('w-root').innerHTML = `<div style="padding:40px;text-align:center;height:100%;display:flex;flex-direction:column;animation:fadeIn 0.4s;">
        <h3 style="margin:0 0 30px 0;font-weight:900;">Receive Assets</h3>
        <div style="background:#fff;padding:20px;display:inline-block;border-radius:30px;margin-bottom:30px;box-shadow:0 0 50px rgba(255,255,255,0.1);"><img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${addr}"></div>
        <div style="background:#080808;padding:20px;border:1px solid #111;border-radius:20px;font-size:0.65rem;word-break:break-all;color:#7B35D4;font-weight:900;">${addr}</div>
        <button onclick="renderAssets()" style="margin-top:auto;background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;cursor:pointer;">BACK</button>
    </div>`;
}

function renderSend() {
    document.getElementById('w-root').innerHTML = `<div style="padding:30px;height:100%;display:flex;flex-direction:column;animation:fadeIn 0.4s;">
        <h3 style="margin:0 0 30px 0;font-weight:900;">Send Assets</h3>
        <div style="flex:1;">
            <input type="text" placeholder="Handle ($name.pri)" style="width:100%;background:#080808;border:1px solid #111;padding:20px;border-radius:20px;color:white;margin-bottom:15px;outline:none;font-weight:900;">
            <input type="number" placeholder="Amount" style="width:100%;background:#080808;border:1px solid #111;padding:20px;border-radius:20px;color:white;outline:none;font-weight:900;">
        </div>
        <button onclick="alert('Signing Transaction...');renderAssets()" style="background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;cursor:pointer;">CONTINUE</button>
    </div>`;
}

function renderSwap() {
    document.getElementById('w-root').innerHTML = `<div style="padding:30px;height:100%;display:flex;flex-direction:column;animation:fadeIn 0.4s;">
        <h3 style="margin:0 0 30px 0;font-weight:900;">Sovereign Swap</h3>
        <div style="flex:1;">
            <div style="background:#080808;padding:25px;border-radius:25px;border:1px solid #111;margin-bottom:10px;">
                <small style="color:#444;font-weight:900;">SELL</small>
                <div style="display:flex;justify-content:space-between;margin-top:10px;"><b>ADA</b><input type="number" value="100" style="background:none;border:none;color:white;text-align:right;width:80px;font-weight:900;outline:none;"></div>
            </div>
            <div style="text-align:center;padding:10px;font-size:1.8rem;color:#7B35D4;">↓</div>
            <div style="background:#080808;padding:25px;border-radius:25px;border:1px solid #111;">
                <small style="color:#444;font-weight:900;">BUY</small>
                <div style="display:flex;justify-content:space-between;margin-top:10px;"><b>PRN</b><b style="color:#7B35D4;">222.00</b></div>
            </div>
        </div>
        <button onclick="alert('Swap Executed');renderAssets()" style="background:#7B35D4;border:none;color:white;padding:18px;border-radius:20px;width:100%;font-weight:900;cursor:pointer;">EXECUTE SWAP</button>
    </div>`;
}

function triggerPurchase(s, u, p, a) {
    toggleSidebar();
    initializeWallet('sidebar');
    setTimeout(() => {
        CHAT.push({s:'Architect', t:'I want to purchase the '+s+'.'});
        CHAT.push({s:'JARVIS', t:'Processing checkout for '+s+' ($'+u+'). Please confirm the transaction in your wallet.'});
        localStorage.setItem('prn_chat', JSON.stringify(CHAT));
        renderChat();
    }, 800);
}

function toggleSidebar() { 
    const s = document.getElementById("sidebar"); 
    if(!s) return; 
    s.classList.toggle("active"); 
    if(s.classList.contains("active")) initializeWallet("sidebar"); 
}

const st = document.createElement("style");
st.textContent = `
    @keyframes p-pulse { from{transform:scale(1)} to{transform:scale(1.1)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .w-btn { flex:1; background:rgba(255,255,255,0.1); border:none; color:white; padding:12px; border-radius:15px; font-weight:900; font-size:0.6rem; cursor:pointer; transition:0.3s; }
    .w-btn:hover { background:rgba(255,255,255,0.2); transform:translateY(-2px); }
    .sidebar { position:fixed; right:-420px; top:0; width:400px; height:100vh; background:#000; transition:0.5s cubic-bezier(0.16, 1, 0.3, 1); z-index:10000; border-left:1px solid #111; box-shadow:-10px 0 50px rgba(0,0,0,0.5); }
    .sidebar.active { right:0; }
    #chat-f::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(st);

window.addEventListener("load", () => { 
    if(document.getElementById("sidebar")) initializeWallet("sidebar"); 
});
