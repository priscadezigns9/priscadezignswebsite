// software/realestate-ai/app/dashboard.js

const mockData = {
    mls: "Stunning family home located in the heart of [Address]. This beautiful [Beds] bed, [Baths] bath residence offers [Sqft] sqft of high-fidelity living space. Featuring a modern kitchen, spacious garage, and a lush garden perfect for entertaining. Listed at $[Price]. Don't miss this opportunity!",
    social: "🏡 NEW LISTING ALERT! \n\nCheck out this incredible [Beds] Bed / [Baths] Bath home at [Address]. ✨ \n\n💰 Offered at $[Price]\n📏 [Sqft] Sq Ft\n🏊 Pool & Garden included! \n\nDM for a private tour! #RealEstate #NewListing #HomeDesign",
    email: "Subject: Just Listed: Modern Family Home at [Address]\n\nHi there,\n\nI'm excited to share my latest listing with you. This [Beds] bed, [Baths] bath property at [Address] is a must-see. Priced at $[Price], it offers incredible value for the [Sqft] sqft of space.\n\nReply to this email to schedule a viewing.",
    script: "[Opening Scene: Drone shot of the exterior]\nWelcome to [Address]. As we step inside this [Beds] bedroom masterpiece, you'll immediately notice the high-fidelity finishes and open layout. [Cut to Kitchen] The gourmet kitchen is a chef's dream..."
};

function generateListing() {
    const address = document.getElementById('address').value || "[Address]";
    const beds = document.getElementById('beds').value || "3";
    const baths = document.getElementById('baths').value || "2";
    const sqft = document.getElementById('sqft').value || "2,000";
    const price = document.getElementById('price').value || "500,000";

    const outputArea = document.getElementById('outputArea');
    outputArea.classList.remove('hidden');

    // Simple template replacement
    window.generatedContent = {};
    for (let key in mockData) {
        window.generatedContent[key] = mockData[key]
            .replace(/\[Address\]/g, address)
            .replace(/\[Beds\]/g, beds)
            .replace(/\[Baths\]/g, baths)
            .replace(/\[Sqft\]/g, sqft)
            .replace(/\[Price\]/g, price);
    }

    switchTab('mls');
}

function switchTab(tab) {
    const displayText = document.getElementById('displayText');
    displayText.innerText = window.generatedContent[tab] || "Please generate content first.";
    
    // Update tab styling (simplified)
    const tabs = document.querySelectorAll('#outputArea button');
    tabs.forEach(t => t.classList.remove('text-white', 'border-b-2', 'border-violet-500'));
    // In a real app, I'd target the specific tab index
}

console.log("ListCraft AI Generator v2.1.0 Online");
