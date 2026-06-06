/* Sovereign Wallet Core v5.0.0 [High-Fidelity Evolution] */

const WALLETS = [
    { name: 'Mother Node', handle: '$prisca.prn', address: 'addr1q8...prisca' },
    { name: 'Business Node', handle: '$priscion.prn', address: 'addr1q9...priscion' }
];

let currentWalletIndex = 0;

const ASSETS_DATA = [
    { id: 'prn', name: 'PRISCION ($PRN)', balance: '2,540.00', usd: '$2,540.00', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/priscion_primary_small.jpg' },
    { id: 'nrl', name: 'NEURAL ($NRL)', balance: '15,000', usd: '$15,000', logo: 'https://drive.google.com/uc?export=view&id=1To_XBjrXDO6ZRoQ2YzTleweTg6sEHgOL' },
    { id: 'atlr', name: 'ATELIA ($ATLR)', balance: '82,400', usd: '$2,472.00', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/atelia_logo.webp' },
    { id: 'musd', name: 'MUSTARD ($MUSD)', balance: '867.85', usd: '$867.85', logo: 'https://drive.google.com/uc?export=view&id=1RJfigGY8p5kg0-4WV8_DExrDd4Hj2mtz' }
];

const EMPIRE_NODES = [
    { name: 'ATELIA', handle: '$atelia.prn', url: '/ateliagaming/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/atelia_logo.webp', icon: '🎮' },
    { name: 'DREAMING', handle: '$dreaming.prn', url: '/dreaminganime/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/dreaming_logo.jpg', icon: '⛩️' },
    { name: 'RIDDIIM', handle: '$riddiim.prn', url: '/riddiim/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/riddiim_logo.png', icon: '🎵' },
    { name: 'CALALLOO', handle: '$calalloo.prn', url: '/calalloo/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/calalloo_logo.png', icon: '🍲' },
    { name: 'NURASEN', handle: '$nurasen.prn', url: '/nurasen/', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/nurasen_icon.jpg', icon: '🛡️' },
    { name: 'VERDANT', handle: '$verdant.prn', url: '/verdantco/', icon: '🌱' },
    { name: 'GLOW', handle: '$glow.prn', url: '/glowprotocol/', icon: '🧴' },
    { name: 'SOLE', handle: '$sole.prn', url: '/soleprestige/', icon: '👟' },
    { name: 'ESSENCE', handle: '$essence.prn', url: '/essenceelite/', icon: '✨' },
    { name: 'AUTODROME', handle: '$autodrome.prn', url: '/theautodrome/', icon: '🏎️' },
    { name: 'PEAK FIT', handle: '$peakfit.prn', url: '/peakfit/', icon: '⚡' },
    { name: 'ESCAPIST', handle: '$escapist.prn', url: '/theescapist/', icon: '🏝️' },
    { name: 'TECH SCOUT', handle: '$techscout.prn', url: '/techscout/', icon: '🔭' },
    { name: 'WATCHLIST', handle: '$watchlist.prn', url: '/thewatchlist/', icon: '⌚' },
    { name: 'PRIME LAND', handle: '$primeland.prn', url: '/primelandnetwork/', icon: '🏢' },
    { name: 'QUIET LUXURY', handle: '$quietluxury.prn', url: '/quietluxury/', icon: '🛋️' },
    { name: 'COUTURE', handle: '$couture.prn', url: '/couturegallery/', icon: '👜' },
    { name: 'PAW VAULT', handle: '$pawvault.prn', url: '/pawvault/', icon: '🐾' },
    { name: 'PANTRIQ', handle: '$pantriq.prn', url: '/pantriq/', icon: '🍳' },
    { name: 'SHELFLY', handle: '$shelfly.prn', url: '/shelfly/', icon: '📚' },
    { name: 'DESKWELL', handle: '$deskwell.prn', url: '/deskwell/', icon: '🪑' },
    { name: 'GEN PLAY', handle: '$genplay.prn', url: '/thegenplay/', icon: '🧩' },
    { name: 'DUMPLING', handle: '$dumpling.prn', url: '/mybabydumpling/', icon: '👶' }
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

function renderOnboarding(sidebar) {
    const content = sidebar.querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding:60px 25px;">
            <div class="hologram-glow" style="width:100px; height:100px; margin:0 auto 30px; border-radius:50%; background:url('https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/priscion_primary_small.jpg') center/cover;"></div>
            <h2 style="font-family:'Playfair Display'; margin-bottom:15px; color:white; font-size:1.8rem;">Sovereign Identity</h2>
            <p style="color:#888; font-size:0.8rem; margin-bottom:40px;">Initialize your neural handshake on the Priscion Ledger.</p>
            <button onclick="startWalletCreation()" class="btn btn-primary" style="width:100%; margin-bottom:15px; padding:18px;">CREATE IDENTITY</button>
            <button onclick="startRestore()" class="btn btn-outline" style="width:100%; padding:18px;">RESTORE VAULT</button>
        </div>
    `;
}

function startWalletCreation() {
    const seed = "nebula orbit galaxy pulse neural ledger sovereign mustard architect high fidelity empire";
    const content = document.getElementById('sidebar').querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding:30px 20px;">
            <h3 style="margin-bottom:20px; color:white;">Neural Seed Phrase</h3>
            <div style="background:#050505; padding:25px; border-radius:20px; border:1px solid #7B35D4; font-family:'Space Mono'; font-size:0.75rem; display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:30px; text-align:left;">
                ${seed.split(' ').map((w, i) => `<span style="color:#aaa;"><b style="color:#7B35D4;">${i+1}.</b> ${w}</span>`).join('')}
            </div>
            <input type="password" id="new-pin" placeholder="Create 4-Digit PIN" maxlength="4" style="width:100%; padding:18px; background:#111; border:1px solid #222; border-radius:15px; color:white; text-align:center; margin-bottom:25px; font-size:1.5rem;">
            <button onclick="finalizeCreation('${seed}')" class="btn btn-primary" style="width:100%; padding:18px;">FINALIZE IDENTITY</button>
        </div>
    `;
}

function finalizeCreation(seed) {
    const pin = document.getElementById('new-pin').value;
    if(pin.length < 4) { alert("PIN must be 4 digits."); return; }
    localStorage.setItem('priscion_pin', pin);
    localStorage.setItem('priscion_seed', seed);
    sessionStorage.setItem('prn_sess', '1');
    renderWalletMain(document.getElementById('sidebar'));
}

function renderAuth(sidebar) {
    const content = sidebar.querySelector('.sidebar-content');
    content.innerHTML = `
        <div style="text-align:center; padding:80px 30px;">
            <div class="hologram-glow" style="width:80px; height:80px; margin:0 auto 40px; border-radius:50%; background:url('https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/logos/priscion_primary_small.jpg') center/cover; border:2px solid #7B35D4;"></div>
            <h2 style="font-family:'Playfair Display'; margin-bottom:40px; color:white;">Unlock Vault</h2>
            <input type="password" id="auth-pin" placeholder="••••" maxlength="4" style="width:100%; padding:20px; background:#111; border:1px solid #222; border-radius:15px; color:white; text-align:center; margin-bottom:40px; font-size:2rem; letter-spacing:10px;">
            <button onclick="checkAuthPin()" class="btn btn-primary" style="width:100%; padding:18px;">UNLOCK</button>
        </div>
    `;
}

function checkAuthPin() {
    if(document.getElementById('auth-pin').value === localStorage.getItem('priscion_pin')) {
        sessionStorage.setItem('prn_sess', '1');
        renderWalletMain(document.getElementById('sidebar'));
    } else { alert("Handshake Failed. Incorrect PIN."); }
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
                <div style="display:flex; align-items:center; gap:15px;">
                    <div onclick="openVaultForPFP()" style="width:55px; height:55px; border-radius:50%; border:2px solid #7B35D4; overflow:hidden; cursor:pointer; background:#000;">
                        <img src="${pfp}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div>
                        <div style="font-weight:900; font-size:1.1rem; color:white; letter-spacing:0.5px;">${wallet.handle}</div>
                        <div style="font-size:0.5rem; color:#7B35D4; text-transform:uppercase; font-weight:800;">${wallet.name} Active</div>
                    </div>
                </div>
                <div onclick="renderMultiWalletView()" style="cursor:pointer; background:#111; padding:8px; border-radius:10px; border:1px solid #222;">
                    🔄
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
                <img src="${a.logo}" style="width:32px; height:32px; border-radius:50%;">
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
                    <!-- QR Placeholder -->
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
                            <option>SNEK</option>
                        </select>
                    </div>
                </div>
                
                <button class="btn btn-primary" style="width:100%; padding:18px;" onclick="alert('Swap Executed on PRX (Priscion Exchange)')">SWAP ASSETS</button>
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
                <h3 style="color:white; font-size:0.9rem; margin-bottom:15px;">Participate in Governance</h3>
                <p style="color:#666; font-size:0.65rem; margin-bottom:20px;">Lock your $PRN to secure the Mother Node and earn $NRL rewards.</p>
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

async function renderVaultView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white;">Sovereign Vault</h2>
                <button class="btn btn-primary" style="padding:8px 15px; font-size:0.5rem;" onclick="document.getElementById('vault-up-core').click()">+ ADD ASSET</button>
            </div>
            <input type="file" id="vault-up-core" style="display:none;" onchange="alert('Asset Minted to Sovereign Ledger.')">
            
            <div id="vault-items-grid-core" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;"></div>
        </div>
    `;
    try {
        const resp = await fetch('https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/vault_manifest.json');
        const data = await resp.json();
        document.getElementById('vault-items-grid-core').innerHTML = data.map(item => `
            <div style="background:#111; border:1px solid rgba(255,255,255,0.03); padding:15px; border-radius:20px; text-align:center; cursor:pointer;" onclick="window.open('${item.url}')">
                <div style="font-size:1.8rem; margin-bottom:10px;">${item.type.includes('image') ? '🖼️' : (item.type.includes('pdf') ? '🪪' : '📄')}</div>
                <div style="font-size:0.55rem; font-weight:800; color:#fff;">${item.name}</div>
            </div>
        `).join('');
    } catch(e) {
        document.getElementById('vault-items-grid-core').innerHTML = '<p style="color:#555; font-size:0.6rem; grid-column:span 2; text-align:center;">Vault Access Protocol Offline.</p>';
    }
}

function renderEmpireHub() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px; overflow-y:auto; height:100%;">
            <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin-bottom:20px;">Empire Hub</h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                ${EMPIRE_NODES.map(node => `
                    <a href="${node.url}" style="background:#111; border:1px solid rgba(255,255,255,0.03); padding:20px; border-radius:22px; text-align:center; text-decoration:none; color:white; display:block;">
                        ${node.logo ? `<img src="${node.logo}" style="width:45px; height:45px; border-radius:50%; border:2px solid #7B35D4; margin-bottom:12px;">` : `<div style="font-size:2rem; margin-bottom:12px;">${node.icon}</div>`}
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

function renderSettingsView() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div style="padding:20px;">
            <h2 style="font-family:'Playfair Display'; font-size:1.4rem; color:white; margin-bottom:25px;">Sovereign Security</h2>
            <div style="background:#111; border-radius:20px; overflow:hidden;">
                <div class="settings-item" onclick="alert('Hardware Bridge Initialized.')">
                    <span style="font-size:0.75rem; color:white;">Connect Ledger Hardware</span>
                    <span style="color:#7B35D4; font-size:0.6rem;">OFFLINE</span>
                </div>
                <div class="settings-item" onclick="alert('Nurasen Shield Active')">
                    <span style="font-size:0.75rem; color:white;">Neural Firewall</span>
                    <span style="color:#00ff88; font-size:0.6rem;">ACTIVE</span>
                </div>
                <div class="settings-item" style="border-bottom:none;" onclick="alert('Identity Reset Initiated')">
                    <span style="font-size:0.75rem; color:#ff4444;">Wipe All Wallets</span>
                </div>
            </div>
        </div>
    `;
}

function openVaultForPFP() {
    switchWalletTabCore('vault');
}

// Styles
const style = document.createElement('style');
style.textContent = `
    .btn-action { flex:1; background:rgba(255,255,255,0.1); border:none; color:white; padding:12px; border-radius:12px; font-size:0.5rem; font-weight:800; cursor:pointer; transition:0.2s; }
    .btn-action:hover { background:rgba(255,255,255,0.2); }
    .settings-item { padding:20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #222; cursor:pointer; }
    .settings-item:hover { background:rgba(255,255,255,0.02); }
    .hologram-glow { box-shadow:0 0 20px rgba(123,53,212,0.5); animation:hologramPulse 3s infinite ease-in-out; }
    @keyframes hologramPulse { 0% { transform:scale(1); opacity:0.8; } 50% { transform:scale(1.05); opacity:1; } 100% { transform:scale(1); opacity:0.8; } }
`;
document.head.appendChild(style);
