/**
 * ATELIA GAMING LAB - High-Fidelity Supabase Bridge
 * Sovereignty Layer for the Vanguard
 */

const SUPABASE_URL = 'https://sktpjacowqaedddtrhuz.supabase.co';
const SUPABASE_KEY = '{{credential:supabase-anon-key}}';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const AteliaAuth = {
    async signUp(email, password, username) {
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { username } } });
        if (error) throw error;
        return data;
    },
    async signIn(email, password) {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    },
    async signOut() {
        const { error } = await sb.auth.signOut();
        if (error) throw error;
        location.reload();
    },
    getUser() {
        return sb.auth.getUser();
    },
    onAuthStateChange(callback) {
        sb.auth.onAuthStateChange(callback);
    }
};

const AteliaArena = {
    async saveScore(score, charUsed) {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) return null; // Non-persistent run

        const { error } = await sb.from('atelia_scores').insert([
            { user_id: user.id, score: score, char_used: charUsed, username: user.user_metadata.username }
        ]);
        
        if (error) console.error("Proclamation Failed:", error);
        
        // Update high score in profile if applicable
        await this.updatePrestige(user.id, score);
    },

    async updatePrestige(userId, newScore) {
        // High-Fidelity Logic: Prestige is total ATLR earned
        const { data, error } = await sb
            .from('atelia_profiles')
            .select('atlr_prestige, high_score')
            .eq('id', userId)
            .single();

        let currentPrestige = data?.atlr_prestige || 0;
        let currentHigh = data?.high_score || 0;

        await sb.from('atelia_profiles').upsert({
            id: userId,
            atlr_prestige: currentPrestige + newScore,
            high_score: Math.max(currentHigh, newScore),
            updated_at: new Date()
        });
    },

    async getLeaderboard() {
        const { data, error } = await sb
            .from('atelia_scores')
            .select('*')
            .order('score', { ascending: false })
            .limit(10);
        
        if (error) throw error;
        return data;
    }
};

window.Atelia = { auth: AteliaAuth, arena: AteliaArena };
