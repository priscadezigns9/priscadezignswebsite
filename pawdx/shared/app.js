/**
 * PawDx - Shared App Logic
 * Handles Supabase and OpenAI integration
 */

const PawDx = {
    // Config stored in localStorage
    config: {
        supabaseUrl: localStorage.getItem('pawdx_supabase_url'),
        supabaseKey: localStorage.getItem('pawdx_supabase_key'),
        openaiKey: localStorage.getItem('pawdx_openai_key'),
    },

    supabase: null,

    init() {
        if (this.config.supabaseUrl && this.config.supabaseKey) {
            this.supabase = supabase.createClient(this.config.supabaseUrl, this.config.supabaseKey);
        }
        this.updateAuthState();
    },

    saveConfig(url, key, aiKey) {
        localStorage.setItem('pawdx_supabase_url', url);
        localStorage.setItem('pawdx_supabase_key', key);
        localStorage.setItem('pawdx_openai_key', aiKey);
        this.config.supabaseUrl = url;
        this.config.supabaseKey = key;
        this.config.openaiKey = aiKey;
        this.init();
    },

    async updateAuthState() {
        if (!this.supabase) return;
        const { data: { user } } = await this.supabase.auth.getUser();
        const authElements = document.querySelectorAll('.auth-required');
        const guestElements = document.querySelectorAll('.guest-only');

        if (user) {
            authElements.forEach(el => el.classList.remove('hidden'));
            guestElements.forEach(el => el.classList.add('hidden'));
            const userEmailEl = document.getElementById('user-email');
            if (userEmailEl) userEmailEl.textContent = user.email;
        } else {
            authElements.forEach(el => el.classList.add('hidden'));
            guestElements.forEach(el => el.classList.remove('hidden'));
        }
    },

    // AI Symptom Checker
    async checkSymptoms(petData, symptoms) {
        if (!this.config.openaiKey) {
            throw new Error("OpenAI API Key is missing. Please add it in settings.");
        }

        const prompt = `
            As an AI Pet Health Assistant (PawDx), analyze the following symptoms and provide a structured diagnosis.
            Pet: ${petData.type} (${petData.breed || 'Unknown breed'}), Age: ${petData.age}, Weight: ${petData.weight}kg.
            Symptoms: ${symptoms}

            Return ONLY a JSON object with:
            - likely_conditions: Array of strings
            - urgency_level: "Green" (monitor), "Yellow" (vet soon), or "Red" (emergency)
            - home_remedies: Array of strings
            - vet_advice: String
            - analysis_summary: String
        `;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.openaiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "system", content: "You are a professional veterinary assistant AI." }, { role: "user", content: prompt }],
                response_format: { type: "json_object" }
            })
        });

        const result = await response.json();
        return JSON.parse(result.choices[0].message.content);
    },

    // Breed Library
    async searchBreeds(query) {
        const response = await fetch('../data/breeds.json');
        const breeds = await response.json();
        if (!query) return breeds;
        return breeds.filter(b => 
            b.name.toLowerCase().includes(query.toLowerCase()) || 
            b.species.toLowerCase().includes(query.toLowerCase())
        );
    },

    // Supabase Helpers
    async getPets() {
        if (!this.supabase) return [];
        const { data, error } = await this.supabase.from('pets').select('*');
        if (error) throw error;
        return data;
    },

    async addPet(pet) {
        if (!this.supabase) return;
        const { data: { user } } = await this.supabase.auth.getUser();
        const { data, error } = await this.supabase.from('pets').insert([{ ...pet, user_id: user.id }]).select();
        if (error) throw error;
        return data[0];
    },

    // Payment Simulation (Real logic for PayPal/Crypto/Payoneer UI)
    initPaymentUI() {
        const paymentButtons = document.getElementById('payment-options');
        if (!paymentButtons) return;

        paymentButtons.innerHTML = `
            <div class="payment-card">
                <h3>Upgrade to Pro - $5.99/mo</h3>
                <p>Unlimited checks, 5 pets, health log export.</p>
                <button class="btn btn-primary mb-10" onclick="PawDx.payWithPayPal()">Pay with PayPal</button>
                <div class="crypto-option mt-10">
                    <small>Pay with Crypto (ERC-20):</small>
                    <code style="display:block; font-size: 10px; margin: 5px 0;">0xcef857e82c306b3d0f2db080e7794f4bb376049e</code>
                    <button class="btn btn-outline" onclick="alert('Send $5.99 in ETH/USDT/USDC to the address above and email support@pawdx.com with hash.')">Verify Crypto Payment</button>
                </div>
                <div class="payoneer-option mt-10">
                    <small>Payoneer:</small>
                    <button class="btn btn-secondary" onclick="alert('Send $5.99 to payments@orcinos.com on Payoneer.')">Pay via Payoneer</button>
                </div>
            </div>
        `;
    },

    payWithPayPal() {
        // Redirect to PayPal (Orcinos Business)
        window.location.href = "https://www.paypal.com/paypalme/orcinos/5.99USD";
    },

    // PDF Export placeholder
    exportHealthLog(petId) {
        alert("Health Log exported as PDF (Simulation: PDF would be generated here containing pet stats and recent logs).");
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Only init if script is present
    if (typeof supabase !== 'undefined') {
        PawDx.init();
    }
});
