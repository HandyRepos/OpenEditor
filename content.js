// content.js — lazy mounts the toolbar only when you click the extension icon

(() => {
  if (window.__ope_injected) return;
  window.__ope_injected = true;

  let toolbar = null;
  let fileInput = null;

  const state = {
    editOn: false,
    selectedImg: null,
    replacedImages: new Map()
  };

  function makeBtn(text) {
    const b = document.createElement("button");
    Object.assign(b.style, {
      border: "0",
      borderRadius: "10px",
      padding: "6px 10px",
      cursor: "pointer",
      background: "#2d7ef7",
      color: "#fff",
      fontWeight: "600"
    });
    b.textContent = text;
    return b;
  }

  function setEditMode(on, btnToggle) {
    state.editOn = on;
    document.body.contentEditable = on ? "true" : "false";
    document.designMode = on ? "on" : "off";

    document.querySelectorAll("img").forEach(img => {
      img.style.cursor = on ? "crosshair" : "";
      img.removeEventListener("click", onImageClick, true);
      if (on) img.addEventListener("click", onImageClick, true);
    });

    if (btnToggle) btnToggle.textContent = on ? "🛑 Stop Editing" : "✏️ Edit";

    if (!on && state.selectedImg) {
      state.selectedImg.style.outline = "";
      state.selectedImg = null;
    }
  }

  function onImageClick(e) {
    if (!state.editOn) return;
    e.preventDefault(); e.stopPropagation();
    if (state.selectedImg) state.selectedImg.style.outline = "";
    state.selectedImg = e.currentTarget;
    state.selectedImg.style.outline = "2px dashed #2d7ef7";
    state.selectedImg.style.outlineOffset = "2px";
  }

  function mountToolbar() {
    if (toolbar) return; // already mounted

    toolbar = document.createElement("div");
    Object.assign(toolbar.style, {
      position: "fixed",
      top: "12px",
      left: "12px",
      zIndex: "2147483647",
      display: "flex",
      gap: "8px",
      padding: "8px 10px",
      background: "rgba(28,28,28,.92)",
      color: "#fff",
      borderRadius: "12px",
      boxShadow: "0 6px 24px rgba(0,0,0,.25)",
      fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    });

    const btnToggle  = makeBtn("✏️ Edit");
    const btnReplace = makeBtn("🖼️ Replace Image");
    const btnReset   = makeBtn("↩️ Reset Images");
    const btnExport  = makeBtn("💾 Export HTML");
    toolbar.append(btnToggle, btnReplace, btnReset, btnExport);

    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    document.documentElement.appendChild(toolbar);
    document.documentElement.appendChild(fileInput);

    // Wire up events
    btnToggle.addEventListener("click", () => setEditMode(!state.editOn, btnToggle));

    btnReplace.addEventListener("click", () => {
      if (!state.selectedImg) return alert("Click an image first to select it.");
      fileInput.click();
    });

    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (!file || !state.selectedImg) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = state.selectedImg;
        if (!state.replacedImages.has(img)) state.replacedImages.set(img, img.src);
        img.src = reader.result; // data URL
      };
      reader.readAsDataURL(file);
      fileInput.value = "";
    });

    btnReset.addEventListener("click", () => {
      for (const [img, original] of state.replacedImages.entries()) {
        img.src = original;
        img.style.outline = "";
      }
      state.replacedImages.clear();
      state.selectedImg = null;
    });

    btnExport.addEventListener("click", async () => {
      const doc = document.cloneNode(true);
      const imgs = Array.from(doc.querySelectorAll("img"));
      await Promise.all(imgs.map(async (img) => {
        try {
          const src = img.getAttribute("src") || "";
          if (src.startsWith("data:")) return;
          const url = new URL(src, location.href);
          if (url.origin !== location.origin) return;
          const res = await fetch(url.href, { mode: "same-origin", credentials: "include" });
          if (!res.ok) return;
          const blob = await res.blob();
          const reader = new FileReader();
          await new Promise((resolve) => {
            reader.onload = () => { img.setAttribute("src", reader.result); resolve(); };
            reader.readAsDataURL(blob);
          });
        } catch {}
      }));

      const htmlOut = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
      const blob = new Blob([htmlOut], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      chrome.runtime.sendMessage({
        type: "OPE_DOWNLOAD",
        url,
        filename: (document.title || "edited-page").replace(/[^\w\-]+/g, "_").slice(0, 60) + ".html"
      });
    });
  }

  // Listen for the extension icon click and lazy mount/toggle
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type !== "OPE_TOGGLE_TOOLBAR") return;

    // First click mounts; subsequent clicks toggle visibility
    if (!toolbar) {
      mountToolbar();
    } else {
      toolbar.style.display = (toolbar.style.display === "none") ? "flex" : "none";
    }
  });
})();
