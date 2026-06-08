document.addEventListener('DOMContentLoaded', () => {
  // Load stats
  chrome.storage.local.get(['stats'], (result) => {
    if (result.stats) {
      document.getElementById('stat-scans').textContent = result.stats.totalScans;
      document.getElementById('stat-threats').textContent = result.stats.totalThreats;
    }
  });

  document.getElementById('upgrade-pro').addEventListener('click', () => {
    window.open('https://priscadezigns.org/nurasen/pro', '_blank');
  });
});
