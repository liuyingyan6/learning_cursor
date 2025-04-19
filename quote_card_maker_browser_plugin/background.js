/**
 * @description Creates the context menu item for the extension
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateQuoteCard",
    title: "Generate Quote Card",
    contexts: ["selection"]
  });
});

/**
 * @description Handles context menu click events
 * @param {Object} info - Information about the context menu click
 * @param {Object} tab - Information about the current tab
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateQuoteCard") {
    chrome.tabs.sendMessage(tab.id, {
      action: "showQuoteCardGenerator",
      text: info.selectionText
    });
  }
}); 