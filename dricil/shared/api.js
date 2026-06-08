// Dricil OpenAI API Integration Layer

const API_CONFIG = {
    OPENAI_API_KEY: '{{credential:openai-vision-business-v3}}',
    BASE_URL: 'https://api.openai.com/v1'
};

const dricilApi = {
    async generateContent(prompt, model = "gpt-4o") {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: "system", content: "You are the Dricil AI Content Engine. You generate high-performing digital marketing content." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (data.error) {
                console.error("OpenAI Error:", data.error);
                return null;
            }
            return data.choices[0].message.content;
        } catch (error) {
            console.error("API Call Failed:", error);
            return null;
        }
    },

    async generateSocialBatch(clientProfile) {
        const prompt = `Generate a batch of social media posts for ${clientProfile.business_name} in the ${clientProfile.industry} industry. 
        Brand Voice: ${clientProfile.brand_voice}. 
        Platforms: ${clientProfile.platforms.join(', ')}.
        Goal: ${clientProfile.primary_goal}.
        Format as JSON array of objects with fields: platform, content_text, content_type (social), scheduled_date.`;
        
        return await this.generateContent(prompt);
    }
};
