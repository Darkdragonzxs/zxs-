(() => {
  const dot = document.createElement("div");
  dot.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    mix-blend-mode: difference;
    pointer-events: none;
    z-index: 999999999;
    transition: width 0.2s ease, height 0.2s ease;
  `;
  document.body.appendChild(dot);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  // --- Cursor follow system (very reliable) ---
  window.addEventListener("pointermove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // --- Animation loop ---
  const follow = () => {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;
    dot.style.transform = `translate(${currentX - 9}px, ${currentY - 9}px)`;
    requestAnimationFrame(follow);
  };
  follow();

  // --- Hover detection for interactive elements ---
  const growCursor = () => {
    dot.style.width = "36px";
    dot.style.height = "36px";
  };
  const shrinkCursor = () => {
    dot.style.width = "18px";
    dot.style.height = "18px";
  };

  const attachHoverEvents = () => {
    document.querySelectorAll("button, a, input, [role='button']").forEach((el) => {
      el.removeEventListener("mouseenter", growCursor);
      el.removeEventListener("mouseleave", shrinkCursor);
      el.addEventListener("mouseenter", growCursor);
      el.addEventListener("mouseleave", shrinkCursor);
    });
  };
  attachHoverEvents();

  // Auto-update hover events if elements are added later
  new MutationObserver(attachHoverEvents).observe(document.body, {
    childList: true,
    subtree: true,
  });

  // --- Always visible, even if iframe pops up ---
  // We fake a small movement every few ms so CSS keeps repainting
  setInterval(() => {
    dot.style.transform = `translate(${currentX - 9}px, ${currentY - 9}px)`;
  }, 100);

  // --- Handle iframe focus (prevents freeze) ---
  window.addEventListener("blur", () => (dot.style.opacity = "1"));
  window.addEventListener("focus", () => (dot.style.opacity = "1"));
})();
