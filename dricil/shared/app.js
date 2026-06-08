// Dricil Shared App Logic (Supabase + Auth)

const CONFIG = {
    SUPABASE_URL: '{{credential:supabase-project-url}}',
    SUPABASE_ANON_KEY: '{{credential:supabase-anon-key}}'
};

// Initialize Supabase Client (Assuming supabase.js is loaded via CDN)
let supabase;
if (typeof supabase !== 'undefined') {
    // This would be initialized if the script is loaded
}

const dricilApp = {
    async init() {
        if (typeof createClient !== 'undefined') {
            supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
        }
    },

    async signUp(email, password) {
        const { user, error } = await supabase.auth.signUp({ email, password });
        return { user, error };
    },

    async signIn(email, password) {
        const { user, error } = await supabase.auth.signIn({ email, password });
        return { user, error };
    },

    async getClientProfile(userId) {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('user_id', userId)
            .single();
        return { data, error };
    },

    async saveOnboarding(onboardingData) {
        const { data, error } = await supabase
            .from('clients')
            .insert([onboardingData]);
        return { data, error };
    },

    async getContentQueue(clientId) {
        const { data, error } = await supabase
            .from('content_queue')
            .select('*')
            .eq('client_id', clientId)
            .order('scheduled_date', { ascending: true });
        return { data, error };
    },

    async getReports(clientId) {
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    async updateAutoPublish(clientId, status) {
        const { data, error } = await supabase
            .from('clients')
            .update({ auto_publish: status })
            .eq('id', clientId);
        return { data, error };
    }
};

// Auto-init on load if libraries are present
document.addEventListener('DOMContentLoaded', () => {
    if (typeof createClient !== 'undefined') {
        dricilApp.init();
    }
});
