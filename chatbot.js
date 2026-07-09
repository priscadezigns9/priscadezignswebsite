(function(){
const WA="https://wa.me/18683424101";
const WA_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.877L.057 23.7a.5.5 0 0 0 .613.612l5.807-1.484A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.221-1.436l-.374-.222-3.878.991.998-3.918-.243-.387A9.965 9.965 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

const PKGS={
  standard:[
    {name:"Starter",desc:"1-Page High-Fidelity Website · Full Brand Setup (Logo, Domain, Favicon) · Social Media Integration · Technical SEO & SSL · 1 Month Free Maintenance"},
    {name:"Growth",desc:"Manage 1 Brand Page · Full Branding & App/Web Lead Strategisture · Content Creation & Copywriting · Advanced SEO & Analytics · 1 Month Free Maintenance"},
    {name:"Trusted",desc:"Full Website Lead Strategisture (10-15 Pages) · Premium Brand Scaling & PR · 24/7 Priority Tech Support · Technical SEO & SSL · 1 Month Free Maintenance"},
    {name:"Custom",desc:"Tailored Digital Lead Strategisture · Custom API & Tool Integration · Unique Brand Identity Design · Scalable Infrastructure · Priority Sovereign Support"}
  ],
  ecommerce:[
    {name:"E-Starter",desc:"1-Page Online Shop · Full Store Branding & Domain · Integrated Social Shop Setup · Payment Gateway Integration · 1 Month Free Maintenance"},
    {name:"E-Growth",desc:"2-5 Page Store Lead Strategisture · Full Shop Logic (10+ Products) · Deep Copywriting & Product SEO · Automated Fulfillment Sync · 1 Month Free Maintenance"},
    {name:"E-Trusted",desc:"Elite Store (50+ Products) · 15+ Page Network Lead Strategisture · Advanced Inventory & CRM Automation · On-Chain Inventory Logic · 1 Month Free Maintenance"},
    {name:"E-Commerce Maintenance",desc:"E-Commerce Store Uptime & Security Monitoring · Monthly Product & Content Updates · High-Fidelity Technical Backups · Priority Support · $199.99/mo"}
  ],
  ai:[
    {name:"AI Tier 1",price:"$1,500 + $150/mo",desc:"AI Website Chatbot (24/7 Live) · Lead Capture & CRM Setup · [Voice Add-on available: +$500 setup +$50/mo]"},
    {name:"AI Tier 2",price:"$3,500 + $400/mo",desc:"Everything in Tier 1 · WhatsApp AI Automation (24/7) · [Voice Add-on available: +$500 setup +$50/mo]"},
    {name:"AI Tier 3",price:"$6,000 + $700/mo",desc:"Everything in Tier 1 & 2 · Email Inbox AI Automation (24/7) · AI Reads, Responds & Qualifies Every Email · 1 Month Free Maintenance"},
    {name:"AI Tier 4",price:"$8,000 + $900/mo",desc:"Everything in Tiers 1, 2 & 3 · Full Voice Agent Deployment · Answers inbound calls 24/7 · 1 Month Free Maintenance"}
  ],
  continuity:[
    {name:"Maintenance",price:"$97/mo",desc:"Daily Uptime & Security Monitoring · Monthly Content Optimization · Backups · Support"}
  ],
  templates:[
    {name:"Voice/Audio Intelligence (Add-On)",desc:"Enable your AI to listen to voice notes and respond with a professional voice. Available for Templates, Tier 1, and Tier 2. +$500 setup · +$50/mo"},
    {name:"Template Site",price:"$149.99 + $19.99/mo",desc:"Choose from 40 templates · Logo & colours swapped in · Live in 24hrs"},
    {name:"+ Copywriting Add-On",desc:"Everything in Template Site · Professional copywriting for all sections · Bio, services, CTA all written for you · Delivered in 48-72hrs"},
    {name:"+ AI Chatbot Add-On",desc:"Everything in Template Site · AI chatbot answering your business FAQs 24/7 · Hours, services, location, how to book · $349.99 setup · $49.99/mo"},
    {name:"Micro Store",desc:"Full product store built on your chosen template · Up to 12 products uploaded with copy & images · WhatsApp order button on every product · Live in 72-96hrs · $249.99 setup · $34.99/mo"},
    {name:"⭐ Premium Template (3D)",desc:"Aeon · Nexus · Stellar — cinematic 3D WebGL experiences · Fully immersive · Scroll-driven animation · $299.99 setup · $19.99/mo"}
  ]
};

const STEPS={
  start:{
    bot:"Hey \uD83D\uDC4B Welcome to Prisca Dezigns. What can I help you with today?",
    r:[
      {l:"\uD83C\uDFA8 I want a template site",s:"pkg_templates"},
      {l:"\uD83C\uDFC7 I need a custom website",s:"need_website"},
      {l:"\uD83E\uDD16 I need AI automation",s:"automation"},
      {l:"\uD83D\uDCC8 I need more leads",s:"more_leads"},
      {l:"\uD83D\uDCE6 See all packages",s:"pkg_menu"},
      {l:"\u2139\uFE0F About Prisca Dezigns",s:"about"},
      {l:"\uD83D\uDCBC Tell us about your business",s:"talk"},
      {l:"\uD83D\uDE04 Tell me a joke",s:"joke"}
    ]
  },

  joke:{
    bot:"__joke__",
    r:[
      {l:"\uD83D\uDE02 Another one",s:"joke"},
      {l:"\u2190 Back to start",s:"start"}
    ]
  },

  /* ── ABOUT BRANCH ── */
  about:{
    bot:"Prisca Dezigns is a full-service digital agency based in Trinidad & Tobago.\n\n❖ Websites — custom builds, template sites, e-commerce stores\n❖ AI & Automation — chatbots, WhatsApp automation, lead capture\n❖ Brand Lead Strategisture — logo, domain, social setup, copywriting\n\nEvery project is built to a professional standard.\nWe do it all for you — no drag-and-drop builders, no DIY.",
    r:[
      {l:"\uD83D\uDCC5 How long have you been operating?",s:"about_history"},
      {l:"\uD83C\uDFAF What do you specialise in?",s:"about_services"},
      {l:"\uD83D\uDC69\u200D\uD83D\uDCBB Who is behind it?",s:"about_founder"},
      {l:"\uD83D\uDCF1 Social media",s:"about_social"},
      {l:"\uD83C\uDF10 Our brand pages",s:"about_brands"},
      {l:"\u2764\uFE0F The Way Made Known (TWMK)",s:"about_twmk"},
      {l:"\uD83D\uDCE7 Send us an email",s:"about_email"},
      {l:"\u2190 Back to start",s:"start"}
    ]
  },
  about_history:{
    bot:"Prisca Dezigns was founded in 2023 and began full operations in 2026.\n\nWhat started as a vision grew into a full-service operation covering:\n\n❖ Websites & branding\n❖ E-commerce stores\n❖ AI-powered customer service automation\n\nServing clients across Trinidad & Tobago and the wider Caribbean — with a focus on accuracy, speed, and results.",
    r:[
      {l:"\uD83C\uDFAF What do you specialise in?",s:"about_services"},
      {l:"\uD83D\uDCF1 Social media",s:"about_social"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_founder:{
    bot:"Prisca Dezigns is led by Priscilla Narine.\n\n❖ Studied Analytical Chemistry at UWI\n❖ Discovered web design and the power of AI in business\n❖ Left the traditional path to build Prisca Dezigns\n\nHer mission: give businesses access to the same calibre of digital infrastructure that large companies use — without the agency price tag or the technical headache.",
    r:[
      {l:"\uD83D\uDCF1 Social media",s:"about_social"},
      {l:"\uD83C\uDF10 Our brand pages",s:"about_brands"},
      {l:"\u2764\uFE0F The Way Made Known",s:"about_twmk"},
      {l:"\uD83D\uDCE7 Send us an email",s:"about_email"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_services:{
    bot:"We specialise in three areas:\n\n\u2756 Website Design & Development — custom builds, template sites, e-commerce stores\n\u2756 AI & Automation — chatbots, WhatsApp automation, lead capture, CRM setup\n\u2756 Brand Lead Strategisture — logo, domain, social setup, copywriting, SEO\n\nEverything is done for you. You provide the content, we handle the rest.",
    r:[
      {l:"\uD83D\uDCE6 See all packages",s:"pkg_menu"},
      {l:"\uD83C\uDF10 Our brand pages",s:"about_brands"},
      {l:"\u2764\uFE0F The Way Made Known",s:"about_twmk"},
      {l:"\uD83D\uDCE7 Send us an email",s:"about_email"},
      {l:"Talk to someone",s:"talk"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_social:{
    bot:"Find us and follow along across all platforms \uD83D\uDC47",
    r:[
      {l:"\uD83D\uDCF8 Instagram",url:"https://www.instagram.com/priscadezigns"},
      {l:"\uD83E\uDDF5 Threads",url:"https://www.threads.net/@priscadezigns"},
      {l:"\uD83C\uDFB5 TikTok",url:"https://www.tiktok.com/@priscionai"},
      {l:"\uD83D\uDCBB Main Website",url:"https://priscadezigns.org"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_brands:{
    bot:"Prisca Dezigns operates a network of specialised brand pages. Tap any to visit \uD83D\uDC47",
    r:[
      {l:"\uD83E\uDDF5 SeamRite Designs \u00B7 NehNeh",url:"/seamritedesigns/"},
      {l:"\uD83C\uDFCE\uFE0F The Autodrome",url:"/theautodrome/"},
      {l:"\u26A1 Dreaming Anime",url:"https://dreaminganime.com"},
      {l:"\u26A1\uFE0F Evolve Mobility",url:"https://driveevolve.com"},
      {l:"\uD83D\uDCBB Main Website",url:"https://priscadezigns.org"},
      {l:"\uD83D\uDECD\uFE0F Template Shop",url:"https://priscadezigns.org/templates/"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_twmk:{
    bot:"The Way Made Known (TWMK) is the faith foundation at the heart of Prisca Dezigns.\n\n❖ A Gospel-driven NGO\n❖ Committed to evidence-based, Bible-centred proclamation\n❖ The backbone of everything we build\n\nEvery product, every project, and every dollar earned is part of a mission that goes far beyond business.",
    r:[
      {l:"\uD83C\uDF0D Visit TWMK",url:"https://thewaymadeknown.com"},
      {l:"\uD83E\uDD1D Support the mission",url:"https://www.paypal.com/paypalme/priscadezigns9"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_email:{
    bot:"Prefer email? Tap below to send us a message directly. We typically respond within 24 hours on business days. \uD83D\uDCE7",
    r:[
      {l:"\uD83D\uDCE7 Email us now",url:"mailto:hello@priscadezigns.org"},
      {l:"\uD83D\uDCAC WhatsApp instead",s:"talk"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_location:{
    bot:"We are based in San Fernando, Trinidad & Tobago.\n\n❖ Serving clients across the Caribbean and internationally\n❖ All work done remotely — no in-person meetings required\n❖ Communication via WhatsApp, email, and video call",
    r:[
      {l:"Talk to someone",s:"talk"},
      {l:"\u2190 Back",s:"about"}
    ]
  },

  /* ── WEBSITE BRANCH ── */
  need_website:{
    bot:"Our custom websites are built from scratch.\n\n❖ Fully tailored to your brand\n❖ SEO, GEO & AEO optimised\n❖ Mobile-first and fast-loading\n❖ Delivered fast\n\nWhat do you need?",
    r:[
      {l:"\u26A1 Need it in 24hrs",s:"pkg_oneday"},
      {l:"I need a full custom build",s:"pkg_standard"},
      {l:"Mine isn't converting",s:"bad_website"},
      {l:"\uD83C\uDFA8 Show me templates instead",s:"pkg_templates"}
    ]
  },
  no_website:{bot:"Every day without a website is a day your competitor gets the client that should've been yours. Here are our website packages:",r:[],pkg:"standard"},
  bad_website:{bot:"A website that doesn't convert is just an expensive business card. Here's what a full rebuild looks like:",r:[],pkg:"standard"},

  /* ── LEADS BRANCH ── */
  more_leads:{
    bot:"Most businesses don't have a lead problem — they have a follow-up problem. Leads come in, nobody responds fast enough, and they're gone. What's your biggest issue?",
    r:[
      {l:"No one responds fast enough",s:"slow_response"},
      {l:"Hard to tell who's serious",s:"filter_leads"},
      {l:"No system at all",s:"no_system"},
      {l:"See AI packages",s:"pkg_ai"}
    ]
  },
  slow_response:{
    bot:"78% of leads buy from the first business that responds.\n\n❖ Our AI responds instantly — 24/7\n❖ Even at 2am on a Sunday\n❖ No missed messages, no missed sales",
    r:[{l:"How does it work?",s:"how_it_works"},{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },
  filter_leads:{
    bot:"Our lead filter qualifies every enquiry the second it lands.\n\n❖ Checks budget, timeline & intent\n❖ Only serious buyers reach you\n❖ The rest are nurtured automatically",
    r:[{l:"I want this",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },
  no_system:{
    bot:"We build the whole system from scratch.\n\n❖ AI chatbot\n❖ WhatsApp automation\n❖ Lead capture\n❖ CRM setup\n\nYou walk away with a machine that works while you sleep.",
    r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },
  how_it_works:{
    bot:"We connect an AI agent to your WhatsApp, website, or email.\n\n❖ Greets every lead instantly\n❖ Asks qualifying questions\n❖ Routes serious buyers directly to you\n❖ Follows up automatically\n❖ Setup takes 2–4 weeks",
    r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },

  /* ── AUTOMATION BRANCH ── */
  automation:{
    bot:"We build AI systems that replace a full-time customer service rep.\n\n❖ Respond to every enquiry instantly\n❖ Qualify leads automatically\n❖ Follow up all day, every day — even at 2am\n\nWhat are you trying to automate?",
    r:[
      {l:"Customer service / enquiries",s:"how_it_works"},
      {l:"WhatsApp automation",s:"whatsapp_auto"},
      {l:"Full business automation",s:"pkg_ai"},
      {l:"Talk to someone",s:"talk"}
    ]
  },
  whatsapp_auto:{
    bot:"We integrate an AI agent directly into your WhatsApp Business.\n\n❖ Responds to every message instantly\n❖ Qualifies the lead with smart questions\n❖ Alerts you only when someone is ready to pay\n❖ Works 24/7 — no staff needed",
    r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },

  /* ── PACKAGES MENU ── */
  pkg_menu:{
    bot:"Our full service range — from template sites to enterprise AI. What fits your stage?",
    r:[
      {l:"\u26A1 1-Day Website",s:"pkg_oneday"},
      {l:"\uD83C\uDFA8 Template Sites",s:"pkg_templates"},
      {l:"\uD83C\uDF10 Custom Website Packages",s:"pkg_standard"},
      {l:"\uD83D\uDED2 E-Commerce Packages",s:"pkg_ecommerce"},
      {l:"\uD83E\uDD16 AI Consultancy",s:"pkg_ai"},
      {l:"\uD83D\uDD27 Maintenance",s:"pkg_continuity"},
      {l:"\u2139\uFE0F About Prisca Dezigns",s:"about"}
    ]
  },

  /* ── TEMPLATE BRANCH ── */
  pkg_templates:{
    bot:"40 ready-made templates. Pick a design, send your content, go live in 24 hours. No tech needed.",
    r:[
      {l:"\uD83D\uDDFA\uFE0F Browse all templates",s:"microstore"},
      {l:"What's included?",s:"templates_included"},
      {l:"\uD83D\uDECD\uFE0F Micro Store option",s:"microstore_info"},
      {l:"\uD83E\uDD16 Template + Chatbot option",s:"templates_chatbot"},
      {l:"Do I own the template?",s:"template_ip"},
      {l:"Talk to someone",s:"talk"}
    ]
  },
  microstore:{
    bot:"40 live templates — pick your niche to find the best match:",
    r:[
      {l:"\uD83D\uDCF8 Portfolio & Creative",s:"ms_portfolio"},
      {l:"\uD83C\uDFC6 Coach & Consultant",s:"ms_coach"},
      {l:"\uD83D\uDED2 Store & E-Commerce",s:"ms_store"},
      {l:"\uD83D\uDCAA Fitness & Wellness",s:"ms_wellness"},
      {l:"\u2728 Beauty & Skincare",s:"ms_beauty"},
      {l:"\uD83D\uDE80 Tech & Startup",s:"ms_tech"},
      {l:"\uD83C\uDF0D Lifestyle & Travel",s:"ms_lifestyle"},
      {l:"\uD83D\uDCCB Show all 24",s:"ms_all"}
    ]
  },
  ms_portfolio:{
    bot:"Best for creatives who showcase their work:\n\n\u2756 Folio — Photographer | Artist | Portfolio\n\u2756 Folio II — Minimal 3-Column Portfolio\n\u2756 Studio — Creative Studio | Tech Brand\n\u2756 Craft — Handmade | Maker | Artisan\n\u2756 Marquee — Video | Content Creator\n\u2756 Noir — Fashion Editorial | Dark Luxury",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  ms_coach:{
    bot:"Best for professionals who sell their expertise:\n\n\u2756 Persona — Personal Brand | Coach | Influencer\n\u2756 Consult — Consultant | Doctor | Lawyer\n\u2756 Summit — Author | Speaker | Mentor\n\u2756 Obvious — Minimalist Personal Brand",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  ms_store:{
    bot:"Best for businesses selling products online:\n\n\u2756 Luxe — Luxury Fashion | Boutique Store\n\u2756 Glow — Skincare | Beauty Product Shop\n\u2756 Paws — Pet | Vet | Animal Care Store\n\u2756 Optica — Luxury Product Catalogue\n\u2756 Atelier — Jewelry | Artisan | Handcraft Store\n\u2756 Monsieur — Clothing | Apparel | Fashion Brand",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  ms_wellness:{
    bot:"Best for fitness pros and wellness brands:\n\n\u2756 Velocity — Fitness Coach | Trainer | Athlete\n\u2756 Momentum — Motivator | Gym | Sports Brand\n\u2756 Serene — Yoga | Meditation | Spa | Holistic\n\u2756 Aura — Holistic Health | Wellness Coach",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  ms_beauty:{
    bot:"Best for beauty, skincare and spa businesses:\n\n\u2756 Aura — Beauty | Skincare | Wellness Spa\n\u2756 Glow — Skincare | Beauty Product Store\n\u2756 Serene — Spa | Wellness | Holistic Brand",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  ms_tech:{
    bot:"Best for tech brands, SaaS and startups:\n\n\u2756 Launch — SaaS | App Launch | Startup Brand\n\u2756 Volt — Tech Builder | Developer | SaaS\n\u2756 Studio — Creative Studio | Tech Brand",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  ms_lifestyle:{
    bot:"Best for travel, adventure and lifestyle brands:\n\n\u2756 Horizon — Travel Photographer | Tourism\n\u2756 Obvious — Minimalist Lifestyle Brand\n\u2756 Folio — Adventure | Documentary Portfolio\n\u2756 Monsieur — Fashion Brand | Editorial Drops",
    r:[{l:"Open Template Shop \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  ms_all:{
    bot:"All 40 templates:\n\nFolio | Folio II | Persona | Studio | Consult | Craft | Launch | Velocity | Luxe | Momentum | Obvious | Marquee | Aura | Luxe II | Horizon | Serene | Volt | Summit | Noir | Glow | Paws | Optica | Atelier | Monsieur\n\nStandard — $149.99 setup · $19.99/mo\n⭐ Premium 3D (Aeon, Nexus, Stellar) — $299.99 setup · $19.99/mo\nAll live in 24hrs · Logo + content swapped in",
    r:[{l:"Browse live previews \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  microstore_info:{
    bot:"The Micro Store turns any of our 40 templates into a full product shop:\n\n\u2756 Up to 12 products uploaded with copy & images\n\u2756 WhatsApp order button on every product\n\u2756 Mobile-optimised store layout\n\u2756 Live in 72-96 hours\n\u2756 $249.99 setup · $34.99/mo",
    r:[
      {l:"\uD83D\uDDFA\uFE0F Pick a store template",s:"ms_store"},
      {l:"I'm ready — let's go",s:"talk"},
      {l:"\u2190 Back to templates",s:"pkg_templates"}
    ]
  },
  templates_chatbot:{
    bot:"The AI Chatbot add-on plugs a live AI agent into your template site. It answers your business FAQs 24/7 — services, pricing, hours, how to book — and captures leads while you sleep.\n\n❖ $349.99 one-time setup\n❖ $49.99/mo ongoing\n\nAdds on top of your template site fee.",
    r:[
      {l:"Add chatbot to my template",s:"talk"},
      {l:"Template only is fine",s:"microstore"},
      {l:"\u2190 Back to templates",s:"pkg_templates"}
    ]
  },
  templates_included:{
    bot:"Every template includes:\n\u2756 Logo & colours swapped in\n\u2756 Your content & photos added\n\u2756 Mobile-optimised\n\u2756 Live in 24 hours\n\u2756 Hosted on your subdomain\n\nPricing:\n❖ Standard templates — $149.99 setup · $19.99/mo\n❖ Premium 3D templates (Aeon, Nexus, Stellar) — $299.99 setup · $19.99/mo\n\nAdd-ons:\n❖ Copywriting — $49.99 one-time\n❖ AI Chatbot — $349.99 setup · $49.99/mo\n❖ Micro Store — $249.99 setup · $34.99/mo",
    r:[
      {l:"\uD83D\uDDFA\uFE0F Browse templates",s:"microstore"},
      {l:"Add chatbot",s:"templates_chatbot"},
      {l:"\uD83D\uDECD\uFE0F Micro Store option",s:"microstore_info"},
      {l:"I'm ready — let's go",s:"talk"}
    ]
  },
  template_ip:{
    bot:"Here's how ownership works:\n\n❖ Design, layout, code & structure — owned by Prisca Dezigns\n❖ Your content (photos, logo, text, business name) — yours completely\n❖ You receive a licence to use your customised version\n❖ Licence remains active while your subscription is active",
    r:[{l:"\u2190 Back to templates",s:"pkg_templates"},{l:"Talk to someone",s:"talk"}]
  },

  /* ── PACKAGE STEPS ── */
  pkg_oneday:{
    bot:"The 1-Day Website is a fully custom site built to your brand and live within 24 hours. One flat fee. Hosting included after.",
    r:[{l:"What's included?",s:"oneday_included"},{l:"I want this — let's talk",s:"talk"},{l:"See other packages",s:"pkg_menu"}]
  },
  oneday_included:{
    bot:"Your 1-Day Site includes:\n\n\u2756 Full custom design (not a template)\n\u2756 Mobile-first, fast-loading\n\u2756 SEO, GEO & AEO optimised\n\u2756 WhatsApp & contact integration\n\u2756 Live in 24 hours\n\nOne flat fee. Maintenance included after.",
    r:[{l:"Let's get started",s:"talk"},{l:"See template option instead",s:"pkg_templates"},{l:"See all packages",s:"pkg_menu"}]
  },
  pkg_standard:{bot:"Here are our Standard Website Packages:",r:[],pkg:"standard"},
  pkg_ecommerce:{bot:"Here are our E-Commerce Packages:",r:[],pkg:"ecommerce"},
  pkg_ai:{bot:"Here are our AI Consultancy Packages:",r:[],pkg:"ai"},
  pkg_continuity:{bot:"Our System Continuity Package keeps your site fast, secure, and up to date:",r:[],pkg:"continuity"},
  pkg_tpl_tiers:{bot:"Our Template Tiers:",r:[],pkg:"templates"},

  brand_scan:{
    bot:"Enter your domain and we'll run a real-time diagnostic on your digital identity and brand footprint.",
    r:[],scan:true
  },

  /* ── TALK / CONTACT ── */
  talk:{
    bot:"Let's make sure you get the right recommendation. I'll ask you a few quick questions about your business — won't take long! 😄",
    r:[],intake:true
  },

  /* ── FAQ / MISC ── */
  faq_turnaround:{
    bot:"Here are our delivery timelines:\n\n❖ Template sites — live in 24 hours\n❖ Custom websites — 3–7 business days\n❖ E-commerce stores — 3–5 business days\n❖ AI automation systems — 2–4 weeks\n\nAll timelines start from when you send your content.",
    r:[{l:"See packages",s:"pkg_menu"},{l:"Talk to someone",s:"talk"},{l:"\u2190 Start over",s:"start"}]
  },
  faq_payment:{
    bot:"We accept the following payment methods:\n\n❖ PayPal\n❖ Bank transfer\n\nFor template orders — pay directly through our template shop.\nFor custom projects — we send a quote via WhatsApp first.",
    r:[{l:"Open template shop",url:"https://priscadezigns.org/templates/"},{l:"Talk to someone",s:"talk"},{l:"\u2190 Start over",s:"start"}]
  },
  faq_hosting:{
    bot:"Yes — all our sites are hosted by us.\n\n❖ Template sites: hosted on yourbrand.priscadezigns.org\n❖ Or your own custom domain\n❖ Hosting included in the monthly fee\n❖ No technical setup required on your end",
    r:[{l:"See packages",s:"pkg_menu"},{l:"Talk to someone",s:"talk"},{l:"\u2190 Start over",s:"start"}]
  }
};

// ── JOKES ──
const JOKES=[
  "Why did the website go to therapy? It had too many unresolved issues. 😅",
  "My client said 'make it pop'. I added confetti. They meant the colours. We don't talk about that project. 🎊",
  "Why don't web designers go outside? Because they get too many requests. 🌐",
  "A client once told me to make the logo bigger. The logo was already the entire homepage. 🔍",
  "Why did the developer go broke? Because he used up all his cache. 💸",
  "I told my client the website needed breathing room. They asked if it had asthma. 🫁",
  "Why did the AI get promoted? It had a automated network... and excellent people skills. 🤖",
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

// ── Voice readout ──────────────────────────────────────────────────────────
var voiceOn=false;
window.toggleVoice=function(){
  voiceOn=!voiceOn;
  var btn=document.getElementById('chat-voice-toggle');
  if(btn){
    btn.textContent='';
    var icon=document.createElementNS('http://www.w3.org/2000/svg','svg');
    icon.setAttribute('width','12');icon.setAttribute('height','12');
    icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('fill','currentColor');
    var path=document.createElementNS('http://www.w3.org/2000/svg','path');
    if(voiceOn){
      path.setAttribute('d','M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM16.5 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z');
    } else {
      path.setAttribute('d','M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z');
    }
    icon.appendChild(path);
    btn.appendChild(icon);
    var txt=document.createTextNode(voiceOn?' VOICE ON':' VOICE OFF');
    btn.appendChild(txt);
    btn.classList.toggle('voice-on',voiceOn);
  }
  if(!voiceOn && window.speechSynthesis){window.speechSynthesis.cancel();}
};
function speak(txt){
  if(!voiceOn||!window.speechSynthesis)return;

  // 1. Strip HTML tags
  var clean = txt.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');

  // 2. Convert bullet/symbol lines into natural spoken pauses
  //    Each bullet point becomes: ". " (period + space) so TTS pauses fully
  clean = clean
    // Unicode bullet symbols followed by text → ". " prefix for a full pause
    .replace(/[\u2756\u2714\u2756\u2022\u25CF\u25A0\u2B50\u26A1\u2734\u2735\u10102\uD83D\uDECD\uFE0F❖•·▸▷◆◇★☆✦✸✔]/g, '.\n')
    // Em dash / long dash used as separator → pause
    .replace(/\s*[—–]\s*/g, '. ')
    // Pipe separator → pause
    .replace(/\s*\|\s*/g, ', ')
    // Newline followed by more text → ". " (period ensures TTS pause)
    .replace(/\n+/g, '. ')
    // Avoid double periods
    .replace(/\.{2,}/g, '.')
    .replace(/\.\s*\./g, '.')
    // Collapse excess spaces
    .replace(/\s{2,}/g, ' ')
    // Strip any remaining non-ASCII (emoji etc.)
    .replace(/[^\x00-\x7F]/g, '')
    .trim();

  // 3. If sentence doesn't end with punctuation, add a period
  if(clean && !/[.!?]$/.test(clean)) clean += '.';

  var u = new SpeechSynthesisUtterance(clean);
  u.rate = 0.88; u.pitch = 1.0; u.volume = 1;

  // 4. Pick the most natural-sounding voice available
  var voices = window.speechSynthesis.getVoices();
  var preferred = ['Google UK English Female','Google US English','Samantha','Karen','Moira','Tessa','Fiona','Victoria','Veena','Microsoft Zira','Microsoft Aria'];
  var picked = null;
  for(var i=0;i<preferred.length;i++){
    for(var j=0;j<voices.length;j++){
      if(voices[j].name===preferred[i]){picked=voices[j];break;}
    }
    if(picked)break;
  }
  if(!picked){
    for(var j=0;j<voices.length;j++){
      if(voices[j].lang&&voices[j].lang.startsWith('en')){picked=voices[j];break;}
    }
  }
  if(picked) u.voice = picked;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

// ── Typing dots then message ────────────────────────────────────────────────
function addMsg(txt,type,elemId){
  var m=document.getElementById('chat-msgs');
  if(type==='bot'){
    // Show typing dots first
    var dots=document.createElement('div');
    dots.className='cmsg typing';
    dots.innerHTML='<div class="typing-dots"><span></span><span></span><span></span></div>';
    if(elemId) dots.id=elemId;
    m.appendChild(dots);m.scrollTop=m.scrollHeight;
    if(txt==='...') return; // AI brain will replace this element directly
    setTimeout(function(){
      if(dots.parentNode)dots.parentNode.removeChild(dots);
      var d=document.createElement('div');d.className='cmsg bot';
      if(elemId) d.id=elemId+'-done';
      var safe=txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      d.innerHTML=safe.replace(/\n/g,'<br>');
      m.appendChild(d);m.scrollTop=m.scrollHeight;
      speak(txt);
    },480);
  } else {
    var d=document.createElement('div');d.className='cmsg usr';
    d.textContent=txt;
    m.appendChild(d);m.scrollTop=m.scrollHeight;
  }
}

function replaceTypingWithReply(elemId, txt) {
  var m = document.getElementById('chat-msgs');
  var dots = document.getElementById(elemId);
  if(dots && dots.parentNode) dots.parentNode.removeChild(dots);
  var d = document.createElement('div'); d.className = 'cmsg bot';
  var safe = txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  d.innerHTML = safe.replace(/\n/g,'<br>');
  m.appendChild(d); m.scrollTop = m.scrollHeight;
  speak(txt);
}

// ── CONVERSATIONAL AI ENGINE ──────────────────────────────────────────────
// Stateful conversation: remembers context, asks follow-ups, qualifies lead

var conv = {
  state: 'idle',      // idle | asked_goal | asked_budget | asked_name | asked_business | asked_type | closing
  name: null,
  business: null,
  goal: null,
  budget: null,
  msgCount: 0
};

// Detect intent from raw input
function detectIntent(t){
  var s = t.toLowerCase();
  if(/price|cost|how much|fee|charge|rate|pricing/.test(s)) return 'price';
  if(/template|shop|ready.made|quick site|fast site/.test(s)) return 'template';
  if(/whatsapp|automation|automate|chatbot|bot|ai agent|auto.reply|respond automatically/.test(s)) return 'automation';
  if(/website|web site|site|build|create|design|page|landing/.test(s)) return 'website';
  if(/social|instagram|facebook|tiktok|branding|brand|logo/.test(s)) return 'branding';
  if(/ecommerce|e-commerce|online store|sell online|products|shop online/.test(s)) return 'ecommerce';
  if(/seo|google|rank|traffic|search engine/.test(s)) return 'seo';
  if(/how long|turnaround|deadline|how fast|when will/.test(s)) return 'timeline';
  if(/maintenance|support|monthly|retainer|after/.test(s)) return 'maintenance';
  if(/email|inbox|email automation/.test(s)) return 'email';
  if(/voice|phone|call|voice agent/.test(s)) return 'voice';
  if(/location|where are you|trinidad|tobago|caribbean/.test(s)) return 'location';
  if(/portfolio|example|your work|demo|past work|show me/.test(s)) return 'portfolio';
  if(/who are you|about you|about prisca|tell me about/.test(s)) return 'about';
  if(/hello|\bhi\b|\bhey\b|good morning|good afternoon|good evening|greetings/.test(s)) return 'greet';
  if(/thank|thanks|appreciate|great|awesome|perfect|nice one/.test(s)) return 'thanks';
  if(/\byes\b|yeah|yep|\bsure\b|\bok\b|okay|sounds good|let.s go|go ahead|please/.test(s)) return 'yes';
  if(/no |nope|not really|not right now|maybe later/.test(s)) return 'no';
  if(/\$|budget|afford|spend|invest|how much can/.test(s)) return 'budget_mention';
  if(/weather|food|movie|sport|football|joke|random|funny/.test(s)) return 'offtopic';
  return 'unknown';
}

// Friendly follow-up question based on what we already know
function nextFollowUp(){
  if(!conv.name)
    return {r:"I\u2019d love to help with that \u2014 what\u2019s your name?", state:'asked_name'};
  if(!conv.business)
    return {r:"Nice to meet you, "+conv.name+"! What kind of business do you run?", state:'asked_business'};
  if(!conv.goal)
    return {r:"Got it. And what\u2019s the main thing you\u2019re trying to fix right now \u2014 more leads, a better online presence, or automating your customer service?", state:'asked_goal'};
  if(!conv.budget)
    return {r:"Last thing \u2014 do you have a rough budget in mind? Doesn\u2019t have to be exact. Just helps me point you in the right direction.", state:'asked_budget'};
  // All info collected — push to consultation
  return {r:"Perfect. Based on what you\u2019ve told me, I\u2019d recommend a quick consultation so the team can put together the right package for "+conv.business+". Want me to set that up?", state:'closing', follow:'talk'};
}

function handleConvState(t, intent){
  var s = t.toLowerCase();

  // Collect name
  if(conv.state === 'asked_name'){
    // Extract a clean name from the input
    var cleaned = t.replace(/^(i.?m|my name is|call me|it.?s|i am)\s*/i,'').trim();
    conv.name = cleaned.split(' ')[0];
    conv.name = conv.name.charAt(0).toUpperCase() + conv.name.slice(1);
    conv.state = 'idle';
    return nextFollowUp();
  }

  // Collect business type
  if(conv.state === 'asked_business'){
    conv.business = t.trim();
    conv.state = 'idle';
    return nextFollowUp();
  }

  // Collect goal
  if(conv.state === 'asked_goal'){
    conv.goal = t.trim();
    conv.state = 'idle';
    return nextFollowUp();
  }

  // Collect budget
  if(conv.state === 'asked_budget'){
    conv.budget = t.trim();
    conv.state = 'idle';
    return nextFollowUp();
  }

  // Closing — user said yes to consultation
  if(conv.state === 'closing' && (intent === 'yes' || /consult|book|set|schedule|talk/.test(s))){
    conv.state = 'idle';
    return {r:"Great! The team will reach out within a few hours. You can also message directly on WhatsApp for the fastest response.", follow:'talk'};
  }

  return null; // Not in a conv state — route to intent handler
}

function handleIntent(t, intent){
  var name = conv.name ? conv.name : null;
  var greet = name ? ("Hey "+name+"! ") : "";

  switch(intent){

    case 'greet':
      if(conv.msgCount === 0)
        return {r:"Hey! Welcome to Prisca Dezigns \u2014 we build websites, AI automation, and digital brands for businesses ready to grow. What can I help you with?", state:'asked_name'};
      return nextFollowUp();

    case 'website':
      return {r:greet+"We build everything from single-page sites to 15+ page brand networks \u2014 high-fidelity, mobile-first, no templates unless you want one.\n\nWhat kind of business is the site for?", state:'asked_business'};

    case 'template':
      return {r:greet+"Our Template Shop has 40+ designs across every industry. You pick one, we swap your branding and content, and it\u2019s live in 24 hours.\n\n\u2756 Standard — $149.99 setup + $19.99/mo\n\u2756 Premium 3D (Aeon, Nexus, Stellar) — $299.99 setup + $19.99/mo\n\nAdd-ons you can stack on:\n\u2713 Professional Copywriting — $49.99 one-time\n\u2713 AI Chatbot — $349.99 setup + $49.99/mo\n\u2713 Micro Store — $249.99 setup + $34.99/mo\n\nWhat industry is your business in?", state:'asked_business'};

    case 'automation':
      return {r:greet+"Our AI automation connects your WhatsApp, email, or phone to a 24/7 AI that responds, qualifies leads, and alerts you only when someone is ready to pay.\n\nWe have 4 tiers:\n\u2756 Tier 1 \u2014 Website chatbot ($1,500 setup · $150/mo)\n\u2756 Tier 2 \u2014 +WhatsApp AI ($3,500 setup · $400/mo)\n\u2756 Tier 3 \u2014 +Email AI ($6,000 setup · $700/mo)\n\u2756 Tier 4 \u2014 +Voice Agent ($8,000 setup)\n\nWhich sounds closest to what you need?"};

    case 'branding':
      return {r:greet+"Branding is baked into every package \u2014 logo, colour system, domain, social setup. We don\u2019t just build sites, we design the full brand.\n\nAre you starting from scratch or refreshing an existing brand?"};

    case 'ecommerce':
      return {r:greet+"We build full e-commerce stores with payment gateways, product SEO, and inventory logic. From 10-product shops to 50+ product networks.\n\nHow many products are you planning to sell?"};

    case 'price':
      return {r:greet+"Here\u2019s the full breakdown:\n\n\u276e WEBSITES\n\u2756 Starter \u2014 $297 (1-page, full brand setup)\n\u2756 Growth \u2014 $597 (branding, copywriting, SEO)\n\u2756 Trusted \u2014 $1,200 (10-15 pages, full automation)\n\u2756 Custom \u2014 Bespoke\n\n\u276e E-COMMERCE\n\u2756 E-Starter \u2014 $497 \u00b7 E-Growth \u2014 $1,497 \u00b7 E-Trusted \u2014 $2,500\n\n\u276e TEMPLATES (live in 24hrs)\n\u2756 Standard \u2014 $149.99 setup + $19.99/mo\n\u2756 Premium 3D \u2014 $299.99 setup + $19.99/mo\n\u2756 Add-ons: Copywriting $49.99 \u00b7 Chatbot $349.99 setup \u00b7 Micro Store $249.99 setup\n\n\u276e AI AUTOMATION\n\u2756 Tier 1 (Chatbot) \u2014 $1,500 + $150/mo\n\u2756 Tier 2 (+WhatsApp) \u2014 $3,500 + $400/mo\n\u2756 Tier 3 (+Email) \u2014 $6,000 + $700/mo\n\u2756 Tier 4 (Voice) \u2014 $8,000 + $900/mo\n\n\u276e MAINTENANCE\n\u2756 Standard \u2014 $97/mo \u00b7 E-Commerce \u2014 $199.99/mo\n\nWhat kind of business are you running? I\u2019ll point you to the right fit."+(conv.business?'':" (helps me narrow it down)")};

    case 'timeline':
      return {r:greet+"Template sites: live in 24 hours. Custom websites: 3\u20137 days. AI automation setups: 5\u201310 days including training and testing. Every project comes with 30-day support after launch."};

    case 'maintenance':
      return {r:greet+"Every package includes 1 month free maintenance. After that, our Maintenance Plan covers daily uptime monitoring, monthly content updates, technical backups, and priority support at a flat monthly rate.\n\nWant me to share the pricing?"};

    case 'seo':
      return {r:greet+"Technical SEO is built into every project \u2014 meta tags, schema markup, sitemap, mobile speed optimisation. Our Growth and Trusted packages also include monthly content SEO.\n\nAre you trying to rank for a specific niche?"};

    case 'email':
      return {r:greet+"Email automation is part of our Tier 3 package \u2014 the AI reads every email, responds intelligently, qualifies leads, and sends follow-up sequences. Zero manual inbox checking.\n\nHow many emails does your business get per day roughly?"};

    case 'voice':
      return {r:greet+"Our Tier 4 Voice Agent answers inbound calls 24/7, gives pricing and service info, and routes hot leads directly to your team. No more missed calls, no more manual phone handling.\n\nThis is perfect for businesses that get a lot of inbound calls \u2014 is that the case for you?"};

    case 'location':
      return {r:"We\u2019re based in Trinidad & Tobago and work with clients across the Caribbean and internationally. Fully remote, 100% online. No physical meeting needed to get started."};

    case 'portfolio':
      return {r:greet+"You\u2019re looking at it \u2014 this site is a live example of our work. Our Template Shop also has 40+ live previews you can click through.\n\nWant me to point you to a template that matches your industry?"};

    case 'about':
      return {r:"Prisca Dezigns is a digital agency founded by Priscilla Narine, based in Trinidad & Tobago. We specialise in high-fidelity websites, AI automation, and high-fidelity branding \u2014 built to professional standard, no DIY builders.\n\nWhat can I help you with today?"};

    case 'thanks':
      return {r:(name?"Anytime, "+name+"!":"Anytime!") + " If you ever want to move forward or have more questions, I\u2019m right here. The team is also on WhatsApp if you prefer.", follow:'talk'};

    case 'yes':
      if(conv.state === 'closing')
        return {r:"The team will be in touch within a few hours. You can also reach us directly on WhatsApp for the fastest response.", follow:'talk'};
      return nextFollowUp();

    case 'no':
      return {r:"No worries! Feel free to browse around or come back when the time is right. I\u2019m here if you have any questions."};

    case 'budget_mention':
      conv.budget = t;
      return nextFollowUp();

    case 'offtopic':
      return {r:"Ha \u2014 I like the energy! I\u2019m locked in on websites and AI automation though \ud83d\ude04. What does your business actually need right now?"};

    default:
      // Unknown — ask a clarifying question naturally
      if(!conv.name) return {r:"Interesting! I\u2019m here to help with websites, AI automation, and branding. What\u2019s your name, by the way?", state:'asked_name'};
      if(!conv.business) return {r:"I\u2019d love to help with that, "+conv.name+". What kind of business do you run?", state:'asked_business'};
      return {r:"Got it! To make sure I point you in the right direction \u2014 are you looking for a website, AI automation, or something else?", follow:'start'};
  }
}

// ── AI BRAIN (Groq Llama 3.3 via Supabase) ──────────────────
var AI_PROXY = "https://sazhdnqzaqpqcralmthh.supabase.co/functions/v1/chat-proxy";
var AI_SYSTEM = "You are the AI assistant for Prisca Dezigns, a premium web design and AI automation agency in Trinidad & Tobago. Your job is to qualify leads, answer questions, and guide visitors toward booking a consultation.\n\nSTANDARD BRAND PACKAGES (one-time setup):\n- Starter: $297 — 1-page website, full brand setup (logo, domain, favicon), social media integration, technical SEO & SSL, 1 month free maintenance\n- Growth: $597 — 1 brand page management, full branding & app/web designure, content creation & copywriting, advanced SEO & analytics, 1 month free maintenance\n- Trusted: $1,200 — full business automation, 10-15 pages of high-fidelity content, premium brand scaling & PR logic, 24/7 priority tech support, 1 month free maintenance\n- Custom: Bespoke pricing — tailored digital designure, custom API & tool integration, unique brand identity, scalable infrastructure\n\nE-COMMERCE PACKAGES (one-time setup):\n- E-Starter: $497 — 1-page online shop, store branding & domain, integrated social shop, payment gateway, 1 month free maintenance\n- E-Growth: $1,497 — 2-5 page store, 10+ products, deep copywriting & product SEO, automated fulfillment sync, 1 month free maintenance\n- E-Trusted: $2,500 — elite store (50+ products), 15+ page network designure, advanced inventory & CRM automation, on-chain inventory logic, 1 month free maintenance\n\nTEMPLATE SHOP:\n- Standard template: $149.99 setup + $19.99/mo (live in 24hrs, branding + content swapped in)\n- Premium 3D template (Aeon, Nexus, Stellar): $299.99 setup + $19.99/mo\n- Add-ons you can stack on any template:\n  + Professional Copywriting: $49.99 one-time\n  + AI Chatbot: $349.99 setup + $49.99/mo (24/7 automated replies)\n  + Voice/Audio Intelligence: +$500 setup + $50/mo (Bot can listen to voice notes and reply with voice)\n  + Micro Store: $249.99 setup + $34.99/mo (sell products online)\n\nAI AUTOMATION PACKAGES:\n- Tier 1 — Website AI Chatbot: $1,500 setup + $150/mo (website chatbot, lead notifications, mobile-ready) [Voice Add-on available: +$500 setup + $50/mo]\n- Tier 2 — + WhatsApp AI: $3,500 setup + $400/mo (everything in Tier 1 + WhatsApp 24/7 automation) [Voice Add-on available: +$500 setup + $50/mo]\n- Tier 3 — + Email AI: $6,000 setup + $700/mo (everything in Tier 2 + full email inbox automation)\n- Tier 4 — Voice Agent: $8,000 setup + $900/mo (everything in Tier 3 + AI voice agent answers all inbound calls 24/7)\n\nMAINTENANCE PLANS (monthly):\n- Standard Maintenance: $97/mo (uptime monitoring, monthly content updates, technical backups, priority support)\n- E-Commerce Maintenance: $199.99/mo (store uptime, monthly product & content updates, payment gateway monitoring, priority support)\n\nRULES:\n- Warm, concise, conversational — 2-4 sentences max per reply\n- Always end with a follow-up question to qualify the lead\n- Never make up prices not listed above\n- If asked about something outside your knowledge, offer to connect them via WhatsApp: +1 (868) 342-4101\n- Never sound robotic — speak like a real, intelligent person\n- If they seem ready to buy, give them the WhatsApp link: https://wa.me/18683424101";
var aiHistory = [];

function callAIBrain(userMsg, onReply) {
  aiHistory.push({role:"user", content: userMsg});
  fetch(AI_PROXY, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({system: AI_SYSTEM, messages: aiHistory, max_tokens: 250})
  })
  .then(function(r){return r.json();})
  .then(function(d){
    var reply = d.reply || "Give me a second — could you rephrase that?";
    aiHistory.push({role:"assistant", content: reply});
    onReply(reply);
  })
  .catch(function(){
    onReply("Something went sideways on my end. Reach us directly on WhatsApp: +1 (868) 342-4101");
  });
}
// ────────────────────────────────────────────────────────────

function runConversation(input){
  conv.msgCount++;
  var intent = detectIntent(input);

  // First try stateful context (e.g. collecting name, business, goal)
  var stateResult = handleConvState(input, intent);
  if(stateResult){
    if(stateResult.state) conv.state = stateResult.state;
    return stateResult;
  }

  // Otherwise handle by intent
  var result = handleIntent(input, intent);
  if(result && result.state) conv.state = result.state;
  return result;
}

window.chatSend=function(){
  var i=document.getElementById('chat-inp');
  var t=i.value.trim();if(!t)return;i.value='';
  addMsg(t,'usr');
  if(intake.active){advanceIntake(t);return;}

  // Check intent first — if default/unknown, use AI Brain
  var intent = detectIntent(t);
  var isDefault = (intent === 'default' || intent === 'offtopic' || intent === 'unknown');

  if(isDefault){
    var typingId = 'ai-typing-'+Date.now();
    addMsg('...', 'bot', typingId);
    callAIBrain(t, function(reply){
      replaceTypingWithReply(typingId, reply);
    });
    return;
  }

  setTimeout(function(){
    var result=runConversation(t);
    addMsg(result.r,'bot');
    var q=document.getElementById('chat-qr');q.innerHTML='';
    setTimeout(function(){
      // Only show action button when truly needed (talk / browse)
      if(result.follow==='talk'){
        var wa=document.createElement('a');
        wa.href=WA+'?text='+encodeURIComponent('Hi, I came from the website and need help.');
        wa.target='_blank';wa.rel='noopener';
        wa.className='qrb wa';wa.innerHTML=WA_SVG+' WhatsApp the team';
        q.appendChild(wa);
      } else if(result.follow==='start'){
        addQR('Browse services','start');
      } else if(result.follow){
        var b=document.createElement('button');b.className='qrb';
        var lbl={templates_menu:'Browse templates',ai_menu:'AI packages',pkg_menu:'See packages',cont_menu:'Maintenance plan',ecomm_menu:'E-commerce'};
        b.textContent=lbl[result.follow]||'See options';
        b.onclick=function(){go(result.follow,null);};q.appendChild(b);
      }
      setBack(hist.length>0);
    },300);
  },700);
};

if(window.location.pathname.includes('/services')){
  setTimeout(function(){if(!open)toggleChat();},8000);
}
})();
