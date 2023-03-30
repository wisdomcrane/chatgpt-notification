function notifyUser() {
  chrome.runtime.sendMessage({ action: "buttonVisibilityChanged" });
}

let buttonAdded = false;
let buttonRemoved = false;

function isTargetButton(element) {
  if (
    element.nodeType === Node.ELEMENT_NODE &&
    element.classList.contains("btn-neutral")
  ) {
    const svg = element.querySelector("svg");
    if (svg) {
      const rect = svg.querySelector("rect");
      return (
        rect && rect.getAttribute("x") === "3" && rect.getAttribute("y") === "3"
      );
    }
  }
  return false;
}

function observeButtonCreationAndRemoval() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const addedNode of mutation.addedNodes) {
          if (isTargetButton(addedNode)) {
            buttonAdded = true;
          }
        }

        for (const removedNode of mutation.removedNodes) {
          if (isTargetButton(removedNode)) {
            buttonRemoved = true;
          }
        }

        if (buttonAdded && buttonRemoved) {
          notifyUser();
          // Reset the button states
          buttonAdded = false;
          buttonRemoved = false;
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

observeButtonCreationAndRemoval();
