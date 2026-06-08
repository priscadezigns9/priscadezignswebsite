document.addEventListener('DOMContentLoaded', () => {
    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.parentElement.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const speed = 200;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // Form Toggle
    const addProductBtn = document.getElementById('add-product-btn');
    const formContainer = document.getElementById('add-product-form-container');
    const cancelFormBtn = document.getElementById('cancel-form');

    if (addProductBtn && formContainer) {
        addProductBtn.addEventListener('click', () => {
            formContainer.style.display = 'block';
            formContainer.scrollIntoView({ behavior: 'smooth' });
        });

        cancelFormBtn.addEventListener('click', () => {
            formContainer.style.display = 'none';
        });
    }

    // Form Validation Mock
    const productForm = document.getElementById('add-product-form');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Listing successful! "Aye, look what we have!"');
            formContainer.style.display = 'none';
            productForm.reset();
        });
    }
});
