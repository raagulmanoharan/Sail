# Sail — business-facing HyperFrames reel

88.863 seconds · 1080×1920 · 60fps. Native HTML/SVG/GSAP; bundled photographs, fonts, narration and original instrumental music.

The approved customer discovery opening remains. The added business sequence demonstrates picking a widget template, customizing the brand/copy, previewing confirmed and pending states, connecting business actions and a status lookup, approving publication, and reusing one widget across supported assistant, website and app surfaces. The same mounted phone and seat widget move into the API architecture and stay through the closing payoff.

## Design reference

The widget editor is adapted from slide 5 ("Make it your experience") of the Sail deck on the `gh-pages` branch, commit `75e9d5f42796fe77ce9fc5e7b9aea60b9f9495ed`. Its design/choices/result-state tabs, live preview, developer connection and owner approval inform the new sequence. `deck-reference.html` is the exact reference snapshot. The deck uses a membership-access template; the reel applies that builder pattern to its existing seat-selection example to maintain continuity.

https://raagulmanoharan.github.io/Sail/

Cross-channel reuse follows the user's product direction. The visuals explain the intended offering; they do not claim these integrations or the builder are already shipped. Business endpoints are illustrative, and assistant distribution requires a supporting host. Business systems remain authoritative for permissions, seat availability and reservation outcomes.

## Render

Install Node.js22+, FFmpeg and Chromium, then `npm install` and `npm run render`. If necessary set `HYPERFRAMES_BROWSER_PATH=/usr/bin/chromium`. All assets needed to render are bundled; no image or speech service is required.

`build-final.py` assembles the approved opening, builder sequence, corrected existing architecture narration, and business-facing ending. `builder-animation.js` explicitly controls the persistent phone's transforms. The previous abrupt architecture phone replacement is removed. `verify-transition.mjs` samples geometry frame by frame across the architecture entrance and checks that no second phone or abrupt position change occurs.

`make-business-audio.py` regenerates the additional narration using the same Kokoro heart/nova blend. It requires the Kokoro ONNX model and voices, configured with `SAIL_KOKORO_MODEL` and `SAIL_KOKORO_VOICES`. The existing architecture narration preserves the corrected letter-A pronunciation and its original timings.
