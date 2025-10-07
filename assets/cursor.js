// custom-cursor.js
(() => {
  // Hide default cursor everywhere
  const style = document.createElement('style');
  style.innerHTML = `* { cursor: none !important; }`;
  document.head.appendChild(style);

  // Create custom cursor element
  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  document.body.appendChild(cursor);

  Object.assign(cursor.style, {
    position: 'fixed',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: '999999',
    mixBlendMode: 'difference',
    background: 'white',
    transition: 'transform 0.05s ease-out, width 0.2s ease, height 0.2s ease',
    opacity: '1',
  });

  const moveCursor = (x, y) => {
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(${x}px, ${y}px)`;
  };

  const hideCursor = () => {
    cursor.style.opacity = '0';
  };

  // Listen for mouse movement on parent document
  document.addEventListener('mousemove', e => moveCursor(e.clientX, e.clientY));
  document.addEventListener('mouseleave', hideCursor);

  // Listen for mouse movement inside same-origin iframe
  const iframe = document.getElementById('content-frame');
  iframe.addEventListener('load', () => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.addEventListener('mousemove', e => {
        const rect = iframe.getBoundingClientRect();
        const x = rect.left + e.clientX;
        const y = rect.top + e.clientY;
        moveCursor(x, y);
      });
      iframeDoc.addEventListener('mouseleave', hideCursor);
    } catch (err) {
      console.warn('Cannot access iframe for custom cursor:', err);
    }
  });

  // Enlarge cursor when hovering interactive elements
  const interactives = document.querySelectorAll('a, button, select, input, textarea');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
    });
  });
})();
