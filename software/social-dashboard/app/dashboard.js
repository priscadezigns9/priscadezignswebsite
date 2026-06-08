function generateWeekly() {
    alert("AI is analyzing your audience and drafting 14 posts for the week...");
}

function aiGenerate() {
    const topic = document.getElementById('ai-topic').value;
    if (!topic) return alert("Please enter a topic");
    
    const results = document.getElementById('ai-results');
    results.innerHTML = `
        <div class="ai-draft">
            <strong>IG/FB:</strong> "🚀 Check out the latest on ${topic}! Swipe to see more..."
        </div>
        <div class="ai-draft">
            <strong>Threads:</strong> "Unpopular opinion: ${topic} is changing everything. Here is why... 🧵"
        </div>
        <div class="ai-draft">
            <strong>X:</strong> "Why ${topic} matters in 2026. A thread. #AI #Tech"
        </div>
    `;
}

function openModal() {
    document.getElementById('connect-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('connect-modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('connect-modal');
    if (event.target == modal) {
        closeModal();
    }
}