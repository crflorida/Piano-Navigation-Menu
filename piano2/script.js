// ======= CONFIG =======
const KEYS = ["a","w","s","e","d","f","t","g","y","h","u","j","k","o","l","p",";"];
const BASE = "tunes/"; // WAVs are next to your HTML in /tunes/

// ======= STATE =======
let ctx;                         // AudioContext
const buffers = new Map();       // key -> AudioBuffer
let unlocked = false;

// Small helper for selecting keys like ";"
function cssEscape(s){return (window.CSS&&CSS.escape)?CSS.escape(s):s.replace(/([^\w-])/g,"\\$1");}

// ======= INIT =======
document.addEventListener("DOMContentLoaded", () => {
  // iOS/Autoplay: unlock on first gesture and preload/decode
  const unlockAndPreload = async () => {
    if (unlocked) return;
    unlocked = true;

    // Warn if running from file:// (fetch will fail)
    if (location.protocol === "file:") {
      console.warn("[piano] You're opening the HTML from your file system. Use a local server (http://) so fetch() can load the WAVs.");
    }

    // Create audio context
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();

    // Fetch + decode all WAVs
    let okCount = 0;
    await Promise.all(
      KEYS.map(async (k) => {
        const url = `${BASE}${encodeURIComponent(k)}.wav`;
        try {
          console.log("[piano] fetching", url);
          const res = await fetch(url, { cache: "force-cache" });
          if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
          const arr = await res.arrayBuffer();
          const buf = await ctx.decodeAudioData(arr);
          buffers.set(k, buf);
          okCount++;
        } catch (err) {
          console.error("[piano] preload error:", err.message || err);
        }
      })
    );

    if (ctx.state === "suspended") {
      try { await ctx.resume(); } catch {}
    }

    console.log(`[piano] decoded ${okCount}/${KEYS.length} notes`);
    if (okCount === 0) {
      console.warn("[piano] No notes decoded. Check that your WAV files exist in /tunes/ and filenames match the keys.");
    }

    window.removeEventListener("pointerdown", unlockAndPreload, { passive: true });
    window.removeEventListener("keydown", unlockAndPreload, { passive: true });
  };

  window.addEventListener("pointerdown", unlockAndPreload, { passive: true });
  window.addEventListener("keydown", unlockAndPreload, { passive: true });

  wireUI();
  // Handy console test: type playTest('a') in DevTools
  window.playTest = (k)=>playKey(String(k||'a').toLowerCase());
});

// ======= UI =======
function wireUI() {
  // Pointer
  document.querySelectorAll(".piano-keys .key").forEach((el) => {
    el.addEventListener("pointerdown", () => {
      const key = el.getAttribute("data-key");
      playKey(key);
      flash(el);
      maybeScroll(el);
    });
  });

  // Keyboard
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (!KEYS.includes(key)) return;
    const el = document.querySelector(`.piano-keys .key[data-key="${cssEscape(key)}"]`);
    playKey(key);
    if (el) { flash(el); maybeScroll(el); }
  });
}

// ======= PLAYBACK =======
function playKey(key) {
  if (!key) return;

  // If we have a decoded buffer, play via Web Audio (instant)
  if (ctx && buffers.has(key)) {
    if (ctx.state === "suspended") ctx.resume().catch(()=>{});
    const src = ctx.createBufferSource();
    src.buffer = buffers.get(key);
    src.connect(ctx.destination);
    src.start(0);
    return;
  }

  // Fallback: try plain <audio> for this hit so you hear *something*
  // (useful if preload failed or file missing)
  const url = `${BASE}${encodeURIComponent(key)}.wav`;
  const a = new Audio(url);
  a.currentTime = 0;
  a.play().catch(err => {
    console.error("[piano] fallback play error:", err);
  });
}

// ======= UX HELPERS =======
function flash(el) {
  el.classList.add("is-pressed");
  setTimeout(()=>el.classList.remove("is-pressed"), 120);
}

function maybeScroll(el) {
  const link = el.querySelector(".menu-link, .menu-label, a[href^='#']");
  if (!link) return;
  const target = link.getAttribute("href");
  if (target && target.startsWith("#")) {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
