# Sail reel — Remotion

The approved Sail reel migrated to a native React/DOM/SVG Remotion composition. 1080×1920, 60 fps, 4,157 frames (69.283 seconds). Original script, photography, fonts, narration, music, transitions, seat-selection round trips, and final payoff are preserved.

[Download the Remotion render](https://github.com/raagulmanoharan/Sail/raw/refs/heads/share/sail-concept-video/media/sail-remotion-reel.mp4)

## Run

Requirements: Node.js 22+, npm, Chromium and FFmpeg. On this cloud machine Chromium is `/usr/bin/chromium`.

```sh
npm --cache /tmp/sail-npm-cache ci
npm run check
npm run compositions
npm run validate
npm run render
```

The rendered video is `renders/sail-remotion-reel.mp4`. To preview/edit, run `npm run studio`. Change the `--browser-executable` flag for your machine if needed. The source bundle includes every asset needed to render without external image/audio/font requests.

## Composition

- `src/Root.tsx` registers `SailReel`.
- `src/SailReel.tsx` renders the scene as React elements and evaluates motion from `useCurrentFrame()`.
- `src/scene.json` contains editable HTML/SVG geometry, text and attributes.
- `src/motion.json` contains frame-indexed style/text/attribute keyframes from the approved authored motion. Evaluation uses binary search, so the output does not depend on playback order or a running clock.
- `src/styles.ts` supplies scoped CSS; `src/scene.css` is its readable counterpart.
- `public/assets` contains local photography, SVGs, DM Sans fonts and the approved normalized audio.

This is a source migration, not an MP4 used as a video background. There is no iframe, GSAP runtime, HyperFrames runtime, or screenshot sequence in the Remotion composition. Transform and easing values were sampled once at the delivery frame rate to retain the approved animation exactly. The reusable frame tracks are intentionally a fidelity-preserving port rather than a new spring-based redesign.

`scripts/export-reference.mjs` documents the one-time migration. Regenerating those tracks requires the original HyperFrames HTML and its Puppeteer dependency; it is not needed to edit or render the included Remotion project. Set `SAIL_REFERENCE_DIR` to the original source location if rerunning it.

## Validation

TypeScript checking, composition discovery, 17 representative still renders and a backward-seek repeat are checked. `qa/validation.json` records runtime/seek results; `qa/visual-comparison.json` records pixel differences from the original source captures. `qa/storyboard.jpg` shows the checked frames. Rendered MP4 metadata and an encoded-frame check are included with delivery.

Business names/endpoints shown in the animation are illustrative, as in the approved reel.
