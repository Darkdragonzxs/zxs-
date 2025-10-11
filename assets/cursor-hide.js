(() => {
  // Remove the custom cursor element if it exists
  const cursor = document.querySelector('body > div'); // adjust selector if you gave it a specific class
  if (cursor) cursor.remove();

  // Remove the style that hides the system cursor
  const style = [...document.head.querySelectorAll('style')].find(s => s.textContent.includes('cursor: none'));
  if (style) style.remove();

  // Restore default cursor
  document.body.style.cursor = 'default';
})();
