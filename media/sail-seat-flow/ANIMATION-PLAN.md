# Sail: seat selection behind the scenes

The frames are a concept review, not a replacement of the existing reel. Native HTML/SVG and locally bundled fonts; no generated images. Endpoint names and airline branding are illustrative.

## Narrative, about 32 seconds

Your customer asks their AI assistant for a window seat.
The assistant calls Sail. Sail checks live availability with your reservation system.
A branded seat map opens right in the chat.
They choose 12A and confirm.
That sends another request through Sail. Your system checks the seat again and reserves it.
Only after your system confirms does the same seat map update: 12A is theirs.
Your brand. Your live data. One complete experience inside the conversation.

## Motion plan

| Time | Visible action | Behind the scenes |
| --- | --- | --- |
| 0–6 s | Keep the customer prompt visible. A blue token travels from phone to Sail, then airline. The return lane stays subdued. | Assistant invokes `get_seat_map`; Sail’s connector calls `GET /flights/218/seats`. |
| 6–12 s | Green availability token returns through Sail. Reveal the branded map inside the existing phone, with available seats and disabled occupied seats. | Airline returns structured availability. Sail binds the tool result to a linked UI resource; the supported host renders it. |
| 12–22 s | A tap selects 12A in blue. Show `12A · Window`, then an explicit tap on Confirm. Change tool and API labels in place; blue token travels outward again. Keep the seat blue during processing. | Widget invokes app-visible `select_seat` through the assistant host with booking ID BK-218 and seat 12A. Sail validates access and asks the airline to revalidate and reserve the seat through `POST /bookings/BK-218/seat`. |
| 22–29 s | Green token returns with `{ seat: "12A", status: "confirmed" }`. Only on arrival does 12A turn green, and the same widget changes to Seat confirmed. | The airline is authoritative for the successful reservation. Sail returns the result; the host delivers it to the existing widget. |
| 29–32 s | Fade the explanatory plumbing; enlarge the same phone and hold the completed map. No new confirmation card, no replacement phone. | End on the actual customer experience produced by the integration. |

## Design rules

- One phone, one continuously mounted seat-map widget, one selected seat.
- Straight parallel paths: blue request goes down; green result returns up. Each segment has an arrowhead.
- Animate the active direction; keep the other direction quiet. Avoid simultaneous decorative pulses.
- Every state follows the response that enables it. Showing success before the authoritative API result is a bug.
- Native 3+3 aircraft seating with a clear central aisle; window seats A/F.
- Authentication, publication, host capability and idempotency are implementation requirements, not claimed certifications. A failed reservation would keep the seat unconfirmed and offer refreshed availability.

## Keyframes

1. Request: assistant waiting, `get_seat_map` and availability API.
2. Response: branded seat map rendered with 12A available.
3. Customer action: 12A selected, Confirm action, `select_seat` and booking-specific mutation.
4. Confirmed result: airline confirms 12A; the same seat map updates.
