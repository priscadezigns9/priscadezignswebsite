(function(){
    "use strict";

    /* ── High-Fidelity Chatbot Styles (v2.1 - Glassmorphism & Animations) ── */
    if(!document.getElementById('pd-chat-style')){
        const s = document.createElement('style');
        s.id = 'pd-chat-style';
        s.innerHTML = `
    :root {
        --cb-purple: #9d50bb;
        --cb-deep: #6e48aa;
        --cb-bg: rgba(255, 255, 255, 0.75);
        --cb-text: #1e1b4b;
    }
    
    #pd-chat-bubble {
        position:fixed; bottom:28px; right:28px; z-index:9999;
        width:64px; height:64px; border-radius:24px;
        background: linear-gradient(135deg, var(--cb-purple), var(--cb-deep));
        box-shadow: 0 12px 40px rgba(157, 80, 187, 0.4);
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: bubbleFloat 3s ease-in-out infinite;
    }
    #pd-chat-bubble:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 15px 50px rgba(157, 80, 187, 0.6); }
    #pd-chat-bubble.open { transform: scale(0.9) rotate(90deg); background: #1e1b4b; }
    #pd-chat-bubble .chat-x { display:none; color:#fff; font-size:24px; font-weight:300; }
    #pd-chat-bubble.open .chat-x { display:block; }
    #pd-chat-bubble.open .ai-svg { display:none; }
    
    #pd-chat-window {
        position:fixed; bottom:110px; right:28px; z-index:9998;
        width:420px; height:650px; border-radius:32px;
        background: var(--cb-bg);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        box-shadow: 0 25px 80px rgba(0,0,0,0.15);
        display:flex; flex-direction:column; overflow:hidden;
        opacity:0; pointer-events:none; transform: translateY(30px) scale(0.95);
        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        border: 1px solid rgba(255,255,255,0.4);
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform: translateY(0) scale(1); }
    
    .chat-hdr { 
        padding:32px; background: rgba(30, 27, 75, 0.85); 
        backdrop-filter: blur(10px);
        color:#fff; display:flex; align-items:center; 
    }
    .chat-avatar { width:52px; height:52px; border-radius:18px; margin-right:16px; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
    .chat-hdr-name { font-size:1.25rem; font-weight:800; letter-spacing:-0.02em; line-height:1.2; }
    .chat-hdr-status { font-size:0.75rem; color:rgba(255,255,255,0.7); display:flex; align-items:center; margin-top:4px; font-weight:600; }
    .chat-sdot { width:8px; height:8px; background:#22c55e; border-radius:50%; margin-right:8px; box-shadow: 0 0 10px #22c55e; }
    
    .chat-msgs { flex:1; overflow-y:auto; padding:32px; scroll-behavior: smooth; }
    .cmsg { margin-bottom:20px; max-width:85%; animation: msgSlide 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; opacity: 0; transform: translateY(10px); }
    @keyframes msgSlide { to { opacity: 1; transform: translateY(0); } }
    
    .cmsg.bot { align-self: flex-start; }
    .cmsg.usr { align-self: flex-end; margin-left:auto; }
    .msg-bubble { 
        padding:16px 20px; border-radius:22px; font-size:0.9375rem; line-height:1.5; font-weight:500; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }
    .bot .msg-bubble { background:#fff; color:var(--cb-text); border-bottom-left-radius:6px; border: 1px solid rgba(0,0,0,0.05); }
    .usr .msg-bubble { background: linear-gradient(135deg, var(--cb-purple), var(--cb-deep)); color:#fff; border-bottom-right-radius:6px; box-shadow: 0 10px 25px rgba(157, 80, 187, 0.2); }
    
    .chat-inp-row { padding:24px 32px; border-top:1px solid rgba(0,0,0,0.05); display:flex; align-items:center; background: rgba(255,255,255,0.5); }
    .inp-wrap { flex:1; position:relative; display:flex; align-items:center; background:#f1f5f9; border-radius:18px; padding:4px 8px; transition: all 0.3s; }
    .inp-wrap:focus-within { background:#fff; box-shadow: 0 0 0 3px rgba(157, 80, 187, 0.1); }
    #chat-inp { width:100%; border:none; background:transparent; padding:12px; outline:none; font-size:0.9375rem; font-weight:600; color:var(--cb-text); }
    
    .chat-btn { background:none; border:none; padding:8px; cursor:pointer; color:#64748b; transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
    .chat-btn:hover { color:var(--cb-purple); transform: scale(1.1); }
    .chat-btn svg { width:20px; height:20px; }
    .snd-btn { color:var(--cb-purple); margin-left:8px; }
    
    .typing-dots { display:flex; gap:4px; padding:12px 16px; background:#fff; border-radius:18px; width:fit-content; border:1px solid rgba(0,0,0,0.05); }
    .typing-dots span { width:6px; height:6px; background:#cbd5e1; border-radius:50%; animation: dotPulse 1.4s infinite; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes dotPulse { 0%, 100% { transform: scale(1); opacity:0.4; } 50% { transform: scale(1.3); opacity:1; } }
    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

    /* Glassmorphic Options & Cards */
    .chat-qr { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
    .cqr-btn { 
        padding:10px 18px; background:#fff; border:1px solid rgba(0,0,0,0.05); border-radius:14px; 
        font-size:0.8125rem; font-weight:700; color:var(--cb-purple); cursor:pointer; 
        transition:all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 4px 10px rgba(0,0,0,0.02);
    }
    .cqr-btn:hover { transform: translateY(-3px) scale(1.05); background: var(--cb-purple); color:#fff; box-shadow: 0 10px 20px rgba(157, 80, 187, 0.2); }
    
    @media(max-width:480px){
        #pd-chat-window { width:calc(100vw - 40px); height:calc(100vh - 140px); right:20px; bottom:100px; }
    }
    `;
        document.head.appendChild(s);
    }

    /* ── Build Chatbot DOM ── */
    let open = false;
    const b = document.createElement('div');
    b.id = 'pd-chat-bubble';
    b.innerHTML = `
        <svg class="ai-svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        <span class="chat-x">✕</span>
    `;
    b.onclick = toggleChat;
    document.body.appendChild(b);

    const w = document.createElement('div');
    w.id = 'pd-chat-window';
    w.innerHTML = `
        <div class="chat-hdr">
            <div class="chat-avatar"><img src="https://share.zapia.com/57sonyoar08flg9xz5v667" style="width:32px"></div>
            <div>
                <div class="chat-hdr-name">Sierra</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div> Online Now</div>
            </div>
        </div>
        <div class="chat-msgs" id="chat-msgs"></div>
        <div class="chat-inp-row">
            <div class="inp-wrap">
                <button class="chat-btn" title="Add Attachment" onclick="document.getElementById('chat-file').click()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                </button>
                <input type="text" id="chat-inp" placeholder="Message Sierra..." onkeydown="if(event.key==='Enter')chatSend()">
                <button class="chat-btn" title="Emojis" onclick="toggleEmojis()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                </button>
            </div>
            <button class="chat-btn snd-btn" onclick="chatSend()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
            <input type="file" id="chat-file" style="display:none" onchange="handleChatFile(this)">
        </div>
    `;
    document.body.appendChild(w);

    /* ── Logics ── */
    function toggleChat(){
        open = !open;
        b.classList.toggle('open', open);
        w.classList.toggle('open', open);
        if(open && document.getElementById('chat-msgs').children.length === 0) go('start');
    }

    function addMsg(text, side){
        const m = document.getElementById('chat-msgs');
        const d = document.createElement('div');
        d.className = 'cmsg ' + side;
        d.innerHTML = `<div class="msg-bubble">${text}</div>`;
        m.appendChild(d);
        m.scrollTop = m.scrollHeight;
    }

    const STEPS = {
        'start': {
            bot: "Látom. I am Sierra, your Strategic Council agent. How can I help you evolve your brand today?",
            qr: [
                {l: "Web Design", s: "web"},
                {l: "AI Automation", s: "ai"},
                {l: "E-commerce", s: "shop"},
                {l: "Talk to Human", s: "talk"}
            ]
        },
        'web': {
            bot: "We specialize in High-Fidelity Web Design (v14.5 Architecture). Looking for a new site or a redesign?",
            qr: [{l: "Redesign my site", s: "talk"}, {l: "New Project", s: "talk"}, {l: "Back", s: "start"}]
        },
        'ai': {
            bot: "Our AI Council (Drew & Sierra) handles lead conversion, customer service, and data entry automation. Want a demo?",
            qr: [{l: "Request Demo", s: "talk"}, {l: "See Pricing", s: "talk"}, {l: "Back", s: "start"}]
        },
        'shop': {
            bot: "Visit our Template Shop for high-conversion storefronts. Ready to build?",
            qr: [{l: "Open Shop", url: "https://priscadezigns.org/templates/"}, {l: "Back", s: "start"}]
        },
        'talk': {
            bot: "Connecting you to the Strategic Council. Please leave your email and message below, and Drew will reach out shortly.",
            qr: [{l: "Back to menu", s: "start"}]
        }
    };

    function go(s){
        const step = STEPS[s];
        addMsg(step.bot, 'bot');
        const qr = document.getElementById('chat-qr') || document.createElement('div');
        qr.id = 'chat-qr'; qr.className = 'chat-qr';
        qr.innerHTML = '';
        step.qr.forEach(q => {
            const btn = document.createElement('button');
            btn.className = 'cqr-btn';
            btn.innerText = q.l;
            btn.onclick = () => {
                if(q.url) window.open(q.url, '_blank');
                else { addMsg(q.l, 'usr'); setTimeout(() => go(q.s), 500); }
            };
            qr.appendChild(btn);
        });
        document.getElementById('chat-msgs').appendChild(qr);
        document.getElementById('chat-msgs').scrollTop = document.getElementById('chat-msgs').scrollHeight;
    }

    window.chatSend = function(){
        const i = document.getElementById('chat-inp');
        const t = i.value.trim(); if(!t) return;
        i.value = ''; addMsg(t, 'usr');
        
        const m = document.getElementById('chat-msgs');
        const td = document.createElement('div');
        td.className = 'cmsg bot';
        td.id = 'typing-id';
        td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        m.appendChild(td); m.scrollTop = m.scrollHeight;
        
        // Mock Response for now
        setTimeout(() => {
            if(document.getElementById('typing-id')) document.getElementById('typing-id').remove();
            addMsg("I've received your signal. The Council is processing it. Látom.", 'bot');
        }, 1500);
    };

    window.handleChatFile = function(input){
        const file = input.files[0];
        if(!file) return;
        addMsg(`📎 Uploading: ${file.name}`, 'usr');
        setTimeout(() => addMsg(`✅ File secured in Media Vault. Sierra is analyzing...`, 'bot'), 1000);
    };

    window.toggleEmojis = function(){
        addMsg("Emoji picker initialized. 😊🚀🔥", 'bot');
    };

})();
