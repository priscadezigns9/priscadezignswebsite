function bulkAction(type) {
    alert(`Bulk processing ${type} for 2 selected products...`);
}

document.querySelectorAll('.tone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const tone = btn.innerText;
        const textarea = document.getElementById('ai-desc');
        
        if (tone === 'Luxury') {
            textarea.value = "Immerse yourself in pure opulence with the Azure Titan. An artisanal masterpiece of hydration, this double-walled vessel maintains a transcendent chill for 24 hours. Perfection, bottled.";
        } else if (tone === 'Fun') {
            textarea.value = "Say goodbye to lukewarm water and hello to your new bestie! 🌊 The Azure Titan is here to keep your drinks ice-cold and your vibes high. Perfect for the gym, the beach, or just lookin' cool.";
        } else {
            textarea.value = "Elevate your hydration game with the Azure Titan. Crafted from premium dual-wall stainless steel, this 500ml companion keeps your beverages ice-cold for 24 hours. Whether you're crushing a HIIT session or trekking up a mountain, the Titan is built to perform.";
        }
    });
});

document.querySelector('.primary-btn').addEventListener('click', () => {
    alert('Saving changes to Shopify... Catalog updated successfully!');
});