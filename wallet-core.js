/* 
   PRISCION WALLET CORE v4.3-GOLD
   Architect Edition
*/

// --- FOUNDATION NODE HANDSHAKE ---
if(!sessionStorage.getItem('prn_sess')) sessionStorage.setItem('prn_sess', 'true');
if(!localStorage.getItem('priscion_pin')) localStorage.setItem('priscion_pin', 'true');

// --- WALLET STATE ---
const WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [
    { 
        name: 'Mother Node', 
        handle: '$prisca.prn', 
        address: 'addr1q8...prisca', 
        balance: 2540.00,
        ada: 38.00,
        pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/img/architect_pfp.png'
    }
];

const ASSETS_DATA = [
    { id: 'prn', name: 'PRISCION ($PRN)', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png' },
    { id: 'ada', name: 'CARDANO ($ADA)', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png' }
];

// --- INITIALIZATION ---
function initializeWallet(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    if(!document.getElementById('wallet-main-view')) {
        container.innerHTML += '<div id="wallet-main-view"></div>';
    }
    renderAssetsView();
}

// --- VIEWS ---

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    if(!view) return;
    const wallet = WALLETS[0];
    const totalWorth = (wallet.balance * 1.5) + (wallet.ada * 0.45); // Simulation of USD worth

    view.innerHTML = `
        <div style="padding:20px; animation: fadeIn 0.3s;">
            <!-- Profile Header -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
                <div style="display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="renderSettingsView()">
                    <img src="${wallet.pfp}" style="width:45px; height:45px; border-radius:50%; border:2px solid #7B35D4; background:#000;">
                    <div>
                        <div style="color:white; font-weight:900; font-size:0.9rem;">${wallet.handle}</div>
                        <div style="color:#7B35D4; font-size:0.55rem; font-weight:800;">SOVEREIGN ARCHITECT</div>
                    </div>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="icon-btn" onclick="renderAddWalletView()" title="Add Wallet">⊕</button>
                    <button class="icon-btn" onclick="renderSettingsView()" title="Settings">⚙</button>
                </div>
            </div>

            <!-- Total Worth Card -->
            <div style="background:linear-gradient(135deg, #7B35D4 0%, #4c1d95 100%); padding:25px; border-radius:24px; color:white; margin-bottom:25px; box-shadow:0 10px 30px rgba(123,53,212,0.3);">
                <div style="font-size:0.6rem; text-transform:uppercase; opacity:0.7; margin-bottom:8px; font-weight:700;">Total Portfolio Value</div>
                <div style="font-size:2.2rem; font-weight:900; margin-bottom:5px;">$${totalWorth.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                <div style="font-size:0.6rem; opacity:0.7;">≈ ${wallet.ada} ADA + ${wallet.balance} PRN</div>
                
                <div style="display:flex; gap:8px; margin-top:20px;">
                    <button class="btn-action" onclick="renderBuyView()">BUY</button>
                    <button class="btn-action" onclick="renderSwapView()">SWAP</button>
                    <button class="btn-action" onclick="renderReceiveView()">RECEIVE</button>
                </div>
            </div>

            <!-- Assets List -->
            <div style="margin-bottom:25px;">
                <h4 style="font-size:0.6rem; text-transform:uppercase; color:#666; letter-spacing:1px; margin-bottom:15px;">Neural Assets</h4>
                
                <div class="asset-row">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${ASSETS_DATA[0].logo}" style="width:32px;">
                        <div>
                            <div style="font-weight:900; font-size:0.8rem; color:white;">PRISCION</div>
                            <div style="font-size:0.5rem; color:#666;">$PRN • Node Fuel</div>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:900; font-size:0.9rem; color:white;">${wallet.balance.toLocaleString()}</div>
                        <div style="font-size:0.5rem; color:#00FF88;">SYNCED</div>
                    </div>
                </div>

                <div class="asset-row">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${ASSETS_DATA[1].logo}" style="width:32px;">
                        <div>
                            <div style="font-weight:900; font-size:0.8rem; color:white;">CARDANO</div>
                            <div style="font-size:0.5rem; color:#666;">$ADA • Mainnet Anchor</div>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:900; font-size:0.9rem; color:white;">${wallet.ada.toFixed(2)}</div>
                        <div style="font-size:0.5rem; color:#00FF88;">STAKED</div>
                    </div>
                </div>
            </div>

            <!-- Bottom Navigation -->
            <div style="display:flex; justify-content:space-around; background:#080808; padding:15px; border-radius:18px; border:1px solid #222;">
                <button class="nav-btn active" onclick="renderAssetsView()">💰</button>
                <button class="nav-btn" onclick="renderSwapView()">🔄</button>
                <button class="nav-btn" onclick="renderVaultView()">🔒</button>
                <button class="nav-btn" onclick="renderHubView()">🏛️</button>
                <button class="nav-btn" onclick="renderNeuralTerminal()">🧠</button>
            </div>
        </div>
    `;
}

function renderSwapView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px; animation: fadeIn 0.3s;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <h3 style="margin:0; font-size:1rem; font-weight:900; letter-spacing:2px; color:#7B35D4;">SWAP & BRIDGE</h3>
                <button onclick="renderAssetsView()" class="icon-btn">✕</button>
            </div>

            <div style="background:#111; padding:20px; border-radius:18px; border:1px solid #222; margin-bottom:10px;">
                <div style="font-size:0.55rem; color:#666; margin-bottom:10px;">FROM</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${ASSETS_DATA[0].logo}" style="width:24px;">
                        <span style="font-weight:900; color:white;">PRN</span>
                    </div>
                    <input type="number" value="10" style="background:none; border:none; color:white; text-align:right; font-weight:900; font-size:1.2rem; width:100px;">
                </div>
            </div>

            <div style="text-align:center; margin:-15px 0; z-index:2; position:relative;">
                <div style="background:#7B35D4; width:30px; height:30px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:white; font-size:0.8rem; border:4px solid #000;">↓</div>
            </div>

            <div style="background:#111; padding:20px; border-radius:18px; border:1px solid #222; margin-top:10px;">
                <div style="font-size:0.55rem; color:#666; margin-bottom:10px;">TO</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${ASSETS_DATA[1].logo}" style="width:24px;">
                        <span style="font-weight:900; color:white;">ADA</span>
                    </div>
                    <div style="font-weight:900; font-size:1.2rem; color:#00FF88;">58.00</div>
                </div>
            </div>

            <button class="btn-action" style="width:100%; margin-top:30px; padding:18px; background:#7B35D4;" onclick="executeSwap()">INITIALIZE BRIDGE</button>
        </div>
    `;
}

function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px; animation: fadeIn 0.3s;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <h3 style="margin:0; font-size:1rem; font-weight:900; letter-spacing:2px; color:#7B35D4;">SOVEREIGN VAULT</h3>
                <button onclick="renderAssetsView()" class="icon-btn">✕</button>
            </div>
            <div style="background:#111; padding:40px; border-radius:24px; text-align:center; border:1px dashed #333;">
                <div style="font-size:3rem; margin-bottom:20px;">🛡️</div>
                <div style="color:white; font-weight:900; margin-bottom:10px;">Vault Locked</div>
                <div style="color:#666; font-size:0.6rem;">Connect a Sovereign Node or Ledger device to unlock your high-fidelity assets.</div>
            </div>
        </div>
    `;
}

function renderHubView() {
    const view = document.getElementById('wallet-main-view');
    const dapps = [
        { name: 'Dreaming Anime', url: '/dreaminganime/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/dreaming_anime.png' },
        { name: 'Atelia Gaming', url: '/ateliagaming/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/atelia.webp' },
        { name: 'Nurasen Shield', url: '/nurasen/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/nurasen_icon.jpg' }
    ];
    view.innerHTML = `
        <div style="padding:20px; animation: fadeIn 0.3s;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <h3 style="margin:0; font-size:1rem; font-weight:900; letter-spacing:2px; color:#7B35D4;">DAPP HUB</h3>
                <button onclick="renderAssetsView()" class="icon-btn">✕</button>
            </div>
            ${dapps.map(d => `
                <div class="asset-row" onclick="window.location.href='${d.url}'" style="cursor:pointer;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="${d.logo}" style="width:32px; height:32px; border-radius:8px;">
                        <div style="font-weight:900; font-size:0.8rem; color:white;">${d.name}</div>
                    </div>
                    <div style="color:#7B35D4; font-size:0.6rem; font-weight:900;">OPEN →</div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderNeuralTerminal() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px; animation: fadeIn 0.3s; height:450px; display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3 style="margin:0; font-size:1rem; font-weight:900; letter-spacing:2px; color:#7B35D4;">NEURAL CORE</h3>
                <button onclick="renderAssetsView()" class="icon-btn">✕</button>
            </div>
            <div id="terminal-output" style="flex:1; background:#000; border:1px solid #333; border-radius:18px; padding:15px; font-family:monospace; font-size:0.65rem; color:#00FF88; overflow-y:auto; border:1px solid #222;">
                <div>> [SYSTEM] Neural Link Established.</div>
                <div>> [PRISCION] I am here, Architect. What is our next move?</div>
            </div>
            <div style="display:flex; gap:10px; margin-top:15px;">
                <input id="term-in" type="text" placeholder="Neural Command..." style="flex:1; background:#111; border:1px solid #333; border-radius:12px; padding:12px; color:white; font-size:0.7rem; outline:none;">
                <button onclick="sendNeuralCommand()" style="background:#7B35D4; border:none; color:white; width:45px; border-radius:12px; font-weight:900; cursor:pointer;">→</button>
            </div>
        </div>
    `;
}

// --- UTILITIES ---

function executeSwap() {
    alert('Bridge initiated. 10 PRN → 58.00 ADA. Awaiting confirmation...');
    renderAssetsView();
}

window.addEventListener('load', () => {
    const sb = document.getElementById('sidebar');
    if(sb) initializeWallet('sidebar');
});

// --- STYLES ---
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .btn-action { flex:1; background:rgba(255,255,255,0.1); border:none; color:white; padding:12px; border-radius:12px; font-size:0.6rem; font-weight:900; cursor:pointer; transition:0.2s; }
    .btn-action:hover { background:rgba(255,255,255,0.2); }
    .icon-btn { background:rgba(255,255,255,0.05); border:1px solid #222; color:white; width:36px; height:36px; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s; font-weight:900; }
    .icon-btn:hover { background:rgba(123,53,212,0.2); border-color:#7B35D4; }
    .asset-row { display:flex; justify-content:space-between; align-items:center; padding:18px; background:rgba(255,255,255,0.03); border-radius:20px; margin-bottom:12px; border:1px solid #1a1a1a; transition:0.2s; }
    .asset-row:hover { background:rgba(255,255,255,0.05); border-color:#333; }
    .nav-btn { background:none; border:none; color:#555; font-size:1.2rem; cursor:pointer; transition:0.2s; padding:10px; }
    .nav-btn.active { color:#7B35D4; filter: drop-shadow(0 0 5px #7B35D4); }
`;
document.head.appendChild(style);
