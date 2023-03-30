document.addEventListener("DOMContentLoaded", () => {
  const notificationToggle = document.getElementById("notificationToggle");
  const soundToggle = document.getElementById("soundToggle");

  // Load saved settings
  chrome.storage.sync.get(["enableNotifications"], (result) => {
    notificationToggle.checked = result.enableNotifications ?? true;
  });

  // Save settings when toggled
  notificationToggle.addEventListener("change", (event) => {
    chrome.storage.sync.set({ enableNotifications: event.target.checked });
  });
});
