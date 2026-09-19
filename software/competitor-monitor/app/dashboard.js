document.addEventListener('DOMContentLoaded', () => {
    // Nav item selection
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Competitor card interaction
    const compCards = document.querySelectorAll('.comp-card');
    compCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('h4').textContent;
            alert(`Opening detailed intelligence for ${name}`);
        });
    });

    // Simulate "Add Competitor"
    const addBtn = document.querySelector('.btn-primary');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const domain = prompt('Enter competitor domain (e.g., competitor.com):');
            if (domain) {
                alert(`Started indexing ${domain}. Initial intelligence report will be ready in 5 minutes.`);
            }
        });
    }

    // Badge clear on click
    compCards.forEach(card => {
        card.addEventListener('click', () => {
            const badge = card.querySelector('.badge');
            if (badge) badge.style.display = 'none';
        });
    });
});
