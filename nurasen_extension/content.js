/**
 * Nurasen Neural Defense - Content Script
 * Scans for trackers, insecure links, and phishing signals.
 */

const trackerDomains = [
  'google-analytics.com',
  'facebook.net',
  'doubleclick.net',
  'hotjar.com',
  'scorecardresearch.com',
  'quantserve.com',
  'zedo.com'
];

function scanPage() {
  const links = document.querySelectorAll('a');
  const scripts = document.querySelectorAll('script');
  
  let insecureCount = 0;
  let trackerCount = 0;
  let suspiciousScripts = 0;

  links.forEach(link => {
    if (link.href.startsWith('http://')) {
      insecureCount++;
    }
  });

  scripts.forEach(script => {
    const src = script.src;
    if (src) {
      if (trackerDomains.some(domain => src.includes(domain))) {
        trackerCount++;
      }
      if (src.includes('eval(') || src.includes('base64')) {
        suspiciousScripts++;
      }
    }
  });

  const threatCount = insecureCount + trackerCount + suspiciousScripts;
  let threatLevel = 'SAFE';
  if (threatCount > 10) {
    threatLevel = 'DANGER';
  } else if (threatCount > 0) {
    threatLevel = 'WARNING';
  }

  // Send report to background script
  chrome.runtime.sendMessage({
    type: 'SCAN_RESULTS',
    data: {
      insecureCount,
      trackerCount,
      suspiciousScripts,
      threatCount,
      threatLevel,
      url: window.location.hostname
    }
  });
}

// Initial scan
scanPage();

// Optional: Scan on DOM mutations
const observer = new MutationObserver(() => {
  scanPage();
});
observer.observe(document.body, { childList: true, subtree: true });
