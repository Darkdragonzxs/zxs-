const cursor = document.createElement("div");
cursor.style.position = "fixed";
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.borderRadius = "50%";
cursor.style.pointerEvents = "none";
cursor.style.zIndex = "9999";
cursor.style.background = "white";
cursor.style.mixBlendMode = "difference"; // color inversion
cursor.style.transition = "width 0.2s ease, height 0.2s ease, transform 0.06s linear";
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

// Smooth following
function animateCursor() {
  currentX += (mouseX - currentX) * 0.25;
  currentY += (mouseY - currentY) * 0.25;
  cursor.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener("pointermove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.opacity = "1";
});

document.addEventListener("pointerleave", () => {
  cursor.style.opacity = "0";
});

// Make cursor bigger when hovering over clickable elements
function updateHoverState() {
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
updateHoverState();

// Watch for new buttons added dynamically
new MutationObserver(updateHoverState).observe(document.body, {
  childList: true,
  subtree: true
});

// Fix issue with embeds/iframes offset
document.querySelectorAll("iframe, embed").forEach((frame) => {
  frame.addEventListener("mouseenter", () => {
    // keep tracking last known position but don't freeze
    cursor.style.opacity = "0.5";
  });
  frame.addEventListener("mouseleave", () => {
    cursor.style.opacity = "1";
  });
});
