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
        accent: '#7D52B5',
        secondary: '#743089',
        bg: 'rgba(245, 242, 237, 0.95)',
        text: '#301934',
        glow: 'rgba(125, 82, 181, 0.3)',
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
        animation: bubbleFloat 3s ease-in-out infinite;
    }
    #pd-chat-bubble:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 15px 50px var(--cb-glow); }
    #pd-chat-bubble.open { transform: scale(0.9) rotate(90deg); }
    #pd-chat-bubble .chat-x { display:none; color:#fff; font-size:24px; font-weight:300; }
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
        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        border: 1px solid rgba(255,255,255,0.1);
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform: translateY(0) scale(1); }
    .chat-hdr { padding:24px; background: linear-gradient(to right, var(--cb-accent), var(--cb-secondary)); color:#fff; display:flex; align-items:center; }
    .chat-avatar { width:48px; height:48px; border-radius:14px; margin-right:16px; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 20px rgba(0,0,0,0.1); overflow:hidden; }
    .chat-hdr-name { font-size:1.1rem; font-weight:800; letter-spacing:-0.02em; }
    .chat-hdr-status { font-size:0.7rem; color:rgba(255,255,255,0.8); display:flex; align-items:center; margin-top:4px; font-weight:600; }
    .chat-sdot { width:8px; height:8px; background:#22c55e; border-radius:50%; margin-right:8px; box-shadow: 0 0 10px #22c55e; }
    #chat-voice-toggle { margin-left:auto; background:rgba(255,255,255,0.2); border:none; color:#fff; font-size:10px; padding:6px 10px; border-radius:8px; cursor:pointer; font-weight:700; display:flex; align-items:center; gap:6px; }
    #chat-voice-toggle.voice-on { background:#fff; color:var(--cb-accent); }
    .chat-msgs { flex:1; overflow-y:auto; padding:24px; scroll-behavior: smooth; }
    .cmsg { margin-bottom:16px; max-width:85%; animation: msgSlide 0.4s ease forwards; opacity: 0; transform: translateY(10px); }
    @keyframes msgSlide { to { opacity: 1; transform: translateY(0); } }
    .cmsg.bot { align-self: flex-start; }
    .cmsg.usr { align-self: flex-end; margin-left:auto; }
    .msg-bubble { padding:14px 18px; border-radius:18px; font-size:0.92rem; line-height:1.5; font-weight:500; }
    .bot .msg-bubble { background:#fff; color:#301934; border-bottom-left-radius:4px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .usr .msg-bubble { background: var(--cb-accent); color:#fff; border-bottom-right-radius:4px; }
    #chat-back-bar { display:none; padding:12px 24px; background:rgba(0,0,0,0.02); border-bottom:1px solid rgba(0,0,0,0.05); cursor:pointer; font-size:11px; font-weight:800; color:var(--cb-accent); text-transform:uppercase; letter-spacing:0.05em; }
    #chat-back-bar.vis { display:block; }
    .chat-qr { padding:0 24px 20px; display:flex; flex-wrap:wrap; gap:8px; }
    .qrb { padding:10px 16px; background:#fff; border:1px solid rgba(0,0,0,0.08); border-radius:12px; font-size:0.85rem; font-weight:700; color:var(--cb-accent); cursor:pointer; transition:all 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
    .qrb:hover { transform: translateY(-2px); background: var(--cb-accent); color:#fff; }
    .qrb.wa { background: #25D366; color:#fff; border-color:#25D366; }
    .chat-inp-row { padding:12px 18px; border-top:1px solid rgba(0,0,0,0.05); display:flex; align-items:center; background:#fff; }
    #chat-mic { background:none; border:none; padding:10px; cursor:pointer; color:var(--cb-accent); opacity:0.6; }
    #chat-mic.recording { color:#ef4444; opacity:1; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
    #chat-inp { flex:1; border:none; padding:12px; font-size:0.95rem; outline:none; font-family: inherit; font-weight:500; }
    #chat-snd { background:var(--cb-accent); border:none; color:#fff; width:40px; height:40px; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    
    /* Package Cards */
    .cpkg-grid { display:flex; flex-direction:column; gap:12px; width:100%; margin-bottom:12px; }
    .cpkg-card { background:#fff; border:1px solid rgba(0,0,0,0.08); padding:16px; border-radius:16px; cursor:pointer; transition:all 0.3s; }
    .cpkg-card:hover { border-color:var(--cb-accent); background:rgba(var(--cb-accent-rgb), 0.05); transform: translateY(-3px); }
    .cpkg-name { font-size:1rem; font-weight:800; color:var(--cb-accent); }
    .cpkg-desc { font-size:0.8rem; color:#64748b; margin-top:6px; line-height:1.4; }
    `;
        document.head.appendChild(s);
    }

    /* ── DOM Injection ── */
    const b = document.createElement('div');
    b.id = 'pd-chat-bubble';
    b.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span class="chat-x">✕</span>`;
    b.onclick = toggleChat;
    document.body.appendChild(b);

    const w = document.createElement('div');
    w.id = 'pd-chat-window';
    w.innerHTML = `
        <div class="chat-hdr">
            <div class="chat-avatar"><img src="${THEME.logo}" style="width:100%;height:100%;object-fit:cover"></div>
            <div>
                <div class="chat-hdr-name">${THEME.name}</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div> Online Now</div>
            </div>
            <button id="chat-voice-toggle" onclick="toggleVoice()">VOICE OFF</button>
        </div>
        <div id="chat-back-bar" onclick="chatBack()"><span>← Back</span></div>
        <div class="chat-msgs" id="chat-msgs"></div>
        <div class="chat-qr" id="chat-qr"></div>
        <div class="chat-inp-row">
            <button id="chat-mic" onclick="toggleMic()" title="Voice Note"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
            <input type="text" id="chat-inp" placeholder="Type a message..." onkeydown="if(event.key==='Enter')chatSend()">
            <button id="chat-snd" onclick="chatSend()">➤</button>
        </div>
    `;
    document.body.appendChild(w);

    /* ── Voice & Audio ── */
    let voiceOn = false;
    window.toggleVoice = function(){
        voiceOn = !voiceOn;
        const btn = document.getElementById('chat-voice-toggle');
        btn.innerText = voiceOn ? 'VOICE ON' : 'VOICE OFF';
        btn.classList.toggle('voice-on', voiceOn);
        if(!voiceOn && window.speechSynthesis) window.speechSynthesis.cancel();
    };
    function speak(txt){
        if(!voiceOn || !window.speechSynthesis) return;
        const u = new SpeechSynthesisUtterance(txt.replace(/\n/g,' '));
        u.rate = 1.0; u.pitch = 1.0;
        window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    }

    let recognition = null;
    if('webkitSpeechRecognition' in window){
        recognition = new webkitSpeechRecognition();
        recognition.onresult = (e) => {
            document.getElementById('chat-inp').value = e.results[0][0].transcript;
            window.chatSend(); stopMic();
        };
        recognition.onend = stopMic;
    }
    window.toggleMic = () => {
        const btn = document.getElementById('chat-mic');
        if(btn.classList.contains('recording')) recognition.stop();
        else { btn.classList.add('recording'); recognition.start(); }
    };
    function stopMic(){ document.getElementById('chat-mic').classList.remove('recording'); }

    /* ── Lead Intake & Logic ── */
    let intake = { active: false, step: 0, data: {} };
    const intakeSteps = [
        { key: 'name', ask: "First — what's your name? 😊" },
        { key: 'biz', ask: d => `Nice to meet you, ${d.name}! What's your business called?` },
        { key: 'type', ask: "What type of business is it? (e.g. coach, salon, dealership, tech startup...)" },
        { key: 'email', ask: "What's the best email to reach you on? 📧" },
        { key: 'phone', ask: "And a phone number or WhatsApp? (optional)" },
        { key: 'goal', ask: "What's your main goal right now? More leads? A new website? AI automation?" },
        { key: 'budget', ask: "Rough budget in mind? No pressure, just helps me guide you." }
    ];

    function startIntake(){
        intake.active = true; intake.step = 0; intake.data = {};
        addMsg(intakeSteps[0].ask, 'bot');
        const q = document.getElementById('chat-qr'); q.innerHTML = '';
        const skip = document.createElement('button');
        skip.className = 'qrb'; skip.innerText = 'Skip to WhatsApp';
        skip.onclick = () => finishIntake(true);
        q.appendChild(skip);
    }

    function advanceIntake(txt){
        intake.data[intakeSteps[intake.step].key] = txt;
        intake.step++;
        if(intake.step < intakeSteps.length){
            const next = intakeSteps[intake.step].ask;
            addMsg(typeof next === 'function' ? next(intake.data) : next, 'bot');
        } else finishIntake(false);
    }

    function finishIntake(skipped){
        intake.active = false;
        if(!skipped) saveLead(intake.data);
        const d = intake.data;
        const msg = `New Lead Request:\nName: ${d.name||'—'}\nBusiness: ${d.biz||'—'}\nGoal: ${d.goal||'—'}\nBudget: ${d.budget||'—'}`;
        addMsg("Perfect. I've sent this to the Council. Tap below to finish on WhatsApp!", 'bot');
        const q = document.getElementById('chat-qr'); q.innerHTML = '';
        const a = document.createElement('a');
        a.href = `${WA}?text=${encodeURIComponent(msg)}`; a.target = '_blank'; a.className = 'qrb wa';
        a.innerHTML = WA_SVG + ' Chat on WhatsApp';
        q.appendChild(a);
        setTimeout(() => addMsg("How was your experience today? ⭐⭐⭐⭐⭐", 'bot'), 1500);
    }

    function saveLead(d){
        const SB_URL = 'https://sazhdnqzaqpqcralmthh.supabase.co/rest/v1/client_leads';
        const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhemhkbnF6YXFwcWNyYWxtdGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzE5NjYsImV4cCI6MjA5Mzc0Nzk2Nn0.uTyw31uWTNOTV5-HzNpm46vpAJABAsHLMzW-sYOkRhc';
        fetch(SB_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` },
            body: JSON.stringify({ 
                name: d.name + (d.biz ? ` | ${d.biz}` : ''), 
                email: d.email || 'no-email', 
                package: `Goal: ${d.goal} | Budget: ${d.budget}`, 
                brand: isAutodrome ? 'Autodrome' : 'Prisca Dezigns' 
            })
        });
    }

    /* ── Steps & Navigation ── */
    const PKGS = {
        standard: [
            { name: "Starter ($1,500)", desc: "1-Page High-Fidelity Website · Brand Setup" },
            { name: "Growth ($3,500)", desc: "Brand Page Management · App/Web Architecture" },
            { name: "Trusted ($6,000)", desc: "Full Business Automation · Premium Scaling" }
        ],
        ai: [
            { name: "AI Tier 1 ($1,500)", desc: "Website Chatbot · Lead Capture" },
            { name: "AI Tier 2 ($3,500)", desc: "WhatsApp AI Automation" },
            { name: "AI Tier 3 ($6,000)", desc: "Email Inbox AI Automation" }
        ]
    };

    const STEPS = isAutodrome ? {
        start: { bot: "Látom. I am Drew, your Technical Closer for the Autodrome. Looking for a luxury vehicle or a fleet solution?", qr: [{l:"Luxury Vehicles",s:"cars"},{l:"Sell My Car",s:"talk"},{l:"Maintenance",s:"talk"}] },
        cars: { bot: "We specialise in luxury brand relays — Ferrari, Lamborghini, and Bugatti. Are you looking for a specific model?", qr: [{l:"See Marketplace",url:"https://theautodrome.priscadezigns.org"},{l:"Talk to Drew",s:"talk"}] },
        talk: { bot: "Connecting you to the Council. I'll need a few details first...", intake: true }
    } : {
        start: { bot: "Hey 👋 Welcome to Prisca Dezigns. How can we evolve your brand today?", qr: [{l:"Custom Website",s:"web"},{l:"AI Automation",s:"ai"},{l:"Template Shop",url:"https://priscadezigns.org/templates/"},{l:"Talk to Sierra",s:"talk"}] },
        web: { bot: "Our custom builds start at $1,500. We also offer 1-Day Custom Sites for $299.99. What fits your needs?", qr: [{l:"1-Day Site",s:"talk"},{l:"Custom Packages",s:"pkg_standard"},{l:"Back",s:"start"}] },
        ai: { bot: "From WhatsApp chatbots to Voice Agents, we build the machine that works while you sleep.", qr: [{l:"See AI Tiers",s:"pkg_ai"},{l:"Talk to Sierra",s:"talk"},{l:"Back",s:"start"}] },
        pkg_standard: { bot: "Here are our Website Packages:", pkg: "standard" },
        pkg_ai: { bot: "Our AI Tiers:", pkg: "ai" },
        talk: { bot: "I'll ask a few quick questions to get you the right recommendation...", intake: true }
    };

    let open = false, started = false, hist = [];
    function toggleChat(){
        open = !open;
        b.classList.toggle('open', open); w.classList.toggle('open', open);
        if(open && !started){ started = true; setTimeout(() => go('start'), 500); }
    }

    function addMsg(text, side){
        const m = document.getElementById('chat-msgs');
        const d = document.createElement('div'); d.className = `cmsg ${side}`;
        d.innerHTML = `<div class="msg-bubble">${text}</div>`;
        m.appendChild(d); m.scrollTop = m.scrollHeight;
        if(side === 'bot') speak(text);
    }

    function go(key, txt){
        if(txt) addMsg(txt, 'usr');
        const s = STEPS[key] || STEPS.start;
        const q = document.getElementById('chat-qr'); q.innerHTML = '';
        setTimeout(() => {
            addMsg(s.bot, 'bot');
            if(s.intake) startIntake();
            else if(s.pkg) renderPkgs(PKGS[s.pkg]);
            else if(s.qr) s.qr.forEach(qr => {
                const btn = document.createElement('button');
                btn.className = 'qrb'; btn.innerText = qr.l;
                btn.onclick = () => { if(qr.url) window.open(qr.url,'_blank'); else go(qr.s, qr.l); };
                q.appendChild(btn);
            });
        }, 500);
    }

    function renderPkgs(list){
        const m = document.getElementById('chat-msgs');
        const g = document.createElement('div'); g.className = 'cpkg-grid';
        list.forEach(p => {
            const c = document.createElement('div'); c.className = 'cpkg-card';
            c.innerHTML = `<div class="cpkg-name">${p.name}</div><div class="cpkg-desc">${p.desc}</div>`;
            c.onclick = () => go('talk', p.name);
            g.appendChild(c);
        });
        m.appendChild(g); m.scrollTop = m.scrollHeight;
    }

    window.chatSend = function(){
        const i = document.getElementById('chat-inp');
        const t = i.value.trim(); if(!t) return; i.value = '';
        addMsg(t, 'usr');
        if(intake.active) advanceIntake(t);
        else getAI(t);
    };

    function getAI(txt){
        const m = document.getElementById('chat-msgs');
        const td = document.createElement('div'); td.className = 'cmsg bot'; td.innerHTML = '...';
        m.appendChild(td);
        // Supabase Chat Proxy
        fetch('https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/chat-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                system: `You are ${THEME.persona}. You are helping a client of Prisca Dezigns.`,
                messages: [{role:'user', content:txt}] 
            })
        }).then(r=>r.json()).then(data=>{
            td.remove();
            addMsg(data.reply || "I've received your signal. Tap 'Talk to ${THEME.persona}' for a direct line.", 'bot');
        }).catch(()=> { td.remove(); addMsg("I'm having trouble connecting to the Council. Tap below for WhatsApp!", 'bot'); });
    }

    // Auto-trigger
    setTimeout(() => { if(!open) toggleChat(); }, 500);

})();
