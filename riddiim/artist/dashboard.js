document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = item.getAttribute('data-tab');

            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });

    // Go Live simulation
    const liveBtn = document.getElementById('go-live');
    liveBtn.addEventListener('click', () => {
        if (liveBtn.textContent === 'Go Live') {
            liveBtn.textContent = 'End Session';
            liveBtn.style.background = '#000';
            liveBtn.style.border = '1px solid #FF2D6B';
            alert('Live Stream Started! Fans are joining now.');
        } else {
            liveBtn.textContent = 'Go Live';
            liveBtn.style.background = 'var(--accent-color)';
            alert('Live Stream Ended. Great session!');
        }
    });

    // Post simulation
    const postBtn = document.querySelector('.content-studio .btn-primary');
    const textarea = document.querySelector('textarea');

    postBtn.addEventListener('click', () => {
        if (textarea.value.trim()) {
            postBtn.textContent = 'Posting...';
            setTimeout(() => {
                alert('Posted to your feed!');
                textarea.value = '';
                postBtn.textContent = 'Post to Feed';
            }, 1000);
        } else {
            alert('Please write something first!');
        }
    });
});
