# ✨ OpenEditor  

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-active-success.svg)

> Turn any website into a live, editable canvas.  
With **OpenEditor**, the web becomes your playground — type directly on pages, replace images, and export your edits as HTML.  

---

## 🚀 Features  

- 📝 **Edit Mode** — Toggle `contentEditable` to type anywhere.  
- 🖼️ **Replace Images** — Click an image and swap it with your own.  
- ↩️ **Reset Changes** — Restore images to their originals in one click.  
- 💾 **Export HTML** — Save your edited page as a standalone file.  
- 🔒 **Local Only** — All edits happen in your browser. Nothing is uploaded.  
- 🎨 **Simple & Fun** — Perfect for demos, mockups, pranks, or experiments.  

---

## 📥 Installation  

### Developer Mode (manual install)  

```bash
# Clone this repo
git clone https://github.com/yourusername/OpenEditor.git

# Open Chrome
# Go to chrome://extensions/
# Enable "Developer Mode" (top-right)
# Click "Load unpacked" and select the project folder
Once loaded, the extension icon will appear in your toolbar.

🎯 Usage
Open any website.

Click the OpenEditor icon in your extensions bar.

A floating toolbar will appear in the top-left corner.

Use the toolbar buttons:

text
Copy code
✏️  Edit        → Toggle editing mode
🖼️  Replace     → Replace the currently selected image
↩️  Reset       → Restore replaced images
💾  Export      → Save your edited page as HTML
Example:

js
Copy code
// In Edit Mode, the page behaves like a text editor
document.body.contentEditable = true;

// Replace an image by clicking it and choosing a new file
<img src="original.png" />
// → becomes
<img src="data:image/png;base64,...yourimage..." />
📸 Screenshots
(Add screenshots or a demo GIF here for best effect!)

🔧 Development
Want to hack on OpenEditor?

bash
Copy code
# Fork this repo
git clone https://github.com/yourusername/OpenEditor.git
cd OpenEditor

# Make changes to content.js / service_worker.js
# Reload the extension in chrome://extensions/
Pull requests are welcome 🚀

📜 License
This project is licensed under the MIT License.
See the LICENSE file for details.

👋 About
Built by Jack — a developer who enjoys making tools that are:

⚡ Fast and simple

🛠️ Useful for creators and developers

🎨 Playful and fun

If you like OpenEditor:

⭐ Star this repo

🐛 Report issues

🚀 Suggest features

Let’s make the web editable together!
