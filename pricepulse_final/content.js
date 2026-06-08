const AFFILIATE_TAG = 'priscadezigns-20';

// 1. Affiliate Tag Injection
function injectAffiliateTag() {
  const url = new URL(window.location.href);
  if (isAmazonProductPage(url.href) && !url.searchParams.has('tag')) {
    url.searchParams.set('tag', AFFILIATE_TAG);
    window.history.replaceState({}, '', url.toString());
  }

  // Intercept all Amazon links
  const links = document.querySelectorAll('a[href*="amazon."]');
  links.forEach(link => {
    try {
      const linkUrl = new URL(link.href);
      if (isAmazonDomain(linkUrl.hostname) && !linkUrl.searchParams.has('tag')) {
        linkUrl.searchParams.set('tag', AFFILIATE_TAG);
        link.href = linkUrl.toString();
      }
    } catch (e) {
      // Ignore invalid URLs
    }
  });
}

function isAmazonDomain(hostname) {
  const domains = ['amazon.com', 'amazon.co.uk', 'amazon.ca', 'amazon.com.au'];
  return domains.some(d => hostname === d || hostname.endsWith('.' + d));
}

function isAmazonProductPage(url) {
  return /\/dp\/[A-Z0-9]{10}/.test(url) || /\/gp\/product\/[A-Z0-9]{10}/.test(url);
}

// 2. Product Detection
function extractProductData() {
  const title = document.querySelector('#productTitle')?.innerText.trim();
  const asinMatch = window.location.href.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
  const asin = asinMatch ? asinMatch[1] : null;

  // Pricing (Selectors can be tricky on Amazon, using common ones)
  const priceSelectors = [
    '.a-price .a-offscreen',
    '#priceblock_ourprice',
    '#priceblock_dealprice',
    '.priceToPay',
    '#corePrice_feature_div .a-offscreen'
  ];
  
  let currentPriceStr = '';
  for (const selector of priceSelectors) {
    const el = document.querySelector(selector);
    if (el) {
      currentPriceStr = el.innerText.trim();
      break;
    }
  }

  const originalPriceSelectors = [
    '.a-price.a-text-price .a-offscreen',
    '#priceblock_listprice',
    '.basisPrice .a-offscreen',
    '.a-list-price'
  ];

  let originalPriceStr = '';
  for (const selector of originalPriceSelectors) {
    const el = document.querySelector(selector);
    if (el) {
      originalPriceStr = el.innerText.trim();
      break;
    }
  }

  return {
    title,
    asin,
    currentPrice: parsePrice(currentPriceStr),
    originalPrice: parsePrice(originalPriceStr),
    currentPriceStr,
    originalPriceStr,
    url: window.location.href
  };
}

function parsePrice(priceStr) {
  if (!priceStr) return null;
  // Remove currency symbols and commas
  const cleaned = priceStr.replace(/[^0-9.]/g, '');
  const price = parseFloat(cleaned);
  return isNaN(price) ? null : price;
}

// Message Listener for Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getProductData") {
    sendResponse(extractProductData());
  }
});

// Run injection
injectAffiliateTag();

// Observe for dynamically added links
const observer = new MutationObserver(injectAffiliateTag);
observer.observe(document.body, { childList: true, subtree: true });
