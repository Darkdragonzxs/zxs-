(() => {
  // Hide the system cursor in the iframe
  const style = document.createElement("style");
  style.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(style);

  // Send cursor position and whether it's inside interactive elements
  window.addEventListener("pointermove", e => {
    window.parent.postMessage({ type: "cursorInGame" }, "*");
  });
})();
