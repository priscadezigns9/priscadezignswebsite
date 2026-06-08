document.addEventListener('DOMContentLoaded', () => {
    // Meeting item selection
    const meetingItems = document.querySelectorAll('.meeting-item');
    meetingItems.forEach(item => {
        item.addEventListener('click', () => {
            meetingItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const title = item.querySelector('h4').textContent;
            document.querySelector('.title-area h1').textContent = title;
        });
    });

    // Transcript search simulation
    const transcriptSearch = document.querySelector('.transcript-search input');
    if (transcriptSearch) {
        transcriptSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const utterances = document.querySelectorAll('.utterance p');
            
            utterances.forEach(u => {
                const text = u.textContent.toLowerCase();
                if (query && text.includes(query)) {
                    u.parentElement.style.background = 'rgba(168, 85, 247, 0.2)';
                } else if (!query) {
                    u.parentElement.style.background = '';
                } else {
                    u.parentElement.style.background = '';
                }
            });
        });
    }

    // Playback controls simulation
    const playBtn = document.querySelector('.playback-controls span:nth-child(2)');
    let isPlaying = false;
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playBtn.textContent = isPlaying ? '⏸' : '⏯';
            if (isPlaying) {
                console.log('Playback started...');
            }
        });
    }

    // Checkbox interaction
    const checkboxes = document.querySelectorAll('.action-item input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const text = cb.nextElementSibling.querySelector('p');
            if (cb.checked) {
                text.style.textDecoration = 'line-through';
                text.style.opacity = '0.5';
            } else {
                text.style.textDecoration = 'none';
                text.style.opacity = '1';
            }
        });
    });
});
