document.addEventListener('DOMContentLoaded', () => {
    // Drop Zone Animation
    const dropZone = document.getElementById('drop-zone');
    
    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#4A9EFF';
            dropZone.style.background = '#1a1a1a';
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.style.borderColor = '#222';
            dropZone.style.background = 'transparent';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#10b981';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                alert(`File "${files[0].name}" uploaded successfully. AI Enrichment starting...`);
            }
        });
    }

    // Sidebar navigation
    const campaignItems = document.querySelectorAll('.campaign-item');
    campaignItems.forEach(item => {
        item.addEventListener('click', () => {
            campaignItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const campaignName = item.textContent.trim();
            document.querySelector('h1').textContent = campaignName;
        });
    });

    // Simple interaction for "Select Winner"
    const winnerBtn = document.querySelector('.btn-outline.btn-sm');
    if (winnerBtn) {
        winnerBtn.addEventListener('click', () => {
            winnerBtn.textContent = 'Winner Selected';
            winnerBtn.style.background = '#10b981';
            winnerBtn.style.color = '#000';
            winnerBtn.style.borderColor = '#10b981';
        });
    }
});
