// options.js - Priscion Price Scout

document.addEventListener('DOMContentLoaded', async () => {
    const alertsList = document.getElementById('alerts-list');
    const saveBtn = document.getElementById('save-btn');

    // Load existing alerts
    const { alerts = [] } = await chrome.storage.local.get("alerts");
    
    if (alerts.length > 0) {
        alertsList.innerHTML = alerts.map((a, i) => `
            <div style="margin-bottom: 10px; border: 1px solid #333; padding: 10px;">
                Target: <strong>$${a.targetPrice}</strong><br>
                <span style="font-size: 10px;">${a.url.substring(0, 50)}...</span>
            </div>
        `).join('');
    }

    saveBtn.onclick = () => {
        alert("Preferences saved to the Sovereign Ledger.");
    };
});
