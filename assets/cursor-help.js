(() => {
  // Hide system cursor in this iframe
  const style = document.createElement("style");
  style.textContent = `* { cursor: none !important; }`;
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
})();
