(() => {
  // === CUSTOM CURSOR CODE ===
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  Object.assign(cursor.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "14px",
    height: "14px",
    background: "white",
    borderRadius: "50%",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    transition: "transform 0.1s ease-out, opacity 0.2s ease",
    zIndex: "999999"
  });
  document.body.appendChild(cursor);

  let cursorVisible = true;
  let lastMove = Date.now();

  const moveCursor = e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    lastMove = Date.now();
  };

  window.addEventListener("mousemove", moveCursor);

  // === AUTO-HIDE IF CUSTOM CURSOR DOESN’T WORK ===
  // Wait a short time — if the cursor hasn’t moved or rendered, assume it’s in an embed (e.g., BP1.html)
  setTimeout(() => {
    const computed = window.getComputedStyle(cursor);
    const visible = computed.display !== "none" && computed.opacity !== "0";

    // If cursor hasn't moved or isn't visible, delete itself
    if (Date.now() - lastMove > 1500 || !visible) {
      console.warn("[cursor-help.js] Cursor not detected, disabling.");
      cursor.remove();
      window.removeEventListener("mousemove", moveCursor);
    }
  }, 2000);
})();
