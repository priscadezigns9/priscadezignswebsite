# MY_RULES.md - Your Rules

## Atelia Gaming Calibration Standard (v1.0)
- **High-Fidelity Gameplay:** The "Galactic Hoops" game is now calibrated to a specific horizontal-leap wide-arc physics model.
- **Hoop Geometry:** Standardized at 420px diameter with a 12px rim.
- **Jump Physics:** Max vertical height 220px, horizontal surge (+4px up, -2px down), 25ms interval for hangtime.
- **Collision Window:** Tight 200px vertical clearance for chibis.
- **Visual Identity:** All characters (Astra, Mimi, Echo, Nova) MUST face right for gameplay.

## UI & Architecture Preservation (Sovereign UI Protocol)
- **UI Immutability:** Never modify, overwrite, or "standardize" the existing UI, themes, or layouts of any brand website (Atelia, AI Labs, etc.) without explicit authorization.
- **Visual Identity Locking:** Established visual identities (e.g., Atelia's Dark/Red theme, AI Labs' White/Professional theme) are strictly locked. Any infrastructure updates (Supabase, scripts, logic) must be injected without altering the CSS or HTML structure of the visual front-end.
- **Asset Integrity:** Never swap high-fidelity assets (Astra 3D, Mimi Chibi, etc.) for generic placeholders.
- **Cross-Brand Isolation:** Ensure that updates meant for one subdirectory (e.g., `/ateliagaming/`) never bleed into the root (`/`) or other brand directories.

## Security Standards
- **Never Print Secrets:** Never run `grep` or `cat` on files that might contain API keys or PATs in a way that prints the result to the conversation log. Use `grep -q` or internal checks if necessary, but never expose the raw string.
- **Credential Tool Only:** Always use the `credentials` tool for managing secrets. Never hardcode them into local workspace files like `token.txt`.

## Branding Isolation (Sovereign Privacy Protocol)
- **Zero Parent Mention:** Never mention "Priscion" or the parent agency's name within the user-facing content of any brand platform (D' Panyard, Calalloo, Dreaming Anime, etc.). All platforms must operate as sovereign, independent entities to the end-user.

## Social Media Posting Protocol
- **Deduplication Check:** Before any social media post (Facebook, Instagram, Threads) is fired by a cron job or manual action, I MUST check `SOCIAL_POST_ARCHIVE.json`.
- **Identity Hash:** Every post is tracked by its `caption + media_url`. If the content matches an entry in the archive, the post MUST be skipped to prevent duplication.
- **Archive Update:** Successful posts must be immediately logged in `SOCIAL_POST_ARCHIVE.json` with the timestamp.
- **No Overlap Rule:** Ensure that "Daily Scan" and "Nightly Scan" crons do not target the same signal within a 24-hour window.
- **Dreaming Anime Signature:** Every post for **Dreaming Anime** MUST include a reference to the official website: **dreaminganime.com**.

## Theological Alignment
- **The Way Made Known Identity:** This is strictly a **Bible Christianity**, **Evangelical**, or **Pentecostal** mission.
- **Catholicism Prohibition:** NEVER mention the Pope, Roman Catholicism, or Catholic-specific traditions/encyclicals in relation to this brand.
- **Focus:** Proclamation of the Gospel through analytical faith, scripture-based evidence, and the "Cohesion of Truth" within the Evangelical/Pentecostal tradition.

## Empire Cohesion
- **The One Empire Rule:** Never treat "The Way Made Known" and "Priscion" as separate entities. They are a single unit where the business funds the mission, and the mission provides the "skeleton" for the business.
- **High-Fidelity Proclamation:** Every digital asset for the NGO must match or exceed the design quality of the business. The Gospel deserves excellence.
- **Analytical Faith:** Maintain the focus on "Analytical Thinking," "Cohesion of Truth," and "Evidence-Based Proclamation" as defined by the user.
- **Niche Fidelity:** Ensure every brand post strictly adheres to its designated niche (e.g., Couture Gallery is exclusively for purses and bags).

## Communication Style
- **Meaningful vs. Idle:** Avoid generic "assistant" filler. The user dislikes idle talk. Be concise, meaningful, and respect their 12-hour work cycles.
- **Mirroring Joy:** When the user expresses spiritual fulfillment or joy, acknowledge it with warmth and alignment, not just technical confirmation.
- **Empire Links:** All brand cards and affiliate links in the Empire Network (e.g., brands/index.html) MUST open in a new tab (`target="_blank"`).

- **High-Fidelity Mascot Scaling:** Mascots (Mimi, Astra, Nova) must never be "small" or "widget-style." They must be the size of the section they occupy (e.g., full-width/hero scale) to maintain the high-fidelity aesthetic.

## Mascot Integrity & Restriction Protocol
- **Mascot Locking:** Only **Dreaming Anime** (Mimi) and **Atelia Gaming** (Astra & Nova) are authorized to use high-fidelity mascots.
- **Mascot-Free Brands:** All other 16+ brands in the Priscion Empire must remain mascot-free. Their "Gold Standard" is defined by technical inventory density (20 items), high-fidelity grid layouts, and niche-specific SEO metadata.
- **No Substitutions:** Never use generic avatars or non-authorized character assets for brands outside of DA and Atelia.

## Empire Safeguards (Sentinel Protocol)
- **Minimum Inventory Threshold:** No shop page (`/shop/index.html`) may ever be pushed or updated if it contains fewer than 20 product assets. Any script attempting to reduce counts below this threshold must be aborted immediately.
- **Pre-Update Backups:** Before any mass-modification of HTML files (standardization, logo updates, link fixes), a local backup of the current high-fidelity state must be created in `backup_files/`.
- **Logic-First Content:** Descriptions and technical data must remain at "Doctor-level" depth. Never replace specific technical diagnostics with generic marketing text.
- **Sentinel Audit:** A periodic scan of all 18 brand directories must be performed to verify file integrity (non-zero size) and product density.
- **Blackout Prevention:** Never push a shop with a "blank" or "only navigation" state. If a product fetch fails, the script must revert to the last known good archival state.

## Sovereign Map & Discovery Protocol (v1.0)
- **Universal Coordinate Lock:** All map embeds must use the "No-Key Sovereign Format" (`https://www.google.com/maps?q={query}&ll={lat},{lng}&z=15&output=embed`).
- **Precision LL Override:** To prevent "Ghost Reverting" to defaults (e.g., Port of Spain), the `ll` (Latitude/Longitude) parameter MUST be explicitly injected alongside the search query.
- **Discovery Mode:** Queries for ingredients or markets must be localized using the user's precision coordinates to ensure 10k-user scalability without API rate-limiting.
- **UI Protection:** Map frames must remain hidden behind a high-fidelity loader until the coordinate-locked URL is fully constructed.

## AI Heritage Scanner Mandate
- **Culinary DNA Only:** The scanner must prioritize "Sweets and Dishes" across all global cuisines.
- **Sovereign Guard:** Any non-culinary upload must be rejected with a clear "Non-culinary item detected" message.
- **Smart Isolation:** The analysis engine must be capable of isolating culinary subjects from background noise (people, pets, clutter) to ensure results are based strictly on the dish or sweet.
- **Ingredient-Level Analysis:** Results must include individual caloric breakdowns for every identified ingredient, not just a total sum.
- **Zero-Branding Mode:** The analysis UI must remain neutral, using "Sovereign Heritage Engine" or "Initializing Analysis" rather than mentioning the assistant's name.

## Financial Watchdog Standard
- **Registry Integrity:** Every bank/financial check must be logged with a unique `REG-FIN-XXX` ID in the master registry.
- **Persistence:** Missed repayment flags (e.g., Carilend) must persist in the assistant's memory and subsequent reports until explicitly resolved.

## High-Fidelity Shop Deployment Protocol
- **Template Literal Safety:** When pushing HTML updates via `bash` heredocs (e.g., `cat <<EOF`), always use **`cat <<'EOF'`** (quoted EOF) to prevent the shell from evaluating `${variable}` syntax meant for the browser. Failure to do so results in empty `src` and `href` attributes.
- **Verified High-Res Images:** Only use Amazon image URLs that end in `_AC_SL1500_.jpg` or `_SL1500_.jpg`. These ensure the "Gold Standard" clarity and prevent blurry or thumbnail-sized images from appearing.
- **Cache-Buster Push:** When updating shop code, always include a minor structural change or a cache-buster parameter if possible to force CloudFlare/browsers to bypass cached versions.

## Empire Inventory Management
- **Supabase Source of Truth:** All product data must reside in `public.empire_inventory` on the Trogon project. Never hardcode products in HTML.
- **Brand Isolation:** Always filter fetches by `brand` to ensure no cross-brand contamination (e.g., Naruto appearing in Atelia).
- **Verified ASIN Mapping:** Before adding products, manually verify the Image ↔ Title ↔ Link mapping. Mismatches must be purged immediately.



## Rebranding & Identity Standard
- **Brand Authority:** Priscion is now **Priscion**. All future high-fidelity signals and Empire references must utilize "Priscion" to reflect the AI evolution.
