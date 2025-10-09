// Create cursor element
const cursor = document.createElement("div");
Object.assign(cursor.style, {
  position: "fixed",
  width: "16px",
  height: "16px",
  border: "2px solid #0f0",
  borderRadius: "50%",
  pointerEvents: "none",
  zIndex: "9999",
  mixBlendMode: "difference", // inverts color underneath
  transition: "transform 0.04s linear",
});
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let insideIframe = false;

// Move cursor normally
document.addEventListener("mousemove", (e) => {
  if (insideIframe) return; // don’t move when mouse inside iframe
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  cursor.style.opacity = "1";
});

// Hide cursor when leaving window or entering iframe
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

function hideCursorTemporarily() {
  insideIframe = true;
  cursor.style.opacity = "0";
}
function showCursorAgain() {
  insideIframe = false;
  cursor.style.opacity = "1";
}

// Handle iframes (or embeds)
function attachIframeHandlers() {
  document.querySelectorAll("iframe, embed").forEach((frame) => {
    frame.addEventListener("mouseenter", hideCursorTemporarily);
    frame.addEventListener("mouseleave", showCursorAgain);
  });
}

// Run initially and also when new iframes are added dynamically
attachIframeHandlers();
new MutationObserver(attachIframeHandlers).observe(document.body, {
  childList: true,
  subtree: true,
});
