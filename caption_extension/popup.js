document.addEventListener('DOMContentLoaded', () => {
  const toneSelect = document.getElementById('tone-select');
  const generateBtn = document.getElementById('generate-btn');
  const loadingDiv = document.getElementById('loading');
  const captionOutput = document.getElementById('caption-output');
  const charCount = document.getElementById('char-count');
  const copyBtn = document.getElementById('copy-btn');
  const tabLinks = document.querySelectorAll('.tab-link');
  const historyList = document.getElementById('history-list');
  const dailyCountSpan = document.getElementById('daily-count');

  let currentPlatform = 'Instagram';
  let generatedCaptions = {
    Instagram: '',
    Threads: '',
    Facebook: '',
    Twitter: ''
  };

  const PLATFORM_LIMITS = {
    Instagram: 2200,
    Threads: 500,
    Facebook: 63206,
    Twitter: 280
  };

  // Load Initial State
  chrome.storage.local.get(['apiKey', 'history', 'dailyCount', 'lastDate', 'shopUrl'], (data) => {
    // Reset daily count if new day
    const today = new Date().toDateString();
    if (data.lastDate !== today) {
      chrome.storage.local.set({ dailyCount: 0, lastDate: today });
      dailyCountSpan.textContent = '0';
    } else {
      dailyCountSpan.textContent = data.dailyCount || '0';
    }

    renderHistory(data.history || []);
    
    // Check if we opened from context menu
    chrome.storage.local.get(['lastImageUrl'], (imgData) => {
      if (imgData.lastImageUrl) {
        // Auto-trigger if we have an image? 
        // For now, let user click generate.
      }
    });
  });

  // Tab Logic
  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      tabLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      currentPlatform = link.dataset.platform;
      updateDisplay();
    });
  });

  // Generate Logic
  generateBtn.addEventListener('click', async () => {
    const data = await chrome.storage.local.get(['apiKey', 'dailyCount', 'lastImageUrl', 'shopUrl', 'isPro']);
    const dailyCount = data.dailyCount || 0;

    if (!data.isPro && dailyCount >= 5) {
      alert("Daily limit reached for free tier. Please upgrade to Pro!");
      return;
    }

    loadingDiv.classList.remove('hidden');
    generateBtn.disabled = true;

    const tone = toneSelect.value;
    const imageUrl = data.lastImageUrl || "https://priscadezigns.org/placeholder.png";
    const shopUrl = data.shopUrl || "https://priscadezigns.org/shop";

    if (data.apiKey) {
      // Use OpenAI
      try {
        for (const platform of Object.keys(generatedCaptions)) {
          const result = await sendMessageToBackground({
            action: "generateAI",
            imageUrl,
            tone,
            platform,
            apiKey: data.apiKey
          });
          if (result.success) {
            generatedCaptions[platform] = result.caption + `\n\nShop here: ${shopUrl}`;
          } else {
            console.error(`AI failed for ${platform}:`, result.error);
            generatedCaptions[platform] = getTemplateFallback(platform, tone) + `\n\nShop here: ${shopUrl}`;
          }
        }
      } catch (err) {
        console.error("AI Generation failed entirely:", err);
        useFallback(tone, shopUrl);
      }
    } else {
      // Fallback
      useFallback(tone, shopUrl);
    }

    // Save history
    saveHistory(generatedCaptions[currentPlatform]);
    
    // Update Daily Count
    if (!data.isPro) {
      const newCount = dailyCount + 1;
      chrome.storage.local.set({ dailyCount: newCount });
      dailyCountSpan.textContent = newCount;
    }

    loadingDiv.classList.add('hidden');
    generateBtn.disabled = false;
    updateDisplay();
  });

  copyBtn.addEventListener('click', () => {
    captionOutput.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy Caption', 2000);
  });

  function useFallback(tone, shopUrl) {
    for (const platform of Object.keys(generatedCaptions)) {
      generatedCaptions[platform] = getTemplateFallback(platform, tone) + `\n\nShop here: ${shopUrl}`;
    }
  }

  function getTemplateFallback(platform, tone) {
    const list = CAPTION_TEMPLATES[platform][tone];
    return list[Math.floor(Math.random() * list.length)];
  }

  function updateDisplay() {
    const text = generatedCaptions[currentPlatform] || "";
    captionOutput.value = text;
    const limit = PLATFORM_LIMITS[currentPlatform];
    charCount.textContent = `${text.length} / ${limit}`;
    
    if (text.length > limit) {
      charCount.style.color = 'red';
    } else {
      charCount.style.color = 'var(--text-dim)';
    }
  }

  function sendMessageToBackground(message) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, (response) => {
        resolve(response);
      });
    });
  }

  function saveHistory(caption) {
    if (!caption) return;
    chrome.storage.local.get(['history'], (data) => {
      let history = data.history || [];
      history.unshift(caption);
      if (history.length > 10) history.pop();
      chrome.storage.local.set({ history });
      renderHistory(history);
    });
  }

  function renderHistory(history) {
    historyList.innerHTML = '';
    history.forEach((cap) => {
      const li = document.createElement('li');
      li.textContent = cap;
      li.title = cap;
      li.addEventListener('click', () => {
        captionOutput.value = cap;
        updateDisplay();
      });
      historyList.appendChild(li);
    });
  }
});
