# Sail — original Remotion visual direction

An independent motion-poster interpretation of the Sail business explainer. Dark navy, acid lime, lavender and mint; bold kinetic typography; dark phone chrome; rich branded widgets; a horizontal request/response architecture; and a colorful outcome montage.

This version shares the approved story and audio with the light HyperFrames reel, while deliberately changing the composition, typography, palette, transitions, layout and finale. It uses native React components with Remotion `interpolate()` and `spring()` animation. No imported HyperFrames HTML, sampled GSAP tracks, video background, iframe, or image generation.

- **New Remotion video:** [Download](https://github.com/raagulmanoharan/Sail/raw/refs/heads/share/sail-concept-video/media/sail-remotion-design.mp4)
- **Original HyperFrames video:** [Download](https://github.com/raagulmanoharan/Sail/raw/refs/heads/share/sail-concept-video/media/sail-final-reel.mp4)
- **Synchronized comparison video:** [Download](https://github.com/raagulmanoharan/Sail/raw/refs/heads/share/sail-concept-video/media/sail-framework-comparison.mp4)
- **Visual comparison:** [View](https://github.com/raagulmanoharan/Sail/blob/share/sail-concept-video/media/sail-remotion-design/hyperframes-vs-remotion.jpg)

Both are 1080×1920, 60fps, approximately 69 seconds. The shared voiceover/music makes the comparison about visual direction.

## Run

Node.js22+, npm, Chromium and FFmpeg. This cloud machine uses `/usr/bin/chromium`; change that script flag for a different machine.

```sh
npm --cache /tmp/sail-npm-cache ci
npm run check
npm run compositions
npm run validate
npm run render
```

Preview/edit with `npm run studio`. Output: `renders/sail-remotion-design.mp4`. Bundled photos, fonts and audio require no external requests when rendering.

## Source

- `src/Root.tsx`: composition registration.
- `src/redesign/RemotionDesign.tsx`: visual sequencing, persistent phone, background motion and captions.
- `src/redesign/Primitives.tsx`: authored UI components, branded widgets and visual tap feedback.
- `src/redesign/Pipeline.tsx`: horizontal tool/API diagram, selected API, and two independent request/return rounds.
- `src/redesign/Finale.tsx`: spring-driven montage and Sail brand finish.
- `src/redesign/design.ts`: palette and frame-based motion helpers.
- `src/redesign/captions.json`: voice-aligned caption timing.

Availability is queried first; the customer then selects 12A and explicitly confirms. The reservation API is highlighted only after that action. The airline is authoritative: the UI turns green when the returned confirmation arrives. Names/endpoints are illustrative.

## Validation

TypeScript, composition discovery, representative still renders, and backward-seek determinism are verified. Delivery includes encoded-frame and audio checks. All motion is calculated from the current frame; there are no timers or random values.
