(() => {
  const cursor = document.createElement("div");
  cursor.id = "customCursor";
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
    transition: "width 0.1s, height 0.1s, background 0.1s",
    zIndex: "9999"
  });
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let isOverGame = false;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hide cursor if over iframe
  window.addEventListener("message", e => {
    const data = e.data;
    if (data?.type === "cursorInGame") isOverGame = true;
  });

  // Reset flag on every frame
  function animate() {
    // Smooth follow
    const rect = cursor.getBoundingClientRect();
    cursor.style.top = rect.top + (mouseY - rect.top) * 0.2 + "px";
    cursor.style.left = rect.left + (mouseX - rect.left) * 0.2 + "px";

    // Hide if inside game
    cursor.style.display = isOverGame ? "none" : "block";
    isOverGame = false; // reset until next message
    requestAnimationFrame(animate);
  }
  animate();

  // Enlarge on buttons
  document.querySelectorAll("button, a").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "30px";
      cursor.style.height = "30px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
    });
  });
})();
