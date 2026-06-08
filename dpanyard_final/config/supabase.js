// Supabase Configuration and API helper
const SUPABASE_URL = 'https://sktpjacowqaedddtrhuz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdHBqYWNvd3FhZWRkZHRyaHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDk5MzEsImV4cCI6MjA5NDIyNTkzMX0.FK4N_ATFTaUuGXrYu_7OBn3qCdlo0rOzxk-E6TxJxqs';

// In a real scenario, the user would replace these. 
// For now, we'll try to use window.supabase if loaded from CDN.

let supabaseClient = null;

function getSupabase() {
    if (supabaseClient) return supabaseClient;
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return supabaseClient;
    }
    return null;
}

// Seed Data
const SEEDED_BUSINESSES = [
    { id: '1', name: "Raymond's Electrical Services", category: "Electrician", district: "San Fernando", phone: "868-111-1111", whatsapp: "8681111111", is_verified: true, rating: 4.8, description: "Professional electrical services for home and business." },
    { id: '2', name: "Aunty Merle's Catering", category: "Catering", district: "Port of Spain", phone: "868-222-2222", whatsapp: "8682222222", is_verified: true, rating: 4.9, description: "Authentic Trini flavors for any occasion." },
    { id: '3', name: "TT Auto Works", category: "Mechanic", district: "Chaguanas", phone: "868-333-3333", whatsapp: "8683333333", is_verified: false, rating: 4.5, description: "Reliable auto repairs and maintenance." },
    { id: '4', name: "Sew Fine by Priya", category: "Seamstress", district: "Arima", phone: "868-444-4444", whatsapp: "8684444444", is_verified: true, rating: 4.7, description: "Custom tailoring and alterations." },
    { id: '5', name: "Trini Clean Team", category: "Cleaning Services", district: "Port of Spain", phone: "868-555-5555", whatsapp: "8685555555", is_verified: false, rating: 4.2, description: "Top-notch residential and commercial cleaning." },
    { id: '6', name: "Island Blooms Florist", category: "Florist", district: "San Fernando", phone: "868-666-6666", whatsapp: "8686666666", is_verified: true, rating: 4.6, description: "Beautiful arrangements for all your special moments." },
    { id: '7', name: "ByteWise IT Solutions", category: "IT Services", district: "Port of Spain", phone: "868-777-7777", whatsapp: "8687777777", is_verified: false, rating: 4.4, description: "IT support and tech consulting." },
    { id: '8', name: "Harvest Moon Bakery", category: "Bakery", district: "Chaguanas", phone: "868-888-8888", whatsapp: "8688888888", is_verified: true, rating: 4.9, description: "Freshly baked bread and pastries daily." }
];

// DB Functions
const api = {
    async searchBusinesses(category = '', district = '', query = '') {
        const sb = getSupabase();
        if (!sb) {
            console.warn("Supabase not configured, using seed data.");
            return SEEDED_BUSINESSES.filter(b => {
                const matchCategory = !category || b.category.toLowerCase() === category.toLowerCase();
                const matchDistrict = !district || b.district.toLowerCase() === district.toLowerCase();
                const matchQuery = !query || b.name.toLowerCase().includes(query.toLowerCase()) || b.description.toLowerCase().includes(query.toLowerCase());
                return matchCategory && matchDistrict && matchQuery;
            });
        }

        let q = sb.from('businesses').select('*');
        if (category) q = q.eq('category', category);
        if (district) q = q.eq('district', district);
        if (query) q = q.ilike('name', `%${query}%`);
        
        const { data, error } = await q.order('is_premium', { ascending: false }).order('rating', { ascending: false });
        if (error) throw error;
        return data;
    },

    async getBusinessById(id) {
        const sb = getSupabase();
        if (!sb) return SEEDED_BUSINESSES.find(b => b.id === id);

        const { data, error } = await sb.from('businesses').select('*, reviews(*)').eq('id', id).single();
        if (error) throw error;
        return data;
    },

    async registerBusiness(businessData) {
        const sb = getSupabase();
        if (!sb) {
            console.log("Mock Registration:", businessData);
            return { success: true, message: "Listing submitted (Mock)" };
        }
        const { data, error } = await sb.from('businesses').insert([businessData]);
        if (error) throw error;
        return data;
    },

    async submitReview(reviewData) {
        const sb = getSupabase();
        if (!sb) return { success: true };
        const { data, error } = await sb.from('reviews').insert([reviewData]);
        if (error) throw error;
        return data;
    },

    async submitInquiry(inquiryData) {
        const sb = getSupabase();
        if (!sb) return { success: true };
        const { data, error } = await sb.from('inquiries').insert([inquiryData]);
        if (error) throw error;
        return data;
    }
};

window.dpapi = api;
