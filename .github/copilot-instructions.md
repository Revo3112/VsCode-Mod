# VS Code Theme Customization Project

## Architecture Overview

This project implements a comprehensive VS Code theme with dual-layer customization:
- `custom-vscode.css` (816 lines): Complete theme styling using Monaco Editor DOM targeting
- `vscode-script.js` (1512 lines): JavaScript enhancements for command palette blur effects and dynamic features
- Documentation files: `THEME_MAINTENANCE_GUIDE.md`, `architecture-fixes-summary.md` for historical context

## Critical Design Patterns

### Updated Color Palette System
**EVOLVED SYSTEM**: The project now uses a professional dual-palette approach in `custom-vscode.css`:
```css
/* Modern Professional Colors */
--lightest: #FFFFFF           /* Pure white - Primary text */
--light-gray: #B8BCC8        /* Cool light gray - Secondary text */
--medium-gray: #6C7293       /* Balanced gray-blue - Borders */
--dark-gray: #212631         /* Black-90 - Secondary backgrounds */
--darkest: #0A0E15          /* Black-100 - Primary background */
--accent: #4A90E2           /* Professional blue - Active states */

/* Legacy Compatibility */
--deep-blue-purple: #4A90E2  /* Maps to modern accent */
--dark-navy: #0A0E15        /* Maps to darkest */
```
**CRITICAL**: Use new variables for new code, legacy variables maintained for compatibility.

### File Explorer Indentation System
**MATHEMATICAL PRECISION**: Based on analysis of `html_vscode_pure.txt`, VS Code uses a specific indentation formula:
```css
/* VS CODE AUTHENTIC INDENTATION - Mathematical Formula: 8px + (35px × level) */
.monaco-list.list_id_1 .monaco-list-row[aria-level="1"] {
    padding-left: 8px !important;    /* Base level */
}
.monaco-list.list_id_1 .monaco-list-row[aria-level="2"] {
    padding-left: 43px !important;   /* 8 + (35 × 1) */
}
.monaco-list.list_id_1 .monaco-list-row[aria-level="3"] {
    padding-left: 78px !important;   /* 8 + (35 × 2) */
}
```
**CRITICAL**: Never use `padding: initial !important` or `revert` - it breaks indentation completely.

### JavaScript-CSS Conflict Resolution
**DISABLED FUNCTIONS**: Key JavaScript functions are intentionally disabled to prevent conflicts:
```javascript
// DISABLED TO PREVENT CSS CONFLICTS - Let pure CSS handle file tree positioning
addFileTreeOptimization() {
    console.log('🌲 File tree optimization disabled to preserve original VS Code positioning');
    return; // Early return prevents execution
}
```
**ACTIVE FEATURES**: Only command palette blur effects remain enabled in JavaScript.

### Popup Styling Strategy
**COMPLETE REMOVAL POLICY**: All custom popup styling has been systematically removed per `THEME_MAINTENANCE_GUIDE.md`:
- ❌ Never style `.quick-input-widget`, `.monaco-menu`, `.suggest-widget`, `.context-view`
- ❌ Never use `backdrop-filter: blur()`, `position: fixed`, custom z-index on popups
- ✅ Let VS Code handle all popup rendering natively

## File Structure & Workflow

### Primary Files
- `custom-vscode.css`: Main styling (Lines 1-500: variables, 500-816: file explorer & UI)
- `vscode-script.js`: Command palette blur effects only
- `custom-vscode-pure.css`: Legacy backup with old color scheme
- `vscode-script-pure.js`: Legacy backup without disabled functions

### Documentation Architecture
- `THEME_MAINTENANCE_GUIDE.md`: Complete architectural decisions and forbidden patterns
- `architecture-fixes-summary.md`: Historical issue resolution and user request compliance
- `hyper-thinking-complete-fix.md`: Deep analysis methodology documentation

## Development Patterns

### Typography System
**FONT HIERARCHY**: Professional typography using specific font families:
```css
/* Code Elements */
.mtk3 { font-family: 'Monaspace Radon', monospace !important; } /* Comments */
.monaco-list .label-name { font-family: 'Geist Mono', monospace !important; } /* File names */

/* UI Elements */
.composite.title h2 {
    font-size: 12px !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
}
```

### Gradient System Usage
**PREDEFINED GRADIENTS**: Always use CSS custom properties for consistent visual effects:
```css
background: var(--gradient-primary) !important;   /* 135deg, darkest → dark-gray */
background: var(--gradient-accent) !important;    /* 135deg, accent → dark-gray */
background: var(--gradient-subtle) !important;    /* 180deg, dark-gray → darkest */
```

### Testing Checklist for Changes
When modifying file explorer or UI elements:
1. **Indentation Test**: Verify nested folders maintain 35px spacing increments
2. **Color Consistency**: All elements use CSS variables, no hardcoded colors
3. **Hover States**: Background changes work without affecting positioning
4. **Command Palette**: Ctrl+Shift+P blur effect functions correctly
5. **Typography**: Font families render correctly across all elements

## Critical Constraints

### Never Modify These Patterns
- File explorer indentation mathematical formula (breaks folder navigation)
- JavaScript command palette observer (breaks blur effects)
- Legacy color variable mappings (breaks compatibility)
- Popup styling removal policy (causes visual artifacts)

### Safe Modification Areas
- Background gradients and colors (non-popup elements)
- Typography styling (fonts, weights, sizes)
- Editor enhancements (line numbers, current line highlights)
- Activity bar and status bar styling
