// Open Source Contributions data
const contributions = [
    {
        title: "nvimawscli",
        organization: "github@zuzmuz",
        description: "A plugin to manage aws cli from inside neovim",
        techStack: ["lua"],
        url: "https://github.com/zuzmuz/nvimawscli"
    },
    {
        title: "JetpackComposeTracker",
        organization: "github@qamarelsafadi",
        description: "A tool to track you recomposition state in real-time ! ",
        techStack: ["android", "jetpack-compose", "kotlin"],
        url: "https://github.com/qamarelsafadi/JetpackComposeTracker"
    },
    {
        title: "nav3-recipes",
        organization: "github@android",
        description: "Common use cases with Jetpack Navigation 3",
        techStack: ["android", "jetpack-navigation-3", "jetpack-compose", "kotlin"],
        url: "https://github.com/android/nav3-recipes"
    },
    {
        title: "cahier",
        organization: "github@android",
        description: "Cahier is a feature-rich, offline-first note-taking application built to showcase modern Android development best practices",
        techStack: ["android", "jetpack-compose", "kotlin"],
        url: "https://github.com/android/cahier"
    },
    {
        title: "Compose-Rolling-Number",
        organization: "github@esatgozcu",
        description: "Rolling number library to show currency with animation",
        techStack: ["android", "jetpack-compose", "kotlin"],
        url: "https://github.com/esatgozcu/Compose-Rolling-Number"
    },
];

// Render contributions
function renderContributions() {
    const container = document.getElementById('contributions-list');

    if (!container) return;

    // If no contributions, hide the section or show a message
    if (contributions.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #e0e0e0; opacity: 0.7;">No contributions to display yet.</p>';
        return;
    }

    container.innerHTML = '';

    contributions.forEach(contribution => {
        const card = createContributionCard(contribution);
        container.appendChild(card);
    });
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
                <p class="contribution-org">${contribution.organization}</p>
            </div>
        </div>
        <p class="contribution-description">${contribution.description}</p>
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
