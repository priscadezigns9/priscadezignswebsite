/* Sovereign Wallet Core v5.1.0 [High-Fidelity Neural Overhaul] */

const WALLETS = [
    { name: 'Mother Node', handle: '$prisca.prn', address: 'addr1q8...prisca' },
    { name: 'Business Node', handle: '$priscion.prn', address: 'addr1q9...priscion' }
];

let currentWalletIndex = 0;
let developerMode = false;

// High-Fidelity Asset Data with Correct Coin Images
const ASSETS_DATA = [
    { id: 'prn', name: 'PRISCION ($PRN)', balance: '2,540.00', usd: '$2,540.00', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png' },
    { id: 'nrl', name: 'NEURAL ($NRL)', balance: '15,000', usd: '$15,000', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/nrl_coin.png' },
    { id: 'atlr', name: 'ATELIA ($ATLR)', balance: '82,400', usd: '$2,472.00', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/atlr_coin.png' },
    { id: 'musd', name: 'MUSTARD ($MUSD)', balance: '867.85', usd: '$867.85', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/musd_coin.png' }
];

const EMPIRE_NODES = [
    { name: 'ATELIA', handle: '$atelia.prn', url: '/ateliagaming/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/atelia_logo.webp', icon: '🎮' },
    { name: 'DREAMING', handle: '$dreaming.prn', url: '/dreaminganime/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/dreaming_logo.jpg', icon: '⛩️' },
    { name: 'RIDDIIM', handle: '$riddiim.prn', url: '/riddiim/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/riddiim_logo.png', icon: '🎵' },
    { name: 'CALALLOO', handle: '$calalloo.prn', url: '/calalloo/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/calalloo_logo.png', icon: '🍲' },
    { name: 'NURASEN', handle: '$nurasen.prn', url: '/nurasen/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/nurasen_icon.jpg', icon: '🛡️' }
];

const SAAS_NODES = [
    { name: 'CUPYX', handle: '$cupyx.prn', url: '/cupyx/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/cupyx_logo.png', icon: '☕' },
    { name: 'MOBLYNC', handle: '$moblync.prn', url: '/moblync/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/moblync_logo.png', icon: '📱' },
    { name: 'KARJOV', handle: '$karjov.prn', url: '/karjov/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/karjov_logo.png', icon: '⚔️' },
    { name: 'ROWCELL', handle: '$rowcell.prn', url: '/rowcell/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/rowcell_logo.png', icon: '🌹' },
    { name: 'VELLOQ', handle: '$velloq.prn', url: '/velloq/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/velloq_logo.png', icon: '⚡' }
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
                        <div id="wallet-handle-trigger" style="font-weight:900; font-size:1.1rem; color:white; letter-spacing:0.5px; border-bottom:1px dashed #444;">${wallet.handle}</div>
                        <div style="font-size:0.5rem; color:#7B35D4; text-transform:uppercase; font-weight:800;">Node: ${wallet.name}</div>
                    </div>
                </div>
                <div onclick="window.open('/mint-live.html')" style="cursor:pointer; background:#111; padding:8px; border-radius:10px; border:1px solid #222;" title="Live Mint View (Pool.pm style)">
                    📊
                </div>
            </div>
            
            <div style="background:linear-gradient(135deg, #7B35D4 0%, #4c1d95 100%); padding:25px; border-radius:24px; color:white; margin-bottom:25px; box-shadow:0 10px 30px rgba(123,53,212,0.3);">
                <div style="font-size:0.6rem; text-transform:uppercase; opacity:0.7; margin-bottom:8px; font-weight:700;">Net Worth</div>
                <div style="font-size:2.2rem; font-weight:900; margin-bottom:20px;">$4,240.50</div>
                <div style="display:flex; gap:8px;">
                    <button class="btn-action" onclick="renderSendView()">SEND</button>
                    <button class="btn-action" onclick="renderReceiveView()">RECEIVE</button>
                    <button class="btn-action" onclick="renderSwapView()">SWAP</button>
                    <button class="btn-action" onclick="renderStakingView()">STAKE</button>
                </div>
            </div>

            <div id="asset-list-container"></div>
        </div>
    `;
    document.getElementById('asset-list-container').innerHTML = ASSETS_DATA.map(a => `
        <div style="background:#111; border:1px solid rgba(255,255,255,0.03); border-radius:18px; padding:18px; display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <img src="${a.logo}" style="width:40px; height:40px; border-radius:50%;">
                <div>
                    <div style="font-weight:800; font-size:0.75rem; color:white;">${a.name}</div>
                    <div style="font-size:0.55rem; color:#666;">${a.balance}</div>
                </div>
            </div>
            <div style="text-align:right;">
                <div style="font-weight:900; font-size:0.8rem; color:white;">${a.usd}</div>
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
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Send Assets</h2>
            </div>
            
            <div style="background:#111; padding:25px; border-radius:24px; border:1px solid #222;">
                <label style="color:#666; font-size:0.6rem; text-transform:uppercase; font-weight:800; display:block; margin-bottom:10px;">Recipient</label>
                <input type="text" placeholder="Enter .prn handle or address" style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:20px;">
                
                <label style="color:#666; font-size:0.6rem; text-transform:uppercase; font-weight:800; display:block; margin-bottom:10px;">Asset</label>
                <select style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:20px;">
                    ${ASSETS_DATA.map(a => `<option>${a.name} (${a.balance})</option>`).join('')}
                    <option>NFTs / Sovereign Assets</option>
                </select>
                
                <label style="color:#666; font-size:0.6rem; text-transform:uppercase; font-weight:800; display:block; margin-bottom:10px;">Amount</label>
                <input type="number" placeholder="0.00" style="width:100%; background:black; border:1px solid #333; padding:15px; border-radius:12px; color:white; margin-bottom:30px; font-size:1.5rem;">
                
                <button class="btn btn-primary" style="width:100%; padding:18px;" onclick="alert('Transaction Initiated on Ledger.')">CONFIRM SEND</button>
            </div>
        </div>
    `;
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
                
                <div style="margin-bottom:25px;">
                    <div style="color:#666; font-size:0.6rem; text-transform:uppercase; font-weight:800; margin-bottom:5px;">Sovereign Handle</div>
                    <div style="color:white; font-size:1.2rem; font-weight:900;">${wallet.handle}</div>
                </div>
                
                <div style="margin-bottom:30px;">
                    <div style="color:#666; font-size:0.6rem; text-transform:uppercase; font-weight:800; margin-bottom:10px;">Wallet Address</div>
                    <div style="background:black; border:1px solid #333; padding:12px; border-radius:10px; font-family:'Space Mono'; font-size:0.6rem; color:#888; overflow:hidden; text-overflow:ellipsis;">${wallet.address}</div>
                </div>
                
                <button class="btn btn-primary" style="width:100%; padding:18px;" onclick="navigator.clipboard.writeText('${wallet.address}'); alert('Address Copied to Neural Clipboard.')">COPY ADDRESS</button>
            </div>
        </div>
    `;
}

function renderSwapView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:30px;">
                <button class="btn" onclick="renderAssetsView()" style="background:none; border:none; color:#7B35D4; font-size:1.5rem; cursor:pointer;">←</button>
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Sovereign Swap</h2>
            </div>
            
            <div style="background:#111; padding:25px; border-radius:24px; border:1px solid #222; position:relative;">
                <div style="background:black; border:1px solid #333; padding:20px; border-radius:18px; margin-bottom:10px;">
                    <label style="color:#666; font-size:0.5rem; text-transform:uppercase; font-weight:800;">Pay</label>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                        <input type="number" placeholder="0.0" style="background:none; border:none; color:white; font-size:1.5rem; width:120px;">
                        <select style="background:#111; border:none; color:white; font-weight:700;">
                            <option>PRN</option>
                            <option>MUSD</option>
                            <option>ADA</option>
                        </select>
                    </div>
                </div>
                
                <div style="width:40px; height:40px; background:#7B35D4; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:-20px auto; position:relative; z-index:2; border:4px solid #111; cursor:pointer;">↓</div>
                
                <div style="background:black; border:1px solid #333; padding:20px; border-radius:18px; margin-top:10px; margin-bottom:25px;">
                    <label style="color:#666; font-size:0.5rem; text-transform:uppercase; font-weight:800;">Receive</label>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                        <input type="number" placeholder="0.0" disabled style="background:none; border:none; color:#888; font-size:1.5rem; width:120px;">
                        <select style="background:#111; border:none; color:white; font-weight:700;">
                            <option>NRL</option>
                            <option>ATLR</option>
                        </select>
                    </div>
                </div>
                
                <button class="btn btn-primary" style="width:100%; padding:18px;" onclick="alert('Swap Executed on PRX.')">SWAP ASSETS</button>
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
            
            <div style="background:linear-gradient(135deg, #00ff88 0%, #00a058 100%); padding:25px; border-radius:24px; color:white; margin-bottom:25px;">
                <div style="font-size:0.6rem; text-transform:uppercase; opacity:0.8; font-weight:800;">APY Rewards</div>
                <div style="font-size:2.5rem; font-weight:900;">12.5%</div>
                <div style="font-size:0.7rem; margin-top:10px;">Current Staked: 5,000 $PRN</div>
            </div>
            
            <div style="background:#111; padding:25px; border-radius:24px; border:1px solid #222;">
                <h3 style="color:white; font-size:0.9rem; margin-bottom:15px;">Secure the Mother Node</h3>
                <button class="btn btn-primary" style="width:100%; padding:15px;" onclick="alert('Staking Contract Anchored.')">STAKE $PRN</button>
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
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin:0;">Switch Wallet</h2>
            </div>
            
            ${WALLETS.map((w, i) => `
                <div onclick="switchWallet(${i})" style="background:${i === currentWalletIndex ? '#1a1122' : '#111'}; border:1px solid ${i === currentWalletIndex ? '#7B35D4' : '#222'}; padding:20px; border-radius:18px; margin-bottom:15px; cursor:pointer;">
                    <div style="font-weight:900; color:white;">${w.name}</div>
                    <div style="color:#7B35D4; font-size:0.7rem;">${w.handle}</div>
                </div>
            `).join('')}
            
            <button class="btn btn-outline" style="width:100%; padding:15px; margin-top:20px;" onclick="alert('New Node Key-Pair Generated.')">+ CREATE NEW WALLET</button>
        </div>
    `;
}

function switchWallet(index) {
    currentWalletIndex = index;
    renderAssetsView();
}

function renderSettingsView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin-bottom:25px;">Sovereign Security</h2>
            <div style="background:#111; border-radius:20px; overflow:hidden;">
                <div class="settings-item">
                    <span style="font-size:0.75rem; color:white;">Developer Mode</span>
                    <label class="switch">
                        <input type="checkbox" ${developerMode ? 'checked' : ''} onchange="toggleDevMode()">
                        <span class="slider round"></span>
                    </label>
                </div>
                <div class="settings-item" onclick="alert('Hardware Bridge Initialized.')">
                    <span style="font-size:0.75rem; color:white;">Connect Hardware Wallet</span>
                </div>
                <div class="settings-item" onclick="window.open('https://alexa.amazon.com')">
                    <span style="font-size:0.75rem; color:white;">Link Alexa Neural Voice</span>
                </div>
            </div>
        </div>
    `;
}

function toggleDevMode() {
    developerMode = !developerMode;
    alert(`Developer Mode: ${developerMode ? 'ENABLED' : 'DISABLED'}`);
}

async function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white;">Sovereign Vault</h2>
                <button class="btn btn-primary" style="padding:8px 15px; font-size:0.5rem;" onclick="document.getElementById('vault-up-core').click()">+ ADD ASSET</button>
            </div>
            <div id="vault-items-grid-core" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;"></div>
        </div>
    `;
    try {
        const resp = await fetch('https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/vault_manifest.json');
        const data = await resp.json();
        document.getElementById('vault-items-grid-core').innerHTML = data.map(item => `
            <div style="background:#111; border:1px solid rgba(255,255,255,0.03); padding:15px; border-radius:20px; text-align:center; cursor:pointer;" onclick="window.open('${item.url}')">
                <div style="font-size:1.8rem; margin-bottom:10px;">${item.type.includes('image') ? '🖼️' : '📄'}</div>
                <div style="font-size:0.55rem; font-weight:800; color:#fff;">${item.name}</div>
            </div>
        `).join('');
    } catch(e) {
        document.getElementById('vault-items-grid-core').innerHTML = '<p style="color:#555; font-size:0.6rem;">Vault Offline.</p>';
    }
}

function renderEmpireHub() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin-bottom:20px;">Empire Hub</h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                ${EMPIRE_NODES.map(node => `
                    <a href="${node.url}" style="background:#111; border:1px solid rgba(255,255,255,0.03); padding:20px; border-radius:22px; text-align:center; text-decoration:none; color:white; display:block;">
                        <img src="${node.logo}" style="width:45px; height:45px; border-radius:50%; border:2px solid #7B35D4; margin-bottom:12px;">
                        <div style="font-size:0.65rem; font-weight:900;">${node.name}</div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
}

function switchWalletTabCore(tab) {
    const tabs = ['assets', 'vault', 'shop', 'sync'];
    tabs.forEach(t => {
        const b = document.getElementById('tab-' + t);
        if(b) { b.style.color = '#555'; b.style.borderTop = 'none'; b.style.background = 'none'; }
    });
    const active = document.getElementById('tab-' + tab);
    if(active) { active.style.color = '#7B35D4'; active.style.borderTop = '3px solid #7B35D4'; active.style.background = 'rgba(123,53,212,0.02)'; }
    if(tab === 'assets') renderAssetsView();
    if(tab === 'vault') renderVaultView();
    if(tab === 'shop') renderEmpireHub();
    if(tab === 'sync') renderSettingsView();
}

// Global Styles
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
