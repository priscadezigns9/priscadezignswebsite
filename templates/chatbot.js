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
    const SB_URL = 'https://sazhdnqzaqpqcralmthh.supabase.co';
    const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhemhkbnF6YXFwcWNyYWxtdGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzE5NjYsImV4cCI6MjA5Mzc0Nzk2Nn0.uTyw31uWTNOTV5-HzNpm46vpAJABAsHLMzW-sYOkRhc';

    let open = false;
    let recording = false;
    let mediaRecorder = null;
    let audioChunks = [];
    let emojiOpen = false;

    // Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        #chat-widget { position: fixed; bottom: 20px; right: 20px; z-index: 10000; font-family: 'Plus Jakarta Sans', sans-serif; }
        #chat-btn { width: 60px; height: 60px; border-radius: 50%; background: ${THEME.accent}; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 25px ${THEME.glow}; transition: all 0.3s; border: none; }
        #chat-btn:hover { transform: scale(1.05); }
        #chat-btn svg { width: 28px; height: 28px; }
        #chat-box { position: absolute; bottom: 80px; right: 0; width: 380px; height: 600px; background: ${THEME.bg}; backdrop-filter: blur(20px); border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.2); display: flex; flex-direction: column; overflow: hidden; opacity: 0; transform: translateY(20px) scale(0.95); pointer-events: none; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        #chat-box.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .chat-hdr { background: ${THEME.secondary}; padding: 24px; color: white; }
        .chat-hdr-title { font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; }
        .chat-hdr-status { font-size: 0.75rem; color: rgba(255,255,255,0.8); display: flex; align-items: center; margin-top: 4px; font-weight: 600; }
        .chat-sdot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; margin-right: 8px; box-shadow: 0 0 10px #22c55e; }
        .chat-msgs { flex: 1; overflow-y: auto; padding: 20px; scroll-behavior: smooth; }
        .cmsg { margin-bottom: 16px; max-width: 85%; animation: msgSlide 0.4s ease forwards; opacity: 0; transform: translateY(10px); }
        @keyframes msgSlide { to { opacity: 1; transform: translateY(0); } }
        .cmsg.usr { margin-left: auto; background: ${THEME.accent}; color: white; padding: 12px 18px; border-radius: 18px 18px 2px 18px; font-size: 0.9rem; font-weight: 500; }
        .cmsg.bot { background: rgba(255,255,255,0.8); color: ${THEME.text}; padding: 12px 18px; border-radius: 18px 18px 18px 2px; font-size: 0.9rem; font-weight: 500; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .chat-inp-area { padding: 15px; border-top: 1px solid rgba(0,0,0,0.05); background: white; }
        .chat-inp-row { display: flex; align-items: center; gap: 10px; }
        #chat-inp { flex: 1; border: none; background: #f8f9fa; padding: 12px 15px; border-radius: 12px; outline: none; font-size: 0.9rem; color: #1a1a1a; font-weight: 500; }
        .cbtn { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; border: none; background: none; color: #666; }
        .cbtn:hover { background: #f0f0f0; color: ${THEME.accent}; }
        .cbtn svg { width: 20px; height: 20px; }
        #chat-qr { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .qrb { background: white; border: 1px solid ${THEME.accent}; color: ${THEME.accent}; padding: 8px 15px; border-radius: 10px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .qrb:hover { background: ${THEME.accent}; color: white; }
        #emoji-bar { display: none; padding: 10px; grid-template-columns: repeat(8, 1fr); gap: 5px; background: #f8f9fa; border-radius: 12px; margin-bottom: 10px; }
        #emoji-bar.open { display: grid; }
        .emoji-item { cursor: pointer; text-align: center; font-size: 1.2rem; }
    `;
    document.head.appendChild(style);

    const widget = document.createElement('div');
    widget.id = 'chat-widget';
    widget.innerHTML = `
        <button id="chat-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button>
        <div id="chat-box">
            <div class="chat-hdr">
                <div class="chat-hdr-title">${THEME.name}</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div>Active Now</div>
            </div>
            <div class="chat-msgs" id="chat-msgs"></div>
            <div class="chat-inp-area">
                <div id="emoji-bar">
                    <div class="emoji-item" onclick="addEmoji('😊')">😊</div>
                    <div class="emoji-item" onclick="addEmoji('👍')">👍</div>
                    <div class="emoji-item" onclick="addEmoji('🔥')">🔥</div>
                    <div class="emoji-item" onclick="addEmoji('🚀')">🚀</div>
                    <div class="emoji-item" onclick="addEmoji('✨')">✨</div>
                    <div class="emoji-item" onclick="addEmoji('💯')">💯</div>
                    <div class="emoji-item" onclick="addEmoji('❤️')">❤️</div>
                    <div class="emoji-item" onclick="addEmoji('🙏')">🙏</div>
                </div>
                <div id="chat-qr"></div>
                <div class="chat-inp-row">
                    <button class="cbtn" onclick="toggleEmoji()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></button>
                    <button class="cbtn" id="chat-mic" onclick="toggleRecording()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg></button>
                    <button class="cbtn" onclick="document.getElementById('chat-file').click()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
                    <input type="file" id="chat-file" style="display:none" onchange="uploadFile(this.files[0])">
                    <input type="text" id="chat-inp" placeholder="Type a message..." onkeydown="if(event.key==='Enter')chatSend()">
                    <button class="cbtn" onclick="chatSend()" style="color:${THEME.accent}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(widget);

    const STEPS = {
        start: { bot: `Hey 👋 Welcome to Prisca Dezigns. I am ${THEME.persona}. How can we evolve your brand today?`, qr: [{l:"Custom Website",s:"web"},{l:"AI Automation",s:"ai"},{l:"Packages",s:"pkg_ai"},{l:"Talk to Sierra",s:"talk"}] },
        web: { bot: "Our custom builds start at $1,500. We also offer 1-Day Custom Sites for $299.99. What fits your needs?", qr: [{l:"1-Day Site",s:"talk"},{l:"Custom Packages",s:"pkg_ai"},{l:"Back",s:"start"}] },
        ai: { bot: "From WhatsApp chatbots to Voice Agents, we build the machine that works while you sleep.", qr: [{l:"AI Tiers",s:"pkg_ai"},{l:"AI Consultancy",s:"talk"},{l:"Temperature Check",s:"temp"},{l:"Back",s:"start"}] },
        pkg_ai: { bot: "Tier 1: $199/mo (Basic Chat)\nTier 2: $499/mo (Lead Gen)\nTier 3: $999/mo (Autonomous Agency)", qr: [{l:"Select Tier 3",s:"talk"},{l:"Back",s:"start"}] },
        temp: { bot: "Temperature setting: 0.7 (Balanced). Use 'Creative' for more imagination.", qr: [{l:"Switch to Creative",s:"talk"},{l:"Back",s:"ai"}] },
        talk: { bot: "Connecting to the Council. Send a voice note or type your request.", qr: [{l:"WhatsApp",s:"wa"}] },
        wa: { bot: "Direct line established. Tap below to chat on WhatsApp.", qr: [{l:"Open WhatsApp",s:"wa_link"}] }
    };

    window.toggleChat = () => { open = !open; document.getElementById('chat-box').classList.toggle('open', open); if(open && document.getElementById('chat-msgs').children.length === 0) showStep('start'); };
    document.getElementById('chat-btn').onclick = toggleChat;

    function addMsg(txt, side) {
        const m = document.getElementById('chat-msgs');
        const d = document.createElement('div');
        d.className = `cmsg ${side}`;
        d.innerHTML = txt;
        m.appendChild(d);
        m.scrollTop = m.scrollHeight;
    }

    function showStep(s) {
        const step = STEPS[s];
        if(!step) return;
        if(s === 'wa_link') { window.open(WA, '_blank'); return; }
        addMsg(step.bot, 'bot');
        const qr = document.getElementById('chat-qr');
        qr.innerHTML = '';
        step.qr.forEach(q => {
            const b = document.createElement('button');
            b.className = 'qrb';
            b.innerText = q.l;
            b.onclick = () => showStep(q.s);
            qr.appendChild(b);
        });
    }

    window.addEmoji = (e) => { document.getElementById('chat-inp').value += e; };
    window.toggleEmoji = () => { emojiOpen = !emojiOpen; document.getElementById('emoji-bar').classList.toggle('open', emojiOpen); };

    window.chatSend = async () => {
        const i = document.getElementById('chat-inp');
        const t = i.value.trim(); if(!t) return;
        i.value = ''; addMsg(t, 'usr');
        
        try {
            const res = await fetch(`${SB_URL}/functions/v1/chat-proxy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ system: `You are ${THEME.persona}.`, messages: [{role:'user', content:t}] })
            });
            const data = await res.json();
            addMsg(data.reply || "Signal received. I'm processing.", 'bot');
        } catch(e) { addMsg("Connection interference. Try WhatsApp!", 'bot'); }
    };

    window.toggleRecording = async () => {
        const btn = document.getElementById('chat-mic');
        if(!recording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
                mediaRecorder.onstop = async () => {
                    const blob = new Blob(audioChunks, { type: 'audio/webm' });
                    uploadFile(blob, 'audio.webm');
                };
                mediaRecorder.start();
                recording = true;
                btn.style.color = 'red';
                addMsg("Recording... Tap again to send.", 'bot');
            } catch(e) { addMsg("Mic access denied.", 'bot'); }
        } else {
            mediaRecorder.stop();
            recording = false;
            btn.style.color = '#666';
        }
    };

    window.uploadFile = async (file, name) => {
        const fileName = name || file.name;
        addMsg(`Uploading ${fileName}...`, 'bot');
        const path = `uploads/${Date.now()}_${fileName}`;
        try {
            const res = await fetch(`${SB_URL}/storage/v1/object/media/${path}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${SB_KEY}`, 'Content-Type': file.type },
                body: file
            });
            if(res.ok) addMsg("File received. Sierra is processing.", 'bot');
            else addMsg("Upload failed. Try again.", 'bot');
        } catch(e) { addMsg("Network error during upload.", 'bot'); }
    };

    setTimeout(() => { if(!open) toggleChat(); }, 1500);

})();
