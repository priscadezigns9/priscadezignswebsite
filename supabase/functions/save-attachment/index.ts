// supabase/functions/save-attachment/index.ts
//
// Called by chatbot.js after every chat upload (image, voice note, or file).
// Job: 1) create/find a Google Drive folder named after the client,
//      2) copy the file from Supabase Storage into that folder,
//      3) log the attachment in a Supabase table (client_attachments).
//
// Deploy:
//   supabase functions deploy save-attachment
//
// Required secrets (set once via `supabase secrets set` or the Dashboard →
// Project Settings → Edge Functions → Secrets):
//   SUPABASE_URL                  (auto-provided by Supabase)
//   SUPABASE_SERVICE_ROLE_KEY     (Project Settings → API → service_role key — NOT the anon key)
//   GOOGLE_SERVICE_ACCOUNT_JSON   (full JSON key of a Google service account, as a single-line string)
//   DRIVE_PARENT_FOLDER_ID        (the Drive folder ID that all client subfolders live under)
//
// Google Cloud setup (one-time):
//   1. Create a Service Account in Google Cloud Console, enable the Drive API.
//   2. Create a JSON key for it, paste the whole contents into GOOGLE_SERVICE_ACCOUNT_JSON.
//   3. Share your parent Drive folder with the service account's email address
//      (found in the JSON as "client_email"), with Editor access.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GOOGLE_SA_JSON = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON")!;
const DRIVE_PARENT_FOLDER_ID = Deno.env.get("DRIVE_PARENT_FOLDER_ID")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ---- Google OAuth (service account, JWT bearer flow) ----
async function getGoogleAccessToken(): Promise<string> {
  const sa = JSON.parse(GOOGLE_SA_JSON);
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/drive",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const enc = (obj: unknown) =>
    btoa(JSON.stringify(obj)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const unsigned = `${enc(header)}.${enc(claim)}`;

  const pemBody = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");
  const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsigned)
  );
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const jwt = `${unsigned}.${sigB64}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Google auth failed: " + JSON.stringify(data));
  return data.access_token;
}

async function findOrCreateClientFolder(accessToken: string, clientName: string): Promise<string> {
  const safeName = clientName.replace(/'/g, "\\'");
  const q = encodeURIComponent(
    `name='${safeName}' and mimeType='application/vnd.google-apps.folder' and '${DRIVE_PARENT_FOLDER_ID}' in parents and trashed=false`
  );
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  const createRes = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: clientName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [DRIVE_PARENT_FOLDER_ID],
    }),
  });
  const createData = await createRes.json();
  if (!createData.id) throw new Error("Drive folder create failed: " + JSON.stringify(createData));
  return createData.id;
}

async function uploadFileToDrive(
  accessToken: string,
  folderId: string,
  fileName: string,
  fileBlob: Blob,
  mimeType: string
): Promise<string> {
  const metadata = { name: fileName, parents: [folderId] };
  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("file", fileBlob, fileName);

  const res = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: form,
    }
  );
  const data = await res.json();
  if (!data.id) throw new Error("Drive upload failed: " + JSON.stringify(data));
  return data.webViewLink || `https://drive.google.com/file/d/${data.id}/view`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { clientName, fileUrl, fileName, fileType, category } = await req.json();
    if (!clientName || !fileUrl || !fileName) {
      return new Response(JSON.stringify({ error: "Missing clientName, fileUrl, or fileName" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Download the file from Supabase Storage's public URL
    const fileRes = await fetch(fileUrl);
    if (!fileRes.ok) throw new Error("Could not fetch source file from Supabase Storage");
    const fileBlob = await fileRes.blob();

    // 2. Google Drive: find/create client folder, upload file
    const accessToken = await getGoogleAccessToken();
    const folderId = await findOrCreateClientFolder(accessToken, clientName);
    const driveLink = await uploadFileToDrive(
      accessToken,
      folderId,
      fileName,
      fileBlob,
      fileType || "application/octet-stream"
    );

    // 3. Log in Supabase table
    const { error: dbError } = await supabase.from("client_attachments").insert({
      client_name: clientName,
      file_name: fileName,
      file_type: fileType || null,
      category: category || null,
      supabase_url: fileUrl,
      drive_url: driveLink,
      drive_folder_id: folderId,
    });
    if (dbError) throw dbError;

    return new Response(JSON.stringify({ ok: true, driveLink }), {
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
