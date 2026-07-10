(function(){
const WA="https://wa.me/18683424101";

const WA_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.877L.057 23.7a.5.5 0 0 0 .613.612l5.807-1.484A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.221-1.436l-.374-.222-3.878.991.998-3.918-.243-.387A9.965 9.965 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

var voiceOn=false;
window.toggleVoice=function(){
  voiceOn=!voiceOn;
  var btn=document.getElementById('chat-voice-toggle');
  if(btn){
    var svgPath=voiceOn?'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM16.5 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z':'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z';
    btn.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="'+svgPath+'"/></svg>'+(voiceOn?' VOICE ON':' VOICE OFF');
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

        // Handle url-type steps — open external link
        function handleUrlStep(step){
            if(step && step.url){
                window.open(step.url, '_blank');
            }
        }

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
                addMsg(s.bot,'bot');
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
                    s.r.forEach(r=>addQR(r.l,r.s));
                    return;
                }
                s.r.forEach(r=>addQR(r.l,r.s));
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
                c.innerHTML='<div class="cpkg-name">'+p.name+'</div><div class="cpkg-price">'+p.price+'</div><div class="cpkg-desc">'+p.desc+'</div>';
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
    </script>
    <script>
        // Auto-open package section if arriving from "Get Started Today" on services page
        (function(){
            if(localStorage.getItem('pd_open_packages') === '1'){
                localStorage.removeItem('pd_open_packages');
                window.addEventListener('load', function(){;

// ── JOKES ──
const JOKES=[
  "Why did the website go to therapy? It had too many unresolved issues. 😅",
  "My client said 'make it pop'. I added confetti. They meant the colours. We don't talk about that project. 🎊",
  "Why don't web designers go outside? Because they get too many requests. 🌐",
  "A client once told me to make the logo bigger. The logo was already the entire homepage. 🔍",
  "Why did the developer go broke? Because he used up all his cache. 💸",
  "I told my client the website needed breathing room. They asked if it had asthma. 🫁",
  "Why did the AI get promoted? It had a neural network... and excellent people skills. 🤖",
  "A client asked for a 'simple' website. Six revisions later we had an animated 3D solar system. 🪐",
  "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
  "My client wanted the site to feel 'alive'. I added a heartbeat animation. They wanted plants. 🌿"
];
var jokeIdx = Math.floor(Math.random()*JOKES.length);
function nextJoke(){
  var j=JOKES[jokeIdx%JOKES.length];
  jokeIdx++;
  return j;
}

// ── INTAKE CONVERSATION STATE ──
var intake={active:false,step:0,data:{}};
var intakeSteps=[
  {key:'name',    ask:"First — what's your name? 😊"},
  {key:'biz',     ask:function(d){return "Nice to meet you, "+d.name+"! What's your business called? (Or describe what you do if you don't have a name yet)"}},
  {key:'type',    ask:"What type of business is it? (e.g. coach, salon, restaurant, clothing brand, tech startup…)"},
  {key:'email',   ask:"What's the best email to reach you on? 📧"},
  {key:'phone',   ask:"And a phone number or WhatsApp? (optional — skip if you prefer email)"},
  {key:'website', ask:"Do you have an existing website or social media page? Drop the link here if so 🔗"},
  {key:'goal',    ask:"What's the main thing you're trying to achieve right now? More leads? A new website? Automating your customer service?"},
  {key:'pain',    ask:"What's the biggest challenge your business is facing right now? Be as specific as you like — this helps us tailor the right solution 🎯"},
  {key:'budget',  ask:"Last one — do you have a rough budget in mind? No pressure either way, it just helps me point you to the right option 🙏"}
];

function startIntake(){
  intake.active=true;
  intake.step=0;
  intake.data={};
  var q=document.getElementById('chat-qr');
  q.innerHTML='';
  // show first question after short delay
  setTimeout(function(){
    addMsg(intakeSteps[0].ask,'bot');
    showIntakeInput();
  },420);
}

function showIntakeInput(){
  var q=document.getElementById('chat-qr');
  q.innerHTML='';
  // add a skip button
  var skip=document.createElement('button');
  skip.className='qrb';
  skip.textContent='Skip — just take me to WhatsApp';
  skip.onclick=function(){ intake.active=false; finishIntake(true); };
  q.appendChild(skip);
  // focus the text input
  var inp=document.getElementById('chat-inp');
  if(inp) setTimeout(function(){ inp.focus(); },100);
}

function advanceIntake(userText){
  var currentStep=intakeSteps[intake.step];
  intake.data[currentStep.key]=userText;
  intake.step++;

  // Occasionally drop a joke between questions
  if(intake.step===2 || intake.step===4){
    setTimeout(function(){ addMsg(nextJoke(),'bot'); },300);
  }

  if(intake.step < intakeSteps.length){
    var nextQ=intakeSteps[intake.step].ask;
    if(typeof nextQ==='function') nextQ=nextQ(intake.data);
    setTimeout(function(){
      addMsg(nextQ,'bot');
      showIntakeInput();
    },intake.step===2||intake.step===4?900:500);
  } else {
    // All questions answered — build summary and WhatsApp link
    setTimeout(function(){ finishIntake(false); },500);
  }
}

function saveIntakeLead(d){
  var SB_URL='https://sazhdnqzaqpqcralmthh.supabase.co';
  var SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhemhkbnF6YXFwcWNyYWxtdGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzE5NjYsImV4cCI6MjA5Mzc0Nzk2Nn0.uTyw31uWTNOTV5-HzNpm46vpAJABAsHLMzW-sYOkRhc';
  var payload={
    name: (d.name||'—')+' | Biz: '+(d.biz||'—'),
    email: d.email||('(chatbot) '+(d.biz||'—')),
    package: (d.type||'—')+' | Goal: '+(d.goal||'—')+' | Pain: '+(d.pain||'—')+' | Budget: '+(d.budget||'—'),
    brand: 'Prisca Dezigns (Chatbot) | Phone: '+(d.phone||'—')+' | Web: '+(d.website||'—')
  };
  fetch(SB_URL+'/rest/v1/client_leads',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'apikey':SB_KEY,
      'Authorization':'Bearer '+SB_KEY,
      'Prefer':'return=minimal'
    },
    body:JSON.stringify(payload)
  }).catch(function(){});
}

function finishIntake(skipped){
  intake.active=false;
  var d=intake.data;
  var q=document.getElementById('chat-qr');
  q.innerHTML='';

  if(skipped || !d.name){
    addMsg("No worries — tap below and we'll pick up the conversation on WhatsApp 👇",'bot');
    var a=document.createElement('a');
    a.href=WA;a.target='_blank';a.rel='noopener';
    a.className='qrb wa';a.innerHTML=WA_SVG+' Chat on WhatsApp';
    q.appendChild(a);
    addQR('← Start over','start');
    return;
  }

  saveIntakeLead(d);

  var summary="Perfect, "+d.name+"! Here's what I've got:\n";
  if(d.biz)     summary+="🏢 Business: "+d.biz+"\n";
  if(d.type)    summary+="📂 Type: "+d.type+"\n";
  if(d.email)   summary+="📧 Email: "+d.email+"\n";
  if(d.phone)   summary+="📱 Phone: "+d.phone+"\n";
  if(d.website) summary+="🔗 Website: "+d.website+"\n";
  if(d.goal)    summary+="🎯 Goal: "+d.goal+"\n";
  if(d.pain)    summary+="⚠️ Challenge: "+d.pain+"\n";
  if(d.budget)  summary+="💳 Budget: "+d.budget+"\n";
  summary+="\nI'm sending this straight to the team so we can come back to you with exactly the right recommendation. 🚀";
  addMsg(summary,'bot');

  // Build WhatsApp pre-fill
  var msg="Hi! I just came from your website chatbot.\n\n";
  msg+="👤 Name: "+(d.name||'—')+"\n";
  msg+="🏢 Business: "+(d.biz||'—')+"\n";
  msg+="📂 Type: "+(d.type||'—')+"\n";
  msg+="📧 Email: "+(d.email||'—')+"\n";
  msg+="📱 Phone: "+(d.phone||'—')+"\n";
  msg+="🔗 Website: "+(d.website||'—')+"\n";
  msg+="🎯 Goal: "+(d.goal||'—')+"\n";
  msg+="⚠️ Challenge: "+(d.pain||'—')+"\n";
  msg+="💳 Budget: "+(d.budget||'—')+"\n\n";
  msg+="Looking forward to hearing from you!";

  setTimeout(function(){
    addMsg(nextJoke(),'bot');
    var a=document.createElement('a');
    a.href=WA+'?text='+encodeURIComponent(msg);
    a.target='_blank';a.rel='noopener';
    a.className='qrb wa';
    a.innerHTML=WA_SVG+' Send to WhatsApp';
    q.appendChild(a);
    addQR('← Start over','start');
  },700);

  // Rating prompt — appears after WhatsApp button
  setTimeout(function(){
    addMsg('One last thing — how was your experience with our chatbot today? 😊','bot');
    showRating(d.name);
  },1800);
}

function showRating(clientName){
  var q=document.getElementById('chat-qr');
  q.innerHTML='';
  var labels=[['⭐','Poor'],['⭐⭐','Fair'],['⭐⭐⭐','Good'],['⭐⭐⭐⭐','Great'],['⭐⭐⭐⭐⭐','Excellent']];
  labels.forEach(function(pair,i){
    var b=document.createElement('button');
    b.className='qrb';
    b.textContent=pair[0]+' '+pair[1];
    (function(score){
      b.onclick=function(){ submitRating(score,clientName); };
    })(i+1);
    q.appendChild(b);
  });
}

function submitRating(score,clientName){
  var q=document.getElementById('chat-qr');
  q.innerHTML='';
  var response=score>=4
    ? 'Thank you so much, '+clientName+'! We really appreciate that. 🙏 We\'ll be in touch soon!'
    : score===3
    ? 'Thanks for the feedback, '+clientName+'! We\'re always looking to improve. 🙏'
    : 'Thanks for being honest, '+clientName+'. We\'ll use this to do better. 🙏';
  addMsg(response,'bot');
  var SB_URL='https://sazhdnqzaqpqcralmthh.supabase.co';
  var SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhemhkbnF6YXFwcWNyYWxtdGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzE5NjYsImV4cCI6MjA5Mzc0Nzk2Nn0.uTyw31uWTNOTV5-HzNpm46vpAJABAsHLMzW-sYOkRhc';
  fetch(SB_URL+'/rest/v1/client_leads',{
    method:'POST',
    headers:{'Content-Type':'application/json','apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Prefer':'return=minimal'},
    body:JSON.stringify({
      name:(clientName||'Unknown')+' — Rating',
      email:'(rating)',
      package:score+'/5 stars',
      brand:'Prisca Dezigns (Chatbot Rating)'
    })
  }).catch(function(){});
  setTimeout(function(){ addQR('← Start over','start'); },600);
}

let open=false,started=false,hist=[];

window.toggleChat=function(){
  open=!open;
  document.getElementById('pd-chat-bubble').classList.toggle('open',open);
  document.getElementById('pd-chat-window').classList.toggle('open',open);
  if(open&&!started){started=true;setTimeout(function(){go('start',null);},380);}
};

window.chatBack=function(){
  if(!hist.length)return;
  var p=hist.pop();
  var m=document.getElementById('chat-msgs');
  var q=document.getElementById('chat-qr');
  m.innerHTML=p.m;q.innerHTML=p.q;
  m.scrollTop=m.scrollHeight;
  q.querySelectorAll('.qrb[data-s]').forEach(function(b){b.onclick=function(){go(b.dataset.s,b.textContent);};});
  setBack(p.bv);
};

function setBack(v){document.getElementById('chat-back-bar').classList.toggle('vis',v);}

function push(){
  var m=document.getElementById('chat-msgs');
  var q=document.getElementById('chat-qr');
  hist.push({m:m.innerHTML,q:q.innerHTML,bv:document.getElementById('chat-back-bar').classList.contains('vis')});
}

function go(key,userTxt){
  push();
  if(userTxt)addMsg(userTxt,'usr');
  var q=document.getElementById('chat-qr');
  q.innerHTML='';
  var s=STEPS[key]||STEPS.start;
  setTimeout(function(){
    addMsg(s.bot==='__joke__'?nextJoke():s.bot,'bot');
    setBack(hist.length>0);
    if(s.scan){
      var isHome=window.location.pathname==='/'||window.location.pathname.endsWith('index.html')||window.location.pathname==='';
      if(isHome){
        toggleChat();
        var inp=document.getElementById('domain-input');
        if(inp){inp.focus();inp.scrollIntoView({behavior:'smooth',block:'center'});}
      } else {
        addMsg("Head to our homepage to run a live Brand Scan \uD83D\uDC47",'bot');
        var a=document.createElement('a');
        a.href='https://priscadezigns.org';a.target='_blank';a.rel='noopener';
        a.className='qrb wa';a.style.textDecoration='none';
        a.innerHTML='\uD83D\uDD0D Run Brand Scan';
        q.appendChild(a);
        addQR('\u2190 Back','start');
      }
      return;
    }
    if(s.wa){
      var a=document.createElement('a');
      a.href=WA;a.target='_blank';a.rel='noopener';
      a.className='qrb wa';a.innerHTML=WA_SVG+' Chat on WhatsApp';
      q.appendChild(a);
      addQR('\u2190 All packages','pkg_menu');
      return;
    }
    if(s.intake){
      startIntake();
      return;
    }
    if(s.pkg){
      renderPkgs(PKGS[s.pkg]);
      addQR('\u2190 All packages','pkg_menu');
      addQR('Talk to someone','talk');
      return;
    }
    s.r.forEach(function(r){
      if(r.url){
        var a=document.createElement('a');
        a.href=r.url;a.target='_blank';a.rel='noopener';
        a.className='qrb';a.textContent=r.l;a.style.textDecoration='none';
        q.appendChild(a);
      } else {
        addQR(r.l,r.s);
      }
    });
  },420);
}

function addQR(label,step){
  var q=document.getElementById('chat-qr');
  var b=document.createElement('button');
  b.className='qrb';b.textContent=label;b.dataset.s=step;
  b.onclick=function(){go(step,label);};
  q.appendChild(b);
}

function renderPkgs(list){
  var m=document.getElementById('chat-msgs');
  var g=document.createElement('div');g.className='cpkg-grid';
  list.forEach(function(p){
    var c=document.createElement('div');c.className='cpkg-card';
    c.innerHTML='<div class="cpkg-name">'+p.name+'</div><div class="cpkg-desc">'+p.desc+'</div>';
    c.onclick=function(){go('talk','I am interested in '+p.name);};
    g.appendChild(c);
  });
  m.appendChild(g);m.scrollTop=m.scrollHeight;
}

function addMsg(txt,type){
  var m=document.getElementById('chat-msgs');
  if(type==='bot'){
    var dots=document.createElement('div');dots.className='cmsg typing';
    dots.innerHTML='<div class="typing-dots"><span></span><span></span><span></span></div>';
    m.appendChild(dots);m.scrollTop=m.scrollHeight;
    setTimeout(function(){
      if(dots.parentNode)dots.parentNode.removeChild(dots);
      var d=document.createElement('div');d.className='cmsg bot';
      var safe=txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      d.innerHTML=safe.replace(/\n/g,'<br>');
      m.appendChild(d);m.scrollTop=m.scrollHeight;
      if(typeof speak==='function') speak(txt);
    },600);
  } else {
    var d=document.createElement('div');d.className='cmsg usr';
    d.textContent=txt;
    m.appendChild(d);m.scrollTop=m.scrollHeight;
  }
}

window.chatSend=function(){
  var i=document.getElementById('chat-inp');
  var t=i.value.trim();if(!t)return;i.value='';
  addMsg(t,'usr');
  // If intake conversation is active, route the answer through it
  if(intake.active){
    advanceIntake(t);
    return;
  }
  // Otherwise generic fallback — forward text to WhatsApp
  setTimeout(function(){
    addMsg("Got it! Tap below and we'll pick this up on WhatsApp \uD83D\uDC47",'bot');
    var q=document.getElementById('chat-qr');q.innerHTML='';
    var a=document.createElement('a');
    a.href=WA+'?text='+encodeURIComponent(t);a.target='_blank';a.rel='noopener';
    a.className='qrb wa';a.innerHTML=WA_SVG+' WhatsApp Us';
    q.appendChild(a);setBack(true);
  },650);
};

if(window.location.pathname.includes('/services')){
  setTimeout(function(){if(!open)toggleChat();},8000);
}
})();
