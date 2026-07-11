(function(){
    "use strict";

    /* ── High-Fidelity Template Chatbot Styles ── */
    if(!document.getElementById('pd-chat-style')){
        const s = document.createElement('style');
        s.id = 'pd-chat-style';
        s.innerHTML = `
    :root {
        --cb-purple: #9d50bb;
        --cb-deep: #6e48aa;
        --cb-bg: rgba(255, 255, 240, 0.95);
        --cb-text: #1a1a1a;
    }
    
    #pd-chat-bubble {
        position:fixed; bottom:28px; right:28px; z-index:9999;
        width:64px; height:64px; border-radius:24px;
        background: linear-gradient(135deg, var(--cb-purple), var(--cb-deep));
        box-shadow: 0 12px 40px rgba(157, 80, 187, 0.4);
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: bubbleFloat 3s ease-in-out infinite;
    }
    #pd-chat-bubble:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 15px 50px rgba(157, 80, 187, 0.6); }
    #pd-chat-bubble.open { transform: scale(0.9) rotate(90deg); background: #333; }
    #pd-chat-bubble .chat-x { display:none; color:#fff; font-size:24px; font-weight:300; }
    #pd-chat-bubble.open .chat-x { display:block; }
    #pd-chat-bubble.open .ai-svg { display:none; }
    
    /* ── Chat Window ── */
    #pd-chat-window {
        position:fixed; bottom:108px; right:28px; z-index:9998;
        width:400px; max-width: calc(100vw - 40px);
        background: var(--cb-bg);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 80px rgba(0, 0, 0, 0.15);
        display:flex; flex-direction:column;
        opacity:0; pointer-events:none;
        transform: translateY(30px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        max-height: calc(100vh - 150px);
        border-radius: 32px;
        overflow: hidden;
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform: translateY(0) scale(1); }
    
    .chat-hdr { background: linear-gradient(135deg, var(--cb-purple), var(--cb-deep)); padding:22px 26px; display:flex; align-items:center; gap:16px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .chat-avatar { width:48px; height:48px; border-radius:18px; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
    .chat-hdr-name { font-size:1.05rem; font-weight:800; color:#fff; }
    .chat-hdr-status { font-size:0.75rem; color:rgba(255,255,255,0.7); display:flex; align-items:center; gap:6px; margin-top:2px; }
    .chat-sdot { width:8px; height:8px; border-radius:50%; background:#00ffa3; box-shadow: 0 0 10px #00ffa3; animation: pgr 2s infinite; }
    @keyframes pgr { 0%,100%{opacity:1; transform: scale(1);} 50%{opacity:0.6; transform: scale(1.2);} }
    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    
    .chat-msgs { flex:1; overflow-y:auto; padding:24px; display:flex; flex-direction:column; gap:14px; min-height:300px; }
    .cmsg { max-width:85%; font-size:0.95rem; line-height:1.5; padding:14px 18px; border-radius:20px; font-weight: 500; }
    .cmsg.bot { background:#fff; color:var(--cb-text); align-self:flex-start; border-radius: 20px 20px 20px 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.05); }
    .cmsg.usr { background: var(--cb-purple); color:#fff; align-self:flex-end; border-radius: 20px 20px 4px 20px; box-shadow: 0 8px 20px rgba(157, 80, 187, 0.2); }
    
    .chat-qr { padding:0 24px 24px; display:flex; flex-wrap:wrap; gap:10px; }
    .qrb { font-size:0.85rem; font-weight:700; padding:12px 20px; border:1.5px solid var(--cb-purple); background:#fff; cursor:pointer; color:var(--cb-purple); border-radius:16px; transition:all 0.2s; }
    .qrb:hover { background:var(--cb-purple); color:#fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(157, 80, 187, 0.2); }
    
    .chat-inp-row { display:flex; padding:12px 12px 24px 24px; align-items:center; gap:12px; }
    #chat-inp { flex:1; border:none; background:rgba(0,0,0,0.03); padding:16px 20px; border-radius:18px; font-size:0.95rem; outline:none; transition: all 0.2s; }
    #chat-inp:focus { background:rgba(0,0,0,0.05); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); }
    
    #chat-mic { background: transparent; border: none; cursor: pointer; color: var(--cb-purple); opacity: 0.5; transition: all 0.2s; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 14px; }
    #chat-mic:hover { opacity: 1; background: rgba(157, 80, 187, 0.05); }
    #chat-mic.recording { color: #ff4d4d; opacity: 1; animation: cbPulse 1.5s infinite; background: rgba(255, 77, 77, 0.1); }
    @keyframes cbPulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
    
    #chat-snd { background: var(--cb-purple); border:none; cursor:pointer; width:48px; height:48px; border-radius:16px; color:#fff; display:flex; align-items:center; justify-content:center; transition: all 0.3s; box-shadow: 0 4px 12px rgba(157, 80, 187, 0.3); }
    #chat-snd:hover { transform: scale(1.05); background: var(--cb-deep); }
    
    @media(max-width:500px){
        #pd-chat-window { width: calc(100vw - 32px); right:16px; bottom:100px; border-radius: 28px; }
        #pd-chat-bubble { width:60px; height:60px; bottom:20px; right:20px; }
    }
    `;
        document.head.appendChild(s);
    }

    // Standard high-fidelity icons
    const MIC_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
    const SEND_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
    const BOT_ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path></svg>';
    
    if(!document.getElementById('pd-chat-bubble')){
        const c = document.createElement('div');
        c.innerHTML = `
    <div id="pd-chat-bubble" onclick="toggleChat()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="ai-svg" style="width:28px; height:28px; color:#fff;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
        <span class="chat-x">✕</span>
    </div>
    <div id="pd-chat-window">
        <div class="chat-hdr">
            <div class="chat-avatar">${BOT_ICON}</div>
            <div style="flex:1">
                <div class="chat-hdr-name">Template Assistant</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div> Active now</div>
            </div>
        </div>
        <div class="chat-msgs" id="chat-msgs"></div>
        <div class="chat-qr" id="chat-qr"></div>
        <div class="chat-inp-row">
            <button id="chat-mic" onclick="toggleMic()">${MIC_SVG}</button>
            <input type="text" id="chat-inp" placeholder="Type a message..." onkeydown="if(event.key==='Enter')chatSend()" />
            <button id="chat-snd" onclick="chatSend()">${SEND_SVG}</button>
        </div>
    </div>`;
        document.body.appendChild(c);
    }

    /* ── Voice Engine ── */
    let recognition = null;
    if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onresult = (e) => {
            let t = '';
            for(let i=e.resultIndex; i<e.results.length; ++i) t += e.results[i][0].transcript;
            const inp = document.getElementById('chat-inp');
            if(inp) {
                inp.value = t;
                inp.placeholder = 'Listening...';
            }
        };
        
        recognition.onerror = () => stopMic();
        recognition.onend = () => stopMic();
    }

    window.toggleMic = function(){
        if(!recognition) return alert("Voice recording is not supported on this browser.");
        const btn = document.getElementById('chat-mic');
        if(btn.classList.contains('recording')){
            stopMic();
            setTimeout(() => { if(document.getElementById('chat-inp').value.trim()) chatSend(); }, 300);
        } else {
            startMic();
        }
    };

    function startMic(){
        if(!recognition) return;
        document.getElementById('chat-mic').classList.add('recording');
        document.getElementById('chat-inp').placeholder = 'Speak now...';
        recognition.start();
    }
    function stopMic(){
        if(!recognition) return;
        document.getElementById('chat-mic').classList.remove('recording');
        document.getElementById('chat-inp').placeholder = 'Type a message...';
        recognition.stop();
    }

    /* ── Logic ── */
    const STEPS = {
        "start": {
            "bot": "Hey 👋 I'm your Template Assistant. Which of our professional designs caught your eye?",
            "r": [
                { "l": "🎨 See templates", "s": "templates" },
                { "l": "📦 Package details", "s": "pricing" },
                { "l": "🚀 How it works", "s": "process" },
                { "l": "💬 Talk to Drew", "s": "talk" }
            ]
        },
        "templates": {
            "bot": "We have 24 high-fidelity designs ready to launch. You pick the style, we swap in your branding and content. Which niche are you in?",
            "r": [
                { "l": "💼 Professional Services", "s": "cat_pro" },
                { "l": "✨ Beauty & Wellness", "s": "cat_beauty" },
                { "l": "🍽️ Food & Beverage", "s": "cat_food" },
                { "l": "🏠 Real Estate", "s": "cat_home" },
                { "l": "← Back", "s": "start" }
            ]
        },
        "pricing": {
            "bot": "Template sites start at **$149.99 setup + $19.99/mo** for hosting and basic updates. We also have high-fidelity 3D templates for **$200 setup**.",
            "r": [
                { "l": "🛒 Micro Store ($249.99)", "s": "store" },
                { "l": "✍️ Copywriting Add-on", "s": "copy" },
                { "l": "🤖 Chatbot Add-on", "s": "chatbot" },
                { "l": "← Back", "s": "start" }
            ]
        },
        "process": {
            "bot": "It's simple: \n1. Pick your template\n2. Fill our short content form\n3. We build and launch in 24-72 hours.",
            "r": [
                { "l": "Let's do it", "s": "talk" },
                { "l": "← Back", "s": "start" }
            ]
        },
        "talk": {
            "bot": "Great! I've flagged Drew, our lead technical voice. He'll reach out to finalize your vision. Or you can jump straight to our WhatsApp:",
            "r": [
                { "l": "Chat on WhatsApp", "url": "https://wa.me/18683424101" },
                { "l": "← Back", "s": "start" }
            ]
        }
    };

    let open = false;
    let hist = [];

    window.toggleChat = function(){
        open = !open;
        document.getElementById('pd-chat-bubble').classList.toggle('open', open);
        document.getElementById('pd-chat-window').classList.toggle('open', open);
        if(open && hist.length === 0) go('start');
    };

    function go(step, label){
        if(label) addMsg(label, 'usr');
        const s = STEPS[step];
        if(!s) return;
        setTimeout(() => {
            addMsg(s.bot, 'bot');
            const qr = document.getElementById('chat-qr');
            qr.innerHTML = '';
            if(s.r) s.r.forEach(r => {
                const b = document.createElement('button');
                b.className = 'qrb';
                b.innerText = r.l;
                b.onclick = () => {
                    if(r.url) window.open(r.url, '_blank');
                    else go(r.s, r.l);
                };
                qr.appendChild(b);
            });
        }, 400);
    }

    function addMsg(txt, role){
        const m = document.getElementById('chat-msgs');
        const d = document.createElement('div');
        d.className = `cmsg ${role}`;
        d.innerText = txt;
        m.appendChild(d);
        m.scrollTop = m.scrollHeight;
        hist.push({role, txt});
    }

    window.chatSend = function(){
        const i = document.getElementById('chat-inp');
        const t = i.value.trim();
        if(!t) return;
        i.value = '';
        addMsg(t, 'usr');
        
        // Typing indicator
        const m = document.getElementById('chat-msgs');
        const td = document.createElement('div');
        td.className = 'cmsg bot typing';
        td.id = 't-id';
        td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        m.appendChild(td);
        m.scrollTop = m.scrollHeight;
        
        setTimeout(() => {
            if(document.getElementById('t-id')) document.getElementById('t-id').remove();
            addMsg("I've received your message! One of our specialists (Sierra or Drew) will review this shortly. For immediate service, feel free to WhatsApp us at 1-868-342-4101.", 'bot');
        }, 1200);
    };

})();
