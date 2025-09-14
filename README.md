✨ OpenEditor

Turn any website into a live, editable canvas.
With OpenEditor, the web becomes your playground — type directly on pages, replace images, and export your edits as HTML.

🚀 Features

📝 Edit Mode — Instantly toggle contentEditable and type anywhere.

🖼️ Replace Images — Click an image and swap it with your own.

↩️ Reset Changes — Restore images to their originals in one click.

💾 Export HTML — Save your edited page as a standalone file.

🔒 Local Only — All edits happen in your browser. Nothing is uploaded.

🎨 Simple & Fun — Great for demos, mockups, pranks, or just experimenting.

📥 Installation
Developer Mode (manual install)

Download or clone this repo:

git clone https://github.com/yourusername/OpenEditor.git


Open Chrome and go to chrome://extensions/.

Enable Developer Mode (top right).

Click Load unpacked and select the project folder.

The extension icon will appear in your toolbar.

🎯 Usage

Open any website.

Click the OpenEditor icon in your extensions bar.

A floating toolbar appears (top-left corner).

Use the buttons to:

✏️ Toggle Edit Mode

🖼️ Replace selected images

↩️ Reset replaced images

💾 Export your current edits as an HTML file

📸 Screenshots

(Add your screenshots here — maybe a GIF showing editing in action!)

🔧 How It Works

OpenEditor uses Chrome’s content scripts to inject a floating toolbar into any webpage.

Edit mode uses the browser’s built-in document.body.contentEditable.

Image replacement swaps src attributes with data URLs.

Export clones the DOM, inlines images when possible, and saves it as HTML.

All of this happens client-side — nothing leaves your browser.

🛠️ Development

Want to contribute? Awesome 🎉

Fork this repo and submit PRs.

File issues for bugs or feature requests.

Ideas welcome — let’s make this the ultimate "edit the web" tool.

📜 License

This project is licensed under the MIT License.
See the LICENSE
 file for details.

👋 About

Built by Jack — a developer who likes making tools that are useful, fun, and a little playful.

If you enjoy OpenEditor:

⭐ Star this repo

🐛 Report issues

🚀 Suggest features

Let’s make the web editable together!
