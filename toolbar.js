(() => {
  const state = {
    editOn: false,
    selectedImg: null,
    replacedImages: new Map(), // img -> originalSrc
  };

  // Create toolbar DOM
  const wrap = document.createElement("div");
  wrap.innerHTML = document.getElementById("ipe-toolbar-template").innerHTML;
  const toolbar = wrap.firstElementChild;
  document.documentElement.appendChild(toolbar);

  const fileInput = document.getElementById("ipe-file");
  const btnToggle = document.getElementById("ipe-toggle");
  const btnReplace = document.getElementById("ipe-replace-image");
  const btnReset = document.getElementById("ipe-reset-images");
  const btnExport = document.getElementById("ipe-export");

  function setEditMode(on) {
    state.editOn = on;
    document.body.contentEditable = on ? "true" : "false";
    document.designMode = on ? "on" : "off";

    // Make images selectable for replacement
    document.querySelectorAll("img").forEach(img => {
      img.classList.toggle("ipe-selectable", on);
      img.removeEventListener("click", onImageClick, true);
      if (on) img.addEventListener("click", onImageClick, true);
    });

    // Update button label
    btnToggle.textContent = on ? "🛑 Stop Editing" : "✏️ Edit";
  }

  function onImageClick(e) {
    if (!state.editOn) return;
    e.preventDefault();
    e.stopPropagation();
    if (state.selectedImg) state.selectedImg.classList.remove("ipe-outline");
    state.selectedImg = e.currentTarget;
    state.selectedImg.classList.add("ipe-outline");
  }

  btnToggle.addEventListener("click", () => {
    setEditMode(!state.editOn);
    if (!state.editOn && state.selectedImg) {
      state.selectedImg.classList.remove("ipe-outline");
      state.selectedImg = null;
    }
  });

  btnReplace.addEventListener("click", () => {
    if (!state.selectedImg) {
      alert("Click an image first to select it.");
      return;
    }
    fileInput.click();
  });

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file || !state.selectedImg) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = state.selectedImg;
      if (!state.replacedImages.has(img)) {
        state.replacedImages.set(img, img.src);
      }
      img.src = reader.result; // data URL
    };
    reader.readAsDataURL(file);
    fileInput.value = "";
  });

  btnReset.addEventListener("click", () => {
    for (const [img, original] of state.replacedImages.entries()) {
      img.src = original;
      img.classList.remove("ipe-outline");
    }
    state.replacedImages.clear();
    state.selectedImg = null;
  });

  btnExport.addEventListener("click", async () => {
    // Try to inline <img> as data URLs if they are already data: or same-origin.
    // (Cross-origin images might be blocked by CORS; we leave them as-is.)
    const doc = document.cloneNode(true);
    const imgs = Array.from(doc.querySelectorAll("img"));
    await Promise.all(imgs.map(async (img) => {
      try {
        if (img.src.startsWith("data:")) return;
        const url = new URL(img.src, location.href);
        if (url.origin !== location.origin) return; // avoid CORS issues
        const res = await fetch(url.href, { mode: "same-origin", credentials: "include" });
        const blob = await res.blob();
        const reader = new FileReader();
        await new Promise((resolve) => {
          reader.onload = () => { img.setAttribute("src", reader.result); resolve(); };
          reader.readAsDataURL(blob);
        });
      } catch { /* ignore */ }
    }));

    // Serialize
    const html = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;

    // Download
    const filename = (document.title || "edited-page")
      .replace(/[^\w\-]+/g, "_")
      .slice(0, 60) + ".html";

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Ask background to download to avoid CSP issues
    window.postMessage({ type: "IPE_DOWNLOAD", url, filename }, "*");
  });

  // Show/hide toolbar from the service worker command
  function toggleToolbar() {
    toolbar.classList.toggle("ipe-hidden");
  }
  window.addEventListener("IPE_TOGGLE_TOOLBAR", toggleToolbar);

  // Listen for paste of images to replace selected image
  document.addEventListener("paste", async (e) => {
    if (!state.editOn || !state.selectedImg) return;
    const item = Array.from(e.clipboardData?.items || []).find(i => i.type.startsWith("image/"));
    if (!item) return;
    e.preventDefault();
    const file = item.getAsFile();
    const reader = new FileReader();
    reader.onload = () => {
      const img = state.selectedImg;
      if (!state.replacedImages.has(img)) state.replacedImages.set(img, img.src);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  // Receive download request
  window.addEventListener("message", (e) => {
    if (e.data?.type !== "IPE_DOWNLOAD_ACK") return;
    // Could handle success/failure messages if desired.
  });

})();
