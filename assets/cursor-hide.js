(() => {
  // Hide the system cursor in the game iframe
  const style = document.createElement("style");
  style.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(style);

  // Notify parent that cursor is inside the game iframe
  window.addEventListener("pointermove", () => {
    window.parent.postMessage({ type: "cursorInGame" }, "*");
  });
})();
