(() => {
  // Create cursor
  const cursor = document.createElement("div");
  cursor.style.cssText = `
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
  document.body.appendChild(cursor);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  // --- Smooth follow animation ---
  const animate = () => {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;
    cursor.style.transform = `translate(${currentX - 9}px, ${currentY - 9}px)`;
    requestAnimationFrame(animate);
  };
  animate();

  // --- Handle direct pointer movement (on main.html) ---
  window.addEventListener("pointermove", e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // --- Receive cursor coordinates from iframes ---
  window.addEventListener("message", (e) => {
    if (e.data && e.data.type === "cursorMove") {
      const rect = e.source.frameElement?.getBoundingClientRect?.();
      if (rect) {
        targetX = rect.left + e.data.x;
        targetY = rect.top + e.data.y;
      }
    } else if (e.data && e.data.type === "cursorHover") {
      cursor.style.width = e.data.hover ? "36px" : "18px";
      cursor.style.height = e.data.hover ? "36px" : "18px";
    }
  });
})();
