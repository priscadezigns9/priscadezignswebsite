// content.js - Priscion Price Scout

(function() {
    console.log("[Price Scout] Priscion Price Scout Active.");

    // 1. Detect Product Category for Shop Mapping
    function getProductCategory() {
        const text = document.body.innerText.toLowerCase();
        for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
            if (keywords.some(keyword => text.includes(keyword))) {
                return category;
            }
        }
        return "fashion"; // Default
    }

    const currentCategory = getProductCategory();
    const shopUrl = SHOP_MAP[currentCategory] || SHOP_MAP["fashion"];

    // 2. Extract Price
    function extractPrice() {
        let price = null;
        const selectors = [
            '.a-price-whole', '.priceToPay', '#priceblock_ourprice', 
            '.price-characteristic', '.offer-price', '.x-price-primary'
        ];
        
        for (const selector of selectors) {
            const el = document.querySelector(selector);
            if (el) {
                price = parseFloat(el.innerText.replace(/[^0-9.]/g, ''));
                if (price) break;
            }
        }
        return price;
    }

    const currentPrice = extractPrice();

    // 3. Coupon Finder Logic
    function detectCheckoutPage() {
        return window.location.href.includes("checkout") || 
               window.location.href.includes("cart") || 
               window.location.href.includes("basket");
    }

    if (detectCheckoutPage()) {
        const hostname = window.location.hostname.replace("www.", "");
        const coupons = COUPON_DB[hostname] || GENERIC_COUPONS;
        
        console.log(`[Price Scout] Checkout detected on ${hostname}. Found ${coupons.length} potential coupons.`);
        
        // Show a small overlay for coupons
        const overlay = document.createElement("div");
        overlay.style.cssText = "position:fixed;bottom:20px;right:20px;background:#0A0A0A;color:#FFD700;padding:15px;border:2px solid #FFD700;z-index:999999;font-family:Inter,sans-serif;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,0.5);";
        overlay.innerHTML = `
            <div style="font-weight:bold;margin-bottom:5px;">Priscion Coupon Scout</div>
            <div style="font-size:12px;margin-bottom:10px;">Found ${coupons.length} coupons for this site.</div>
            <button id="apply-coupons-btn" style="background:#FFD700;color:#000;border:none;padding:5px 10px;cursor:pointer;font-weight:bold;width:100%;border-radius:4px;">Auto-Apply Coupons (Pro)</button>
        `;
        document.body.appendChild(overlay);

        document.getElementById("apply-coupons-btn").onclick = () => {
            window.open("https://priscadezigns.org/pricescout/pro", "_blank");
        };
    }

    // 4. Communication with Popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "getProductInfo") {
            sendResponse({
                price: currentPrice,
                category: currentCategory,
                shopUrl: shopUrl,
                url: window.location.href
            });
        }
    });

})();
