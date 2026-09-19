document.addEventListener('DOMContentLoaded', () => {
    // Tab switching for genre chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    // Mock Audio Player Toggle
    const playButtons = document.querySelectorAll('.play-btn, .play-pause');
    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isPlaying = btn.textContent === '⏸';
            btn.textContent = isPlaying ? '▶' : '⏸';
            
            // If it's a feed card play button, simulate progress
            const card = btn.closest('.feed-card');
            if (card) {
                const scrubber = card.querySelector('.scrub-bar');
                if (!isPlaying) {
                    let progress = parseInt(scrubber.style.width);
                    const interval = setInterval(() => {
                        if (btn.textContent === '▶' || progress >= 100) {
                            clearInterval(interval);
                            return;
                        }
                        progress += 1;
                        scrubber.style.width = progress + '%';
                    }, 500);
                }
            }
        });
    });

    // Join Listening Party Animation
    const joinBtn = document.getElementById('join-party');
    joinBtn.addEventListener('click', () => {
        joinBtn.textContent = 'Joining...';
        joinBtn.style.opacity = '0.7';
        setTimeout(() => {
            joinBtn.textContent = 'In Party';
            joinBtn.classList.remove('btn-primary');
            joinBtn.style.background = '#FFB800';
            joinBtn.style.color = '#000';
        }, 1500);
    });

    // Message sending simulation
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input input');
    const chatHistory = document.querySelector('.chat-history');

    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'msg sent';
            msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
            chatHistory.appendChild(msgDiv);
            chatInput.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight;

            // Fake reply
            setTimeout(() => {
                const replyDiv = document.createElement('div');
                replyDiv.className = 'msg received';
                replyDiv.innerHTML = `<div class="bubble">Big up! ✊🏾</div>`;
                chatHistory.appendChild(replyDiv);
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 1000);
        }
    });

    // Keyboard support for chat
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });
});
