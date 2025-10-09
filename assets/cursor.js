(() => {
  // Only run once page is loaded
  window.addEventListener("DOMContentLoaded", () => {
    // Always use a safe reference to top window
    const topWin = window.top;

    // Function to tell parent to hide cursor
    const hideCursor = () => {
      try {
        topWin.postMessage({ zxsCursor: "hide" }, "*");
      } catch (e) {}
    };

    // Function to tell parent to show cursor
    const showCursor = () => {
      try {
        topWin.postMessage({ zxsCursor: "show" }, "*");
      } catch (e) {}
    };

    // Immediately hide cursor once the game loads
    hideCursor();

    // When game iframe is unloaded or loses focus → show cursor again
    window.addEventListener("blur", showCursor);
    window.addEventListener("beforeunload", showCursor);
  });
})();
