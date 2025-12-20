// Open Source Contributions data
const contributions = [
    
    {
        title: "LintingGuild",
        organization: "github@qamarelsafadi",
        description: "Demo of custom Android Lint rules for Jetpack Compose applications",
        techStack: ["lint", "tooling", "android", "jetpack-compose"],
        url: "https://github.com/qamarelsafadi/LintingGuild"
    },
    {
        title: "Prayer Times",
        organization: "github@ibad-al-rahman",
        description: "Ibad's Android codebase for the public app",
        techStack: ["MVI", "Widgets", "android", "jetpack-compose"],
        url: "https://github.com/ibad-al-rahman/android-public"
    },
    {
        title: "Tomato",
        organization: "github@nsh07",
        description: "Minimalist, data-oriented pomodoro timer for Android based on Material 3 Expressive ",
        techStack: ["android", "jetpack-compose", "material3-expressive"],
        url: "https://github.com/nsh07/Tomato"
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
    {
        title: "nvimawscli",
        organization: "github@zuzmuz",
        description: "A plugin to manage aws cli from inside neovim",
        techStack: ["lua"],
        url: "https://github.com/zuzmuz/nvimawscli"
    }
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
