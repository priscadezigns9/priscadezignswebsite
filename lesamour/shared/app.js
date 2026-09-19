/* Les Amour App Logic */

const SUPABASE_URL = 'https://sktpjacowqaedddtrhuz.supabase.co'; // User to provide
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdHBqYWNvd3FhZWRkZHRyaHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDk5MzEsImV4cCI6MjA5NDIyNTkzMX0.FK4N_ATFTaUuGXrYu_7OBn3qCdlo0rOzxk-E6TxJxqs'; // User to provide
const OPENAI_API_KEY = ''; // User to provide

// Initialize Supabase (requires script tag in HTML)
let supabase = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_KEY) {
    supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

const LesAmour = {
    // Auth
    async login(email, password) {
        console.log('Login attempt', email);
        // Implement Supabase auth login
    },

    // AI Coach
    async askCoach(message, history = []) {
        const systemPrompt = "You are Les Amour, a warm, wise, and faith-respectful relationship coach specializing in marriage and intimacy. You speak with elegance and warmth — like a trusted mentor who deeply understands covenant love. You give practical, evidence-based advice rooted in emotional intelligence and when appropriate, biblical principles. You NEVER give explicit sexual advice. You guide couples toward deeper emotional, spiritual, and physical connection within the sacred covenant of marriage. Keep responses warm and concise (3-5 sentences) unless more detail is needed.";
        
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [
                        { role: "system", content: systemPrompt },
                        ...history,
                        { role: "user", content: message }
                    ]
                })
            });
            const data = await response.json();
            const reply = data.choices[0].message.content;
            
            // Save summary if supabase exists
            if (supabase) {
                await this.saveSessionSummary(reply.substring(0, 100) + '...');
            }
            
            return reply;
        } catch (error) {
            console.error('Coach Error:', error);
            return "I'm sorry, I'm having a little trouble connecting zight now. Please try again in a moment, dear friend.";
        }
    },

    async saveSessionSummary(summary) {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('coach_sessions')
            .insert([{ summary, user_id: (await supabase.auth.getUser()).data.user?.id }]);
    },

    // Community
    async getPosts() {
        if (!supabase) return [];
        const { data, error } = await supabase
            .from('community_posts')
            .select('*')
            .order('created_at', { ascending: false });
        return data || [];
    },

    async createPost(category, content) {
        if (!supabase) return;
        const anonId = `Couple #${Math.floor(Math.random() * 9000) + 1000}`;
        const { data, error } = await supabase
            .from('community_posts')
            .insert([{ category, content, anonymous_id: anonId }]);
    },

    // Courses
    async updateProgress(courseSlug, lessonNumber) {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('course_progress')
            .upsert({ 
                course_slug: courseSlug, 
                lesson_number: lessonNumber,
                user_id: (await supabase.auth.getUser()).data.user?.id
            });
    },

    async saveJournal(courseSlug, prompt, response) {
        if (!supabase) return;
        const { data, error } = await supabase
            .from('journal_entries')
            .insert([{ 
                course_slug: courseSlug, 
                prompt, 
                response,
                user_id: (await supabase.auth.getUser()).data.user?.id
            }]);
    }
};

// UI Helpers
document.addEventListener('DOMContentLoaded', () => {
    // Handle mobile nav, etc.
});
