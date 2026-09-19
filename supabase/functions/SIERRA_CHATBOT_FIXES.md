# Sierra Chatbot — Fix Summary

## Fixed directly (already pushed to `chatbot.js`, live now)

1. **Pricing was wrong across the board.** `PKGS.standard` and `PKGS.ecommerce`
   were showing AI-tier-level prices ($1,500–$8,500) instead of their real,
   much lower prices. Corrected to match the live site exactly:
   - Starter $297 / Growth $597 / Trusted $1,200 / Custom Bespoke
   - E-Starter $497+$197/mo / E-Growth $1,497+$197/mo / E-Trusted $2,500+$197/mo
   - Maintenance corrected from $99.99/mo to $97/mo
   - Templates: Premium 3D corrected from $200 to $299.99; Copywriting
     add-on now includes its $49.99 setup fee (was missing entirely)
   - The AI system prompt (which feeds Grok) now carries the same corrected figures

2. **Voice output (TTS) had a race condition.** Browser voices load
   asynchronously; the code called `getVoices()` once, immediately, which
   often returned an empty list — so it silently fell back to a default
   voice instead of the intended one. Fixed with a proper `onvoiceschanged`
   listener.

3. **Voice notes could make the AI lie.** The old system prompt told the AI
   to *never* say it can't hear audio, even when no transcript was captured
   (e.g., on Safari, which doesn't support the Web Speech API). Now: if a
   real transcript exists, it's sent; if not, the bot honestly tells the
   user to type instead of fabricating a response to audio it never heard.

4. **Image uploads weren't actually sent to the AI as images.** The old
   code just pasted the image's URL into a text message — a text-only model
   call cannot "see" a URL, so any acknowledgement of the image content was
   the AI making it up (which the old system prompt explicitly encouraged).
   Fixed to send a proper multimodal message (`image_url` content block,
   the same format OpenAI/Grok vision models expect).

5. **Every upload now asks for a client/business name** (once per session)
   and organizes the storage path by that name.

## Needs manual deployment — I don't have access to your Supabase project

The chatbot's actual "brain" call and file storage happen in Supabase Edge
Functions, which live in your Supabase project, not in this GitHub repo —
I have no connector to Supabase from here, so I can't deploy or even read
what's currently running. I've written what's needed as ready-to-deploy
files in this folder:

- **`chat-proxy/index.ts`** — reference implementation. I could not read your
  current one, so I can't confirm whether it already forwards image content
  to a vision-capable Grok model. Compare this against what's deployed; if
  yours assumes every message is plain text, image uploads will keep getting
  hallucinated responses instead of real ones until it's updated.
- **`save-attachment/index.ts`** — new function (doesn't exist yet) that
  saves each upload to a Google Drive folder named after the client, and
  logs it to a new `client_attachments` Supabase table.
- **`../migrations/create_client_attachments.sql`** — run this once in the
  Supabase SQL Editor to create that table.

### To deploy

```bash
supabase functions deploy chat-proxy
supabase functions deploy save-attachment
```

### Secrets to set (Project Settings → Edge Functions → Secrets, or `supabase secrets set`)

| Secret | Where to get it |
|---|---|
| `GROK_API_KEY` | console.x.ai |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Google Cloud Console → create a Service Account, enable Drive API, create a JSON key |
| `DRIVE_PARENT_FOLDER_ID` | The Drive folder ID that will contain one subfolder per client — share this folder with the service account's email (Editor access) |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → `service_role` key (**not** the anon key — keep this secret, server-side only) |

Once those are set and both functions are deployed, uploads will: save to
Supabase Storage (as before) → copy into `Drive/[Client Name]/filename` →
log a row in `client_attachments` with links to both copies.
