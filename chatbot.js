(function(){
    "use strict";

    /* ── Sierra Master Chatbot (v2.3.1 - Unified Empire - Claude/Logo Refinement) ── */
    if(!document.getElementById('pd-chat-style')){
        const s = document.createElement('style');
        s.id = 'pd-chat-style';
        s.innerHTML = `
    :root {
        --pd-deep: #301934;
        --pd-purple: #9B59FF;
        --pd-lilac: #C8A2C8;
        --pd-ivory: #F9F9F7;
        --pd-glass: rgba(249, 249, 247, 0.94);
    }
    
    #pd-chat-bubble {
        position:fixed; bottom:28px; right:28px; z-index:9999;
        width:64px; height:64px; border-radius:22px;
        background: var(--pd-deep);
        box-shadow: 0 12px 40px rgba(48, 25, 52, 0.25);
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #pd-chat-bubble:hover { transform: scale(1.08) rotate(5deg); }
    #pd-chat-bubble.open { transform: scale(0.9) rotate(90deg); background: var(--pd-purple); }
    #pd-chat-bubble .chat-x { display:none; color:#fff; font-size:24px; font-weight:300; }
    #pd-chat-bubble.open .chat-x { display:block; }
    #pd-chat-bubble.open .ai-svg { display:none; }
    
    #pd-chat-window {
        position:fixed; bottom:108px; right:28px; z-index:9998;
        width:410px; background: var(--pd-glass); backdrop-filter: blur(25px);
        border: 1px solid rgba(48, 25, 52, 0.1);
        box-shadow: 0 25px 60px rgba(48, 25, 52, 0.15);
        display:flex; flex-direction:column;
        opacity:0; pointer-events:none; transform:translateY(30px) scale(0.98);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        max-height:70vh; border-radius:28px; overflow: hidden;
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
    
    .chat-hdr { background: var(--pd-deep); padding:22px 24px; display:flex; align-items:center; gap:14px; flex-shrink:0; }
    .chat-avatar { width:44px; height:44px; border-radius:14px; background:var(--pd-ivory); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .chat-hdr-name { font-size:1.05rem; font-weight:700; color:var(--pd-ivory); letter-spacing: -0.01em; }
    .chat-hdr-status { font-size:0.7rem; color:var(--pd-lilac); display:flex; align-items:center; gap:6px; margin-top:2px; font-weight: 500; }
    .chat-sdot { width:7px; height:7px; border-radius:50%; background:#22c55e; box-shadow: 0 0 10px #22c55e; }
    
    .chat-msgs { flex:1; padding:24px; overflow-y:auto; display:flex; flex-direction:column; gap:14px; scroll-behavior: smooth; }
    .chat-msgs::-webkit-scrollbar { width: 5px; }
    .chat-msgs::-webkit-scrollbar-thumb { background: rgba(48,25,52,0.1); border-radius: 10px; }
    
    .cmsg { max-width:85%; padding:14px 18px; font-size:0.95rem; line-height:1.5; position:relative; }
    .cmsg.bot { background:var(--pd-deep); color:#fff; align-self:flex-start; border-radius:4px 18px 18px 18px; }
    .cmsg.usr { background:var(--pd-purple); color:#fff; align-self:flex-end; border-radius:18px 4px 18px 18px; font-weight: 500; }
    
    .chat-qr { padding:0 24px 20px; display:flex; flex-wrap:wrap; gap:8px; flex-shrink:0; }
    .qrb { 
        padding:10px 18px; font-size:0.85rem; font-weight:600; 
        background:#fff; border:1px solid rgba(48,25,52,0.1); 
        color:var(--pd-deep); border-radius:100px; cursor:pointer; 
        transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex; align-items: center; gap: 8px;
    }
    .qrb:hover { background:var(--pd-purple); color:#fff; border-color:var(--pd-purple); transform: translateY(-1.5px); }
    .qrb.wa { background: #22c55e; color:#fff; border-color:#22c55e; }
    
    .chat-inp-row { display:flex; border-top:1px solid rgba(48,25,52,0.05); padding:10px 18px; background:#fff; align-items:center; gap:8px; }
    #chat-inp { flex:1; border:none; background:#f4f4f5; padding:12px 18px; font-size:0.92rem; border-radius:100px; outline:none; transition: all 0.2s; }
    #chat-inp:focus { background: #fff; box-shadow: inset 0 0 0 2px rgba(155, 89, 255, 0.2); }
    
    .cpkg-grid { display:grid; grid-template-columns:1fr; gap:12px; margin-top:8px; }
    .cpkg-card { background:#fff; border:1px solid rgba(48,25,52,0.08); border-radius:16px; padding:16px; cursor:pointer; transition:all 0.2s; }
    .cpkg-card:hover { border-color:var(--pd-purple); box-shadow:0 8px 24px rgba(155,89,255,0.12); }
    .cpkg-name { font-weight:800; font-size:0.95rem; color:var(--pd-deep); }
    .cpkg-price { color:var(--pd-purple); font-weight:700; font-size:0.85rem; margin:4px 0; }
    .cpkg-desc { font-size:0.8rem; color:#6b5a6b; line-height:1.4; }

    .typing-dots { display:flex; gap:4px; padding:4px 0; }
    .typing-dots span { width:6px; height:6px; background:rgba(255,255,255,0.4); border-radius:50%; animation: dotPulse 1.4s infinite; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes dotPulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.3); opacity: 1; } }
    `;
        document.head.appendChild(s);
    }

    const STEPS = {
        "start": {
            "bot": "Hey 👋 What brings you here today?",
            "r": [
                { "l": "I want a template site", "s": "pkg_templates", "i": "shopping-bag" },
                { "l": "I need a custom website", "s": "need_website", "i": "code" },
                { "l": "I need AI automation", "s": "automation", "i": "cpu" },
                { "l": "Agency Packages", "s": "pkg_menu", "i": "info" },
                { "l": "About Prisca Dezigns", "s": "about", "i": "user" }
            ]
        },
        "about": {
            "bot": "Prisca Dezigns is a high-fidelity digital agency specializing in premium web architecture and AI automation. We're on a mission to build the future of the Caribbean.",
            "r": [
                { "l": "Evolve Mobility", "s": "about_brands", "i": "car" },
                { "l": "The Way Made Known", "s": "about_twmk", "i": "info" },
                { "l": "About Prisca Dezigns", "s": "about_founder", "i": "user" },
                { "l": "Back", "s": "start", "i": "arrow-left" }
            ]
        },
        "about_brands": {
            "bot": "We are the strategic digital partners for Evolve Mobility (driveevolve.com), the leading EV dealership in the Caribbean.\n\nInventory & Pricing:\n⚡ BYD Atto 3: $285,000 TTD\n⚡ BYD Dolphin: $195,000 TTD\n⚡ GAC AION Y Plus: $245,000 TTD\n⚡ Leapmotor C11: $310,000 TTD\n⚡ Leapmotor T03: $145,000 TTD",
            "r": [
                { "l": "Visit Evolve Mobility", "url": "https://driveevolve.com", "i": "external-link" },
                { "l": "Back", "s": "about", "i": "arrow-left" }
            ]
        },
        "about_twmk": {
            "bot": "The Way Made Known (TWMK) is our humanitarian backbone. We use a portion of our agency profits to share the Gospel and provide community support in Trinidad and Tobago.",
            "r": [ { "l": "Back", "s": "about", "i": "arrow-left" } ]
        },
        "about_founder": {
            "bot": "Prisca Dezigns was founded in Trinidad & Tobago by Priscilla Narine. With a focus on high-fidelity results and precision data management, she leads a team that integrates AI into professional workflows seamlessly.",
            "r": [ { "l": "Back", "s": "about", "i": "arrow-left" } ]
        },
        "need_website": {
            "bot": "Our custom websites are built from scratch — fully tailored to your brand, SEO-optimised, and delivered fast. What do you need?",
            "r": [
                { "l": "Need it in 24hrs — $200", "s": "pkg_oneday", "i": "zap" },
                { "l": "I need a full custom build", "s": "pkg_standard", "i": "code" },
                { "l": "Mine isn't converting", "s": "bad_website", "i": "trending-down" },
                { "l": "Show me templates instead", "s": "pkg_templates", "i": "shopping-bag" }
            ]
        },
        "pkg_menu": {
            "bot": "Our agency packages are full custom builds — designed, developed and delivered by Prisca Dezigns. Which fits your needs?",
            "r": [
                { "l": "Standard Web", "s": "pkg_std", "i": "code" },
                { "l": "E-Commerce", "s": "pkg_eco", "i": "shopping-bag" },
                { "l": "AI Automation", "s": "pkg_ai", "i": "cpu" },
                { "l": "Back", "s": "start", "i": "arrow-left" }
            ]
        },
        "pkg_std": { "bot": "High-fidelity websites for professionals.", "pkg": "standard" },
        "pkg_eco": { "bot": "Premium online stores that scale.", "pkg": "ecommerce" },
        "pkg_ai": { "bot": "Autonomous customer service tiers.", "pkg": "ai" },
        "pkg_templates": { "bot": "Professional templates, live in 24hrs.", "pkg": "templates" },
        "automation": { "bot": "We build AI agents that handle your emails, WhatsApp, and customer service 24/7.", "pkg": "ai" },
        "talk": { "bot": "Message us on WhatsApp to start your evolution.", "wa": true }
    };

    const PKGS = {
        "standard": [
            { name: "Starter", price: "$1,500 + $150/mo", desc: "1-Page High-Fidelity Website · Full Brand Setup" },
            { name: "Growth", price: "$3,500 + $400/mo", desc: "Advanced Branding & App/Web Architecture" },
            { name: "Trusted", price: "$6,000 + $700/mo", desc: "Full Website Architecture (10-15 Pages)" }
        ],
        "ecommerce": [
            { name: "E-Starter", price: "$2,500 + $250/mo", desc: "1-Page Online Shop · Full Store Branding" },
            { name: "E-Growth", price: "$5,000 + $500/mo", desc: "2-5 Page Store Architecture · Full Logic" }
        ],
        "ai": [
            { name: "Tier 1", price: "$1,500 + $150/mo", desc: "AI Website Chatbot (24/7 Live)" },
            { name: "Tier 2", price: "$3,500 + $400/mo", desc: "WhatsApp AI Automation (24/7)" },
            { name: "Tier 3", price: "$6,000 + $700/mo", desc: "Email Inbox AI Automation (24/7)" }
        ],
        "templates": [
            { name: "Template Site", price: "$149.99 + $19.99/mo", desc: "Logo & colors swapped in · Live in 24hrs" },
            { name: "AI Chatbot Add-On", price: "+$349.99 + $49.99/mo", desc: "AI chatbot answering business FAQs 24/7" },
            { name: "Micro Store", price: "$249.99 + $34.99/mo", desc: "Full product store on template · WhatsApp Order" }
        ]
    };

    const ICONS = {
        'shopping-bag': '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
        'code': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
        'cpu': '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 20v2M15 20v2M9 2v2M15 2v2M20 9h2M20 15h2M2 9h2M2 15h2M9 9h6v6H9z"/>',
        'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
        'car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/>',
        'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        'arrow-left': '<path d="m12 19-7-7 7-7M19 12H5"/>',
        'zap': '<path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z"/>',
        'trending-down': '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
        'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
    };

    const WA = "https://wa.me/18683424101";

    if(!document.getElementById('pd-chat-bubble')){
        const b = document.createElement('div'); b.id='pd-chat-bubble';
        b.innerHTML = '<svg class="ai-svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:28px;height:28px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="chat-x">✕</span>';
        const w = document.createElement('div'); w.id='pd-chat-window';
        w.innerHTML = `
            <div class="chat-hdr">
                <div class="chat-avatar"><img src="https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/assets/p-logo.png" style="width:100%;height:100%;object-fit:contain;border-radius:50%;"></div>
                <div><div class="chat-hdr-name">Sierra</div><div class="chat-hdr-status"><div class="chat-sdot"></div> Online</div></div>
            </div>
            <div class="chat-msgs" id="pd-msgs"></div>
            <div class="chat-qr" id="pd-qr"></div>
            <div class="chat-inp-row"><input type="text" id="pd-inp" placeholder="Type a message..."><button id="pd-send" style="background:var(--pd-purple);color:#fff;border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>
        `;
        document.body.appendChild(b); document.body.appendChild(w);
    }

    const b = document.getElementById('pd-chat-bubble'), w = document.getElementById('pd-chat-window'), m = document.getElementById('pd-msgs'), q = document.getElementById('pd-qr'), i = document.getElementById('pd-inp');

    function addMsg(txt, type){
        const d = document.createElement('div'); d.className = `cmsg ${type}`;
        d.innerHTML = `<span>${txt.replace(/\n/g, '<br>')}</span>`;
        m.appendChild(d); m.scrollTop = m.scrollHeight;
    }

    function runStep(id, label){
        const s = STEPS[id]; if(!s) return;
        if(label) addMsg(label, 'usr');
        const td = document.createElement('div'); td.className = 'cmsg bot typing';
        td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        m.appendChild(td); m.scrollTop = m.scrollHeight;
        setTimeout(() => {
            td.remove(); q.innerHTML = '';
            addMsg(s.bot, 'bot');
            if(s.wa){
                const b = document.createElement('button'); b.className = 'qrb wa';
                b.innerHTML = 'Chat on WhatsApp'; b.onclick = () => window.open(WA, '_blank');
                q.appendChild(b);
            }
            if(s.pkg) renderPkgs(PKGS[s.pkg]);
            if(s.url) window.open(s.url, '_blank');
            if(s.r) s.r.forEach(r => {
                const b = document.createElement('button'); b.className = 'qrb';
                if(r.i) b.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">${ICONS[r.i]}</svg> ${r.l}`;
                else b.innerText = r.l;
                b.onclick = () => runStep(r.s, r.l);
                q.appendChild(b);
            });
        }, 800);
    }

    function renderPkgs(list){
        const g = document.createElement('div'); g.className = 'cpkg-grid';
        list.forEach(p => {
            const c = document.createElement('div'); c.className = 'cpkg-card';
            c.innerHTML = `<div class="cpkg-name">${p.name}</div><div class="cpkg-price">${p.price}</div><div class="cpkg-desc">${p.desc}</div>`;
            c.onclick = () => { addMsg(`I'm interested in the ${p.name} package.`, 'usr'); setTimeout(() => runStep('talk'), 500); };
            g.appendChild(c);
        });
        m.appendChild(g); m.scrollTop = m.scrollHeight;
    }

    window.toggleChat = () => { w.classList.toggle('open'); b.classList.toggle('open'); };
    b.onclick = toggleChat;
    document.getElementById('pd-send').onclick = () => { const t = i.value.trim(); if(!t) return; addMsg(t, 'usr'); i.value = ''; setTimeout(() => addMsg("Understood. Sierra is processing your request...", 'bot'), 1000); };
    i.onkeypress = (e) => { if(e.key==='Enter') document.getElementById('pd-send').click(); };

    setTimeout(() => runStep('start'), 1000);
})();
