/**
 * Nurasen Neural Defense - Background Service Worker
 */

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    stats: {
      totalScans: 0,
      totalThreats: 0,
      blockedTrackers: 0
    },
    isPro: false
  });
  console.log('Nurasen Neural Defense initialized.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SCAN_RESULTS') {
    const { threatCount, threatLevel } = message.data;
    
    // Update badge for current tab
    if (sender.tab) {
      const tabId = sender.tab.id;
      
      // Store tab-specific results
      chrome.storage.local.set({ [`tab_${tabId}`]: message.data });

      chrome.action.setBadgeText({
        text: threatCount > 0 ? threatCount.toString() : '',
        tabId: tabId
      });
      
      const badgeColor = threatLevel === 'DANGER' ? '#FF0000' : (threatLevel === 'WARNING' ? '#FFA500' : '#00FFFF');
      chrome.action.setBadgeBackgroundColor({
        color: badgeColor,
        tabId: sender.tab.id
      });
    }

    // Update global stats
    chrome.storage.local.get(['stats'], (result) => {
      const stats = result.stats || { totalScans: 0, totalThreats: 0, blockedTrackers: 0 };
      stats.totalScans++;
      stats.totalThreats += threatCount;
      chrome.storage.local.set({ stats });
    });
  }
});
