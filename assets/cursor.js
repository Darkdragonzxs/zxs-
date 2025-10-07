// custom-cursor.js
(() => {
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
    zIndex: '9999',
    mixBlendMode: 'difference',
    background: 'white',
    transition: 'transform 0.05s ease-out, width 0.2s ease, height 0.2s ease',
  });

  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Enlarge cursor on hover over interactive elements
  const interactives = document.querySelectorAll('a, button, select');
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
