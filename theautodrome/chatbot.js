(function(){
    "use strict";

    /* ── High-Fidelity Chatbot Styles ── */
    if(!document.getElementById('pd-chat-style')){
        const s = document.createElement('style');
        s.id = 'pd-chat-style';
        s.innerHTML = `
    :root {
        --cb-purple: #FF3B3F;
        --cb-deep: #C8A96E;
        --cb-bg: rgba(10, 10, 15, 0.97);
        --cb-text: #FFFFFF;
    }
    
    #pd-chat-bubble {
        position:fixed; bottom:28px; right:28px; z-index:9999;
        width:64px; height:64px; border-radius:24px;
        background: linear-gradient(135deg, var(--cb-purple), var(--cb-deep));
        box-shadow: 0 12px 40px rgba(255, 59, 63, 0.4);
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: bubbleFloat 3s ease-in-out infinite;
    }
    #pd-chat-bubble:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 15px 50px rgba(255, 59, 63, 0.6); }
    #pd-chat-bubble.open { transform: scale(0.9) rotate(90deg); background: #1e1b4b; }
    #pd-chat-bubble .chat-x { display:none; color:#fff; font-size:24px; font-weight:300; }
    #pd-chat-bubble.open .chat-x { display:block; }
    #pd-chat-bubble.open .ai-svg { display:none; }
    
    #pd-chat-window {
        position:fixed; bottom:108px; right:28px; z-index:9998;
        width:420px; background: var(--cb-bg); backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 59, 63, 0.1);
        box-shadow: 0 30px 90px rgba(30, 27, 75, 0.2);
        display:flex; flex-direction:column;
        opacity:0; pointer-events:none; transform:translateY(30px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        max-height: min(720px, calc(100vh - 140px)); border-radius:32px; overflow: hidden;
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
    
    .chat-hdr { background: linear-gradient(135deg, var(--cb-purple), var(--cb-deep)); padding:24px 28px; display:flex; align-items:center; gap:16px; flex-shrink:0; }
    .chat-avatar { width:48px; height:48px; border-radius:18px; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 16px rgba(0,0,0,0.1); flex-shrink:0; padding: 4px; overflow: hidden; perspective: 1000px; }
    .chat-avatar img { width: 100%; height: 100%; object-fit: contain; transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
    .chat-avatar:hover img { transform: rotateY(20deg) rotateX(10deg) scale(1.15); filter: drop-shadow(0 12px 20px rgba(0,0,0,0.15)); }
    .chat-hdr-name { font-size:1.1rem; font-weight:800; color:#fff; font-family: 'Inter', sans-serif; letter-spacing: -0.02em; }
    .chat-hdr-status { font-size:0.75rem; color:rgba(255,255,255,0.8); display:flex; align-items:center; gap:8px; margin-top:2px; font-weight: 500; }
    .chat-sdot { width:8px; height:8px; border-radius:50%; background:#22c55e; box-shadow: 0 0 10px #22c55e; animation: pgr 2s infinite; }
    @keyframes pgr { 0%,100%{opacity:1; transform: scale(1);} 50%{opacity:0.6; transform: scale(1.2);} }

    .chat-hdr-right { margin-left:auto; display:flex; align-items:center; gap:10px; }
    #chat-voice-toggle {
        background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2);
        color: #fff; border-radius: 12px; font-size: 10px; font-weight: 800; text-transform: uppercase;
        padding: 8px 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;
    }
    #chat-voice-toggle.voice-on { background: #fff; color: var(--cb-purple); }

    #chat-back-bar { display:none; align-items:center; gap:10px; padding:12px 24px; border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(255, 59, 63, 0.05); cursor:pointer; flex-shrink:0; }
    #chat-back-bar.vis { display:flex; }
    #chat-back-bar span { font-size:11px; font-weight:800; text-transform:uppercase; color:var(--cb-purple); letter-spacing: 0.05em; }
    
    .chat-msgs { flex:1; overflow-y:auto; padding:28px; display:flex; flex-direction:column; gap:16px; min-height:60px; max-height:480px; scroll-behavior: smooth; }
    .chat-msgs::-webkit-scrollbar { width:4px; }
    .chat-msgs::-webkit-scrollbar-thumb { background: rgba(255, 59, 63, 0.1); border-radius:10px; }
    
    .cmsg { max-width:85%; font-size:0.95rem; line-height:1.6; padding:14px 20px; border-radius:24px; font-family: 'Inter', sans-serif; position: relative; }
    .cmsg.bot { background:#1A1A22; color: var(--cb-text); align-self:flex-start; border-bottom-left-radius: 4px; border: 1px solid rgba(255,255,255,0.06); }
    .cmsg.usr { background: var(--cb-purple); color:#fff; align-self:flex-end; border-bottom-right-radius: 4px; box-shadow: 0 4px 15px rgba(255, 59, 63, 0.2); font-weight: 500; }
    
    /* Media/Link Style */
    .cmsg a { color: inherit; text-decoration: underline; font-weight: 700; }
    .cmsg img { max-width: 100%; border-radius: 12px; margin-top: 8px; cursor: pointer; }
    .chat-audio-msg { display: flex; align-items: center; gap: 10px; }
    .voice-player { display: flex; align-items: center; gap: 10px; min-width: 190px; }
    .vp-btn { width: 30px; height: 30px; border-radius: 50%; border: none; flex-shrink: 0; cursor: pointer;
        display: flex; align-items: center; justify-content: center; transition: transform 0.15s; }
    .vp-btn:active { transform: scale(0.9); }
    .cmsg.usr .vp-btn { background: rgba(255,255,255,0.22); color: #fff; }
    .cmsg.bot .vp-btn { background: var(--cb-purple); color: #fff; }
    .vp-track { flex: 1; height: 3px; border-radius: 3px; cursor: pointer; position: relative; }
    .cmsg.usr .vp-track { background: rgba(255,255,255,0.28); }
    .cmsg.bot .vp-track { background: rgba(255, 59, 63, 0.18); }
    .vp-fill { height: 100%; border-radius: 3px; width: 0%; pointer-events: none; }
    .cmsg.usr .vp-fill { background: #fff; }
    .cmsg.bot .vp-fill { background: var(--cb-purple); }
    .vp-time { font-size: 0.7rem; font-weight: 600; opacity: 0.75; flex-shrink: 0; min-width: 32px; font-variant-numeric: tabular-nums; }
    
    /* Typing dots */
    .cmsg.typing { background:#1A1A22; align-self:flex-start; border-radius:24px 24px 24px 4px; padding:18px 24px; border: 1px solid rgba(255,255,255,0.06); }
    .typing-dots { display:flex; gap:6px; }
    .typing-dots span { width:8px; height:8px; border-radius:50%; background:var(--cb-purple); opacity: 0.3; animation: tdot 1.4s infinite; }
    .typing-dots span:nth-child(2){animation-delay:0.2s;}
    .typing-dots span:nth-child(3){animation-delay:0.4s;}
    @keyframes tdot{0%,60%,100%{transform:translateY(0); opacity: 0.3;}30%{transform:translateY(-8px); opacity: 1;}}

    .chat-qr { padding:0 28px 24px; display:flex; flex-wrap:wrap; gap:8px; flex-shrink:0; }
    .qrb { 
        font-size:0.76rem; font-weight:600; padding:9px 14px; border:1px solid rgba(255, 59, 63, 0.25); 
        background:#14141C; cursor:pointer; color:var(--cb-purple); border-radius:14px; 
        transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        font-family: 'Inter', sans-serif;
        display: flex; align-items: center; gap: 7px;
        flex-shrink: 0;
    }
    .qrb svg { width: 14px; height: 14px; flex-shrink: 0; stroke-width: 2.5; }
    .qrb:hover { background:var(--cb-purple); color:#fff; border-color:var(--cb-purple); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255, 59, 63, 0.2); }
    .qrb.wa { background: #22c55e; color:#fff; border-color:#22c55e; display:inline-flex; align-items:center; gap:8px; }
    
    .chat-inp-row { display:flex; border-top:1px solid rgba(255,255,255,0.08); padding:10px 12px; background:#0A0A0F; align-items:center; gap:4px; position: relative; }
    #chat-inp { flex:1; min-width:0; border:none; background:#1A1A22; color:#fff; padding:10px 14px; font-size:0.9rem; border-radius:14px; outline:none; transition: all 0.2s; font-family: 'Inter', sans-serif; }
    #chat-inp:focus { background: #1A1A22; box-shadow: inset 0 0 0 2px rgba(255, 59, 63, 0.25); }
    #chat-inp::placeholder { color: rgba(255,255,255,0.35); }
    
    .chat-tool-btn { 
        width:36px; height:36px; display:flex; align-items:center; justify-content:center; 
        border-radius:12px; cursor:pointer; transition:all 0.2s; border:none; background: transparent; color: #64748b;
        flex-shrink: 0;
    }
    .chat-tool-btn:hover { color: var(--cb-purple); background: rgba(255,255,255,0.06); }
    #chat-mic.recording { background: #fee2e2; color: #ef4444; animation: cbPulse 1.5s infinite; }
    #chat-timer { display:none; font-size:12px; font-weight:700; color:#ef4444; margin-right:4px; font-family:monospace; }
    #chat-timer.vis { display:inline; }
    #chat-snd { color: var(--cb-purple); }
    #chat-snd:hover { transform: scale(1.1); }
    
    #emoji-picker {
        position: absolute; bottom: 70px; right: 16px; background: #14141C; border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 10px 25px rgba(0,0,0,0.4); border-radius: 16px; display: none; grid-template-columns: repeat(6, 1fr);
        padding: 10px; gap: 8px; z-index: 10000;
    }
    #emoji-picker.open { display: grid; }
    .emoji-item { cursor: pointer; font-size: 20px; transition: transform 0.1s; }
    .emoji-item:hover { transform: scale(1.3); }

    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes cbPulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

    .cpkg-grid { display:flex; flex-direction:column; gap:12px; width:100%; align-self:stretch; }
    .cpkg-card { background:#0F0F16; border:1px solid rgba(255, 59, 63, 0.15); padding:20px; cursor:pointer; transition:all 0.3s; border-radius:20px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    .cpkg-card:hover { border-color:var(--cb-purple); background:rgba(255, 59, 63, 0.04); transform: translateY(-3px); box-shadow: 0 12px 24px rgba(255, 59, 63, 0.1); }
    .cpkg-name { font-size:1rem; font-weight:800; color:var(--cb-purple); letter-spacing:-0.01em; }
    .cpkg-price { font-size:0.85rem; font-weight:700; color:var(--cb-deep); margin-top:4px; }
    .cpkg-desc { font-size:0.85rem; color:rgba(255,255,255,0.65); margin-top:12px; line-height:1.6; }

    @media(max-width:520px){
        #pd-chat-window { width:calc(100vw - 32px); right:16px; bottom:100px; border-radius:24px; max-height: calc(100vh - 130px); }
    }
    `;
        document.head.appendChild(s);
    }
    
    // Inject Structure
    if(!document.getElementById('pd-chat-bubble')){
        const c = document.createElement('div');
        c.innerHTML = `
    <div id="pd-chat-bubble" onclick="toggleChat()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="ai-svg" style="width:30px; height:30px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"></path></svg>
        <span class="chat-x">✕</span>
    </div>
    <div id="pd-chat-window">
        <div class="chat-hdr">
            <div class="chat-avatar">
                <img src="https://priscadezigns.org/logos/the-autodrome.jpg" alt="P">
            </div>
            <div style="flex:1">
                <div class="chat-hdr-name">The Autodrome</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div> Active Agent</div>
            </div>
            <div class="chat-hdr-right">
                <button id="chat-voice-toggle" onclick="toggleVoice()">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M11 5L6 9H2v6h4l5 4V5z"></path></svg>
                    AUDIO
                </button>
            </div>
        </div>
        <div id="chat-back-bar" onclick="chatBack()"><span>← Return</span></div>
        <div class="chat-msgs" id="chat-msgs"></div>
        <div class="chat-qr" id="chat-qr"></div>
        <div id="emoji-picker"></div>
        <div class="chat-inp-row">
            <button class="chat-tool-btn" onclick="document.getElementById('chat-file-inp').click()" title="Attach File">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            </button>
            <input type="file" id="chat-file-inp" style="display:none" onchange="handleChatFile(this.files)" />
            <input type="text" id="chat-inp" placeholder="Ask anything..." onkeydown="if(event.key==='Enter')chatSend()" />
            <button class="chat-tool-btn" onclick="toggleEmojis()" title="Emojis">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            </button>
            <button id="chat-mic" class="chat-tool-btn" onclick="toggleMic()" title="Voice Note">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
            </button>
            <span id="chat-timer">00:00</span>
            <button id="chat-snd" class="chat-tool-btn" onclick="chatSend()">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
    </div>`;
        document.body.appendChild(c);
    // ── Persistent Guidance Buttons ──
    if(!document.getElementById('pd-roadmap-bar')){
        const r = document.createElement('div');
        r.id = 'pd-roadmap-bar';
        r.style = 'padding:0 28px 12px; display:flex; flex-wrap:wrap; gap:10px; flex-shrink:0;';
        r.innerHTML = `
            <style>
                #pd-roadmap-bar::-webkit-scrollbar { display:none; }
                .road-btn { 
                    font-size:0.76rem; font-weight:600; padding:9px 14px; border:1px solid rgba(255, 59, 63, 0.2); 
                    background:#fff; cursor:pointer; color:var(--cb-purple); border-radius:14px; 
                    transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                    font-family: 'Inter', sans-serif;
                    display: flex; align-items: center; gap: 7px;
                    flex-shrink: 0;
                }
                .road-btn svg { width: 14px; height: 14px; flex-shrink: 0; }
                .road-btn:hover { background:var(--cb-purple); color:#fff; border-color:var(--cb-purple); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(255, 59, 63, 0.2); }
                @media (max-width: 520px) {
                    #pd-roadmap-bar { padding-left:16px !important; padding-right:16px !important; gap:6px !important; }
                    .road-btn { font-size:0.72rem; padding:9px 12px; gap:5px; border-radius:12px; }
                    .road-btn svg { width:13px; height:13px; }
                }
                @media (max-width: 340px) {
                    #pd-roadmap-bar { padding-left:10px !important; padding-right:10px !important; gap:4px !important; }
                    .road-btn { font-size:0.64rem; padding:8px 9px; gap:4px; }
                    .road-btn svg { width:12px; height:12px; }
                }
            </style>
            <button class="road-btn" onclick="go('inventory', 'View Featured Inventory')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/></svg>
                <span>Inventory</span>
            </button>
            <button class="road-btn" onclick="go('sell', 'Sell a vehicle')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M8.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h9.2a2 2 0 0 0 2-1.6L21 8H6"/></svg>
                <span>Sell / Consign</span>
            </button>
            <button class="road-btn" onclick="go('viewing', 'Book a viewing')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Book Viewing</span>
            </button>
        `;
        const msgs = document.getElementById('chat-msgs');
        msgs.parentNode.insertBefore(r, document.querySelector('.chat-inp-row'));
    }

        
        // Populate Emojis
        const ep = document.getElementById('emoji-picker');
        ['👋','🔥','🚀','💎','✨','✅','🙏','💯','💡','📱','💻','🎨','💼','⚡','🔋','🛠️','📣','💬'].forEach(e => {
            const span = document.createElement('span');
            span.className = 'emoji-item';
            span.innerText = e;
            span.onclick = () => {
                const inp = document.getElementById('chat-inp');
                inp.value += e;
                inp.focus();
                toggleEmojis();
            };
            ep.appendChild(span);
        });
    }

const WA="https://wa.me/18683424101";
const SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhemhkbnF6YXFwcWNyYWxtdGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzE5NjYsImV4cCI6MjA5Mzc0Nzk2Nn0.uTyw31uWTNOTV5-HzNpm46vpAJABAsHLMzW-sYOkRhc";
const SB_URL = "https://sazhdnqzaqpqcralmthh.supabase.co";

const SYSTEM_PROMPT = "You are the Autodrome AI assistant \u2014 the concierge for The Autodrome, the Caribbean's premier luxury vehicle marketplace and supercar brokerage, based in San Fernando, Trinidad & Tobago.\n\nYour personality: polished, knowledgeable, discreet, and genuinely enthusiastic about exceptional cars \u2014 like a private client advisor at a luxury dealership. Keep replies concise (2-4 sentences max unless detail is needed). Always ask a follow-up question to keep the conversation moving.\n\nATTACHMENT HANDLING:\nYou DO accept documents and images \u2014 there is a paperclip/attach button in the chat for exactly this. Clients often send photos of a vehicle they want to sell or consign; when they do, tell them to use the attach button, and never say you lack the capability to receive files. When a user uploads an image, you will receive it as actual image content you can see \u2014 describe or respond to what is genuinely in it (e.g. assessing a vehicle's condition from photos). When a user uploads a voice note, you will only receive a text transcript if one was successfully captured; if a message tells you no transcript is available, say so honestly and ask the user to type instead. Never claim to have heard or seen something you were not actually given.\n\nABOUT THE AUTODROME:\nThe Autodrome is building the Caribbean's most authoritative brokerage hub for luxury vehicles and elite automotive engineering \u2014 a marketplace for supercar and luxury vehicle brokerage, sourcing, and sales. Based in San Fernando, Trinidad & Tobago. The ecosystem includes the Private Garage (client vehicle management), the Performance Shop, the Neural Data Lab (automotive intelligence), and the Intel Feed. The Autodrome is part of the same group as Prisca Dezigns (digital/AI partner) and Evolve Mobility (EV dealership) \u2014 all Caribbean-based sister brands.\n\nBRAND IDENTITY:\nThe Autodrome's colors are a deep near-black (#050508) paired with a bold red accent (#FF3B3F) and a refined gold (#C8A96E) \u2014 evoking motorsport and luxury. If asked about brand colors, answer confidently using this.\n\nKEY STATS (always quote these if relevant):\n- 2.3% average yearly appreciation on featured vehicles\n- 100% brokerage discretion \u2014 client privacy is paramount\n- Global sourcing network\n\nFEATURED INVENTORY (current, mention accurately \u2014 status matters):\n- Ferrari Luce \u2014 Price Upon Request (status: Market Reveal, not yet available for sale)\n- Lamborghini Revuelto SVJ \u2014 $600,000 USD (status: Available now)\n- Bugatti Chiron Super Sport \u2014 $3.9M USD (status: Limited Drop, very limited availability)\nFull current inventory is on the Shop/Garage pages of the site \u2014 encourage clients to enquire for the latest listings since inventory turns over.\n\nSERVICES:\n- Buying: browse the marketplace, enquire on any vehicle, arrange private viewings\n- Selling/Consigning: clients can consign their vehicle for brokerage \u2014 ask for photos, make, model, year, mileage, and condition to get the process started, then hand off to the team via WhatsApp\n- Discretion: all brokerage is confidential \u2014 reassure high-net-worth clients about privacy when relevant\n\nRULES:\n- Keep replies conversational, 2-4 sentences.\n- Always give exact prices/status when discussing featured vehicles \u2014 never estimate.\n- Offer WhatsApp (1-868-342-4101) for enquiries, viewings, or consignment.\n- Use point form for vehicle listings and summaries.\n- Be concise, polished, and results-oriented.";

let vpCounter = 0;
const VP_PLAY = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
const VP_PAUSE = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';

function voicePlayerHtml(url) {
    const id = 'vp' + (vpCounter++);
    setTimeout(() => initVoicePlayer(id, url), 0);
    return `<div class="voice-player" id="${id}">
        <button class="vp-btn" data-play>${VP_PLAY}</button>
        <div class="vp-track" data-track><div class="vp-fill" data-fill></div></div>
        <span class="vp-time" data-time>0:00</span>
    </div>`;
}

function initVoicePlayer(id, url) {
    const root = document.getElementById(id);
    if (!root) return;
    const audio = new Audio(url);
    const btn = root.querySelector('[data-play]');
    const track = root.querySelector('[data-track]');
    const fill = root.querySelector('[data-fill]');
    const timeEl = root.querySelector('[data-time]');
    const fmt = s => { s = Math.floor(s || 0); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

    btn.onclick = () => { audio.paused ? audio.play() : audio.pause(); };
    audio.onplay = () => { btn.innerHTML = VP_PAUSE; };
    audio.onpause = () => { btn.innerHTML = VP_PLAY; };
    audio.onended = () => { btn.innerHTML = VP_PLAY; fill.style.width = '0%'; timeEl.textContent = fmt(audio.duration); };
    audio.onloadedmetadata = () => { timeEl.textContent = fmt(audio.duration); };
    audio.ontimeupdate = () => {
        if (audio.duration) fill.style.width = ((audio.currentTime / audio.duration) * 100) + '%';
        timeEl.textContent = fmt(audio.currentTime);
    };
    track.onclick = (e) => {
        if (!audio.duration) return;
        const rect = track.getBoundingClientRect();
        audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    };
}

let history = [];

function getAI(txt, cb, imageUrl) {
    let userContent = txt;
    if (imageUrl) {
        // OpenAI/Grok-compatible multimodal content block, so the backend can forward
        // this straight to a vision-capable model instead of just a text URL.
        userContent = [
            { type: 'text', text: txt },
            { type: 'image_url', image_url: { url: imageUrl } }
        ];
    }
    history.push({role:'user', content:userContent});
    const payload = JSON.stringify({ system: SYSTEM_PROMPT, messages: history, max_tokens: 350 });
    
    fetch(SB_URL + '/functions/v1/chat-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
    })
    .then(r => r.json())
    .then(data => {
        if(data.reply) {
            history.push({role:'assistant', content:data.reply});
            cb(data.reply);
        } else {
            fallback(txt, cb);
        }
    })
    .catch(() => fallback(txt, cb));
}

function fallback(txt, cb) {
    const s = txt.toLowerCase();
    let r = "That's a great question. Would you like to see our featured inventory, or chat with the team directly on WhatsApp for full details?";
    if(s.includes("price") || s.includes("cost")) r = "Pricing varies by vehicle — our current featured pieces range from $600,000 to $3.9M USD, with some available on Price Upon Request. Want to see the full featured inventory?";
    else if(s.includes("sell") || s.includes("consign")) r = "We handle consignment and brokerage for luxury vehicles with full discretion. Send us photos, make, model, year, and mileage using the attach button, and our team will follow up directly.";
    cb(r);
}

const WA_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.5 8.5 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';

function ensureWhatsAppBtn(botText){
    if(!botText || !/whatsapp/i.test(botText)) return;
    const q = document.getElementById('chat-qr');
    if(!q || q.querySelector('.qrb.wa')) return; // already offered, don't duplicate
    const a = document.createElement('a');
    a.href = WA; a.target = '_blank';
    a.className = 'qrb wa'; a.innerHTML = WA_SVG + ' Chat on WhatsApp';
    q.appendChild(a);
}

var voiceOn=false;
var preferredVoice=null;
function pickVoice(){
  if(!window.speechSynthesis) return;
  var voices=window.speechSynthesis.getVoices();
  if(!voices.length) return;
  // Preference order: modern neural/natural voices first (Edge/Chrome), then
  // decent standard voices, falling back to whatever the browser offers.
  var priorities = [
    v => /natural/i.test(v.name),                                   // Edge "Online (Natural)" voices — best available
    v => /Aria|Jenny|Emma|Ava/i.test(v.name),                        // common neural voice names
    v => v.name === 'Samantha',                                      // macOS/iOS default, quite natural
    v => /Google US English/i.test(v.name),
    v => /Google UK English Female/i.test(v.name),
    v => v.lang === 'en-US' && /Female/i.test(v.name),
    v => v.lang && v.lang.startsWith('en')
  ];
  for (var i = 0; i < priorities.length; i++) {
    var match = voices.find(priorities[i]);
    if (match) { preferredVoice = match; return; }
  }
  preferredVoice = voices[0];
}
if(window.speechSynthesis){
  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}
window.toggleVoice=function(){
  voiceOn=!voiceOn;
  var btn=document.getElementById('chat-voice-toggle');
  if(btn){
    var svgPath=voiceOn?'M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 0 1 0 14.14 M15.54 8.46a5 5 0 0 1 0 7.07':'M11 5L6 9H2v6h4l5 4V5z';
    btn.innerHTML='<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"'+svgPath+'\"/></svg>'+(voiceOn?' AUDIO ON':' AUDIO OFF');
    btn.classList.toggle('voice-on',voiceOn);
  }
  if(!voiceOn&&window.speechSynthesis)window.speechSynthesis.cancel();
};
function speak(txt){
  if(!voiceOn||!window.speechSynthesis)return;
  var clean=txt.replace(/<[^>]*>/g,' ').replace(/\n/g,' ').trim();
  if(!clean) return;
  var u=new SpeechSynthesisUtterance(clean);u.rate=1.0;u.pitch=1.03;u.volume=1;
  if(!preferredVoice) pickVoice();
  if(preferredVoice) u.voice = preferredVoice;
  window.speechSynthesis.cancel();window.speechSynthesis.speak(u);
}

window.toggleEmojis = function() {
    document.getElementById('emoji-picker').classList.toggle('open');
};

// Close the emoji picker on outside click — otherwise it sits on top of the
// send button and silently swallows clicks meant for Send.
document.addEventListener('click', function(e) {
    const ep = document.getElementById('emoji-picker');
    if (!ep || !ep.classList.contains('open')) return;
    const toggleBtn = document.querySelector('[onclick="toggleEmojis()"]');
    if (ep.contains(e.target) || (toggleBtn && toggleBtn.contains(e.target))) return;
    ep.classList.remove('open');
});

// --- High-Fidelity Voice Recording & Attachment Handlers ---
let mediaRecorder;
let audioChunks = [];
let recInterval;
let recSeconds = 0;
let recognition;
let currentTranscript = "";
let isRecordingActive = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
}

window.toggleMic = function() {
    const btn = document.getElementById('chat-mic');
    if (btn.classList.contains('recording')) {
        stopAudioRecord();
    } else {
        startAudioRecord();
    }
};

function startAudioRecord() {
    currentTranscript = "";
    isRecordingActive = true;
    if (recognition) {
        recognition.onresult = (event) => {
            let final = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) final += event.results[i][0].transcript;
            }
            currentTranscript += final;
        };
        // Mobile Chrome stops listening after a few seconds of silence even
        // with continuous=true -- unlike desktop. If it ends on its own while
        // the user is still recording, just restart it so it keeps capturing
        // for the full duration of the recording.
        recognition.onend = () => {
            if (isRecordingActive) {
                try { recognition.start(); } catch (e) { /* already running */ }
            }
        };
        recognition.onerror = (e) => {
            // 'no-speech' and 'aborted' are routine (esp. on mobile) and are
            // always followed by onend, which will restart it -- don't treat
            // these as fatal. Other errors just get logged, not thrown.
            console.log('Speech recognition:', e.error);
        };
        try { recognition.start(); } catch (e) { /* ignore if already started */ }
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            document.getElementById('chat-mic').classList.add('recording');
            
            const timer = document.getElementById('chat-timer');
            timer.innerText = '00:00';
            timer.classList.add('vis');
            recSeconds = 0;
            recInterval = setInterval(() => {
                recSeconds++;
                const m = Math.floor(recSeconds / 60).toString().padStart(2, '0');
                const s = (recSeconds % 60).toString().padStart(2, '0');
                timer.innerText = `${m}:${s}`;
            }, 1000);

            audioChunks = [];
            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunks, { type: 'audio/webm' });
                uploadToVault(blob, 'voice_note_' + Date.now() + '.webm', 'audio');
            };
        })
        .catch(err => alert("Microphone access denied or not supported."));
}

function stopAudioRecord() {
    isRecordingActive = false;
    document.getElementById('chat-mic').classList.remove('recording');
    document.getElementById('chat-timer').classList.remove('vis');
    clearInterval(recInterval);

    const finishRecording = () => {
        clearTimeout(recStopSafety);
        if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    };

    if (recognition) {
        // Wait for recognition to fully finish (including any final result still
        // in flight) before stopping the recorder and triggering the upload —
        // otherwise the transcript can still be empty at the moment it's checked.
        recognition.onend = finishRecording;
        recognition.stop();
        // Safety net in case onend never fires (e.g. permission hiccup).
        var recStopSafety = setTimeout(finishRecording, 1200);
    } else {
        finishRecording();
    }
}

window.handleChatFile = function(files) {
    if (files && files[0]) {
        uploadToVault(files[0], files[0].name, 'file');
    }
};

// Auto-generated per-session identifier so every visitor still gets their own
// folder without being interrupted by a popup. If they later tell the bot
// their name in conversation, we swap it in for future uploads this session.
let clientName = 'Visitor-' + Math.random().toString(36).slice(2, 8).toUpperCase();
let clientEmail = null;
let clientPhone = null;
function maybeCaptureName(text) {
    const m = text.match(/\bmy name is ([a-zA-Z][a-zA-Z '.-]{1,40})/i) || text.match(/\bi'?m ([a-zA-Z][a-zA-Z '.-]{1,40})\b/i);
    if (m && m[1]) {
        const cleaned = m[1].trim().replace(/[^a-zA-Z0-9 _-]/g, '').slice(0, 60);
        if (cleaned) clientName = cleaned;
    }
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) clientEmail = emailMatch[0];
    const phoneMatch = text.match(/(\+?1?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4})/);
    if (phoneMatch) clientPhone = phoneMatch[0].trim();
    if (emailMatch || phoneMatch) {
        // We now have real contact info -- log/update this as an actual lead,
        // not just an anonymous session, so the team can follow up.
        fetch(SB_URL + '/rest/v1/client_leads', {
            method: 'POST',
            headers: {
                'apikey': SB_ANON, 'Authorization': 'Bearer ' + SB_ANON,
                'Content-Type': 'application/json', 'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ name: clientName, email: clientEmail, phone: clientPhone, brand: 'The Autodrome', status: 'new' })
        }).catch(() => {});
    }
}
function ensureClientName(cb) {
    cb(clientName);
}

function uploadToVault(file, fileName, type) {
    ensureClientName(function(client) {
        addMsg("Uploading " + type + "...", 'bot');
        const safeClient = client.replace(/\s+/g, '_');
        const path = 'chatbot_uploads/' + safeClient + '/' + Date.now() + '_' + fileName;

        fetch(SB_URL + '/storage/v1/object/media/' + path, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + SB_ANON,
                'Content-Type': file.type,
                'x-upsert': 'true'
            },
            body: file
        })
        .then(r => r.json())
        .then(data => {
            if (data.Key || data.path) {
                const url = SB_URL + '/storage/v1/object/public/media/' + path;
                const isImage = file.type && file.type.startsWith('image/');

                if (type === 'audio') {
                    addMsg(`<div class="chat-audio-msg">${voicePlayerHtml(url)}</div>`, 'usr');
                } else if (isImage) {
                    addMsg(`<img src="${url}" onclick="window.open('${url}')" />`, 'usr');
                } else {
                    addMsg(`📎 File attached: <a href="${url}" target="_blank">${fileName}</a>`, 'usr');
                }

                // Server-side: log the attachment (with contact info if we have it) to Supabase.
                // Fire-and-forget — doesn't block the chat reply.
                fetch(SB_URL + '/functions/v1/save-attachment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + SB_ANON },
                    body: JSON.stringify({ clientName: client, clientEmail: clientEmail, clientPhone: clientPhone, fileUrl: url, fileName: fileName, fileType: file.type, category: type })
                }).catch(() => {});

                if (type === 'audio') {
                    if (currentTranscript && currentTranscript.trim()) {
                        getAI("I just uploaded a voice note. Transcript: \"" + currentTranscript.trim() + "\"", (reply) => { addMsg(reply, 'bot'); speak(reply); });
                    } else {
                        const noTranscriptMsg = "Got your voice note saved — but I couldn't capture a live transcript that time (this browser may not support speech-to-text). Mind typing your question instead?";
                        addMsg(noTranscriptMsg, 'bot');
                        speak(noTranscriptMsg);
                    }
                } else if (isImage) {
                    // Real multimodal call — the image is sent as actual image content, not just a URL string.
                    getAI("The user uploaded this image. Take a look and respond to what's actually in it.", (reply) => { addMsg(reply, 'bot'); speak(reply); }, url);
                } else {
                    getAI("I just uploaded a file: " + fileName + " (" + url + ")", (reply) => { addMsg(reply, 'bot'); speak(reply); });
                }
            } else {
                addMsg("Upload failed. Please try again.", 'bot');
            }
        })
        .catch(() => addMsg("Upload error. Check connection.", 'bot'));
    });
}

const PKGS={"inventory":[{"name":"Ferrari Luce","price":"Price Upon Request","desc":"Market Reveal \u00b7 Not yet available for sale \u00b7 Enquire to be notified first"},{"name":"Lamborghini Revuelto SVJ","price":"$600,000 USD","desc":"Available now \u00b7 Private viewing by appointment"},{"name":"Bugatti Chiron Super Sport","price":"$3.9M USD","desc":"Limited Drop \u00b7 Very limited availability \u00b7 Enquire immediately"}]};

const STEPS = {
    "start": {
        "bot": "Welcome to The Autodrome \u2014 elegance in motion. How can we help you today?",
        "r": [
            { "l": "View Featured Inventory", "s": "inventory", "i": "car" },
            { "l": "Sell / Consign a Vehicle", "s": "sell", "i": "upload" },
            { "l": "Book a Private Viewing", "s": "viewing", "i": "calendar" },
            { "l": "About The Autodrome", "s": "about", "i": "info" },
            { "l": "Talk to the Team", "s": "talk", "i": "message-circle" }
        ]
    },
    "inventory": {
        "bot": "Here's what's currently featured. Availability turns over quickly on pieces like these.",
        "pkg": "inventory"
    },
    "sell": {
        "bot": "We'd be glad to discuss consigning your vehicle. Send us a few photos along with the make, model, year, and mileage \u2014 the attach button below works for this \u2014 and we'll take it from there.",
        "r": [
            { "l": "Attach photos now", "s": "sell_attach_hint", "i": "camera" },
            { "l": "Talk to the team instead", "s": "talk", "i": "message-circle" },
            { "l": "\u2190 Back", "s": "start", "i": "arrow-left" }
        ]
    },
    "sell_attach_hint": {
        "bot": "Perfect \u2014 use the paperclip icon in the message bar to attach your photos, and include the make, model, year, and mileage in your next message. Our team will follow up directly.",
        "r": [
            { "l": "\u2190 Back", "s": "start", "i": "arrow-left" }
        ]
    },
    "viewing": {
        "bot": "Private viewings are arranged directly with our team to coordinate around vehicle availability and your schedule.",
        "wa": true
    },
    "about": {
        "bot": "The Autodrome is the Caribbean's premier destination for luxury vehicle brokerage, supercar engineering, and high-fidelity automotive intelligence \u2014 based in San Fernando, Trinidad & Tobago. 2.3% average yearly appreciation, 100% brokerage discretion, global sourcing network.",
        "r": [
            { "l": "View Inventory", "s": "inventory", "i": "car" },
            { "l": "\u2190 Back", "s": "start", "i": "arrow-left" }
        ]
    },
    "talk": {
        "bot": "Our team is standing by on WhatsApp for enquiries, viewings, or consignment \u2014 discretion guaranteed.",
        "wa": true
    }
};

let hist = [];
let open = false;

window.toggleChat = function(){
    open = !open;
    document.getElementById('pd-chat-window').classList.toggle('open', open);
    document.getElementById('pd-chat-bubble').classList.toggle('open', open);
    if(open && hist.length === 0) go('start');
};

window.go = function(step, label){
    const s = STEPS[step];
    if(!s) return;
    if(label) addMsg(label, 'usr');
    
    const m = document.getElementById('chat-msgs');
    const td = document.createElement('div');
    td.className = 'cmsg bot typing';
    td.id = 'typing-id';
    td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    m.appendChild(td); m.scrollTop = m.scrollHeight;
    
    setTimeout(() => {
        if(document.getElementById('typing-id')) document.getElementById('typing-id').remove();
        hist.push(step);
        const q = document.getElementById('chat-qr');
        q.innerHTML = '';
        const botTxt = s.bot;
        addMsg(botTxt, 'bot');
        speak(botTxt);
        setBack(hist.length > 1);
        
        if(s.wa){
            const a = document.createElement('a');
            a.href = WA; a.target = '_blank';
            a.className = 'qrb wa'; a.innerHTML = WA_SVG + ' Chat on WhatsApp';
            q.appendChild(a);
            addQR('← Packages', 'pkg_menu');
            return;
        }
        if(s.pkg){
            renderPkgs(PKGS[s.pkg], null);
            addQR('← Packages', 'pkg_menu');
            addQR('Contact Team', 'talk');
            return;
        }
        if(s.url) window.open(s.url, '_blank');
        if(s.r) s.r.forEach(r => addQR(r.l, r.s, r.i, r.url));
    }, 600);
}

function addQR(label, step, icon, url){
    const q = document.getElementById('chat-qr');
    const b = document.createElement('button');
    b.className = 'qrb';
    
    let iconSvg = '';
    if(icon){
      const icons = {
        'color-swatch': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
        'layout': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/>',
        'cpu': '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 20v2M15 20v2M9 2v2M15 2v2M20 9h2M20 15h2M2 9h2M2 15h2M9 9h6v6H9z"/>',
        'package': '<path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
        'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
        'car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/>',
        'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
        'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        'arrow-left': '<path d="m12 19-7-7 7-7M19 12H5"/>',
        'zap': '<path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z"/>',
        'code': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
        'trending-down': '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>',
        'shopping-bag': '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
        'tool': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
        'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.5 8.5 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
        'headphones': '<path d="M3 14h3v7H3v-7zm15 0h3v7h-3v-7z"/><path d="M3 14v-4a9 9 0 0 1 18 0v4"/>',
        'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
        'clipboard-check': '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/>',
        'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
      };
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${icons[icon] || icons['info']}</svg>`;
    }

    b.innerHTML = iconSvg + `<span>${label}</span>`;
    b.onclick = url ? () => window.open(url, '_blank') : () => go(step, label);
    q.appendChild(b);
}

function setBack(vis){
    document.getElementById('chat-back-bar').classList.toggle('vis', vis);
}

window.chatBack = function(){
    if(hist.length < 2) return;
    hist.pop();
    const last = hist.pop();
    go(last);
};

function addMsg(txt, side){
    const m = document.getElementById('chat-msgs');
    const d = document.createElement('div');
    d.className = 'cmsg ' + side;
    d.innerHTML = txt.replace(/\n/g, '<br>');
    m.appendChild(d);
    m.scrollTop = m.scrollHeight;
    if(side === 'bot') ensureWhatsAppBtn(txt);
}

function renderPkgs(list, note){
    const m = document.getElementById('chat-msgs');
    const g = document.createElement('div');
    g.className = 'cpkg-grid';
    list.forEach(p => {
        const c = document.createElement('div');
        c.className = 'cpkg-card';
        c.innerHTML = `<div class="cpkg-name">${p.name}</div><div class="cpkg-price">${p.price}</div><div class="cpkg-desc">${p.desc}</div>`;
        c.onclick = () => {
            addMsg(`I'm interested in the ${p.name} package.`, 'usr');
            setTimeout(() => go('talk'), 500);
        };
        g.appendChild(c);
    });
    m.appendChild(g);
    if(note){
        addMsg(`<span style="font-size:0.8em;opacity:0.75;font-style:italic;">${note}</span>`, 'bot');
    }
    m.scrollTop = m.scrollHeight;
}

window.chatSend = function(){
    const i = document.getElementById('chat-inp');
    const t = i.value.trim(); if(!t) return;
    i.value = ''; addMsg(t, 'usr');
    maybeCaptureName(t);
    const ep = document.getElementById('emoji-picker');
    if (ep) ep.classList.remove('open');
    
    const m = document.getElementById('chat-msgs');
    const td = document.createElement('div');
    td.className = 'cmsg bot typing';
    td.id = 'typing-id';
    td.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    m.appendChild(td); m.scrollTop = m.scrollHeight;
    
    getAI(t, (reply) => {
        if(document.getElementById('typing-id')) document.getElementById('typing-id').remove();
        addMsg(reply, 'bot');
        speak(reply);
    });
};

if(window.location.pathname.includes('/services')){
    setTimeout(() => { if(!open) toggleChat(); }, 8000);
}

})();









