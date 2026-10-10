# Sail reel — engineering architecture review

Reviewed 10 October 2026 against Sail's research and current first-party MCP Apps / OpenAI examples. This validates the proposed interaction architecture, not implemented Sail capabilities or production integrations.

## What the diagram needs to explain

Sail turns existing business services into **connected actions plus branded interfaces** that a supported assistant can invoke and display. Business systems remain authoritative for stock, availability, reservations, orders and intake. The assistant owns the conversation and rendering container. Sail packages the workflow, integrations, interface and supported-host delivery contract between them.

The current board bundles these responsibilities into an unexplained logo. Small booking/catalogue/upload tiles below the logo have no explicit relationship to the path. Travelling calendar/bag/file icons can imply that UI components are emitted by backend APIs. The phone also appears beside a vertical business-to-Sail path with a bent connector, making the reading order unclear.

## Recommended compact portrait layout

Use one clean top-to-bottom centerline, keeping the phone already present in the reel. No assistant-logo fanout and no crossed routes.

At a 1080 × 1920 frame, use these approximate visible bounds:

| Element | Bounds | On-screen label |
| --- | --- | --- |
| Business source bar | x 110, y 220, w 860, h 175 | **Your systems**; three equal icon columns: **Availability**, **Orders**, **Intake** |
| First connector | center x 540, y 395–465 | Two slim opposing arrowheads; no extra text |
| Sail enclosure | x 110, y 465, w 860, h 335 | Sail logo at top, then two equal inset lanes |
| Left Sail lane | x 145, y 565, w 380, h 175 | **Connected actions**; small API/connector icon |
| Right Sail lane | x 555, y 565, w 380, h 175 | **Branded components**; small rendered-card icon |
| Supported-host strip | x 215, y 845, w 650, h 95 | **Assistant adapters**; smaller **MCP Apps · Apps SDK** |
| Persistent phone | center x 540, top about 1000; visible height 560–620 | The actual branded widget within recognisable assistant chrome |
| Captions | keep current baseline clear | Existing narration, unchanged |

The engineering nouns fit in six large labels. Do not add protocol names to the business-source tiles, a separate customer-auth box, model orchestration clouds, every integration logo, or a list of compliance claims. The host strip is a delivery/compatibility layer, not a promise that every assistant supports every workflow.

If retaining the current phone on the right is essential, use an equally clear left-to-right variant: source bar x80–370, Sail box x80–370 below it, host adapter strip x420–620 horizontally connected, phone x650–990. But the portrait vertical stack is easier to read and gives every responsibility enough room.

## Animation semantics

1. Availability/order/intake source tiles appear together as stable business systems.
2. Draw the first route into **Connected actions**. A neutral data token moves along it and changes into a small structured-data glyph inside Sail. Do not move complete UI cards from business systems.
3. Connect the actions lane to the branded-components lane. A live field in the mini-widget updates (availability/price/status), making data binding visible.
4. Both lanes converge into the assistant-adapter strip. One short stream carries the selected widget and its data into the **same** phone already on screen. A branded surface opens inside assistant chrome.
5. Animate a customer tap in the phone, then a small return token up the route. Show a check only after a successful business result returns. The circuit reads as an executable workflow, rather than a publishing funnel.
6. Dissolve the enclosure and strip as the camera moves back into the phone; retain the confirmed outcome state.

Use two visually distinguishable signals: blue round data/action token, violet card-outline UI token. Only one or two tokens visible at once. If time is too short, show a single bidirectional line and one returned check; clarity matters more than simulating every wire message.

## Technical contract validated

- MCP tools expose callable business actions. A tool associates a `ui://` resource using `_meta.ui.resourceUri`; the resource is HTML with `text/html;profile=mcp-app`. The assistant host fetches it and renders it in a sandboxed iframe. This is **host-rendered presentation**, not Sail injecting arbitrary DOM into ChatGPT.
- The host sends tool results to the UI. UI actions call allowed server tools **through the host**; the host rejects app requests for tools without app visibility. The branded widget does not need direct access to arbitrary merchant APIs or credentials.
- Sail's proposed connected-actions layer should own connector configuration, input validation, authoritative-state lookup, protected mutations and returned workflow status. A successful transport call is not itself a booking/order confirmation. For transactional writes, revalidation and idempotent execution are business-layer work.
- Authorization can be deferred until a protected action. Public discovery can remain anonymous. Account linking/OAuth and user confirmation are distinct: identity permits access; confirmation authorizes the intended action. Use a small lock icon on the action lane if visually useful, but avoid a falsely universal “secure” certification badge.
- UI portability depends on supported host capabilities, publication policy and platform-specific APIs. Generic MCP support alone does not establish rich-widget support. Label **supported assistants**, not **all assistants**. Show a single representative assistant shell in this shot rather than Gemini/Copilot/Claude/ChatGPT logos suggesting tested parity.
- Document upload is not universally one portable native widget API. Direct business-owned uploads, host attachments and host-specific upload APIs are different routes. The source tile **Intake** is accurate and avoids depicting regulated prescription acceptance or automatic fulfillment.

## First-party evidence

Current documents were fetched successfully from GitHub on 10 October 2026. Existing research provides pinned snapshots for reproducibility.

1. [MCP Apps current README](https://github.com/modelcontextprotocol/ext-apps/blob/main/README.md): defines tool → resource → sandboxed host rendering → bidirectional communication; explicitly says host support varies.
2. [MCP Apps specification, 2026-01-26](https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/2026-01-26/apps.mdx): `ui://`, resource MIME type, resource binding, mandatory sandbox and CSP, app-visible tools and host-mediated calls. [Research-pinned revision](https://github.com/modelcontextprotocol/ext-apps/blob/82221c0c8ce7661efa6771c9d461511b1650495f/specification/2026-01-26/apps.mdx).
3. [MCP Apps authorization guide](https://github.com/modelcontextprotocol/ext-apps/blob/main/docs/authorization.md): per-server and per-tool OAuth, token verification and UI-initiated step-up.
4. [OpenAI Apps SDK official examples](https://github.com/openai/openai-apps-sdk-examples/blob/main/README.md): tool discovery, calls, resources, `_meta.ui.resourceUri`, structured content, authenticated tools and shopping-cart state. [Apps SDK docs](https://developers.openai.com/apps-sdk).
5. [Microsoft MCP Apps documented support and limitations](https://github.com/MicrosoftDocs/m365copilot-docs/blob/70e1e3f2b14ae1557439f175c01f74da42cfef6f/docs/plugin-mcp-apps.md): supporting a widget standard does not establish upload, modal or API parity across hosts.

Local supporting research: `research/interactive-workflows/A-STANDARDS.md`, `B-HOSTS.md`, `SAIL-INTERACTIVE-STRATEGY.md`, and `research/technical-moat.md`.

## Review conclusion

The proposed Sail layer is technically coherent when the diagram separately shows business-backed actions, branded UI and supported-host adapters. This separation is the necessary correction. The reel should communicate **existing systems → connected branded workflow → customer action → confirmed result**, rather than **business systems → mysterious logo → every assistant**.
