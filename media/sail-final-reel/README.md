# Sail — final connected-experience reel

69.273 seconds, portrait 1080×1920, 60fps. Native HyperFrames HTML/SVG/GSAP with locally bundled real hotel/product images and fonts. No image generation.

The reviewed opening demonstrates discovery versus an interactive branded experience. The updated middle follows two real seat-selection round trips: live seat availability and an explicitly confirmed reservation. Requests travel down; authoritative results return up. The selected seat remains blue until the airline returns success, then 12A turns green. The same confirmed seat map remains in the phone through the richer finale.

Sail uses its blue branded block and Open Sail vector logo. Secondary protocol labels and fine print are removed. Willow Clinic headers remain removed. The earlier seat example now uses the same 3+3 cabin layout.

The voiceover uses the original local Kokoro heart/nova blend; the new explanatory section is generated in the same voice. Audio includes an original procedural instrumental bed and is normalized for final delivery.

## Render the supplied composition

Install Node.js22+, FFmpeg and Chromium, then `npm install` and `npm run render`. Set `HYPERFRAMES_BROWSER_PATH` if necessary. `index.html` and bundled `assets/fullmix.wav` are sufficient; no TTS service or image service is needed.

`build-final.py` assembles the reviewed opening, updated seat-map flow and closing using a deterministic master timeline. Its input snapshots are bundled in `inputs/`. Regenerating narration additionally requires Kokoro ONNX and its voice/model files; the ready-to-render audio is already included.

Business endpoints and the airline name are illustrative. The linked UI/tool interaction assumes a supporting assistant host; this does not claim universal host support or production integrations. The airline system is authoritative for seat availability and successful reservation.

## Composer and pronunciation correction

The phone composer and home indicator are anchored to the screen, outside the animated service card. Corrected seat-grid markup prevents the assembler from changing that hierarchy. Both seat 12A voiceover passages explicitly pronounce the letter A (/eɪ/); their audio lengths and the approved timeline are preserved. `fix-seat-pronunciation.py` applies that timing-preserving correction. Runtime, layout and contrast checks pass.
