document.addEventListener('DOMContentLoaded', () => {
    // Island Selector logic
    const islandPaths = document.querySelectorAll('.island-path');
    islandPaths.forEach(path => {
        path.addEventListener('click', () => {
            const island = path.getAttribute('data-island');
            filterProductsByIsland(island);
        });
    });

    // Category pills logic
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            // Mock category filtering
            console.log('Filtering by category:', pill.innerText);
        });
    });

    // Add to cart animation
    const addBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = parseInt(cartCount.innerText);
            cartCount.innerText = current + 1;
            
            // Simple animation
            btn.innerText = 'Added!';
            btn.style.backgroundColor = '#1A5C2A';
            btn.style.color = 'white';
            setTimeout(() => {
                btn.innerText = 'Add to Cart';
                btn.style.backgroundColor = '#E8A020';
                btn.style.color = '#1A1040';
            }, 1000);
        });
    });

    // Price range slider
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            console.log('Max price:', e.target.value);
        });
    }
});

function filterProductsByIsland(island) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (!island || product.getAttribute('data-island') === island) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
    console.log('Filtered by island:', island);
}
