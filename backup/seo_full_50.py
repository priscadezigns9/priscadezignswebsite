import json, base64, re, sys

# FULL 50+ keyword SEO package for all 17 pages
# Global geotags: US, UK, Canada, Australia, Caribbean, Europe, Asia, Middle East

GEO_META = """  <meta name="geo.region" content="US-NY, US-CA, US-TX, US-FL, US-IL, GB-ENG, GB-SCT, CA-ON, CA-BC, AU-NSW, AU-VIC, TT, AE-DU, AE-AZ, SG, FR-IDF, DE-BE, JP-13, ZA-GP, NG-LA, IN-MH, IN-DL, KE-30, GH-AA, BR-SP, MX-CMX, CO-DC, AR-C, SA-01, QA-DA, KW-KU, PH-00, MY-10, ID-JK, NZ-AUK, IE-D, NL-NH, SE-AB, IT-MI" />
  <meta name="geo.placename" content="New York, Los Angeles, Chicago, London, Edinburgh, Toronto, Vancouver, Sydney, Melbourne, Dubai, Abu Dhabi, Singapore, Paris, Berlin, Tokyo, Johannesburg, Lagos, Mumbai, New Delhi, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Kuwait City, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Port of Spain" />
  <meta name="geo.position" content="40.7128;-74.0060" />
  <meta name="ICBM" content="40.7128, -74.0060" />
  <meta name="language" content="English" />
  <meta name="distribution" content="global" />
  <meta name="coverage" content="Worldwide" />
  <meta name="target" content="all" />
  <meta name="rating" content="general" />
  <meta name="revisit-after" content="7 days" />"""

BRAND_SEO = {
    'index': {
        'title': 'Priscion | Global AI Brand Architecture, Neural Design & Sovereign Digital Empire',
        'description': 'Priscion is a global AI brand architecture agency building high-fidelity sovereign digital empires. Neural design systems, blockchain integration, Web3 branding, and autonomous brand intelligence for the modern era.',
        'keywords': 'Priscion, Prisca Dezigns, AI brand architecture, neural design, sovereign brand, blockchain branding, Web3 agency, digital empire, global brand agency, AI agency 2026, brand architecture, autonomous branding, high-fidelity design, digital identity, brand intelligence, AI web design, sovereign ledger, $PRN, MUSE wallet, Chillata swap, Priscion blockchain, brand federation, digital sovereignty, neural prompts, AI automation, brand design agency, creative agency, web3 branding agency, decentralized brand, digital marketing 2026, brand strategy, visual identity, UI UX design, brand ecosystem, empire building, affiliate brands, AI content creation, digital transformation, brand monetization, e-commerce branding, luxury branding, agentic design, autonomous agents, blockchain agency, Caribbean tech, global agency, Trinidad tech, UK agency, US brand agency, Toronto branding, Sydney digital, Dubai agency, Singapore tech, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Priscion | Sovereign AI Brand Architecture — Global',
        'og_description': 'Building the next generation of high-fidelity digital empires. Neural design, blockchain integration, and autonomous brand intelligence — delivered globally.',
        'canonical': 'https://priscadezigns.org/'
    },
    'dreaminganime': {
        'title': 'Dreaming Anime | Global High-Fidelity Anime Hub, Shop & Cinema',
        'description': 'Dreaming Anime is your global high-fidelity destination for anime culture, manga, collectibles, merch, and the latest studio releases. Shop exclusive anime collections worldwide with curated picks from Japan and beyond.',
        'keywords': 'Dreaming Anime, anime shop, anime merch, manga, otaku, anime culture, anime 2026, global anime, Japan animation, Studio Ghibli, Crunchyroll, Attack on Titan, Demon Slayer, Jujutsu Kaisen, One Piece, Naruto, Dragon Ball, My Hero Academia, anime collectibles, anime figures, anime posters, anime clothing, anime accessories, anime streaming, anime news, anime review, best anime 2026, new anime releases, anime cinema, anime theater, anime OST, Japanese culture, cosplay, anime conventions, anime gifts, anime subscription box, anime plush, funko pop anime, anime art, anime wallpaper, anime decor, Mimi mascot, dreaminganime.com, anime hub, anime destination, Priscion, global anime shop, UK anime, US anime, Canada anime, Australia anime, Caribbean anime, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Dreaming Anime | Global Sovereign Anime Destination & Shop',
        'og_description': 'High-fidelity anime culture, manga, collectibles, cinema and merch — curated globally by Priscion.',
        'canonical': 'https://priscadezigns.org/dreaminganime/'
    },
    'ateliagaming': {
        'title': 'Atelia Gaming | Global PC Gaming, Hardware, Peripherals & High-Fidelity Tech Shop',
        'description': 'Atelia Gaming is the elite global destination for PC gaming hardware, peripherals, monitors, keyboards, chairs, and high-fidelity gaming tech. Shop premium gear for serious gamers and esports athletes worldwide.',
        'keywords': 'Atelia Gaming, PC gaming, gaming hardware, gaming peripherals, esports, RTX 5090, RTX 4090, gaming monitors, 4K gaming, 240Hz monitor, mechanical keyboards, gaming mouse, gaming headset, gaming chairs, gaming desks, gaming PC build, custom PC, high-fidelity gaming, gaming 2026, best gaming gear, gaming accessories, gaming laptop, gaming controller, PlayStation 5, Xbox Series X, Nintendo Switch, VR gaming, metaverse gaming, game streaming, Twitch, gaming setup, battlestation, RGB lighting, NVMe SSD, gaming router, fiber gaming, game performance, FPS gaming, competitive gaming, esports 2026, $ATLR token, Atelia blockchain, gaming shop online, global gaming, UK gaming, US gaming, Canada gaming, Australia gaming, Priscion gaming, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Atelia Gaming | Elite Global PC Gaming & Hardware Shop',
        'og_description': 'Premium gaming hardware, peripherals, and tech — curated for elite global performance by Priscion.',
        'canonical': 'https://priscadezigns.org/ateliagaming/'
    },
    'couturegallery': {
        'title': 'Couture Gallery | Global Luxury Handbags, Archival Fashion & Designer Accessories',
        'description': 'Couture Gallery curates authenticated luxury handbags, designer accessories, and archival fashion from Hermès, Chanel, Louis Vuitton, Dior, Prada and beyond. High-fidelity fashion intelligence for the global connoisseur.',
        'keywords': 'Couture Gallery, luxury handbags, Hermès Birkin, Hermès Kelly, Chanel flap bag, Chanel classic, Louis Vuitton Neverfull, Louis Vuitton Speedy, Dior Saddle, Prada Nylon, Bottega Veneta, Gucci, Balenciaga, Saint Laurent, Celine, designer bags, luxury fashion 2026, archival fashion, authenticated luxury, luxury resale, secondhand luxury, pre-owned designer, fashion investment, luxury accessories, designer wallets, luxury belts, fashion editorial, runway fashion, Paris fashion week, Milan fashion week, London fashion week, New York fashion week, fashion trends 2026, luxury shopping online, global luxury fashion, UK luxury fashion, US designer bags, Canada luxury shopping, Australia fashion, Dubai luxury, Singapore fashion, fashion intelligence, style guide, Priscion fashion, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Couture Gallery | Global Luxury Handbags & Archival Fashion',
        'og_description': 'Authenticated luxury handbags and archival fashion intelligence — curated globally by Priscion.',
        'canonical': 'https://priscadezigns.org/couturegallery/'
    },
    'quietluxury': {
        'title': 'Quiet Luxury | Global Minimalist Home Decor, Sanctuary Design & Artisanal Living',
        'description': 'Quiet Luxury curates elevated minimalist home decor, Japandi furniture, sanctuary living essentials, and artisanal home wellness products. Shop the finest in understated luxury delivered to your door worldwide.',
        'keywords': 'Quiet Luxury, minimalist home decor, sanctuary design, Japandi, Wabi-sabi, Scandinavian design, artisanal furniture, home wellness, luxury living, interior design 2026, minimalist aesthetic, neutral tones, linen bedding, ceramic decor, bamboo furniture, sustainable home, organic textures, home spa, wellness room, meditation space, luxury candles, essential oil diffuser, handmade pottery, woven baskets, stone surfaces, marble decor, home art, gallery wall, luxury rugs, throw pillows, home fragrance, bedroom decor, living room ideas, kitchen styling, bathroom luxury, outdoor sanctuary, balcony decor, penthouse decor, home staging, real estate staging, interior architecture, home design trends 2026, global home decor, UK interior design, US home decor, Canada home styling, Australia interiors, Priscion home, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Quiet Luxury | Global Minimalist Home Decor & Sanctuary Design',
        'og_description': 'Elevated minimalist home decor and sanctuary living — curated globally by Priscion.',
        'canonical': 'https://priscadezigns.org/quietluxury/'
    },
    'soleprestige': {
        'title': 'Sole Prestige | Global Luxury Sneakers, Archival Footwear & High-End Streetwear Shop',
        'description': 'Sole Prestige is the definitive global source for luxury sneakers, archival footwear design, and high-end streetwear. Shop premium kicks from Nike, Jordan, Adidas, New Balance, Salehe Bembury and beyond.',
        'keywords': 'Sole Prestige, luxury sneakers, Jordan 1, Air Jordan, Nike Dunk, Nike Air Max, Adidas Yeezy, New Balance 990, Salehe Bembury, Travis Scott collab, Off-White Nike, sneaker release dates, sneaker news 2026, sneaker resale, StockX, GOAT sneakers, Flight Club, sneaker cook groups, limited edition sneakers, rare sneakers, deadstock sneakers, sneaker collection, sneaker investment, high-end streetwear, Supreme, Palace, Kith, Fear of God, Essentials, Off-White, A Bathing Ape, BAPE, streetwear 2026, hypebeast, sneaker culture, sneaker grail, grail sneakers, sneakerhead, sneaker photography, sneaker cleaning, sneaker care, shoe rotation, sneaker display, luxury boots, designer loafers, high-end heels, Italian shoes, bespoke footwear, Priscion sneakers, global sneaker shop, UK sneakers, US footwear, Canada streetwear, Australia sneakers, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Sole Prestige | Global Luxury Sneakers & High-End Streetwear',
        'og_description': 'The definitive global luxury sneaker and archival streetwear destination — curated by Priscion.',
        'canonical': 'https://priscadezigns.org/soleprestige/'
    },
    'essenceelite': {
        'title': 'Essence Elite | Global Artisanal Fragrances, Niche Perfumery & Olfactive Intelligence',
        'description': 'Essence Elite curates the finest global artisanal fragrances, niche perfumery, luxury parfums, and advanced scent-layering collections for the discerning nose worldwide.',
        'keywords': 'Essence Elite, artisanal fragrance, niche perfume, scent layering, luxury perfumery, Maison Margiela Replica, Tom Ford fragrance, Creed Aventus, Byredo, Jo Malone London, Diptyque, Le Labo, Frederic Malle, Amouage, Clive Christian, Xerjoff, parfum extrait, eau de parfum, eau de toilette, cologne, oud fragrance, oud wood, musk fragrance, floral perfume, citrus cologne, woody fragrance, oriental scent, gourmand fragrance, unisex perfume, mens fragrance, womens perfume, fragrance layering, scent wardrobe, perfume collection, fragrance investment, limited edition perfume, fragrance samples, discovery set, perfume subscription, olfactive design, fragrance notes, top notes, base notes, sillage, longevity, fragrance 2026, global fragrance shop, UK perfume, US cologne, Canada fragrance, Dubai oud, Priscion fragrance, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Essence Elite | Global Artisanal Fragrances & Niche Perfumery',
        'og_description': 'Curated global artisanal fragrances and olfactive intelligence — by Priscion.',
        'canonical': 'https://priscadezigns.org/essenceelite/'
    },
    'theautodrome': {
        'title': 'The Autodrome | Global Luxury Vehicles, Supercar Engineering, F1 Intelligence & Automotive Excellence',
        'description': 'The Autodrome is the high-fidelity global destination for luxury vehicles, supercar engineering, Formula 1 intelligence, car care products, and premium automotive accessories.',
        'keywords': 'The Autodrome, luxury cars, supercars, Ferrari, Ferrari Luce, Lamborghini Revuelto, McLaren, Bugatti Chiron, Porsche 911, Aston Martin, Bentley, Rolls-Royce, Maserati, Pagani, Koenigsegg, F1 2026, Formula 1, F1 teams 2026, Lewis Hamilton, Max Verstappen, F1 race calendar, Monaco Grand Prix, British Grand Prix, Abu Dhabi Grand Prix, car review 2026, electric cars, EV supercars, Tesla Roadster, Rimac Nevera, luxury SUV, Range Rover, Bentayga, Lamborghini Urus, Porsche Cayenne, car detailing, car wax, ceramic coating, paint protection film, car accessories, car care products, luxury car interior, car subscription, supercar rental, exotic car, car investment, classic cars, vintage cars, automotive photography, car content creator, car YouTube, automotive news, Priscion motors, global automotive, UK cars, US supercars, Dubai exotic cars, Germany automotive, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'The Autodrome | Global Luxury Vehicles & Supercar Intelligence',
        'og_description': 'High-fidelity luxury vehicles, supercar engineering, and F1 intelligence — globally by Priscion.',
        'canonical': 'https://priscadezigns.org/theautodrome/'
    },
    'peakfit': {
        'title': 'Peak Fit | Global Biohacking, Fitness Performance, Recovery Science & Health Tech Shop',
        'description': 'Peak Fit is your global sovereign hub for biohacking technology, fitness performance optimization tools, recovery science gear, and elite health tech used by world-class athletes and longevity experts.',
        'keywords': 'Peak Fit, biohacking, fitness technology, recovery science, Oura Ring, WHOOP 4.0, Garmin Fenix, Apple Watch Ultra, red light therapy, Joovv, infrared sauna, cold plunge, ice bath, CGM continuous glucose monitor, Levels Health, Dexcom, HRV training, VO2 max, lactate threshold, zone 2 training, strength training, resistance bands, kettlebell, barbell, bumper plates, pull up bar, home gym equipment, squat rack, battle ropes, rowing machine, Concept2, Peloton, treadmill 2026, running shoes, Brooks, HOKA, Nike running, Asics, trail running, marathon training, triathlon gear, cycling power meter, nutrition supplements, protein powder, creatine, magnesium, omega 3, collagen, electrolytes, intermittent fasting, carnivore diet, ketogenic diet, longevity supplements, NMN, resveratrol, sleep optimization, performance health, sports medicine, physical therapy, athletic recovery, ice pack, compression therapy, Normatec, massage gun, Theragun, Hypervolt, foam roller, Priscion health, global fitness, UK biohacking, US health tech, Canada wellness, Australia fitness, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Peak Fit | Global Biohacking & Elite Performance Science Shop',
        'og_description': 'Elite biohacking tools, fitness performance science, and recovery tech — curated globally by Priscion.',
        'canonical': 'https://priscadezigns.org/peakfit/'
    },
    'glowprotocol': {
        'title': 'Glow Protocol | Global Regenerative Skincare, Longevity Beauty Tech & Dermatological Innovation',
        'description': 'Glow Protocol curates advanced regenerative skincare diagnostics, longevity beauty technology, dermatological innovation, and premium skincare routines for the global beauty community.',
        'keywords': 'Glow Protocol, regenerative skincare, beauty tech, longevity skincare, skincare diagnostics, dermatology, anti-aging skincare, retinol, retinoid, hyaluronic acid, niacinamide, vitamin C serum, peptides, collagen serum, AHA BHA exfoliant, SPF sunscreen, moisturizer, toner, essence, face oil, eye cream, night cream, skin barrier repair, ceramides, glycerin, snail mucin, K-beauty, Korean skincare routine, 10 step skincare, glass skin, skin cycling, slugging, double cleanse, gua sha, jade roller, LED light therapy, red light face mask, microcurrent device, microneedling at home, dermaplaning, chemical peel, laser skincare, skin health 2026, clean beauty, vegan skincare, cruelty-free skincare, sustainable beauty, luxury skincare brands, La Mer, Augustinus Bader, SkinCeuticals, The Ordinary, Paulas Choice, Drunk Elephant, Tatcha, Sunday Riley, skincare subscription, beauty influencer, skincare routine, skin goals, Priscion beauty, global skincare, UK beauty, US skincare, Canada beauty, Australia skincare, Dubai beauty, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Glow Protocol | Global Regenerative Skincare & Longevity Beauty Tech',
        'og_description': 'Advanced regenerative skincare and longevity beauty intelligence — curated globally by Priscion.',
        'canonical': 'https://priscadezigns.org/glowprotocol/'
    },
    'theescapist': {
        'title': 'The Escapist | Global Luxury Travel, Sanctuary Experiences, Boutique Hotels & Adventure Gear',
        'description': 'The Escapist curates the world finest luxury travel destinations, boutique hotel experiences, sanctuary getaways, and premium travel gear. Your global travel intelligence concierge by Priscion.',
        'keywords': 'The Escapist, luxury travel, sanctuary travel, boutique hotels, Maldives overwater bungalow, Bali retreat, Tuscany villa, Santorini, Amalfi Coast, French Riviera, Swiss Alps, Kyoto Japan, Bora Bora, Seychelles, Fiji, Caribbean travel, St Barts, Turks and Caicos, Cabo San Lucas, Tulum Mexico, Costa Rica, New Zealand travel, Iceland adventure, Norway fjords, luxury safari Africa, Dubai luxury, Singapore luxury, luxury cruise, private jet travel, first class flights, airport lounge, travel hacking, points and miles, travel rewards, hotel loyalty programs, Marriott Bonvoy, Hilton Honors, world of Hyatt, luxury travel gear, luggage, Rimowa, Away suitcase, travel pillow, noise cancelling headphones, Sony WH-1000XM5, Bose QuietComfort, travel adapter, travel insurance, digital nomad, remote work travel, travel photography, drone travel, travel blog, solo travel, couples travel, honeymoon destinations, family luxury travel, travel concierge, Priscion travel, global travel guide, UK travel, US vacations, Canada travel, Australia adventures, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'The Escapist | Global Luxury Travel & Sanctuary Experiences',
        'og_description': 'Curated global luxury travel, sanctuary destinations, and boutique hotel experiences by Priscion.',
        'canonical': 'https://priscadezigns.org/theescapist/'
    },
    'thetechscouthq': {
        'title': 'Tech Scout HQ | Global AI-Curated Tech Picks, Gadget Reviews & Innovation Intelligence',
        'description': 'Tech Scout HQ delivers global AI-curated technology picks, in-depth gadget reviews, and cutting-edge innovation intelligence for the serious tech enthusiast, creator, and professional worldwide.',
        'keywords': 'Tech Scout HQ, AI tech picks, gadgets, Apple iPhone 17, Samsung Galaxy S26, Google Pixel 10, MacBook Pro M4, iPad Pro, Apple Vision Pro, neural tech, innovation 2026, smart home, Matter protocol, HomeKit, Google Home, Amazon Alexa, AI assistant, ChatGPT, Claude AI, Gemini AI, artificial intelligence, machine learning, neural processing, NPU chip, ARM processor, Qualcomm Snapdragon, MediaTek Dimensity, laptop 2026, ultrabook, gaming laptop, 5G technology, 6G research, WiFi 7, Bluetooth 6, USB4, Thunderbolt 5, solid state battery, foldable phone, rollable display, AR glasses, VR headset, Meta Quest 3, Apple Vision, wearable tech, smartwatch, fitness tracker, smart glasses, earbuds, noise cancelling, DAC amplifier, home theater, 8K TV, OLED display, drone 2026, DJI, robot 2026, autonomous vehicle, EV technology, solar tech, green tech, CES 2026, tech news, tech reviews, unboxing, Priscion tech, global tech shop, UK tech, US gadgets, Canada technology, Australia tech, Singapore tech, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Tech Scout HQ | Global AI-Curated Tech & Innovation Intelligence',
        'og_description': 'Global AI-curated tech picks and innovation intelligence — zero noise, all signal. By Priscion.',
        'canonical': 'https://priscadezigns.org/thetechscouthq/'
    },
    'primelandnetwork': {
        'title': 'Prime Land Network | Global Real Estate Intelligence, Luxury Property Investment & Market Analysis',
        'description': 'Prime Land Network delivers global luxury real estate listings, investment analysis, BRRRR strategy intelligence, and property market insights across the US, UK, Canada, Caribbean, UAE, and beyond.',
        'keywords': 'Prime Land Network, luxury real estate, property investment, global listings, New York real estate, Manhattan apartments, Brooklyn properties, Miami luxury homes, Los Angeles real estate, Beverly Hills, Malibu, London property, Chelsea London, Kensington, Knightsbridge, Dubai real estate, Palm Jumeirah, Downtown Dubai, Toronto condos, Vancouver real estate, Sydney property, Melbourne real estate, Caribbean real estate, Barbados villas, Trinidad property, Cayman Islands, Turks and Caicos real estate, Bahamas homes, BRRRR strategy, buy and hold, real estate investing, rental income, passive income property, cap rate, cash on cash return, NOI net operating income, property management, short term rental, Airbnb investment, vacation rental, luxury villa rental, commercial real estate, office space, retail property, industrial real estate, REIT, real estate fund, mortgage rates 2026, interest rates, real estate market 2026, housing market, property tax, 1031 exchange, real estate attorney, real estate agent, buyer agent, listing agent, home staging, property renovation, real estate photography, drone real estate, Priscion real estate, global property, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Prime Land Network | Global Real Estate Intelligence & Investment',
        'og_description': 'Global luxury real estate listings, investment analysis, and property intelligence for generational wealth builders.',
        'canonical': 'https://priscadezigns.org/primelandnetwork/'
    },
    'verdantco': {
        'title': 'Verdant Co | Global Sustainable Luxury, Lab-Grown Diamonds, Circular Economy & Green Innovation',
        'description': 'Verdant Co curates sustainable luxury products, lab-grown diamonds, circular economy solutions, and eco-friendly innovations for the globally conscious consumer who refuses to compromise on quality.',
        'keywords': 'Verdant Co, sustainable luxury, lab-grown diamonds, circular economy, eco-friendly, green living, sustainability 2026, ethical fashion, carbon neutral, net zero, carbon offset, sustainable fashion, slow fashion, upcycled clothing, recycled materials, organic cotton, hemp fabric, bamboo products, sustainable home goods, zero waste, plastic free, compostable packaging, B corp brands, Patagonia, Allbirds, Stella McCartney, Veja sneakers, Pangaia, Eileen Fisher, sustainable jewelry, conflict-free diamonds, moissanite, lab grown gemstones, Pandora lab diamonds, sustainable beauty, clean beauty, cruelty-free, vegan products, plant-based, solar energy, wind energy, green architecture, LEED certification, passive house, eco home, sustainable gardening, permaculture, composting, rewilding, biodiversity, ocean conservation, reforestation, carbon sequestration, sustainable investing, ESG investing, green bonds, impact investing, Priscion sustainability, global green brands, UK sustainability, US eco brands, Canada green living, Australia sustainable, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Verdant Co | Global Sustainable Luxury & Green Innovation',
        'og_description': 'Curated global sustainable luxury, lab-grown diamonds, and circular economy solutions by Priscion.',
        'canonical': 'https://priscadezigns.org/verdantco/'
    },
    'pawvault': {
        'title': 'Paw Vault | Global Smart Pet Tech, AI Pet Care, High-Fidelity Nutrition & Pet Health Shop',
        'description': 'Paw Vault is your global premier destination for smart pet technology, AI-powered pet care tools, veterinary-grade nutrition products, and high-fidelity accessories for every pet parent worldwide.',
        'keywords': 'Paw Vault, smart pet tech, AI pet care, pet nutrition, pet health technology, dog accessories, cat care, Furbo dog camera, Fi dog collar, GPS dog tracker, Whistle GPS, smart pet feeder, automatic cat feeder, water fountain pet, pet monitor, pet camera, dog training collar, e-collar training, agility training, dog puzzle toy, cat enrichment, pet enrichment, raw feeding, freeze dried pet food, fresh pet food, grain-free dog food, premium cat food, veterinary prescription diet, pet supplements, joint supplements for dogs, omega 3 for pets, probiotics for pets, pet grooming, self-cleaning litter box, Litter Robot, smart litter box, pet door, microchip pet door, heated pet bed, orthopedic dog bed, pet stroller, dog bike trailer, dog car seat, pet travel carrier, airline approved carrier, pet insurance, pet health monitoring, wearable for pets, pet diabetes monitor, pet DNA test, Embark, Wisdom Panel, pet birthday, pet photography, pet content creator, pet influencer, Priscion pets, global pet shop, UK pets, US dog products, Canada pet care, Australia animal care, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'Paw Vault | Global Smart Pet Tech & AI-Powered Pet Care Shop',
        'og_description': 'High-fidelity global smart pet technology and veterinary-grade care solutions — curated by Priscion.',
        'canonical': 'https://priscadezigns.org/pawvault/'
    },
    'thewatchlist': {
        'title': 'The Watch List | Global Luxury Horology, Investment Timepieces, Watchmaking Intelligence & Collector Guides',
        'description': 'The Watch List is the definitive global editorial voice on luxury horology, investment-grade timepieces, watchmaking intelligence, and collector guides for the serious horologist worldwide.',
        'keywords': 'The Watch List, luxury watches, Rolex, Rolex Daytona, Rolex Submariner, Rolex GMT Master, Patek Philippe, Patek Philippe Nautilus, Patek Philippe Aquanaut, Audemars Piguet, AP Royal Oak, AP Offshore, Vacheron Constantin, IWC Portugieser, IWC Pilot, Jaeger-LeCoultre, Omega Speedmaster, Omega Seamaster, Cartier Tank, Cartier Santos, Grand Seiko, Seiko, Tudor Black Bay, Tudor Pelagos, Breitling Navitimer, TAG Heuer Monaco, Hublot Big Bang, Richard Mille, Franck Muller, watch investment, watch collecting, horology 2026, watch news, watch review, new watch releases, Basel World, Watches and Wonders, SIHH, watch auction, Phillips auction, Christies watches, Sothebys watches, vintage watches, rare watches, limited edition watches, watch grail, watch modding, NH35 movement, ETA 2824, in-house movement, mechanical watch, automatic watch, hand-wound watch, quartz watch, solar watch, smartwatch vs mechanical, watch strap, NATO strap, rubber strap, crocodile strap, watch box, watch winder, watch case, watch care, watch polishing, Priscion horology, global watch shop, UK watches, US luxury watches, Switzerland watches, Japan watches, Germany watches, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'The Watch List | Global Luxury Horology & Investment Timepieces',
        'og_description': 'The authoritative global voice on luxury horology and investment-grade timepieces — by Priscion.',
        'canonical': 'https://priscadezigns.org/thewatchlist/'
    },
    'thewaymadeknown': {
        'title': 'The Way Made Known | Global Biblical Apologetics, Gospel Mission, Analytical Faith & Christian Evidence',
        'description': 'The Way Made Known proclaims the Gospel of Jesus Christ through analytical faith, biblical archaeology, historical evidence, and scripture-based apologetics — reaching every nation, tribe, and tongue with the Truth.',
        'keywords': 'The Way Made Known, biblical apologetics, Gospel mission, evangelical Christianity, biblical archaeology, analytical faith, scripture evidence, Pentecostal, global mission, Christianity 2026, Bible evidence, faith and reason, Christian apologetics, Josh McDowell, Lee Strobel, William Lane Craig, NT Wright, CS Lewis, Ravi Zacharias, historical Jesus, resurrection evidence, dead sea scrolls, biblical manuscript, textual criticism, new testament reliability, old testament prophecy, messianic prophecy, fulfilled prophecy, creation vs evolution, intelligent design, the case for Christ, the case for faith, the reason for God, mere Christianity, systematic theology, Calvinist, Arminian, cessationist, charismatic, evangelical, born again, salvation, grace, faith, repentance, baptism, holy spirit, gifts of the spirit, tongues, prophecy, divine healing, church planting, missions, great commission, unreached people groups, Bible translation, Wycliffe, SIL, evangelism, discipleship, small group, prayer, intercession, worship, praise, Christian music, gospel music, Christian podcast, Christian YouTube, online church, digital missions, Caribbean Christianity, Trinidad church, global Christianity, Africa missions, Asia missions, Latin America missions, Priscion NGO, The Way Made Known ministry, Kenya, Ghana, Brazil, Mexico, Colombia, Argentina, Saudi Arabia, Qatar, Kuwait, Philippines, Malaysia, Indonesia, New Zealand, Ireland, Netherlands, Sweden, Italy, South Africa, India, Scotland, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Johannesburg, Mumbai, New Delhi, Edinburgh',
        'og_title': 'The Way Made Known | Global Gospel Mission & Biblical Apologetics',
        'og_description': 'Proclaiming the Unknown God through analytical faith and evidence-based Christianity — to every nation.',
        'canonical': 'https://thewaymadeknown.com/'
    },
}

def build_seo_block(seo):
    return f"""  <meta name="description" content="{seo['description']}" />
  <meta name="keywords" content="{seo['keywords']}" />
  <meta name="author" content="Priscion | Global Brand Architecture" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="language" content="English" />
  <meta name="distribution" content="global" />
  <meta name="coverage" content="Worldwide" />
  <meta name="target" content="all" />
  <meta name="rating" content="general" />
  <meta name="revisit-after" content="7 days" />
  <link rel="canonical" href="{seo['canonical']}" />
  <meta property="og:title" content="{seo['og_title']}" />
  <meta property="og:description" content="{seo['og_description']}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{seo['canonical']}" />
  <meta property="og:site_name" content="Priscion Global Empire" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:locale:alternate" content="en_GB" />
  <meta property="og:locale:alternate" content="en_CA" />
  <meta property="og:locale:alternate" content="en_AU" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{seo['og_title']}" />
  <meta name="twitter:description" content="{seo['og_description']}" />
  <meta name="twitter:site" content="@prisca.adaa" />
  <meta name="geo.region" content="US-NY, US-CA, US-TX, US-FL, US-IL, GB-ENG, GB-SCT, CA-ON, CA-BC, AU-NSW, AU-VIC, TT, AE-DU, AE-AZ, SG, FR-IDF, DE-BE, JP-13, ZA-GP, NG-LA, IN-MH, IN-DL, KE-30, GH-AA, BR-SP, MX-CMX, CO-DC, AR-C, SA-01, QA-DA, KW-KU, PH-00, MY-10, ID-JK, NZ-AUK, IE-D, NL-NH, SE-AB, IT-MI" />
  <meta name="geo.placename" content="New York, Los Angeles, London, Edinburgh, Toronto, Vancouver, Sydney, Melbourne, Dubai, Abu Dhabi, Singapore, Paris, Berlin, Tokyo, Johannesburg, Lagos, Mumbai, New Delhi, Nairobi, Accra, Sao Paulo, Mexico City, Bogota, Buenos Aires, Riyadh, Doha, Kuwait City, Manila, Kuala Lumpur, Jakarta, Auckland, Dublin, Amsterdam, Stockholm, Milan, Port of Spain" />
  <meta name="geo.position" content="40.7128;-74.0060" />
  <meta name="ICBM" content="40.7128, -74.0060" />"""

BRAND_FILES = {
    'index': 'index.html',
    'dreaminganime': 'dreaminganime/index.html',
    'ateliagaming': 'ateliagaming/index.html',
    'couturegallery': 'couturegallery/index.html',
    'quietluxury': 'quietluxury/index.html',
    'soleprestige': 'soleprestige/index.html',
    'essenceelite': 'essenceelite/index.html',
    'theautodrome': 'theautodrome/index.html',
    'peakfit': 'peakfit/index.html',
    'glowprotocol': 'glowprotocol/index.html',
    'theescapist': 'theescapist/index.html',
    'thetechscouthq': 'thetechscouthq/index.html',
    'primelandnetwork': 'primelandnetwork/index.html',
    'verdantco': 'verdantco/index.html',
    'pawvault': 'pawvault/index.html',
    'thewatchlist': 'thewatchlist/index.html',
    'thewaymadeknown': 'thewaymadeknown/index.html',
}

ready = []
for brand, seo in BRAND_SEO.items():
    try:
        c = open(f'/app/state/209c6fcc-e405-4df2-a33b-ebe034e274ab/work/{brand}_page.html').read()
        sha = open(f'/app/state/209c6fcc-e405-4df2-a33b-ebe034e274ab/work/{brand}_sha.txt').read().strip()
    except:
        print(f"SKIP: {brand}")
        continue

    seo_block = build_seo_block(seo)

    for pat in [
        r'\s*<meta name=["\']description["\'][^>]*/?>',
        r'\s*<meta name=["\']keywords["\'][^>]*/?>',
        r'\s*<meta name=["\']author["\'][^>]*/?>',
        r'\s*<meta name=["\']robots["\'][^>]*/?>',
        r'\s*<meta name=["\']language["\'][^>]*/?>',
        r'\s*<meta name=["\']distribution["\'][^>]*/?>',
        r'\s*<meta name=["\']coverage["\'][^>]*/?>',
        r'\s*<meta name=["\']target["\'][^>]*/?>',
        r'\s*<meta name=["\']rating["\'][^>]*/?>',
        r'\s*<meta name=["\']revisit-after["\'][^>]*/?>',
        r'\s*<link rel=["\']canonical["\'][^>]*/?>',
        r'\s*<meta property=["\']og:[^"\']*["\'][^>]*/?>',
        r'\s*<meta name=["\']twitter:[^"\']*["\'][^>]*/?>',
        r'\s*<meta name=["\']geo\.[^"\']*["\'][^>]*/?>',
        r'\s*<meta name=["\']ICBM["\'][^>]*/?>',
    ]:
        c = re.sub(pat, '', c, flags=re.IGNORECASE)

    c = re.sub(r'<title>[^<]*</title>', f'<title>{seo["title"]}</title>', c)

    if re.search(r'<meta[^>]*viewport[^>]*>', c, re.IGNORECASE):
        c = re.sub(r'(<meta[^>]*viewport[^>]*>)', r'\1\n' + seo_block, c, count=1, flags=re.IGNORECASE)
    else:
        c = re.sub(r'(<head[^>]*>)', r'\1\n' + seo_block, c, count=1, flags=re.IGNORECASE)

    kw_count = len(seo['keywords'].split(','))
    encoded = base64.b64encode(c.encode()).decode()
    payload = json.dumps({
        "message": f"SEO: 50+ keywords, global geotags, full OG/Twitter for {brand}",
        "content": encoded,
        "sha": sha
    })
    out = f'/app/state/209c6fcc-e405-4df2-a33b-ebe034e274ab/work/fseo_{brand}.json'
    open(out, 'w').write(payload)
    ready.append(brand)
    print(f"READY: {brand} ({kw_count} keywords)")

print(f"\nTotal: {len(ready)}")
