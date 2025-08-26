🎹 Piano Navigation Menu
An interactive piano-inspired website navigation menu built with HTML, CSS, and JavaScript.
Each piano key doubles as a navigation link and plays a musical note instantly.

✨ Features
Piano-style keys act as clickable menu items.
Instant audio playback using the Web Audio API.
Works with both keyboard input and mouse/touch.
Smooth scrolling to sections.
Responsive layout for different screen sizes.

📂 Project Structure
Piano-Navigation-Menu/ │── index.html # Main page │── piano2/ # CSS + JS for piano │── tunes/ # Audio files (a.wav, w.wav, etc.) │── css/ # General styles │── js/ # Supporting scripts │── LICENSE # MIT License │── README.md # Project documentation

🚀 Getting Started

1. Clone the repository
git clone https://github.com/YourUsername/Piano-Navigation-Menu.git
cd Piano-Navigation-Menu

2. Open in a browser

Simply open index.html in your browser.
⚠️ Tip: For audio to work reliably, serve the files with a local server instead of file://.

Example using Python:
# Python 3
python -m http.server 8000
Then visit: http://localhost:8000

🎧 Audio Files

All note sounds are stored in the tunes/ directory.
Make sure filenames match your data-key attributes in index.html:
a.wav, w.wav, s.wav, e.wav, d.wav, ...

🔧 Customization

Replace the .wav files in tunes/ with your own sounds.

Edit piano2/script.js to add or remove keys.

Change CSS in piano2/style.css to redesign the piano layout.

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m "Added feature")

Push to your fork and open a Pull Request
