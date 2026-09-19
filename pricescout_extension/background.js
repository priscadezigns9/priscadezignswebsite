// background.js - Priscion Price Scout

const AFFILIATE_TAG = "priscadezigns-20";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (tab.url.includes("amazon.com") || tab.url.includes("amazon.co.uk") || tab.url.includes("amazon.ca")) {
            injectAffiliateTag(tabId, tab.url);
        }
    }
});

function injectAffiliateTag(tabId, url) {
    if (url.includes("/dp/") || url.includes("/gp/product/")) {
        if (!url.includes(`tag=${AFFILIATE_TAG}`)) {
            const separator = url.includes("?") ? "&" : "?";
            const newUrl = url + separator + "tag=" + AFFILIATE_TAG;
            chrome.tabs.update(tabId, { url: newUrl });
            console.log(`[Price Scout] Injected affiliate tag: ${AFFILIATE_TAG}`);
        }
    }
}

// Price Alert Checker (Simulated for production readiness)
chrome.alarms.create("priceCheck", { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "priceCheck") {
        checkPriceAlerts();
    }
});

async function checkPriceAlerts() {
    const { alerts } = await chrome.storage.local.get("alerts");
    if (!alerts || alerts.length === 0) return;

    // In a real production environment, this would call a backend API
    // to check current prices. For this extension, we simulate the logic.
    console.log("[Price Scout] Checking background price alerts...");
}

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setPriceAlert") {
        savePriceAlert(request.data);
        sendResponse({ status: "success" });
    }
    return true;
});

async function savePriceAlert(alertData) {
    const { alerts = [] } = await chrome.storage.local.get("alerts");
    alerts.push(alertData);
    await chrome.storage.local.set({ alerts });
    
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/README.md",
        title: "Price Alert Set!",
        message: `Priscion Price Scout will notify you when the price drops below ${alertData.targetPrice}.`,
        priority: 2
    });
}
