(() => {
  const cursor = document.createElement("div");
  cursor.style.position = "fixed";
  cursor.style.top = "0";
  cursor.style.left = "0";
  cursor.style.width = "16px";
  cursor.style.height = "16px";
  cursor.style.borderRadius = "50%";
  cursor.style.background = "white"; 
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = "9999";
  cursor.style.transform = "translate(-50%, -50%)";
  cursor.style.transition = "width 0.15s ease, height 0.15s ease, opacity 0.15s ease";
  cursor.style.mixBlendMode = "difference";
  cursor.id = "zxs-custom-cursor";
  document.body.appendChild(cursor);

  let cursorVisible = true;
  let lastMove = Date.now();
  let mouseX = 0;
  let mouseY = 0;
  let displayX = 0;
  let displayY = 0;

  function animate() {
    displayX += (mouseX - displayX) * 0.25;
    displayY += (mouseY - displayY) * 0.25;
    cursor.style.transform = `translate(${displayX - 8}px, ${displayY - 8}px)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  function updateCursor(x, y) {
    mouseX = x;
    mouseY = y;
    lastMove = Date.now();
    if (!cursorVisible) showCursor();
  }

  function setHover(hovering) {
    cursor.style.width = hovering ? "28px" : "16px";
    cursor.style.height = hovering ? "28px" : "16px";
  }

  // Track main page mouse
  window.addEventListener("mousemove", e => updateCursor(e.clientX, e.clientY));

  document.addEventListener("mouseover", e => {
    if (e.target.closest("button, a, input, textarea, select, [role='button']")) setHover(true);
  });

  document.addEventListener("mouseout", e => {
    if (e.target.closest("button, a, input, textarea, select, [role='button']")) setHover(false);
  });

  // Listen for iframe messages
  window.addEventListener("message", e => {
    const data = e.data;
    if (!data || typeof data !== "object") return;

    // Find which iframe sent the message
    const iframe = Array.from(document.querySelectorAll("iframe")).find(f => f.contentWindow === e.source);
    let offsetX = 0, offsetY = 0;
    if (iframe) {
      const rect = iframe.getBoundingClientRect();
      offsetX = rect.left;
      offsetY = rect.top;
    }

    if (data.type === "cursorMove") updateCursor(data.x + offsetX, data.y + offsetY);
    if (data.type === "cursorHover") setHover(data.hover);
  });

  // Hide default cursor
  const hideCursorStyle = document.createElement("style");
  hideCursorStyle.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(hideCursorStyle);

  // Hide if idle
  setInterval(() => {
    if (Date.now() - lastMove > 500 && cursorVisible) hideCursor();
  }, 250);

  function hideCursor() {
    cursor.style.opacity = "0";
    cursorVisible = false;
  }

  function showCursor() {
    cursor.style.opacity = "1";
    cursorVisible = true;
  }
})();
