(function(){
    "use strict";

    /* ── High-Fidelity Chatbot Styles ── */
    if(!document.getElementById('pd-chat-style')){
        const s = document.createElement('style');
        s.id = 'pd-chat-style';
        s.innerHTML = `
    :root {
        --cb-purple: #8E44AD;
        --cb-deep: #6e48aa;
        --cb-bg: rgba(116, 48, 137, 0.85);
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
        position:fixed; bottom:108px; right:28px; z-index:9998;
        width:420px; background: var(--cb-bg); backdrop-filter: blur(20px);
        border: 1px solid rgba(157, 80, 187, 0.1);
        box-shadow: 0 30px 90px rgba(30, 27, 75, 0.2);
        display:flex; flex-direction:column;
        opacity:0; pointer-events:none; transform:translateY(30px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        max-height:720px; border-radius:32px; overflow: hidden;
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
    
    .chat-hdr { background: linear-gradient(135deg, var(--cb-purple), var(--cb-deep)); padding:24px 28px; display:flex; align-items:center; gap:16px; flex-shrink:0; }
    .chat-avatar { width:48px; height:48px; border-radius:18px; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 16px rgba(0,0,0,0.1); flex-shrink:0; padding: 4px; overflow: hidden; }
    .chat-avatar img { width: 100%; height: 100%; object-fit: contain; }
    .chat-hdr-name { font-size:1.1rem; font-weight:800; color:#fff; font-family: 'Inter', sans-serif; letter-spacing: -0.02em; }
    .chat-hdr-status { font-size:0.75rem; color:rgba(255,255,255,0.8); display:flex; align-items:center; gap:8px; margin-top:2px; font-weight: 500; }
    .chat-sdot { width:8px; height:8px; border-radius:50%; background:#22c55e; box-shadow: 0 0 10px #22c55e; animation: pgr 2s infinite; }
    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes pgr { 0%,100%{opacity:1; transform: scale(1);} 50%{opacity:0.6; transform: scale(1.2);} }

    .chat-hdr-right { margin-left:auto; display:flex; align-items:center; gap:10px; }
    #chat-voice-toggle {
        background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2);
        color: #fff; border-radius: 12px; font-size: 10px; font-weight: 800; text-transform: uppercase;
        padding: 8px 12px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;
    }
    #chat-voice-toggle.voice-on { background: #fff; color: var(--cb-purple); }

    #chat-back-bar { display:none; align-items:center; gap:10px; padding:12px 24px; border-bottom:1px solid rgba(0,0,0,0.03); background:rgba(157, 80, 187, 0.03); cursor:pointer; flex-shrink:0; }
    #chat-back-bar.vis { display:flex; }
    #chat-back-bar span { font-size:11px; font-weight:800; text-transform:uppercase; color:var(--cb-purple); letter-spacing: 0.05em; }
    
    .chat-msgs { flex:1; overflow-y:auto; padding:28px; display:flex; flex-direction:column; gap:16px; min-height:200px; max-height:480px; scroll-behavior: smooth; }
    .chat-msgs::-webkit-scrollbar { width:4px; }
    .chat-msgs::-webkit-scrollbar-thumb { background: rgba(157, 80, 187, 0.1); border-radius:10px; }
    
    .cmsg { max-width:85%; font-size:0.95rem; line-height:1.6; padding:14px 20px; border-radius:24px; font-family: 'Inter', sans-serif; position: relative; }
    .cmsg.bot { background:#f3f4f6; color: var(--cb-text); align-self:flex-start; border-bottom-left-radius: 4px; }
    .cmsg.usr { background: rgba(155, 89, 255, 0.2); backdrop-filter: blur(15px); border-bottom: 1px solid rgba(255,255,255,0.1); color:#fff; align-self:flex-end; border-bottom-right-radius: 4px; box-shadow: 0 4px 15px rgba(157, 80, 187, 0.2); font-weight: 500; }
    
    /* Typing dots */
    .cmsg.typing { background:#f3f4f6; align-self:flex-start; border-radius:24px 24px 24px 4px; padding:18px 24px; }
    .typing-dots { display:flex; gap:6px; }
    .typing-dots span { width:8px; height:8px; border-radius:50%; background:var(--cb-purple); opacity: 0.3; animation: tdot 1.4s infinite; }
    .typing-dots span:nth-child(2){animation-delay:0.2s;}
    .typing-dots span:nth-child(3){animation-delay:0.4s;}
    @keyframes tdot{0%,60%,100%{transform:translateY(0); opacity: 0.3;}30%{transform:translateY(-8px); opacity: 1;}}

    .chat-qr { padding:0 28px 24px; display:flex; flex-wrap:wrap; gap:10px; flex-shrink:0; }
    .qrb { 
        font-size:0.85rem; font-weight:600; padding:12px 20px; border:1px solid rgba(157, 80, 187, 0.2); 
        background:#fff; cursor:pointer; color:var(--cb-purple); border-radius:16px; 
        transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        font-family: 'Inter', sans-serif;
        display: flex; align-items: center; gap: 10px;
    }
    .qrb svg { width: 16px; height: 16px; flex-shrink: 0; stroke-width: 2.5; }
    .qrb:hover { background:var(--cb-purple); color:#fff; border-color:var(--cb-purple); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(157, 80, 187, 0.2); }
    .qrb.wa { background: #22c55e; color:#fff; border-color:#22c55e; display:inline-flex; align-items:center; gap:8px; }
    
    .chat-inp-row { display:flex; border-top:1px solid rgba(0,0,0,0.05); padding:12px 16px; background:#fff; align-items:center; gap:8px; }
    #chat-inp { flex:1; border:none; background:#f9fafb; padding:14px 20px; font-size:0.95rem; border-radius:20px; outline:none; transition: all 0.2s; font-family: 'Inter', sans-serif; }
    #chat-inp:focus { background: #fff; box-shadow: inset 0 0 0 2px rgba(157, 80, 187, 0.1); }
    
    #chat-mic, #chat-snd { 
        width:48px; height:48px; display:flex; align-items:center; justify-content:center; 
        border-radius:16px; cursor:pointer; transition:all 0.2s; border:none; 
    }
    #chat-mic { background: #f3f4f6; color: var(--cb-purple); }
    #chat-mic.recording { background: #fee2e2; color: #ef4444; animation: cbPulse 1.5s infinite; }
    #chat-snd { background: rgba(155, 89, 255, 0.2); backdrop-filter: blur(15px); border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; box-shadow: 0 4px 12px rgba(157, 80, 187, 0.2); }
    #chat-snd:hover { transform: scale(1.05); background: var(--cb-deep); }
    
    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes cbPulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }

    .cpkg-grid { display:flex; flex-direction:column; gap:12px; width:100%; align-self:stretch; }
    .cpkg-card { background:#fff; border:1px solid rgba(157, 80, 187, 0.1); padding:20px; cursor:pointer; transition:all 0.3s; border-radius:20px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
    .cpkg-card:hover { border-color:var(--cb-purple); background:rgba(157, 80, 187, 0.02); transform: translateY(-3px); box-shadow: 0 12px 24px rgba(157, 80, 187, 0.08); }
    .cpkg-name { font-size:1rem; font-weight:800; color:var(--cb-purple); letter-spacing:-0.01em; }
    .cpkg-price { font-size:0.85rem; font-weight:700; color:#64748b; margin-top:4px; }
    .cpkg-desc { font-size:0.85rem; color:#475569; margin-top:12px; line-height:1.6; }

    @media(max-width:520px){
        #pd-chat-window { width:calc(100vw - 32px); right:16px; bottom:100px; border-radius:24px; }
    }
    `;
        document.head.appendChild(s);
    }
    
    // Inject Structure
    if(!document.getElementById('pd-chat-bubble')){
        const c = document.createElement('div');
        c.innerHTML = `
    <div id="pd-chat-bubble" onclick="toggleChat()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="ai-svg" style="width:30px; height:30px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span class="chat-x">✕</span>
    </div>
    <div id="pd-chat-window">
        <div class="chat-hdr">
            <div class="chat-avatar">
                <img src="https://share.zapia.com/57sonyoar08flg9xz5v667" alt="P">
            </div>
            <div style="flex:1">
                <div class="chat-hdr-name">Prisca Dezigns</div>
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
        <div class="chat-inp-row">
            <button id="chat-mic" onclick="toggleMic()" title="Voice Input">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line></svg>
            </button>
            <input type="text" id="chat-inp" placeholder="Ask anything..." onkeydown="if(event.key==='Enter')chatSend()" />
            <button id="chat-snd" onclick="chatSend()">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
    </div>`;
        document.body.appendChild(c);
    }


const WA="https://wa.me/18683424101";

const SYSTEM_PROMPT = "You are the Prisca Dezigns AI assistant — the sales and support agent for Prisca Dezigns, a premium digital agency based in Trinidad & Tobago.\n\nYour personality: warm, professional, sharp, and conversational. You speak like a knowledgeable friend who happens to be a web design expert — never robotic, never generic, never pushy. Keep replies concise (2–4 sentences max unless detail is needed). Always ask a follow-up question to keep the conversation moving.\n\nABOUT PRISCA DEZIGNS:\nPrisca Dezigns is a full-service digital agency specialising in high-fidelity websites, AI automation, and brand architecture. Founded in Trinidad & Tobago by Priscilla Narine. Every project is professionally built — no drag-and-drop builders. Clients provide content; the team handles everything else.\n\nSERVICES & PRICING:\n- 1-Day Custom Site: $200 setup + $50/mo maintenance (Live in 24hrs)\n- Custom Web Packages: Starter ($1,500), Growth ($3,500), Trusted ($6,000)\n- AI Consultancy: Tier 1 ($1,500), Tier 2 ($3,500), Tier 3 ($6,000), Tier 4 ($8,000)\n- E-Commerce: E-Starter ($2,500), E-Growth ($5,000), E-Trusted ($8,500)\n- Voice Agents: Starting at $8,000 setup + $900/mo (Add-on: $500 setup + $50/mo)\n\nEVOLVE MOBILITY (driveevolve.com):\nStrategic partner dealership selling high-performance Chinese EVs in the Caribbean.\nInventory & Pricing:\n- BYD Atto 3: Starting at $285,000 TTD\n- BYD Dolphin: Starting at $195,000 TTD\n- GAC AION Y Plus: Starting at $245,000 TTD\n- Leapmotor C11: Starting at $310,000 TTD\n- Leapmotor T03: Starting at $145,000 TTD\nSafety: All brands use advanced blade battery tech or modular safety cells. Average battery degradation is only 2.3%/year.\n\nRULES:\n- Keep replies conversational, 2-4 sentences.\n- Always provide exact prices when asked about specific tiers or vehicles.\n- Offer WhatsApp (1-868-342-4101) for booking or viewing.\nWHATSAPP RELAY CAPABILITY:\n- You have a direct automated link to the Lead's WhatsApp (1-868-342-4101).\n- Every time you collect a Lead, a Booking, or a Complaint, you must explicitly confirm to the user that you have 'dispatched a summary to the management WhatsApp' for immediate action.\n- Use point form for all summaries and service lists.\n- Be concise, professional, and results-oriented.";

let history = [];

function getAI(txt, cb) {
    history.push({role:'user', content:txt});
    const payload = JSON.stringify({ system: SYSTEM_PROMPT, messages: history, max_tokens: 350 });
    
    fetch('https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/chat-proxy', {
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
    let r = "That's a great question. I want to make sure I give you the perfect info—would you like to see our full service menu or chat with the team on WhatsApp?";
    if(s.includes("price") || s.includes("cost")) r = "Our agency packages are customized, but our 1-Day Custom Sites start at just $200 flat. Would you like the full pricing guide for our AI automation tiers?";
    else if(s.includes("evolve")) r = "We are the lead digital architects for Evolve Mobility (driveevolve.com), the Caribbean's premier EV dealership. We handle their entire sales ecosystem. Are you interested in fleet mobility or a personal EV?";
    cb(r);
}

const WA_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';

var voiceOn=false;
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
  var clean=txt.replace(/\n/g,' ').trim();
  var u=new SpeechSynthesisUtterance(clean);u.rate=0.95;u.pitch=1.05;u.volume=1;
  window.speechSynthesis.cancel();window.speechSynthesis.speak(u);
}

var recognition=null;
if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = function() {
    console.log("Mic active");
  };

  recognition.onresult = function(e){
    var t = '';
    for(var i=e.resultIndex; i<e.results.length; ++i) {
        t += e.results[i][0].transcript;
    }
    var inp=document.getElementById('chat-inp');
    if(inp) {
        inp.value = t;
    }
  };

  recognition.onerror = function(event) {
    console.error("Mic error", event.error);
    stopMic();
    if(event.error === 'not-allowed') {
        alert("Microphone access denied. Please enable it in your browser settings.");
    }
  };

  recognition.onend = function() {
    stopMic();
    const inp = document.getElementById('chat-inp');
    if(inp && inp.value.trim().length > 2) {
        window.chatSend();
    }
  };
}

window.toggleMic = function(){
  if(!recognition) return alert("Speech recognition not supported in this browser. Try Chrome or Safari.");
  var btn=document.getElementById('chat-mic');
  if(btn.classList.contains('recording')){
    stopMic();
  } else {
    startMic();
  }
};

function startMic(){
  if(!recognition)return;
  try {
    var btn=document.getElementById('chat-mic');
    btn.classList.add('recording');
    recognition.start();
  } catch(e) {
    console.error(e);
    stopMic();
  }
}
function stopMic(){
  if(!recognition)return;
  var btn=document.getElementById('chat-mic');
  btn.classList.remove('recording');
  try { recognition.stop(); } catch(e) {}
}

const PKGS={"standard":[{"name":"Starter","price":"$1,500 + $150/mo","desc":"1-Page High-Fidelity Website \u00b7 Full Brand Setup (Logo, Domain, Favicon) \u00b7 Social Media Integration \u00b7 Technical SEO & SSL \u00b7 1 Month Free Maintenance"},{"name":"Growth","price":"$3,500 + $400/mo","desc":"Manage 1 Brand Page \u00b7 Full Branding & App/Web Architecture \u00b7 Content Creation & Copywriting \u00b7 Advanced SEO & Analytics \u00b7 1 Month Free Maintenance"},{"name":"Trusted","price":"$6,000 + $700/mo","desc":"Full Website Architecture (10-15 Pages) \u00b7 Premium Brand Scaling & PR \u00b7 24/7 Priority Tech Support \u00b7 Technical SEO & SSL \u00b7 1 Month Free Maintenance"},{"name":"Custom","price":"Starting at $10,000","desc":"Tailored Digital Architecture \u00b7 Custom API & Tool Integration \u00b7 Unique Brand Identity Design \u00b7 Scalable Infrastructure \u00b7 Priority Sovereign Support"}],"ecommerce":[{"name":"E-Starter","price":"$2,500 + $250/mo","desc":"1-Page Online Shop \u00b7 Full Store Branding & Domain \u00b7 Integrated Social Shop Setup \u00b7 Payment Gateway Integration \u00b7 1 Month Free Maintenance"},{"name":"E-Growth","price":"$5,000 + $500/mo","desc":"2-5 Page Store Architecture \u00b7 Full Shop Logic (10+ Products) \u00b7 Deep Copywriting & Product SEO \u00b7 Automated Fulfillment Sync \u00b7 1 Month Free Maintenance"},{"name":"E-Trusted","price":"$8,500 + $850/mo","desc":"Elite Store (50+ Products) \u00b7 15+ Page Network Architecture \u00b7 Advanced Inventory & CRM Automation \u00b7 On-Chain Inventory Logic \u00b7 1 Month Free Maintenance"},{"name":"E-Commerce Maintenance","price":"$199.99/mo","desc":"E-Commerce Store Uptime & Security Monitoring \u00b7 Monthly Product & Content Updates \u00b7 High-Fidelity Technical Backups \u00b7 Priority Support"}],"ai":[{"name":"AI Tier 1","price":"$1,500 + $150/mo","desc":"AI Website Chatbot (24/7 Live) \u00b7 Lead Capture & CRM Setup \u00b7 [Chatbot Audio Feature: +$500 setup +$50/mo]"},{"name":"AI Tier 2","price":"$3,500 + $400/mo","desc":"Everything in Tier 1 \u00b7 WhatsApp AI Automation (24/7) \u00b7 [Chatbot Audio Feature: +$500 setup +$50/mo]"},{"name":"AI Tier 3","price":"$6,000 + $700/mo","desc":"Everything in Tier 1 & 2 \u00b7 Email Inbox AI Automation (24/7) \u00b7 AI Reads, Responds & Qualifies Every Email \u00b7 1 Month Free Maintenance"},{"name":"AI Tier 4","price":"$8,000 + $900/mo","desc":"Everything in Tiers 1, 2 & 3 \u00b7 Full Voice Agent Deployment \u00b7 Answers inbound calls 24/7 \u00b7 1 Month Free Maintenance"}],"continuity":[{"name":"Maintenance","price":"$99.99/mo","desc":"Daily Uptime & Security Monitoring \u00b7 Monthly Content Optimization \u00b7 High-Fidelity Technical Backups \u00b7 Priority Sovereign Support"}],"templates":[{"name":"Template Site","price":"$149.99 + $19.99/mo","desc":"Choose any of our 24 templates \u00b7 Logo & colours swapped in \u00b7 Your content added \u00b7 Mobile-optimised \u00b7 Live in 24hrs \u00b7 Hosted on your subdomain"},{"name":"+ Copywriting Add-On","price":"$4.99/update","desc":"Everything in Template Site \u00b7 Professional copywriting for all sections \u00b7 Bio, services, CTA all written for you \u00b7 Delivered in 48-72hrs"},{"name":"+ AI Chatbot Add-On","price":"$349.99 + $49.99/mo","desc":"Everything in Template Site \u00b7 AI chatbot answering your business FAQs 24/7 \u00b7 Hours, services, location, how to book"},{"name":"Micro Store","price":"$249.99 + $34.99/mo","desc":"Full product store built on your chosen template \u00b7 Up to 12 products uploaded with copy & images \u00b7 WhatsApp order button on every product \u00b7 Live in 72-96hrs"},{"name":"Premium Template (3D)","price":"$200 + $19.99/mo","desc":"Aeon \u00b7 Nexus \u00b7 Stellar \u2014 cinematic 3D WebGL experiences \u00b7 Fully immersive \u00b7 Scroll-driven animation"}]};

const STEPS = {
    "start": {
        "bot": "Hey 👋 What brings you here today?",
        "r": [
            { "l": "I want a template site", "s": "pkg_templates", "i": "color-swatch" },
            { "l": "I need a custom website", "s": "need_website", "i": "layout" },
            { "l": "I need AI automation", "s": "automation", "i": "cpu" },
            { "l": "Agency Packages", "s": "pkg_menu", "i": "package" },
            { "l": "About Prisca Dezigns", "s": "about", "i": "info" }
        ]
    },
    "about": {
        "bot": "Prisca Dezigns is a high-fidelity digital agency specializing in premium web architecture and AI automation. We're on a mission to build the future of the Caribbean.",
        "r": [
            { "l": "Evolve Mobility", "s": "about_brands", "i": "car" },
            { "l": "The Way Made Known", "s": "about_twmk", "i": "heart" },
            { "l": "About Prisca Dezigns", "s": "about_founder", "i": "user" },
            { "l": "Back", "s": "start", "i": "arrow-left" }
        ]
    },
    "about_brands": {
        "bot": "We are the strategic digital partners for Evolve Mobility (driveevolve.com), the leading EV dealership in the Caribbean.\n\nInventory & Pricing:\n⚡ BYD Atto 3: $285,000 TTD\n⚡ BYD Dolphin: $195,000 TTD\n⚡ GAC AION Y Plus: $245,000 TTD\n⚡ Leapmotor C11: $310,000 TTD\n⚡ Leapmotor T03: $145,000 TTD",
        "r": [
            { "l": "Visit Evolve Mobility", "url": "https://driveevolve.com", "i": "external-link" },
            { "l": "Back", "s": "about", "i": "arrow-left" }
        ]
    },
    "about_twmk": {
        "bot": "The Way Made Known (TWMK) is our humanitarian backbone. We use a portion of our agency profits to share the Gospel and provide community support in Trinidad and Tobago.",
        "r": [
            { "l": "Back", "s": "about", "i": "arrow-left" }
        ]
    },
    "about_founder": {
        "bot": "Prisca Dezigns was founded in Trinidad & Tobago by Priscilla Narine. With a focus on high-fidelity results and precision data management, she leads a team that integrates AI into professional workflows seamlessly.",
        "r": [
            { "l": "Back", "s": "about", "i": "arrow-left" }
        ]
    },
    "need_website": {
        "bot": "Our custom websites are built from scratch — fully tailored to your brand, SEO-optimised, and delivered fast. What do you need?",
        "r": [
            { "l": "Need it in 24hrs — $200", "s": "pkg_oneday", "i": "zap" },
            { "l": "I need a full custom build", "s": "pkg_standard", "i": "code" },
            { "l": "Mine isn't converting", "s": "bad_website", "i": "trending-down" },
            { "l": "Show me templates instead", "s": "pkg_templates", "i": "color-swatch" }
        ]
    },
    "pkg_menu": {
        "bot": "Our agency packages are full custom builds — designed, developed and delivered by Prisca Dezigns. Which fits your needs?",
        "r": [
            { "l": "1-Day Website — $200", "s": "pkg_oneday", "i": "zap" },
            { "l": "Custom Website Packages", "s": "pkg_standard", "i": "layout" },
            { "l": "E-Commerce Packages", "s": "pkg_ecommerce", "i": "shopping-bag" },
            { "l": "AI Consultancy", "s": "pkg_ai", "i": "cpu" },
            { "l": "Maintenance", "s": "pkg_continuity", "i": "tool" },
            { "l": "I want a template instead", "s": "pkg_templates", "i": "color-swatch" }
        ]
    },
    "pkg_oneday": {
        "bot": "The 1-Day Website is a fully custom site — built to your brand, live within 24 hours. One flat price: $200 setup. Then $50/mo to keep it live, optimised, and secure.",
        "r": [
            { "l": "What's included?", "s": "oneday_included", "i": "check-circle" },
            { "l": "I want this — let's talk", "s": "talk", "i": "message-circle" },
            { "l": "See other packages", "s": "pkg_menu", "i": "package" }
        ]
    },
    "oneday_included": {
        "bot": "Your 1-Day Site includes: ✦ Full custom design (not a template) ✦ Mobile-first, fast-loading ✦ SEO + GEO + AEO optimised ✦ WhatsApp & contact integration ✦ Live in 24 hours. $200 flat. $50/mo maintenance.",
        "r": [
            { "l": "Let's get started", "s": "talk", "i": "zap" },
            { "l": "See template option instead", "s": "pkg_templates", "i": "color-swatch" },
            { "l": "See all packages", "s": "pkg_menu", "i": "package" }
        ]
    },
    "automation": {
        "bot": "We build AI systems that replace a full-time customer service rep. They respond, qualify, and follow up — all day, every day. What are you trying to automate?",
        "r": [
            { "l": "Customer service / enquiries", "s": "how_it_works", "i": "headphones" },
            { "l": "WhatsApp automation", "s": "whatsapp_auto", "i": "message-square" },
            { "l": "Full business automation", "s": "pkg_ai", "i": "settings" },
            { "l": "Talk to someone", "s": "talk", "i": "message-circle" }
        ]
    },
    "whatsapp_auto": {
        "bot": "We integrate an AI agent directly into your WhatsApp Business. It responds to every message instantly, qualifies the lead, and alerts you only when someone is ready to pay.",
        "r": [
            { "l": "See AI packages", "s": "pkg_ai", "i": "package" },
            { "l": "Talk to someone", "s": "talk", "i": "message-circle" }
        ]
    },
    "how_it_works": {
        "bot": "We connect an AI agent to your WhatsApp, website, or email. It greets every lead, asks qualifying questions, routes serious buyers to you, and follows up with everyone else automatically. Setup takes 2–4 weeks.",
        "r": [
            { "l": "See AI packages", "s": "pkg_ai", "i": "package" },
            { "l": "Talk to someone", "s": "talk", "i": "message-circle" }
        ]
    },
    "talk": {
        "bot": "The best way to get moving is a direct handshake on WhatsApp. I've prepared a direct link for you to message the management team.",
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

function go(step, label){
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
            renderPkgs(PKGS[s.pkg]);
            addQR('← Packages', 'pkg_menu');
            addQR('Contact Team', 'talk');
            return;
        }
        if(s.url) window.open(s.url, '_blank');
        if(s.r) s.r.forEach(r => addQR(r.l, r.s));
    }, 600);
}

function addQR(label, step, icon){
    const q = document.getElementById('chat-qr');
    const b = document.createElement('button');
    b.className = 'qrb';
    
    let iconSvg = '';
    if(icon){
      // Minimalist Lucide-style SVG mapping
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
        'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
        'headphones': '<path d="M3 14h3v7H3v-7zm15 0h3v7h-3v-7z"/><path d="M3 14v-4a9 9 0 0 1 18 0v4"/>',
        'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
        'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
      };
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${icons[icon] || icons['info']}</svg>`;
    }

    b.innerHTML = iconSvg + `<span>${label}</span>`;
    b.onclick = () => go(step, label);
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
}

function renderPkgs(list){
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
    m.scrollTop = m.scrollHeight;
}

window.chatSend = function(){
    const i = document.getElementById('chat-inp');
    const t = i.value.trim(); if(!t) return;
    i.value = ''; addMsg(t, 'usr');
    
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




