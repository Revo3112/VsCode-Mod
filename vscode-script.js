/* ========================================
   VS Code Enhanced Script with Command Palette Support
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Command palette blur effect handler
    const checkElement = setInterval(() => {
        const commandDialog = document.querySelector(".quick-input-widget");
        if (commandDialog) {
            // Apply the blur effect immediately if the command dialog is visible
            if (commandDialog.style.display !== "none") {
                runMyScript();
            }

            // Create an DOM observer to 'listen' for changes in element's attribute.
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (commandDialog.style.display === 'none') {
                            handleEscape();
                        } else {
                            // If the .quick-input-widget element (command palette) is in the DOM
                            // but no inline style display: none, show the backdrop blur.
                            runMyScript();
                        }
                    }
                });
            });

            observer.observe(commandDialog, { attributes: true });

            // Clear the interval once the observer is set
            clearInterval(checkElement);
        } else {
            // Retry silently - no console spam
        }
    }, 500); // Check every 500ms

    // Execute when command palette was launched.
    document.addEventListener('keydown', function(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
            event.preventDefault();
            runMyScript();
        } else if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            handleEscape();
        }
    });

    // Ensure the escape key event listener is at the document level
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            handleEscape();
        }
    }, true);

    function runMyScript() {
        const targetDiv = document.querySelector(".monaco-workbench");

        // Remove existing element if it already exists
        const existingElement = document.getElementById("command-blur");
        existingElement && existingElement.remove();

        // Create and configure the new element
        const newElement = document.createElement("div");
        newElement.setAttribute('id', 'command-blur');

        newElement.addEventListener('click', function() {
            newElement.remove();
        });

        // Append the new element as a child of the targetDiv
        targetDiv.appendChild(newElement);

        // Hide the sticky widget
        const widgets = document.querySelectorAll(".sticky-widget");
        widgets.forEach((widget) => {
            widget.style.opacity = 0;
        });

        // Hide the tree sticky widget
        const treeWidget = document.querySelector(".monaco-tree-sticky-container");
        treeWidget && (treeWidget.style.opacity = 0);
    }

    // Remove the backdrop blur from the DOM when esc key is pressed.
    function handleEscape() {
        const element = document.getElementById("command-blur");
        element && element.click();

        // Show the sticky widget
        const widgets = document.querySelectorAll(".sticky-widget");
        widgets.forEach((widget) => {
            widget.style.opacity = 1;
        });

        // Show the tree sticky widget
        const treeWidget = document.querySelector(".monaco-tree-sticky-container");
        treeWidget && (treeWidget.style.opacity = 1);
    }
});

/* ========================================
   ENHANCED NEON ANIME THEME SCRIPT
   ======================================== */

(function() {
    'use strict';

    // Simplified Configuration - Only for Active Features
    const CONFIG = {
        particleEffects: true,
        particleCount: 40, // Snow particles
        smoothTransitions: true
    };

    // Main Theme Controller
    class NeonAnimeThemeEnhanced {
        constructor() {
            this.particles = [];
            this.init();
        }

        init() {
            // Initialize theme silently

            // Wait for VS Code to fully load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                setTimeout(() => this.start(), 1000);
            }
        }

        start() {
            // Essential theme enhancements
            this.addSmoothTransitions();
            this.fixLineNumberGlow();
            this.fixExtensionPanel();

            // Anime-style visual enhancements
            this.addAnimeBackgroundEffects();
            this.addAnimeTextEffects();

            // Particle effects
            if (CONFIG.particleEffects) {
                this.createParticleContainer();
                this.generateParticles();
            }

            // Theme ready - silent initialization complete
        }

        // Create particle container
        createParticleContainer() {
            if (document.getElementById('neon-particles')) return;

            const container = document.createElement('div');
            container.id = 'neon-particles';
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

        // Generate beautiful snow particles falling from top
        generateParticles() {
            const container = document.getElementById('neon-particles');
            if (!container) return;

            // Clear existing particles
            this.particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
            this.particles = [];

            // Professional palette colors for particles - CONSISTENT WITH THEME
            const paletteParticles = [
                'radial-gradient(circle, rgba(74, 144, 226, 0.8) 0%, rgba(108, 114, 147, 0.6) 50%, rgba(184, 188, 200, 0.3) 100%)', // Professional Blue
                'radial-gradient(circle, rgba(108, 114, 147, 0.7) 0%, rgba(184, 188, 200, 0.5) 50%, rgba(255, 255, 255, 0.3) 100%)', // Medium Gray
                'radial-gradient(circle, rgba(184, 188, 200, 0.6) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(74, 144, 226, 0.2) 100%)', // Light Gray
                'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(74, 144, 226, 0.3) 50%, rgba(10, 14, 21, 0.1) 100%)', // White to Blue
            ];

            for (let i = 0; i < CONFIG.particleCount; i++) {
                const particle = document.createElement('div');
                const colorGradient = paletteParticles[Math.floor(Math.random() * paletteParticles.length)];

                // Snow properties
                const size = Math.random() * 4 + 2; // 2-6px
                const opacity = Math.random() * 0.6 + 0.3; // 0.3-0.9
                const duration = Math.random() * 10 + 10; // 10-20s
                const delay = Math.random() * 15; // Random start delay
                const drift = (Math.random() - 0.5) * 100; // Gentle horizontal drift
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
                    box-shadow: 0 0 ${size * 2}px rgba(74, 144, 226, 0.3);
                    pointer-events: none;
                    --drift: ${drift}px;
                `;

                container.appendChild(particle);
                this.particles.push(particle);
            }

            // Add snow animation styles
            this.addSnowAnimations();
        }

        // Add snow animation keyframes
        addSnowAnimations() {
            if (document.getElementById('snow-animations')) return;

            const style = document.createElement('style');
            style.id = 'snow-animations';
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

        // Simple line number glow fix
        fixLineNumberGlow() {
            const style = document.createElement('style');
            style.id = 'line-number-fix';
            style.textContent = `
                .line-numbers {
                    transition: all 0.2s ease !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Smooth transitions for UI elements
        addSmoothTransitions() {
            if (!CONFIG.smoothTransitions) return;

            const style = document.createElement('style');
            style.id = 'smooth-transitions';
            style.textContent = `
                .monaco-list-row,
                .tab,
                .monaco-action-bar .action-item,
                .extension-list-item {
                    transition: all 0.2s ease !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Simple extension panel fixes
        fixExtensionPanel() {
            const style = document.createElement('style');
            style.id = 'extension-panel-fix';
            style.textContent = `
                .extension-list-item .extension-icon {
                    border-radius: 6px !important;
                    filter: drop-shadow(0 0 8px rgba(74, 144, 226, 0.3)) !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Add spectacular anime-style dynamic background effects
        addAnimeBackgroundEffects() {
            // Create animated background waves
            const waveContainer = document.createElement('div');
            waveContainer.id = 'anime-waves';
            waveContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 5;
                overflow: hidden;
                opacity: 0.08;
            `;

            // Create wave layers with professional palette colors
            const waveColors = [
                'linear-gradient(90deg, transparent 0%, rgba(74, 144, 226, 0.15) 25%, rgba(108, 114, 147, 0.12) 50%, rgba(184, 188, 200, 0.08) 75%, transparent 100%)',
                'linear-gradient(90deg, transparent 0%, rgba(108, 114, 147, 0.12) 25%, rgba(184, 188, 200, 0.10) 50%, rgba(255, 255, 255, 0.06) 75%, transparent 100%)',
                'linear-gradient(90deg, transparent 0%, rgba(184, 188, 200, 0.10) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(74, 144, 226, 0.05) 75%, transparent 100%)'
            ];

            for (let i = 0; i < 3; i++) {
                const wave = document.createElement('div');
                wave.className = 'anime-wave';
                wave.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 200%;
                    height: ${120 + i * 20}px;
                    background: ${waveColors[i]};
                    animation: animeWaveMove ${12 + i * 4}s linear infinite;
                    transform: translateY(${i * 50}px);
                    opacity: ${0.8 - i * 0.2};
                    border-radius: 50% 50% 0 0;
                `;
                waveContainer.appendChild(wave);
            }

            document.body.appendChild(waveContainer);

            // Add aurora-like effect
            const auroraContainer = document.createElement('div');
            auroraContainer.id = 'anime-aurora';
            auroraContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 3;
                overflow: hidden;
                opacity: 0.05;
            `;

            for (let i = 0; i < 4; i++) {
                const aurora = document.createElement('div');
                aurora.className = 'anime-aurora-band';
                aurora.style.cssText = `
                    position: absolute;
                    top: ${i * 25}%;
                    left: -50%;
                    width: 200%;
                    height: 20%;
                    background: linear-gradient(45deg,
                        rgba(74, 144, 226, 0.1) 0%,
                        rgba(108, 114, 147, 0.08) 25%,
                        rgba(184, 188, 200, 0.06) 50%,
                        rgba(255, 255, 255, 0.08) 75%,
                        rgba(74, 144, 226, 0.1) 100%);
                    animation: auroraFlow ${20 + i * 5}s ease-in-out infinite;
                    transform: rotate(${i * 15 - 30}deg);
                    filter: blur(2px);
                `;
                auroraContainer.appendChild(aurora);
            }

            document.body.appendChild(auroraContainer);

            // Enhanced wave and aurora animations
            if (!document.getElementById('anime-wave-styles')) {
                const waveStyle = document.createElement('style');
                waveStyle.id = 'anime-wave-styles';
                waveStyle.textContent = `
                    @keyframes animeWaveMove {
                        0% {
                            transform: translateX(-50%) translateY(var(--wave-offset, 0px)) scaleY(1);
                        }
                        25% {
                            transform: translateX(-25%) translateY(var(--wave-offset, 0px)) scaleY(1.1);
                        }
                        50% {
                            transform: translateX(0%) translateY(var(--wave-offset, 0px)) scaleY(0.9);
                        }
                        75% {
                            transform: translateX(25%) translateY(var(--wave-offset, 0px)) scaleY(1.1);
                        }
                        100% {
                            transform: translateX(50%) translateY(var(--wave-offset, 0px)) scaleY(1);
                        }
                    }

                    @keyframes auroraFlow {
                        0%, 100% {
                            transform: translateX(-30%) rotate(var(--aurora-rotation, -15deg)) scaleX(1);
                            opacity: 0.05;
                        }
                        25% {
                            transform: translateX(-10%) rotate(var(--aurora-rotation, -10deg)) scaleX(1.2);
                            opacity: 0.08;
                        }
                        50% {
                            transform: translateX(10%) rotate(var(--aurora-rotation, -5deg)) scaleX(0.8);
                            opacity: 0.12;
                        }
                        75% {
                            transform: translateX(30%) rotate(var(--aurora-rotation, 0deg)) scaleX(1.1);
                            opacity: 0.06;
                        }
                    }
                `;
                document.head.appendChild(waveStyle);
            }
        }

        // Add anime-style text effects for specific elements
        addAnimeTextEffects() {
            const style = document.createElement('style');
            style.id = 'anime-text-effects';
            style.textContent = `
                /* Anime rainbow text effect for special elements */
                .anime-rainbow-text {
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
                    background-size: 200% 200%;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: animeRainbowFlow 3s ease-in-out infinite;
                }

                @keyframes animeRainbowFlow {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                /* Anime glow pulse for interactive elements */
                .anime-glow-pulse {
                    animation: animeGlowPulse 2s ease-in-out infinite;
                }

                @keyframes animeGlowPulse {
                    0%, 100% {
                        box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(74, 144, 226, 0.8),
                                    0 0 30px rgba(108, 114, 147, 0.6),
                                    0 0 40px rgba(184, 188, 200, 0.4);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize the theme
    const theme = new NeonAnimeThemeEnhanced();
})();

// Auto-inject CSS if not already present
(function() {
    const cssId = 'neon-anime-theme-css';
    if (!document.getElementById(cssId)) {
        // Auto-inject CSS silently

        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'custom-vscode.css';

        // Silent error handling - no console spam
        link.onerror = function() {
            // CSS loading failed - handle silently
        };

        link.onload = function() {
            // CSS loaded successfully - no console output needed
        };

        document.head.appendChild(link);
    }
})();
