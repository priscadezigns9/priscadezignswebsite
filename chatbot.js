(function() {
    const cb_accent = '#7D52B5';
    const cb_secondary = '#743089';

    const styles = `
        #pd-chat-bubble { position: fixed; bottom: 20px; right: 20px; width: 64px; height: 64px; background: linear-gradient(135deg, ${cb_accent}, ${cb_secondary}); border-radius: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 9999; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        #pd-chat-bubble:hover { transform: scale(1.1) rotate(5deg); }
        #pd-chat-window { position: fixed; bottom: 100px; right: 20px; width: 440px; height: 780px; background: white; border-radius: 32px; display: none; flex-direction: column; box-shadow: 0 10px 40px rgba(0,0,0,0.15); z-index: 10000; overflow: hidden; font-family: 'Inter', sans-serif; opacity: 0; transform: translateY(20px); transition: all 0.3s ease; }
        #pd-chat-window.active { display: flex; opacity: 1; transform: translateY(0); }
        .chat-hdr { padding: 24px; background: linear-gradient(160deg, ${cb_accent}, ${cb_secondary}); color: white; display: flex; align-items: center; justify-content: space-between; }
        .chat-hdr-left { display: flex; align-items: center; gap: 12px; }
        .chat-avatar { width: 48px; height: 48px; background: white; border-radius: 14px; transform: rotate(-3deg); display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid rgba(255,255,255,0.3); }
        .chat-avatar img { width: 80%; height: auto; }
        .chat-status { font-size: 12px; opacity: 0.8; display: flex; align-items: center; gap: 6px; }
        .status-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; }
        #chat-msgs { flex: 1; overflow-y: auto; padding: 20px; background: #fafafa; display: flex; flex-direction: column; gap: 12px; }
        .msg { max-width: 80%; padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.5; }
        .msg-user { align-self: flex-end; background: ${cb_accent}; color: white; border-bottom-right-radius: 4px; }
        .msg-ai { align-self: flex-start; background: white; color: #1e1e1e; border-bottom-left-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .chat-inp-row { padding: 12px 16px; gap: 8px; border-top: 1px solid rgba(0,0,0,0.04); align-items: center; display: flex; }
        #chat-inp { background: #F4F4F9; border-radius: 16px; padding: 12px 16px; flex: 1; border: none; outline: none; font-size: 14px; }
        .icon-btn { background: none; border: none; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; padding: 8px; border-radius: 50%; }
        .icon-btn:hover { background: rgba(0,0,0,0.05); color: ${cb_accent}; }
        #chat-snd { background: ${cb_accent} !important; color: white !important; width: 40px; height: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(125, 82, 181, 0.3); }
        #emoji-picker { display: none; position: absolute; bottom: 80px; left: 20px; right: 20px; background: white; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 10000; padding: 12px; grid-template-columns: repeat(8, 1fr); gap: 8px; max-height: 200px; overflow-y: auto; }
        #emoji-picker.active { display: grid; }
        .emoji-item { cursor: pointer; font-size: 20px; text-align: center; padding: 4px; border-radius: 8px; }
        .emoji-item:hover { background: #f0f0f0; }
    `;

    const html = `
        <div id='pd-chat-bubble'>
            <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>
        </div>
        <div id='pd-chat-window'>
            <div class='chat-hdr'>
                <div class='chat-hdr-left'>
                    <div class='chat-avatar'><img src='https://share.zapia.com/57sonyoar08flg9xz5v667' alt='PD'></div>
                    <div>
                        <div style='font-weight:700;font-size:16px;'>Sierra</div>
                        <div class='chat-status'><div class='status-dot'></div> Online now</div>
                    </div>
                </div>
                <div onclick='window.toggleChat()' style='cursor:pointer;opacity:0.8;'><svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'><path d='M6 18L18 6M6 6l12 12'/></svg></div>
            </div>
            <div id='chat-msgs'></div>
            <div id='emoji-picker'></div>
            <div class='chat-inp-row'>
                <button class='icon-btn' onclick='window.toggleEmoji()'><svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='10'/><path d='M8 14s1.5 2 4 2 4-2 4-2'/><line x1='9' y1='9' x2='9.01' y2='9'/><line x1='15' y1='9' x2='15.01' y2='9'/></button>
                <button class='icon-btn' onclick="document.getElementById('chat-file').click()"><svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48'/></svg></button>
                <input type='file' id='chat-file' style='display:none' onchange='window.handleFile(this)' />
                <input type='text' id='chat-inp' placeholder='Type a message...' onkeydown="if(event.key==='Enter')window.chatSend()" />
                <button id='chat-mic' class='icon-btn' onclick='window.toggleMic()'><svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z'/><path d='M19 10v2a7 7 0 0 1-14 0v-2'/><line x1='12' y1='19' x2='12' y2='23'/></svg></button>
                <button id='chat-snd' class='icon-btn' onclick='window.chatSend()'><svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'><line x1='22' y1='2' x2='11' y2='13'/><polygon points='22 2 15 22 11 13 2 9 22 2'/></svg></button>
            </div>
        </div>
    `;

    const s = document.createElement('style'); s.innerHTML = styles; document.head.appendChild(s);
    const d = document.createElement('div'); d.innerHTML = html; document.body.appendChild(d);

    const msgs = document.getElementById('chat-msgs');
    const inp = document.getElementById('chat-inp');
    const win = document.getElementById('pd-chat-window');

    window.toggleChat = () => win.classList.toggle('active');
    document.getElementById('pd-chat-bubble').onclick = window.toggleChat;

    window.appendMsg = (t, r) => {
        const m = document.createElement('div'); m.className = `msg msg-${r}`; m.innerText = t;
        msgs.appendChild(m); msgs.scrollTop = msgs.scrollHeight;
    };

    window.chatSend = () => {
        const val = inp.value.trim();
        if(!val) return;
        window.appendMsg(val, 'user');
        inp.value = '';
        setTimeout(() => window.appendMsg("I'm Sierra, your AI strategist. How can I help today?", 'ai'), 800);
    };

    const emojis = ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"];
    window.toggleEmoji = () => { const p = document.getElementById('emoji-picker'); if (!p.innerHTML) p.innerHTML = emojis.map(e => `<span class='emoji-item' onclick='window.addEmoji("${e}")'>${e}</span>`).join(''); p.classList.toggle('active'); };
    window.addEmoji = (e) => { inp.value += e; inp.focus(); document.getElementById('emoji-picker').classList.remove('active'); };
    window.handleFile = (input) => { if(input.files[0]) window.appendMsg(`Attached: ${input.files[0].name}`, 'user'); };

    let mediaRecorder, chunks = [], recording = false;
    window.toggleMic = async () => {
        if (!recording) {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(s); chunks = [];
                mediaRecorder.ondataavailable = e => chunks.push(e.data);
                mediaRecorder.onstop = () => { window.appendMsg("Voice note recorded", "user"); s.getTracks().forEach(t => t.stop()); };
                mediaRecorder.start(); recording = true; document.getElementById('chat-mic').style.color = "#ef4444";
            } catch (e) { alert("Mic error: " + e); }
        } else { mediaRecorder.stop(); recording = false; document.getElementById('chat-mic').style.color = "#94a3b8"; }
    };
})();