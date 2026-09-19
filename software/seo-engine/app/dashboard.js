function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.sidebar nav a').forEach(link => link.classList.remove('active'));
    
    document.getElementById(tabId + '-tab').classList.add('active');
    event.currentTarget.classList.add('active');
}

function runAudit() {
    const url = document.getElementById('url-input').value;
    if (!url) return alert('Please enter a URL');

    const scoreCircle = document.getElementById('score-circle');
    const scoreText = document.getElementById('score-text');
    const issuesList = document.getElementById('issues-list');
    const recommendationsList = document.getElementById('recommendations-list');

    // Simulate audit
    let score = 0;
    const targetScore = Math.floor(Math.random() * 30) + 65; // 65-95

    const interval = setInterval(() => {
        if (score >= targetScore) {
            clearInterval(interval);
        } else {
            score++;
            scoreText.textContent = score;
            scoreCircle.setAttribute('stroke-dasharray', `${score}, 100`);
        }
    }, 20);

    issuesList.innerHTML = `
        <li>Missing Meta Description</li>
        <li>H1 tag is too long (75 characters)</li>
        <li>3 images missing Alt text</li>
        <li>Large layout shift detected (CLS: 0.25)</li>
    `;

    recommendationsList.innerHTML = `
        <li>Add a meta description to improve CTR.</li>
        <li>Compress images to save 1.2MB of page load.</li>
        <li>Implement breadcrumbs for better crawling.</li>
        <li>Fix the H1 tag to include target keyword.</li>
    `;
}

function generateBlog() {
    const keyword = document.getElementById('keyword-input').value;
    if (!keyword) return alert('Please enter a keyword');

    const blogOutput = document.getElementById('blog-output');
    const blogTitle = document.getElementById('blog-title');
    const blogBody = document.getElementById('blog-body');

    blogOutput.style.display = 'block';
    blogTitle.textContent = `The Ultimate Guide to ${keyword}`;
    blogBody.innerHTML = `
        <p>In today's fast-paced digital world, mastering <strong>${keyword}</strong> is no longer optional. Whether you are a beginner or an expert, understanding the core principles of ${keyword} can significantly impact your results.</p>
        <h4>1. Why ${keyword} Matters</h4>
        <p>Research shows that sites optimized for ${keyword} see a 40% increase in organic traffic within the first three months. This is because search engines prioritize relevant, high-quality content that addresses user intent.</p>
        <h4>2. Common Mistakes to Avoid</h4>
        <p>Many practitioners fail because they focus on keyword stuffing rather than value. To succeed with ${keyword}, you must prioritize the user experience.</p>
    `;
}

function copyContent() {
    const body = document.getElementById('blog-body').innerText;
    navigator.clipboard.writeText(body).then(() => {
        alert('Content copied to clipboard!');
    });
}

// Initialize Calendar
function initCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    
    for (let i = 1; i <= 31; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.innerHTML = `<span class="day-number">${i}</span>`;
        
        if (i % 3 === 0) {
            const indicator = document.createElement('div');
            indicator.className = 'post-indicator';
            day.appendChild(indicator);
        }
        
        grid.appendChild(day);
    }
}

document.addEventListener('DOMContentLoaded', initCalendar);