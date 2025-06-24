chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url) {
        const url = tab.url.toLowerCase();
        if (url.includes("privacy") || url.includes("terms")) {
            chrome.action.openPopup(); // works only if user triggers the extension (browser rule)
        }
    }
});
