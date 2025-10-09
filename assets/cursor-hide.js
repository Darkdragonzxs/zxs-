window.addEventListener("message", (e) => {
  if (!e.data || e.data.type !== "ZXS_CURSOR_CONTROL") return;

  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) return;

  if (e.data.action === "hide") {
    cursor.style.opacity = "0";
    cursor.style.pointerEvents = "none";
    document.body.style.cursor = "default";
  } else if (e.data.action === "show") {
    cursor.style.opacity = "1";
    cursor.style.pointerEvents = "auto";
    document.body.style.cursor = "none";
  }
});
