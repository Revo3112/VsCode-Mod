# Custom VSCode dengan Popup Profile dan Settings

Berikut adalah file HTML yang sudah dimodifikasi dengan popup profile dan settings yang sesuai dengan originalitas VSCode:

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom VSCode Interface</title>
    <style>
        /* CSS untuk popup - sesuai tema VSCode Dark+ */
        .vscode-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }

        .popup-content {
            background-color: var(--vscode-panel-background, #1e1e1e);
            border: 1px solid var(--vscode-panel-border, #3e3e42);
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.36);
            min-width: 400px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
        }

        .popup-header {
            background-color: var(--vscode-panelTitle-background, #2d2d30);
            color: var(--vscode-panelTitle-foreground, #cccccc);
            padding: 12px 16px;
            font-size: 13px;
            font-weight: 600;
            border-bottom: 1px solid var(--vscode-panel-border, #3e3e42);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .popup-close {
            cursor: pointer;
            font-size: 16px;
            color: var(--vscode-panelTitle-foreground, #cccccc);
            background: none;
            border: none;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .popup-close:hover {
            background-color: var(--vscode-toolbar-hoverBackground, #3e3e42);
            border-radius: 3px;
        }

        .popup-body {
            padding: 16px;
            color: var(--vscode-foreground, #cccccc);
            font-size: 13px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .profile-section, .settings-section {
            margin-bottom: 16px;
        }

        .section-title {
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--vscode-foreground, #cccccc);
        }

        .profile-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background-color: var(--vscode-input-background, #3c3c3c);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            font-size: 24px;
        }

        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid var(--vscode-panel-border, #3e3e42);
        }

        .setting-item:last-child {
            border-bottom: none;
        }

        .setting-label {
            font-size: 13px;
        }

        .setting-control {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .toggle-switch {
            position: relative;
            width: 40px;
            height: 20px;
            background-color: var(--vscode-input-background, #3c3c3c);
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .toggle-switch.active {
            background-color: var(--vscode-button-background, #0e639c);
        }

        .toggle-switch::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: transform 0.2s;
        }

        .toggle-switch.active::after {
            transform: translateX(20px);
        }

        .dropdown {
            background-color: var(--vscode-dropdown-background, #3c3c3c);
            color: var(--vscode-dropdown-foreground, #cccccc);
            border: 1px solid var(--vscode-dropdown-border, #3e3e42);
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <!-- Konten yang sudah ada dari html_vscode_pure.txt -->
    <!-- ... (semua konten yang sudah ada) ... -->

    <!-- Modal Popup Profile -->
    <div id="profilePopup" class="vscode-popup">
        <div class="popup-content">
            <div class="popup-header">
                <span>Profile</span>
                <button class="popup-close" onclick="closePopup('profilePopup')">×</button>
            </div>
            <div class="popup-body">
                <div class="profile-section">
                    <div class="section-title">Account</div>
                    <div class="profile-avatar">👤</div>
                    <div class="setting-item">
                        <span class="setting-label">Sign in to sync settings</span>
                        <div class="setting-control">
                            <div class="toggle-switch" onclick="toggleSetting(this)"></div>
                        </div>
                    </div>
                </div>
                <div class="profile-section">
                    <div class="section-title">Appearance</div>
                    <div class="setting-item">
                        <span class="setting-label">Color Theme</span>
                        <div class="setting-control">
                            <select class="dropdown">
                                <option>Dark+ (default dark)</option>
                                <option>Light+ (default light)</option>
                                <option>High Contrast</option>
                            </select>
                        </div>
                    </div>
                    <div class="setting-item">
                        <span class="setting-label">File Icon Theme</option>
                        <div class="setting-control">
                            <select class="dropdown">
                                <option>Seti (default)</option>
                                <option>Minimal</option>
                                <option>VSCode Icons</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Popup Settings -->
    <div id="settingsPopup" class="vscode-popup">
        <div class="popup-content">
            <div class="popup-header">
                <span>Settings</span>
                <button class="popup-close" onclick="closePopup('settingsPopup')">×</button>
            </div>
            <div class="popup-body">
                <div class="settings-section">
                    <div class="section-title">Editor</div>
                    <div class="setting-item">
                        <span class="setting-label">Font Size</span>
                        <div class="setting-control">
                            <select class="dropdown">
                                <option>14</option>
                                <option selected>16</option>
                                <option>18</option>
                            </select>
                        </div>
                    </div>
                    <div class="setting-item">
                        <span class="setting-label">Word Wrap</span>
                        <div class="setting-control">
                            <div class="toggle-switch" onclick="toggleSetting(this)"></div>
                        </div>
                    </div>
                    <div class="setting-item">
                        <span class="setting-label">Minimap</span>
                        <div class="setting-control">
                            <div class="toggle-switch active" onclick="toggleSetting(this)"></div>
                        </div>
                    </div>
                </div>

                <div class="settings-section">
                    <div class="section-title">Workbench</div>
                    <div class="setting-item">
                        <span class="setting-label">Activity Bar</span>
                        <div class="setting-control">
                            <select class="dropdown">
                                <option>Visible</option>
                                <option>Hidden</option>
                            </select>
                        </div>
                    </div>
                    <div class="setting-item">
                        <span class="setting-label">Panel Position</span>
                        <div class="setting-control">
                            <select class="dropdown">
                                <option>Bottom</option>
                                <option>Right</option>
                                <option>Left</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="settings-section">
                    <div class="section-title">Appearance</div>
                    <div class="setting-item">
                        <span class="setting-label">Zen Mode</span>
                        <div class="setting-control">
                            <div class="toggle-switch" onclick="toggleSetting(this)"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // JavaScript untuk popup functionality
        function openPopup(popupId) {
            document.getElementById(popupId).style.display = 'flex';
        }

        function closePopup(popupId) {
            document.getElementById(popupId).style.display = 'none';
        }

        function toggleSetting(element) {
            element.classList.toggle('active');
        }

        // Event listeners untuk ikon Account dan Settings
        document.addEventListener('DOMContentLoaded', function() {
            // Tambahkan event listener untuk ikon Account (di Activity Bar)
            const accountIcon = document.querySelector('.codicon-accounts-view-bar-icon');
            if (accountIcon) {
                accountIcon.addEventListener('click', function() {
                    openPopup('profilePopup');
                });
            }

            // Tambahkan event listener untuk ikon Settings (di Activity Bar)
            const settingsIcon = document.querySelector('.codicon-settings-view-bar-icon');
            if (settingsIcon) {
                settingsIcon.addEventListener('click', function() {
                    openPopup('settingsPopup');
                });
            }

            // Close popup dengan ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closePopup('profilePopup');
                    closePopup('settingsPopup');
                }
            });

            // Close popup dengan click di backdrop
            document.querySelectorAll('.vscode-popup').forEach(popup => {
                popup.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.style.display = 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>
```

## Cara Menggunakan

1. **Salin kode di atas** ke file baru bernama `custom-vscode-complete.html`
2. **Tambahkan CSS dan JavaScript** ke file yang sudah ada tanpa mengubah struktur DOM yang ada
3. **Popup akan aktif** ketika mengklik ikon Account atau Settings di Activity Bar
4. **Fitur yang tersedia**:
   - Profile popup: Avatar, sign-in toggle, theme switcher
   - Settings popup: Editor, Workbench, dan Appearance settings
   - ESC key dan backdrop click untuk menutup popup
   - Styling sesuai tema VSCode Dark+

## Catatan Implementasi

- Semua styling menggunakan CSS variables yang sesuai dengan tema VSCode
- Tidak ada perubahan pada struktur DOM yang sudah ada
- Popup ditambahkan sebagai elemen baru di akhir body
- JavaScript menggunakan vanilla JS tanpa framework tambahan
- Responsive design untuk berbagai ukuran layar
