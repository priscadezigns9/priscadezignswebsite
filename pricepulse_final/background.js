chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'price_check_alarm') {
    checkPriceAlerts();
  }
});

// Create alarm to check every 6 hours
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('price_check_alarm', { periodInMinutes: 360 });
});

async function checkPriceAlerts() {
  const data = await chrome.storage.local.get(['alerts']);
  const alerts = data.alerts || [];

  if (alerts.length > 0) {
    alerts.forEach(alert => {
      // In a real app, you would fetch the current price here.
      // Since we don't have a backend, we'll just send a general notification.
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'PricePulse Alert',
        message: `Check your price alert for: ${alert.productName}`,
        contextMessage: `Target Price: ${alert.targetPrice}`,
        priority: 1
      });
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setAlert') {
    saveAlert(request.alert);
    sendResponse({ status: 'success' });
  }
});

async function saveAlert(newAlert) {
  const data = await chrome.storage.local.get(['alerts']);
  const alerts = data.alerts || [];
  alerts.push(newAlert);
  await chrome.storage.local.set({ alerts });
  
  // Set an immediate alarm for testing purposes or just wait for the 6h cycle
  console.log('Alert saved:', newAlert);
}
