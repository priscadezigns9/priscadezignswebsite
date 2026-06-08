// Content script for Priscion Caption AI
// Currently handles detection of images if needed or injection of UI elements.

console.log("Priscion Caption AI Content Script Loaded.");

// Optional: Listen for messages from the popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ping") {
    sendResponse({ status: "alive" });
  }
});
