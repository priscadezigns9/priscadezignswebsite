/* 
   PRISCION WALLET CORE v5.0-HUGE
   [Architect Protocol: 2026 Luxury Aesthetic]
*/

const DET_CONFIG = { ADA_USDT: 0.44, PRN_ADA: 5.8 };

const ASSETS = [
    { id: 'prn', name: 'PRISCION', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png', balance: 2540.00 },
    { id: 'ada', name: 'CARDANO', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38.00 },
    { id: 'jlo', name: 'JELLO', symbol: 'JLO', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/jlo_coin.png', balance: 0.00 }
];

function initializeWallet(containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '<div id="wallet-main-view"></div>';
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    const totalUSD = ASSETS[1].balance * DET_CONFIG.ADA_USDT;
    
    view.innerHTML = `
        <div class="view-container">
            <!-- LUXURY HEADER -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:40px;">
                <div style="width:45px; height:45px; background:linear-gradient(135deg, #7B35D4, #E0AAFF); border-radius:14px; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 20px rgba(123,53,212,0.3);">
                    <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png" style="width:25px;">
                </div>
                <div style="text-align:right;">
                    <div style="font-size:0.5rem; letter-spacing:2px; color:#555; font-weight:900;">SECURE NODE</div>
                    <div style="font-size:0.9rem; font-weight:900; color:white;">$prisca.pri</div>
                </div>
            </div>

            <!-- PORTOFOLIO CARD -->
            <div class="luxury-card">
                <div style="font-size:0.6rem; opacity:0.6; letter-spacing:1px;">TOTAL ASSETS</div>
                <div style="font-size:2.8rem; font-weight:900; margin:5px 0;">$${totalUSD.toFixed(2)}</div>
                <div style="display:flex; gap:12px; margin-top:25px;">
                    <button class="huge-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg><span>SEND</span></button>
                    <button class="huge-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5m-7 7 7-7 7 7"/></svg><span>RECEIVE</span></button>
                </div>
            </div>

            <!-- ASSET LIST -->
            <div style="flex:1; overflow-y:auto;">
                <h4 style="font-size:0.55rem; color:#333; letter-spacing:3px; margin-bottom:20px; font-weight:900;">PORTFOLIO</h4>
                ${ASSETS.map(a => `
                    <div class="huge-asset-row">
                        <div style="display:flex; align-items:center; gap:15px;">
                            <div class="huge-icon-box"><img src="${a.logo}" style="width:22px;"></div>
                            <div>
                                <div style="font-weight:900; font-size:0.85rem; color:white;">${a.symbol}</div>
                                <div style="font-size:0.55rem; color:#444; font-weight:700;">${a.name}</div>
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-weight:900; font-size:0.9rem; color:white;">${a.balance.toLocaleString()}</div>
                            <div style="font-size:0.55rem; color:#7B35D4;">LEDGER SYNCED</div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- MODERN HUGEICON NAV -->
            <div class="huge-nav">
                <button class="huge-nav-btn active"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></button>
                <button class="huge-nav-btn" onclick="renderHubView()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></button>
                <button class="huge-nav-btn" onclick="renderVaultView()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></button>
                <button class="huge-nav-btn" onclick="renderNeuralTerminal()"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></button>
            </div>
        </div>
    `;
}

// INJECT STYLES
const style = document.createElement('style');
style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    #wallet-main-view { font-family: 'Inter', sans-serif; background:#000; height:100%; color:white; }
    .view-container { padding:30px; display:flex; flex-direction:column; height:100%; box-sizing:border-box; }
    .luxury-card { background: linear-gradient(135deg, #111, #050505); border: 1px solid #1a1a1a; padding:35px; border-radius:35px; margin-bottom:40px; }
    .huge-btn { flex:1; background: #fff; color:#000; border:none; padding:12px; border-radius:18px; font-weight:900; font-size:0.65rem; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; }
    .huge-asset-row { display:flex; justify-content:space-between; align-items:center; padding:20px; background:#080808; border:1px solid #111; border-radius:24px; margin-bottom:15px; }
    .huge-icon-box { width:45px; height:45px; background:#111; border-radius:16px; display:flex; align-items:center; justify-content:center; border:1px solid #1a1a1a; }
    .huge-nav { display:flex; justify-content:space-around; background:#0F0F0F; padding:18px; border-radius:28px; border:1px solid #1a1a1a; margin-top:auto; }
    .huge-nav-btn { background:none; border:none; color:#444; cursor:pointer; transition:0.3s; }
    .huge-nav-btn.active { color:#fff; filter: drop-shadow(0 0 8px rgba(255,255,255,0.4)); }
`;
document.head.appendChild(style);

window.addEventListener('load', () => { initializeWallet('sidebar'); });

function navigateToSovereignNode(h) { 
    const p = h.replace('$','').replace('.pri','');
    window.location.href = '/'+p+'/';
}

