# ✨ OpenEditor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![Version](https://img.shields.io/badge/version-1.0-blue)
![Status](https://img.shields.io/badge/status-active-success.svg)

> A Chrome extension that turns any website into an editable canvas.  
> Type directly on pages, replace images, reset changes, and export your edits as HTML — all locally, on demand.

---

## 🚀 Features

- 📝 **Edit Mode** — Toggle `contentEditable` and type anywhere on the page.  
- 🖼️ **Replace Images** — Click an image to select it, then swap it with your own file or pasted clipboard image.  
- ↩️ **Reset Changes** — Restore replaced images back to their originals.  
- 💾 **Export HTML** — Save your edited page as a standalone `.html` file (inlines same-origin images when possible).  
- 🧭 **On-Demand UI** — Toolbar appears only when you click the extension icon.  
- 🔒 **Local Only** — Everything runs in your browser; nothing is uploaded.

---

## 📥 Installation

### Option 1 — Developer Mode (manual install)

~~~bash
git clone https://github.com/HandyRepos/OpenEditor.git
~~~

1. Open Chrome and navigate to:
   ```
   chrome://extensions/
   ```
2. # Enable "Developer Mode" (top-right)  
3. # Click "Load unpacked" and select the project folder

Once loaded, the extension icon will appear in your toolbar.

---

## 🎯 Usage

Open any website.  
Click the **OpenEditor** icon in your extensions bar.  
A floating toolbar will appear in the top-left corner.  
Use the toolbar buttons:

~~~text
✏️  Edit        → Toggle editing mode
🖼️  Replace     → Replace the currently selected image
↩️  Reset       → Restore replaced images
💾  Export      → Save your edited page as HTML
~~~

### Example

~~~js
// In Edit Mode, you can type directly into the page:
document.body.contentEditable = true;

// Replace an image by selecting it and choosing a new file:
<img src="original.png" />
// → becomes
<img src="data:image/png;base64,...yourimage..." />
~~~

> Tip: Assign a keyboard shortcut at `chrome://extensions/shortcuts` to trigger the extension without clicking the icon.

---

## 🧩 File Structure (suggested)

~~~text
OpenEditor/
├─ manifest.json
├─ service_worker.js
├─ content.js
├─ toolbar.css        (optional; we inline styles in content.js by default)
└─ icons/
   └─ icon128.png
~~~

---

## 🔧 Development

~~~bash
# Fork this repo
git clone https://github.com/HandyRepos/OpenEditor.git
cd OpenEditor

# Make changes to content.js / service_worker.js
# Then reload the extension in chrome://extensions/
~~~

### Minimal `manifest.json` (MV3)

~~~json
{
  "name": "OpenEditor",
  "description": "Toggle contentEditable, swap images, and export your edited page.",
  "version": "1.0",
  "manifest_version": 3,
  "permissions": ["activeTab", "scripting", "downloads", "storage"],
  "host_permissions": ["<all_urls>"],
  "background": { "service_worker": "service_worker.js" },
  "action": {
    "default_title": "OpenEditor",
    "default_icon": { "128": "icons/icon128.png" }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ]
}
~~~

---

## 🔐 Permissions Explained

- `activeTab` — interact with the current tab when you click the icon.  
- `scripting` — send messages to the page to toggle the toolbar.  
- `downloads` — save the exported HTML file.  
- `storage` — room for future options (e.g., preferences or autosave).  
- `host_permissions: <all_urls>` — allow editing on any site you open.

> Note: Chrome blocks extensions on some restricted pages (e.g., `chrome://` and the Web Store).

---

## 🧪 Known Limitations

- **CORS/CSP:** Export inlines images only if they’re same-origin or already `data:` URLs. Cross-origin images may remain as external links.  
- **Complex Layouts:** Editing live DOM may shift layouts (flex/grid). This is expected.  
- **Temporary Edits:** Refreshing the page resets changes unless you export.

---

## 🐞 Troubleshooting

- **No toolbar on click?**  
  - Refresh the page after (re)loading the extension.  
  - Check **Console** for errors.  
  - Ensure page isn’t a restricted URL (e.g., `chrome://`).

- **Exported file missing some images?**  
  - Those images were likely cross-origin and blocked from being inlined by CORS/CSP.

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue to discuss significant changes first.  
Ideas for next features: drag-drop image replacement, sticky notes, per-site autosave, text boxes.

---

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

## 👋 About

Built by **Jack** — a developer who enjoys making tools that are:
- ⚡ Fast and simple  
- 🛠️ Useful for creators and developers  
- 🎨 Playful and fun

If you like OpenEditor:
- ⭐ Star this repo  
- 🐛 Report issues  
- 🚀 Suggest features

Let’s make the web editable together!
