const CAPTION_TEMPLATES = {
  Instagram: {
    Professional: [
      "Elevating the standard of high-fidelity design. 💎 Our latest collection is now live. Explore the future of digital luxury at our shop. #Priscion #HighFidelity #DesignExcellence #LuxuryTech #Innovation",
      "Precision meets passion. Every pixel tells a story of sovereignty. Link in bio to shop the Priscion experience. #PriscionEmpire #Web3Design #DigitalAssets #TechLuxury #CreativeStandard",
      "Defining the next era of digital identity. Secure your piece of the empire today. #SovereignIdentity #Priscion #DigitalLegacy #Web3Revolution #HighEndDesign"
    ],
    Hype: [
      "THE EMPIRE HAS ARRIVED. 🔥 Don't sleep on this drop. High-fidelity assets ready for deployment. #Priscion #Web3 #LFG #CryptoArt #DigitalGold #EmpireVibes",
      "Next level unlocked. 🚀 The Priscion wave is here. Are you in or are you watching? #PriscionElite #GamingCulture #Web3Gaming #DigitalHype #Innovation",
      "Sovereign speed. High-fidelity visuals. The game just changed. ⚡️ #Priscion #TechEvolution #DigitalDominance #FutureTech #HypeTrain"
    ],
    Inspirational: [
      "The mustard seed grows into a mighty tree. Your vision is the seed. Priscion is the soil. 🌱 #VisionaryMindset #Growth #PriscionEmpire #SuccessJourney #DigitalGrowth",
      "Built on a foundation of faith and precision. The way is made known. #FaithAndTech #MissionDriven #Priscion #Inspiration #PurposefulDesign",
      "Every masterpiece begins with a single stroke of sovereignty. Create your legacy. #LegacyBuilding #Priscion #CreativeInspiration #DigitalFuture #Empowerment"
    ],
    Luxury: [
      "Pure sophistication. Unrivaled fidelity. Experience the Priscion standard. ✨ #LuxuryLifestyle #DigitalLuxury #PriscionElite #Sophistication #HighEndVisuals",
      "Quiet luxury for the digital age. Elegant, minimal, sovereign. #MinimalistLuxury #DigitalSanctuary #Priscion #ExclusiveDesign #AestheticPerfection",
      "The pinnacle of high-fidelity craftsmanship. Elevate your digital presence. #Craftsmanship #EliteTech #PriscionCouture #LuxuryLiving #DigitalExcellence"
    ],
    Spiritual: [
      "For by Him all things were created, in heaven and on earth. The Way Made Known. 🙏 #TWMK #GospelMission #Faith #Priscion #SovereignGrace",
      "Analytical faith meeting digital excellence. Proclaiming the Unknown God through every pixel. #AnalyticalFaith #Christianity #Mission #Priscion #EvidenceBasedFaith",
      "Under His Grace, we build the empire for His Glory. #FaithDriven #KingdomBuilding #Priscion #TWMK #SpiritualGrowth"
    ]
  },
  Twitter: {
    Professional: [
      "High-fidelity design for the sovereign era. #Priscion #Web3",
      "Precision in every asset. Explore the collection at priscadezigns.org. #DigitalLuxury",
      "The standard for digital excellence has been reset. #PriscionEmpire #Tech"
    ],
    Hype: [
      "Priscion drop is LIVE! 🚀 Grab your assets now. #Web3 #LFG",
      "Sovereign speed meets high-fidelity visuals. Join the empire. ⚡️ #CryptoArt",
      "The wait is over. The future of design is here. 🔥 #Priscion #Innovation"
    ],
    Inspirational: [
      "Your vision, our precision. Building the future together. 🌱 #Priscion #Growth",
      "Faith in the process leads to sovereignty in the results. #Motivation",
      "The way is made known through excellence. #PriscionEmpire #Mission"
    ],
    Luxury: [
      "Experience the pinnacle of digital luxury. ✨ #Priscion #Elite",
      "Minimalist aesthetics. Maximum fidelity. #LuxuryTech",
      "The art of digital sovereignty. 💎 #PriscionCouture"
    ],
    Spiritual: [
      "Building for His Glory. 🙏 #TWMK #Priscion #Faith",
      "Analytical faith meets digital design. #Mission #Gospel",
      "Sovereign grace in every creation. ✨ #Christianity #TWMK"
    ]
  },
  Threads: {
    Professional: [
      "Why settle for generic when you can have high-fidelity? Priscion is here to redefine digital standards. #Design #Tech #Web3",
      "The future of branding is sovereign. Let's build something lasting. #PriscionEmpire #Business",
      "Detail oriented. Result driven. The Priscion way. #Professionalism #DigitalAssets"
    ],
    Hype: [
      "Is the world ready for Priscion? Because we're ready for the world. 🌍 #LFG #Hype",
      "New drop energy. Don't miss out. 🔥 #Priscion #Web3",
      "Visuals so crisp they'll make your head spin. ⚡️ #HighFidelity #Gaming"
    ],
    Inspirational: [
      "Dream big, build precise. The empire starts with you. 🌱 #Success #Inspiration",
      "There's beauty in the precision. Find your sovereign path today. #Motivation",
      "Excellence is not an act, but a habit. We're building for the long haul. #Growth"
    ],
    Luxury: [
      "Aesthetics that speak for themselves. Welcome to the Priscion standard. ✨ #Luxury",
      "Less is more when the quality is this high. #QuietLuxury #Design",
      "The digital sanctuary you've been waiting for. 💎 #Elite #Aesthetics"
    ],
    Spiritual: [
      "Mission-first building. That's the heart of the Priscion Empire. 🙏 #Faith #Mission",
      "Proclaiming Truth through high-fidelity visuals. #Gospel #TWMK",
      "In His service, we create. ✨ #Spiritual #KingdomWork"
    ]
  },
  Facebook: {
    Professional: [
      "Priscion Empire: High-Fidelity Captions. Sovereign Speed. We are proud to announce our latest collection of digital assets, designed for those who demand excellence. #Priscion #BusinessExcellence",
      "Elevate your brand with the precision it deserves. Visit priscadezigns.org to explore our high-fidelity solutions. #ProfessionalDesign #PriscionEmpire",
      "We believe in the power of digital sovereignty. Our tools are built to help you succeed in the Web3 era. #Innovation #FutureReady"
    ],
    Hype: [
      "Get ready for the most high-fidelity drop of the year! 🔥 The Priscion collection is now available. Grab yours before they're gone! #Hype #LFG #Web3",
      "The energy is unmatched. Join the Priscion community and experience the future of design today. 🚀 #EmpireVibes #DigitalGold",
      "Don't just watch the future happen, be a part of it with Priscion. ⚡️ #NextLevel #DesignRevolution"
    ],
    Inspirational: [
      "Every great journey begins with a vision. At Priscion, we're here to provide the precision to make that vision a reality. 🌱 #Inspiration #GrowthMindset",
      "Built on faith, driven by excellence. The Way Made Known is the backbone of everything we do. 🙏 #FaithDriven #Mission",
      "You have the power to create a legacy. We have the tools to help you build it. #Legacy #Empowerment #Priscion"
    ],
    Luxury: [
      "Indulge in the ultimate digital luxury. Our high-fidelity assets are crafted for those with a taste for the finer things. ✨ #LuxuryLifestyle #Aesthetic",
      "Sophistication in every detail. Experience the Priscion difference today. 💎 #QuietLuxury #Exclusive",
      "Transform your digital presence into a masterpiece of elegance and fidelity. #HighEndDesign #PriscionCouture"
    ],
    Spiritual: [
      "We are dedicated to proclaiming the Gospel and sharing the light of Christ through everything we create. 🙏 #TWMK #Faith #Mission",
      "Analytical faith meeting high-fidelity design to make His Way Known. #GospelMission #Christianity #Priscion",
      "Everything we do is for His Glory. Join us on this mission-driven journey. ✨ #KingdomBuilding #SpiritualGrowth"
    ]
  }
};

if (typeof module !== 'undefined') {
  module.exports = { CAPTION_TEMPLATES };
}
