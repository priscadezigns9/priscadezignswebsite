// supabase/functions/chat-proxy/index.ts
//
// IMPORTANT: I could not read your existing chat-proxy function — it lives in
// your Supabase project, not in this GitHub repo, and I don't have a
// connector to your Supabase account from here. This is a REFERENCE
// implementation showing what the function needs to do to match the fixes
// just made in chatbot.js. Compare it against what's actually deployed:
//
//   supabase functions download chat-proxy   (or check the Dashboard)
//
// The one thing that matters most: chatbot.js now sometimes sends a
// message whose `content` is an ARRAY (for images), like:
//   { role: 'user', content: [
//       { type: 'text', text: '...' },
//       { type: 'image_url', image_url: { url: 'https://...' } }
//   ]}
// If your current function assumes `content` is always a plain string, it
// will break on image uploads (or silently strip the image). This version
// forwards `messages` as-is to Grok, which — like OpenAI — accepts that
// content-array format for vision-capable models.
//
// Required secret: GROK_API_KEY (from console.x.ai)
// Deploy: supabase functions deploy chat-proxy

const GROK_API_KEY = Deno.env.get("GROK_API_KEY")!;
const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
const GROK_MODEL = "grok-4"; // use a vision-capable Grok model

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { system, messages, max_tokens } = await req.json();

    const grokMessages = [
      { role: "system", content: system },
      ...messages, // forwarded as-is — supports both string and content-array (vision) messages
    ];

    const res = await fetch(GROK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROK_MODEL,
        messages: grokMessages,
        max_tokens: max_tokens || 350,
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Grok API error or empty reply:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "No reply from model" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
