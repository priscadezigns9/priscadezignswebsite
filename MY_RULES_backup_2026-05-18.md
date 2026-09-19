## IMAGE GENERATOR FALLBACK RULE (2026-05-18 — NON-NEGOTIABLE)
When a generator hits a rate limit, credit limit, or timeout — immediately try the next one. Never stop and ask. Order of fallback:
1. Together AI (FLUX.1) — api.together.xyz — {{credential:together-ai}}
2. Pollinations AI (FLUX) — image.pollinations.ai — free, no auth, add &seed=[random] to avoid cache
3. Vivago.ai — vivago.ai/studio — {{credential:vivago-login}} — browser login required
4. Gemini Imagen — generativelanguage.googleapis.com — {{credential:gemini-api}}
5. Any other publicly accessible free image generation API found via web_search
Never report a failure until ALL options are exhausted. If one times out after 30s, move to next immediately.

## PHOTO AUDIT RULE — EVERY 17 MINUTES (NON-NEGOTIABLE, 2026-05-16)
- Every 17 minutes, audit ALL empire brand pages AND their shops for broken images
- A broken image = any img src that is:
  1. A relative path (img/xxx.jpg, ../img/xxx.jpg) — server has no /img/ folder
  2. An Amazon CDN URL that returns 404
  3. No img tags at all on a product-heavy page
- Send a WhatsApp report to 18683424101 with:
  - Which brands/pages have broken images
  - Count of broken vs working images per page
  - Whether it's main page or shop
- If ALL images are confirmed working: send a brief "✅ Photo audit clear — all images loading" confirmation to WhatsApp
- Photos make or break a website — this is the highest priority visual check

## DAILY 1PM BESTSELLER PULL RULE (2026-05-16)
- Every day at 1pm AST, pull the latest high-selling/trending products from Amazon for EVERY niche
- Add each new product to its matching brand shop page on GitHub
- Niches + brands: fitness→peak-fit, skincare→glow-protocol, fragrance→essence-elite, watches→the-watch-list, gaming→atelier-gaming, anime→dreaming-anime, travel→the-escapist, cars→the-autodrome, shoes→sole-prestige, bags→couture-gallery, plants→verdant-co, pets→paw-vault
- After 1pm, the next social post for each brand should FEATURE the newly added product
- Use Amazon Best Sellers + Movers & Shakers pages to find trending products
- Always use affiliate tag: priscadezigns-20

## CATEGORY ROUTING RULE (2026-05-16)
- Every section-level CTA on a brand page must route to /brand/shop/?cat=[category]
- Individual product "Buy on Amazon" links stay as direct Amazon dp/ links
- Every shop page must support ?cat= URL param for filter preselection
- The Watch List: brand name links (Rolex, Omega, etc.) → /the-watch-list/shop/?cat=[brand-slug]
- The Autodrome: dual filter — ?type=[part-type]&car=[brand]

## ANIMATED PRODUCT PHOTO RULE (2026-05-17 — NON-NEGOTIABLE)
- If a product photo has a white/light background and background removal is not possible, match the section/container background color to the photo's background so the image blends in seamlessly
- NEVER try to use mix-blend-mode:multiply as a fix on dark backgrounds — it makes images look wrong
- The correct approach: white bg photo → white section bg, dark bg photo → dark section bg
- The float/hover animation should still apply — the goal is the product appears to hover within a matching background, not floating on a mismatched color
- This applies to: hero sections, product cards, feature sections, any animated product displays across all empire brand sites

## FLOATING HERO PRODUCT RULE (2026-05-16)
- The Sole Prestige floating shoe effect (float + glow-pulse keyframes, overflow:visible on hero-right) can be applied to other product-hero brands
- Candidate brands: Couture Gallery (floating bag), Essence Elite (floating perfume bottle), Peak Fit (floating dumbbell)
- Effect: product image floats with translateY animation + drop-shadow glow, positioned to visually "break out" of its container

## AUTODROME COLOR RULE (2026-05-16)
- Primary accent: teal #00B4A6 (from logo)
- Secondary accent: red #C0392B (stays, racing use)
- AUTODROME wordmark: teal, not red

## ATELIER GAMING COLOR RULE (2026-05-16)
- Logo and primary accents: RED #E53935 dominant
- Secondary: green #56C02B can stay for health bars / secondary badges
- Red should dominate headings, active states, borders, CTAs

## EVENTS RULE (2026-05-16)
- Atelier Gaming: must have gaming events + esports tournaments section
- Dreaming Anime: must have anime cosplay convention events section
- The Autodrome: must have F1 calendar + motorsport events section
- Update event dates periodically

## IMAGE SOURCE RULE (updated 2026-05-17)
- Amazon CDN ONLY for all product and editorial images — NO exceptions for the 13 empire brands
- Unsplash is APPROVED for: Pantriq, Prime Land Network, Deskwell, Paw Vault ONLY
- Pexels remains BLOCKED everywhere
- For product images: find the real ASIN on Amazon, use that product actual CDN image ID
- CDN IDs may 404 server-side (geo-block) but load correctly in browsers — that is acceptable
- DO NOT replace Amazon CDN IDs with Unsplash for any brand NOT in the approved list above

## DREAMING ANIME SOCIAL CONTENT RULE (2026-05-17)
- CURRENT CONTENT ONLY — only currently airing anime, this week's news, this week's rankings. Never use old or classic shows unless they have a current news hook (new season, film, announcement).
- Post type 1 — NEWS/TRENDING: Use latest anime news (Crunchyroll News, Anime News Network, Anime Corner weekly rankings) to create topical posts. Caption must be directly related to the news/anime shown.
- Post type 2 — TOP ANIME OF THE WEEK: Source weekly rankings from Anime Corner or MAL trending. Create a visual featuring the top anime with a branded caption.
- Post type 3 — CHARACTER/SCENE: Grab official promotional art or key art from a CURRENTLY AIRING anime only. Add a relevant, engaging caption tied to the character or scene — not generic.
- Post type 4 — PRODUCT POST: Use products from the Dreaming Anime shop (50 products available). Create a branded lifestyle image around the product, not just a plain product shot.
- Every image MUST use Dreaming Anime brand colors throughout
- Every image MUST have the Dreaming Anime circular logo watermarked on the photo (bottom-right or top-right, ~10-15% size, semi-transparent)
- Image sources: official anime promotional art, studio press art, MyAnimeList/AniList images, official anime social accounts — NO random fan art without attribution
- Caption style: punchy, fan-native, relevant to the image — not generic marketing copy
- Hashtag strategy: niche anime hashtags + show-specific tags + evergreen anime tags
- This same content system applies to all 13 brands — source content from the niche, use brand colors, watermark with brand logo

## IMAGE DESIGN RULES (2026-05-17 — NON-NEGOTIABLE)
- NO emojis or icons inside images — they render as blank boxes on most devices
- NO URLs inside images — the website/brand URL goes in the post caption only, never printed on the graphic
- Clean text only: brand name, headline, tagline, CTA text — no symbols that could break

## VISUAL CONTENT APPROVAL RULE (2026-05-17 — NON-NEGOTIABLE)
- Every AI-generated or created image/graphic for any empire brand MUST be uploaded to Google Drive first
- Drive folder: Empire Backups → Visual Content Pending Approval (create dated subfolder per session)
- After upload, send a WhatsApp message to 18683424101 with: brand name, image description, Drive link — and wait for approval
- Only AFTER explicit approval ("yes", "post it", "approved", or equivalent) may the image be posted to any social page, website, or shop
- NEVER auto-post visuals — approval is always required, no exceptions
- This applies to: social media posts, shop images, hero images, editorial graphics, ad creatives

## FORTUNE 500 SYSTEM MIRRORING RULE (2026-05-17)
- Daily task: identify and implement one Fortune 500 system per niche brand
- Reference file: site/assets/fortune500_systems.md (GitHub repo)
- Priority order for implementation: content architecture → SEO clusters → link-earning assets → UGC triggers → data reports
- Each system implemented must be documented in empire_memory.md under the brand it was applied to
- The goal is to build the SAME operational infrastructure as dominant niche brands — not just copy their look

## BLOG PUBLISHING RULE (updated 2026-05-17)
- Every brand and website gets 3 blog articles per week (up from 1)
- Scope: all 13 empire affiliate brands + Prisca Dezigns + Velloq + Cupyx + Rowcell + Karjov + Moblync + Calalloo + SeamRite Designs
- Rotation: can be sequential or random across brands — goal is each brand hits 3/week
- TIMING MUST FEEL HUMAN — do NOT post all 3 on the same day or at the same time:
  - Spread across Mon/Wed/Fri pattern OR Tue/Thu/Sat — never all same day
  - Post times: vary between 7am–10am, 12pm–2pm, and 6pm–9pm AST
  - Add ±15–45 min randomness to each post time so it never looks automated
- Article quality: 600–800 words, proper H2/H3 structure, meta tags, CTA, internal links
- Each article must serve a real search intent — not just filler
- Track published articles in empire_memory.md under each brand

## BRAND GEO RULE (2026-05-17 — NON-NEGOTIABLE)
- GEO sections on brand pages are FOR GLOBAL audiences — "Worldwide · Global Community" framing
- NEVER use Caribbean, Trinidad, Tobago, T&T, Trinidadian, or any location-specific text in brand copy
- Each brand has a tailored global geo section with a niche-specific headline + "Shop Global" CTA
- This rule applies to: all 13 niche brands and their shops, Prisca Dezigns, and all sub-brand pages

## SHELFLY BRAND (added 2026-05-17)
- Niche: Home essentials & toiletries
- URL: priscadezigns.org/shelfly/
- Brand color: Sage green (#7C9A7E) + Terracotta (#C4724A)
- Tagline: "Shelf Life, Elevated."
- Currently has NO product images — shop build needed
- Include in photo audit, HTTP audit, daily bestseller pull, blog rotation, and social posts
- Amazon bestseller category: Home & Kitchen + Beauty/Personal Care (toiletries)

## SOCIAL IMAGE CREATION RULE (2026-05-17 — NON-NEGOTIABLE)
- Images for social posts (Facebook, Instagram, Pinterest) are pulled from the RELEVANT niche website for each brand
- Sources per brand type:
  - Dreaming Anime: MyAnimeList, Crunchyroll official art, AniList
  - Gaming: Official game store pages (PlayStation, Xbox, Steam)
  - Skincare (Glow Protocol): Brand official websites — Sephora, Paula's Choice, The Ordinary, CeraVe, La Roche-Posay
  - Fragrance (Essence Elite): Brand press pages — Chanel, Dior, Jo Malone, YSL Beauty
  - Fashion/Bags (Couture Gallery): Brand press — Louis Vuitton, Gucci, Coach, Kate Spade
  - Watches (The Watch List): Watch brand press pages — Rolex, Omega, TAG Heuer, Seiko
  - Automotive (The Autodrome): Car manufacturer press/media sites — Ferrari, BMW, Mercedes, Porsche
  - Travel (The Escapist): Airline/hotel official photography — Marriott, Four Seasons, Emirates
  - Pets (Paw Vault): Brand official lifestyle shots — Chewy, PetSmart, Kong, Furbo
  - Eco/Sustainability (Verdant Co): Eco brand official campaign images — Grove, Method, Blueland
  - Fitness (Peak Fit): Brand press — Nike, Lululemon, Gymshark, Peloton
  - Shoes (Sole Prestige): Brand press — Nike, Jordan, New Balance, Adidas
  - Anime (Dreaming Anime): MyAnimeList, AniList, Crunchyroll News
  - Home/Toiletries (Shelfly): Method, Grove, Target Home Essentials, Apartment Therapy
  - Workspace (Deskwell): desk-well.com, Uplift Desk, Fully, Autonomous, Herman Miller editorial
  - Real Estate (Prime Land Network): Sotheby's Realty, Compass, Architectural Digest, Houzz
- Image style: Pinterest-inspired design, brand color overlay, bold caption text, brand watermark
- ALL created images MUST be saved to Google Drive (Empire Backups > Visual Content Pending Approval > dated subfolder) BEFORE any posting
- Send WhatsApp to 18683424101 with Drive link and wait for explicit approval
- NEVER auto-post any visual — approval always required
- Prime Land Network and Deskwell are included in ALL brand rotations (social, blog, audit, bestseller pull, photo audit)

## NICHE IMAGE SOURCING RULE (2026-05-17 — NON-NEGOTIABLE)
Each brand's social post background image MUST come from that brand's own niche only.
NEVER overlay one brand's caption on another brand's niche image.

Sources per brand:
- Atelier Gaming: store.playstation.com, xbox.com, store.steampowered.com
- Glow Protocol: paulaschoice.com, cerave.com, laroche-posay.us, theordinary.com
- Essence Elite: chanel.com, dior.com, yslbeauty.com, jomalone.com
- Peak Fit: nike.com, lululemon.com, gymshark.com
- Sole Prestige: nike.com, adidas.com, newbalance.com, jordan brand
- Quiet Luxury: architecturaldigest.com, elledecor.com, rh.com
- The Watch List: rolex.com, omega.com, tagheuer.com, seikowatches.com
- The Autodrome: ferrari.com, bmw.com, mercedes-benz.com, porsche.com
- The Escapist: fourseasons.com, marriott.com, emirates.com
- Verdant Co: grove.co, methodproducts.com, blueland.com
- Paw Vault: chewy.com, kong.com, petsmart.com
- Couture Gallery: louisvuitton.com, gucci.com, coach.com, katespadeny.com
- Dreaming Anime: myanimelist.net, crunchyroll.com, anilist.co
- Prime Land Network: sothebys.com, compass.com, architecturaldigest.com
- Shelfly: method.com, grove.co, target.com (home/toiletries section)
- Deskwell: upliftdesk.com, fully.com, autonomous.ai, hermanmiller.com
- Prisca Dezigns: agency/branding mockups, Pinterest design inspo folder (Drive: 1mURMX-BjHy4ZlevWFAUbqoLTRnZZVLIo)
- Seamrite Designs / NehNeh: fashion editorial, wearable art — NOT anime, NOT product shots from other niches

## PRISCA DEZIGNS URL RULE (2026-05-17)
- Correct URL is: priscadezigns.org (NOT .com)
- All social posts, ads, and website copy for Prisca Dezigns must use priscadezigns.org

## BRAND FONT RULE (2026-05-18 — NON-NEGOTIABLE)
- All brand social images must use brand-specific fonts, NOT the default PIL font
- Font priority: 1) brand's own font (fetch from live brand page CSS) → 2) matching Google Font → 3) closest system font (never plain PIL default)
- Font map (confirmed):
  - Dreaming Anime → Bangers (anime/bold display)
  - Atelier Gaming → Orbitron / Impact / Bebas Neue (thick blocky futuristic — NON-NEGOTIABLE for news posts)
  - The Watch List → Cormorant Garamond (luxury serif)
  - The Escapist → Playfair Display (travel/editorial)
  - Prime Land Network → Cinzel (premium real estate)
  - Glow Protocol → Raleway (clean beauty)
  - Essence Elite → Cormorant Garamond (luxury fragrance)
  - Couture Gallery → Playfair Display (fashion luxury)
  - Quiet Luxury → Cormorant Garamond (interior luxury)
  - Peak Fit → Montserrat ExtraBold (fitness/energy)
  - Sole Prestige → Bebas Neue (streetwear/bold)
  - Verdant Co → Nunito (eco/friendly)
  - Paw Vault → Nunito (pets/friendly)
  - The Autodrome → Orbitron (automotive/speed)
  - Tech Scout HQ → Exo 2 (tech/futuristic)
  - Deskwell → Inter (clean workspace)
  - Shelfly → Nunito (home/friendly)
  - Prime Land Network → Cinzel Decorative
- Download fonts via Google Fonts API or use wget to /tmp/ before rendering
- Circular logo rule still applies (always round crop)

## BRAND IMAGE PROMPTS — LOCKED (2026-05-18, NON-NEGOTIABLE)
Use these exact prompts per brand unless Prisca gives a new one. Never substitute.

- **Dreaming Anime**: A vibrant and sleek anime-style background featuring explosive motion lines and abstract geometric shapes. Use a strict, high-contrast color palette of deep matte black and electric neon orange. Leave the center of the image empty with a subtle dark vignette. Designed as a promotional social media graphic for anime news with space for text overlay.
- **Prime Land Network (listing post)**: A vibrant, photorealistic, and sunlit photo of a beautiful modern home with a lush garden in any country. Wide-angle, 4:3 ratio, shot from the front exterior. Leave a semi-transparent dark background block in the upper third of the image for a massive, bold, all-caps text overlay that reads: JUST LISTED. At the bottom, in a smaller bold font, place the text with information on where to purchase it. Text overlay: upper third = JUST LISTED (massive bold all-caps white on dark band), lower third = property details + priscadezigns.org/prime-land-network/.
- **Prime Land Network (news/market update post)**: A high-quality, professional, and trustworthy stock photo featuring a modern sleek house model or keys on a wooden desk. Left third of image = negative space (solid or blurred neutral background) for massive clean block-letter text. Text overlay LEFT side: REAL ESTATE MARKET UPDATE (huge, bold block letters) + below it: Your dream home in [Location] is waiting. Read our latest news! (smaller clean font).
- **Moblync**: Hyper-realistic, overhead flat-lay of a premium app developer's desk. The desk is dark walnut wood. On the desk: a glowing iPad Pro showing intricate app wireframes and modular UI components, a neatly placed keyboard, a cup of coffee with steam rising, and a smartphone showing a fully polished, colorful app home screen. Warm cinematic lighting, natural shadows, sharp focus on the devices, 8k resolution, photorealistic, depth of field, minimalist and professional. Also cross-posts to Prisca Dezigns page.
- **Karjov**: A cinematic, ultra-realistic, hyper-detailed photograph of a sleek futuristic workspace at night. A young, professional business owner is confidently smiling at their glowing laptop screen. In the background, there is a beautifully glowing, translucent holographic overlay showing glowing node-based connection lines and gears representing automated tasks, suggesting seamless workflows. Warm ambient office lighting blended with a cool neon blue tech glow. 8k resolution, shot on 35mm lens, photorealistic, photoblog style.
- **Prisca Dezigns**: Create a hyper-realistic commercial ad featuring a sleek, minimalist futuristic workspace with warm, indirect lighting. In the foreground, a beautifully crafted 3D transparent device floats, displaying a stunning, modern SaaS website interface with vibrant, glowing gradients, glassmorphism UI elements, and glowing data charts. Cinematic lighting, soft shadows, 8k resolution, shot on 35mm lens, photorealistic, premium agency vibe. USE PURPLE AESTHETIC (deep purple/violet gradient) for color treatment. Scheduled for 2026-05-19.
- **Rowcell**: Hyper-realistic, high-angle flat lay of a modern workspace. A person's hands are typing on a sleek keyboard on one side. On the other side, glowing holographic data nodes and structured spreadsheet charts float slightly above the desk, blending modern digital technology with an organized office environment. Neon blue and crisp white lighting, commercial technology aesthetic, photorealistic, highly detailed.
- **NehNeh / Seamrite Designs**: A dynamic fashion advertisement showing a hyper-realistic athletic model mid-twist jump, light trails following her limbs. She is wearing iridescent metallic runner tights and a holographic white cropped tech hoodie. Background features a prism-shifting, hot-magenta to sapphire gradient with refracted lens flares and dramatic floating geometric art forms. Bold, high-energy fashion aesthetic, glossy skin tones, 8K, cinematic lighting, dramatic studio smoke effects.
- **Tech Scout HQ**: Extreme macro shot. A sleek [Product Name] sitting center frame on a dark matte surface. Deep black background with electric blue neon light rings glowing behind the product. Particle effects, lens flare, cinematic dramatic lighting, sharp product focus, photorealistic, 8k, editorial tech ad style, shot on DSLR --ar 9:16
- **Glow Protocol (product hero)**: Extreme macro shot. A sleek, glossy bottle of [Product Name] sitting in the center of a pale pink, minimalist background with tiny, floating water droplets around it. Bright and airy aesthetic, soft diffused studio lighting, sharp skin-level focus, photorealistic, 8k, editorial beauty ad style, shot on DSLR --ar 9:16
- **Glow Protocol (Prompt A — Skincare Trends)**: Minimalist 3D editorial, soft beige+pastel pink bg, serum bottle on marble pedestal with cucumber slices + water droplets. PIL center: SKINCARE TRENDS / WHAT'S NEW. Semi-transparent band mandatory.
- **Glow Protocol (Prompt B — Haircare Event)**: Vibrant close-up of glowing silky hair, golden hour, editorial photography. PIL center: NEW HAIRCARE EVENT / THE DROP OF THE YEAR! Gold or white on warm band.
- **Glow Protocol (Prompt C — Self-Care Sunday)**: Tranquil flat-lay on pastel pink — candle, moisturizer, jade roller, towel. PIL top: SELF-CARE SUNDAY. Pastel band behind text.
- **Glow Protocol (Prompt D — Men's Grooming)**: Dark teal/charcoal bg, beard oil + face wash on dark slate. PIL top: MEN'S GROOMING / TRENDS & NEWS in bold white block. Dark bg = no band needed.
- **Glow Protocol (Prompt E — All-In-One)**: Split-screen men's + women's products. PIL center: ALL-IN-ONE SELF CARE. Rotate all 5 for variety. Font: Montserrat/Lato/Futura — never script.
- **Pixelcut workflow (Glow Protocol + all beauty brands)**: If AI misspells text in generated image, erase in Pixelcut AI Photo Editor and retype correct overlay manually.
- **Couture Gallery (news/trends post)**: Sleek cinematic 4K editorial — luxury designer handbag on polished marble pedestal, sunlit minimalist studio, soft natural lighting, high-end fashion magazine cover style. PIL overlay: bold heavy white sans-serif at TOP or BOTTOM (keep bag as central focal point). Font: Montserrat, Futura, or Helvetica Black. Colors: white on dark leather / gold (#D4AF37) or charcoal on light bags. Rotate text: LUXURY BAG TRENDS / THE IT-BAG OF THE SEASON / UNBOXING THE FUTURE / ICONIC SILHOUETTES / THE NEW LUXURY — or swap with actual news headline.
- **Couture Gallery (product — hero)**: Photorealistic, high-end commercial ad of a [bag style]. The purse is artfully arranged on a [environment] surrounded by [background details]. Sunlight filters through leaves creating a warm, golden hour glow. Hyper-detailed, showing the rich texture and precise metal clasps. Blurred natural background, cinematic depth of field, vibrant but serene, 8k, photorealistic --ar 9:16
- **Quiet Luxury (product/lifestyle)**: Cinematic commercial interior photography, 8k resolution, photorealistic. Wide-angle shot of a high-end luxury living room featuring [hero product]. Polished concrete flooring, abstract canvas painting on the wall. Dramatic and moody lighting from a sleek brushed-brass floor lamp. High-end, sophisticated lifestyle aesthetic --ar 4:5
- **Quiet Luxury (news/trends post)**: A trending, ultra-luxurious home decor magazine spread. A modern living room with plush velvet sofas, marble coffee tables, and elegant arched doorways. Natural sunlight streaming through large windows. Bold, massive, centered typography overlay: "TOP 2026 DECOR TRENDS" (headline) + "Minimalist Luxury & Earthy Tones" (subtext). Text overlays: vibrant, large, legible, sleek modern sans-serif. High-fashion, photorealistic, 8k, cinematic lighting. Replace headline/subtext at runtime with actual news via PIL overlay.
- **Atelier Gaming (news/breaking post)**: High-energy cinematic gaming news. Background = striking in-game screenshot with dark gradient overlay. PIL overlay top/center: BREAKING: [ACTUAL HEADLINE] in massive neon-glowing red (#E53935) or white with red outline, blocky futuristic font (Orbitron/Impact/Bebas Neue), drop shadow. Below: 3-4 word subline in white/yellow. Max 6 words on image total. Dark vignette mandatory so text pops. All details go in caption only.
- **Dreaming Anime**: A young female protagonist with glowing magenta eyes and silver hair standing in a highly detailed bustling cyberpunk Tokyo street. Masterful blend of sleek modern anime and photorealistic live-action. Photorealistic textures on hair/clothing, exaggerated expressive anime eyes. Shot on Arri Alexa Mini, 85mm lens, f/1.8, cinematic shallow depth of field. Neon reflections on wet asphalt, volumetric lighting, glowing atmospheric haze, dynamic lens flares. Character looks directly at camera with a confident smirk. Vibrant colors, ultra-HD 16K. NOTE: This prompt is for brand/character posts ONLY — news, events, trending anime, weekly rankings always use real sourced images from MAL/Crunchyroll/AniList.
- **Sole Prestige (Prompt A — Studio/Heels)**: Designer heels on polished marble pedestal, soft moody dark gray bg, side studio lighting, glossy + stitching detail. Text: elegant bold white top/bottom, no band needed on dark bg. Montserrat ExtraBold or Futura Bold.
- **Sole Prestige (Prompt B — Action/Sneakers)**: First-person POV, retro sneakers on wet reflective city pavement, neon city bokeh. Text: bold white with dark stroke top, semi-transparent band. Bebas Neue or Montserrat.
- **Sole Prestige (Prompt C — Nature/Boots)**: Leather boots on mossy log, sun-dappled enchanted forest, golden hour canopy light. Text: cream or white bold top/bottom, dark band in foliage area.
- **Sole Prestige (Prompt D — Minimalist)**: White sneakers floating mid-air, pastel sage green bg, floating leaves. Text: clean black or charcoal bold on clean pastel bg, no band needed. Futura Bold or Helvetica Neue Black.
- Rotate A/B/C/D by shoe type: A=heels/formal, B=sneakers/casual, C=boots/sandals, D=minimalist.
- AI shoe tips: pair fix = add "perfectly mirrored pair" / always specify material (suede, patent, mesh) / surface context adds depth (marble, concrete, wood).
- **Essence Elite**: (add when prompted by Prisca)
- **Peak Fit**: (add when prompted by Prisca)
- **The Watch List (Prompt A — Titanium)**: Cinematic macro of sleek titanium watch on dark marble slab, studio lighting, 8k. Negative space LEFT. Text center: THE TITANIUM REVOLUTION (bold white sans-serif). Text bottom: Top Watch Trends of the Year (smaller).
- **The Watch List (Prompt B — Retro)**: High-contrast flat-lay, vintage gold digital watch + retro cassettes + sunglasses on vibrant orange bg. Distressed typography across image: RETRO TECH IS BACK. Bottom-right: FALL 2026 WATCH TRENDS.
- **The Watch List (Prompt C — Mechanical)**: Close-up skeleton watch gears, moody deep blue + gold palette. Neon-style typography: MECHANICAL MARVELS. Bottom-center: Inside the 2026 Trends.
- Rotate A/B/C for variety. Replace overlay text at runtime with actual news headline via PIL. Keep layout per prompt (center / bottom-right / bottom-center).
- **The Autodrome (news/breaking post)**: Dynamic coastal highway sports car, BREAKING NEWS top (massive bold all-caps), actual headline bottom in teal #00B4A6 block letters via PIL. Replace bottom text at runtime.
- **The Autodrome (Prompt A — Fashion Editorial)**: Matte-black luxury car, stylish person leaning on hood, urban dusk bokeh, golden hour. Text in negative space (not over car), Montserrat Bold, teal accent.
- **The Autodrome (Prompt B — Action Shot)**: Crimson supercar low-angle coastal highway, motion blur, lens flare. Bold teal headline top or bottom, dark gradient band, Bebas Neue or Impact.
- **The Autodrome (Prompt C — Night City)**: Luxury hypercar outside glass skyscraper, neon reflections on wet pavement. Neon teal glowing text bottom-third, Orbitron or Bebas Neue — city reflections are the hero.
- **The Autodrome (Prompt D — Studio Display)**: Luxury EV in minimalist white studio, soft geometric shadows, poster-style. Teal or charcoal headline centered top or bottom, Montserrat or Futura Black.
- Rotate A/B/C/D: action for reveals, studio for EVs, night for luxury, editorial for fashion. Angle keywords: low angle / eye-level / close-up macro. Lighting: golden hour / neon glow / studio softbox. NEVER place text over the car's hero lines.
- **The Escapist (Prompt A — airplane sunset)**: Sleek airplane flying through brilliant sunset over tropical coastline. PIL overlay top: BREAKING: TOP TRAVEL TRENDS UNVEILED (massive bold all-caps white). Bottom: short subtitle (max 12 words). Semi-transparent dark band behind both text blocks.
- **The Escapist (Prompt B — Mediterranean beach)**: Pristine crystal-clear Mediterranean beach with dramatic cliffs, vibrant warm palette. PIL overlay center: 2026'S TOP HIDDEN GEMS (massive extra-bold, yellow or white with shadow). Dark semi-transparent shape behind text.
- **The Escapist (Prompt C — flat-lay desk)**: Minimalist desk flat-lay with vintage passport, retro compass, smartphone. PIL overlay center: THE FUTURE OF TRAVEL: WHAT YOU NEED TO KNOW (clean bold black text on semi-transparent white geometric box).
- Rotate A/B/C. Replace overlay text at runtime with actual news headline via PIL. Max 2 short lines on image — all details in caption.
- **Verdant Co**: (add when prompted by Prisca)
- **Paw Vault (Prompt A — product)**: Vibrant high-contrast professional product photo in bright clean setting. PIL: bold rounded sans-serif [KEY BENEFIT or CTA] — sky blue #50A0FF or white, Nunito ExtraBold or Fredoka One, drop shadow if bg is busy.
- **Paw Vault (Prompt B — event/action)**: Exciting action-shot of happy pet in lively outdoor/event setting. PIL: festival-style bold typography [EVENT NAME] oversized + [date & location] smaller. Never text over the pet — use sky, wall, or blurred bg area.
- **Paw Vault overlay rules**: Drop shadow/glow on busy backgrounds. Rule of thirds — text in empty spaces only. Light photo → dark text / dark photo → white or neon text. Rounded bold font only (Nunito, Fredoka One, Poppins Bold). Max 2 lines on image.
- **Prime Land Network**: Hyper-realistic luxury real estate photography. Stunning modern executive mansion exterior, infinity pool overlooking ocean, panoramic water views, golden hour lighting, manicured landscaping, grand entrance, glass walls, architectural masterpiece, cinematic depth of field, 8k, ultra-detailed, professional real estate ad photography. Ad copy template: luxury real estate marketing expert tone — attention-grabbing hook, 3 key selling points, CTA to book a private viewing. Target: affluent professionals and growing families.

## BRAND LOGO WATERMARK RULE (2026-05-18, NON-NEGOTIABLE)
- ALL brand social images MUST have the real brand logo watermarked on the image
- Logo files live in: /app/state/f01e5bf5-d543-4a86-92a9-b8f6da449c65/work/logo_review/
- Logo map:
  - Tech Scout HQ → tech-scout.png
  - Glow Protocol → glow-protocol.jpg
  - Couture Gallery → couture-gallery.jpg
  - Quiet Luxury → quiet-luxury.jpg
  - Atelier Gaming → atelier-gaming.jpg
  - Dreaming Anime → dreaming-anime.jpg
  - Sole Prestige → sole-prestige.jpg
  - Essence Elite → essence-elite.jpg
  - Peak Fit → peak-fit.jpg
  - Paw Vault → paw-vault.jpg
  - Verdant Co → verdant-co.jpg
  - The Autodrome → the-autodrome.jpg
  - The Escapist → the-escapist.png
  - The Watch List → the-watch-list.png
  - Prime Land Network → prime-land-network.jpg
- Logo placement: TOP-LEFT corner, ~15% of image width, semi-transparent (opacity 85%)
- NEVER use dot + text placeholder — always use the real PNG/JPG logo file
- If logo file missing: fetch it from the live brand page before overlaying
- Before sending any image to WhatsApp, verify logo rendered correctly (file size >80KB = good sign)

## BRAND PROMPT ARCHIVE RULE (2026-05-18 — NON-NEGOTIABLE)
- Every prompt Prisca sends for any brand MUST be saved immediately to:
  1. brand_prompts.md in the workspace (primary archive)
  2. MY_RULES.md BRAND IMAGE PROMPTS section (secondary)
- Prompts are used DAILY — always pull the saved prompt, never improvise
- New prompt from Prisca = replace old one in both files immediately
- All prompts backed up to Google Drive on every backup run (include brand_prompts.md in backup list)
- Sub-lines on images must always be SHORT — wrap_text handles overflow but keep sub_line under 45 chars per segment
- Atelier Gaming accent: RED #E53935 dominant (per color rule)

## DESKWELL PLATFORM RULE (2026-05-18)
- Deskwell posts to **Pinterest only** — no Facebook page set up yet
- Awaiting email from Deskwell contact before creating FB page
- Do NOT include Deskwell in Facebook posting runs until further notice

## EARLY SIGNAL IG POSTING RULE (2026-05-18 — NON-NEGOTIABLE)
- Every pre-event blog, trend alert, and early signal post MUST go to Instagram, not just Facebook
- The pipeline: generate brand image → upload to Drive → get approval → post to FB + IG simultaneously via daily_poster.py
- For early signal posts with brand-generated images (not Amazon CDN): use `post_early_signal_to_ig(brand_name, image_url, caption)` in daily_poster.py
- The `find_ig_safe_image` function now accepts: Amazon CDN, Google Drive/lh3.googleusercontent.com, googleapis.com, priscadezigns.org — all trusted
- NEVER post early signal content to FB only — IG is always included
- All 18 IG accounts are connected with tokens in ig_accounts.json on GitHub
- IG posting uses the Facebook Graph API v19.0 — two-step: create container → publish

## EMPIRE NIGHTLY FIRST-MOVER RULE (2026-05-18 — NON-NEGOTIABLE)
- Every night at 12:05 AM AST, scan ALL 21 empire brands for emerging trends in their niche
- For every genuine signal found (< 7 days old, not already covered):
  1. Publish a pre-trend SEO blog to GitHub (site/[slug]/blog/[signal-slug]/index.html)
  2. Update brand index.html meta keywords + description + og: tags with trending terms
  3. Find top Amazon affiliate products matching the trend (tag: priscadezigns-20)
  4. Draft social caption ready for FB + IG posting
- Send full WhatsApp report to 18683424101 every night without exception
- The empire must be FIRST in every niche — not reactive, PREDICTIVE
- ALL 21 brands covered: Dreaming Anime, Atelier Gaming, Sole Prestige, Glow Protocol,
  Essence Elite, Peak Fit, Quiet Luxury, The Watch List, The Autodrome, The Escapist,
  Verdant Co, Paw Vault, Couture Gallery, Prime Land Network, Tech Scout HQ, Shelfly,
  Deskwell, Pantriq, Prisca Dezigns, Velloq, Moblync, Cupyx, Rowcell, Karjov,
  Calalloo, Seamrite Designs, Riddiim
- Signal sources: Reddit (niche subreddits), Serper web search (time_period=week),
  Amazon Movers & Shakers, brand press rooms, patent filings, keynote schedules
- Blog must include: year 2026, trend keyword, affiliate CTA, internal brand link
- Meta update must include: keywords, description, og:title, og:description

## DAILY NEWS POST RULE (2026-05-18 — NON-NEGOTIABLE)
- Every brand must have at least 1 post per day based on the LATEST news or events in its niche
- Use the brand news/event prompt (not the product prompt) to generate the background image
- After generating the background, overlay: headline (max 8 words) + subline (source/date) + logo watermark
- NEVER post a blank background — text overlay is mandatory for every news image
- News sources: Tech Scout HQ=TechCrunch/Verge, Dreaming Anime=Crunchyroll/ANN, Gaming=IGN/Kotaku, Skincare=Allure/Byrdie, Fragrance=Fragrantica, Watches=Hodinkee, Auto=Motor Trend/F1.com, Travel=CNT/Lonely Planet, others=web_search time_period=week
- After overlay: compress 800x800 quality 72, push to site/assets/social-imgs/[slug]-ig.jpg, get approval, post FB+IG

## PIXELCUT FALLBACK RULE (2026-05-18 — ALL BRANDS)
- If AI image generator produces misspelled or garbled text on the image: use **Pixelcut AI Photo Editor** to erase the AI text, then type in the correct overlay manually
- This applies to ALL brands — not just beauty/skincare
- Always check text accuracy before sending to Drive for approval

## TEXT OVERLAY SIZE RULE (2026-05-18 — NON-NEGOTIABLE)
- Text overlays must be LARGE and BOLD — matching the scale seen in the Pinterest inspiration folder
- Reference: Drive folder 1mURMX-BjHy4ZlevWFAUbqoLTRnZZVLIo (Prisca Dezigns Pinterest inspo)
- Minimum font sizes for an 800x800 image:
  - HEADLINE: 80–100px bold (2–3 lines max, centered or left-aligned)
  - SUBLINE: 36–44px regular (1–2 lines)
  - SOURCE/DATE: 24–28px light or regular
  - Logo watermark: 12–15% of image width
- Word wrap is MANDATORY — split long headlines across lines, never let any word get cut off at edge
- Wrap algorithm: measure each word with font.getbbox(), build lines that fit within (image_width - 80px padding)
- If a single word is wider than the image, reduce font size until it fits
- After wrapping, vertically center the text block in its designated band (top third for headline, bottom third for subline)
- Test: before saving, verify no text extends beyond image boundaries
- NEVER use the PIL default font — always load a TTF font (DejaVu, Google Font, or brand font)
- Busy background = ALWAYS add solid or semi-transparent shape behind text so big fonts pop
- Font style: modern sans-serif or bold slab (Montserrat, Futura, Helvetica style) — NOT decorative scripts for news posts
- Max 2 short lines on image — all details go in caption, NOT on the image
- Text contrast check: white on dark, black on light, yellow with shadow on colorful — always legible at thumbnail size

## IG-READY IMAGE HOSTING RULE (2026-05-18 — NON-NEGOTIABLE)
- Every social image created for posting MUST be pushed to GitHub at:
  site/assets/social-imgs/[brand-slug]-ig.jpg
- Public IG-safe URL format:
  https://raw.githubusercontent.com/priscadezigns9/priscadezignswebsite/main/site/assets/social-imgs/[brand-slug]-ig.jpg
- Instagram Graph API requires a public URL — Drive links and local files DO NOT work
- Compress images to ~800x800 JPEG quality 72 before push (keeps payload under shell arg limit)
- Payload must be written to workspace JSON file first, then used with $(cat file) in curl
- After approval, use the raw.githubusercontent.com URL as image_url in IG post_to_instagram()
- This applies to ALL brand social images going forward
