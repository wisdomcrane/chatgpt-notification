function showNotification() {
  chrome.storage.sync.get(["enableNotifications"], (result) => {
    const enableNotifications = result.enableNotifications ?? true;
    if (enableNotifications) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon128.png",
        title: "ChatGPT notification.",
        message: "It is completed",
      });
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "buttonVisibilityChanged") {
    showNotification();
  }
});
