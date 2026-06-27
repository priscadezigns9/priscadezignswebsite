
(function() {
    const container = document.createElement('div');
    container.id = 'prisca-chat-widget';
    container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Inter', sans-serif;";
    
    container.innerHTML = `
        <button id="chat-toggle" style="background: #301934; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center;">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </button>
        <div id="chat-window" style="display: none; position: absolute; bottom: 80px; right: 0; width: 380px; height: 550px; background: #FFFFF0; border: 1px solid #ddd; border-radius: 12px; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.2); overflow: hidden;">
            <div style="background: #301934; color: white; padding: 15px; font-weight: 800; display: flex; justify-content: space-between; align-items: center;">
                <span>PRISCA DEZIGNS | Sierra Scout</span>
                <button id="close-chat" style="background:none; border:none; color:white; cursor:pointer; font-size:20px;">&times;</button>
            </div>
            <div id="chat-messages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: white;">
                <div style="background: #f0f0f0; padding: 10px; border-radius: 8px; font-size: 0.9rem; align-self: flex-start; max-width: 85%;">
                    Greetings. I am <strong>Sierra</strong>, your Elite Scout. How can we evolve your digital presence today?
                    <br><br>
                    <strong>Available Paths:</strong><br>
                    1. 📦 <strong>Branding Packages</strong> (97 - ,200)<br>
                    2. 🛒 <strong>E-Commerce</strong> (97 - ,500)<br>
                    3. 🧠 <strong>AI Consulting</strong> (,000 + ,500/mo)
                    <br><br> Which area should we focus on?
                </div>
            </div>
            <div style="padding: 10px; border-top: 1px solid #eee; display: flex; gap: 5px;">
                <input type="text" id="user-input" placeholder="Ask about AI, Pricing, or Shops..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; outline: none;">
                <button id="send-btn" style="background: #301934; color: white; border: none; padding: 0 15px; border-radius: 4px; cursor: pointer;">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(container);

    const t = document.getElementById('chat-toggle'), w = document.getElementById('chat-window'), c = document.getElementById('close-chat'), i = document.getElementById('user-input'), s = document.getElementById('send-btn'), m = document.getElementById('chat-messages');
    
    t.onclick = () => w.style.display = w.style.display === 'none' ? 'flex' : 'none';
    c.onclick = () => w.style.display = 'none';
    
    function addMsg(txt, u) {
        const d = document.createElement('div');
        d.innerHTML = txt;
        d.style.cssText = `padding:10px; border-radius:8px; font-size:0.9rem; max-width:85%; align-self:${u?'flex-end':'flex-start'}; background:${u?'#301934':'#f0f0f0'}; color:${u?'white':'black'}; margin-bottom:5px;`;
        m.appendChild(d); m.scrollTop = m.scrollHeight;
    }
    
    s.onclick = () => {
        const val = i.value.trim(); if (!val) return;
        addMsg(val, true); i.value = '';
        setTimeout(() => {
            let low = val.toLowerCase();
            let resp = "That is a high-value objective. Would you like me to connect you with Priscilla for a formal intake session?";
            if (low.includes('starter') || low.includes('growth') || low.includes('trusted')) {
                resp = "Our branding tiers range from <strong>Starter (97)</strong> to <strong>Trusted (,200)</strong>. Which fits your current scale?";
            } else if (low.includes('ai') || low.includes('consulting') || low.includes('automation')) {
                resp = "Our <strong>AI Consultancy</strong> is an ,000 setup involving the full Neural Council (Sierra, Kimi, Zapia) plus ,500/mo Pulse maintenance. Shall I initiate the intake?";
            } else if (low.includes('shop') || low.includes('ecommerce')) {
                resp = "E-Commerce builds start at 97 for <strong>E-Starter</strong> and go up to ,500 for the <strong>E-Trusted</strong> on-chain store.";
            }
            addMsg(resp, false);
        }, 800);
    };
    i.onkeypress = (e) => { if (e.key === 'Enter') s.click(); };
})();
