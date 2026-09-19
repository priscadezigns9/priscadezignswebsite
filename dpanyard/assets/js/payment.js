function generateRef() { 
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
  let ref = "PYD-"; 
  for(let i=0; i<6; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length)); 
  return ref; 
} 

function openPayModal(plan, price) { 
  const ref = generateRef(); 
  const modalTitle = document.getElementById("modal-plan-name");
  if (modalTitle) modalTitle.textContent = plan + (price ? " — " + price : ""); 
  
  const refBank = document.getElementById("auto-ref-bank");
  const refEth = document.getElementById("auto-ref-eth");
  const refIntl = document.getElementById("auto-ref-intl");
  
  if (refBank) refBank.textContent = ref; 
  if (refEth) refEth.textContent = ref; 
  if (refIntl) refIntl.textContent = ref; 

  if (plan && (plan.includes("Bank") || plan.includes("Personal"))) { togglePay('bank'); }
  else if (plan && (plan.includes("Crypto") || plan.includes("Web3"))) { togglePay('eth'); }
  else { togglePay('intl'); }

  const modal = document.getElementById("payModal");
  if (modal) modal.classList.add("open"); 
} 

function closePayModal() { 
  const modal = document.getElementById("payModal");
  if (modal) modal.classList.remove("open"); 
} 

function togglePay(id, el) { 
  document.querySelectorAll(".pay-detail").forEach(d => d.classList.remove("open")); 
  const target = document.getElementById("pay-" + id);
  if (target) target.classList.add("open"); 
  
  document.querySelectorAll(".modal-tab").forEach(t => t.classList.remove("active")); 
  
  const tabBtn = document.querySelector(`.modal-tab[onclick*="'${id}'"]`);
  if (tabBtn) tabBtn.classList.add("active");
} 

function copyAddr(id, event) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = el.textContent;
  navigator.clipboard.writeText(text);
  if (event && event.target) {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => btn.textContent = originalText, 2000);
  }
}

window.addEventListener("click", function(event) { 
  const modal = document.getElementById("payModal"); 
  if (event.target == modal) closePayModal(); 
});
