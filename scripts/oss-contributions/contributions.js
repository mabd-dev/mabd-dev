// Open Source Contributions data
const contributionsOverrides = {
    "ibad-al-rahman/android-public": {
        title: "Prayer Times",
        description: "Islamic prayer times",
        techStack: ["android", "jetpack-compose", "MVI", "Widgets"]
    },
    "nsh07/Tomato": {
        techStack: ["android", "jetpack-compose", "material3-expressive"]
    },
    "qamarelsafadi/JetpackComposeTracker": {
        techStack: ["android", "jetpack-compose", "kotlin"]
    },
    "android/nav3-recipes": {
        techStack: ["android", "jetpack-navigation-3", "jetpack-compose", "kotlin"]
    },
    "android/cahier": {
        description: "Cahier is a feature-rich, offline-first note-taking application built to showcase modern Android development best practices",
        techStack: ["android", "jetpack-compose", "kotlin"],
    },
    "esatgozcu/Compose-Rolling-Number": {
        techStack: ["android", "jetpack-compose", "kotlin"]
    },
    "zuzmuz/nvimawscli": {
        techStack: ["lua"]
    }
}


// Create and render summary statistics
function renderSummaryStats(summary) {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'contributions-stats';

    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">📦</div>
            <div class="stat-content">
                <div class="stat-value">${summary.totalProjects}</div>
                <div class="stat-label">Projects</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
                <div class="stat-value">${summary.totalPRsMerged}</div>
                <div class="stat-label">Merged PRs</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">➕</div>
            <div class="stat-content">
                <div class="stat-value">${summary.totalAdditions.toLocaleString()}</div>
                <div class="stat-label">Lines Added</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">➖</div>
            <div class="stat-content">
                <div class="stat-value">${summary.totalDeletions.toLocaleString()}</div>
                <div class="stat-label">Lines Deleted</div>
            </div>
        </div>
    `;

    return statsContainer;
}

// Render contributions
function renderContributions() {
    const container = document.getElementById('contributions-list');
    if (!container) return;

    container.innerHTML = '';

    fetch('scripts/oss-contributions/contributions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)

            // If no contributions, hide the section or show a message
            if (data.contributions.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #e0e0e0; opacity: 0.7;">No contributions to display yet.</p>';
                return;
            }

            // Render summary statistics
            const statsElement = renderSummaryStats(data.summary);
            container.parentElement.insertBefore(statsElement, container);

            data.contributions.forEach(contribution => {
                contribution = processContribution(contribution)
                const card = createContributionCard(contribution);
                container.appendChild(card);
            })
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

function processContribution(contribution) {
    let overrides = contributionsOverrides[contribution.repo] ?? {}

    return {
        title: overrides.title ?? contribution.repoName,
        owner: contribution.owner,
        description: overrides.description ?? contribution.description,
        techStack: overrides.techStack,
        url: contribution.repoURL,
        stars: contribution.stars,
        prsMerged: contribution.prsMerged,
        additions: contribution.additions,
        deletions: contribution.deletions,
    }
}


// Create contribution card
function createContributionCard(contribution) {
    const card = document.createElement('a');
    card.href = contribution.url;
    card.target = '_blank';
    card.className = 'contribution-card';

    card.innerHTML = `
        <div class="contribution-header">
            <div class="contribution-title-group">
                <h3 class="contribution-title">${contribution.title}</h3>
                <p class="contribution-org">github@${contribution.owner}</p>
            </div>
        </div>
        <p class="contribution-description">${contribution.description}</p>
        
        <!-- <div class="contribution-stats-row"> -->
        <!--     <div class="contribution-stat"> -->
        <!--         <span class="stat-icon">⭐</span> -->
        <!--         <span class="stat-number">${contribution.stars.toLocaleString()}</span> -->
        <!--         <span class="stat-text">stars</span> -->
        <!--     </div> -->
        <!--     <div class="contribution-stat"> -->
        <!--         <span class="stat-icon">✅</span> -->
        <!--         <span class="stat-number">${contribution.prsMerged}</span> -->
        <!--         <span class="stat-text">PRs</span> -->
        <!--     </div> -->
        <!--     <div class="contribution-stat"> -->
        <!--         <span class="stat-icon">➕</span> -->
        <!--         <span class="stat-number">${contribution.additions.toLocaleString()}</span> -->
        <!--         <span class="stat-text">added</span> -->
        <!--     </div> -->
        <!--     <div class="contribution-stat"> -->
        <!--         <span class="stat-icon">➖</span> -->
        <!--         <span class="stat-number">${contribution.deletions.toLocaleString()}</span> -->
        <!--         <span class="stat-text">deleted</span> -->
        <!--     </div> -->
        <!-- </div> -->
        
        <div class="contribution-tech">
            ${contribution.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
    `;

    return card;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderContributions);
} else {
    renderContributions();
}
