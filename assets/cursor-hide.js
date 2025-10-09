(() => {
  // Wait until everything is ready
  window.addEventListener("load", () => {
    try {
      // Tell top frame to hide cursor
      window.top.postMessage({ type: "ZXS_CURSOR", action: "hide" }, "*");

      // When the game loses focus or closes, tell top frame to show it again
      const restore = () => {
        window.top.postMessage({ type: "ZXS_CURSOR", action: "show" }, "*");
      };

      window.addEventListener("blur", restore);
      window.addEventListener("beforeunload", restore);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState !== "visible") restore();
      });
    } catch (err) {
      console.warn("Cursor message error:", err);
    }
  });
})();
