// /assets/cursor-hide.js
document.addEventListener("DOMContentLoaded", () => {
  // Create a global style element that forces cursor: none on EVERYTHING
  const style = document.createElement("style");
  style.textContent = `
    * {
      cursor: none !important;
    }
    html, body {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);

  // Check if in iframe (embed mode)
  const inIframe = window !== window.top;

  if (inIframe) {
    // Just hide everything cursor-related
    document.querySelectorAll(".custom-cursor").forEach(el => el.remove());
  } else {
    // If NOT in an iframe, you can keep your normal custom cursor
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const cursorStyle = document.createElement("style");
    cursorStyle.textContent = `
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
        z-index: 999999;
      }
    `;
    document.head.appendChild(cursorStyle);

    window.addEventListener("mousemove", e => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
});
