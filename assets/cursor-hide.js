(() => {
  // Function to find and remove custom cursor elements
  const removeCustomCursors = () => {
    const possibleCursors = [
      '.custom-cursor',
      '.cursor',
      '.cursor-dot',
      '#custom-cursor',
      '#cursor'
    ];

    possibleCursors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.remove();
      });
    });
  };

  // Try immediately
  removeCustomCursors();

  // Keep watching for newly added cursors (e.g. added later by parent scripts)
  const observer = new MutationObserver(() => removeCustomCursors());
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // Stop any cursor movement updates (like `requestAnimationFrame`)
  const stopCursorUpdate = () => {
    const oldRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = (cb) => {
      if (cb && cb.name && cb.name.toLowerCase().includes('cursor')) return 0;
      return oldRAF(cb);
    };
  };

  stopCursorUpdate();
})();
