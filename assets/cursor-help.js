(() => {
  // Hide system cursor for this iframe too
  const style = document.createElement("style");
  style.textContent = `
    * {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);

  // Send cursor movement to main page
  window.addEventListener("pointermove", e => {
    window.parent.postMessage({ type: "cursorMove", x: e.clientX, y: e.clientY }, "*");
  });

  // Notify parent when hovering interactive elements
  document.addEventListener("mouseover", e => {
    if (e.target.closest("button, a, input, textarea, select, [role='button']")) {
      window.parent.postMessage({ type: "cursorHover", hover: true }, "*");
    }
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest("button, a, input, textarea, select, [role='button']")) {
      window.parent.postMessage({ type: "cursorHover", hover: false }, "*");
    }
  });

  // Check for custom cursor every 1/10 second
  const checkInterval = setInterval(() => {
    const customCursor = parent.document.querySelector("#custom-cursor, .custom-cursor");
    if (!customCursor) {
      clearInterval(checkInterval);
      console.warn("[cursor-helper] No custom cursor detected, removing iframe cursor script.");
      document.removeEventListener("pointermove", () => {});
      document.removeEventListener("mouseover", () => {});
      document.removeEventListener("mouseout", () => {});
      style.remove();
      // Optional: remove the script itself
      const thisScript = document.currentScript;
      if (thisScript) thisScript.remove();
    }
  }, 100); // every 1/10th of a second
})();
