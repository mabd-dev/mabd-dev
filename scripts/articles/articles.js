// Render articles section
function initArticles() {
    renderArticles();
}

function renderArticles() {
    const grid = document.getElementById('articles-grid');

    if (!grid) return;

    grid.innerHTML = '';

    if (articles.length === 0) {
        grid.innerHTML = '<p class="no-articles">No articles published yet. Check back soon!</p>';
        return;
    }

    articles.forEach(article => {
        const card = createArticleCard(article);
        grid.appendChild(card);
    });
}

function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card fade-in';

    const formattedDate = formatDate(article.publishDate);

    card.innerHTML = `
        <div class="article-content">
            <div class="article-header">
                <h3 class="article-title">${article.title}</h3>
                <a 
                    href="${article.url}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="external-link-icon" 
                    aria-label="Read on Medium"
                    data-umami-event="article-click"
                    data-umami-event-title="${article.title}"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
            </div>

            <p class="article-description">${article.description}</p>

            <div class="article-meta">
                <!-- <span class="article-date"> -->
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> -->
                    <!--     <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect> -->
                    <!--     <line x1="16" y1="2" x2="16" y2="6"></line> -->
                    <!--     <line x1="8" y1="2" x2="8" y2="6"></line> -->
                    <!--     <line x1="3" y1="10" x2="21" y2="10"></line> -->
                    <!-- </svg> -->
                    <!-- ${formattedDate} -->
                <!-- </span> -->
                <span class="article-read-time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${article.readTime}
                </span>
            </div>

            <div class="article-tags">
                ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    // Make the whole card clickable
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking the external link icon directly
        if (!e.target.closest('.external-link-icon')) {
             window.umami.track('article-click', {
                title: article.title,
            });
            window.open(article.url, '_blank', 'noopener,noreferrer');
        }
    });

    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArticles);
} else {
    initArticles();
}
