document.addEventListener('DOMContentLoaded', () => {
    // Reply toggle functionality
    const replyToggles = document.querySelectorAll('.reply-toggle');
    replyToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const form = btn.nextElementSibling;
            form.classList.toggle('hidden');
            btn.textContent = form.classList.contains('hidden') ? 'Reply' : 'Cancel';
        });
    });

    // Handle reply submission (mock)
    const replyForms = document.querySelectorAll('.reply-form');
    replyForms.forEach(form => {
        const sendBtn = form.querySelector('.btn-primary');
        sendBtn.addEventListener('click', () => {
            alert('Reply sent to customer!');
            form.classList.add('hidden');
            form.previousElementSibling.textContent = 'Reply';
            form.querySelector('textarea').value = '';
        });
    });
});
