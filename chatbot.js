(function(){
const WA="https://wa.me/18683424101";

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
    start:{
        bot:"Hey 👋 What brings you here today?",
        r:[{l:"🎨 I want a template site",s:"pkg_templates"},{l:"🏗️ I need a custom website",s:"need_website"},{l:"📈 I need more leads",s:"more_leads"},{l:"🤖 I need AI automation",s:"automation"},{l:"📦 See agency packages",s:"pkg_menu"}]
    },
    need_website:{
        bot:"Our custom websites are built from scratch — fully tailored to your brand, SEO-optimised, and delivered fast. What do you need?",
        r:[{l:"⚡ Need it in 24hrs — $200",s:"pkg_oneday"},{l:"I need a full custom build",s:"pkg_standard"},{l:"Mine isn't converting",s:"bad_website"},{l:"🎨 Show me templates instead",s:"pkg_templates"}]
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
        r:[{l:"⚡ 1-Day Website — $200",s:"pkg_oneday"},{l:"🌐 Custom Website Packages",s:"pkg_standard"},{l:"🛒 E-Commerce Packages",s:"pkg_ecommerce"},{l:"🤖 AI Consultancy",s:"pkg_ai"},{l:"🔧 Maintenance",s:"pkg_continuity"},{l:"🎨 I want a template instead",s:"pkg_templates"}]
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
        bot:"The 1-Day Website is a fully custom site — built to your brand, live within 24 hours. One flat price: $200. Then $50/mo to keep it live, optimised, and secure.",
        r:[{l:"What's included?",s:"oneday_included"},{l:"I want this — let's talk",s:"talk"},{l:"See other packages",s:"pkg_menu"}]
    },
    oneday_included:{
        bot:"Your 1-Day Site includes: ✦ Full custom design (not a template) ✦ Mobile-first, fast-loading ✦ SEO + GEO + AEO optimised ✦ WhatsApp & contact integration ✦ Live in 24 hours. $200 flat. $50/mo maintenance.",
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
    setTimeout(()=>{
        addMsg("Got it! Tap below for the fastest response 👇",'bot');
        const q=document.getElementById('chat-qr'); q.innerHTML='';
        const a=document.createElement('a');
        a.href=WA+'?text='+encodeURIComponent(t);
        a.target='_blank'; a.rel='noopener';
        a.className='qrb wa'; a.innerHTML=WA_SVG+' WhatsApp Us';
        q.appendChild(a); setBack(true);
    },650);
};

if(window.location.pathname.includes('/services')){
    setTimeout(()=>{ if(!open) toggleChat(); },8000);
}
})();
