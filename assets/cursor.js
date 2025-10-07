(() => {
  // Hide default cursor everywhere
  const style = document.createElement('style');
  style.innerHTML = `* { cursor: none !important; }`;
  document.head.appendChild(style);

  // Create custom cursor
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

  // Move cursor on parent document
  document.addEventListener('mousemove', e => moveCursor(e.clientX, e.clientY));
  document.addEventListener('mouseleave', hideCursor);

  // Hide cursor instantly when hovering iframe
  const iframe = document.getElementById('content-frame');
  if (iframe) {
    iframe.addEventListener('mouseenter', hideCursor);
  }

  // Enlarge cursor over interactive elements
  const enlarge = () => {
    cursor.style.width = '30px';
    cursor.style.height = '30px';
  };
  const shrink = () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  };
  document.querySelectorAll('a, button, select, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', enlarge);
    el.addEventListener('mouseleave', shrink);
  });
})();
