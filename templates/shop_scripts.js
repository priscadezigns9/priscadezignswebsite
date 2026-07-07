document.querySelectorAll(".faq-q").forEach(function(btn){btn.addEventListener("click",function(){var item=btn.closest(".faq-item");var isOpen=item.classList.contains("open");document.querySelectorAll(".faq-item").forEach(function(i){i.classList.remove("open");i.querySelector(".faq-q").setAttribute("aria-expanded","false");});if(!isOpen){item.classList.add("open");btn.setAttribute("aria-expanded","true");}});});

(function(){
 var inp = document.getElementById('template-search');
 var clr = document.getElementById('search-clear');
 var pills = document.querySelectorAll('.cat-pill');
 var grid = document.getElementById('t-grid');
 var noRes = document.getElementById('no-results');
 var noTrm = document.getElementById('no-results-term');
 var catMap = {
 'coach': ['coach','trainer','fitness','wellness','mentor','speaker','author','opus','persona','velocity'],
 'consultant': ['consultant','advisor','business','professional','consult','lawyer','accountant','services'],
 'doctor': ['doctor','health','medical','wellness','spa','yoga','meditation','zen','therapist','holistic'],
 'artist': ['artist','creative','craft','maker','painter','illustrator','portfolio','folio','flora','floral','botanical','garden'],
 'fashion': ['fashion','luxury','editorial','boutique','clothing','style','noir','luxe','marquee','optica','atelier','monsieur'],
 'food': ['food','beverage','restaurant','cafe','culinary','catering','chef','flora','floral','botanical'],
 'tech': ['tech','startup','saas','app','launch','software','forge','builder'],
 'beauty': ['beauty','skincare','glow','aura','spa','cosmetics','coral','cream'],
 'anime': ['anime','media','entertainment','reel','echo','podcast','music','tidal'],
 'pet': ['pet','animals','veterinary','grooming','paws','dog','cat'],
 'photographer': ['photographer','film','reel','portfolio','folio','video','filmmaker','videographer'],
 'personal-brand':['personal brand','persona','opus','author','speaker','blogger','influencer','brand'],
 'ecommerce': ['ecommerce','online store','craft','luxe','glow','paws','optica','atelier','monsieur'],
 };
 var activeCat = 'all';
 var searchQ = '';
 function text(card){
 var n = card.querySelector('[data-search]');
 var u = card.querySelector('.t-use');
 return ((n ? n.getAttribute('data-search') : '') + ' ' +
 (n ? n.textContent : '') + ' ' +
 (u ? u.textContent : '')).toLowerCase();
 }
 function matchCat(card){
 if(activeCat === 'all') return true;
 var kws = catMap[activeCat] || [];
 var t = text(card);
 return kws.some(function(k){ return t.indexOf(k) > -1; });
 }
 function matchQ(card){
 if(!searchQ) return true;
 return text(card).indexOf(searchQ) > -1;
 }
 function run(){
 var cards = grid.querySelectorAll('.t-card');
 var vis = 0;
 cards.forEach(function(c){
 var show = matchCat(c) && matchQ(c);
 c.style.display = show ? '' : 'none';
 if(show) vis++;
 });
 noRes.classList.toggle('vis', vis === 0);
 if(vis === 0) noTrm.textContent = '"' + (searchQ || activeCat) + '"';
 }
 inp.addEventListener('input', function(){
 searchQ = this.value.trim().toLowerCase();
 activeCat = 'all';
 pills.forEach(function(p){ p.classList.remove('active'); });
 document.querySelector('[data-cat="all"]').classList.add('active');
 clr.classList.toggle('vis', searchQ.length > 0);
 run();
 });
 clr.addEventListener('click', function(){
 inp.value = ''; searchQ = '';
 clr.classList.remove('vis');
 run(); inp.focus();
 });
 pills.forEach(function(pill){
 pill.addEventListener('click', function(){
 activeCat = this.getAttribute('data-cat');
 searchQ = ''; inp.value = '';
 clr.classList.remove('vis');
 pills.forEach(function(p){ p.classList.remove('active'); });
 this.classList.add('active');
 run();
 });
 });
})();

var cart = {
 base: null, 
 addons: { copy: false, chatbot: false }
};
var PRICES = {
 website: { setup: 149.99, mo: 19.99, label: 'Template Website' },
 store: { setup: 249.99, mo: 34.99, label: 'Micro Store' },
 copy: { setup: 49.99, mo: 0, moNote: '$4.99 per update' },
 chatbot: { setup: 299.99, mo: 49.99 }
};
function addTemplate(name, type) {
 type = type || 'website';
 var p = PRICES[type];
 if (cart.base && cart.base.name === name && cart.base.type === type) {
 openCart(); return;
 }
 cart.addons.copy = false;
 cart.addons.chatbot = false;
 cart.base = { name: name, type: type, setup: p.setup, mo: p.mo };
 renderCart();
 updateAllButtons();
 openCart();
}
function removeBase() {
 var oldName = cart.base ? cart.base.name : null;
 cart.base = null;
 cart.addons.copy = false;
 cart.addons.chatbot = false;
 renderCart();
 updateAllButtons();
 if (oldName) updateTemplateBtn(oldName, false);
}
function toggleAddon(id) {
 if (!cart.base) {
   // If no template selected, uncheck it and bail
   var inp = document.getElementById('check-' + id + '-input');
   if (inp) inp.checked = false;
   return;
 }
 var inp = document.getElementById('check-' + id + '-input');
 cart.addons[id] = inp ? inp.checked : !cart.addons[id];
 renderCart();
 updateAddonCards();
}
function renderCart() {
 var hasBase = !!cart.base;
 document.getElementById('cart-empty-msg').style.display = hasBase ? 'none' : '';
 document.getElementById('cart-base-block').className = hasBase ? 'vis' : '';
 document.getElementById('cart-addons-block').className = hasBase ? 'vis' : '';
 document.getElementById('cart-base-block').style.display = hasBase ? '' : 'none';
 document.getElementById('cart-addons-block').style.display= hasBase ? '' : 'none';
 if (!hasBase) {
 document.getElementById('cart-setup-total').textContent = '$0.00';
 document.getElementById('cart-mo-total').textContent = '$0.00 / mo';
 var co = document.getElementById('cart-checkout');
 co.classList.add('disabled'); co.href = '#';
 var chk = document.getElementById('cd-agree-chk');
 if (chk) { chk.checked = false; chk.disabled = true; }
 var step1 = document.getElementById('cd-step1');
 var step2 = document.getElementById('cd-step2');
 var readBtn = document.getElementById('cd-read-btn');
 if (step1) step1.classList.remove('done');
 if (step2) step2.classList.remove('unlocked');
 if (readBtn) { readBtn.classList.remove('done'); readBtn.textContent = 'Read Terms'; }
 updateBadge();
 return;
 }
 var p = PRICES[cart.base.type];
 document.getElementById('cb-name').textContent = cart.base.name;
 document.getElementById('cb-type-label').textContent = p.label + ' · $' + p.mo.toFixed(2) + '/mo';
 document.getElementById('cb-setup-price').textContent = '$' + p.setup.toFixed(2);
 document.getElementById('cb-mo-price').textContent = 'setup';
 updateAddonCards();
 var totalSetup = cart.base.setup;
 var totalMo = cart.base.mo;
 if (cart.addons.copy) { totalSetup += PRICES.copy.setup; totalMo += PRICES.copy.mo; }
 if (cart.addons.chatbot) { totalSetup += PRICES.chatbot.setup; totalMo += PRICES.chatbot.mo; }
 document.getElementById('cart-setup-total').textContent = '$' + totalSetup.toFixed(2);
 document.getElementById('cart-mo-total').textContent = '$' + totalMo.toFixed(2) + ' / mo';
 var lines = [];
 lines.push('Hi! I%27d like to place an order:%0A');
 lines.push('%E2%9C%85 ' + encodeURIComponent(cart.base.name) + ' (' + encodeURIComponent(p.label) + ') %E2%80%94 $' + cart.base.setup.toFixed(2) + ' setup %2B $' + cart.base.mo.toFixed(2) + '%2Fmo');
 if (cart.addons.copy) lines.push('%E2%9C%85 Copywriting Add-On %E2%80%94 %2B$49.99 setup');
 if (cart.addons.chatbot) lines.push('%E2%9C%85 AI Chatbot Add-On %E2%80%94 %2B$299.99 setup %2B $49.99%2Fmo');
 lines.push('%0A%E2%9C%85 I have read and agree to the Terms of Use %26 service agreement');
 lines.push('%0ASetup Total: $' + totalSetup.toFixed(2));
 lines.push('Monthly Total: $' + totalMo.toFixed(2) + '%2Fmo');
 var msg = lines.join('%0A');
 // ── PayPal button — paypal.me/priscadezigns9/AMOUNT sends directly to priscadezigns9@gmail.com ──
 var paypalBtn = document.getElementById('cart-paypal');
 if (paypalBtn) paypalBtn.href = 'https://www.paypal.me/priscadezigns9/' + totalSetup.toFixed(2);
 // ── Bank Transfer button → WhatsApp with full order + request for banking info ──
 var orderLines = [];
 orderLines.push('Hi%21%20I%27d%20like%20to%20place%20an%20order%20via%20bank%20transfer%3A%0A');
 orderLines.push('%F0%9F%9B%92%20' + encodeURIComponent(cart.base.name) + '%20%E2%80%94%20' + encodeURIComponent(p.label));
 if (cart.addons.copy) orderLines.push('%E2%9E%95%20Copywriting%20Add-On');
 if (cart.addons.chatbot) orderLines.push('%E2%9E%95%20AI%20Chatbot%20Add-On');
 orderLines.push('%0A%F0%9F%92%B3%20Setup%20Total%3A%20%24' + totalSetup.toFixed(2));
 orderLines.push('%F0%9F%93%85%20Monthly%3A%20%24' + totalMo.toFixed(2) + '%2Fmo');
 orderLines.push('%0ACould%20you%20please%20send%20me%20your%20banking%20details%20so%20I%20can%20complete%20the%20transfer%3F');
 var bankBtn = document.getElementById('cart-bank');
 if (bankBtn) bankBtn.href = 'https://wa.me/18683424101?text=' + orderLines.join('%0A');
 // ── Enable/disable both based on agreement ──
 var agrChk = document.getElementById('cd-agree-chk');
 var btns = [paypalBtn, bankBtn];
 btns.forEach(function(b){ if (!b) return;
   if (agrChk && agrChk.checked && !agrChk.disabled) { b.classList.remove('disabled'); }
   else { b.classList.add('disabled'); b.setAttribute('href','javascript:void(0)'); }
 });
 updateBadge();
}
function updateAddonCards() {
 ['copy','chatbot'].forEach(function(id) {
 var card = document.getElementById('addon-' + id);
 var inp  = document.getElementById('check-' + id + '-input');
 if (cart.addons[id]) {
   card.classList.add('active');
   if(inp) inp.checked = true;
 } else {
   card.classList.remove('active');
   if(inp) inp.checked = false;
 }
 });
}
function updateBadge() {
 var count = (cart.base ? 1 : 0) + (cart.addons.copy ? 1 : 0) + (cart.addons.chatbot ? 1 : 0);
 var badge = document.getElementById('cart-count');
 if (count > 0) { badge.textContent = count; badge.classList.add('vis'); }
 else { badge.classList.remove('vis'); }
}
function updateAllButtons() {
 document.querySelectorAll('.t-add-btn').forEach(function(btn) {
 btn.classList.remove('in-cart');
 btn.textContent = 'Add to Cart';
 });
 if (cart.base) {
 document.querySelectorAll('.t-add-btn').forEach(function(btn) {
 var oc = btn.getAttribute('onclick') || '';
 var m = oc.match(/addTemplate\('([^']+)'/);
 if (m && m[1] === cart.base.name) {
 btn.classList.add('in-cart');
 btn.textContent = '✓ In Cart';
 }
 });
 }
}
function updateTemplateBtn(name, inCart) {
 document.querySelectorAll('.t-add-btn').forEach(function(btn) {
 var oc = btn.getAttribute('onclick') || '';
 var m = oc.match(/addTemplate\('([^']+)'/);
 if (m && m[1] === name) {
 if (inCart) { btn.classList.add('in-cart'); btn.textContent = '✓ In Cart'; }
 else { btn.classList.remove('in-cart'); btn.textContent = 'Add to Cart'; }
 }
 });
}
function openCart() {
 document.getElementById('cart-drawer').classList.add('open');
 document.getElementById('cart-overlay').classList.add('open');
}
function closeCart() {
 document.getElementById('cart-drawer').classList.remove('open');
 document.getElementById('cart-overlay').classList.remove('open');
}
function openTerms() {
 // Open terms in new tab
 window.open('/templates/terms/', '_blank', 'noopener');
 // Mark step 1 done
 var step1 = document.getElementById('cd-step1');
 var readBtn = document.getElementById('cd-read-btn');
 if (step1) step1.classList.add('done');
 if (readBtn) { readBtn.classList.add('done'); readBtn.innerHTML = '&#10003; Terms Opened'; }
 // Unlock step 2
 var step2 = document.getElementById('cd-step2');
 var chk = document.getElementById('cd-agree-chk');
 if (step2) step2.classList.add('unlocked');
 if (chk) chk.disabled = false;
}
function updateAgreement() {
 var chk = document.getElementById('cd-agree-chk');
 if (!chk) return;
 var btns = [document.getElementById('cart-paypal'), document.getElementById('cart-bank')];
 btns.forEach(function(btn){
   if (!btn) return;
   if (chk.checked && !chk.disabled && cart.base) { btn.classList.remove('disabled'); }
   else { btn.classList.add('disabled'); btn.setAttribute('href','javascript:void(0)'); }
 });
}

// ── Payment button click handlers — close cart first, then navigate ──
document.addEventListener('DOMContentLoaded', function() {
 ['cart-paypal','cart-bank'].forEach(function(id) {
   var btn = document.getElementById(id);
   if (!btn) return;
   btn.addEventListener('click', function(e) {
     e.preventDefault();
     if (btn.classList.contains('disabled')) return;
     var dest = btn.getAttribute('href');
     if (!dest || dest === '#') return;
     closeCart();
     setTimeout(function(){ window.open(dest, '_blank', 'noopener'); }, 180);
   });
 });
});
renderCart();

