# Sail reel: graphic design review

Reviewed actual 1080×1920 frames at 5s, 13.9s, 23.7s, 26.35s and 28.7s, the revised architecture frame at 40.5s, and revised finale at 56.7s. This is a still-frame design critique; motion timing requires separate review.

## Overall judgment

The main idea is now legible. The plain text recommendation and branded transaction create a useful before/after contrast. The remaining weakness is art direction: the phone has a consistent polished frame, but its contents alternate between stock-photo booking UI, generic blue commerce UI, an implausible seat map, and a sparse document placeholder. Those should feel like four credible businesses using one underlying interaction system. The finale has more energy, but carries three competing focal points: headline, central commerce widget and four tilted outcome cards.

## Priority fixes

1. **Correct the seat-map structure.** The current three equal columns labeled WINDOW / AISLE / WINDOW do not resemble an aircraft seating plan. Use A B C | aisle | D E F, two or three numbered rows, one highlighted 12A, and a compact confirmation strip. This is both a credibility issue and a visual opportunity.
2. **Give each business a distinct visual identity.** Keep common padding, type scale, corner radii and interaction mechanics; use independent brand accents for Meridian, Atelier, Northstar and Willow. Right now Atelier and Northstar primarily inherit the assistant's bright blue. A restrained graphite/teal commerce identity and navy/sky-blue airline identity would read as business-owned experiences.
3. **Make the finale a resolved outcome, not a catalogue display.** The central phone still shows the watch image, price, stock and delivery details after 'Order confirmed'. Replace this with a compact receipt: product thumbnail, quantity, total and delivery window. Let the surrounding four outcomes be the main visual proof. Use a clear staggered visual hierarchy rather than four equally loud tiles.
4. **Redraw the Sail symbol.** The current two-band flag is generic, heavy and visually detached from the wordmark. A single distinctive sail/connection form with clean negative space would better communicate the name and bridge idea. Test at 24px and in one colour before decorating it.
5. **Improve architecture reading order.** The revised diagram is much better, but the large top systems bar and left stack create an uneven zigzag. Give each step a small consistent connection port, a restrained arrowhead and matched connector weight. The path must visibly read systems → connected actions → branded components → assistant adapter → rendered experience. Avoid suggesting that a card is literally sent from the backend to the screen without host mediation.

## Screen-specific notes

### 1. Existing recommendation — frame 5s

**Works:** Text-only answer, normal link and assistant chrome make the current experience clearly different from the later booking widget. Do not add a recommendation card here.

**Fix:** The prompt bubble has nearly twice the height its single line needs. Reduce its height/padding by roughly 20–25px. The assistant name/icon row can be slightly smaller than the response. Tighten the gap between the two response paragraphs by 10–16px. Keep the phone otherwise uncluttered: its empty lower area is credible conversational space, not an error to fill.

### 2. Booking widget — frame 13.9s

**Works:** Navy/gold brand header, useful controls and photo establish the desired shift. Date/price/action hierarchy is understandable.

**Fix:** The photo is a real room but not convincingly a premium sea-view room: mirror duplication and a cramped lounge dominate the crop. If keeping it, crop to the bed/window, and change 'Sea view' to a supported attribute. Better: a cleaner wide architectural room photograph with daylight and one main focal point. 'From / night' is awkward microcopy; use 'Per night'. Match photo warmth across all hotel images. Reduce header height slightly to release breathing room for the action. Preserve strong primary button contrast.

### 3. Catalogue — frame 23.7s

**Works:** The card is now an appropriate height, the prompt matches it, and availability/shipping detail adds credibility.

**Fix:** The watch crop is very abstract and cannot be identified in a fraction of a second. Show the complete face/strap silhouette against a clean neutral background; avoid clipping most of the product. Atelier needs its own restrained accent rather than the assistant's blue. Make the price stronger than the metadata: €89 currently competes with the graphite subtitle. Pair product name and price in a clear row. Keep image aspect ratio shared with the hotel where practical.

### 4. Seat selection — frame 26.35s

**Works:** The selected seat and confirmation action explain interaction without lengthy prose.

**Fix:** Replace the three-column layout with a genuine two-block aircraft map and visible centre aisle. Number the rows and show lettered seats; use small seat silhouettes rather than repeated office-chair-like icons. Highlight 12A once with a branded accent. Either label 'Seat 12A selected' above the action or use the selection strip; the current 'Your window seat' plus '12A · Selected' repeats the same fact. A tiny flight route line can remain, but avoid all-cap dense metadata when the map is the hero.

### 5. Document upload — frame 28.7s

**Works:** Compact card, correctly changed prompt and calm green success state fit a clinic.

**Fix:** The huge pale success rectangle still feels like a placeholder. Replace it with a small document thumbnail, fictional filename ('Referral.pdf'), file size and a prominent 'Received for review' state. A discreet 'Willow care team' destination makes the workflow feel real. One confirmation line is enough; 'Uploaded for review', 'Your document, delivered' and 'Ready … to review' currently repeat. Do not add a photo just to make this richer; credible file UI is the appropriate visual.

### 6. Architecture / flow — revised frame 40.5s

**Works:** Existing systems grouped together, distinct Sail layers and enlarged assistant improve conceptual clarity. The matched file status on the Sail side and phone provides useful continuity.

**Fix:** Establish a single clear vertical flow within Sail, then a single horizontal handoff to the host. Reduce the top systems bar's height slightly; move the phone upward enough that its widget aligns with branded components. Connect the assistant adapter/host area to the phone's chrome, then show the component rendering inside it. The output connector currently arrives around the phone edge near the widget, which can imply direct iframe injection without mediation. Include subtle downward arrows or moving signal markers during the transition. 'Supported assistants' is a host category while 'MCP Apps · Apps SDK' are integration mechanisms: separate these visually or call the box 'Assistant adapters' with protocol labels. Keep no more than three text sizes and avoid a diagram-sized logo dominating technical labels.

### 7. Finale — revised frame 56.7s

**Works:** Four outcomes make the proposition broader than bookings. Angled cards and large headline produce a more celebratory composition. 'Make the moment yours.' is concise and appropriately business-facing.

**Fix:** The left upper hotel card and right upper product card almost touch the phone; their uneven angles create a cramped centre. Give both a consistent 16–24px visual gap at closest approach. Reduce outer-card width/tilt modestly to form a deliberate arc. The lower right seat card sits lower than the file card, making the logo area lopsided; balance the two lower cards or deliberately align them along a single curved baseline. Replace the centre product catalogue with a completed-order receipt so there is only one visual narrative. Increase the new Sail lockup's clear space and reduce the headline slightly if needed. Hotel image and product image should share exposure/contrast direction. Keep the final caption lower and smaller than the brand lockup; it currently competes as a second tagline. The crescendo should complete four checks, expand a subtle branded light field, then settle on the lockup rather than introduce more text.

## Suggested shared design rules

- One phone chrome throughout, with one common widget radius and spacing system.
- Brand-specific colours inside widgets; assistant blue only for assistant-level chrome.
- 24–28px body copy inside full-size widget; 30–34px headings; 14–18px labels depending final scaling.
- Restrained shadows: one soft card shadow and one deeper phone shadow, rather than independent shadows on every inner surface.
- Real imagery should be recognisable at mobile reel size; choose crop for instant subject recognition, not simply visual texture.
- Diagram labels explain cause and effect. Finale labels express completed customer outcomes.

## Logo direction

Recommend exploring a geometric single sail whose negative-space cut also forms a forward connection/path. Avoid a detailed boat, two generic waves, AI sparkles or an infinity loop. The mark should read in navy on white, white on navy, and at 24px. A modestly customised 'Sail' wordmark can improve recognition; preserve an open lowercase a and generous optical spacing. The logo should be calmer than the motion around it.
