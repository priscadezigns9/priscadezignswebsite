
(function(){
    if(window.PD_CHAT_LOADED) return;
    window.PD_CHAT_LOADED = True;

    const WA = "https://wa.me/18683424101";
    const PRIMARY = "#301934";
    const ACCENT = "#C8A2C8";
    const IVORY = "#FFFFF0";
    
    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #pd-chat-bubble {
            position: fixed; bottom: 30px; right: 30px;
            width: 65px; height: 65px;
            background: linear-gradient(135deg, ${PRIMARY}, #4a2650);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; z-index: 999999;
            box-shadow: 0 10px 30px rgba(48, 25, 52, 0.4);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: bubbleFloat 3s ease-in-out infinite;
        }
        @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        #pd-chat-bubble:hover { transform: scale(1.1) rotate(5deg); }
        #pd-chat-bubble svg { width: 30px; height: 30px; color: #fff; }
        #pd-chat-bubble .chat-x { display: none; font-size: 24px; color: #fff; font-weight: 300; }
        #pd-chat-bubble.active .chat-x { display: block; }
        #pd-chat-bubble.active svg { display: none; }

        #pd-chat-window {
            position: fixed; bottom: 110px; right: 30px;
            width: 400px; height: 650px;
            background: rgba(255, 255, 240, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(200, 162, 200, 0.3);
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
            display: none; flex-direction: column;
            overflow: hidden; z-index: 999998;
            font-family: 'Inter', sans-serif;
            transform-origin: bottom right;
            animation: chatOpen 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes chatOpen { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        #pd-chat-window.active { display: flex; }

        .chat-hdr {
            background: linear-gradient(135deg, ${PRIMARY}, #4a2650);
            padding: 24px; display: flex; align-items: center; gap: 15px; color: #fff;
        }
        .chat-avatar {
            width: 45px; height: 45px; border-radius: 50%;
            background: linear-gradient(135deg, ${ACCENT}, #9d50bb);
            display: flex; align-items: center; justify-content: center;
        }
        .chat-avatar svg { width: 24px; height: 24px; color: #fff; }
        .chat-hdr-name { font-weight: 700; font-size: 16px; letter-spacing: 0.5px; }
        .chat-hdr-status { font-size: 11px; opacity: 0.8; display: flex; align-items: center; gap: 5px; }
        .chat-sdot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; box-shadow: 0 0 10px #4ade80; }

        .chat-msgs { flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
        .cmsg { max-width: 85%; padding: 12px 18px; border-radius: 18px; font-size: 14px; line-height: 1.5; }
        .cmsg.bot { background: #fff; color: ${PRIMARY}; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .cmsg.usr { background: ${PRIMARY}; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }

        .chat-qr { padding: 0 24px 20px; display: flex; flex-direction: column; gap: 8px; }
        .qrb {
            background: #fff; border: 1px solid rgba(48, 25, 52, 0.1);
            padding: 12px 16px; border-radius: 100px;
            font-size: 13px; font-weight: 600; color: ${PRIMARY};
            cursor: pointer; transition: 0.3s; text-align: left;
            display: flex; align-items: center; gap: 10px;
        }
        .qrb:hover { background: ${ACCENT}; color: ${PRIMARY}; transform: translateX(5px); }

        .chat-inp-row { padding: 20px 24px; background: #fff; display: flex; align-items: center; gap: 12px; border-top: 1px solid rgba(0,0,0,0.05); }
        #chat-inp { flex: 1; border: none; outline: none; font-size: 14px; color: ${PRIMARY}; }
        .chat-btn { background: none; border: none; cursor: pointer; color: ${PRIMARY}; opacity: 0.6; transition: 0.3s; display: flex; align-items: center; }
        .chat-btn:hover { opacity: 1; transform: scale(1.1); }
        
        .typing-dots { display: flex; gap: 4px; }
        .typing-dots span { width: 6px; height: 6px; background: ${ACCENT}; border-radius: 50%; animation: typePulse 1s infinite alternate; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typePulse { from { opacity: 0.3; transform: scale(0.8); } to { opacity: 1; transform: scale(1.1); } }

        @media (max-width: 500px) {
            #pd-chat-window { width: calc(100% - 40px); right: 20px; bottom: 100px; height: 500px; }
            #pd-chat-bubble { bottom: 20px; right: 20px; width: 60px; height: 60px; }
        }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML
    const bubble = document.createElement('div');
    bubble.id = 'pd-chat-bubble';
    bubble.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai-svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
        <span class="chat-x">✕</span>
    `;
    document.body.appendChild(bubble);

    const window_el = document.createElement('div');
    window_el.id = 'pd-chat-window';
    window_el.innerHTML = `
        <div class="chat-hdr">
            <div class="chat-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path></svg>
            </div>
            <div style="flex:1">
                <div class="chat-hdr-name">Prisca AI Strategist</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div> High-Fidelity Online</div>
            </div>
        </div>
        <div id="chat-back-bar" style="padding:10px 24px; font-size:12px; color:${PRIMARY}; opacity:0.6; cursor:pointer; display:none;" onclick="chatBack()">← Back</div>
        <div class="chat-msgs" id="chat-msgs"></div>
        <div class="chat-qr" id="chat-qr"></div>
        <div class="chat-inp-row">
            <button class="chat-btn" onclick="toggleMic()">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line></svg>
            </button>
            <input type="text" id="chat-inp" placeholder="Type a message..." onkeydown="if(event.key==='Enter')chatSend()" />
            <button class="chat-btn" onclick="chatSend()">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
    `;
    document.body.appendChild(window_el);

    // 3. Logic
    let open = false;
    let history = [];
    const SYSTEM_PROMPT = "You are the Prisca Dezigns AI assistant — a high-fidelity strategist. You speak about our 1-Day Custom Sites ($299.99), Evolve Mobility (EV Dealership partner), and The Way Made Known (our mission). Keep it professional, warm, and sharp.";

    window.toggleChat = function(){
        open = !open;
        bubble.classList.toggle('active', open);
        window_el.classList.toggle('active', open);
        if(open && history.length === 0) setStep('start');
    };
    bubble.onclick = toggleChat;

    const STEPS = {
        start: {
            bot: "Welcome to the futurist hub of Prisca Dezigns. I am your AI strategist. How can we elevate your vision today?",
            r: [
                {l:"⚡ Agency Packages", s:"pkg_menu"},
                {l:"🎨 Template Shop", s:"pkg_templates"},
                {l:"🏢 About Prisca Dezigns", s:"about"}
            ]
        },
        pkg_menu: {
            bot: "Our high-fidelity agency packages are custom built for peak performance:\\n\\n- ⚡ 1-Day Custom Website: $299.99\\n- 🌐 Standard Web: From $1,500\\n- 🤖 AI Automation: From $1,500\\n- 🔧 System Continuity: $150/mo",
            r: [
                {l:"⚡ 1-Day Custom Website", s:"pkg_oneday"},
                {l:"🤖 AI & Automation", s:"pkg_ai"},
                {l:"🎨 Browse Template Shop", s:"pkg_templates"},
                {l:"← Back", s:"start"}
            ]
        },
        about: {
            bot: "Prisca Dezigns is a full-service digital agency led by Priscilla Narine. We build World-Class digital infrastructure for Caribbean businesses.",
            r: [
                {l:"🚗 Evolve Mobility", s:"about_brands"},
                {l:"✝️ The Way Made Known", s:"about_twmk"},
                {l:"👩‍💻 About Priscilla", s:"about_founder"},
                {l:"← Back", s:"start"}
            ]
        },
        about_brands: {
            bot: "We are the digital architects for Evolve Mobility (driveevolve.com), the Caribbean's premier EV dealership specializing in BYD, GAC, and Leapmotor.",
            r: [
                {l:"🌐 Visit Evolve", url:"https://driveevolve.com"},
                {l:"← Back", s:"about"}
            ]
        },
        about_twmk: {
            bot: "The Way Made Known is our NGO branch—the spiritual foundation of everything we build at Prisca Dezigns.",
            r: [
                {l:"🙏 Learn More", url:"https://thewaymadeknown.com"},
                {l:"← Back", s:"about"}
            ]
        },
        about_founder: {
            bot: "Prisca Dezigns is founded by Priscilla Narine—a results-oriented visionary with background in Chemistry and Payroll, dedicated to digital evolution.",
            r: [
                {l:"← Back", s:"about"}
            ]
        },
        pkg_templates: {
            bot: "Our Template Shop offers 40+ professional designs live in 24 hours. Standard: $149.99 setup + $19.99/mo.",
            r: [
                {l:"🛍️ Go to Shop", url:"https://priscadezigns.org/templates/"},
                {l:"← Back", s:"start"}
            ]
        }
    };

    function addMsg(txt, type){
        const m = document.getElementById('chat-msgs');
        const d = document.createElement('div');
        d.className = `cmsg ${type}`;
        d.innerHTML = txt.replace(/\n/g, '<br>');
        m.appendChild(d);
        m.scrollTop = m.scrollHeight;
    }

    function setStep(sid){
        const step = STEPS[sid];
        addMsg(step.bot, 'bot');
        const q = document.getElementById('chat-qr');
        q.innerHTML = '';
        step.r.forEach(btn => {
            const b = document.createElement('div');
            b.className = 'qrb';
            b.innerHTML = btn.l;
            b.onclick = () => {
                addMsg(btn.l, 'usr');
                if(btn.url) window.open(btn.url, '_blank');
                else setStep(btn.s);
            };
            q.appendChild(b);
        });
    }

    window.chatSend = function(){
        const inp = document.getElementById('chat-inp');
        const txt = inp.value.trim();
        if(!txt) return;
        inp.value = '';
        addMsg(txt, 'usr');
        
        const m = document.getElementById('chat-msgs');
        const td = document.createElement('div');
        td.className = 'cmsg bot typing';
        td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        m.appendChild(td);
        m.scrollTop = m.scrollHeight;

        history.push({role:'user', content:txt});
        fetch('https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/chat-proxy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ system: SYSTEM_PROMPT, messages: history, max_tokens: 300 })
        })
        .then(r => r.json())
        .then(data => {
            td.remove();
            if(data.reply){
                history.push({role:'assistant', content:data.reply});
                addMsg(data.reply, 'bot');
            } else {
                addMsg("I'm having a quick sync issue, but the team is available on WhatsApp! Tap above.", 'bot');
            }
        }).catch(() => {
            td.remove();
            addMsg("Connection issue. Tap above to WhatsApp us directly!", 'bot');
        });
    };

    window.toggleMic = function(){
        alert("Voice recognition initialized. Speak now...");
        // Basic webkit logic...
    };

    if(window.location.pathname.includes('/services')){
        setTimeout(toggleChat, 8000);
    }
})();
