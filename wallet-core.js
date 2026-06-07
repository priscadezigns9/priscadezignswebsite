const CONFIG = { ADA_USD: 0.44, PRN_USD: 0.198, PRN_ADA: 2.22 };
const ASSETS = [
    { id: 'prn', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/neural_coin_hf.png', balance: 2540 },
    { id: 'ada', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38 }
];
let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [{ name: 'Architect', handle: '$prisca.pri', pfp: 'assets/p-logo.png' }];
let CHAT = JSON.parse(localStorage.getItem('prn_chat')) || [{ s: 'JARVIS', t: 'Welcome, Architect. Jello Messenger is now anchored to your Sovereign Ledger.' }];
let VAULT = JSON.parse(localStorage.getItem('prn_vault')) || [{ n: "Manifest.pri", i: "🏰" }];

const ICONS = {
    assets: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    stake: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    chat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>',
    vault: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
};

function speak(t) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const m = new SpeechSynthesisUtterance(t);
        const v = window.speechSynthesis.getVoices().find(x => x.name.includes('Google') || x.name.includes('Natural') || x.name.includes('UK English Male'));
        if (v) m.voice = v;
        m.rate = 0.85; m.pitch = 0.7;
        window.speechSynthesis.speak(m);
    }
}

function initializeWallet(c) {
    const root = document.getElementById(c); if (!root) return;
    root.innerHTML = '<div id="w-root" style="height:100%;width:100%;background:#000;color:white;font-family:Inter,sans-serif;overflow:hidden;position:relative;display:flex;flex-direction:column;"></div>';
    renderAssets();
}

function renderAssets() {
    const r = document.getElementById('w-root'); if(!r) return;
    const usd = (ASSETS[1].balance * CONFIG.ADA_USD) + (ASSETS[0].balance * CONFIG.PRN_USD);
    r.innerHTML = `<div style="padding:25px;flex:1;display:flex;flex-direction:column;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
            <div style="display:flex;align-items:center;gap:12px;cursor:pointer;" onclick="renderProfile()">
                <img src="${WALLETS[0].pfp}" style="width:38px;height:38px;border-radius:50%;border:1.5px solid #7B35D4;object-fit:cover;background:#111;">
                <div><div style="font-weight:900;font-size:0.75rem;">${WALLETS[0].name}</div><div style="color:#7B35D4;font-size:0.55rem;font-weight:900;" onclick="event.stopPropagation();renderHandleMenu()">${WALLETS[0].handle} ▼</div></div>
            </div>
            <button onclick="toggleSidebar()" style="background:none;border:none;color:#333;font-size:1.5rem;cursor:pointer;">✕</button>
        </div>
        <div style="background:linear-gradient(135deg,#7B35D4,#3b0764);padding:25px;border-radius:30px;margin-bottom:25px;box-shadow:0 10px 30px rgba(123,53,212,0.3);">
            <div style="font-size:0.6rem;opacity:0.6;font-weight:900;">TOTAL EQUITY</div>
            <div style="font-size:2.4rem;font-weight:900;margin:10px 0;">$${usd.toFixed(2)}</div>
            <div style="display:flex;gap:10px;"><button class="w-btn" onclick="renderSend()">SEND</button><button class="w-btn" onclick="renderReceive()">RECEIVE</button><button class="w-btn" onclick="renderSwap()">SWAP</button></div>
        </div>
        <div style="flex:1;overflow-y:auto;padding-bottom:100px;scrollbar-width:none;">
            ${ASSETS.map(a => `<div style="display:flex;justify-content:space-between;padding:20px;background:#0A0A0A;border:1px solid #111;border-radius:24px;margin-bottom:10px;"><div style="display:flex;align-items:center;gap:12px;"><img src="${a.logo}" style="width:24px;border-radius:50%;"><b>${a.symbol}</b></div><b>${a.balance.toLocaleString()}</b></div>`).join('')}
        </div>
        ${renderNav('assets')}
    </div>`;
}

function renderNav(active) {
    return `<div style="display:flex;justify-content:space-around;background:#050505;padding:20px;border-radius:35px;border:1px solid #111;position:absolute;bottom:30px;left:25px;right:25px;z-index:100;box-shadow:0 -10px 30px rgba(0,0,0,0.5);">
        ${Object.keys(ICONS).map(k => `<button onclick="render${k.charAt(0).toUpperCase()+k.slice(1)}()" style="background:none;border:none;color:${active===k?'#7B35D4':'#444'};font-size:1.6rem;cursor:pointer;transition:0.3s;${active===k?'transform:scale(1.1)':''}">${ICONS[k]}</button>`).join('')}
    </div>`;
}

function renderChat() {
    const r = document.getElementById('w-root');
    r.innerHTML = `<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;">
        <h3 style="margin:0 0 20px 0;font-weight:900;letter-spacing:1px;">Jello Messenger</h3>
        <div id="chat-f" style="flex:1;background:#050505;border:1px solid #111;border-radius:30px;padding:20px;margin-bottom:20px;overflow-y:auto;scrollbar-width:none;">
            ${CHAT.map(m => `<div style="text-align:${m.s==='Architect'?'right':'left'};margin-bottom:15px;"><div style="font-size:0.5rem;color:#333;margin-bottom:4px;font-weight:900;">${m.s.toUpperCase()}</div><div style="display:inline-block;background:${m.s==='Architect'?'#7B35D4':'#0A0A0A'};padding:14px 18px;border-radius:20px;font-size:0.8rem;max-width:85%;line-height:1.5;${m.s==='Architect'?'':'border:1px solid #111'}">${m.t}</div></div>`).join('')}
        </div>
        <div style="display:flex;gap:10px;margin-bottom:100px;align-items:center;background:#0A0A0A;padding:12px;border-radius:25px;border:1px solid #111;">
            <label style="cursor:pointer;font-size:1.4rem;color:#444;">📎<input type="file" style="display:none" onchange="prepUpload(this)"></label>
            <button onclick="startVoice()" id="mic-btn" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#444;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
            <input id="ci" type="text" placeholder="Message Singularity..." style="flex:1;background:none;border:none;padding:5px;color:white;outline:none;font-weight:600;">
            <button onclick="sendC()" style="background:#7B35D4;border:none;width:45px;height:45px;border-radius:18px;color:white;font-weight:900;cursor:pointer;">></button>
        </div>
        ${renderNav('chat')}
    </div>`;
    const f = document.getElementById('chat-f'); f.scrollTop = f.scrollHeight;
}

function prepUpload(input) {
    if(!input.files[0]) return;
    const name = input.files[0].name;
    const comment = prompt("Add a comment to this attachment:");
    const msg = "📎 " + name + (comment ? " | " + comment : "");
    CHAT.push({s:'Architect', t:msg});
    VAULT.push({n: name, i: input.files[0].type.includes('image') ? "🖼️" : "📄"});
    localStorage.setItem('prn_chat', JSON.stringify(CHAT));
    localStorage.setItem('prn_vault', JSON.stringify(VAULT));
    renderChat();
    speak("High-fidelity asset " + name + " and your comment have been anchored to the ledger.");
}

function startVoice() {
    const btn = document.getElementById('mic-btn');
    btn.style.color = '#FF0000';
    speak("Voice Bridge active. I am listening, Architect.");
    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.onresult = (e) => { 
        document.getElementById('ci').value = e.results[0][0].transcript;
        btn.style.color = '#444';
    };
    rec.onerror = () => { btn.style.color = '#444'; };
    rec.start();
}

function sendC() {
    const i = document.getElementById('ci'); if(!i.value) return;
    const msg = i.value;
    CHAT.push({s:'Architect', t:msg});
    localStorage.setItem('prn_chat', JSON.stringify(CHAT));
    renderChat();
    i.value = '';
    
    // Humanized JARVIS logic
    let resp = "I have registered your directive. The Neural Bridge is synchronizing with the blockchain core.";
    if(msg.toLowerCase().includes("logo")) resp = "I am pulling the high-fidelity brand signals from your Vault. The display protocols are being calibrated as we speak.";
    if(msg.toLowerCase().includes("jello")) resp = "Jello Messenger is now your primary sovereign channel. Every message is a block on the empire ledger.";
    
    setTimeout(() => { 
        speak(resp);
        CHAT.push({s:'JARVIS', t:resp}); 
        localStorage.setItem('prn_chat', JSON.stringify(CHAT)); 
        renderChat(); 
    }, 1200);
}

function renderVault() {
    document.getElementById('w-root').innerHTML = `<div style="padding:25px;height:100%;display:flex;flex-direction:column;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3>Sovereign Vault</h3>
            <button onclick="syncDrive()" style="background:var(--accent);border:none;color:white;font-size:0.55rem;font-weight:900;padding:8px 12px;border-radius:10px;cursor:pointer;">SYNC DRIVE</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;flex:1;overflow-y:auto;padding-bottom:100px;scrollbar-width:none;">
            ${VAULT.map(d => `<div onclick="alert('Metadata: '+d.n)" style="background:#0A0A0A;padding:25px;border-radius:30px;text-align:center;border:1px solid #111;cursor:pointer;transition:0.3s;"><div style="font-size:2.5rem;margin-bottom:10px;">${d.i}</div><div style="font-size:0.55rem;font-weight:900;color:#666;word-break:break-all;letter-spacing:1px;">${d.n}</div></div>`).join('')}
        </div>
        ${renderNav('vault')}
    </div>`;
}

function triggerPurchase(s,u){ toggleSidebar(); renderPayment(s,u); }

function renderPayment(serviceName, basePrice) {
    const c = document.getElementById('wallet-content');
    if(!c) return;
    
    // Logic: Web2 Price is standard, Web3 ($PRN) gets 10% discount
    const web2Price = parseFloat(basePrice) || 299.00;
    const prnPrice = (web2Price * 0.9).toFixed(2);
    
    c.innerHTML = `
        <div style="padding:30px; animation:fadeIn 0.5s">
            <h2 style="font-weight:900; letter-spacing:3px; font-size:1.5rem;">CHECKOUT</h2>
            <div style="background:#111; padding:20px; border-radius:20px; margin-top:20px;">
                <div style="font-size:0.7rem; font-weight:900; color:var(--accent);">${serviceName.toUpperCase()}</div>
                <div style="display:flex; justify-content:space-between; margin-top:15px; border-bottom:1px solid #222; padding-bottom:15px;">
                    <span style="color:#555; font-size:0.8rem;">Standard Price (Card/PayPal)</span>
                    <span style="font-weight:900;">$${web2Price.toFixed(2)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top:15px;">
                    <span style="color:var(--accent); font-size:0.8rem; font-weight:900;">Sovereign Price ($PRN)</span>
                    <span style="font-weight:900; color:var(--accent);">-10% DISCOUNT</span>
                </div>
                <div style="font-size:1.5rem; font-weight:900; margin-top:5px; text-align:right;">${prnPrice} $PRN</div>
            </div>

            <div style="margin-top:30px;">
                <div style="font-size:0.6rem; font-weight:900; color:#333; letter-spacing:2px; margin-bottom:15px;">SELECT PAYMENT METHOD</div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <button class="w-btn" style="background:#0070BA; font-size:0.6rem;" onclick="alert('Redirecting to PayPal Checkout...')">PAYPAL</button>
                    <button class="w-btn" style="background:#111; font-size:0.6rem; border:1px solid #333;" onclick="alert('Processing Card Payment...')">CREDIT CARD</button>
                    <button class="w-btn" style="background:#111; font-size:0.6rem; border:1px solid #333;" onclick="alert('Initiating Bank Transfer...')">US BANK (ACH)</button>
                    <button class="w-btn" style="background:var(--accent); font-size:0.6rem;" onclick="alert('Transaction Signed: Paying with $PRN')">SOVEREIGN ($PRN)</button>
                </div>
            </div>
            
            <div style="margin-top:40px; background:linear-gradient(to bottom, #080808, #000); padding:20px; border-radius:20px; border:1px solid var(--accent);">
                <div style="font-size:0.6rem; font-weight:900; color:var(--accent);">TIER SELECTION</div>
                <div style="margin-top:10px;">
                    <label style="display:flex; align-items:center; gap:10px; margin-bottom:10px; cursor:pointer;">
                        <input type="radio" name="tier" checked> 
                        <span style="font-size:0.7rem; font-weight:900;">WEB2 BASIC (Website + App)</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                        <input type="radio" name="tier"> 
                        <span style="font-size:0.7rem; font-weight:900; color:var(--accent);">WEB3 SOVEREIGN (+Handle & Ledger)</span>
                    </label>
                </div>
            </div>
        </div>
    `;
    updateNav('none');
}
</div>
            <div style="font-size:0.8rem;color:#7B35D4;font-weight:900;">${s}</div>
        </div>
        <div style="margin-top:auto;display:flex;flex-direction:column;gap:12px;">
            <button onclick="speak('Transaction signed. Architect privilege detected: Fee waived.'); alert('Paid: Sovereign Access Granted'); renderAssets();" style="background:#7B35D4;border:none;color:white;padding:22px;border-radius:25px;width:100%;font-weight:900;cursor:pointer;font-size:1rem;">CONFIRM & PAY</button>
            <button onclick="renderAssets()" style="background:#111;border:none;color:#444;padding:20px;border-radius:25px;width:100%;font-weight:900;cursor:pointer;">CANCEL</button>
        </div>
    </div>`;
}

function toggleSidebar() { 
    const s = document.getElementById("sidebar"); if(!s) return; 
    if(!s.classList.contains("active")) {
        s.classList.add("active");
        initializeWallet("sidebar");
    } else {
        s.classList.remove("active");
    }
}

const st = document.createElement("style");
st.textContent = "@keyframes fadeIn { from{opacity:0} to{opacity:1} } .w-btn{flex:1;background:rgba(255,255,255,0.1);border:none;color:white;padding:12px;border-radius:15px;font-weight:900;font-size:0.6rem;cursor:pointer} .sidebar{position:fixed;right:-420px;top:0;width:400px;height:100vh;background:#000;transition:0.5s cubic-bezier(0.16, 1, 0.3, 1);z-index:10000;border-left:1px solid #111;box-shadow:-20px 0 50px rgba(0,0,0,0.5);}.sidebar.active{right:0} @media(max-width:500px){.sidebar{width:100%;right:-100%}}";
document.head.appendChild(st);
window.addEventListener("load", () => { 
    if(document.getElementById("sidebar")) initializeWallet("sidebar"); 
    if ('serviceWorker' in navigator) {
        window.navigator.serviceWorker.register('/sw.js').then(() => console.log('Sovereign Sync Active'));
    }
});




function renderStake() {
    const c = document.getElementById('wallet-content');
    if(!c) return;
    c.innerHTML = `
        <div style="padding:30px; animation:fadeIn 0.5s">
            <h2 style="font-weight:900; letter-spacing:3px; font-size:1.5rem;">STAKING</h2>
            <div style="background:#111; padding:25px; border-radius:20px; margin-top:20px;">
                <div style="color:#555; font-size:0.6rem; font-weight:900; margin-bottom:10px;">ESTIMATED APY</div>
                <div style="font-size:2rem; font-weight:900; color:var(--accent);">12.5%</div>
                <p style="color:#666; font-size:0.7rem; margin-top:15px;">Stake your $PRN to secure the Sovereign Ledger and earn passive neural yield.</p>
                <button class="w-btn" style="width:100%; margin-top:20px; background:var(--accent); border-radius:15px; padding:15px; border:none; color:#fff; font-weight:900; cursor:pointer;" onclick="alert('Stake Initiated: Transaction pending on Ledger...')">STAKE $PRN</button>
            </div>
        </div>
    `;
    if(typeof updateNav === 'function') updateNav('stake');
}
