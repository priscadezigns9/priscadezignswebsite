const SB_URL = 'https://sktpjacowqaedddtrhuz.supabase.co';
const SB_KEY = '{{credential:supabase-anon-key}}'; 

// Initialize Supabase client
const sb = supabase.createClient(SB_URL, SB_KEY);

window.sb = sb;
