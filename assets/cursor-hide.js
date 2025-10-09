// cursor-helper.js
(function() {
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.style.position = 'fixed';
  cursor.style.pointerEvents = 'none';
  cursor.style.width = '16px';
  cursor.style.height = '16px';
  cursor.style.background = 'white';
  cursor.style.borderRadius = '50%';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.transition = 'width 0.1s, height 0.1s, background 0.1s';
  cursor.style.zIndex = '9999';
  cursor.style.mixBlendMode = 'difference'; // Invert effect
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  const speed = 0.2; // Smooth delay

  // Track mouse
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Enlarge cursor on interactive elements
  const hoverSelector = 'button, a, input, textarea, [data-hover]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverSelector)) {
      cursor.style.width = '28px';
      cursor.style.height = '28px';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverSelector)) {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
    }
  });

  // Hide default cursor everywhere
  document.body.style.cursor = 'none';

  // Hide custom cursor in game iframe
  function updateCursorVisibility() {
    const gameIframe = document.querySelector('iframe[src*="BP1.html"]');
    if (!gameIframe) return cursor.style.display = 'block';
    
    const rect = gameIframe.getBoundingClientRect();
    const isInside = mouseX >= rect.left && mouseX <= rect.right &&
                     mouseY >= rect.top && mouseY <= rect.bottom;
    cursor.style.display = isInside ? 'none' : 'block';
  }

  // Animate cursor
  function animate() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    updateCursorVisibility();
    requestAnimationFrame(animate);
  }
  animate();
})();
