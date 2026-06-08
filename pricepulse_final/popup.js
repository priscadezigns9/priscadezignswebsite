document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (isAmazonUrl(tab.url)) {
    document.getElementById('amazon-view').style.display = 'block';
    document.getElementById('non-amazon-view').style.display = 'none';

    // Request product data from content script
    try {
      chrome.tabs.sendMessage(tab.id, { action: "getProductData" }, (response) => {
        if (response) {
          updateUI(response);
        }
      });
    } catch (e) {
      console.error("Error communicating with content script:", e);
    }
  } else {
    document.getElementById('amazon-view').style.display = 'none';
    document.getElementById('non-amazon-view').style.display = 'block';
  }

  document.getElementById('go-to-amazon').addEventListener('click', () => {
    chrome.tabs.update({ url: 'https://www.amazon.com' });
  });
});

function isAmazonUrl(url) {
  if (!url) return false;
  return url.includes('amazon.com') || url.includes('amazon.co.uk') || 
         url.includes('amazon.ca') || url.includes('amazon.com.au');
}

function updateUI(data) {
  const { title, asin, currentPrice, originalPrice, currentPriceStr, originalPriceStr } = data;

  document.getElementById('product-title').innerText = title || "Product not found";
  document.getElementById('current-price').innerText = currentPriceStr || "";
  document.getElementById('original-price').innerText = originalPriceStr || "";

  // Deal Score Calculation
  if (currentPrice && originalPrice) {
    const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
    const savings = originalPrice - currentPrice;
    
    document.getElementById('savings-badge').innerText = `Save ${discount.toFixed(0)}% (${formatCurrency(savings)})`;
    document.getElementById('savings-badge').style.display = 'inline-block';

    let score = 0;
    let colorClass = '';

    if (discount <= 5) {
      score = Math.max(1, Math.ceil(discount / 1.6));
      colorClass = 'gauge-red';
    } else if (discount <= 20) {
      score = 4 + Math.floor((discount - 6) / 5);
      colorClass = 'gauge-yellow';
    } else if (discount <= 40) {
      score = 7 + Math.floor((discount - 21) / 10);
      colorClass = 'gauge-green';
    } else {
      score = 10;
      colorClass = 'gauge-gold';
    }

    const gauge = document.getElementById('deal-score-gauge');
    gauge.innerText = score;
    gauge.className = 'gauge ' + colorClass;
  } else {
    document.getElementById('savings-badge').style.display = 'none';
    document.getElementById('deal-score-gauge').innerText = '-';
  }

  // CamelCamelCamel link
  if (asin) {
    document.getElementById('view-history-btn').addEventListener('click', () => {
      chrome.tabs.create({ url: `https://camelcamelcamel.com/product/${asin}` });
    });
  }

  // Price Alert
  document.getElementById('set-alert-btn').addEventListener('click', () => {
    const targetPrice = document.getElementById('target-price').value;
    if (targetPrice) {
      chrome.runtime.sendMessage({
        action: 'setAlert',
        alert: { asin, targetPrice, productName: title }
      }, (response) => {
        alert(`Alert set for ${title} at ${targetPrice}`);
      });
    }
  });

  // Brand Recommender (using shop_map.js)
  const recommendation = getRecommendedShop(title);
  if (recommendation) {
    document.getElementById('recommendation-section').style.display = 'block';
    const brandLink = document.getElementById('brand-link');
    brandLink.href = recommendation.url;
    brandLink.querySelector('.brand-name').innerText = recommendation.name;
  }
}

function formatCurrency(amount) {
  // Simple formatter
  return '$' + amount.toFixed(2);
}
