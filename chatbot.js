(function(){
    "use strict";
    if(!document.getElementById('pd-chat-style')){
        const s = document.createElement('style');
        s.id = 'pd-chat-style';
        s.innerHTML = `
    :root { 
        --pd-deep: #301934; 
        --pd-lilac: #C8A2C8; 
        --pd-ivory: #FFFFF0; 
    }
    #pd-chat-bubble { 
        position:fixed; bottom:28px; right:28px; z-index:9999; 
        width:64px; height:64px; border-radius:22px; 
        background: var(--pd-deep); cursor:pointer; 
        display:flex; align-items:center; justify-content:center; 
        transition: all 0.4s; box-shadow: 0 8px 32px rgba(48, 25, 52, 0.3);
    }
    #pd-chat-bubble:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(48, 25, 52, 0.45); }
    
    #pd-chat-window { 
        position:fixed; bottom:110px; right:28px; z-index:9998; 
        width:400px; height:620px; border-radius:28px; 
        background: rgba(255, 255, 240, 0.9); backdrop-filter: blur(20px); 
        border: 1.5px solid rgba(48, 25, 52, 0.1); 
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.15); 
        opacity:0; pointer-events:none; transform:translateY(20px) scale(0.98); 
        transition: all 0.4s; overflow:hidden; display:flex; flex-direction:column; 
        font-family: 'Inter', sans-serif; 
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
    
    #pd-chat-header { padding: 30px; background: var(--pd-deep); color: var(--pd-ivory); }
    #pd-chat-header h2 { margin:0; font-size:24px; font-weight:800; font-family: 'Playfair Display', serif; }
    #pd-chat-header p { margin:4px 0 0; font-size:11px; font-weight:900; color: var(--pd-lilac); text-transform:uppercase; letter-spacing:2px; }
    
    #chat-msgs { flex:1; padding:25px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; }
    .cmsg { max-width:85%; padding:12px 18px; font-size:14px; font-weight:600; border-radius: 18px; line-height:1.5; }
    .cmsg.bot { align-self:flex-start; background: #fff; color: var(--pd-deep); border-radius: 18px 18px 18px 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .cmsg.usr { align-self:flex-end; background: var(--pd-deep); color: var(--pd-ivory); border-radius: 18px 18px 4px 18px; }
    
    #chat-input-area { padding:20px; background: rgba(255,255,255,0.4); display:flex; align-items:center; gap:12px; border-top: 1px solid rgba(48, 25, 52, 0.05); }
    #chat-inp { flex:1; border:none; background:none; outline:none; font-size:14px; font-weight:600; color: var(--pd-deep); }
    
    #pd-emoji-picker {
        position: absolute; bottom: 85px; right: 20px; width: 300px; height: 350px;
        background: #fff; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        display: none; flex-direction: column; z-index: 10000; border: 1px solid rgba(0,0,0,0.05);
    }
    #pd-emoji-picker.open { display: flex; }
    #pd-emoji-list { flex:1; overflow-y:auto; padding:12px; display:grid; grid-template-columns: repeat(7, 1fr); gap:8px; }
    .emoji-item { cursor:pointer; font-size:22px; text-align:center; transition:0.2s; padding:5px; border-radius:8px; }
    .emoji-item:hover { background: var(--pd-ivory); transform:scale(1.2); }
    `;
        document.head.appendChild(s);
    }
    
    const b = document.createElement('div'); b.id = 'pd-chat-bubble'; 
    b.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="#C8A2C8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'; 
    document.body.appendChild(b);
    
    const w = document.createElement('div'); w.id = 'pd-chat-window'; 
    w.innerHTML = `
        <div id="pd-chat-header"><h2>Sierra</h2><p>Strategic Business Agent</p></div>
        <div id="chat-msgs"></div>
        <div id="chat-input-area">
            <button onclick="document.getElementById('chat-file').click()" style="background:none; border:none; cursor:pointer; font-size:18px;">📎</button>
            <input type="file" id="chat-file" style="display:none" onchange="handleFile(this)">
            <input type="text" id="chat-inp" placeholder="Type your message..." onkeypress="if(event.key==='Enter') chatSend()">
            <button onclick="toggleEmojis()" style="background:none; border:none; cursor:pointer; font-size:18px;">😊</button>
        </div>
    `;
    document.body.appendChild(w);
    
    const emojis = ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🤲","👐","🙌","👏","🤝","👍","👎","👊","✊","🤛","🤜","🤞","✌️","🤟","🤘","👌","🤌","🤏","👈","👉","👆","👇","☝️","✋","🤚","🖐","🖖","👋","🤙","💪","🦾","🖕","✍️","🙏","🦶","🦵","🦿","👄","🦷","👅","👃","👂","🦻","👣","👁","👀","🧠","🗣","👤","👥"];

    b.onclick = () => { w.classList.toggle('open'); };
    
    window.addMsg = (text, side) => { 
        const m = document.getElementById('chat-msgs'); 
        const d = document.createElement('div'); 
        d.className = 'cmsg ' + side; 
        d.innerText = text; 
        m.appendChild(d); 
        m.scrollTop = m.scrollHeight; 
    };
    
    window.chatSend = () => { 
        const i = document.getElementById('chat-inp'); 
        const t = i.value.trim(); if(!t) return; 
        i.value = ''; addMsg(t, 'usr'); 
        setTimeout(() => addMsg("Understood. Sierra is processing your request using the Strategic Council's logic.", 'bot'), 800); 
    };

    window.toggleEmojis = () => {
        let p = document.getElementById('pd-emoji-picker');
        if(!p){
            p = document.createElement('div'); p.id = 'pd-emoji-picker';
            p.innerHTML = '<div id="pd-emoji-list"></div>';
            w.appendChild(p);
            const list = document.getElementById('pd-emoji-list');
            emojis.forEach(e => {
                const s = document.createElement('span'); s.className='emoji-item'; s.innerText=e;
                s.onclick = () => { document.getElementById('chat-inp').value += e; p.classList.remove('open'); };
                list.appendChild(s);
            });
        }
        p.classList.toggle('open');
    };

    window.handleFile = (input) => {
        const f = input.files[0]; if(!f) return;
        addMsg(`📎 File: ${f.name}`, 'usr');
        setTimeout(() => addMsg("Document captured. Sierra is analyzing the data layers...", 'bot'), 1000);
    };

    setTimeout(() => addMsg("Greetings. I am Sierra, your Strategic Business Agent. How shall we evolve your project today?", 'bot'), 1000);
})();
