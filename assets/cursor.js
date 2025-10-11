(() => {
  const cursor = document.createElement("div");
  cursor.style.position = "fixed";
  cursor.style.top = "0";
  cursor.style.left = "0";
  cursor.style.width = "16px";
  cursor.style.height = "16px";
  cursor.style.borderRadius = "50%";
  cursor.style.background = "black"; // reversed color
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = "9999";
  cursor.style.transform = "translate(-50%, -50%)";
  cursor.style.transition = "width 0.15s ease, height 0.15s ease, opacity 0.15s ease";
  cursor.id = "zxs-custom-cursor";
  document.body.appendChild(cursor);

  let cursorVisible = true;
  let lastMove = Date.now();
  let mouseX = 0;
  let mouseY = 0;

  // Follow cursor with a small delay
  let displayX = 0;
  let displayY = 0;

  function animate() {
    displayX += (mouseX - displayX) * 0.25;
    displayY += (mouseY - displayY) * 0.25;
    cursor.style.transform = `translate(${displayX - 8}px, ${displayY - 8}px)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Track movement
  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMove = Date.now();
    if (!cursorVisible) showCursor();
  });

  // Enlarge on hover
  document.addEventListener("mouseover", e => {
    if (e.target.closest("button, a, input, textarea, select, [role='button']")) {
      cursor.style.width = "28px";
      cursor.style.height = "28px";
    }
  });

  document.addEventListener("mouseout", e => {
    if (e.target.closest("button, a, input, textarea, select, [role='button']")) {
      cursor.style.width = "16px";
      cursor.style.height = "16px";
    }
  });

  // Hide default cursor
  const hideCursorStyle = document.createElement("style");
  hideCursorStyle.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(hideCursorStyle);

  // Check every 1/4 second if cursor is “lost”
  setInterval(() => {
    if (Date.now() - lastMove > 500) {
      // cursor hasn’t moved for > 0.5s → hide
      if (cursorVisible) hideCursor();
    }
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
