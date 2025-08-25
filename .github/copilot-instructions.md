# VS Code Theme Customization Project

## Architecture Overview

This project implements a comprehensive VS Code theme with dual-layer customization:
- `custom-vscode.css`: CSS-only styling using VS Code's Monaco Editor DOM structure
- `vscode-script.js`: JavaScript enhancements for dynamic effects and interaction fixes

## Critical Design Patterns

### Color Palette System
All colors MUST use the defined CSS custom properties from `:root` in `custom-vscode.css`:
```css
--deep-blue-purple: #2E3061    /* Primary accent */
--dark-navy: #28293D           /* Background surfaces */
--medium-purple: #555184       /* Secondary accent */
--lavender-light: #9997BC      /* Soft highlights */
--lavender-pale: #B2A6BE       /* Subtle elements */
--cream-warm: #FEE9CE          /* Attention/Warning */
```
Never use hardcoded hex values - always reference these variables.

### Popup/Hover Functionality Rules
**CRITICAL**: This project has specific popup rendering issues that require strict adherence to these patterns:

1. **Always disable `backdrop-filter`**: Use `backdrop-filter: none !important;` for all popup elements
2. **Use absolute positioning**: Never use `position: fixed` for popups - use `position: absolute !important`
3. **Standardize z-index**: All popup elements use `z-index: 999999 !important` for consistent stacking
4. **Enable pointer events**: Always set `pointer-events: auto !important` on interactive popup elements

### CSS-JavaScript Conflict Resolution
JavaScript hover/popup functions are **intentionally disabled** to prevent conflicts:
```javascript
// DISABLED: Hover functions to prevent CSS conflicts
// this.enhanceHoverVisibility();
// this.addAdvancedHoverManagement();
```
When making changes:
- Prefer CSS-only solutions over JavaScript for styling
- If JavaScript is needed, ensure it doesn't override CSS popup positioning
- Look for `DISABLED TO PREVENT CONFLICTS` comments before re-enabling functions

### Monaco Editor Targeting
Target VS Code's Monaco Editor elements using these specific selectors:
```css
.monaco-hover, .monaco-editor-hover     /* Hover tooltips */
.monaco-menu                            /* Context menus */
.suggest-widget                         /* Code suggestions */
.monaco-workbench .part.sidebar         /* File explorer */
.monaco-list-row                        /* List items */
```

## Development Workflow

### Testing Popup Functionality
When modifying popup/hover styles:
1. Test hover tooltips in the editor
2. Test right-click context menus
3. Test IntelliSense suggestions
4. Test command palette (Ctrl+Shift+P)
5. Verify no elements are positioned behind others

### Color Consistency Checks
```bash
# Search for hardcoded colors that should use variables
grep -r "rgba([0-9]" *.css
grep -r "#[0-9A-Fa-f]{6}" *.css
```

### Backup Strategy
The project maintains backup files:
- `custom-vscode-backup.css`
- `vscode-script-backup.js`

Always create backups before major changes to prevent loss of working configurations.

## Common Pitfalls

1. **Backdrop-filter conflicts**: Adding `backdrop-filter: blur()` breaks popup rendering
3. **Z-index wars**: Using inconsistent z-index values causes popup stacking issues
3. **Position fixed problems**: VS Code's popup system conflicts with fixed positioning
4. **Color inconsistency**: Mixing hardcoded colors with CSS variables breaks the design system
5. **JavaScript conflicts**: Enabling disabled JavaScript functions can override CSS fixes

## File Structure
- `custom-vscode.css` (2168 lines): Complete theme styling
- `vscode-script.js` (1358 lines): Dynamic effects and interaction fixes
- Backup files for safety
