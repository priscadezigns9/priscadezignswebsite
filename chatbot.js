(function(){
    const s = document.createElement('style');
    s.textContent = `:root{--cb-lp:#9d50bb;--cb-gp:#6e48aa;--cb-bg:rgba(255,255,255,0.98)}#pd-chat-bubble{position:fixed;bottom:28px;right:28px;z-index:9999;width:64px;height:64px;border-radius:22px;background:linear-gradient(135deg,var(--cb-lp),var(--cb-gp));box-shadow:0 12px 40px rgba(157,80,187,0.4);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.4s}#pd-chat-bubble.open{transform:scale(0.9) rotate(90deg);background:#333}#pd-chat-window{position:fixed;bottom:108px;right:28px;z-index:9998;width:420px;background:var(--cb-bg);backdrop-filter:blur(12px);border:1px solid rgba(157,80,187,0.15);box-shadow:0 30px 90px rgba(48, 25, 52, 0.18);display:flex;flex-direction:column;opacity:0;pointer-events:none;transform:translateY(30px);transition:all 0.4s;max-height:720px;border-radius:24px;overflow:hidden}#pd-chat-window.open{opacity:1;pointer-events:all;transform:translateY(0)}.chat-hdr{background:linear-gradient(to right,var(--cb-lp),var(--cb-gp));padding:22px 26px;display:flex;align-items:center;gap:16px;color:#fff}.chat-msgs{flex:1;overflow-y:auto;padding:24px 20px;display:flex;flex-direction:column;gap:16px;max-height:480px}.cmsg{max-width:85%;font-size:0.95rem;padding:14px 18px;border-radius:18px}.cmsg.bot{background:#fff;align-self:flex-start;border:1px solid rgba(157,80,187,0.1)}.cmsg.usr{background:var(--cb-lp);color:#fff;align-self:flex-end}.chat-inp-row{display:flex;border-top:1px solid rgba(0,0,0,0.05);padding:6px 12px;background:#fff}#chat-inp{flex:1;border:none;padding:18px 16px;outline:none}#chat-mic{background:none;border:none;cursor:pointer;color:var(--cb-lp)}#chat-mic.recording{color:#ff4d4d;animation:pulse 1.5s infinite}@keyframes pulse{0%{transform:scale(1)}70%{transform:scale(1.1)}100%{transform:scale(1)}}`;
    document.head.appendChild(s);
    if(!document.getElementById('pd-chat-bubble')){
        const b = document.createElement('div');
        b.id = 'pd-chat-bubble'; b.onclick = () => toggleChat();
        b.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" stroke="white" stroke-width="2" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
        document.body.appendChild(b);
        const w = document.createElement('div');
        w.id = 'pd-chat-window';
        w.innerHTML = `<div class="chat-hdr">Prisca Dezigns</div><div class="chat-msgs" id="chat-msgs"></div><div class="chat-inp-row"><button id="chat-mic" onclick="toggleMic()"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path></svg></button><input type="text" id="chat-inp" placeholder="Type a message..." onkeydown="if(event.key==='Enter')chatSend()"/></div>`;
        document.body.appendChild(w);
    }

    const SYSTEM_PROMPT = "You are the Prisca Dezigns AI assistant. You are knowledgeable about our Privacy Policy, Terms, and Blogs. We accept PayPal, Banking, and Crypto (BTC/ADA). US account available. Advanced sandboxing protects client data.";
    let history = [];
    window.toggleChat = () => { document.getElementById('pd-chat-window').classList.toggle('open'); };
    window.chatSend = (t) => {
        const i = document.getElementById('chat-inp');
        const txt = t || i.value.trim(); if(!txt) return;
        if(!t) i.value = ''; addMsg(txt, 'usr');
        history.push({role:'user', content:txt});
        fetch('https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/chat-proxy', {
            method:'POST', headers:{'Content-Type':'application/json'},
            body:JSON.stringify({system:SYSTEM_PROMPT, messages:history})
        }).then(r=>r.json()).then(d=>{ if(d.reply){ addMsg(d.reply, 'bot'); history.push({role:'assistant', content:d.reply}); }});
    };
    function addMsg(t, type){ const m = document.getElementById('chat-msgs'); const d = document.createElement('div'); d.className='cmsg '+type; d.textContent=t; m.appendChild(d); m.scrollTop=m.scrollHeight; }

    let rec = null;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SR){
        rec = new SR(); rec.continuous = false;
        rec.onstart = () => { document.getElementById('chat-mic').classList.add('recording'); document.getElementById('chat-inp').placeholder = "Listening..."; };
        rec.onresult = (e) => { const t = e.results[0][0].transcript; document.getElementById('chat-inp').value = t; chatSend(); };
        rec.onerror = rec.onend = () => { document.getElementById('chat-mic').classList.remove('recording'); document.getElementById('chat-inp').placeholder = "Type a message..."; };
    }
    window.toggleMic = () => { if(rec) try { rec.start(); } catch(e) { rec.stop(); } };
})();