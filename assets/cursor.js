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
    transition: 'transform 0.05s ease-out, width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
    opacity: '1',
  });

  let lastX = null, lastY = null;
  let hideTimeout;

  const moveCursor = (x, y) => {
    cursor.style.opacity = '1';
    cursor.style.transform = `translate(${x}px, ${y}px)`;
  };

  const hideCursor = () => {
    cursor.style.opacity = '0';
  };

  document.addEventListener('mousemove', e => {
    lastX = e.clientX;
    lastY = e.clientY;

    if (lastX !== null && lastY !== null &&
        lastX >= 0 && lastY >= 0 &&
        lastX <= window.innerWidth && lastY <= window.innerHeight) {
      moveCursor(lastX, lastY);

      // Reset hide timer
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        hideCursor();
      }, 100); // hides cursor if no movement for 100ms
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

  // Hide cursor if mouse leaves window entirely
  document.addEventListener('mouseleave', hideCursor);
})();
