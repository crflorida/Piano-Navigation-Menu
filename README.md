# 🎹 Piano Navigation Menu

An interactive **piano-inspired website navigation menu** built with **HTML, CSS, and JavaScript**.  
Each piano key doubles as a navigation link and plays a musical note instantly.

Watch it here:
https://youtu.be/m8O14i6PWPs


---

## ✨ Features
- 🎶 Piano-style keys act as clickable menu items  
- ⚡ Instant audio playback using the **Web Audio API**  
- ⌨️ Supports both keyboard input and mouse/touch  
- 🖱️ Smooth scrolling to page sections  
- 📱 Responsive design for different screen sizes  

---

## 📂 Project Structure
Piano-Navigation-Menu/
│── index.html # Main page
│── piano2/ # CSS + JS for piano
│── tunes/ # Audio files (a.wav, w.wav, etc.)
│── css/ # General styles
│── js/ # Supporting scripts
│── LICENSE # MIT License
│── README.md # Project documentation


---

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/YourUsername/Piano-Navigation-Menu.git
cd Piano-Navigation-Menu

Open in a browser

You can open index.html directly in your browser.

⚠️ Tip: For audio to work reliably, use a local server instead of file://.

Example with Python 3:
python -m http.server 8000
Then visit: http://localhost:8000

🎧 Audio Files

All note sounds are stored in the tunes/ directory.
Ensure filenames match the data-key attributes in index.html, e.g.:
a.wav, w.wav, s.wav, e.wav, d.wav, ...

🔧 Customization

Replace the .wav files in tunes/ with your own sounds

Edit piano2/script.js to add or remove keys

Modify piano2/style.css to redesign the piano layout

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a feature branch

git checkout -b feature-name

Commit your changes
git commit -m "Add feature"

Push to your fork and open a Pull Request


