/* ========================================
   VS Code Enhanced Script - Snow Animation & Command Palette & Icon Replacement
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
   ICON REPLACEMENT SYSTEM - PROGRAMMER THEME
   ======================================== */

(function() {
    'use strict';

    // Icon Configuration - Professional Programming Icons
    const ICON_CONFIG = {
        // Choose one of these iconic programmer symbols
        icons: {
            lightning: '⚡',      // Lightning bolt - represents speed/power
            code: '{ }',         // Code brackets - classic programming symbol
            terminal: '▶',       // Terminal prompt
            gear: '⚙',          // Settings/configuration gear
            lambda: 'λ',         // Lambda symbol - functional programming
            hash: '#',           // Hash symbol - common in programming
            brackets: '< />',    // XML/HTML brackets
            diamond: '◆',        // Diamond shape - modern/clean
            arrow: '→',          // Right arrow - progression/flow
            star: '★'            // Star - achievement/excellence
        },
        selectedIcon: '⚡',  // Default: Lightning bolt for programmer power
        iconColor: '#00ff41', // Matrix green color
        iconSize: '18px',
        animationEnabled: true
    };

    class IconReplacer {
        constructor() {
            this.observers = [];
            this.init();
        }

        init() {
            // Wait for VS Code to fully load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                setTimeout(() => this.start(), 1000);
            }
        }

        start() {
            console.log('🎯 Starting VS Code Icon Replacement...');

            // Initial icon replacement
            this.replaceIcon();

            // Setup observers for dynamic updates
            this.setupIconObserver();

            // Retry replacement multiple times for reliability
            [500, 1500, 3000].forEach(delay => {
                setTimeout(() => this.replaceIcon(), delay);
            });
        }

        replaceIcon() {
            // Target the specific icon element in the titlebar
            const iconSelectors = [
                '.window-appicon',
                '.titlebar-left .window-appicon',
                '.part.titlebar .window-appicon',
                '.monaco-workbench .part.titlebar .titlebar-left .window-appicon'
            ];

            let iconReplaced = false;

            iconSelectors.forEach(selector => {
                const iconElements = document.querySelectorAll(selector);

                iconElements.forEach(iconElement => {
                    if (iconElement && !iconElement.querySelector('.custom-programmer-icon')) {
                        this.createCustomIcon(iconElement);
                        iconReplaced = true;
                    }
                });
            });

            if (iconReplaced) {
                console.log('✅ VS Code icon successfully replaced with programmer icon');
            }

            return iconReplaced;
        }

        createCustomIcon(originalIcon) {
            // Hide the original VS Code icon
            originalIcon.style.cssText += `
                visibility: hidden !important;
                position: relative !important;
                display: block !important;
            `;

            // Create custom programmer icon
            const customIcon = document.createElement('div');
            customIcon.className = 'custom-programmer-icon';
            customIcon.textContent = ICON_CONFIG.selectedIcon;

            // Apply professional styling
            customIcon.style.cssText = `
                position: absolute !important;
                left: 50% !important;
                top: 50% !important;
                transform: translate(-50%, -50%) !important;
                font-size: ${ICON_CONFIG.iconSize} !important;
                font-weight: bold !important;
                line-height: 1 !important;
                color: ${ICON_CONFIG.iconColor} !important;
                user-select: none !important;
                pointer-events: none !important;
                z-index: 1000 !important;
                visibility: visible !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-shadow: 0 0 10px ${ICON_CONFIG.iconColor}40 !important;
                font-family: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', monospace !important;
                ${ICON_CONFIG.animationEnabled ? `
                    transition: all 0.3s ease !important;
                    animation: iconGlow 2s ease-in-out infinite alternate !important;
                ` : ''}
            `;

            // Add hover effects for interactivity
            if (ICON_CONFIG.animationEnabled) {
                customIcon.addEventListener('mouseenter', () => {
                    customIcon.style.transform = 'translate(-50%, -50%) scale(1.2)';
                    customIcon.style.textShadow = `0 0 15px ${ICON_CONFIG.iconColor}80`;
                });

                customIcon.addEventListener('mouseleave', () => {
                    customIcon.style.transform = 'translate(-50%, -50%) scale(1)';
                    customIcon.style.textShadow = `0 0 10px ${ICON_CONFIG.iconColor}40`;
                });
            }

            // Insert the custom icon
            originalIcon.appendChild(customIcon);

            // Add custom styles for animation
            if (ICON_CONFIG.animationEnabled) {
                this.addIconStyles();
            }
        }

        addIconStyles() {
            if (document.getElementById('programmer-icon-styles')) return;

            const style = document.createElement('style');
            style.id = 'programmer-icon-styles';
            style.textContent = `
                @keyframes iconGlow {
                    0% {
                        text-shadow: 0 0 10px ${ICON_CONFIG.iconColor}40;
                    }
                    100% {
                        text-shadow: 0 0 20px ${ICON_CONFIG.iconColor}80, 0 0 30px ${ICON_CONFIG.iconColor}40;
                    }
                }

                .custom-programmer-icon {
                    will-change: transform, text-shadow;
                }
            `;

            document.head.appendChild(style);
        }

        setupIconObserver() {
            // Create observer to watch for titlebar changes
            const titlebarObserver = new MutationObserver((mutations) => {
                let needsIconReplace = false;

                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Check if titlebar or icon elements were added
                                if (node.classList?.contains('titlebar') ||
                                    node.classList?.contains('window-appicon') ||
                                    node.querySelector?.('.window-appicon') ||
                                    node.querySelector?.('.titlebar')) {
                                    needsIconReplace = true;
                                }
                            }
                        });
                    }
                });

                if (needsIconReplace) {
                    setTimeout(() => this.replaceIcon(), 100);
                }
            });

            // Observe the main workbench for changes
            const workbench = document.querySelector('.monaco-workbench') || document.body;
            if (workbench) {
                titlebarObserver.observe(workbench, {
                    childList: true,
                    subtree: true,
                    attributes: false
                });
                this.observers.push(titlebarObserver);
            }

            // Also observe the titlebar directly if it exists
            const titlebar = document.querySelector('.part.titlebar');
            if (titlebar) {
                const titlebarDirectObserver = new MutationObserver(() => {
                    setTimeout(() => this.replaceIcon(), 50);
                });

                titlebarDirectObserver.observe(titlebar, {
                    childList: true,
                    subtree: true
                });
                this.observers.push(titlebarDirectObserver);
            }
        }

        cleanup() {
            this.observers.forEach(observer => observer.disconnect());
            this.observers = [];

            const styleElement = document.getElementById('programmer-icon-styles');
            if (styleElement) styleElement.remove();

            console.log('🧹 Icon Replacer cleaned up');
        }
    }

    // Initialize icon replacer
    const iconReplacer = new IconReplacer();

    // Make it globally accessible for debugging
    window.IconReplacer = iconReplacer;

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (window.IconReplacer) {
            window.IconReplacer.cleanup();
        }
    });

    // Debug function for manual icon replacement
    window.replaceVSCodeIcon = function(newIcon, color) {
        if (newIcon) ICON_CONFIG.selectedIcon = newIcon;
        if (color) ICON_CONFIG.iconColor = color;
        iconReplacer.replaceIcon();
        console.log(`🎯 Icon manually changed to: ${ICON_CONFIG.selectedIcon}`);
    };

})();

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
