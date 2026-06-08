// popup.js - Priscion Price Scout

document.addEventListener('DOMContentLoaded', async () => {
    const currentPriceEl = document.getElementById('current-price');
    const dealScoreEl = document.getElementById('deal-score');
    const shopBtn = document.getElementById('shop-btn');
    const setAlertBtn = document.getElementById('set-alert-btn');
    const historyContainer = document.getElementById('history-container');

    // Get info from active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab && (tab.url.includes("amazon") || tab.url.includes("ebay") || tab.url.includes("walmart") || tab.url.includes("bestbuy") || tab.url.includes("etsy"))) {
        chrome.tabs.sendMessage(tab.id, { action: "getProductInfo" }, (response) => {
            if (response) {
                currentPriceEl.innerText = `$${response.price || 'N/A'}`;
                shopBtn.href = response.shopUrl;
                
                // Calculate Deal Score (Random for demo, would be history based)
                const score = Math.floor(Math.random() * 10) + 1;
                dealScoreEl.innerText = score;
                if (score > 7) dealScoreEl.style.backgroundColor = "#00FF00";
                else if (score < 4) dealScoreEl.style.backgroundColor = "#FF0000";

                // Price History Chart
                if (tab.url.includes("amazon")) {
                    const asin = extractASIN(tab.url);
                    if (asin) {
                        historyContainer.innerHTML = `<img src="https://charts.camelcamelcamel.com/us/${asin}/amazon.png?force=1&zero=0&w=300&h=80&desired=false&legend=0&ilt=1&tp=all&fo=0&lang=en" style="width:100%; border-radius:4px;">`;
                    }
                }
            } else {
                currentPriceEl.innerText = "Navigate to product page";
            }
        });
    } else {
        currentPriceEl.innerText = "Go to a supported shop";
        shopBtn.style.display = "none";
        setAlertBtn.disabled = true;
    }

    setAlertBtn.onclick = () => {
        const target = prompt("Enter target price (USD):");
        if (target) {
            chrome.runtime.sendMessage({
                action: "setPriceAlert",
                data: {
                    url: tab.url,
                    targetPrice: target,
                    timestamp: Date.now()
                }
            }, (res) => {
                alert("Alert Set! We'll notify you when the price hits $" + target);
            });
        }
    };
});

function extractASIN(url) {
    const match = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
    return match ? match[1] : null;
}
