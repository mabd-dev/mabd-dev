// Projects data

const labels = {
    'mobile-app': 'Mobile App',
    'web-app': 'Web App',
    'cli': 'CLI Tool',
    'api': 'API',
    'library': 'Library',
    'creative-coding': 'Creative Coding',
    'other': 'Other'
};

const projects = [
    {
        name: "Gira Desktop App",
        category: "app",
        description: "Vim-powered Jira client for developers. Keyboard-driven issue management with bulk operations — no more endless clicking",
        tags: ["Compose-Multiplatform", "vim-engine", "jira"],
        link: "https://github.com/mabd-dev/Gira"
    },
    {
        name: "Doc Gen AI",
        category: "cli",
        description: "A Neovim plugin that generates code documentation using Local/Remote LLMs",
        tags: ["Neovim", "Ollama", "Open-AI API"],
        link: "https://github.com/mabd-dev/doc-gen-ai.nvim"
    },
    {
        name: "Github OSS Stats",
        category: "cli",
        description: "Showcase your open source contributions with auto updating GitHub profile badges",
        tags: ["Go", "Github Marketplace"],
        image: "resources/projects/gira-icon-option4.svg",
        link: "https://github.com/mabd-dev/gh-oss-stats"
    },
    {
        name: "Gira Cli",
        category: "cli",
        description: "Fast Jira cli client for viewing and navigating your Jira active sprints",
        tags: ["Go", "CLI", "Jira"],
        image: "resources/projects/gira-icon-option4.svg",
        link: "https://github.com/mabd-dev/gira-cli"
    },
    {
        name: "Habitsss",
        category: "mobile-app",
        description: "A powerful habit tracking app with cloud sync, widgets, and analytics. Built with 100% Jetpack Compose.",
        tags: ["Firebase", "Admob", "Widgets", "MVVM"],
        image: "resources/projects/habitsss-icon.svg",
        link: "projects/habitsss/index.html"
    },
    {
        name: "RepoScan",
        category: "cli",
        description: "A fast CLI tool to scan your system for Git repositories and report uncommitted files, unpushed commits, and unpulled changes.",
        tags: ["Go", "Bubble-Tea"],
        image: "resources/projects/reposcan-icon.svg",
        link: "projects/reposcan/index.html"
    },
    {
        name: "KMeta",
        category: "library",
        description: "Kotlin Meta-programming & code generation toolkit using KSP for automatic code generation with annotations like @Loggable, @Copy, and @ToNiceString.",
        tags: ["Kotlin", "KSP", "Meta-programming"],
        image: "resources/projects/kmeta-icon.svg",
        link: "https://github.com/mabd-dev/kmeta"
    },
    {
        name: "Prayer Times",
        category: "cli",
        description: "A simple terminal tool to check today's Islamic prayer times with a clean, minimal, and colorful format.",
        tags: ["Go", "CLI"],
        image: "resources/projects/prayer-times.svg",
        link: "projects/prayer-times/index.html"
    },
    {
        name: "Creative Coding",
        category: "creative-coding",
        description: "Interactive canvas experiments exploring generative art, particle systems, and visual effects through code.",
        tags: ["JavaScript", "Canvas"],
        image: "resources/projects/creative-coding-icon.svg",
        link: "projects/creative-coding/index.html"
    },
    {
        name: "Empty",
        category: "mobile-app",
        description: "A physics-based puzzle game that transforms your phone into a motion-controlled playground with challenging mazes.",
        tags: ["Android", "In house physics", "admob"],
        image: "resources/projects/empty-icon.svg",
        link: "projects/empty/index.html"
    },
];

// Filter functionality
let currentFilter = 'all';

function initProjects() {
    renderProjects();
    setupFilterButtons();
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    const emptyState = document.getElementById('empty-state');

    if (!grid) return;

    grid.innerHTML = '';

    const filteredProjects = currentFilter === 'all'
        ? projects
        : projects.filter(p => p.category === currentFilter);

    if (filteredProjects.length === 0) {
        emptyState.classList.add('visible');
        return;
    }

    emptyState.classList.remove('visible');

    filteredProjects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fade-in';

    const categoryLabel = getCategoryLabel(project.category);

    card.innerHTML = `
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-name">${project.name}</h3>
                <span class="project-category">${categoryLabel}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link" ${project.link.startsWith('http') ? 'target="_blank"' : ''}>
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    `;

    // Make the whole card clickable
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking the link directly
        if (!e.target.closest('.project-link')) {
            window.open(project.link, '_blank')
        }
    });

    return card;
}

function getCategoryLabel(category) {
    return labels[category] || category;
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Update current filter
            currentFilter = button.dataset.filter;

            // Re-render projects
            renderProjects();
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
} else {
    initProjects();
}
