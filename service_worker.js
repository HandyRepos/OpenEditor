// Click the extension icon to toggle the toolbar on the current tab
chrome.action.onClicked.addListener((tab) => {
  if (!tab?.id) return;
  chrome.tabs.sendMessage(tab.id, { type: "OPE_TOGGLE_TOOLBAR" });
});

// Relay downloads from the content script
chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type === "OPE_DOWNLOAD" && msg.url && msg.filename) {
    chrome.downloads.download({ url: msg.url, filename: msg.filename, saveAs: true });
  }
});
