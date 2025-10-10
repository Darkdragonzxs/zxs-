(() => {
  // Hide system cursor for this iframe too
  const style = document.createElement("style");
  style.textContent = `
    * {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);

  // --- Custom cursor setup (same visuals as main) ---
  const cursor = document.createElement("div");
  Object.assign(cursor.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "white",
    pointerEvents: "none",
    zIndex: "9999",
    transform: "translate(-50%, -50%)",
    transition: "width 0.15s ease, height 0.15s ease, opacity 0.15s ease",
    opacity: "1"
  });
  cursor.id = "zxs-custom-cursor";
  document.body.appendChild(cursor);

  let cursorVisible = true;
  let lastMove = Date.now();
  let mouseX = 0;
  let mouseY = 0;
  let displayX = 0;
  let displayY = 0;

  // --- Animate cursor follow ---
  function animate() {
    displayX += (mouseX - displayX) * 0.25;
    displayY += (mouseY - displayY) * 0.25;
    cursor.style.transform = `translate(${displayX - 8}px, ${displayY - 8}px)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // --- Send movement + update local cursor position ---
  window.addEventListener("pointermove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMove = Date.now();
    if (!cursorVisible) showCursor();
    window.parent.postMessage({ type: "cursorMove", x: e.clientX, y: e.clientY }, "*");
  });

  // --- Handle hover enlargement & notify parent ---
  document.addEventListener("mouseover", e => {
    if (e.target.closest("button, a, input, textarea, select, [role='button']")) {
      cursor.style.width = "28px";
      cursor.style.height = "28px";
      window.parent.postMessage({ type: "cursorHover", hover: true }, "*");
    }
  });

  document.addEventListener("mouseout", e => {
    if (e.target.closest("button, a, input, textarea, select, [role='button']")) {
      cursor.style.width = "16px";
      cursor.style.height = "16px";
      window.parent.postMessage({ type: "cursorHover", hover: false }, "*");
    }
  });

  // --- Auto hide if no movement for 0.5s ---
  setInterval(() => {
    if (Date.now() - lastMove > 500) {
      if (cursorVisible) hideCursor();
    }
  }, 100); // check every 1/10th second

  function hideCursor() {
    cursor.style.opacity = "0";
    cursorVisible = false;
  }

  function showCursor() {
    cursor.style.opacity = "1";
    cursorVisible = true;
  }

  // --- Sync with parent if parent controls cursor too ---
  window.addEventListener("message", event => {
    if (event.data?.type === "cursorSync") {
      // Parent can send {type:'cursorSync', x, y, hover}
      mouseX = event.data.x;
      mouseY = event.data.y;
      if (event.data.hover) {
        cursor.style.width = "28px";
        cursor.style.height = "28px";
      } else {
        cursor.style.width = "16px";
        cursor.style.height = "16px";
      }
    }
  });
})();
