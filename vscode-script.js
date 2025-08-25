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
            console.log("Command dialog not found yet. Retrying...");
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

    // Enhanced Configuration for Beautiful Snow Effects
    const CONFIG = {
        fixLineNumbers: true,
        enhanceHovers: true,
        smoothTransitions: true,
        particleEffects: true,
        particleCount: 40, // Snow particles
        backgroundEffects: true,
        auroraEffects: true,
        rainbowText: true,
        debugMode: true, // Enable debug mode to track hover issues
        hoverDebug: true // Specific hover debugging
    };

    // Main Theme Controller
    class NeonAnimeThemeEnhanced {
        constructor() {
            this.particles = [];
            this.init();
        }

        init() {
            console.log('🌟 Neon Anime Theme Enhanced Initializing...');

            // Wait for VS Code to fully load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                setTimeout(() => this.start(), 1000);
            }
        }

        start() {
            // Debug logging first
            if (CONFIG.debugMode) {
                this.addHoverDebugLogging();
            }

            // Essential enhancements
            this.fixLineNumberGlow();
            // DISABLED: Hover functions to prevent CSS conflicts
            // this.enhanceHoverVisibility();
            this.addSmoothTransitions();
            this.fixExtensionPanel();

            // NEW: Enhanced Account & Settings Popup Management
            this.enhanceAccountSettingsPopups();

            // NEW: Advanced file tree optimization
            this.addFileTreeOptimization();

            // DISABLED: Popup/hover functions to prevent CSS conflicts
            // this.addAdvancedHoverManagement();
            // this.fixSuggestionWidgets();
            this.addMouseEventFixes();

            console.log('🚫 Hover/popup JavaScript functions disabled to prevent CSS conflicts');

            // Anime-style enhancements
            this.addAnimeBackgroundEffects();
            this.addAnimeTextEffects();

            // Particle effects
            if (CONFIG.particleEffects) {
                this.createParticleContainer();
                this.generateParticles();
            }

            // Monitor for changes
            this.observeChanges();

            console.log('✅ Neon Anime Theme Enhanced - All systems ready with comprehensive popup fixes!');
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
                'radial-gradient(circle, rgba(46, 48, 97, 0.8) 0%, rgba(85, 81, 132, 0.6) 50%, rgba(153, 151, 188, 0.3) 100%)', // Deep Blue Purple
                'radial-gradient(circle, rgba(85, 81, 132, 0.7) 0%, rgba(153, 151, 188, 0.5) 50%, rgba(178, 166, 190, 0.3) 100%)', // Medium Purple
                'radial-gradient(circle, rgba(153, 151, 188, 0.6) 0%, rgba(178, 166, 190, 0.4) 50%, rgba(254, 233, 206, 0.2) 100%)', // Lavender Light
                'radial-gradient(circle, rgba(178, 166, 190, 0.5) 0%, rgba(254, 233, 206, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)', // Lavender Pale
                'radial-gradient(circle, rgba(254, 233, 206, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(46, 48, 97, 0.1) 100%)', // Warm Cream
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
                    box-shadow: 0 0 ${size * 2}px rgba(46, 48, 97, 0.3);
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
        // Fix line number glow effect
        fixLineNumberGlow() {
            if (!CONFIG.fixLineNumbers) return;

            this.applyLineNumberFix();

            const observer = new MutationObserver(() => {
                this.applyLineNumberFix();
            });

            const editorContainer = document.querySelector('.monaco-editor');
            if (editorContainer) {
                observer.observe(editorContainer, {
                    childList: true,
                    subtree: true
                });
            }
        }

        applyLineNumberFix() {
            const lineNumbers = document.querySelectorAll('.line-numbers');
            lineNumbers.forEach(lineNumber => {
                if (!lineNumber.dataset.glowFixed) {
                    lineNumber.dataset.glowFixed = 'true';
                    lineNumber.style.transition = 'all 0.2s ease';
                }
            });
        }

        // Enhanced hover visibility - DISABLED TO PREVENT CONFLICTS
        enhanceHoverVisibility() {
            // DISABLED: This function was causing conflicts with CSS popup styling
            console.log('🚫 Hover enhancement disabled to prevent CSS conflicts');
            return;

            if (!CONFIG.enhanceHovers) return;

            const style = document.createElement('style');
            style.id = 'enhanced-hover-visibility';
            style.textContent = `
                /* Primary hover elements - PERFECT PALETTE COLORS */
                .monaco-hover,
                .monaco-editor-hover,
                .monaco-hover-content {
                    background: linear-gradient(145deg, #1a1b2e 0%, #28293D 100%) !important;
                    backdrop-filter: none !important;
                    border: 2px solid #2E3061 !important;
                    border-radius: 8px !important;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(46, 48, 97, 0.4) !important;
                    z-index: 999999 !important;
                    pointer-events: auto !important;
                    position: absolute !important;
                    color: #ffffff !important;
                }

                /* Nested hover elements - PERFECT STACKING */
                .monaco-hover .monaco-hover,
                .monaco-editor-hover .monaco-hover,
                .monaco-hover-content .monaco-hover {
                    z-index: 999999 !important;
                    position: absolute !important;
                    left: 100% !important;
                    top: 0 !important;
                    margin-left: 5px !important;
                    background: linear-gradient(145deg, #28293D 0%, #2E3061 100%) !important;
                    border: 1px solid #555184 !important;
                }

                /* Context menus in hovers - PERFECT COLORS */
                .monaco-hover .monaco-menu,
                .monaco-editor-hover .monaco-menu {
                    z-index: 999999 !important;
                    pointer-events: auto !important;
                    position: absolute !important;
                    background: linear-gradient(145deg, #1a1b2e 0%, #28293D 100%) !important;
                    border: 2px solid #2E3061 !important;
                    backdrop-filter: none !important;
                }

                /* Hover timing fixes */
                .monaco-hover:hover,
                .monaco-editor-hover:hover {
                    opacity: 1 !important;
                    visibility: visible !important;
                }

                /* Prevent hover conflicts */
                .monaco-hover *,
                .monaco-editor-hover * {
                    pointer-events: auto !important;
                }
            `;

            // Remove existing style if present
            const existingStyle = document.getElementById('enhanced-hover-visibility');
            if (existingStyle) existingStyle.remove();

            document.head.appendChild(style);
        }

        // Smooth transitions
        addSmoothTransitions() {
            if (!CONFIG.smoothTransitions) return;

            const style = document.createElement('style');
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

        // Fix extension panel items
        fixExtensionPanel() {
            this.fixExtensionItems();

            const observer = new MutationObserver(() => {
                this.fixExtensionItems();
            });

            const extensionsPanel = document.querySelector('.extensions-viewlet');
            if (extensionsPanel) {
                observer.observe(extensionsPanel, {
                    childList: true,
                    subtree: true
                });
            }
        }

        fixExtensionItems() {
            const extensionItems = document.querySelectorAll('.extension-list-item');
            extensionItems.forEach(item => {
                if (!item.dataset.enhanceFixed) {
                    item.dataset.enhanceFixed = 'true';

                    const icon = item.querySelector('.extension-icon');
                    if (icon) {
                        icon.style.borderRadius = '6px';
                        icon.style.filter = 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.3))';
                    }
                }
            });
        }

        // Enhanced Account & Settings Popup Management
        enhanceAccountSettingsPopups() {
            // Target account button specifically
            const accountButton = document.querySelector('.part.activitybar .action-item[aria-label="Accounts"] .action-label');
            if (accountButton && !accountButton.dataset.enhanced) {
                accountButton.dataset.enhanced = 'true';

                // Add enhanced interaction
                accountButton.addEventListener('click', (e) => {
                    this.handleAccountPopup(e);
                });

                accountButton.addEventListener('mouseenter', () => {
                    accountButton.style.transform = 'translateY(-2px) scale(1.05)';
                });

                accountButton.addEventListener('mouseleave', () => {
                    accountButton.style.transform = 'translateY(0) scale(1)';
                });
            }

            // Target settings/manage button specifically
            const settingsButton = document.querySelector('.part.activitybar .action-item[aria-label="Manage"] .action-label');
            if (settingsButton && !settingsButton.dataset.enhanced) {
                settingsButton.dataset.enhanced = 'true';

                // Add enhanced interaction
                settingsButton.addEventListener('click', (e) => {
                    this.handleSettingsPopup(e);
                });

                settingsButton.addEventListener('mouseenter', () => {
                    settingsButton.style.transform = 'translateY(-2px) scale(1.05)';
                });

                settingsButton.addEventListener('mouseleave', () => {
                    settingsButton.style.transform = 'translateY(0) scale(1)';
                });
            }

            // Enhance dropdown menus when they appear
            this.observeDropdownMenus();
        }

        handleAccountPopup(event) {
            // Add visual feedback
            const button = event.target;
            button.style.background = 'linear-gradient(135deg, var(--medium-purple), var(--deep-blue-purple))';
            button.style.borderColor = 'var(--cream-warm)';
            button.style.color = 'var(--cream-warm)';

            // Reset after dropdown appears
            setTimeout(() => {
                button.style.background = '';
                button.style.borderColor = '';
                button.style.color = '';
            }, 300);
        }

        handleSettingsPopup(event) {
            // Add visual feedback
            const button = event.target;
            button.style.background = 'linear-gradient(135deg, var(--deep-blue-purple), var(--medium-purple))';
            button.style.borderColor = 'var(--cream-warm)';
            button.style.color = 'var(--cream-warm)';

            // Reset after dropdown appears
            setTimeout(() => {
                button.style.background = '';
                button.style.borderColor = '';
                button.style.color = '';
            }, 300);
        }

        observeDropdownMenus() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check for monaco menu elements
                            if (node.classList && node.classList.contains('monaco-menu')) {
                                this.enhanceDropdownMenu(node);
                            }

                            // Check for context view elements
                            if (node.classList && node.classList.contains('context-view')) {
                                this.enhanceContextMenu(node);
                            }
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        enhanceDropdownMenu(menuElement) {
            if (menuElement.dataset.enhanced) return;
            menuElement.dataset.enhanced = 'true';

            // Add slide-in animation
            menuElement.style.animation = 'accountSettingsSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            // Enhance menu items
            const menuItems = menuElement.querySelectorAll('.action-label');
            menuItems.forEach(item => {
                if (!item.dataset.enhanced) {
                    item.dataset.enhanced = 'true';

                    item.addEventListener('mouseenter', () => {
                        item.style.transform = 'translateX(2px)';
                    });

                    item.addEventListener('mouseleave', () => {
                        item.style.transform = 'translateX(0)';
                    });
                }
            });
        }

        enhanceContextMenu(contextElement) {
            if (contextElement.dataset.enhanced) return;
            contextElement.dataset.enhanced = 'true';

            // Find monaco menu within context view
            const monacoMenu = contextElement.querySelector('.monaco-menu');
            if (monacoMenu) {
                this.enhanceDropdownMenu(monacoMenu);
            }
        }

        // Add spectacular anime-style dynamic background effects
        addAnimeBackgroundEffects() {
            // Create animated background waves with rainbow colors
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

            // Create multiple wave layers with professional palette colors
            const waveColors = [
                'linear-gradient(90deg, transparent 0%, rgba(46, 48, 97, 0.15) 25%, rgba(85, 81, 132, 0.12) 50%, rgba(153, 151, 188, 0.08) 75%, transparent 100%)', // Deep Blue Purple
                'linear-gradient(90deg, transparent 0%, rgba(85, 81, 132, 0.12) 25%, rgba(153, 151, 188, 0.10) 50%, rgba(178, 166, 190, 0.06) 75%, transparent 100%)', // Medium Purple
                'linear-gradient(90deg, transparent 0%, rgba(153, 151, 188, 0.10) 25%, rgba(178, 166, 190, 0.08) 50%, rgba(254, 233, 206, 0.05) 75%, transparent 100%)' // Lavender to Cream
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
                        rgba(46, 48, 97, 0.1) 0%,         /* Deep Blue Purple */
                        rgba(85, 81, 132, 0.08) 25%,      /* Medium Purple */
                        rgba(153, 151, 188, 0.06) 50%,    /* Lavender Light */
                        rgba(178, 166, 190, 0.08) 75%,    /* Lavender Pale */
                        rgba(254, 233, 206, 0.1) 100%);   /* Warm Cream */
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

                    .anime-aurora-band {
                        animation: auroraFlow var(--aurora-duration, 20s) ease-in-out infinite;
                        --aurora-rotation: calc(var(--i, 0) * 15deg - 30deg);
                        --aurora-duration: calc(20s + var(--i, 0) * 5s);
                    }
                `;
                document.head.appendChild(waveStyle);
            }
        }

        // Add anime-style rainbow text effects for specific elements
        addAnimeTextEffects() {
            const style = document.createElement('style');
            style.id = 'anime-text-effects';
            style.textContent = `
                /* Anime rainbow text effect for special elements */
                .anime-rainbow-text {
                    background: var(--neon-gradient-rainbow);
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

                /* Anime typing effect */
                .anime-typing {
                    border-right: 2px solid var(--neon-blue);
                    animation: animeTypingCursor 1s infinite;
                }

                @keyframes animeTypingCursor {
                    0%, 50% {
                        border-color: var(--neon-blue);
                    }
                    51%, 100% {
                        border-color: transparent;
                    }
                }

                /* Anime glow pulse for interactive elements */
                .anime-glow-pulse {
                    animation: animeGlowPulse 2s ease-in-out infinite;
                }

                @keyframes animeGlowPulse {
                    0%, 100% {
                        box-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(0, 212, 255, 0.8),
                                    0 0 30px rgba(179, 102, 255, 0.6),
                                    0 0 40px rgba(255, 102, 212, 0.4);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Enhanced file tree indentation fix with dynamic monitoring
        addFileTreeOptimization() {
            // DISABLED TO PREVENT CSS CONFLICTS - Let pure CSS handle file tree positioning
            console.log('🌲 File tree optimization disabled to preserve original VS Code positioning');
            return;

            console.log('🌲 Optimizing file tree indentation...');

            // Create ultra-minimal indentation system
            const createMinimalIndentationCSS = () => {
                const existingStyle = document.getElementById('minimal-file-tree-indent');
                if (existingStyle) existingStyle.remove();

                const style = document.createElement('style');
                style.id = 'minimal-file-tree-indent';
                style.textContent = `
                    /* ULTRA-MINIMAL FILE TREE INDENTATION - GENIUS LEVEL */
                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row {
                        padding-left: 2px !important;
                        margin-left: 0px !important;
                    }

                    /* Drastically reduce indentation guides */
                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row .monaco-tl-indent {
                        width: 4px !important;
                        min-width: 4px !important;
                        max-width: 4px !important;
                    }

                    /* Ultra-compact twisty arrows */
                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row .monaco-tl-twistie {
                        width: 10px !important;
                        min-width: 10px !important;
                        margin-right: 1px !important;
                        padding: 0px !important;
                    }

                    /* Zero padding for contents */
                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row .monaco-tl-contents {
                        padding-left: 0px !important;
                        margin-left: 0px !important;
                    }

                    /* FORCE MINIMAL INDENTATION BY LEVEL - SURGICAL PRECISION */
                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row[aria-level="1"] {
                        padding-left: 1px !important;
                    }

                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row[aria-level="2"] {
                        padding-left: 5px !important;
                    }

                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row[aria-level="3"] {
                        padding-left: 9px !important;
                    }

                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row[aria-level="4"] {
                        padding-left: 13px !important;
                    }

                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row[aria-level="5"] {
                        padding-left: 17px !important;
                    }

                    /* File icons super close to text */
                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row .file-icon {
                        margin-right: 3px !important;
                        margin-left: 0px !important;
                    }

                    /* Explorer specific targeting */
                    .monaco-workbench .part.sidebar .composite.explorer .monaco-list .monaco-list-row {
                        padding-left: 1px !important;
                    }

                    /* NUCLEAR APPROACH - Override any possible VS Code defaults */
                    .monaco-tree-row {
                        padding-left: 2px !important;
                    }

                    .monaco-tl-row {
                        padding-left: 0px !important;
                    }

                    /* Force compact tree structure */
                    .monaco-workbench .part.sidebar .monaco-tree {
                        padding-left: 0px !important;
                        margin-left: 0px !important;
                    }

                    /* Override Explorer folder view padding */
                    .explorer-folders-view .monaco-list-rows {
                        padding-left: 0px !important;
                    }

                    /* Remove any extra spacing from labels */
                    .monaco-workbench .part.sidebar .label-name {
                        margin-left: 0px !important;
                        padding-left: 0px !important;
                    }

                    /* Dynamic width adjustment for tree indent */
                    .monaco-list .monaco-list-row .monaco-tl-indent {
                        --indent-size: 4px;
                        width: var(--indent-size) !important;
                        min-width: var(--indent-size) !important;
                    }

                    /* Perfect alignment for file tree items */
                    .monaco-workbench .part.sidebar .monaco-list .monaco-list-row .monaco-tl-contents .monaco-highlighted-label {
                        margin-left: 0px !important;
                    }
                `;
                document.head.appendChild(style);
                console.log('✅ Minimal file tree CSS applied');
            };

            // Apply CSS immediately
            createMinimalIndentationCSS();

            // Dynamic monitoring and adjustment
            const optimizeFileTreeElements = () => {
                // Target all file tree rows
                const fileTreeRows = document.querySelectorAll('.monaco-workbench .part.sidebar .monaco-list .monaco-list-row');

                fileTreeRows.forEach((row, index) => {
                    if (!row.dataset.indentFixed) {
                        row.dataset.indentFixed = 'true';

                        // Get the aria-level for precise indentation
                        const level = parseInt(row.getAttribute('aria-level') || '1');
                        const minimalPadding = Math.max(1, (level - 1) * 4 + 1);

                        // Force minimal padding
                        row.style.paddingLeft = `${minimalPadding}px`;
                        row.style.marginLeft = '0px';

                        // Optimize child elements
                        const indent = row.querySelector('.monaco-tl-indent');
                        if (indent) {
                            indent.style.width = '4px';
                            indent.style.minWidth = '4px';
                        }

                        const twistie = row.querySelector('.monaco-tl-twistie');
                        if (twistie) {
                            twistie.style.width = '10px';
                            twistie.style.marginRight = '1px';
                        }

                        const contents = row.querySelector('.monaco-tl-contents');
                        if (contents) {
                            contents.style.paddingLeft = '0px';
                            contents.style.marginLeft = '0px';
                        }

                        const fileIcon = row.querySelector('.file-icon');
                        if (fileIcon) {
                            fileIcon.style.marginRight = '3px';
                            fileIcon.style.marginLeft = '0px';
                        }
                    }
                });

                // Also fix extension panel hover backgrounds
                this.forceRemoveExtensionHoverBackgrounds();
            };

            // Immediate optimization
            optimizeFileTreeElements();

            // Continuous monitoring with MutationObserver
            const treeObserver = new MutationObserver((mutations) => {
                let shouldOptimize = false;

                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1 && (
                                node.classList?.contains('monaco-list-row') ||
                                node.querySelector?.('.monaco-list-row')
                            )) {
                                shouldOptimize = true;
                            }
                        });
                    }
                });

                if (shouldOptimize) {
                    setTimeout(optimizeFileTreeElements, 50);
                }
            });

            // Observe the sidebar for changes
            const sidebar = document.querySelector('.monaco-workbench .part.sidebar');
            if (sidebar) {
                treeObserver.observe(sidebar, {
                    childList: true,
                    subtree: true
                });
            }

            // Re-apply CSS when VS Code theme changes
            const themeObserver = new MutationObserver(() => {
                createMinimalIndentationCSS();
                setTimeout(optimizeFileTreeElements, 100);
            });

            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class', 'data-theme']
            });

            console.log('🎯 File tree optimization system activated');
        }

        // Force remove extension hover backgrounds with surgical precision
        forceRemoveExtensionHoverBackgrounds() {
            const createAntiHoverCSS = () => {
                const existingStyle = document.getElementById('anti-extension-hover');
                if (existingStyle) existingStyle.remove();

                const style = document.createElement('style');
                style.id = 'anti-extension-hover';
                style.textContent = `
                    /* NUCLEAR EXTENSION HOVER BACKGROUND ELIMINATION */
                    .monaco-workbench .extensions-viewlet .monaco-list .monaco-list-row:hover,
                    .monaco-workbench .extensions-viewlet .monaco-list .monaco-list-row:hover *,
                    .monaco-workbench .pane-body .extensions-viewlet .monaco-list-row:hover,
                    .monaco-workbench .pane-body .extensions-viewlet .monaco-list-row:hover *,
                    .extensions-list .monaco-list-row:hover,
                    .extensions-list .monaco-list-row:hover *,
                    .extension-list .monaco-list-row:hover,
                    .extension-list .monaco-list-row:hover *,
                    .monaco-list.list_id_2 .monaco-list-row:hover,
                    .monaco-list.list_id_3 .monaco-list-row:hover,
                    .monaco-list.list_id_4 .monaco-list-row:hover,
                    .monaco-list.list_id_5 .monaco-list-row:hover,
                    .monaco-list.list_id_6 .monaco-list-row:hover {
                        background: transparent !important;
                        background-color: transparent !important;
                        background-image: none !important;
                        --vscode-list-hoverBackground: transparent !important;
                        --vscode-list-activeSelectionBackground: transparent !important;
                        --vscode-list-inactiveSelectionBackground: transparent !important;
                        --vscode-list-focusBackground: transparent !important;
                    }

                    /* Only allow border glow effect */
                    .extensions-viewlet .extension-list-item:hover {
                        background: transparent !important;
                        background-color: transparent !important;
                        background-image: none !important;
                        transform: translateX(3px) !important;
                        box-shadow: 0 0 0 1px rgba(0, 212, 255, 0.3), 0 2px 8px rgba(0, 212, 255, 0.15) !important;
                        border-radius: 8px !important;
                    }
                `;
                document.head.appendChild(style);
            };

            createAntiHoverCSS();

            // Monitor extension items
            const extensionItems = document.querySelectorAll('.extension-list-item');
            extensionItems.forEach(item => {
                if (!item.dataset.hoverFixed) {
                    item.dataset.hoverFixed = 'true';

                    // Force remove any inline hover styles
                    item.addEventListener('mouseenter', () => {
                        item.style.background = 'transparent';
                        item.style.backgroundColor = 'transparent';
                        item.style.backgroundImage = 'none';

                        // Also fix child elements
                        const children = item.querySelectorAll('*');
                        children.forEach(child => {
                            child.style.background = 'transparent';
                            child.style.backgroundColor = 'transparent';
                            child.style.backgroundImage = 'none';
                        });
                    });
                }
            });
        }
        // Enhanced hover management - DISABLED TO PREVENT CONFLICTS
        addAdvancedHoverManagement() {
            // DISABLED: This function was causing conflicts with CSS popup styling
            console.log('🚫 Advanced hover management disabled to prevent CSS conflicts');
            return;

            // OPTIMIZED: Only enhance hover elements without disabling pointer events
            const hoverElements = document.querySelectorAll('.monaco-hover, .monaco-editor-hover');

            hoverElements.forEach(hover => {
                // Ensure hover elements always have pointer events enabled
                hover.style.pointerEvents = 'auto';
                hover.style.zIndex = '999999';

                hover.addEventListener('mouseenter', () => {
                    hover.style.pointerEvents = 'auto';
                    hover.style.visibility = 'visible';
                    hover.style.opacity = '1';
                });

                // REMOVED: mouseleave that sets pointerEvents to 'none' - this was causing popup issues
            });
        }

        // Fix suggestion widgets - DISABLED TO PREVENT CONFLICTS
        fixSuggestionWidgets() {
            // DISABLED: This function was causing conflicts with CSS popup styling
            console.log('🚫 Suggestion widget fixes disabled to prevent CSS conflicts');
            return;

            const style = document.createElement('style');
            style.id = 'suggestion-widget-fix';
            style.textContent = `
                /* Ensure suggestion widgets are always accessible - PERFECT COLORS */
                .editor-widget.suggest-widget,
                .editor-widget.parameter-hints-widget {
                    z-index: 999999 !important;
                    pointer-events: auto !important;
                    user-select: none !important;
                    background: linear-gradient(145deg, #1a1b2e 0%, #2E3061 100%) !important;
                    border: 2px solid #555184 !important;
                    backdrop-filter: none !important;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(46, 48, 97, 0.4) !important;
                }

                .suggest-widget .monaco-list,
                .parameter-hints-widget .monaco-list {
                    pointer-events: auto !important;
                    background: transparent !important;
                }

                .suggest-widget .monaco-list .monaco-list-row,
                .parameter-hints-widget .monaco-list .monaco-list-row {
                    pointer-events: auto !important;
                    cursor: pointer !important;
                    color: #f5f5f9 !important;
                    background: transparent !important;
                }

                .suggest-widget .monaco-list .monaco-list-row:hover,
                .parameter-hints-widget .monaco-list .monaco-list-row:hover {
                    background: linear-gradient(90deg, rgba(46, 48, 97, 0.15) 0%, rgba(85, 81, 132, 0.12) 100%) !important;
                    border-left: 4px solid #2E3061 !important;
                    color: #ffffff !important;
                }

                /* Fix for hover within suggestions - PERFECT STACKING */
                .suggest-widget .monaco-hover,
                .parameter-hints-widget .monaco-hover {
                    z-index: 999999 !important;
                    pointer-events: auto !important;
                    position: absolute !important;
                    transform: translateX(100%) !important;
                    margin-left: 5px !important;
                }

                /* Prevent backdrop interference */
                .suggest-widget::before,
                .parameter-hints-widget::before {
                    display: none !important;
                }
            `;

            const existingStyle = document.getElementById('suggestion-widget-fix');
            if (existingStyle) existingStyle.remove();
            document.head.appendChild(style);
        }

        // Mouse event handling fix for nested popups
        addMouseEventFixes() {
            // Fix mouse events for context menus and hovers
            document.addEventListener('mouseenter', (event) => {
                const target = event.target;

                // If target is a hover element, ensure it's properly visible
                if (target.closest('.monaco-hover, .monaco-editor-hover, .suggest-widget, .parameter-hints-widget')) {
                    const hoverElement = target.closest('.monaco-hover, .monaco-editor-hover, .suggest-widget, .parameter-hints-widget');
                    hoverElement.style.opacity = '1';
                    hoverElement.style.visibility = 'visible';
                    hoverElement.style.pointerEvents = 'auto';
                }

                // If target is in a context menu, ensure the menu is accessible
                if (target.closest('.monaco-menu')) {
                    const menuElement = target.closest('.monaco-menu');
                    menuElement.style.pointerEvents = 'auto';
                    menuElement.style.zIndex = '30000';
                }
            }, true);

            // Fix click events for menu items
            document.addEventListener('click', (event) => {
                const target = event.target;

                // Ensure menu items are clickable
                if (target.closest('.monaco-menu .action-item')) {
                    event.stopPropagation();
                    // Allow the click to proceed naturally
                }
            }, true);

            // Prevent event interference
            document.addEventListener('mouseleave', (event) => {
                const target = event.target;

                // Keep hover elements visible briefly to allow interaction with nested elements
                if (target.classList.contains('monaco-hover') || target.classList.contains('monaco-editor-hover')) {
                    setTimeout(() => {
                        if (!target.matches(':hover')) {
                            target.style.opacity = '';
                            target.style.visibility = '';
                        }
                    }, 300);
                }
            }, true);

            console.log('🖱️ Mouse event fixes applied');
        }

        // Observe VS Code changes with enhanced hover monitoring
        observeChanges() {
            const observer = new MutationObserver((mutations) => {
                let needsHoverFix = false;
                let needsParticleCheck = false;
                let needsFileTreeCheck = false;
                let needsAccountSettingsCheck = false;

                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1) { // Element node
                                // Check for hover elements
                                if (node.classList && (
                                    node.classList.contains('monaco-hover') ||
                                    node.classList.contains('monaco-editor-hover') ||
                                    node.classList.contains('suggest-widget') ||
                                    node.classList.contains('parameter-hints-widget') ||
                                    node.classList.contains('monaco-menu') ||
                                    node.classList.contains('context-view')
                                )) {
                                    needsHoverFix = true;
                                }

                                // Check for particle container
                                if (!document.getElementById('neon-particles') && CONFIG.particleEffects) {
                                    needsParticleCheck = true;
                                }

                                // Check for extension elements
                                if (node.classList && node.classList.contains('extensions-viewlet')) {
                                    setTimeout(() => this.fixExtensionItems(), 100);
                                }

                                // Check for activity bar account/settings elements
                                if (node.classList && (
                                    node.classList.contains('activitybar') ||
                                    (node.querySelector && node.querySelector('.part.activitybar'))
                                )) {
                                    needsAccountSettingsCheck = true;
                                }

                                // Check for file tree elements
                                if (node.classList && (
                                    node.classList.contains('monaco-list') ||
                                    node.classList.contains('monaco-tree') ||
                                    node.classList.contains('file-icon')
                                )) {
                                    needsFileTreeCheck = true;
                                }
                            }
                        });
                    }
                });

                // Apply fixes with appropriate delays
                if (needsHoverFix) {
                    setTimeout(() => {
                        this.addAdvancedHoverManagement();
                        this.fixSuggestionWidgets();
                    }, 50);
                }

                if (needsParticleCheck) {
                    this.createParticleContainer();
                    this.generateParticles();
                }

                if (needsFileTreeCheck) {
                    setTimeout(() => this.addFileTreeOptimization(), 100);
                }

                if (needsAccountSettingsCheck) {
                    setTimeout(() => this.enhanceAccountSettingsPopups(), 100);
                }

                // Always ensure line numbers are fixed
                this.applyLineNumberFix();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });

            // Additional observer specifically for file tree changes
            const fileTreeObserver = new MutationObserver(() => {
                this.addFileTreeOptimization();
            });

            // Watch for file tree container
            const checkFileTree = setInterval(() => {
                const fileTreeContainer = document.querySelector('.monaco-workbench .part.sidebar .composite.explorer');
                if (fileTreeContainer) {
                    fileTreeObserver.observe(fileTreeContainer, {
                        childList: true,
                        subtree: true,
                        attributes: true
                    });
                    clearInterval(checkFileTree);
                }
            }, 1000);

            // Periodic hover maintenance
            setInterval(() => {
                this.addAdvancedHoverManagement();
            }, 5000);
        }

        // Debug logging for hover issues
        addHoverDebugLogging() {
            if (!CONFIG.hoverDebug) return;

            // Monitor hover element creation
            const originalCreateElement = document.createElement;
            document.createElement = function(tagName) {
                const element = originalCreateElement.call(this, tagName);

                if (tagName.toLowerCase() === 'div') {
                    // Watch for hover-related classes being added
                    const observer = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                                const classList = element.classList;
                                if (classList.contains('monaco-hover') ||
                                    classList.contains('monaco-editor-hover') ||
                                    classList.contains('suggest-widget') ||
                                    classList.contains('monaco-menu')) {
                                    console.log('🐛 Hover element created:', element.className, element);

                                    // Auto-fix the element
                                    setTimeout(() => {
                                        element.style.zIndex = '15000';
                                        element.style.pointerEvents = 'auto';
                                        element.style.position = element.style.position || 'fixed';
                                        console.log('🔧 Auto-fixed hover element:', element);
                                    }, 10);
                                }
                            }
                        });
                    });

                    observer.observe(element, { attributes: true });
                }

                return element;
            };

            // Monitor mouse events on hover elements
            document.addEventListener('mouseenter', (event) => {
                const target = event.target;
                if (target.closest('.monaco-hover, .monaco-editor-hover, .suggest-widget, .monaco-menu')) {
                    console.log('🖱️ Mouse entered hover element:', target, {
                        zIndex: getComputedStyle(target).zIndex,
                        pointerEvents: getComputedStyle(target).pointerEvents,
                        position: getComputedStyle(target).position
                    });
                }
            }, true);

            console.log('🐛 Hover debug logging enabled');
        }
    }

    // Initialize the theme
    const theme = new NeonAnimeThemeEnhanced();

    // Debug logging
    if (CONFIG.debugMode) {
        console.log('🔍 Neon Anime Theme Debug Mode Active');
        window.neonTheme = theme;
    }

})();

// Auto-inject CSS if not already present
(function() {
    const cssId = 'neon-anime-theme-css';
    if (!document.getElementById(cssId)) {
        console.log('📋 Auto-injecting Neon Anime Theme CSS...');

        // Try to detect the correct path - adjust this to your actual CSS file location
        const possiblePaths = [
            'custom-vscode.css',
            'file:///C:/VSCode-Theme/custom-vscode.css',
            './custom-vscode.css'
        ];

        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = possiblePaths[0]; // Use first path as default

        link.onerror = function() {
            console.warn('Failed to load CSS from:', link.href);
            // Try next path
            for (let i = 1; i < possiblePaths.length; i++) {
                if (link.href !== possiblePaths[i]) {
                    link.href = possiblePaths[i];
                    break;
                }
            }
        };

        link.onload = function() {
            console.log('✅ Neon Anime Theme CSS loaded successfully!');
        };

        document.head.appendChild(link);
    }
})();

/* ========================================
   COMMAND PALETTE BLUR EFFECT SUPPORT
   ======================================== */

// Original command palette functionality from the refactored theme
(function() {
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
            console.log("Command dialog not found yet. Retrying...");
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
})();

/* ========================================
   END COMMAND PALETTE BLUR EFFECT SUPPORT
   ======================================== */
