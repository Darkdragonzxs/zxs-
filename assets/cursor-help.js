(() => {
  const style = document.createElement("style");
  style.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(style);

  window.addEventListener("pointermove", e => {
    window.parent.postMessage({ type: "cursorMove", x: e.clientX, y: e.clientY }, "*");
  });

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
