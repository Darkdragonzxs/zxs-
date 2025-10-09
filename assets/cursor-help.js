(() => {
  // Send pointer movement to parent (main.html)
  window.addEventListener("pointermove", e => {
    window.parent.postMessage({ type: "cursorMove", x: e.clientX, y: e.clientY }, "*");
  });

  // Optional: tell main cursor to grow/shrink when hovering buttons
  document.addEventListener("mouseover", e => {
    if (e.target.closest("button, a, input, [role='button']")) {
      window.parent.postMessage({ type: "cursorHover", hover: true }, "*");
    }
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest("button, a, input, [role='button']")) {
      window.parent.postMessage({ type: "cursorHover", hover: false }, "*");
    }
  });
})();
