(function(){
    "use strict";

    const isAutodrome = window.location.href.includes('theautodrome') || window.location.hostname.includes('theautodrome');
    const THEME = isAutodrome ? {
        name: 'Drew | Autodrome AI',
        persona: 'Drew',
        accent: '#FF3B3F',
        secondary: '#008080',
        bg: 'rgba(10, 10, 15, 0.98)',
        text: '#FFFFFF',
        glow: 'rgba(255, 59, 63, 0.4)',
        logo: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=100'
    } : {
        name: 'Sierra | Prisca Dezigns AI',
        persona: 'Sierra',
        accent: '#7D52B5',
        secondary: '#743089',
        bg: 'rgba(255, 255, 255, 0.98)',
        text: '#301934',
        glow: 'rgba(125, 82, 181, 0.3)',
        logo: 'https://share.zapia.com/57sonyoar08flg9xz5v667'
    };

    const WA="https://wa.me/18683424101";

    /* ── Master Styles ── */
    if(!document.getElementById('pd-chat-style')){
        const s = document.createElement('style');
        s.id = 'pd-chat-style';
        s.innerHTML = `
    :root {
        --cb-accent: ${THEME.accent};
        --cb-secondary: ${THEME.secondary};
        --cb-bg: ${THEME.bg};
        --cb-text: ${THEME.text};
        --cb-glow: ${THEME.glow};
    }
    
    #pd-chat-bubble {
        position:fixed; bottom:30px; right:30px; z-index:9999;
        width:64px; height:64px; border-radius:24px;
        background: linear-gradient(135deg, var(--cb-accent), var(--cb-secondary));
        box-shadow: 0 12px 40px var(--cb-glow);
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: bubbleFloat 3s ease-in-out infinite;
    }
    #pd-chat-bubble:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 15px 50px var(--cb-glow); }
    #pd-chat-bubble.open { transform: scale(0.9) rotate(90deg); background: #1e1b4b; }
    #pd-chat-bubble .chat-x { display:none; color:#fff; font-size:24px; font-weight:300; }
    #pd-chat-bubble.open .chat-x { display:block; }
    #pd-chat-bubble.open svg { display:none; }
    
    #pd-chat-window {
        position:fixed; bottom:110px; right:30px; z-index:9998;
        width:420px; height:720px; border-radius:32px;
        background: var(--cb-bg);
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 25px 80px rgba(0,0,0,0.15);
        display:flex; flex-direction:column; overflow:hidden;
        opacity:0; pointer-events:none; transform: translateY(30px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        border: 1px solid rgba(0,0,0,0.05);
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform: translateY(0) scale(1); }
    
    .chat-hdr { background: linear-gradient(135deg, var(--cb-accent), var(--cb-secondary)); padding:26px 30px; display:flex; align-items:center; gap:16px; flex-shrink:0; }
    .chat-avatar { width:52px; height:52px; border-radius:18px; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 20px rgba(0,0,0,0.1); flex-shrink:0; transform: rotate(-3deg); transition: 0.3s; padding: 4px; overflow: hidden; }
    .chat-avatar:hover { transform: rotate(0deg) scale(1.05); }
    .chat-avatar img { width: 100%; height: 100%; object-fit: contain; }
    .chat-hdr-name { font-size:1.15rem; font-weight:800; color:#fff; font-family: 'Playfair Display', serif, system-ui; letter-spacing: -0.01em; }
    .chat-hdr-status { font-size:0.75rem; color:rgba(255,255,255,0.8); display:flex; align-items:center; gap:8px; margin-top:2px; font-weight: 600; }
    .chat-sdot { width:9px; height:9px; border-radius:50%; background:#22c55e; box-shadow: 0 0 10px #22c55e; animation: pgr 2s infinite; }
    @keyframes pgr { 0%,100%{opacity:1; transform: scale(1);} 50%{opacity:0.6; transform: scale(1.2);} }

    .chat-hdr-right { margin-left: auto; }
    #chat-voice-toggle { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 7px 14px; border-radius:12px; font-size: 0.65rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 7px; transition: 0.2s; }
    #chat-voice-toggle:hover { background: rgba(255,255,255,0.25); }
    #chat-voice-toggle.voice-on { background: #fff; color: var(--cb-accent); border-color: #fff; box-shadow: 0 4px 12px rgba(255,255,255,0.3); }

    #chat-back-bar { background: rgba(0,0,0,0.03); padding: 10px 28px; font-size: 0.75rem; font-weight: 800; color: var(--cb-accent); cursor: pointer; display: none; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid rgba(0,0,0,0.03); }
    #chat-back-bar.vis { display: block; }
    
    .chat-msgs { flex:1; overflow-y:auto; padding:28px 24px; display:flex; flex-direction:column; gap:16px; }
    .cmsg { max-width:85%; font-size:0.95rem; line-height:1.6; padding:14px 20px; border-radius:24px; position: relative; animation: msgSlide 0.4s ease forwards; font-family: 'Inter', sans-serif; }
    @keyframes msgSlide { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .cmsg.bot { background:#fff; color: var(--cb-text); align-self:flex-start; border-bottom-left-radius: 4px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
    .cmsg.usr { background: var(--cb-accent); color:#fff; align-self:flex-end; border-bottom-right-radius: 4px; box-shadow: 0 6px 20px var(--cb-glow); font-weight: 500; }
    
    .cmsg.typing { background:#fff; align-self:flex-start; border-radius:24px 24px 24px 4px; padding:18px 24px; border: 1px solid rgba(0,0,0,0.05); }
    .typing-dots { display:flex; gap:6px; }
    .typing-dots span { width:8px; height:8px; border-radius:50%; background:var(--cb-accent); opacity: 0.3; animation: tdot 1.4s infinite; }
    .typing-dots span:nth-child(2){animation-delay:0.2s;}
    .typing-dots span:nth-child(3){animation-delay:0.4s;}
    @keyframes tdot{0%,60%,100%{transform:translateY(0); opacity: 0.3;}30%{transform:translateY(-8px); opacity: 1;}}

    .chat-qr { padding:0 24px 24px; display:flex; flex-wrap:wrap; gap:10px; }
    .qrb { padding:12px 20px; background:#fff; border:1px solid rgba(0,0,0,0.08); border-radius:16px; font-size:0.85rem; font-weight:700; color:var(--cb-accent); cursor:pointer; transition:all 0.2s; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .qrb:hover { background: var(--cb-accent); color:#fff; border-color:var(--cb-accent); transform: translateY(-3px); box-shadow: 0 6px 15px var(--cb-glow); }
    .qrb.wa { background: #22c55e; color:#fff; border-color:#22c55e; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3); }
    
    .chat-inp-row { padding:14px 20px; border-top:1px solid rgba(0,0,0,0.05); display:flex; align-items:center; background:#fff; gap:10px; }
    #chat-inp { flex:1; border:none; padding:14px; font-size:1rem; outline:none; background:#f9fafb; border-radius:14px; color:#333; font-family: 'Inter', sans-serif; }
    
    #chat-mic, #chat-snd { width:46px; height:46px; display:flex; align-items:center; justify-content:center; border-radius:14px; cursor:pointer; transition:0.2s; border:none; }
    #chat-mic { background: rgba(125, 82, 181, 0.05); color: var(--cb-accent); }
    #chat-mic:hover { background: rgba(125, 82, 181, 0.1); }
    #chat-mic.recording { background: #fee2e2; color: #ef4444; animation: cbPulse 1.5s infinite; }
    #chat-snd { background: var(--cb-accent); color: #fff; box-shadow: 0 4px 12px var(--cb-glow); }
    #chat-snd:hover { transform: scale(1.05); }
    
    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes cbPulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

    .cpkg-grid { display:flex; flex-direction:column; gap:12px; width:100%; }
    .cpkg-card { background:#fff; border:1px solid rgba(0,0,0,0.06); padding:18px; border-radius:20px; cursor:pointer; transition:0.3s; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
    .cpkg-card:hover { border-color:var(--cb-accent); transform: scale(1.02); box-shadow: 0 8px 25px rgba(0,0,0,0.05); }
    .cpkg-name { font-size:1rem; font-weight:800; color:var(--cb-accent); font-family: 'Playfair Display', serif; }
    .cpkg-price { font-size:1.15rem; font-weight:900; margin: 6px 0; color: #1e1b4b; }
    .cpkg-desc { font-size:0.8rem; color:#64748b; line-height:1.5; font-weight: 500; }

    @media(max-width:520px){
        #pd-chat-window { width:calc(100vw - 32px); right:16px; bottom:100px; height: 620px; border-radius: 24px; }
        .chat-hdr { padding: 20px 24px; }
        .chat-msgs { padding: 24px 20px; }
    }

    #pd-chat-window {
        width: 440px;
        height: 780px;
        border-radius: 32px;
    }
    .chat-hdr {
        padding: 24px;
        background: linear-gradient(160deg, var(--cb-accent), var(--cb-secondary));
    }
    .chat-avatar {
        width: 48px; height: 48px; border-radius: 14px;
    }
    
    /* Minimalist Icons */
    .icon-btn {
        background: none; border: none; color: inherit; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s;
    }
    .icon-btn:hover { opacity: 0.7; }
    
    .chat-inp-row {
        padding: 16px 20px; gap: 12px; border-top: 1px solid rgba(0,0,0,0.04);
    }
    #chat-inp {
        background: #F4F4F9; border-radius: 16px; padding: 12px 16px;
    }
    
    /* New Feature Buttons */
    .chat-tools {
        display: flex; gap: 14px; padding: 0 20px 12px;
    }
    .tool-btn {
        color: #94a3b8; transition: 0.2s; cursor: pointer;
    }
    .tool-btn:hover { color: var(--cb-accent); }
    
    /* Attachment Preview */
    #attach-preview {
        display: none; padding: 10px 20px; background: #f8fafc; border-top: 1px solid #f1f5f9; align-items: center; gap: 10px; font-size: 0.8rem;
    }
    #attach-preview.active { display: flex; }
    .file-chip {
        background: #fff; border: 1px solid #e2e8f0; padding: 4px 10px; border-radius: 8px; display: flex; align-items: center; gap: 6px;
    }

    `;
        document.head.appendChild(s);
    }
    
    // Inject Structure
    if(!document.getElementById('pd-chat-bubble')){
        const c = document.createElement('div');
        c.innerHTML = `
    <div id="pd-chat-bubble" onclick="toggleChat()">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="white" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span class="chat-x">✕</span>
    </div>
    <div id="pd-chat-window">
        <div class="chat-hdr">
            <div class="chat-avatar"><img src="${THEME.logo}" alt="P"></div>
            <div style="flex:1">
                <div class="chat-hdr-name">Prisca Dezigns</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div> Online now</div>
            </div>
            <div class="chat-hdr-right">
                <button id="chat-voice-toggle" onclick="toggleVoice()" title="Toggle voice replies">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    VOICE OFF
                </button>
            </div>
        </div>
        <div id="chat-back-bar" onclick="chatBack()"><span>← Back to Menu</span></div>
        <div class="chat-msgs" id="chat-msgs"></div>
        <div class="chat-qr" id="chat-qr"></div>
        
        <div id="attach-preview"></div>
        <div class="chat-tools">
            <div class="tool-btn" onclick="openEmoji()" title="Emoji">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </div>
            <div class="tool-btn" onclick="document.getElementById('chat-file').click()" title="Attachment">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                <input type="file" id="chat-file" style="display:none" onchange="handleFile(this)" />
            </div>
        </div>
        <div class="chat-inp-row">
            <button id="chat-mic" class="icon-btn" onclick="toggleMic()" title="Voice Input">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
            </button>
            <input type="text" id="chat-inp" placeholder="Type a message..." onkeydown="if(event.key==='Enter')chatSend()" />
            <button id="chat-snd" class="icon-btn" onclick="chatSend()" style="color: var(--cb-accent)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
        </div>
    </div>`;
        document.body.appendChild(c);
    }

    const WA_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.877L.057 23.7a.5.5 0 0 0 .613.612l5.807-1.484A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.221-1.436l-.374-.222-3.878.991.998-3.918-.243-.387A9.965 9.965 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

    const PKGS = {
        standard: [
            { id: "starter", name: "Starter Pkg", price: "$297 USD", desc: "1-Page High-Fidelity Website. Full Brand Setup (Logo, Domain). Technical SEO. 1 Month Free Maint." },
            { id: "growth", name: "Growth Pkg", price: "$597 USD", desc: "Managed Brand Page. Deep Content Creation. App/Web Architecture. 1 Month Free Maint." },
            { id: "trusted", name: "Trusted Pkg", price: "$1,200 USD", desc: "Full Website Architecture (10-15 Pages). Premium Brand Scaling. 24/7 Priority Support." }
        ],
        ai: [
            { id: "tier1", name: "AI Tier 1", price: "$1,500 + $300/mo", desc: "AI Website Chatbot. Lead Capture & CRM Setup. [Voice Add-on: +$500 setup +$50/mo]" },
            { id: "tier2", name: "AI Tier 2", price: "$3,500 + $500/mo", desc: "Everything in Tier 1. WhatsApp AI Automation (24/7). AI Qualifies Every Lead." },
            { id: "tier3", name: "AI Tier 3", price: "$6,000 + $700/mo", desc: "Everything in Tier 1 & 2. Email Inbox AI Automation (24/7). Reads & Responds to All Emails." },
            { id: "tier4", name: "AI Tier 4", price: "$8,000 + $900/mo", desc: "Full AI Voice Agent. Answers inbound calls 24/7. Unlimited Conversational Scale." }
        ],
        templates: [
            { id: "standard", name: "Template Site", price: "$149.99 + $19.99/mo", desc: "Choose from 24 templates. Logo/Colors swapped. Live in 24hrs." },
            { id: "premium", name: "Premium Template (3D)", price: "$299.99 + $19.99/mo", desc: "Aeon · Nexus · Stellar cinematic 3D experiences. Fully immersive scroll-driven animation." }
        ]
    };

    const STEPS = {
        start: { bot: "Látom. I am ${THEME.persona}, your Strategic AI Agent. Ready to scale your brand with high-fidelity automation?", r: [{l:"🎨 Browse Templates",s:"pkg_templates"},{l:"🏗️ Custom Web Design",s:"need_website"},{l:"🤖 AI Automation",s:"automation"},{l:"📦 Agency Packages",s:"pkg_menu"}] },
        pkg_templates: { bot: "Choose your high-fidelity foundation. All templates are live within 24 hours.", pkg: "templates" },
        need_website: { bot: "We design conversion-focused digital architecture. Which package fits your vision?", pkg: "standard" },
        automation: { bot: "Our AI agents work while you sleep—Qualifying leads, answering emails, and taking calls.", pkg: "ai" },
        pkg_menu: { bot: "Explore our full suite of digital agency services.", r: [{l:"Web Design",s:"need_website"},{l:"AI Automation",s:"automation"}] },
        talk: { bot: "Signal received. Ready to finalize on WhatsApp?", wa: true }
    };

    let hist = [];
    let open = false;
    let started = false;

    window.toggleChat = function(){
        open = !open;
        document.getElementById('pd-chat-window').classList.toggle('open', open);
        document.getElementById('pd-chat-bubble').classList.toggle('open', open);
        if(open && !started){ started = true; setTimeout(() => go('start'), 400); }
    };

    function go(step, label){
        if(label) addMsg(label, 'usr');
        const m = document.getElementById('chat-msgs');
        const td = document.createElement('div');
        td.className = 'cmsg bot typing'; td.id = 'typing-id';
        td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        m.appendChild(td); m.scrollTop = m.scrollHeight;
        
        setTimeout(() => {
            if(document.getElementById('typing-id')) document.getElementById('typing-id').remove();
            const q = document.getElementById('chat-qr');
            hist.push({ m: m.innerHTML, q: q.innerHTML, bv: document.getElementById('chat-back-bar').classList.contains('vis') });
            q.innerHTML = '';
            const s = STEPS[step];
            const botTxt = s.bot.replace('${THEME.persona}', THEME.persona);
            addMsg(botTxt, 'bot'); speak(botTxt); setBack(hist.length > 1);
            if(s.wa){
                const a = document.createElement('a'); a.href = WA; a.target = '_blank';
                a.className = 'qrb wa'; a.innerHTML = WA_SVG + '<span>Chat on WhatsApp</span>';
                q.appendChild(a); addQR('← Back to Menu', 'start'); return;
            }
            if(s.pkg){ renderPkgs(PKGS[s.pkg]); addQR('← Back to Menu', 'start'); return; }
            if(s.r) s.r.forEach(r => addQR(r.l, r.s));
        }, 800);
    }

    function addQR(label, step){
        const q = document.getElementById('chat-qr');
        const b = document.createElement('button');
        b.className = 'qrb'; b.innerHTML = `<span>${label}</span>`;
        b.onclick = () => go(step, label);
        q.appendChild(b);
    }

    function setBack(vis){ document.getElementById('chat-back-bar').classList.toggle('vis', vis); }
    window.chatBack = function(){ 
        if(hist.length < 2) return; 
        hist.pop(); const p = hist.pop(); 
        const m = document.getElementById('chat-msgs'); const q = document.getElementById('chat-qr');
        m.innerHTML = p.m; q.innerHTML = p.q; m.scrollTop = m.scrollHeight; setBack(p.bv);
    };

    function addMsg(txt, side){
        const m = document.getElementById('chat-msgs');
        const d = document.createElement('div');
        d.className = 'cmsg ' + side; d.innerHTML = txt.replace(/\n/g, '<br>');
        m.appendChild(d); m.scrollTop = m.scrollHeight;
    }

    function renderPkgs(list){
        const m = document.getElementById('chat-msgs');
        const g = document.createElement('div'); g.className = 'cpkg-grid';
        list.forEach(p => {
            const c = document.createElement('div'); c.className = 'cpkg-card';
            c.innerHTML = `<div class="cpkg-name">${p.name}</div><div class="cpkg-price">${p.price}</div><div class="cpkg-desc">${p.desc}</div>`;
            c.onclick = () => go('talk', "I'm interested in " + p.name);
            g.appendChild(c);
        });
        m.appendChild(g); m.scrollTop = m.scrollHeight;
    }

    window.chatSend = function(){
        const i = document.getElementById('chat-inp'); const t = i.value.trim(); if(!t) return;
        i.value = ''; addMsg(t, 'usr');
        const m = document.getElementById('chat-msgs');
        const td = document.createElement('div'); td.className = 'cmsg bot typing'; td.id = 'typing-id';
        td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        m.appendChild(td); m.scrollTop = m.scrollHeight;
        fetch('https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/chat-proxy', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ persona: THEME.persona, message: t })
        }).then(r=>r.json()).then(data=>{
            if(document.getElementById('typing-id')) document.getElementById('typing-id').remove();
            addMsg(data.reply || "Signal received. Let's talk on WhatsApp.", 'bot'); speak(data.reply);
        }).catch(()=>{
            if(document.getElementById('typing-id')) document.getElementById('typing-id').remove();
            addMsg("Connection is slow. Message us on WhatsApp!", 'bot');
        });
    };

    var voiceOn=false;
    window.toggleVoice=function(){
        voiceOn=!voiceOn;
        var btn=document.getElementById('chat-voice-toggle');
        var svgPath=voiceOn?'M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 0 1 0 14.14 M15.54 8.46a5 5 0 0 1 0 7.07':'M11 5L6 9H2v6h4l5 4V5z';
        btn.innerHTML='<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><path d=\"'+svgPath+'\"/></svg>'+(voiceOn?' VOICE ON':' VOICE OFF');
        btn.classList.toggle('voice-on',voiceOn);
        if(!voiceOn&&window.speechSynthesis)window.speechSynthesis.cancel();
    };
    function speak(txt){
        if(!voiceOn||!window.speechSynthesis)return;
        var clean=txt.replace(/\n/g,' ').trim();
        var u=new SpeechSynthesisUtterance(clean); u.rate=0.95; u.pitch=1.05; u.volume=1;
        window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    }

    var recognition=null;
    if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SR(); recognition.continuous = false; recognition.interimResults = true;
        recognition.onresult = function(e){
            var t = ''; for(var i=e.resultIndex; i<e.results.length; ++i) t += e.results[i][0].transcript;
            document.getElementById('chat-inp').value = t;
        };
        recognition.onend = function(){ stopMic(); if(document.getElementById('chat-inp').value.length > 2) window.chatSend(); };
    }
    window.toggleMic = function(){
        if(!recognition) return alert("Voice input not supported.");
        var btn=document.getElementById('chat-mic');
        if(btn.classList.contains('recording')) stopMic(); else startMic();
    };
    function startMic(){ var btn=document.getElementById('chat-mic'); btn.classList.add('recording'); recognition.start(); }
    function stopMic(){ var btn=document.getElementById('chat-mic'); btn.classList.remove('recording'); try{recognition.stop();}catch(e){} }

    if(window.location.pathname.includes('/services')){
        setTimeout(() => { if(!open) toggleChat(); }, 8000);
    }

    window.openEmoji = function() {
        const i = document.getElementById('chat-inp');
        i.value += "✨"; // Simple starter, can be expanded to a picker
        i.focus();
    };

    window.handleFile = function(input) {
        if(!input.files[0]) return;
        const f = input.files[0];
        const p = document.getElementById('attach-preview');
        p.innerHTML = `<div class="file-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg> ${f.name} <span onclick="clearFile()" style="cursor:pointer;margin-left:5px">✕</span></div>`;
        p.classList.add('active');
    };

    window.clearFile = function() {
        document.getElementById('chat-file').value = '';
        const p = document.getElementById('attach-preview');
        p.innerHTML = '';
        p.classList.remove('active');
    };

})();