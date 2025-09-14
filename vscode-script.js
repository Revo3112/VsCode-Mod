/* ========================================
   VS Code Enhanced Script - Snow Animation & Command Palette
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Command palette blur effect handler
    const checkElement = setInterval(() => {
        const commandDialog = document.querySelector(".quick-input-widget");
        if (commandDialog) {
            // Apply blur effect if command dialog is visible
            if (commandDialog.style.display !== "none") {
                showCommandBlur();
            }

            // Observer for command dialog changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (commandDialog.style.display === 'none') {
                            hideCommandBlur();
                        } else {
                            showCommandBlur();
                        }
                    }
                });
            });

            observer.observe(commandDialog, { attributes: true });
            clearInterval(checkElement);
        }
    }, 500);

    // Command palette keyboard handlers
    document.addEventListener('keydown', function(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
            event.preventDefault();
            showCommandBlur();
        } else if (event.key === 'Escape' || event.key === 'Esc') {
            hideCommandBlur();
        }
    }, true);

    function showCommandBlur() {
        const targetDiv = document.querySelector(".monaco-workbench");
        if (!targetDiv) return;

        // Remove existing blur element
        const existingElement = document.getElementById("command-blur");
        if (existingElement) existingElement.remove();

        // Create new blur element
        const blurElement = document.createElement("div");
        blurElement.setAttribute('id', 'command-blur');
        blurElement.addEventListener('click', hideCommandBlur);
        targetDiv.appendChild(blurElement);

        // Hide sticky widgets
        const widgets = document.querySelectorAll(".sticky-widget");
        widgets.forEach((widget) => {
            widget.style.opacity = 0;
        });

        const treeWidget = document.querySelector(".monaco-tree-sticky-container");
        if (treeWidget) treeWidget.style.opacity = 0;
    }

    function hideCommandBlur() {
        const blurElement = document.getElementById("command-blur");
        if (blurElement) blurElement.remove();

        // Show sticky widgets
        const widgets = document.querySelectorAll(".sticky-widget");
        widgets.forEach((widget) => {
            widget.style.opacity = 1;
        });

        const treeWidget = document.querySelector(".monaco-tree-sticky-container");
        if (treeWidget) treeWidget.style.opacity = 1;
    }
});

/* ========================================
   SNOW ANIMATION SYSTEM
   ======================================== */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        particleCount: 20,
        enable: true
    };

    class SnowAnimation {
        constructor() {
            this.particles = [];
            this.init();
        }

        init() {
            // Wait for VS Code to load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                setTimeout(() => this.start(), 2000);
            }
        }

        start() {
            if (CONFIG.enable) {
                this.createParticleContainer();
                this.generateSnowParticles();
            }
        }

        createParticleContainer() {
            if (document.getElementById('snow-particles')) return;

            const container = document.createElement('div');
            container.id = 'snow-particles';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 10;
                overflow: hidden;
            `;

            document.body.appendChild(container);
        }

        generateSnowParticles() {
            const container = document.getElementById('snow-particles');
            if (!container) return;

            // Clear existing particles
            this.particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
            this.particles = [];

            // Professional color palette for snow particles
            const snowColors = [
                'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(184, 188, 200, 0.6) 50%, rgba(108, 114, 147, 0.3) 100%)',
                'radial-gradient(circle, rgba(184, 188, 200, 0.7) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(53, 58, 95, 0.3) 100%)',
                'radial-gradient(circle, rgba(108, 114, 147, 0.6) 0%, rgba(184, 188, 200, 0.4) 50%, rgba(255, 255, 255, 0.2) 100%)',
                'radial-gradient(circle, rgba(53, 58, 95, 0.5) 0%, rgba(108, 114, 147, 0.3) 50%, rgba(10, 14, 21, 0.1) 100%)'
            ];

            // Generate snow particles
            for (let i = 0; i < CONFIG.particleCount; i++) {
                const particle = document.createElement('div');
                const colorGradient = snowColors[Math.floor(Math.random() * snowColors.length)];

                // Snow properties
                const size = Math.random() * 4 + 2; // 2-6px
                const opacity = Math.random() * 0.6 + 0.3; // 0.3-0.9
                const duration = Math.random() * 10 + 10; // 10-20s fall time
                const delay = Math.random() * 15; // Random start delay
                const drift = (Math.random() - 0.5) * 100; // Horizontal drift
                const startX = Math.random() * 100; // Random start position

                particle.className = 'snow-particle';
                particle.style.cssText = `
                    position: absolute;
                    left: ${startX}vw;
                    top: -10px;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${colorGradient};
                    border-radius: 50%;
                    opacity: ${opacity};
                    animation: snowFall ${duration}s ${delay}s infinite linear;
                    filter: blur(0.5px);
                    box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
                    pointer-events: none;
                    --drift: ${drift}px;
                `;

                container.appendChild(particle);
                this.particles.push(particle);
            }

            this.addSnowStyles();
        }

        addSnowStyles() {
            if (document.getElementById('snow-styles')) return;

            const style = document.createElement('style');
            style.id = 'snow-styles';
            style.textContent = `
                @keyframes snowFall {
                    0% {
                        transform: translateY(-10px) translateX(0px);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) translateX(var(--drift, 0px));
                        opacity: 0;
                    }
                }

                .snow-particle {
                    will-change: transform, opacity;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize snow animation
    new SnowAnimation();
})();
