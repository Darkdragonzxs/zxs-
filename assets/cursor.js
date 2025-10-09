const cursor = document.createElement("div");
cursor.style.position = "fixed";
cursor.style.width = "12px";
cursor.style.height = "12px";
cursor.style.borderRadius = "50%";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = "9999";
cursor.style.background = "#0f0";
cursor.style.mixBlendMode = "difference"; // color inversion
cursor.style.transition = "transform 0.06s linear";
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let insideIframe = false;

document.addEventListener("mousemove", (e) => {
  if (insideIframe) return;
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  cursor.style.opacity = "1";
});

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

// Detect iframes and attach handlers
function handleIframes() {
  document.querySelectorAll("iframe, embed").forEach((frame) => {
    frame.addEventListener("mouseenter", hideCursorTemporarily);
    frame.addEventListener("mouseleave", showCursorAgain);
  });
}

handleIframes();
new MutationObserver(handleIframes).observe(document.body, {
  childList: true,
  subtree: true
});
