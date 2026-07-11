(function(){
    "use strict";

    const isAutodrome = window.location.href.includes('theautodrome') || window.location.hostname.includes('theautodrome');
    const THEME = isAutodrome ? {
        name: 'Drew | Autodrome AI',
        persona: 'Drew',
        accent: '#FF3B3F',
        secondary: '#008080',
        bg: 'rgba(10, 10, 15, 0.95)',
        text: '#FFFFFF',
        glow: 'rgba(255, 59, 63, 0.4)',
        logo: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=100'
    } : {
        name: 'Sierra | Prisca Dezigns AI',
        persona: 'Sierra',
        accent: '#301934',
        secondary: '#C8A2C8',
        bg: 'rgba(245, 242, 237, 0.98)',
        text: '#301934',
        glow: 'rgba(48, 25, 52, 0.3)',
        logo: 'https://share.zapia.com/57sonyoar08flg9xz5v667'
    };

    const WA="https://wa.me/18683424101";
    const WA_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.877L.057 23.7a.5.5 0 0 0 .613.612l5.807-1.484A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.221-1.436l-.374-.222-3.878.991.998-3.918-.243-.387A9.965 9.965 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

    /* ── High-Fidelity Chatbot Styles ── */
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
        width:64px; height:64px; border-radius:22px;
        background: linear-gradient(135deg, var(--cb-accent), var(--cb-secondary));
        box-shadow: 0 12px 40px var(--cb-glow);
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #pd-chat-bubble:hover { transform: scale(1.1); box-shadow: 0 15px 50px var(--cb-glow); }
    #pd-chat-bubble .chat-x { display:none; color:#fff; font-size:24px; }
    #pd-chat-bubble.open .chat-x { display:block; }
    #pd-chat-bubble.open svg { display:none; }
    #pd-chat-window {
        position:fixed; bottom:110px; right:30px; z-index:9998;
        width:420px; height:680px; border-radius:28px;
        background: var(--cb-bg);
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 25px 80px rgba(0,0,0,0.2);
        display:flex; flex-direction:column; overflow:hidden;
        opacity:0; pointer-events:none; transform: translateY(30px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        border: 1px solid rgba(0,0,0,0.05);
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform: translateY(0) scale(1); }
    .chat-hdr { padding:24px; background: linear-gradient(to right, var(--cb-accent), var(--cb-secondary)); color:#fff; display:flex; align-items:center; }
    .chat-avatar { width:48px; height:48px; border-radius:14px; margin-right:16px; background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .chat-hdr-name { font-size:1.1rem; font-weight:800; }
    .chat-hdr-status { font-size:0.7rem; color:rgba(255,255,255,0.8); display:flex; align-items:center; margin-top:4px; font-weight:600; }
    .chat-sdot { width:8px; height:8px; background:#22c55e; border-radius:50%; margin-right:8px; }
    .chat-msgs { flex:1; overflow-y:auto; padding:24px; display:flex; flex-direction:column; }
    .cmsg { margin-bottom:16px; max-width:85%; animation: msgSlide 0.3s ease forwards; }
    @keyframes msgSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .cmsg.bot { align-self: flex-start; }
    .cmsg.usr { align-self: flex-end; }
    .msg-bubble { padding:12px 16px; border-radius:18px; font-size:0.92rem; line-height:1.5; }
    .bot .msg-bubble { background:#fff; color:#301934; border-bottom-left-radius:4px; border: 1px solid rgba(0,0,0,0.05); }
    .usr .msg-bubble { background: var(--cb-accent); color:#fff; border-bottom-right-radius:4px; }
    .chat-qr { padding:0 24px 20px; display:flex; flex-wrap:wrap; gap:8px; }
    .qrb { padding:10px 16px; background:#fff; border:1px solid rgba(0,0,0,0.08); border-radius:12px; font-size:0.85rem; font-weight:700; color:var(--cb-accent); cursor:pointer; transition:all 0.2s; }
    .qrb:hover { background: var(--cb-accent); color:#fff; }
    .chat-inp-row { padding:12px 18px; border-top:1px solid rgba(0,0,0,0.05); display:flex; align-items:center; background:#fff; }
    #chat-inp { flex:1; border:none; padding:12px; font-size:0.95rem; outline:none; }
    #chat-snd { background:var(--cb-accent); border:none; color:#fff; width:40px; height:40px; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
    
    .cpkg-grid { display:flex; flex-direction:column; gap:10px; width:100%; margin-bottom:15px; }
    .cpkg-card { background:#fff; border:1px solid rgba(0,0,0,0.08); padding:16px; border-radius:14px; cursor:pointer; transition:0.2s; }
    .cpkg-card:hover { border-color:var(--cb-accent); transform: scale(1.02); }
    .cpkg-name { font-size:0.95rem; font-weight:800; color:var(--cb-accent); }
    .cpkg-price { font-size:1.1rem; font-weight:900; margin: 4px 0; }
    .cpkg-desc { font-size:0.75rem; color:#64748b; line-height:1.4; }
    `;
        document.head.appendChild(s);
    }

    const b = document.createElement('div');
    b.id = 'pd-chat-bubble';
    b.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span class="chat-x">✕</span>`;
    b.onclick = toggleChat;
    document.body.appendChild(b);

    const w = document.createElement('div');
    w.id = 'pd-chat-window';
    w.innerHTML = `
        <div class="chat-hdr">
            <div class="chat-avatar"><img src="${THEME.logo}" style="width:100%;height:100%;object-fit:cover"></div>
            <div>
                <div class="chat-hdr-name">${THEME.name}</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div> Active Intelligence</div>
            </div>
        </div>
        <div class="chat-msgs" id="chat-msgs"></div>
        <div class="chat-qr" id="chat-qr"></div>
        <div class="chat-inp-row">
            <input type="text" id="chat-inp" placeholder="Message ${THEME.persona}..." onkeydown="if(event.key==='Enter')chatSend()">
            <button id="chat-snd" onclick="chatSend()">➤</button>
        </div>
    `;
    document.body.appendChild(w);

    const PKGS = {
        web: [
            { id: "launch", name: "1-Day Launch", price: "$299.99 flat", desc: "Build within 24h. One-page custom design. $50/mo maintenance." },
            { id: "starter", name: "Starter Pkg", price: "$297 USD", desc: "1-Page High-Fidelity Website. Full Brand Setup (Logo, Domain). 1 Month Free Maint." },
            { id: "growth", name: "Growth Pkg", price: "$597 USD", desc: "Managed Social Presence. Content Creation. App/Web Architecture. 1 Month Free Maint." },
            { id: "trusted", name: "Trusted Pkg", price: "$1,200 USD", desc: "10-15 Page Content. Business Automation. Premium Brand Scaling. Full 24/7 Support." }
        ],
        ai: [
            { id: "tier1", name: "AI Tier 1", price: "$1,500 + $300/mo", desc: "Website Chatbot. 500 conv/mo included. Lead Notifications. (Add-on Voice: +$500 setup +$50/mo)" },
            { id: "tier2", name: "AI Tier 2", price: "$3,500 + $500/mo", desc: "WhatsApp AI Automation (24/7). 1,500 conv/mo included. Automatic Lead Qualification." },
            { id: "tier3", name: "AI Tier 3", price: "$6,000 + $700/mo", desc: "Email Inbox AI Automation. 3,000 conv/mo included. AI Reads, Responds & Qualifies Every Email." },
            { id: "tier4", name: "AI Tier 4", price: "$8,000 + $900/mo", desc: "AI Voice Agent. Answers inbound calls 24/7 automatically. Unlimited conv." }
        ]
    };

    const STEPS = {
        start: { bot: "Látom. I am Sierra. Ready to plug your leaking leads? What can I help you build?", qr: [{l:"Web Design",s:"web"},{l:"AI Automation",s:"ai"},{l:"Talk to Me",s:"talk"}] },
        web: { bot: "We specialize in high-fidelity speed. Which tier are you looking for?", pkg: "web" },
        ai: { bot: "From WhatsApp to Voice, our agents work 24/7 while you sleep. Choose a tier:", pkg: "ai" },
        talk: { bot: "Connecting to the Council. First, what's your name? 😊", intake: "name" }
    };

    let intake = { active: false, step: '', data: {} };
    const INTAKE = {
        name: { next: "biz", ask: d => `Nice to meet you, ${d.name}! What's your business name?` },
        biz: { next: "email", ask: "What's your best email? 📧" },
        email: { next: "goal", ask: "What's your #1 goal this month? (Leads, Speed, or Automation?)" },
        goal: { next: "done", ask: "Perfect. Ready to finalize on WhatsApp?" }
    };

    function go(key){
        const s = STEPS[key];
        const q = document.getElementById('chat-qr'); q.innerHTML = '';
        addMsg(s.bot, 'bot');
        if(s.pkg) renderPkgs(PKGS[s.pkg]);
        else if(s.qr) s.qr.forEach(qr => {
            const btn = document.createElement('button'); btn.className = 'qrb'; btn.innerText = qr.l;
            btn.onclick = () => { addMsg(qr.l, 'usr'); if(qr.s === 'talk') startIntake(); else go(qr.s); };
            q.appendChild(btn);
        });
    }

    function renderPkgs(list){
        const m = document.getElementById('chat-msgs');
        const g = document.createElement('div'); g.className = 'cpkg-grid';
        list.forEach(p => {
            const c = document.createElement('div'); c.className = 'cpkg-card';
            c.innerHTML = `<div class="cpkg-name">${p.name}</div><div class="cpkg-price">${p.price}</div><div class="cpkg-desc">${p.desc}</div>`;
            c.onclick = () => { addMsg(`I'm interested in ${p.name}`, 'usr'); startIntake(); };
            g.appendChild(c);
        });
        m.appendChild(g); m.scrollTop = m.scrollHeight;
    }

    function startIntake(){ intake.active = true; intake.step = 'name'; addMsg(INTAKE.name.ask, 'bot'); }

    function handleIntake(txt){
        intake.data[intake.step] = txt;
        const nextStep = INTAKE[intake.step].next;
        if(nextStep === 'done'){
            intake.active = false; saveLead(intake.data);
            addMsg(INTAKE[intake.step].ask, 'bot');
            const q = document.getElementById('chat-qr'); q.innerHTML = '';
            const a = document.createElement('a'); a.className = 'qrb'; a.style.background = '#25D366'; a.style.color='#fff';
            a.href = `${WA}?text=Hi Sierra, I finished the lead form. Name: ${intake.data.name}`; a.target = '_blank';
            a.innerText = "Finish on WhatsApp"; q.appendChild(a);
        } else {
            intake.step = nextStep;
            const ask = INTAKE[nextStep].ask;
            addMsg(typeof ask === 'function' ? ask(intake.data) : ask, 'bot');
        }
    }

    function saveLead(d){
        const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhemhkbnF6YXFwcWNyYWxtdGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzE5NjYsImV4cCI6MjA5Mzc0Nzk2Nn0.uTyw31uWTNOTV5-HzNpm46vpAJABAsHLMzW-sYOkRhc';
        fetch('https://sazhdnqzaqpqcralmthh.supabase.co/rest/v1/client_leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': KEY, 'Authorization': `Bearer ${KEY}` },
            body: JSON.stringify({ name: d.name, email: d.email, package: `Goal: ${d.goal} | Biz: ${d.biz}`, brand: 'Prisca Dezigns' })
        });
    }

    function addMsg(t, side){
        const m = document.getElementById('chat-msgs');
        const d = document.createElement('div'); d.className = `cmsg ${side}`;
        d.innerHTML = `<div class="msg-bubble">${t}</div>`;
        m.appendChild(d); m.scrollTop = m.scrollHeight;
    }

    window.chatSend = function(){
        const i = document.getElementById('chat-inp'); const t = i.value.trim(); if(!t) return; i.value = '';
        addMsg(t, 'usr');
        if(intake.active) handleIntake(t);
        else getGrok(t);
    };

    function getGrok(txt){
        const m = document.getElementById('chat-msgs');
        const dot = document.createElement('div'); dot.className = 'cmsg bot'; dot.innerText = '...'; m.appendChild(dot);
        fetch('https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/chat-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ persona: THEME.persona, message: txt })
        }).then(r=>r.json()).then(data=>{ dot.remove(); addMsg(data.reply || "Signal received. Let's talk on WhatsApp.", 'bot'); })
        .catch(()=>{ dot.remove(); addMsg("Connection to the Council is slow. Try WhatsApp!", 'bot'); });
    }

    let open = false, started = false;
    function toggleChat(){
        open = !open; b.classList.toggle('open', open); w.classList.toggle('open', open);
        if(open && !started){ started = true; setTimeout(()=>go('start'), 600); }
    }
})();
