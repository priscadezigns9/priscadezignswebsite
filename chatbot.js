(function(){
const WA="https://wa.me/18683424101";
const WA_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.877L.057 23.7a.5.5 0 0 0 .613.612l5.807-1.484A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.221-1.436l-.374-.222-3.878.991.998-3.918-.243-.387A9.965 9.965 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

const PKGS={
  standard:[
    {name:"Starter",price:"$297 TTD",desc:"1-Page High-Fidelity Website · Full Brand Setup (Logo, Domain, Favicon) · Social Media Integration · Technical SEO & SSL · 1 Month Free Maintenance"},
    {name:"Growth",price:"$597 TTD",desc:"Manage 1 Brand Page · Full Branding & App/Web Architecture · Content Creation & Copywriting · Advanced SEO & Analytics · 1 Month Free Maintenance"},
    {name:"Trusted",price:"$1,200 TTD",desc:"Full Website Architecture (10-15 Pages) · Premium Brand Scaling & PR · 24/7 Priority Tech Support · Technical SEO & SSL · 1 Month Free Maintenance"},
    {name:"Custom",price:"Bespoke",desc:"Tailored Digital Architecture · Custom API & Tool Integration · Unique Brand Identity Design · Scalable Infrastructure · Priority Sovereign Support"}
  ],
  ecommerce:[
    {name:"E-Starter",price:"$497 TTD",desc:"1-Page Online Shop · Full Store Branding & Domain · Integrated Social Shop Setup · Payment Gateway Integration · 1 Month Free Maintenance"},
    {name:"E-Growth",price:"$1,497 TTD",desc:"2-5 Page Store Architecture · Full Shop Logic (10+ Products) · Deep Copywriting & Product SEO · Automated Fulfillment Sync · 1 Month Free Maintenance"},
    {name:"E-Trusted",price:"$2,500 TTD",desc:"Elite Store (50+ Products) · 15+ Page Network Architecture · Advanced Inventory & CRM Automation · On-Chain Inventory Logic · 1 Month Free Maintenance"}
  ],
  ai:[
    {name:"AI Tier 1",price:"$1,500 USD + $50/mo",desc:"AI Website Chatbot (24/7 Live) · Lead Capture & CRM Setup · AI Training & Configuration · Monthly Performance Report · 1 Month Free Maintenance"},
    {name:"AI Tier 2",price:"$3,500 USD + $150/mo",desc:"Everything in Tier 1 · Multi-Channel Automation · Advanced Workflow Automation · 1 Month Free Maintenance"},
    {name:"AI Tier 3",price:"$6,000 USD + $300/mo",desc:"Full Enterprise AI Deployment · Enterprise-Grade Infrastructure · Full Business Intelligence Automation · Direct Consultation & Support · 1 Month Free Maintenance"}
  ],
  continuity:[
    {name:"Maintenance",price:"$97/mo",desc:"Daily Uptime & Security Monitoring · Monthly Content Optimization · High-Fidelity Technical Backups · Priority Sovereign Support"}
  ],
  templates:[
    {name:"Tier 01 — Template Only",price:"$149.99 USD setup · $19.99 USD/mo",desc:"Choose any of our 24 templates · Logo & colours swapped in · Your content added · Mobile-optimised · Live in 24hrs · Hosted on your subdomain"},
    {name:"Tier 02 — Template + Copy",price:"$149.99 USD setup · $19.99 USD/mo",desc:"Everything in Tier 01 · Professional copywriting for all sections · Bio, services, CTA all written for you · Delivered in 48-72hrs"},
    {name:"Tier 03 — Template + Chatbot",price:"$249.99 USD setup · $49.99 USD/mo",desc:"Everything in Tier 01 · AI chatbot answering your business FAQs 24/7 · Hours, services, location, how to book · $49.99 one-time bot setup included"},
    {name:"Tier 04 — Micro Store",price:"$249.99 USD setup · $34.99 USD/mo",desc:"Full product store built on your chosen template · Up to 12 products uploaded with copy & images · WhatsApp order button on every product · Live in 72-96hrs"}
  ]
};

const STEPS={
  start:{
    bot:"Hey \uD83D\uDC4B What brings you here today?",
    r:[
      {l:"\uD83C\uDFA8 I want a template site",s:"pkg_templates"},
      {l:"\uD83D\uDDFA\uFE0F Browse the 22 templates",s:"microstore"},
      {l:"\uD83C\uDFC7 I need a custom website",s:"need_website"},
      {l:"\uD83D\uDCC8 I need more leads",s:"more_leads"},
      {l:"\uD83E\uDD16 I need AI automation",s:"automation"},
      {l:"\uD83D\uDCE6 See agency packages",s:"pkg_menu"}
    ]
  },
  need_website:{
    bot:"Our custom websites are built from scratch - fully tailored to your brand, SEO-optimised, and delivered fast. What do you need?",
    r:[
      {l:"\u26A1 Need it in 24hrs - $200",s:"pkg_oneday"},
      {l:"I need a full custom build",s:"pkg_standard"},
      {l:"Mine isn't converting",s:"bad_website"},
      {l:"\uD83C\uDFA8 Show me templates instead",s:"pkg_templates"}
    ]
  },
  no_website:{bot:"Every day without a website is a day your competitor gets the client that should've been yours. Here are our website packages:",r:[],pkg:"standard"},
  bad_website:{bot:"A website that doesn't convert is just an expensive business card. Here's what a full rebuild looks like:",r:[],pkg:"standard"},
  more_leads:{
    bot:"Most businesses don't have a lead problem - they have a follow-up problem. Leads come in, nobody responds fast enough, and they're gone. What's your biggest issue?",
    r:[
      {l:"No one responds fast enough",s:"slow_response"},
      {l:"Hard to tell who's serious",s:"filter_leads"},
      {l:"No system at all",s:"no_system"},
      {l:"See AI packages",s:"pkg_ai"}
    ]
  },
  slow_response:{
    bot:"78% of leads buy from the first business that responds. Our AI responds instantly - 24/7, even at 2am on a Sunday.",
    r:[{l:"How does it work?",s:"how_it_works"},{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },
  filter_leads:{
    bot:"Our lead filter qualifies every enquiry the second it lands - budget, timeline, intent. Only serious buyers reach you. The rest are nurtured automatically.",
    r:[{l:"I want this",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },
  no_system:{
    bot:"We build the whole system from scratch - AI chatbot, WhatsApp automation, lead capture, CRM setup. You walk away with a machine that works while you sleep.",
    r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },
  how_it_works:{
    bot:"We connect an AI agent to your WhatsApp, website, or email. It greets every lead, asks qualifying questions, routes serious buyers to you, and follows up automatically. Setup takes 2-4 weeks.",
    r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },
  automation:{
    bot:"We build AI systems that replace a full-time customer service rep. They respond, qualify, and follow up - all day, every day. What are you trying to automate?",
    r:[
      {l:"Customer service / enquiries",s:"how_it_works"},
      {l:"WhatsApp automation",s:"whatsapp_auto"},
      {l:"Full business automation",s:"pkg_ai"},
      {l:"Talk to someone",s:"talk"}
    ]
  },
  whatsapp_auto:{
    bot:"We integrate an AI agent directly into your WhatsApp Business. It responds to every message instantly, qualifies the lead, and alerts you only when someone is ready to pay.",
    r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },
  pkg_menu:{
    bot:"Our agency packages are full custom builds - designed, developed and delivered by Prisca Dezigns. Which fits you?",
    r:[
      {l:"\u26A1 1-Day Website - $200",s:"pkg_oneday"},
      {l:"\uD83C\uDF10 Custom Website Packages",s:"pkg_standard"},
      {l:"\uD83D\uDED2 E-Commerce Packages",s:"pkg_ecommerce"},
      {l:"\uD83E\uDD16 AI Consultancy",s:"pkg_ai"},
      {l:"\uD83D\uDD27 Maintenance",s:"pkg_continuity"},
      {l:"\uD83C\uDFA8 I want a template instead",s:"pkg_templates"}
    ]
  },
  pkg_templates:{
    bot:"24 ready-made templates. Pick a design, send your content, go live in 24 hours. From $149.99 USD setup + $19.99 USD/mo. No tech needed.",
    r:[
      {l:"\uD83D\uDDFA\uFE0F Browse all 22 templates",s:"microstore"},
      {l:"What's included?",s:"templates_included"},
      {l:"\uD83D\uDECD\uFE0F Micro Store option",s:"microstore_info"},
      {l:"\uD83E\uDD16 Template + Chatbot option",s:"templates_chatbot"},
      {l:"Do I own the template?",s:"template_ip"},
      {l:"Talk to someone",s:"talk"}
    ]
  },

  microstore:{
    bot:"23 live templates - pick your niche to find the best match:",
    r:[
      {l:"\uD83D\uDCF8 Portfolio & Creative",s:"ms_portfolio"},
      {l:"\uD83C\uDFC6 Coach & Consultant",s:"ms_coach"},
      {l:"\uD83D\uDED2 Store & E-Commerce",s:"ms_store"},
      {l:"\uD83D\uDCAA Fitness & Wellness",s:"ms_wellness"},
      {l:"\u2728 Beauty & Skincare",s:"ms_beauty"},
      {l:"\uD83D\uDE80 Tech & Startup",s:"ms_tech"},
      {l:"\uD83C\uDF0D Lifestyle & Travel",s:"ms_lifestyle"},
      {l:"\uD83D\uDCCB Show all 22",s:"ms_all"}
    ]
  },
  ms_portfolio:{
    bot:"Best for creatives who showcase their work:\n\n\u2756 Folio - Photographer | Artist | Portfolio\n\u2756 Studio - Creative Studio | Tech Brand\n\u2756 Craft - Handmade | Maker | Artisan\n\u2756 Marquee - Video | Content Creator\n\u2756 Noir - Fashion Editorial | Dark Luxury",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready - let's go",s:"talk"}]
  },
  ms_coach:{
    bot:"Best for professionals who sell their expertise:\n\n\u2756 Persona - Personal Brand | Coach | Influencer\n\u2756 Consult - Consultant | Doctor | Lawyer\n\u2756 Summit - Author | Speaker | Mentor\n\u2756 Obvious - Minimalist Personal Brand",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready - let's go",s:"talk"}]
  },
  ms_store:{
    bot:"Best for businesses selling products online:\n\n\u2756 Luxe - Luxury Fashion | Boutique Store\n\u2756 Glow - Skincare | Beauty Product Shop\n\u2756 Paws - Pet | Vet | Animal Care Store\n\u2756 Optica - Luxury Product Catalogue\n\u2756 Atelier - Jewelry | Artisan | Handcraft Store\n\u2756 Monsieur - Clothing | Apparel | Fashion Brand",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready - let's go",s:"talk"}]
  },
  ms_wellness:{
    bot:"Best for fitness pros and wellness brands:\n\n\u2756 Velocity - Fitness Coach | Trainer | Athlete\n\u2756 Momentum - Motivator | Gym | Sports Brand\n\u2756 Serene - Yoga | Meditation | Spa | Holistic\n\u2756 Aura - Holistic Health | Wellness Coach",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready - let's go",s:"talk"}]
  },
  ms_beauty:{
    bot:"Best for beauty, skincare and spa businesses:\n\n\u2756 Aura - Beauty | Skincare | Wellness Spa\n\u2756 Glow - Skincare | Beauty Product Store\n\u2756 Serene - Spa | Wellness | Holistic Brand",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready - let's go",s:"talk"}]
  },
  ms_tech:{
    bot:"Best for tech brands, SaaS and startups:\n\n\u2756 Launch - SaaS | App Launch | Startup Brand\n\u2756 Volt - Tech Builder | Developer | SaaS\n\u2756 Studio - Creative Studio | Tech Brand",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready - let's go",s:"talk"}]
  },
  ms_lifestyle:{
    bot:"Best for travel, adventure and lifestyle brands:\n\n\u2756 Horizon - Travel Photographer | Tourism\n\u2756 Obvious - Minimalist Lifestyle Brand\n\u2756 Folio - Adventure | Documentary Portfolio\n\u2756 Monsieur - Fashion Brand | Editorial Drops",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready - let's go",s:"talk"}]
  },
  ms_all:{
    bot:"All 24 templates:\n\nFolio | Persona | Studio | Consult | Craft | Launch | Velocity | Luxe | Momentum | Obvious | Marquee | Aura | Luxe II | Horizon | Serene | Volt | Summit | Noir | Glow | Paws | Optica | Atelier | Monsieur | Nexus\n\nAll templates: $149.99 USD setup · $19.99 USD/mo · Live in 24hrs · Logo + content swapped\nMicro Store upgrade: $249.99 USD setup · $34.99 USD/mo",
    r:[{l:"Browse live previews \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready - let's go",s:"talk"}]
  },
  microstore_info:{
    bot:"The Micro Store (Tier 04) turns any of our 24 templates into a full product shop:\n\n\u2756 Up to 12 products uploaded with copy & images\n\u2756 WhatsApp order button on every product\n\u2756 Mobile-optimised store layout\n\u2756 Live in 72-96 hours\n\u2756 $249.99 USD setup · $34.99 USD/mo",
    r:[
      {l:"\uD83D\uDDFA\uFE0F Pick a store template",s:"ms_store"},
      {l:"I'm ready - let's go",s:"talk"},
      {l:"\u2190 Back to templates",s:"pkg_templates"}
    ]
  },
  templates_chatbot:{
    bot:"The chatbot add-on (Tier 03) is $249.99 USD setup + $49.99 USD/mo — includes hosting, SSL, updates, and AI bot answering your business FAQs 24/7: pricing, services, hours, how to book.",
    r:[
      {l:"Add chatbot to my template",s:"talk"},
      {l:"Template only is fine",s:"microstore"},
      {l:"\u2190 Back to templates",s:"pkg_templates"}
    ]
  },
  templates_included:{
    bot:"Every template includes:\n\u2756 Logo & colours swapped in\n\u2756 Your content & photos added\n\u2756 Mobile-optimised\n\u2756 Live in 24 hours\n\u2756 $149.99 USD setup · $19.99 USD/mo hosting\n\nAdd-ons: Copywriting included in T02 | Chatbot: $249.99 setup + $49.99/mo | Micro Store: $249.99 setup + $34.99/mo",
    r:[
      {l:"\uD83D\uDDFA\uFE0F Browse templates",s:"microstore"},
      {l:"Add chatbot - $49.99",s:"templates_chatbot"},
      {l:"\uD83D\uDECD\uFE0F Micro Store option",s:"microstore_info"},
      {l:"I'm ready - let's go",s:"talk"}
    ]
  },
  pkg_oneday:{
    bot:"The 1-Day Website is a fully custom site built to your brand, live within 24 hours. One flat price: $200. Then $50/mo to keep it live, optimised, and secure.",
    r:[{l:"What's included?",s:"oneday_included"},{l:"I want this - let's talk",s:"talk"},{l:"See other packages",s:"pkg_menu"}]
  },
  oneday_included:{
    bot:"Your 1-Day Site includes:\n\u2756 Full custom design (not a template)\n\u2756 Mobile-first, fast-loading\n\u2756 SEO + GEO + AEO optimised\n\u2756 WhatsApp & contact integration\n\u2756 Live in 24 hours\n$200 flat. $50/mo maintenance.",
    r:[{l:"Let's get started",s:"talk"},{l:"See template option instead",s:"pkg_templates"},{l:"See all packages",s:"pkg_menu"}]
  },
  pkg_standard:{bot:"Here are our Standard Website Packages:",r:[],pkg:"standard"},
  pkg_ecommerce:{bot:"Here are our E-Commerce Packages:",r:[],pkg:"ecommerce"},
  pkg_ai:{bot:"Here are our AI Consultancy Packages:",r:[],pkg:"ai"},
  pkg_continuity:{bot:"Our System Continuity Package:",r:[],pkg:"continuity"},
  pkg_tpl_tiers:{bot:"Our Template Tiers:",r:[],pkg:"templates"},
  brand_scan:{bot:"Enter your domain and we'll run a real-time diagnostic on your digital identity and brand footprint.",r:[],scan:true},
  template_ip:{
    bot:"The template design - layout, code, colours, structure - is the intellectual property of Prisca Dezigns. What's yours is your content: photos, logo, business name, and text. You get a licence to use the template while your subscription is active.",
    r:[{l:"\u2190 Back to templates",s:"pkg_templates"},{l:"Talk to someone",s:"talk"}]
  },
  talk:{bot:"Tap below to start a WhatsApp conversation with us directly. We'll get back to you fast.",r:[],wa:true}
};

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
    addMsg(s.bot,'bot');
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
    c.innerHTML='<div class="cpkg-name">'+p.name+'</div><div class="cpkg-price">'+p.price+'</div><div class="cpkg-desc">'+p.desc+'</div>';
    c.onclick=function(){go('talk','I am interested in '+p.name);};
    g.appendChild(c);
  });
  m.appendChild(g);m.scrollTop=m.scrollHeight;
}

function addMsg(txt,type){
  var m=document.getElementById('chat-msgs');
  var d=document.createElement('div');d.className='cmsg '+type;
  d.textContent=txt;m.appendChild(d);m.scrollTop=m.scrollHeight;
}

window.chatSend=function(){
  var i=document.getElementById('chat-inp');
  var t=i.value.trim();if(!t)return;i.value='';
  addMsg(t,'usr');
  setTimeout(function(){
    addMsg("Got it! Tap below for the fastest response \uD83D\uDC47",'bot');
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
