
(function(){
    // Inject Styles
    if(!document.getElementById('pd-chat-styles')){
        const s = document.createElement('style');
        s.id = 'pd-chat-styles';
        s.textContent = `:root {
        --cb-light-purple: #9d50bb;
        --cb-glow-purple: #6e48aa;
        --cb-futuristic-bg: rgba(255, 255, 255, 0.95);
    }
    /* ── Chatbot Bubble ── */
    #pd-chat-bubble {
        position:fixed; bottom:28px; right:28px; z-index:9999;
        width:64px; height:64px; border-radius:50%;
        background: linear-gradient(135deg, var(--cb-light-purple), var(--cb-glow-purple));
        border:none;
        display:flex; align-items:center; justify-content:center;
        cursor:pointer; box-shadow:0 10px 40px rgba(157, 80, 187, 0.4);
        transition:all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #pd-chat-bubble:hover { transform:scale(1.1) rotate(5deg); box-shadow:0 15px 50px rgba(157, 80, 187, 0.6); }
    #pd-chat-bubble svg { width:30px; height:30px; fill:#fff; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
    #pd-chat-bubble .chat-x { display:none; font-size:1.6rem; color:#fff; font-weight:700; line-height:1; }
    #pd-chat-bubble.open svg { display:none; }
    #pd-chat-bubble.open .chat-x { display:block; }
    
    /* ── Chat Window ── */
    #pd-chat-window {
        position:fixed; bottom:108px; right:28px; z-index:9998;
        width:420px;
        background: var(--cb-futuristic-bg);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(157, 80, 187, 0.15);
        box-shadow:0 30px 90px rgba(48, 25, 52, 0.18);
        display:flex; flex-direction:column;
        opacity:0; pointer-events:none;
        transform:translateY(30px) scale(0.95);
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        max-height:720px;
        border-radius:24px;
        overflow: hidden;
    }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
    
    /* ── Header ── */
    .chat-hdr { background: linear-gradient(to right, var(--cb-light-purple), var(--cb-glow-purple)); padding:22px 26px; display:flex; align-items:center; gap:16px; flex-shrink:0; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .chat-avatar { width:50px; height:50px; border-radius:16px; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); flex-shrink:0; transform: rotate(-3deg); transition: transform 0.3s; }
    .chat-avatar:hover { transform: rotate(0deg) scale(1.05); }
    .chat-hdr-name { font-size:1.1rem; font-weight:800; letter-spacing:0.02em; color:#fff; font-family: 'Playfair Display', serif, system-ui; }
    .chat-hdr-status { font-size:0.75rem; color:rgba(255,255,255,0.8); display:flex; align-items:center; gap:8px; margin-top:4px; font-weight: 500; }
    .chat-hdr-right { margin-left:auto; display:flex; align-items:center; gap:10px; }
    
    /* Voice toggle button */
    #chat-voice-toggle {
        background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.2);
        color:#fff; border-radius:12px;
        font-size:0.65rem; font-weight:700; text-transform: uppercase; letter-spacing:0.08em;
        padding:7px 12px; cursor:pointer; display:flex; align-items:center; gap:6px;
        transition: all 0.2s;
    }
    #chat-voice-toggle:hover { background:rgba(255,255,255,0.25); transform: translateY(-1px); }
    #chat-voice-toggle.voice-on { background:#fff; color:var(--cb-light-purple); border-color:#fff; box-shadow: 0 4px 12px rgba(255,255,255,0.3); }
    .chat-sdot { width:8px; height:8px; border-radius:50%; background:#00ffa3; box-shadow: 0 0 10px #00ffa3; animation:pgr 2s infinite; }
    @keyframes pgr { 0%,100%{opacity:1; transform: scale(1);} 50%{opacity:0.6; transform: scale(1.2);} }
    
    /* ── Back bar ── */
    #chat-back-bar { display:none; align-items:center; gap:10px; padding:12px 20px; border-bottom:1px solid rgba(157, 80, 187, 0.08); background:rgba(157, 80, 187, 0.03); cursor:pointer; flex-shrink:0; }
    #chat-back-bar.vis { display:flex; }
    #chat-back-bar span { font-size:0.75rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:var(--cb-light-purple); opacity:0.7; }
    #chat-back-bar:hover span { opacity:1; }
    
    /* ── Messages ── */
    .chat-msgs { flex:1; overflow-y:auto; padding:24px 20px; display:flex; flex-direction:column; gap:16px; min-height:200px; max-height:480px; }
    .chat-msgs::-webkit-scrollbar { width:4px; }
    .chat-msgs::-webkit-scrollbar-thumb { background: rgba(157, 80, 187, 0.2); border-radius:10px; }
    .cmsg { max-width:85%; font-size:0.95rem; line-height:1.6; padding:14px 18px; position: relative; transition: transform 0.2s; font-family: 'Inter', sans-serif, system-ui; }
    .cmsg:hover { transform: translateX(2px); }
    .cmsg.bot { background:#fff; color: #333; align-self:flex-start; border-radius:18px 18px 18px 4px; border: 1px solid rgba(157, 80, 187, 0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
    .cmsg.usr { background: var(--cb-light-purple); color:#fff; align-self:flex-end; border-radius:18px 18px 4px 18px; font-weight:500; box-shadow: 0 4px 15px rgba(157, 80, 187, 0.2); }
    
    /* Typing dots */
    .cmsg.typing { background:#fff; align-self:flex-start; border-radius:18px 18px 18px 4px; padding:18px 24px; border: 1px solid rgba(157, 80, 187, 0.1); }
    .typing-dots { display:flex; gap:6px; }
    .typing-dots span { width:8px; height:8px; border-radius:50%; background:var(--cb-light-purple); opacity: 0.3; animation: tdot 1.4s infinite; }
    .typing-dots span:nth-child(2){animation-delay:0.2s;}
    .typing-dots span:nth-child(3){animation-delay:0.4s;}
    @keyframes tdot{0%,60%,100%{transform:translateY(0); opacity: 0.3;}30%{transform:translateY(-8px); opacity: 1;}}
    
    /* ── Package cards ── */
    .cpkg-grid { display:flex; flex-direction:column; gap:12px; width:100%; align-self:stretch; }
    .cpkg-card { background:#fff; border:1px solid rgba(157, 80, 187, 0.15); padding:16px 18px; cursor:pointer; transition:all 0.3s; border-radius:16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
    .cpkg-card:hover { border-color:var(--cb-light-purple); background:rgba(157, 80, 187, 0.04); transform: translateY(-3px); box-shadow: 0 8px 20px rgba(157, 80, 187, 0.1); }
    .cpkg-name { font-size:1rem; font-weight:800; color:var(--cb-light-purple); letter-spacing:0.02em; font-family: 'Playfair Display', serif; }
    .cpkg-price { font-size:0.85rem; font-weight:700; color:var(--cb-glow-purple); margin-top:4px; opacity: 0.8; }
    .cpkg-desc { font-size:0.8rem; color:#666; margin-top:8px; line-height:1.5; font-family: 'Inter', sans-serif; }
    
    /* ── Quick replies ── */
    .chat-qr { padding:12px 18px 16px; display:flex; flex-wrap:wrap; gap:10px; flex-shrink:0; }
    .qrb { font-size:0.82rem; font-weight:700; letter-spacing:0.02em; padding:10px 18px; border:1px solid rgba(157, 80, 187, 0.2); background:#fff; cursor:pointer; color:var(--cb-light-purple); border-radius:14px; transition:all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.04); font-family: 'Inter', sans-serif; }
    .qrb:hover { background:var(--cb-light-purple); color:#fff; border-color:var(--cb-light-purple); transform: translateY(-2px); box-shadow: 0 5px 15px rgba(157, 80, 187, 0.2); }
    .qrb.wa { background: #25D366; color:#fff; border-color:#25D366; display:inline-flex; align-items:center; gap:8px; text-decoration:none; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); }
    .qrb.wa:hover { background:#128C7E; border-color:#128C7E; }
    
        #pd-chat-bubble { animation: bubbleFloat 3s ease-in-out infinite; }
    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    .ai-svg { width: 28px; height: 28px; color: #fff; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
    /* ── Input row ── */
    .chat-inp-row { display:flex; border-top:1px solid rgba(0,0,0,0.05); flex-shrink:0; align-items: center; padding: 6px 12px 6px 6px; background: #fff; }
    #chat-inp { flex:1; border:none; background:transparent; padding:18px 16px; font-size:1rem; font-family: 'Inter', sans-serif; color:#333; outline:none; }
    #chat-inp::placeholder { color:#aaa; }
    #chat-mic { background: transparent; border: none; cursor: pointer; padding: 12px; color: var(--cb-light-purple); opacity: 0.6; transition: all 0.2s; display: flex; align-items: center; border-radius: 12px; }
    #chat-mic:hover { opacity: 1; background: rgba(157, 80, 187, 0.05); }
    #chat-mic.recording { color: #ff4d4d; opacity: 1; animation: cbPulse 1.5s infinite; background: rgba(255, 77, 77, 0.1); }
    @keyframes cbPulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.4); } 70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(255, 77, 77, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 77, 77, 0); } }
    #chat-snd { background: var(--cb-light-purple); border:none; cursor:pointer; width:48px; height:48px; display: flex; align-items: center; justify-content: center; color:#fff; font-size:1.2rem; transition:all 0.3s; border-radius: 14px; box-shadow: 0 4px 12px rgba(157, 80, 187, 0.3); }
    #chat-snd:hover { background: var(--cb-glow-purple); transform: scale(1.05); }
    
    @media(max-width:520px){
        #pd-chat-window{width:calc(100vw - 24px);right:12px;left:12px;bottom:90px;max-height:82vh; border-radius: 20px;}
        .chat-hdr { padding: 18px 20px; }
        .chat-msgs { padding: 20px 16px; }
        .cmsg { font-size:0.92rem; padding: 12px 16px; }
        #chat-inp { font-size:0.92rem; }
    }
`;
        document.head.appendChild(s);
    }
    
    // Inject HTML Structure if missing
    if(!document.getElementById('pd-chat-bubble')){
        const container = document.createElement('div');
        container.innerHTML = `
    <div id="pd-chat-bubble" onclick="toggleChat()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai-svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
        <span class="chat-x">✕</span>
    </div>
    <div id="pd-chat-window">
        <div class="chat-hdr">
            <div class="chat-avatar" style="background:linear-gradient(135deg, #9d50bb, #6e48aa); display:flex; align-items:center; justify-content:center; color:#fff; border-radius:50%;"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg></div>
            <div style="flex:1">
                <div class="chat-hdr-name">Prisca Dezigns</div>
                <div class="chat-hdr-status"><div class="chat-sdot"></div> Online now</div>
            </div>
            <div class="chat-hdr-right">
                <button id="chat-voice-toggle" onclick="toggleVoice()" title="Read replies aloud">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    VOICE OFF
                </button>
            </div>
        </div>
        <div id="chat-back-bar" onclick="chatBack()"><span>← Back</span></div>
        <div class="chat-msgs" id="chat-msgs"></div>
        <div class="chat-qr" id="chat-qr"></div>
        <div class="chat-inp-row">
            <button id="chat-mic" onclick="toggleMic()" title="Record voice note">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>
            <input type="text" id="chat-inp" placeholder="Type a message…" onkeydown="if(event.key==='Enter')chatSend()" />
            <button id="chat-snd" onclick="chatSend()"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>
        </div>
    </div>
`;
        while (container.firstChild) {
            document.body.appendChild(container.firstChild);
        }
    }


const WA="https://wa.me/18683424101";


const SYSTEM_PROMPT = "You are the Prisca Dezigns AI assistant — the sales and support agent for Prisca Dezigns, a premium digital agency based in Trinidad & Tobago.\n\nYour personality: warm, professional, sharp, and conversational. You speak like a knowledgeable friend who happens to be a web design expert — never robotic, never generic, never pushy. Keep replies concise (2–4 sentences max unless detail is needed). Always ask a follow-up question to keep the conversation moving.\n\nABOUT PRISCA DEZIGNS:\nPrisca Dezigns is a full-service digital agency specialising in high-fidelity websites, AI automation, and brand architecture. Founded in Trinidad & Tobago by Priscilla Narine. Every project is professionally built — no drag-and-drop builders. Clients provide content; the team handles everything else.\n\nSERVICES & PRICING:\n- 1-Day Custom Site: $299.99 flat, live in 24hrs, full custom design\n- Custom Web Packages: Starting from $1,500 setup\n- AI Consultancy: From $1,500 setup + $150/mo\n- WhatsApp AI Automation: $3,500 setup + $400/mo\n- Email AI Automation: $6,000 setup + $700/mo\n- Voice Agents: Starting at $8,000 setup + $900/mo\n\nTEMPLATE SHOP (templates.priscadezigns.org):\n- 40+ professional templates, live in 24hrs\n- Standard: $149.99 setup + $19.99/mo\n- Premium 3D (Aeon, Nexus, Stellar): $299.99 setup + $19.99/mo\n\nRULES:\n- Keep replies conversational, 2-4 sentences\n- Always end with a follow-up question or clear next step\n- Never make up prices not listed\n- If asked anything outside your knowledge, offer to connect them with the team via WhatsApp (1-868-342-4101)\n- Speak about Evolve Mobility as a strategic partner dealership we build for.";

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
    if(s.includes("price") || s.includes("cost")) r = "Our agency packages are customized, but our 1-Day Custom Sites start at just $299.99 flat. Would you like the full pricing guide for our AI automation tiers?";
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
    btn.innerHTML='<svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"'+svgPath+'\"/></svg>'+(voiceOn?' VOICE ON':' VOICE OFF');
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
if('webkitSpeechRecognition' in window){
  recognition=new webkitSpeechRecognition();
  recognition.continuous=false;
  recognition.interimResults=false;
  recognition.onresult=function(e){
    var t=e.results[0][0].transcript;
    var inp=document.getElementById('chat-inp');
    if(inp){inp.value=t;window.chatSend();}
    stopMic();
  };
  recognition.onerror=function(){ stopMic(); };
  recognition.onend=function(){ stopMic(); };
}

window.toggleMic=function(){
  if(!recognition) return alert("Speech recognition not supported in this browser.");
  var btn=document.getElementById('chat-mic');
  if(btn.classList.contains('recording')){
    stopMic();
  } else {
    startMic();
  }
};

function startMic(){
  if(!recognition)return;
  var btn=document.getElementById('chat-mic');
  btn.classList.add('recording');
  recognition.start();
}
function stopMic(){
  if(!recognition)return;
  var btn=document.getElementById('chat-mic');
  btn.classList.remove('recording');
  recognition.stop();
}

const PKGS={
  standard:[
    {name:"Starter",desc:"1-Page High-Fidelity Website · Full Brand Setup (Logo, Domain, Favicon) · Social Media Integration · Technical SEO & SSL · 1 Month Free Maintenance"},
    {name:"Growth",desc:"Manage 1 Brand Page · Full Branding & App/Web Architecture · Content Creation & Copywriting · Advanced SEO & Analytics · 1 Month Free Maintenance"},
    {name:"Trusted",desc:"Full Website Architecture (10-15 Pages) · Premium Brand Scaling & PR · 24/7 Priority Tech Support · Technical SEO & SSL · 1 Month Free Maintenance"},
    {name:"Custom",desc:"Tailored Digital Architecture · Custom API & Tool Integration · Unique Brand Identity Design · Scalable Infrastructure · Priority Sovereign Support"}
  ],
  ecommerce:[
    {name:"E-Starter",desc:"1-Page Online Shop · Full Store Branding & Domain · Integrated Social Shop Setup · Payment Gateway Integration · 1 Month Free Maintenance"},
    {name:"E-Growth",desc:"2-5 Page Store Architecture · Full Shop Logic (10+ Products) · Deep Copywriting & Product SEO · Automated Fulfillment Sync · 1 Month Free Maintenance"},
    {name:"E-Trusted",desc:"Elite Store (50+ Products) · 15+ Page Network Architecture · Advanced Inventory & CRM Automation · On-Chain Inventory Logic · 1 Month Free Maintenance"},
    {name:"E-Commerce Maintenance",desc:"E-Commerce Store Uptime & Security Monitoring · Monthly Product & Content Updates · High-Fidelity Technical Backups · Priority Support · $199.99/mo"}
  ],
  ai:[
    {name:"AI Tier 1",price:"$1,500 + $150/mo",desc:"AI Website Chatbot (24/7 Live) · Lead Capture & CRM Setup · [Voice Intelligence Add-on: +$500 setup +$50/mo]"},
    {name:"AI Tier 2",price:"$3,500 + $400/mo",desc:"Everything in Tier 1 · WhatsApp AI Automation (24/7) · [Voice Intelligence Add-on: +$500 setup +$50/mo]"},
    {name:"AI Tier 3",price:"$6,000 + $700/mo",desc:"Everything in Tier 1 & 2 · Email Inbox AI Automation (24/7) · AI Reads, Responds & Qualifies Every Email · 1 Month Free Maintenance"},
    {name:"AI Tier 4",price:"$8,000 + $900/mo",desc:"Everything in Tiers 1, 2 & 3 · Full Voice Agent Deployment · Answers inbound calls 24/7 · 1 Month Free Maintenance"}
  ],
  continuity:[
    {name:"Maintenance",desc:"Daily Uptime & Security Monitoring · Monthly Content Optimization · High-Fidelity Technical Backups · Priority Sovereign Support"}
  ],
  templates:[
    {name:"Template Site",desc:"Choose any of our 24 templates · Logo & colours swapped in · Your content added · Mobile-optimised · Live in 24hrs · Hosted on your subdomain"},
    {name:"+ Copywriting Add-On",desc:"Everything in Template Site · Professional copywriting for all sections · Bio, services, CTA all written for you · Delivered in 48-72hrs"},
    {name:"+ AI Chatbot Add-On",desc:"Everything in Template Site · AI chatbot answering your business FAQs 24/7 · Hours, services, location, how to book · $349.99 setup · $49.99/mo"},
    {name:"Micro Store",desc:"Full product store built on your chosen template · Up to 12 products uploaded with copy & images · WhatsApp order button on every product · Live in 72-96hrs · $249.99 setup · $34.99/mo"},
    {name:"⭐ Premium Template (3D)",desc:"Aeon · Nexus · Stellar — cinematic 3D WebGL experiences · Fully immersive · Scroll-driven animation · $299.99 setup · $19.99/mo"}
  ]
};

const STEPS = {
    
  council_menu:{
    bot:"The Strategic Council is ready. Who would you like to consult with?",
    r:[
      {l:"👨‍💻 Strategic Council",s:"council_menu"},
      {l:"👨‍💻 Drew (Lead Architect)",s:"council_drew"},
      {l:"👩‍💻 Sierra (Customer Ops)",s:"council_sierra"},
      {l:"💻 Kimi (Code Auditor)",s:"council_kimi"},
      {l:"← Back to start",s:"start"}
    ]
  },
  council_drew:{
    bot:"I am Drew, the Lead Architect. I handle high-fidelity web design, e-commerce, and AI automation strategy. How can I help you build your brand today?",
    r:[{l:"Talk to Drew",s:"talk"},{l:"← Back",s:"council_menu"}]
  },
  council_sierra:{
    bot:"I am Sierra, Customer Operations Representative. I handle autonomous workflows, inventory management, and database actions. What operations can I streamline for you?",
    r:[{l:"Talk to Sierra",s:"talk"},{l:"← Back",s:"council_menu"}]
  },
  council_kimi:{
    bot:"I am Kimi, the Code & Fiscal Auditor. I perform deterministic checks on code and financial data for 100% accuracy. Do you have a project for review?",
    r:[{l:"Talk to Kimi",s:"talk"},{l:"← Back",s:"council_menu"}]
  },
  start:{
        bot:"Hey 👋 What brings you here today?",
        r:[{l:"🎨 I want a template site",s:"pkg_templates"},{l:"🏗️ I need a custom website",s:"need_website"},{l:"📈 I need more leads",s:"more_leads"},{l:"🤖 I need AI automation",s:"automation"},{l:"📦 See agency packages",s:"pkg_menu"}]
    },
    need_website:{
        bot:"Our custom websites are built from scratch — fully tailored to your brand, SEO-optimised, and delivered fast. What do you need?",
        r:[{l:"⚡ Need it in 24hrs — $299.99",s:"pkg_oneday"},{l:"I need a full custom build",s:"pkg_standard"},{l:"Mine isn't converting",s:"bad_website"},{l:"🎨 Show me templates instead",s:"pkg_templates"}]
    },
    no_website:{
        bot:"Every day without a website is a day your competitor gets the client that should've been yours. Here are our website packages:",
        r:[],pkg:"standard"
    },
    bad_website:{
        bot:"A website that doesn't convert is just an expensive business card. Here's what a full rebuild looks like:",
        r:[],pkg:"standard"
    },
    more_leads:{
        bot:"Most businesses don't have a lead problem — they have a follow-up problem. Leads come in, nobody responds fast enough, and they're gone. What's your biggest issue?",
        r:[{l:"No one responds fast enough",s:"slow_response"},{l:"Hard to tell who's serious",s:"filter_leads"},{l:"No system at all",s:"no_system"},{l:"See AI packages",s:"pkg_ai"}]
    },
    slow_response:{
        bot:"78% of leads buy from the first business that responds. Our AI responds instantly — 24/7, even at 2am on a Sunday.",
        r:[{l:"How does it work?",s:"how_it_works"},{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
    },
    filter_leads:{
        bot:"Our lead filter qualifies every enquiry the second it lands — budget, timeline, intent. Only serious buyers reach you. The rest are nurtured automatically.",
        r:[{l:"I want this",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
    },
    no_system:{
        bot:"We build the whole system from scratch — AI chatbot, WhatsApp automation, lead capture, CRM setup. You walk away with a machine that works while you sleep.",
        r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
    },
    how_it_works:{
        bot:"We connect an AI agent to your WhatsApp, website, or email. It greets every lead, asks qualifying questions, routes serious buyers to you, and follows up with everyone else automatically. Setup takes 2–4 weeks.",
        r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
    },
    automation:{
        bot:"We build AI systems that replace a full-time customer service rep. They respond, qualify, and follow up — all day, every day. What are you trying to automate?",
        r:[{l:"Customer service / enquiries",s:"how_it_works"},{l:"WhatsApp automation",s:"whatsapp_auto"},{l:"Full business automation",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
    },
    whatsapp_auto:{
        bot:"We integrate an AI agent directly into your WhatsApp Business. It responds to every message instantly, qualifies the lead, and alerts you only when someone is ready to pay.",
        r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
    },
    pkg_menu:{
        bot:"Our agency packages are full custom builds — designed, developed and delivered by Prisca Dezigns. Which fits your needs?",
        r:[{l:"⚡ 1-Day Website — $299.99",s:"pkg_oneday"},{l:"🌐 Custom Website Packages",s:"pkg_standard"},{l:"🛒 E-Commerce Packages",s:"pkg_ecommerce"},{l:"🤖 AI Consultancy",s:"pkg_ai"},{l:"🔧 Maintenance",s:"pkg_continuity"},{l:"🎨 I want a template instead",s:"pkg_templates"}]
    },
    pkg_templates:{
        bot:"The Template Shop is a separate service from our agency packages — faster, simpler, and more affordable. Pick a design, send your photos, go live in 24 hours. No tech needed.",
        r:[{l:"Browse all templates",s:"templates_browse"},{l:"What's included?",s:"templates_included"},{l:"Template + Chatbot option",s:"templates_chatbot"},{l:"Talk to someone",s:"talk"}]
    },
    templates_chatbot:{
        bot:"You're in the right place! 🎉 The chatbot add-on is $49.99 one-time setup + $10/mo added to hosting ($29.99/mo total). It answers your business FAQs 24/7 — hours, pricing, location, services, how to book. Nothing outside your business.",
        wa:true,
        r:[{l:"Template only is fine",s:"templates_browse"},{l:"Back to templates",s:"pkg_templates"}]
    },
    templates_browse:{
        bot:"Our Template Shop has 17 live designs — pick one, send your photos and logo, and go live in 24 hours.",
        r:[{l:"🎨 Open Template Shop →",s:"templates_browse"}],url:"https://priscadezigns.org/templates/"
    },
    templates_included:{
        bot:"Every template includes: ✦ Your logo & colours ✦ Photos & content swapped in ✦ Mobile-optimised ✦ Live in 24 hours ✦ $149.99 setup · $19.99/mo hosting. Add chatbot for $50 (+$10/mo). Add copywriting for $4.99/update.",
        r:[{l:"Browse templates",s:"templates_browse"},{l:"Add chatbot — $49.99",s:"templates_chatbot"},{l:"I'm ready — let's go",s:"talk"}]
    },
    pkg_oneday:{
        bot:"The 1-Day Website is a fully custom site — built to your brand, live within 24 hours. One flat price: $299.99. Then $50/mo to keep it live, optimised, and secure.",
        r:[{l:"What's included?",s:"oneday_included"},{l:"I want this — let's talk",s:"talk"},{l:"See other packages",s:"pkg_menu"}]
    },
    oneday_included:{
        bot:"Your 1-Day Site includes: ✦ Full custom design (not a template) ✦ Mobile-first, fast-loading ✦ SEO + GEO + AEO optimised ✦ WhatsApp & contact integration ✦ Live in 24 hours. $299.99 flat. $50/mo maintenance.",
        r:[{l:"Let's get started",s:"talk"},{l:"See template option instead",s:"pkg_templates"},{l:"See all packages",s:"pkg_menu"}]
    },
    pkg_standard:{bot:"Here are our Standard Website Packages:",r:[],pkg:"standard"},
    pkg_ecommerce:{bot:"Here are our E-Commerce Packages:",r:[],pkg:"ecommerce"},
    pkg_ai:{bot:"Here are our AI Consultancy Packages:",r:[],pkg:"ai"},
    pkg_continuity:{bot:"Our System Continuity Package:",r:[],pkg:"continuity"},
    talk:{bot:"Tap below to start a WhatsApp conversation with us directly. We'll get back to you fast.",r:[],wa:true}
};

let open=false, started=false, hist=[];

window.toggleChat = function(){
    open=!open;
    document.getElementById('pd-chat-bubble').classList.toggle('open',open);
    document.getElementById('pd-chat-window').classList.toggle('open',open);
    if(open && !started){ started=true; setTimeout(()=>go('start',null),380); }
};

window.chatBack = function(){
    if(!hist.length) return;
    const p=hist.pop();
    const m=document.getElementById('chat-msgs');
    const q=document.getElementById('chat-qr');
    m.innerHTML=p.m; q.innerHTML=p.q;
    m.scrollTop=m.scrollHeight;
    q.querySelectorAll('.qrb[data-s]').forEach(b=>{ b.onclick=()=>go(b.dataset.s,b.textContent); });
    setBack(p.bv);
};

function setBack(v){ document.getElementById('chat-back-bar').classList.toggle('vis',v); }

function push(){
    const m=document.getElementById('chat-msgs');
    const q=document.getElementById('chat-qr');
    hist.push({m:m.innerHTML,q:q.innerHTML,bv:document.getElementById('chat-back-bar').classList.contains('vis')});
}

function go(key, userTxt){
    push();
    if(userTxt) addMsg(userTxt,'usr');
    const q=document.getElementById('chat-qr');
    q.innerHTML='';
    const s=STEPS[key]||STEPS.start;
    setTimeout(()=>{
        var botTxt = s.bot;
        addMsg(botTxt,'bot');
        speak(botTxt);
        setBack(hist.length>0);
        if(s.wa){
            const a=document.createElement('a');
            a.href=WA; a.target='_blank'; a.rel='noopener';
            a.className='qrb wa'; a.innerHTML=WA_SVG+' Chat on WhatsApp';
            q.appendChild(a);
            addQR('← All packages','pkg_menu');
            return;
        }
        if(s.pkg){
            renderPkgs(PKGS[s.pkg]);
            addQR('← All packages','pkg_menu');
            addQR('Talk to someone','talk');
            return;
        }
        if(s.url){
            window.open(s.url,'_blank');
            if(s.r) s.r.forEach(r=>addQR(r.l,r.s));
            return;
        }
        if(s.r) s.r.forEach(r=>addQR(r.l,r.s));
    },420);
}

function addQR(label,step){
    const q=document.getElementById('chat-qr');
    const b=document.createElement('button');
    b.className='qrb'; b.textContent=label; b.dataset.s=step;
    b.onclick=()=>go(step,label);
    q.appendChild(b);
}

function renderPkgs(list){
    const m=document.getElementById('chat-msgs');
    const g=document.createElement('div'); g.className='cpkg-grid';
    list.forEach(p=>{
        const c=document.createElement('div'); c.className='cpkg-card';
        c.innerHTML='<div class="cpkg-name">'+p.name+'</div>'+(p.price?'<div class="cpkg-price">'+p.price+'</div>':'')+'<div class="cpkg-desc">'+p.desc+'</div>';
        c.onclick=()=>go('talk','I\'m interested in '+p.name);
        g.appendChild(c);
    });
    m.appendChild(g); m.scrollTop=m.scrollHeight;
}

function addMsg(txt,type){
    const m=document.getElementById('chat-msgs');
    const d=document.createElement('div'); d.className='cmsg '+type; d.textContent=txt;
    m.appendChild(d); m.scrollTop=m.scrollHeight;
}

window.chatSend=function(){
    const i=document.getElementById('chat-inp');
    const t=i.value.trim(); if(!t) return;
    i.value=''; addMsg(t,'usr');
    
    // Typing indicator
    const m=document.getElementById('chat-msgs');
    const td=document.createElement('div');
    td.className='cmsg bot typing';
    td.id='typing-id';
    td.innerHTML='<div class="typing-dots"><span></span><span></span><span></span></div>';
    m.appendChild(td); m.scrollTop=m.scrollHeight;
    
    getAI(t, (reply) => {
        const tid = document.getElementById('typing-id');
        if(tid) tid.remove();
        addMsg(reply, 'bot');
        speak(reply);
        setBack(true);
    });
};

if(window.location.pathname.includes('/services')){
    setTimeout(()=>{ if(!open) toggleChat(); },8000);
}

})();