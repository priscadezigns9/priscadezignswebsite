/* 
   PRISCION WALLET CORE v4.5-GOLD
   Architect Edition: Sovereign Security & Animation Protocol
*/

const DET_CONFIG = {
    PRN_USDT_RATE: 0.00,
    ADA_USDT_RATE: 0.44
};

const WALLETS = [
    { 
        name: 'Mother Node', 
        handle: '$prisca.prn', 
        balance: 2540.00,
        ada: 38.00,
        pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/img/architect_pfp.png'
    }
];

function initializeWallet(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    
    // Create main view if not exists
    let mainView = document.getElementById('wallet-main-view');
    if(!mainView) {
        mainView = document.createElement('div');
        mainView.id = 'wallet-main-view';
        container.appendChild(mainView);
    }

    // Check Security State
    const isLocked = !sessionStorage.getItem('prn_unlocked');
    if(isLocked) {
        renderLockScreen();
    } else {
        renderAssetsView();
    }
}

function renderLockScreen() {
    const view = document.getElementById('wallet-main-view');
    view.innerHTML = `
        <div id="splash-screen" style="position:absolute; top:0; left:0; width:100%; height:100%; background:#000; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:100; animation: fadeOut 1s forwards 2s;">
            <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png" style="width:80px; animation: pulse-3d 2s infinite alternate;">
            <div style="color:#7B35D4; margin-top:20px; letter-spacing:4px; font-weight:900; font-size:0.8rem;">PRISCION</div>
        </div>

        <div style="padding:40px 20px; text-align:center; animation: fadeIn 0.5s 2.5s forwards; opacity:0;">
            <div style="margin-bottom:30px;">
                <img src="${WALLETS[0].pfp}" style="width:60px; height:60px; border-radius:50%; border:2px solid #7B35D4;">
                <div style="color:white; font-weight:900; margin-top:10px;">Welcome Back</div>
                <div style="color:#666; font-size:0.6rem;">${WALLETS[0].handle}</div>
            </div>
            
            <div style="background:#111; border-radius:15px; padding:20px; border:1px solid #222; margin-bottom:20px;">
                <input id="pin-input" type="password" placeholder="ENTER PIN" style="width:100%; background:none; border:none; color:white; text-align:center; font-size:1.5rem; letter-spacing:10px; outline:none;">
            </div>
            
            <button class="btn-action" style="width:100%; padding:15px; background:#7B35D4;" onclick="unlockWallet()">UNLOCK</button>
            <div style="color:#444; font-size:0.5rem; margin-top:20px; cursor:pointer;">Forgot PIN? Use Recovery Phrase</div>
        </div>
    `;
}

function unlockWallet() {
    // For Architect Bypass, any PIN works for now until we set a specific one
    sessionStorage.setItem('prn_unlocked', 'true');
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    const wallet = WALLETS[0];
    const adaValueUSD = wallet.ada * DET_CONFIG.ADA_USDT_RATE;

    view.innerHTML = `
        <div style="padding:20px; animation: fadeIn 0.3s;">
            <!-- VESPR STYLE HEADER -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <img src="${wallet.pfp}" style="width:40px; height:40px; border-radius:50%; border:2px solid #7B35D4; cursor:pointer;" onclick="sessionStorage.removeItem('prn_unlocked'); location.reload();">
                <div style="text-align:right;">
                    <div style="color:#7B35D4; font-size:0.5rem; font-weight:900; text-transform:uppercase;">Mainnet</div>
                    <div style="color:white; font-weight:900; font-size:0.8rem;">$${adaValueUSD.toFixed(2)} USD</div>
                </div>
            </div>

            <div style="background:linear-gradient(135deg, #7B35D4, #4c1d95); padding:30px; border-radius:28px; margin-bottom:30px; box-shadow: 0 15px 35px rgba(123,53,212,0.4);">
                <div style="font-size:0.6rem; text-transform:uppercase; opacity:0.7;">Portfolio Value</div>
                <div style="font-size:2.5rem; font-weight:900;">$${adaValueUSD.toFixed(2)}</div>
                
                <div style="display:flex; gap:10px; margin-top:25px;">
                    <button class="btn-action" style="background:rgba(255,255,255,0.15);">SEND</button>
                    <button class="btn-action" style="background:rgba(255,255,255,0.15);">RECEIVE</button>
                </div>
            </div>

            <div style="margin-bottom:20px;">
                <h4 style="font-size:0.6rem; color:#444; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">Assets</h4>
                <div class="asset-card">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png" style="width:32px;">
                        <div>
                            <div style="font-weight:900; color:white; font-size:0.8rem;">Cardano</div>
                            <div style="font-size:0.55rem; color:#666;">$${DET_CONFIG.ADA_USDT_RATE}</div>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:900; color:white; font-size:0.9rem;">${wallet.ada} ADA</div>
                        <div style="font-size:0.55rem; color:#00FF88;">+$0.05</div>
                    </div>
                </div>
                <div class="asset-card">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png" style="width:32px;">
                        <div>
                            <div style="font-weight:900; color:white; font-size:0.8rem;">Priscion</div>
                            <div style="font-size:0.55rem; color:#666;">Sovereign Token</div>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <div style="font-weight:900; color:white; font-size:0.9rem;">${wallet.balance} PRN</div>
                        <div style="font-size:0.55rem; color:#7B35D4;">AWAITING_ORACLE</div>
                    </div>
                </div>
            </div>

            <!-- TAB BAR -->
            <div style="display:flex; justify-content:space-around; background:#0A0A0A; padding:15px; border-radius:20px; border:1px solid #1a1a1a;">
                <button class="nav-btn active">💰</button>
                <button class="nav-btn">🔄</button>
                <button class="nav-btn">🔒</button>
                <button class="nav-btn">🧠</button>
            </div>
        </div>
    `;
}

// Global Style Injection
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-3d { from { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 5px #7B35D4); } to { transform: scale(1.1) rotate(5deg); filter: drop-shadow(0 0 20px #7B35D4); } }
    @keyframes fadeOut { to { opacity: 0; visibility: hidden; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .btn-action { border:none; color:white; border-radius:12px; font-size:0.7rem; font-weight:900; cursor:pointer; flex:1; padding:12px; transition:0.2s; }
    .btn-action:hover { transform: scale(1.02); }
    .asset-card { display:flex; justify-content:space-between; align-items:center; padding:18px; background:#0F0F0F; border:1px solid #1a1a1a; border-radius:20px; margin-bottom:12px; }
    .nav-btn { background:none; border:none; font-size:1.2rem; cursor:pointer; opacity:0.3; }
    .nav-btn.active { opacity:1; filter: drop-shadow(0 0 5px #7B35D4); }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    const sb = document.getElementById('sidebar');
    if(sb) initializeWallet('sidebar');
});
