/* 
   PRISCION WALLET CORE v4.4-ARCHITECT
   Deterministic Integrity Update
*/

const DET_CONFIG = {
    PRN_USDT_RATE: 0.00, // NO_SIMULATION
    ADA_USDT_RATE: 0.44, // Real-world approximate
    TTD_RATE: 6.75
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
    container.innerHTML = '<div id="wallet-main-view"></div>';
    renderAssetsView();
}

function renderAssetsView() {
    const view = document.getElementById('wallet-main-view');
    if(!view) return;
    const wallet = WALLETS[0];
    const adaValueUSD = wallet.ada * DET_CONFIG.ADA_USDT_RATE;

    view.innerHTML = `
        <div style="padding:20px; color:white; font-family: -apple-system, sans-serif;">
            <div style="text-align:center; margin-bottom:30px;">
                <div style="font-size:0.7rem; color:#888; text-transform:uppercase;">Sovereign Balance</div>
                <div style="font-size:2.5rem; font-weight:700;">$${adaValueUSD.toFixed(2)} <span style="font-size:1rem; color:#888;">USD</span></div>
            </div>

            <div style="display:flex; justify-content:center; gap:20px; margin-bottom:35px;">
                <div class="meta-action">Buy</div>
                <div class="meta-action">Send</div>
                <div class="meta-action">Swap</div>
                <div class="meta-action">Bridge</div>
            </div>

            <div class="token-row">
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png" style="width:32px;">
                    <div><div style="font-weight:600;">ADA</div><div style="font-size:0.7rem; color:#888;">$${DET_CONFIG.ADA_USDT_RATE}</div></div>
                </div>
                <div style="text-align:right;"><div style="font-weight:600;">${wallet.ada} ADA</div><div style="font-size:0.7rem; color:#888;">$${adaValueUSD.toFixed(2)}</div></div>
            </div>

            <div class="token-row">
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png" style="width:32px;">
                    <div><div style="font-weight:600;">PRN</div><div style="font-size:0.7rem; color:#888;">Sovereign Ledger</div></div>
                </div>
                <div style="text-align:right;"><div style="font-weight:600;">${wallet.balance} PRN</div><div style="font-size:0.7rem; color:#7B35D4;">AWAITING_SYNC</div></div>
            </div>
        </div>
    `;
}

const style = document.createElement('style');
style.textContent = '.token-row { display:flex; justify-content:space-between; align-items:center; padding:15px 0; border-bottom:1px solid #222; } .meta-action { background:#7B35D4; color:white; padding:10px 15px; border-radius:20px; font-size:0.8rem; font-weight:600; cursor:pointer; }';
document.head.appendChild(style);

window.addEventListener('load', () => {
    initializeWallet('sidebar');
});
