(() => {
  // Create custom cursor
  const cursor = document.createElement("div");
  Object.assign(cursor.style, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "white",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    transition: "width 0.1s, height 0.1s",
    zIndex: "9999",
  });
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let hideCursor = false;

  // Track mouse
  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Listen for messages from any iframe
  window.addEventListener("message", e => {
    if (e.data?.type === "cursorInGame") {
      hideCursor = true;
    }
  });

  // Animate cursor smoothly
  function animate() {
    const rect = cursor.getBoundingClientRect();
    cursor.style.top = rect.top + (mouseY - rect.top) * 0.2 + "px";
    cursor.style.left = rect.left + (mouseX - rect.left) * 0.2 + "px";

    cursor.style.display = hideCursor ? "none" : "block";
    hideCursor = false; // reset each frame
    requestAnimationFrame(animate);
  }
  animate();

  // Enlarge cursor on interactive elements
  function setupHover() {
    const elements = document.querySelectorAll("button, a, input, textarea, select");
    elements.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "30px";
        cursor.style.height = "30px";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width = "20px";
        cursor.style.height = "20px";
      });
    });
  }
  setupHover();
  new MutationObserver(setupHover).observe(document.body, { childList: true, subtree: true });

  // Hide system cursor globally
  const style = document.createElement("style");
  style.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(style);
})();
