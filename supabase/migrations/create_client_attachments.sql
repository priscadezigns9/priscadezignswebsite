-- Run this once in the Supabase SQL Editor (or via `supabase db push`)
-- Creates the table the save-attachment Edge Function logs every upload to.

create table if not exists client_attachments (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  file_name text not null,
  file_type text,
  category text,              -- 'image' | 'audio' | 'file'
  supabase_url text not null, -- original Supabase Storage public URL
  drive_url text,             -- Google Drive view link
  drive_folder_id text,       -- Drive folder ID for this client
  created_at timestamptz not null default now()
);

create index if not exists idx_client_attachments_client_name
  on client_attachments (client_name);

-- Optional: allow the service role full access, block anon/public by default.
alter table client_attachments enable row level security;

create policy "service role full access"
  on client_attachments
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
