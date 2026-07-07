(function(){
const WA="https://wa.me/18683424101";
const WA_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.877L.057 23.7a.5.5 0 0 0 .613.612l5.807-1.484A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.221-1.436l-.374-.222-3.878.991.998-3.918-.243-.387A9.965 9.965 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

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
    {name:"E-Trusted",desc:"Elite Store (50+ Products) · 15+ Page Network Architecture · Advanced Inventory & CRM Automation · On-Chain Inventory Logic · 1 Month Free Maintenance"}
  ],
  ai:[
    {name:"AI Tier 1",desc:"AI Website Chatbot (24/7 Live) · Lead Capture & CRM Setup · AI Training & Configuration · Monthly Performance Report · 1 Month Free Maintenance"},
    {name:"AI Tier 2",desc:"Everything in Tier 1 · Multi-Channel Automation · Advanced Workflow Automation · 1 Month Free Maintenance"},
    {name:"AI Tier 3",desc:"Full Enterprise AI Deployment · Enterprise-Grade Infrastructure · Full Business Intelligence Automation · Direct Consultation & Support · 1 Month Free Maintenance"}
  ],
  continuity:[
    {name:"Maintenance",desc:"Daily Uptime & Security Monitoring · Monthly Content Optimization · High-Fidelity Technical Backups · Priority Sovereign Support"}
  ],
  templates:[
    {name:"Template Site",desc:"Choose any of our 24 templates · Logo & colours swapped in · Your content added · Mobile-optimised · Live in 24hrs · Hosted on your subdomain"},
    {name:"+ Copywriting Add-On",desc:"Everything in Template Site · Professional copywriting for all sections · Bio, services, CTA all written for you · Delivered in 48-72hrs"},
    {name:"+ AI Chatbot Add-On",desc:"Everything in Template Site · AI chatbot answering your business FAQs 24/7 · Hours, services, location, how to book · Contact us for current pricing"},
    {name:"Micro Store",desc:"Full product store built on your chosen template · Up to 12 products uploaded with copy & images · WhatsApp order button on every product · Live in 72-96hrs"}
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
      {l:"\uD83C\uDF1F Why Prisca Dezigns?",s:"why_us"},
      {l:"\uD83D\uDE97 Evolve Mobility — Luxury Cars",s:"evolve"},
      {l:"\u2139\uFE0F About Prisca Dezigns",s:"about"}
    ]
  },

  /* ── WHY US / SALES BRANCH ── */
  why_us:{
    bot:"Great question. Here's the short version: Wix and Squarespace charge you every month to do the work yourself. We charge you once to do it FOR you. \uD83D\uDE0A",
    r:[
      {l:"\uD83E\uDD1C Us vs Wix & Squarespace",s:"vs_wix"},
      {l:"\u2756 Our unfair advantages",s:"our_pros"},
      {l:"\uD83D\uDCB0 What does it actually cost?",s:"cost_breakdown"},
      {l:"\u26A1 The 24-Hour Guarantee",s:"guarantee"},
      {l:"\uD83E\uDD23 Wait... tell me a joke first",s:"joke"},
      {l:"\u2190 Back to start",s:"start"}
    ]
  },
  vs_wix:{
    bot:"Let's be honest about what Wix and Squarespace actually are:\n\n\uD83D\uDD34 You pay every single month — forever\n\uD83D\uDD34 You do all the work yourself (drag, drop, cry)\n\uD83D\uDD34 Generic templates every other business is using\n\uD83D\uDD34 SEO is basic — Google ignores most of them\n\uD83D\uDD34 No one to call when it breaks at 2am\n\uD83D\uDD34 Your site looks like everyone else's site\n\nWith Prisca Dezigns:\n\n\u2705 One setup fee — done\n\u2705 We build everything, you just send content\n\u2705 Custom design no one else has\n\u2705 SEO, GEO & AEO built in from day one\n\u2705 We're here when things go sideways\n\u2705 Live in 24 hours",
    r:[
      {l:"\u2756 Our unfair advantages",s:"our_pros"},
      {l:"\u26A1 The 24-Hour Guarantee",s:"guarantee"},
      {l:"I'm sold — let's talk",s:"talk"},
      {l:"\u2190 Back",s:"why_us"}
    ]
  },
  our_pros:{
    bot:"Here's what makes us different — and we mean actually different:\n\n\uD83C\uDFC6 Done-For-You, not Done-By-You\nYou send us your logo and content. We handle everything else. No tutorials, no drag-and-drop nightmares.\n\n\u26A1 24-Hour Delivery\nTemplate sites go live within 24 hours of receiving your content. Not 3 weeks. Not 'we'll get back to you.' 24 hours.\n\n\uD83E\uDD16 AI Built-In\nEvery project can include a 24/7 AI chatbot that handles enquiries while you sleep — so you wake up to warm leads, not cold emails.\n\n\uD83D\uDCCA SEO That Actually Works\nWe build with Technical SEO, GEO (Google Maps/local signals), and AEO (Answer Engine Optimisation for AI search). Your competitors on Wix aren't doing this.\n\n\uD83D\uDD12 You Own Your Brand\nYour site, your content, your domain. No platform lock-in.\n\n\uD83C\uDDFB\uD83C\uDDF3 Caribbean-Born, Globally Competitive\nWe understand small business in T&T and the Caribbean — the budget, the hustle, and the vision.",
    r:[
      {l:"\uD83E\uDD1C Us vs Wix & Squarespace",s:"vs_wix"},
      {l:"\uD83D\uDCB0 What does it actually cost?",s:"cost_breakdown"},
      {l:"I'm ready — let's go",s:"talk"},
      {l:"\u2190 Back",s:"why_us"}
    ]
  },
  cost_breakdown:{
    bot:"Let's do the math \uD83E\uDDEE\n\nWix Business Plan: ~$27/mo = $324/year\nSquarespace Business: ~$33/mo = $396/year\n\n...and you still have to build it, maintain it, write the copy, and figure out why the mobile version looks broken.\n\nPrisca Dezigns Template Site: one setup fee, then a low monthly hosting fee.\n\nYear 1: you break even. Year 2+: you're saving money AND your site looks better than theirs.\n\nOh — and we do the work. They don't. \uD83D\uDE0E",
    r:[
      {l:"\uD83C\uDFA8 See template options",s:"pkg_templates"},
      {l:"\u26A1 The 24-Hour Guarantee",s:"guarantee"},
      {l:"Talk to someone",s:"talk"},
      {l:"\u2190 Back",s:"why_us"}
    ]
  },
  guarantee:{
    bot:"\u26A1 The 24-Hour Guarantee\n\nSend us your logo, your photos, and your copy — we go live within 24 hours.\n\nNot a draft. Not a preview link. LIVE. On a real URL. Accessible by real people. Right now.\n\nIf your competitor is still waiting on their Wix site to 'publish'... you're already winning.",
    r:[
      {l:"\uD83C\uDFA8 Browse templates",s:"microstore"},
      {l:"Let's get started",s:"talk"},
      {l:"\u2190 Back",s:"why_us"}
    ]
  },
  joke:{
    bot:"Okay okay \uD83D\uDE02\n\nHow many Wix users does it take to change a light bulb?\n\nNobody knows — they're still dragging and dropping it into position.\n\n\uD83D\uDCA1 Meanwhile our clients went live in 24 hours.",
    r:[
      {l:"\uD83D\uDE02 Okay I'm sold",s:"talk"},
      {l:"\uD83C\uDFA8 Show me the templates",s:"pkg_templates"},
      {l:"\uD83E\uDD1C Us vs Wix & Squarespace",s:"vs_wix"},
      {l:"\u2190 Back to start",s:"start"}
    ]
  },

  /* ── EVOLVE MOBILITY BRANCH ── */
  evolve:{
    bot:"Welcome to Evolve Mobility \uD83D\uDE97\u2728\n\nEvolve is our luxury vehicle platform — curating high-fidelity supercars, electric performance vehicles, and premium automotive experiences across the Caribbean and beyond.",
    r:[
      {l:"\uD83C\uDFCE\uFE0F Browse luxury vehicles",s:"evolve_cars"},
      {l:"\u26A1 Electric & Hybrid",s:"evolve_ev"},
      {l:"\uD83C\uDFC6 Why Evolve?",s:"evolve_why"},
      {l:"\uD83D\uDCF1 Visit Evolve",url:"https://priscadezigns.org/evolve/"},
      {l:"\u2190 Back to start",s:"start"}
    ]
  },
  evolve_cars:{
    bot:"Our curated fleet represents the absolute pinnacle of automotive engineering:\n\n\uD83D\uDD34 Ferrari — The art of speed, Italian-crafted\n\uD83D\uDFE0 Lamborghini — Raw power meets avant-garde design\n\uD83D\uDFE3 Bugatti — Fewer than 500 exist worldwide\n\uD83D\uDFE2 Koenigsegg — Handbuilt hypercars, limited to a handful per year\n\uD83D\uDD35 Rolls-Royce — The definition of effortless luxury\n\uD83D\uDFE1 Bentley — Power and refinement in equal measure\n\nEvery vehicle on Evolve is sourced from verified dealers and primary manufacturer networks.",
    r:[
      {l:"\u26A1 Electric & Hybrid",s:"evolve_ev"},
      {l:"\uD83C\uDFC6 Why choose Evolve?",s:"evolve_why"},
      {l:"\uD83D\uDCF1 Visit Evolve",url:"https://priscadezigns.org/evolve/"},
      {l:"\u2190 Back",s:"evolve"}
    ]
  },
  evolve_ev:{
    bot:"\u26A1 The Future Is Already Fast\n\nElectric doesn't mean slow anymore:\n\n\u26A1 Rimac Nevera — 1,914 hp, 0-60 in 1.85 seconds (yes, really)\n\u26A1 Porsche Taycan Turbo GT — The perfect daily hypercar\n\u26A1 Ferrari SF90 Stradale — Hybrid V8, 986 hp, Italian soul intact\n\u26A1 McLaren Artura — V6 hybrid, lighter than its predecessor\n\u26A1 Lotus Emeya — Gran Turismo reimagined in electric\n\nThe future of performance is electric. Evolve is already there.",
    r:[
      {l:"\uD83C\uDFCE\uFE0F See all luxury vehicles",s:"evolve_cars"},
      {l:"\uD83C\uDFC6 Why choose Evolve?",s:"evolve_why"},
      {l:"\uD83D\uDCF1 Visit Evolve",url:"https://priscadezigns.org/evolve/"},
      {l:"\u2190 Back",s:"evolve"}
    ]
  },
  evolve_why:{
    bot:"\uD83C\uDFC6 Why Evolve Mobility?\n\n\u2756 Curated — Only the highest-fidelity vehicles make the list. No compromises.\n\u2756 Verified — Every listing sourced from primary manufacturer networks and authorised dealers.\n\u2756 Caribbean-First — A luxury automotive platform built specifically for the Caribbean market and serious buyers across the region.\n\u2756 No Noise — No ads, no spam, no filler. Pure automotive intelligence.\n\n\"We didn't build a car website. We built a statement.\"",
    r:[
      {l:"\uD83C\uDFCE\uFE0F Browse vehicles",s:"evolve_cars"},
      {l:"\uD83D\uDCF1 Visit Evolve",url:"https://priscadezigns.org/evolve/"},
      {l:"\u2190 Back",s:"evolve"}
    ]
  },

  /* ── ABOUT BRANCH ── */
  about:{
    bot:"Prisca Dezigns is a full-service digital agency based in Trinidad & Tobago. We design, build and launch websites, e-commerce stores, and AI automation systems for businesses across the Caribbean and beyond. Every project is built to a professional standard — no templates handed to you to figure out, no drag-and-drop builders. We do it all for you.",
    r:[
      {l:"\uD83D\uDCC5 How long have you been operating?",s:"about_history"},
      {l:"\uD83C\uDFAF What do you specialise in?",s:"about_services"},
      {l:"\uD83D\uDC69\u200D\uD83D\uDCBB Who is behind it?",s:"about_founder"},
      {l:"\uD83D\uDCF1 Find us on social media",s:"about_social"},
      {l:"\uD83C\uDF10 Visit the main site",url:"https://priscadezigns.org"},
      {l:"\u2190 Back to start",s:"start"}
    ]
  },
  about_history:{
    bot:"Prisca Dezigns has been operating since 2019. What started as a freelance web design operation grew into a full-service digital agency covering websites, branding, e-commerce, and AI-powered customer service automation. Over the years we have served clients across Trinidad & Tobago and the wider Caribbean, delivering high-fidelity digital products with a focus on accuracy, speed, and results.",
    r:[
      {l:"\uD83C\uDFAF What do you specialise in?",s:"about_services"},
      {l:"\uD83D\uDCF1 Social media",s:"about_social"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_founder:{
    bot:"Prisca Dezigns is led by Priscilla Narine — a certified Project Manager, Web Designer, and Administrative Professional with 6+ years of experience in high-volume data management and digital architecture. She built Prisca Dezigns to give businesses access to the same calibre of digital infrastructure that large companies use — without the agency price tag or the technical headache.",
    r:[
      {l:"\uD83D\uDCF1 Find us on social media",s:"about_social"},
      {l:"\uD83C\uDFAF What do you specialise in?",s:"about_services"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_services:{
    bot:"We specialise in three areas:\n\n\u2756 Website Design & Development — custom builds, template sites, e-commerce stores\n\u2756 AI & Automation — chatbots, WhatsApp automation, lead capture, CRM setup\n\u2756 Brand Architecture — logo, domain, social setup, copywriting, SEO\n\nEverything is done for you. You provide the content, we handle the rest.",
    r:[
      {l:"\uD83D\uDCE6 See all packages",s:"pkg_menu"},
      {l:"\uD83D\uDCF1 Social media",s:"about_social"},
      {l:"Talk to someone",s:"talk"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_social:{
    bot:"Find us and follow along across all platforms \uD83D\uDC47",
    r:[
      {l:"\uD83D\uDCF8 Instagram",url:"https://www.instagram.com/priscadezigns"},
      {l:"\uD83D\uDCD8 Facebook",url:"https://www.facebook.com/priscadezigns"},
      {l:"\uD83E\uDDF5 Threads",url:"https://www.threads.net/@priscadezigns"},
      {l:"\uD83C\uDFB5 TikTok",url:"https://www.tiktok.com/@priscadezigns"},
      {l:"\uD83D\uDCBB Main Website",url:"https://priscadezigns.org"},
      {l:"\u2190 Back",s:"about"}
    ]
  },
  about_location:{
    bot:"We are based in San Fernando, Trinidad & Tobago and serve clients across the Caribbean and internationally. All work is done remotely — no in-person meetings required. We communicate via WhatsApp, email, and video call.",
    r:[
      {l:"Talk to someone",s:"talk"},
      {l:"\u2190 Back",s:"about"}
    ]
  },

  /* ── WEBSITE BRANCH ── */
  need_website:{
    bot:"Our custom websites are built from scratch — fully tailored to your brand, SEO-optimised, and delivered fast. What do you need?",
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
    bot:"We connect an AI agent to your WhatsApp, website, or email. It greets every lead, asks qualifying questions, routes serious buyers to you, and follows up automatically. Setup takes 2-4 weeks.",
    r:[{l:"See AI packages",s:"pkg_ai"},{l:"Talk to someone",s:"talk"}]
  },

  /* ── AUTOMATION BRANCH ── */
  automation:{
    bot:"We build AI systems that replace a full-time customer service rep. They respond, qualify, and follow up — all day, every day. What are you trying to automate?",
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
    bot:"24 ready-made templates. Pick a design, send your content, go live in 24 hours. No tech needed.",
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
    bot:"24 live templates — pick your niche to find the best match:",
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
    bot:"All 24 templates:\n\nFolio | Folio II | Persona | Studio | Consult | Craft | Launch | Velocity | Luxe | Momentum | Obvious | Marquee | Aura | Luxe II | Horizon | Serene | Volt | Summit | Noir | Glow | Paws | Optica | Atelier | Monsieur\n\nAll templates · Live in 24hrs · Logo + content swapped · Contact us for pricing",
    r:[{l:"Browse live previews \u2192",url:"https://priscadezigns.org/templates/"},{l:"\u2190 Back to niches",s:"microstore"},{l:"I'm ready — let's go",s:"talk"}]
  },
  microstore_info:{
    bot:"The Micro Store turns any of our 24 templates into a full product shop:\n\n\u2756 Up to 12 products uploaded with copy & images\n\u2756 WhatsApp order button on every product\n\u2756 Mobile-optimised store layout\n\u2756 Live in 72-96 hours\n\u2756 Contact us for pricing",
    r:[
      {l:"\uD83D\uDDFA\uFE0F Pick a store template",s:"ms_store"},
      {l:"I'm ready — let's go",s:"talk"},
      {l:"\u2190 Back to templates",s:"pkg_templates"}
    ]
  },
  templates_chatbot:{
    bot:"The AI Chatbot add-on plugs a live AI agent into your template site. It answers your business FAQs 24/7 — services, pricing, hours, how to book — and captures leads while you sleep. Contact us for current pricing.",
    r:[
      {l:"Add chatbot to my template",s:"talk"},
      {l:"Template only is fine",s:"microstore"},
      {l:"\u2190 Back to templates",s:"pkg_templates"}
    ]
  },
  templates_included:{
    bot:"Every template includes:\n\u2756 Logo & colours swapped in\n\u2756 Your content & photos added\n\u2756 Mobile-optimised\n\u2756 Live in 24 hours\n\u2756 Hosted on your subdomain\n\nAdd-ons available: Copywriting | AI Chatbot | Micro Store\nContact us for current pricing.",
    r:[
      {l:"\uD83D\uDDFA\uFE0F Browse templates",s:"microstore"},
      {l:"Add chatbot",s:"templates_chatbot"},
      {l:"\uD83D\uDECD\uFE0F Micro Store option",s:"microstore_info"},
      {l:"I'm ready — let's go",s:"talk"}
    ]
  },
  template_ip:{
    bot:"The template design — layout, code, colours, structure — is the intellectual property of Prisca Dezigns. What's yours is your content: your photos, your logo, your business name, and your text. You get a licence to use your customised version while your subscription is active.",
    r:[{l:"\u2190 Back to templates",s:"pkg_templates"},{l:"Talk to someone",s:"talk"}]
  },

  /* ── PACKAGE STEPS ── */
  pkg_oneday:{
    bot:"The 1-Day Website is a fully custom site built to your brand and live within 24 hours. One flat fee. Hosting included after.",
    r:[{l:"What's included?",s:"oneday_included"},{l:"I want this — let's talk",s:"talk"},{l:"See other packages",s:"pkg_menu"}]
  },
  oneday_included:{
    bot:"Your 1-Day Site includes:\n\u2756 Full custom design (not a template)\n\u2756 Mobile-first, fast-loading\n\u2756 SEO + GEO + AEO optimised\n\u2756 WhatsApp & contact integration\n\u2756 Live in 24 hours\nOne flat fee. Maintenance included after.",
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
    bot:"Tap below to start a WhatsApp conversation with us directly. We respond fast.",
    r:[],wa:true
  },

  /* ── FAQ / MISC ── */
  faq_turnaround:{
    bot:"Template sites go live in 24 hours. Custom websites take 3-7 business days depending on scope. E-commerce stores take 3-5 days. AI automation systems take 2-4 weeks. All timelines start from when you send your content.",
    r:[{l:"See packages",s:"pkg_menu"},{l:"Talk to someone",s:"talk"},{l:"\u2190 Start over",s:"start"}]
  },
  faq_payment:{
    bot:"We accept PayPal and bank transfer. For template orders you can pay directly through our template shop. For custom projects we send a quote via WhatsApp first.",
    r:[{l:"Open template shop",url:"https://priscadezigns.org/templates/"},{l:"Talk to someone",s:"talk"},{l:"\u2190 Start over",s:"start"}]
  },
  faq_hosting:{
    bot:"Yes — all our sites are hosted by us. Template sites are hosted on a subdomain (yourbrand.priscadezigns.org) or your own custom domain. Hosting is included in the monthly fee. No technical setup required on your end.",
    r:[{l:"See packages",s:"pkg_menu"},{l:"Talk to someone",s:"talk"},{l:"\u2190 Start over",s:"start"}]
  }
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
    c.innerHTML='<div class="cpkg-name">'+p.name+'</div><div class="cpkg-desc">'+p.desc+'</div>';
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
