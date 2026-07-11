(function(){
    "use strict";

    /* ── Sierra Master Chatbot (v2.3 - Unified Empire) ── */
    if(!document.getElementById('pd-chat-style')){
        const s = document.createElement('style');
        s.id = 'pd-chat-style';
        s.innerHTML = `
    :root {
        --pd-deep: #301934;
        --pd-lilac: #C8A2C8;
        --pd-ivory: #FFFFF0;
        --pd-glass: rgba(255, 255, 240, 0.92);
    }
    
    #pd-chat-bubble {
        position:fixed; bottom:28px; right:28px; z-index:9999;
        width:64px; height:64px; border-radius:22px;
        background: var(--pd-deep);
        box-shadow: 0 8px 32px rgba(48, 25, 52, 0.3);
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #pd-chat-bubble:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(48, 25, 52, 0.45); }
    #pd-chat-bubble svg { width: 28px; height: 28px; fill: var(--pd-lilac); }
    #pd-chat-bubble .chat-x { display:none; color: var(--pd-lilac); font-size:24px; font-weight:700; }
    #pd-chat-bubble.open .chat-x { display:block; }
    #pd-chat-bubble.open svg { display:none; }
    
    #pd-chat-window {
        position:fixed; bottom:110px; right:28px; z-index:9998;
        width:400px; height:620px; border-radius:28px;
        background: var(--pd-glass);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1.5px solid rgba(48, 25, 52, 0.1);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.15);
        opacity:0; pointer-events:none; transform:translateY(20px) scale(0.98);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        overflow:hidden; display:flex; flex-direction:column;
        font-family: 'Inter', sans-serif;
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
    
    #pd-chat-header {
        padding: 30px; background: var(--pd-deep);
        color: var(--pd-ivory); text-align: left;
    }
    #pd-chat-header h2 { margin:0; font-size:24px; font-weight:800; letter-spacing:-1px; font-family: 'Playfair Display', serif; }
    #pd-chat-header p { margin:4px 0 0; font-size:11px; font-weight:900; color: var(--pd-lilac); text-transform:uppercase; letter-spacing:2px; }
    
    #chat-msgs { flex:1; padding:25px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; scroll-behavior: smooth; }
    .cmsg { max-width:85%; padding:12px 18px; font-size:14px; font-weight:600; line-height:1.5; border-radius: 18px; }
    .cmsg.bot { align-self:flex-start; background: #fff; color: var(--pd-deep); border-bottom-left-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .cmsg.usr { align-self:flex-end; background: var(--pd-deep); color: var(--pd-ivory); border-bottom-right-radius: 4px; }

    #chat-qr { padding: 0 25px 15px; display: flex; flex-wrap: wrap; gap: 8px; }
    .qrb { 
        padding: 8px 16px; border-radius: 12px; border: 1.5px solid var(--pd-lilac); 
        background: transparent; color: var(--pd-deep); font-size: 13px; font-weight: 700;
        cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px;
    }
    .qrb:hover { background: var(--pd-lilac); color: var(--pd-deep); }
    .qrb svg { width: 14px; height: 14px; stroke-width: 2.5; }

    #chat-input-area { padding:20px; background: rgba(255,255,255,0.4); display:flex; align-items:center; gap:12px; border-top: 1px solid rgba(48, 25, 52, 0.05); }
    #chat-inp { flex:1; border:none; background:none; outline:none; font-size:14px; font-weight:600; color: var(--pd-deep); }
    #chat-inp::placeholder { color: rgba(48, 25, 52, 0.4); }
    
    .typing-dots { display: flex; gap: 4px; }
    .typing-dots span { width: 6px; height: 6px; background: var(--pd-lilac); border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; }
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }

    /* Packages / Cards */
    .cpkg-grid { display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: 10px; }
    .cpkg-card { background: #fff; border: 1.5px solid rgba(48, 25, 52, 0.1); padding: 15px; border-radius: 16px; cursor: pointer; transition: all 0.2s; }
    .cpkg-card:hover { border-color: var(--pd-lilac); background: var(--pd-ivory); transform: translateY(-2px); }
    .cpkg-name { font-size: 14px; font-weight: 900; color: var(--pd-deep); }
    .cpkg-price { font-size: 12px; font-weight: 700; color: var(--pd-lilac); margin: 2px 0 6px; }
    .cpkg-desc { font-size: 11px; color: #666; line-height: 1.4; }

    /* Scrollbar */
    #chat-msgs::-webkit-scrollbar { width: 4px; }
    #chat-msgs::-webkit-scrollbar-thumb { background: rgba(48, 25, 52, 0.1); border-radius: 10px; }
    `;
        document.head.appendChild(s);
    }

    const STEPS = {
        "start": {
            "bot": "Greetings. I am Sierra, your Strategic Business Agent. How shall we evolve your project today?",
            "r": [
                { "l": "Template Shop", "s": "pkg_templates", "i": "shopping-bag" },
                { "l": "Custom Websites", "s": "need_website", "i": "code" },
                { "l": "AI Automation", "s": "automation", "i": "cpu" },
                { "l": "About Prisca Dezigns", "s": "about", "i": "info" }
            ]
        },
        "about": {
            "bot": "Prisca Dezigns is a high-fidelity digital agency specializing in premium web architecture and AI automation. We're on a mission to build the future of the Caribbean.",
            "r": [
                { "l": "Evolve Mobility", "s": "about_brands", "i": "car" },
                { "l": "Our Founder", "s": "about_founder", "i": "user" },
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
        "about_founder": {
            "bot": "Prisca Dezigns was founded in Trinidad & Tobago by Priscilla Narine. With a focus on high-fidelity results and precision data management, she leads a team that integrates AI into professional workflows seamlessly.",
            "r": [ { "l": "Back", "s": "about", "i": "arrow-left" } ]
        },
        "need_website": {
            "bot": "Our custom websites are built from scratch — fully tailored to your brand, SEO-optimised, and delivered fast.",
            "r": [
                { "l": "Need it in 24hrs — $200", "s": "pkg_oneday", "i": "zap" },
                { "l": "Full Custom Build", "s": "pkg_standard", "i": "code" },
                { "l": "Audit My Site", "s": "bad_website", "i": "trending-down" },
                { "l": "Back", "s": "start", "i": "arrow-left" }
            ]
        },
        "automation": {
            "bot": "We build autonomous AI agents (like me) to handle your customer service, WhatsApp, and email inboxes 24/7.",
            "r": [
                { "l": "WhatsApp AI", "s": "pkg_wa", "i": "message-circle" },
                { "l": "Email AI", "s": "pkg_email", "i": "mail" },
                { "l": "Back", "s": "start", "i": "arrow-left" }
            ]
        },
        "pkg_templates": {
            "bot": "Our template sites are professional, high-converting, and ready in days. Which industry are you in?",
            "pkg": "templates"
        },
        "talk": {
            "bot": "Understood. One of our human strategists will review your request. Or you can message us directly on WhatsApp.",
            "wa": true
        }
    };

    const PKGS = {
        "templates": [
            { name: "Starter Website", price: "$297 USD", desc: "One-page professional site, logo, domain, and social setup." },
            { name: "Growth Package", price: "$1,500 USD", desc: "Multi-page site, AI chatbot, lead forms, and WhatsApp automation." },
            { name: "Enterprise AI", price: "Custom", desc: "Full customer service replacement & CRM integration." }
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
        'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
        'mail': '<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect width="20" height="14" x="2" y="5" rx="2"/>',
        'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
    };

    const b = document.createElement('div'); b.id = 'pd-chat-bubble';
    b.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="chat-x">×</span>';
    document.body.appendChild(b);

    const w = document.createElement('div'); w.id = 'pd-chat-window';
    w.innerHTML = `
        <div id="pd-chat-header">
            <h2>Sierra</h2>
            <p>Strategic Business Agent</p>
        </div>
        <div id="chat-msgs"></div>
        <div id="chat-qr"></div>
        <div id="chat-input-area">
            <input type="text" id="chat-inp" placeholder="Type your message..." onkeypress="if(event.key==='Enter') chatSend()">
            <button onclick="chatSend()" style="background:none; border:none; cursor:pointer; font-size:18px; color: var(--pd-lilac);">➤</button>
        </div>
    `;
    document.body.appendChild(w);

    window.addMsg = (text, side) => {
        const m = document.getElementById('chat-msgs');
        const d = document.createElement('div');
        d.className = 'cmsg ' + side;
        d.innerHTML = text.replace(/\n/g, '<br>');
        m.appendChild(d);
        m.scrollTop = m.scrollHeight;
    };

    window.runStep = (step) => {
        const s = STEPS[step]; if(!s) return;
        const q = document.getElementById('chat-qr'); q.innerHTML = '';
        addMsg(s.bot, 'bot');
        if(s.pkg) renderPkgs(PKGS[s.pkg]);
        if(s.wa) {
            const btn = document.createElement('button'); btn.className='qrb';
            btn.innerHTML = 'Chat on WhatsApp';
            btn.onclick = () => window.open('https://wa.me/18683424101', '_blank');
            q.appendChild(btn);
        }
        if(s.url) window.open(s.url, '_blank');
        if(s.r) s.r.forEach(r => {
            const btn = document.createElement('button'); btn.className='qrb';
            const icon = r.i ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${ICONS[r.i]}</svg>` : '';
            btn.innerHTML = icon + `<span>${r.l}</span>`;
            btn.onclick = () => { addMsg(r.l, 'usr'); setTimeout(() => runStep(r.s), 400); };
            q.appendChild(btn);
        });
    };

    function renderPkgs(list){
        const m = document.getElementById('chat-msgs');
        const g = document.createElement('div'); g.className = 'cpkg-grid';
        list.forEach(p => {
            const c = document.createElement('div'); c.className = 'cpkg-card';
            c.innerHTML = `<div class="cpkg-name">${p.name}</div><div class="cpkg-price">${p.price}</div><div class="cpkg-desc">${p.desc}</div>`;
            c.onclick = () => { addMsg(`I'm interested in the ${p.name}`, 'usr'); setTimeout(() => runStep('talk'), 500); };
            g.appendChild(c);
        });
        m.appendChild(g);
    }

    window.chatSend = () => {
        const i = document.getElementById('chat-inp');
        const t = i.value.trim(); if(!t) return;
        i.value = ''; addMsg(t, 'usr');
        const m = document.getElementById('chat-msgs');
        const td = document.createElement('div'); td.className = 'cmsg bot';
        td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        m.appendChild(td); m.scrollTop = m.scrollHeight;
        setTimeout(() => { td.remove(); addMsg("Understood. Sierra is processing your request using the Strategic Council's logic.", 'bot'); }, 1500);
    };

    window.toggleChat = () => { w.classList.toggle('open'); b.classList.toggle('open'); };
    b.onclick = toggleChat;

    setTimeout(() => runStep('start'), 1000);
})();

