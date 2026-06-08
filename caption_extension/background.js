chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateCaption",
    title: "Generate Caption with Priscion AI",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateCaption") {
    chrome.storage.local.set({ lastImageUrl: info.srcUrl }, () => {
      chrome.action.openPopup();
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateAI") {
    generateCaption(request.imageUrl, request.tone, request.platform, request.apiKey)
      .then(caption => sendResponse({ success: true, caption }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep message channel open for async response
  }
});

async function generateCaption(imageUrl, tone, platform, apiKey) {
  if (!apiKey) {
    throw new Error("API Key is missing. Please add it in the options.");
  }

  const prompt = `Generate a high-fidelity social media caption for this image. 
  Platform: ${platform}
  Tone: ${tone}
  Brand: Priscion Empire (priscadezigns.org)
  Context: The Priscion Empire stands for sovereignty, digital excellence, and high-fidelity design.
  Requirements: 
  - For Instagram: Include 20+ relevant hashtags.
  - For Twitter/X: Stay under 280 characters and include 5 hashtags.
  - For Threads: High-engagement style.
  - For Facebook: Detailed and professional.
  - If Tone is Spiritual: Include themes related to The Way Made Known (Gospel/Faith).
  Image URL: ${imageUrl}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a professional social media manager for the Priscion Empire." },
          { role: "user", content: prompt }
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}
