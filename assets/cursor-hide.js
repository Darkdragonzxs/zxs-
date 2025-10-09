(function() {
  // Wait until the page is ready
  document.addEventListener("DOMContentLoaded", () => {
    // Check if this page is inside an iframe
    const inIframe = window !== window.top;

    if (inIframe) {
      // Add a style tag to hide custom cursors if embedded
      const style = document.createElement("style");
      style.textContent = `
        * {
          cursor: default !important;
        }
      `;
      document.head.appendChild(style);

      // If your custom cursor is DOM-based (like a div following the mouse), hide it too:
      const hideCursor = () => {
        const customCursor = document.querySelector(".custom-cursor");
        if (customCursor) {
          customCursor.style.display = "none";
        }
      };

      hideCursor();

      // Also watch for dynamically added cursors
      const observer = new MutationObserver(hideCursor);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
})();
