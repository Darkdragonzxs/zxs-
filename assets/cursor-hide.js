(() => {
  // Hide system cursor on this document
  const style = document.createElement("style");
  style.textContent = `* { cursor: none !important; }`;
  document.head.appendChild(style);

  // When iframes load, try to hide the cursor in them too
  const applyToIframe = (iframe) => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (doc) {
        const s = doc.createElement("style");
        s.textContent = `* { cursor: none !important; }`;
        doc.head.appendChild(s);
      }
    } catch (err) {
      // Ignore cross-origin iframes
    }
  };

  // Apply to all existing iframes
  document.querySelectorAll("iframe").forEach(applyToIframe);

  // Automatically apply when new iframes appear
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.tagName === "IFRAME") applyToIframe(node);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
