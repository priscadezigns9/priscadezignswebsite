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

function initializeWallet(containerId) {
    const sidebar = document.getElementById(containerId);
    if(!sidebar) return;
    const hasPin = localStorage.getItem('priscion_pin');
    const isSess = sessionStorage.getItem('prn_sess');
    if(!hasPin) renderOnboarding(sidebar);
    else if(!isSess) renderAuth(sidebar);
    else renderWalletMain(sidebar);
}

function renderWalletMain(sidebar) {
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
    
    // Logic-based Assets
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

function renderSendView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
                <button class="btn" onclick="renderAssetsView()" style="background:none; border:none; color:#7B35D4; font-size:1.5rem; cursor:pointer;">←</button>
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Send</h2>
            </div>
            <div style="background:#111; padding:25px; border-radius:24px; border:1px solid #222;">
                <input type="text" id="send-to" placeholder="Recipient (.prn or address)" style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:20px;">
                <select id="send-asset" style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:20px;">
                    ${ASSETS_DATA.map(a => `<option value="${a.id}">${a.name}</option>`).join('')}
                </select>
                <input type="number" id="send-amount" placeholder="0.00" style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:30px; font-size:1.5rem;">
                <button class="btn btn-primary" style="width:100%; padding:18px;" onclick="executeSend()">CONFIRM TRANSACTION</button>
            </div>
        </div>
    `;
}

function executeSend() {
    const amount = parseFloat(document.getElementById('send-amount').value);
    if(amount > WALLETS[currentWalletIndex].balance) { alert("Insufficient Ledger Funds."); return; }
    WALLETS[currentWalletIndex].balance -= amount;
    saveWallets();
    alert("Neural Transaction Anchored to Ledger.");
    renderAssetsView();
}

function renderReceiveView() {
    const view = document.getElementById('wallet-main-view');
    const wallet = WALLETS[currentWalletIndex];
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
                <button class="btn" onclick="renderAssetsView()" style="background:none; border:none; color:#7B35D4; font-size:1.5rem; cursor:pointer;">←</button>
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Receive</h2>
            </div>
            <div style="background:#111; padding:30px; border-radius:24px; border:1px solid #222; text-align:center;">
                <div style="background:white; padding:15px; border-radius:15px; width:180px; height:180px; margin:0 auto 25px;">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${wallet.address}" style="width:100%;">
                </div>
                <div style="margin-bottom:20px;">
                    <div style="color:#666; font-size:0.5rem; text-transform:uppercase; font-weight:800;">Sovereign Handle</div>
                    <div style="color:white; font-size:1.2rem; font-weight:900;">$prisca</div>
                </div>
                <div style="margin-bottom:30px;">
                    <div style="color:#666; font-size:0.5rem; text-transform:uppercase; font-weight:800;">Address</div>
                    <div style="background:black; border:1px solid #333; padding:12px; border-radius:10px; font-family:'Space Mono'; font-size:0.6rem; color:#888; overflow:hidden;">${wallet.address}</div>
                </div>
                <button class="btn btn-primary" style="width:100%; padding:18px;" onclick="navigator.clipboard.writeText('${wallet.address}'); alert('Address Copied.')">COPY ADDRESS</button>
            </div>
        </div>
    `;
}

function renderBuyView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
                <button class="btn" onclick="renderAssetsView()" style="background:none; border:none; color:#7B35D4; font-size:1.5rem; cursor:pointer;">←</button>
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Buy Crypto</h2>
            </div>
            <div style="background:#111; padding:25px; border-radius:24px; border:1px solid #222;">
                <label style="color:#666; font-size:0.5rem; text-transform:uppercase; font-weight:800; display:block; margin-bottom:10px;">Select Asset</label>
                <select id="buy-asset" style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:20px;">
                    ${ASSETS_DATA.map(a => `<option value="${a.id}">${a.name}</option>`).join('')}
                </select>
                
                <label style="color:#666; font-size:0.5rem; text-transform:uppercase; font-weight:800; display:block; margin-bottom:10px;">Amount (USD)</label>
                <input type="number" id="buy-amount" placeholder="100.00" style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:20px; font-size:1.5rem;">
                
                <label style="color:#666; font-size:0.5rem; text-transform:uppercase; font-weight:800; display:block; margin-bottom:10px;">Payment Method</label>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:30px;">
                    <div onclick="selectPayment('visa')" id="pay-visa" style="background:black; border:1px solid #7B35D4; padding:15px; border-radius:12px; text-align:center; cursor:pointer;">
                        <div style="font-size:0.8rem; font-weight:900;">VISA / DEBIT</div>
                    </div>
                    <div onclick="selectPayment('apple')" id="pay-apple" style="background:black; border:1px solid #222; padding:15px; border-radius:12px; text-align:center; cursor:pointer; opacity:0.5;">
                        <div style="font-size:0.8rem; font-weight:900;">APPLE PAY</div>
                    </div>
                </div>

                <button class="btn btn-primary" style="width:100%; padding:18px;" onclick="executeBuy()">INITIATE SOVEREIGN PURCHASE</button>
                <p style="font-size:0.5rem; color:#444; text-align:center; margin-top:15px;">Secure Visa/Debit Bridge via Jello Privacy Layer</p>
            </div>
        </div>
    `;
}

function selectPayment(method) {
    document.getElementById('pay-visa').style.borderColor = method === 'visa' ? '#7B35D4' : '#222';
    document.getElementById('pay-apple').style.borderColor = method === 'apple' ? '#7B35D4' : '#222';
}

function executeBuy() {
    const amount = parseFloat(document.getElementById('buy-amount').value);
    if(!amount || amount < 10) { alert("Minimum purchase is $10."); return; }
    alert(`Redirecting to Secure Visa Bridge...\nAmount: $${amount}\nLayer: Jello Node`);
    // Logic to simulate addition to balance after "success"
    setTimeout(() => {
        WALLETS[currentWalletIndex].balance += amount;
        saveWallets();
        renderAssetsView();
        alert("Sovereign Purchase Successful. Assets Anchored to Ledger.");
    }, 2000);
}

function renderSwapView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
                <button class="btn" onclick="renderAssetsView()" style="background:none; border:none; color:#7B35D4; font-size:1.5rem; cursor:pointer;">←</button>
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Swap</h2>
            </div>
            <div style="background:#111; padding:25px; border-radius:24px; border:1px solid #222;">
                <div style="background:black; padding:20px; border-radius:18px; margin-bottom:10px; border:1px solid #333;">
                    <label style="color:#666; font-size:0.5rem; text-transform:uppercase;">Pay</label>
                    <div style="display:flex; justify-content:space-between; margin-top:10px;">
                        <input type="number" id="swap-pay" value="100" style="background:none; border:none; color:white; font-size:1.5rem; width:100px;">
                        <span style="font-weight:900; color:white;">PRN</span>
                    </div>
                </div>
                <div style="text-align:center; margin:-20px 0; position:relative; z-index:5;"><div style="width:40px; height:40px; background:#7B35D4; border-radius:50%; margin:0 auto; display:flex; align-items:center; justify-content:center; border:4px solid #111;">↓</div></div>
                <div style="background:black; padding:20px; border-radius:18px; margin-top:10px; border:1px solid #333;">
                    <label style="color:#666; font-size:0.5rem; text-transform:uppercase;">Receive</label>
                    <div style="display:flex; justify-content:space-between; margin-top:10px;">
                        <input type="number" value="100" disabled style="background:none; border:none; color:#444; font-size:1.5rem; width:100px;">
                        <span style="font-weight:900; color:white;">MUSD</span>
                    </div>
                </div>
                <button class="btn btn-primary" style="width:100%; padding:18px; margin-top:30px;" onclick="alert('Swap Executed on PRX.')">SWAP ASSETS</button>
            </div>
        </div>
    `;
}

function renderStakingView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
                <button class="btn" onclick="renderAssetsView()" style="background:none; border:none; color:#7B35D4; font-size:1.5rem; cursor:pointer;">←</button>
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Staking</h2>
            </div>
            <div style="background:linear-gradient(135deg, #00ff88 0%, #00a058 100%); padding:25px; border-radius:24px; color:white; margin-bottom:25px; text-align:center;">
                <div style="font-size:0.6rem; text-transform:uppercase; font-weight:800; opacity:0.8;">Live APY</div>
                <div style="font-size:3rem; font-weight:900;">12.5%</div>
            </div>
            <div style="background:#111; padding:25px; border-radius:24px; border:1px solid #222;">
                <h3 style="color:white; font-size:0.9rem; margin-bottom:15px;">Anchor to Mother Node</h3>
                <input type="number" placeholder="Amount to Stake" style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:20px;">
                <button class="btn btn-primary" style="width:100%; padding:15px;" onclick="alert('Staking Pool Verified.')">STAKE $PRN</button>
            </div>
        </div>
    `;
}

function renderMultiWalletView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
                <button class="btn" onclick="renderAssetsView()" style="background:none; border:none; color:#7B35D4; font-size:1.5rem; cursor:pointer;">←</button>
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Wallets</h2>
            </div>
            ${WALLETS.map((w, i) => `
                <div style="background:#111; border:1px solid ${i === currentWalletIndex ? '#7B35D4' : '#222'}; padding:20px; border-radius:18px; margin-bottom:15px; position:relative;">
                    <div onclick="switchWallet(${i})" style="cursor:pointer;">
                        <div style="font-weight:900; color:white; font-size:1rem;">${w.name}</div>
                        <div style="color:#7B35D4; font-size:0.7rem;">${w.handle}</div>
                    </div>
                    <button onclick="renameWallet(${i})" style="position:absolute; top:20px; right:20px; background:none; border:none; color:#444; font-size:0.8rem; cursor:pointer;">✏️</button>
                </div>
            `).join('')}
            <button class="btn btn-outline" style="width:100%; padding:15px; margin-top:20px;" onclick="createNewWallet()">+ NEW SOVEREIGN NODE</button>
        </div>
    `;
}

function switchWallet(i) { currentWalletIndex = i; renderAssetsView(); }

function renameWallet(i) {
    const newName = prompt("Enter New Node Name:", WALLETS[i].name);
    if(newName) { WALLETS[i].name = newName; saveWallets(); renderMultiWalletView(); }
}

function createNewWallet() {
    const handle = prompt("Enter Sovereign Handle ($name.prn):");
    if(handle) {
        WALLETS.push({ name: 'New Node', handle: handle, address: 'addr1...' + Math.random().toString(36).substring(7), balance: 0 });
        saveWallets();
        renderMultiWalletView();
    }
}

function saveWallets() { localStorage.setItem('prn_wallets', JSON.stringify(WALLETS)); }

function earnPRN(amount, reason) {
    WALLETS[currentWalletIndex].balance += amount;
    saveWallets();
    console.log(`Earned ${amount} PRN for: ${reason}`);
    // Optional: Show a small toast notification in the UI
    const toast = document.createElement('div');
    toast.style = "position:fixed; bottom:100px; left:50%; transform:translateX(-50%); background:#00FF88; color:black; padding:10px 20px; border-radius:100px; font-weight:900; font-size:0.7rem; z-index:10000; box-shadow:0 0 20px rgba(0,255,136,0.3);";
    toast.innerText = `+${amount} PRN EARNED: ${reason}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    
    // Update top bar if it exists in the page
    const balanceEl = document.getElementById('top-prn-balance');
    if(balanceEl) balanceEl.innerText = WALLETS[currentWalletIndex].balance.toLocaleString();
}


function renderSettingsView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin-bottom:25px;">Neural Config</h2>
            <div style="background:#111; border-radius:20px; overflow:hidden; border:1px solid #222;">
                <div class="settings-item">
                    <span style="font-size:0.75rem; color:white;">Privacy Shield (Jello Layer)</span>
                    <label class="switch">
                        <input type="checkbox" ${privacyShield ? 'checked' : ''} onchange="togglePrivacy()">
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="settings-item">
                    <span style="font-size:0.75rem; color:white;">Developer Mode</span>
                    <label class="switch">
                        <input type="checkbox" ${developerMode ? 'checked' : ''} onchange="toggleDevMode()">
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="settings-item" onclick="bridgeLedger()">
                    <span style="font-size:0.75rem; color:white;">Link Ledger Hardware</span>
                    <span id="ledger-status" style="font-size:0.6rem; color:#444;">OFFLINE</span>
                </div>
                <div class="settings-item" onclick="syncVoice()">
                    <span style="font-size:0.75rem; color:white;">Sync Sovereign Voice (Private)</span>
                    <span id="voice-status" style="font-size:0.6rem; color:#444;">DISCONNECTED</span>
                </div>
            </div>
            <p style="text-align:center; color:#333; font-size:0.5rem; margin-top:40px;">SOVEREIGN OS v5.5.0</p>
        </div>
    `;
}

function syncVoice() {
    const btn = document.getElementById('voice-status');
    btn.innerText = "LINKING...";
    setTimeout(() => { btn.innerText = "SECURED"; btn.style.color = "#00ff88"; alert("Sovereign Voice Profile Anchored to Private Layer."); }, 2000);
}

function toggleDevMode() { developerMode = !developerMode; localStorage.setItem('prn_dev_mode', developerMode); alert("Neural Debugger Toggle Success."); }
function togglePrivacy() { privacyShield = !privacyShield; localStorage.setItem('prn_privacy_shield', privacyShield); alert("Midnight Private Layer Active."); }

function bridgeLedger() {
    const btn = document.getElementById('ledger-status');
    btn.innerText = "CONNECTING...";
    setTimeout(() => { btn.innerText = "ANCHORED"; btn.style.color = "#00ff88"; alert("Sovereign Hardware Bridge Active."); }, 2000);
}

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

