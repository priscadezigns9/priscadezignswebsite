document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('api-key');
  const shopUrlInput = document.getElementById('shop-url');
  const brandNameInput = document.getElementById('brand-name');
  const saveBtn = document.getElementById('save-btn');
  const statusDiv = document.getElementById('status');

  // Load existing settings
  chrome.storage.local.get(['apiKey', 'shopUrl', 'brandName'], (data) => {
    if (data.apiKey) apiKeyInput.value = data.apiKey;
    if (data.shopUrl) shopUrlInput.value = data.shopUrl;
    if (data.brandName) brandNameInput.value = data.brandName;
  });

  saveBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    const shopUrl = shopUrlInput.value.trim();
    const brandName = brandNameInput.value.trim();

    chrome.storage.local.set({
      apiKey,
      shopUrl,
      brandName
    }, () => {
      statusDiv.textContent = 'Settings saved successfully!';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 3000);
    });
  });
});
