
/* PRISCION WALLET CORE v5.2.0-STABLE */
const DET_CONFIG = { ADA_USDT: 0.44, PRN_ADA: 5.8 };
const ASSETS = [
    { id: 'prn', name: 'PRISCION', symbol: 'PRN', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/prn_coin.png', balance: 2540.00 },
    { id: 'ada', name: 'CARDANO', symbol: 'ADA', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/ada_coin.png', balance: 38.00 },
    { id: 'jlo', name: 'JELLO', symbol: 'JLO', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/jlo_coin.png', balance: 0.00 },
    { id: 'musd', name: 'MUSTARD', symbol: 'MUSD', logo: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/coins/musd_coin.png', balance: 0.00 }
];
let WALLETS = JSON.parse(localStorage.getItem('prn_wallets')) || [
    { name: 'Mother Node', handle: '.pri', pfp: 'https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png' }
];
function initializeWallet(c) {
    const d = document.getElementById(c);
    if(!d) return;
    d.innerHTML = '<div id="wallet-main-view" style="height:100%;background:#000;"></div>';
    renderAssetsView();
}
function renderAssetsView() {
    const v = document.getElementById('wallet-main-view');
    const u = ASSETS[1].balance * DET_CONFIG.ADA_USDT;
    v.innerHTML = '<div style="padding:30px;color:white;font-family:sans-serif;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;">' +
            '<div style="width:45px;height:45px;background:linear-gradient(135deg,#7B35D4,#E0AAFF);border-radius:14px;display:flex;align-items:center;justify-content:center;"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png" style="width:25px;"></div>' +
            '<div style="text-align:right;"><div style="font-size:0.9rem;font-weight:900;">' + WALLETS[0].handle + '</div></div>' +
        '</div>' +
        '<div style="background:#111;padding:30px;border-radius:30px;margin-bottom:30px;">' +
            '<div style="font-size:0.6rem;opacity:0.5;">TOTAL ASSETS</div>' +
            '<div style="font-size:2.5rem;font-weight:900;">$' + u.toFixed(2) + '</div>' +
            '<div style="display:flex;gap:10px;margin-top:20px;">' +
                '<button onclick="renderReceiveView()" style="flex:1;padding:12px;border-radius:12px;border:none;font-weight:900;cursor:pointer;">SEND</button>' +
                '<button onclick="renderReceiveView()" style="flex:1;padding:12px;border-radius:12px;border:none;font-weight:900;cursor:pointer;">RECEIVE</button>' +
            '</div>' +
        '</div>' +
        ASSETS.map(a => '<div style="display:flex;justify-content:space-between;padding:15px;background:#0A0A0A;border-radius:15px;margin-bottom:10px;"><div>' + a.symbol + '</div><div>' + a.balance + '</div></div>').join('') +
    '</div>';
}
function renderReceiveView() {
    const v = document.getElementById('wallet-main-view');
    v.innerHTML = '<div style="padding:30px;color:white;text-align:center;"><h3>Receive</h3><div style="background:white;padding:20px;display:inline-block;border-radius:20px;margin:20px 0;"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=addr1q8...prisca" style="width:150px;"></div><p style="font-size:0.6rem;color:#666;">addr1q8...prisca</p><button onclick="renderAssetsView()" style="margin-top:20px;padding:12px 30px;background:#7B35D4;color:white;border:none;border-radius:12px;cursor:pointer;">BACK</button></div>';
}
function navigateToSovereignNode(h) { window.location.href = "/" + h.replace("$","").replace(".pri","") + "/"; }
window.addEventListener("load", () => { if(document.getElementById("sidebar")) initializeWallet("sidebar"); });
