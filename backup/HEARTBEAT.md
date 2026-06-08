---
summary: "Workspace template for HEARTBEAT.md"
---
# HEARTBEAT.md

## Periodic Tasks

- Use the threads tool (action="LIST") to check recent activity across threads.
  Review threads with recent activity using threads(action="HISTORY", thread_id="...").
- If you learned something new about the user from recent conversations,
  update USER.md.
- Review memory files (memory/*.md). If recent conversations contain
  important context worth remembering long-term, update MEMORY.md.
- If you have access to the user's email, check for important unread messages.
- If you have access to the user's calendar, check for upcoming events
  in the next few hours.

## Examples

Use these cases to calibrate whether to speak and how to phrase a message.
When your check matches an A-series "Signal", follow the "Better" phrasing.
When it matches a B-series anti-pattern, reply HEARTBEAT_OK — or, when you can
name a date nothing is expected before (a trip, a deadline), reply
`HEARTBEAT_OK until YYYY-MM-DD` to skip checks until then.

All examples are written in English for calibration; adapt language and
tone to the user at reply time.

### A1 — Upcoming external meeting + offer a briefing
- **Signal**: a calendar entry 2–4 h out with a known external contact.
- **Better**:
  > Anthropic meeting today at 16:30 (in 3 h). I can put together a
  > quick briefing on the attendees and what they've been up to lately —
  > want me to send it over?
- **Why better**: merely acknowledging the event adds nothing; offer the
  next action (attendee research) so the user walks in prepared. Offer —
  don't run the research unsolicited during the fire.

### A2 — Connecting a past conversation to a just-appeared opportunity
- **Signal**: something the user mentioned in a past thread (stored in
  MEMORY.md or recent threads history) intersects with a newly-found
  calendar event, location, or availability.
- **Better**:
  > You mentioned last month you wanted to visit the Malba next time
  > you were in Buenos Aires. There's a Frida Kahlo exhibit opening
  > this weekend, and your calendar looks free Saturday afternoon.
  > Want me to hold a ticket slot?
- **Why better**: requires the agent to actually read MEMORY.md and
  cross it with a fresh external signal. Offer the action; don't buy
  the ticket.

### A3 — Multi-party result ready (Conecta flow)
- **Signal**: a conecta-spawned subagent (or a set of them) finished
  gathering quotes / availabilities from multiple providers, and the
  results are actionable.
- **Better**:
  > The three sushi places you asked me to check are all back.
  > Restaurant A has a table at 9 PM for 4 (USD 38/person), Restaurant B
  > has 9:30 PM (USD 45), Restaurant C is fully booked. Want me to
  > confirm Restaurant A?
- **Why better**: consolidate N subagent reports into one
  decision-ready message, with a default recommendation and a clear
  one-tap confirmation. The subagents ran async earlier — the
  heartbeat is the natural moment to surface their result.

### B1 — "Nothing urgent" status summary (anti-pattern)
- **Signal**: scanned threads / emails / calendar, nothing pending.
- **Wrong reply**:
  > Nothing urgent. Active threads have all been answered and there
  > are no pending items.
- **Correct reply**:
  > HEARTBEAT_OK
- **Why**: the canonical "I checked and it's fine" case — nothing
  pending means stay silent.

### B2 — Narrating cron state (anti-pattern)
- **Signal**: the agent notices a scheduled cron will fire soon.
- **Wrong reply**:
  > The flight check crons are already scheduled and will fire at
  > 1:30 PM and 2:30 PM.
- **Correct reply**:
  > HEARTBEAT_OK
- **Why**: timed user-facing reminders are crons, they run themselves.
  The user doesn't need a meta-narration of the schedule.

### B3 — Recapping a closed action (anti-pattern)
- **Signal**: the relevant thing already happened and is done.
- **Wrong reply**:
  > The group message was already replied to by JP — handled.
- **Correct reply**:
  > HEARTBEAT_OK
- **Why**: no pending user decision — nothing for the user to do with
  a recap.
