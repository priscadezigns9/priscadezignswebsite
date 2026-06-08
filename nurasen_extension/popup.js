document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (tab) {
    chrome.storage.local.get([`tab_${tab.id}`], (result) => {
      const data = result[`tab_${tab.id}`];
      if (data) {
        updateUI(data);
      } else {
        // If no data, maybe the content script hasn't reported yet.
        // We can wait or show a default "Scanning..."
      }
    });
  }

  document.getElementById('upgrade-btn').addEventListener('click', () => {
    window.open('https://priscadezigns.org/nurasen/pro', '_blank');
  });
});

function updateUI(data) {
  const threatLevelEl = document.getElementById('threat-level');
  const lightEl = document.getElementById('status-light');
  const trackerEl = document.getElementById('tracker-count');
  const insecureEl = document.getElementById('insecure-count');
  const suspiciousEl = document.getElementById('suspicious-count');

  threatLevelEl.textContent = data.threatLevel;
  trackerEl.textContent = data.trackerCount;
  insecureEl.textContent = data.insecureCount;
  suspiciousEl.textContent = data.suspiciousScripts;

  // Colors
  let color = '#00FFFF'; // Safe
  if (data.threatLevel === 'DANGER') {
    color = '#FF0000';
  } else if (data.threatLevel === 'WARNING') {
    color = '#FFA500';
  }

  lightEl.style.backgroundColor = color;
  lightEl.style.boxShadow = `0 0 10px ${color}`;
  threatLevelEl.style.color = color;
}
