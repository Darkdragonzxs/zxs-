(() => {
  const blockedCombos = [
    { key: 'w', ctrl: true },
    { key: 'd', ctrl: true },
    { key: 'r', ctrl: true },
    { key: 't', ctrl: true },
    { key: 'n', ctrl: true },
    { key: 'F4', alt: true },
    { key: 'Tab', ctrl: true }, 
  ];

  window.addEventListener('keydown', e => {
    // Allow ESC
    if (e.key === "Escape") return;

    for (const combo of blockedCombos) {
      const ctrlMatch = combo.ctrl ? e.ctrlKey : !e.ctrlKey;
      const altMatch = combo.alt ? e.altKey : !e.altKey;
      const shiftMatch = combo.shift ? e.shiftKey : !e.shiftKey;

      if (e.key.toLowerCase() === combo.key.toLowerCase() && ctrlMatch && altMatch && shiftMatch) {
        e.preventDefault();
        e.stopPropagation();
        console.log(`Blocked key combo: ${combo.key}`);
      }
    }
  }, true);
})();
