(function() {
  const CURRENT_VERSION = '676767676767676767676767';
  const LAST_VERSION_KEY = 'zxs_last_seen_version';
  if (typeof localStorage === 'undefined') return;
  const lastSeen = localStorage.getItem(LAST_VERSION_KEY);
  if (lastSeen === CURRENT_VERSION) return;

  // Fonts
  const link = document.createElement('link');
  link.href = "https://fonts.googleapis.com/css2?family=Metal+Mania&family=Inter:wght@400;700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  // Overlay
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
    background: 'rgba(11,15,18,0.9)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: '9999', opacity: '0', transition: 'opacity 1s ease-out'
  });
  document.body.appendChild(overlay);

  // Container
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'relative', width: '60vw', height: '40vh',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    transition: 'opacity 1s ease-out'
  });
  overlay.appendChild(container);

  function createHalf(clip) {
    const half = document.createElement('div');
    Object.assign(half.style, {
      position: 'absolute', left: '0', width: '100%', height: '50%',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      overflow: 'hidden', clipPath: clip,
      transition: 'transform 1s ease-out'
    });
    return half;
  }
  const topHalf = createHalf('inset(0 0 50% 0)');
  const bottomHalf = createHalf('inset(50% 0 0 0)');
  container.appendChild(topHalf);
  container.appendChild(bottomHalf);

  function createText(char) {
    const text = document.createElement('div');
    text.textContent = char;
    Object.assign(text.style, {
      fontSize: 'clamp(60px, 15vw, 160px)',
      fontFamily: "'Metal Mania', cursive",
      color: 'white',
      textShadow: '2px 2px 0 #000, 4px 4px 5px rgba(128,128,128,0.8)',
      transform: 'scale(0.7) skewX(-5deg) rotate(-2deg)',
      opacity: '0',
      transition: 'all 1s ease-out'
    });
    return text;
  }
  const topText = createText('ZXS');
  const bottomText = createText('ZXS');
  topHalf.appendChild(topText);
  bottomHalf.appendChild(bottomText);

  // Slice
  const slice = document.createElement('div');
  Object.assign(slice.style, {
    position: 'absolute', top: '50%', left: '50%',
    width: '0', height: '3px', background: 'white',
    transform: 'translate(-50%, -50%)', opacity: '0',
    transition: 'all 1s ease-out'
  });
  container.appendChild(slice);

  // Flash
  const flash = document.createElement('div');
  Object.assign(flash.style, {
    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
    background: 'white', opacity: '0', pointerEvents: 'none',
    transition: 'opacity 0.5s ease-out'
  });
  overlay.appendChild(flash);

  // Version number
  const versionDiv = document.createElement('div');
  versionDiv.textContent = `v${CURRENT_VERSION}`;
  Object.assign(versionDiv.style, {
    color: 'white', fontSize: '2rem', opacity: '0', marginTop: '1rem',
    transition: 'opacity 1s ease-out'
  });
  container.appendChild(versionDiv);

  // Popup centered
  const popup = document.createElement('div');
  Object.assign(popup.style, {
    position: 'fixed', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%) scale(0.7)',
    background: '#111', borderRadius: '16px',
    padding: '1.5rem 2rem', textAlign: 'left',
    opacity: '0', transition: 'all 1s ease-out',
    maxWidth: '70vw', maxHeight: '60vh', overflowY: 'auto',
    boxShadow: '0 0 30px rgba(128,128,128,0.8)',
    fontFamily: "Inter, sans-serif",
    color: 'white'
  });
  overlay.appendChild(popup);

  const popupContent = document.createElement('div');
  popupContent.id = 'zxs_update_log';
  popupContent.innerHTML = `
# Update 3.0.0
**New Features**
- VMS
- Removed apps and proxy
- this thingthing (looks cool)
- link generator
</pre>
  `;
  popup.appendChild(popupContent);

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  Object.assign(closeBtn.style, {
    marginTop: '1rem', padding: '0.6rem 1.2rem',
    background: '#000', color: '#fff', border: 'none',
    borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer'
  });
  popup.appendChild(closeBtn);

  closeBtn.addEventListener('click', () => {
    popup.style.transform = 'translate(-50%, -50%) scale(0.7)';
    popup.style.opacity = '0';
    overlay.style.opacity = '0';
    container.style.opacity = '0';
    localStorage.setItem(LAST_VERSION_KEY, CURRENT_VERSION);
    setTimeout(() => overlay.remove(), 1000);
  });

  // Markdown parser with <pre>
  function parseMarkdown(md) {
    return md
      .replace(/<pre>([\s\S]*?)<\/pre>/g, '<pre>$1</pre>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\s*-\s+(.*)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
  }
  popupContent.innerHTML = parseMarkdown(popupContent.innerHTML);

  // Animate overlay
  requestAnimationFrame(() => overlay.style.opacity = '1');

  setTimeout(() => {
    topText.style.opacity = '1';
    topText.style.transform = 'scale(1) skewX(-3deg) rotate(0deg)';
    bottomText.style.opacity = '1';
    bottomText.style.transform = 'scale(1) skewX(3deg) rotate(0deg)';
  }, 100);

  setTimeout(() => {
    slice.style.width = '120%';
    slice.style.opacity = '1';
    topHalf.style.transform = 'translateY(-60px)';
    bottomHalf.style.transform = 'translateY(60px)';

    flash.style.opacity = '0.8';
    setTimeout(() => flash.style.opacity = '0', 500);
    setTimeout(() => slice.style.opacity = '0', 1000);

    setTimeout(() => {
      versionDiv.style.opacity = '1';
      setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 800);
    }, 1000);
  }, 1000);

  // Hidden version ID
  const versionId = document.createElement('div');
  versionId.id = 'zxs_version_number';
  versionId.textContent = CURRENT_VERSION;
  versionId.style.display = 'none';
  document.body.appendChild(versionId);
})();
