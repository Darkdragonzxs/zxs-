const cursor = document.createElement("div");
Object.assign(cursor.style, {
  position: "fixed",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  pointerEvents: "none",
  zIndex: "999999",
  background: "white",
  mixBlendMode: "difference",
  transition: "width 0.2s ease, height 0.2s ease, transform 0.06s linear",
});
document.body.appendChild(cursor);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

// === Make sure we track the cursor even if an iframe pops up ===
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.opacity = "1";
});

window.addEventListener("blur", () => {
  // Keep cursor visible but unfrozen if pointer leaves main window (iframe focus)
  cursor.style.opacity = "0.8";
});

window.addEventListener("focus", () => {
  cursor.style.opacity = "1";
});

// Smooth follow loop
function followCursor() {
  currentX += (mouseX - currentX) * 0.25;
  currentY += (mouseY - currentY) * 0.25;
  cursor.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
  requestAnimationFrame(followCursor);
}
followCursor();

// Hover grow effect
function setupHoverEffects() {
  document.querySelectorAll("button, a, input, [role='button']").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "36px";
      cursor.style.height = "36px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
    });
  });
}
setupHoverEffects();

// Re-run hover effect watcher for dynamically added buttons
new MutationObserver(setupHoverEffects).observe(document.body, {
  childList: true,
  subtree: true,
});

// Prevent iframe popups from freezing the cursor
function watchIframes() {
  document.querySelectorAll("iframe, embed").forEach((frame) => {
    frame.style.pointerEvents = "auto";
    frame.addEventListener("mouseenter", () => {
      // keep tracking cursor position using window mousemove
      cursor.style.opacity = "0.9";
    });
    frame.addEventListener("mouseleave", () => {
      cursor.style.opacity = "1";
    });
  });
}
watchIframes();
new MutationObserver(watchIframes).observe(document.body, {
  childList: true,
  subtree: true,
});
