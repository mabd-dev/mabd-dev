// Experiments data
const experiments = [
    {
        id: "particles",
        title: "Particle System",
        description: "Interactive particles that respond to mouse movement with physics-based motion and connections",
        icon: "✨",
        tags: ["Physics", "Interactive", "Particles"],
        page: "particles.html",
        screenshot: null // Add screenshot path later if needed
    },
    {
        id: "waves",
        title: "Wave Patterns",
        description: "Mesmerizing sine wave animations creating fluid, organic patterns and movements",
        icon: "🌊",
        tags: ["Sine Waves", "Animation", "Fluid"],
        page: "waves.html",
        screenshot: null
    },
    {
        id: "fractals",
        title: "Fractal Tree",
        description: "Recursive branching patterns creating organic tree-like structures with adjustable parameters",
        icon: "🔷",
        tags: ["Recursion", "Fractals", "Generative"],
        page: "fractals.html",
        screenshot: null
    }
];

// Render experiments
function renderExperiments() {
    const grid = document.getElementById('experiments-grid');

    if (!grid) return;

    grid.innerHTML = '';

    experiments.forEach(experiment => {
        const card = createExperimentCard(experiment);
        grid.appendChild(card);
    });
}

// Create experiment card
function createExperimentCard(experiment) {
    const card = document.createElement('a');
    card.href = experiment.page;
    card.className = 'experiment-card';

    card.innerHTML = `
        <div class="experiment-preview">
            ${experiment.screenshot
                ? `<img src="${experiment.screenshot}" alt="${experiment.title}" class="preview-image">`
                : `<div class="preview-placeholder">
                    <span class="preview-icon">${experiment.icon}</span>
                   </div>`
            }
        </div>
        <div class="experiment-content">
            <h3 class="experiment-title">${experiment.title}</h3>
            <p class="experiment-description">${experiment.description}</p>
            <div class="experiment-tags">
                ${experiment.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderExperiments);
} else {
    renderExperiments();
}
