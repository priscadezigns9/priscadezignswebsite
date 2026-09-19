const mockBusinesses = [
    { id: 1, name: "Tony's Auto Clinic", category: "Mechanic", district: "San Fernando", rating: 5, phone: "868-555-1234", verified: true, open: true, img: "https://placehold.co/400x200?text=Mechanic" },
    { id: 2, name: "Graceful Tastes", category: "Catering", district: "Port of Spain", rating: 4, phone: "868-555-5678", verified: false, open: true, img: "https://placehold.co/400x200?text=Catering" },
    { id: 3, name: "Swift Fix Plumbing", category: "Plumber", district: "Arima", rating: 5, phone: "868-555-9012", verified: true, open: false, img: "https://placehold.co/400x200?text=Plumber" },
    { id: 4, name: "Aunty Joan's Bakery", category: "Bakery", district: "Chaguanas", rating: 5, phone: "868-555-3456", verified: true, open: true, img: "https://placehold.co/400x200?text=Bakery" },
    { id: 5, name: "Siparia Seamstress", category: "Seamstress", district: "Siparia", rating: 3, phone: "868-555-7890", verified: false, open: true, img: "https://placehold.co/400x200?text=Seamstress" },
    { id: 6, name: "Reliable Electric", category: "Electrician", district: "Port of Spain", rating: 4, phone: "868-555-1111", verified: true, open: false, img: "https://placehold.co/400x200?text=Electric" }
];

function renderBusinesses(businesses) {
    const yard = document.getElementById('theYard');
    yard.innerHTML = '';

    businesses.forEach(biz => {
        const stars = '★'.repeat(biz.rating) + '☆'.repeat(5 - biz.rating);
        const card = `
            <div class="business-card">
                <div class="card-header" style="background-image: url('${biz.img}')">
                    ${biz.verified ? '<span class="badge badge-navy" style="position:absolute; top:10px; left:10px;">Verified</span>' : ''}
                </div>
                <div class="card-body">
                    <span class="badge badge-navy">${biz.category}</span>
                    <h3 class="business-name">${biz.name}</h3>
                    <p>${biz.district}</p>
                    <div class="card-meta">
                        <span class="stars">${stars}</span>
                        <span class="phone-num">${biz.phone}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="https://wa.me/${biz.phone.replace(/-/g, '')}" class="btn btn-whatsapp" onclick="trackWhatsApp('${biz.name}')">
                        WhatsApp Contact
                    </a>
                    <button class="btn btn-primary">Book Now</button>
                </div>
            </div>
        `;
        yard.innerHTML += card;
    });
}

function trackWhatsApp(businessName) {
    console.log(`WhatsApp contact initiated for: ${businessName}`);
    // Analytics tracking would go here
}

function filterResults() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const districtVal = document.getElementById('districtFilter').value;
    const verifiedOnly = document.getElementById('verifiedFilter').checked;
    const openOnly = document.getElementById('openFilter').checked;

    const filtered = mockBusinesses.filter(biz => {
        const matchesSearch = biz.name.toLowerCase().includes(searchVal) || biz.category.toLowerCase().includes(searchVal);
        const matchesDistrict = districtVal === "" || biz.district === districtVal;
        const matchesVerified = !verifiedOnly || biz.verified;
        const matchesOpen = !openOnly || biz.open;
        return matchesSearch && matchesDistrict && matchesVerified && matchesOpen;
    });

    renderBusinesses(filtered);
}

document.getElementById('searchBtn').addEventListener('click', filterResults);
document.getElementById('searchInput').addEventListener('input', filterResults);
document.getElementById('districtFilter').addEventListener('change', filterResults);
document.getElementById('verifiedFilter').addEventListener('change', filterResults);
document.getElementById('openFilter').addEventListener('change', filterResults);

// Initial render
renderBusinesses(mockBusinesses);
