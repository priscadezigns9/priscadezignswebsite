
(function(){
const WA='https://wa.me/18683424101';
const WA_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.877L.057 23.7a.5.5 0 0 0 .613.612l5.807-1.484A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.525-5.221-1.436l-.374-.222-3.878.991.998-3.918-.243-.387A9.965 9.965 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';

const STEPS={
  start:{
    bot:"Hey 👋 Welcome to Prisca Dezigns. What can I help you with today?",
    r:[
      {l:"👨‍💻 Strategic Council",s:"council_menu"},
      {l:"🎨 I want a template site",s:"pkg_templates"},
      {l:"🚀 I need a custom website",s:"need_website"},
      {l:"🤖 I need AI automation",s:"automation"},
      {l:"📈 I need more leads",s:"more_leads"},
      {l:"ℹ️ About Prisca Dezigns",s:"about"},
      {l:"💼 Tell us about your business",s:"talk"}
    ]
  },
  council_menu:{
    bot:"The Strategic Council is ready. Who would you like to consult with?",
    r:[
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
  talk:{ bot: "Let's get started. What's your name?", r:[], intake: true }
};

// ... remaining logic simplified for restoration ...
})();
