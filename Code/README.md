# Colour Blindness Assistance Chrome Extension

A Chrome extension designed to help people with color blindness by applying visual filters to web pages, making content more accessible and easier to distinguish.

## 🌈 Features

- **Multiple Color Vision Types**: Supports various types of color blindness including:
  - **Protanopia** (Red-Blind)
  - **Protanomaly** (Red-Weak)
  - **Deuteranopia** (Green-Blind)
  - **Deuteranomaly** (Green-Weak)
  - **Tritanopia** (Blue-Blind)
  - **Tritanomaly** (Blue-Weak)
  - **Normal Color Vision** (Default)

- **Real-time Filter Application**: Instantly applies color filters to web pages
- **Easy Toggle**: Simple radio button interface to switch between different vision types
- **Persistent Settings**: Remembers your preferred color vision setting
- **Universal Compatibility**: Works on all websites (except Chrome internal pages)
- **Color Detection**: Includes a color name detector for images

## 🚀 Installation

### Manual Installation (Recommended for Development)

1. **Download/Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top-right corner
4. **Click "Load unpacked"** and select the `src` folder from this project
5. **Pin the extension** to your toolbar for easy access

### File Structure
```
src/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── popup.css             # Popup styling
├── background.js         # Service worker
├── colorblinding.js      # Color blindness filter logic
├── colorDetector.js      # Color detection functionality
├── reload.js             # Filter removal script
├── ntc.js                # Color naming library
├── jquery.min.js         # jQuery library
└── icons/                # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 📖 Usage

### Basic Operation

1. **Click the extension icon** in your Chrome toolbar
2. **Select your color vision type** from the radio buttons
3. **The page will instantly update** with the selected color filter
4. **Choose "Deactivate"** to return to normal vision

### Color Vision Types Explained

- **Normal**: No filter applied (default state)
- **Protanopia/Protanomaly**: Helps with red-green color blindness
- **Deuteranopia/Deuteranomaly**: Assists with green-red color blindness  
- **Tritanopia/Tritanomaly**: Aids with blue-yellow color blindness

### Advanced Features

- **Color Detection**: Hover over images to see color names
- **Persistent Settings**: Your choice is remembered across browser sessions
- **Universal Application**: Works on all websites and web applications

## 🔧 Technical Details

### Manifest Version
- **Manifest V3** - Latest Chrome extension standard
- **Service Worker** - Background script for extension functionality
- **Content Scripts** - Injected into web pages for filter application

### Permissions Required
- `tabs` - Access to browser tabs
- `storage` - Save user preferences
- `activeTab` - Access to current active tab
- `webNavigation` - Monitor page navigation
- `scripting` - Inject scripts into web pages

### Browser Compatibility
- **Chrome 88+** (Manifest V3 support required)
- **Edge 88+** (Chromium-based)
- **Other Chromium-based browsers**

## 🐛 Troubleshooting

### Common Issues

1. **Extension not working on certain pages**
   - Chrome internal pages (chrome://) don't support script injection
   - The extension will show a status message on restricted pages

2. **Filters not applying**
   - Ensure you're on a regular website (not chrome:// or chrome-extension://)
   - Check the browser console for error messages
   - Try refreshing the page

3. **Extension not loading**
   - Verify Developer Mode is enabled
   - Check that all files are present in the src folder
   - Reload the extension from chrome://extensions/

### Error Messages

- **"Cannot access a chrome:// URL"**: Normal behavior on Chrome internal pages
- **"Failed to inject scripts"**: Usually indicates a page restriction or script error

## 🛠️ Development

### Making Changes

1. **Edit the source files** in the `src/` directory
2. **Reload the extension** in `chrome://extensions/`
3. **Test changes** on a regular website

### Key Files to Modify

- `popup.js` - Extension popup logic
- `colorblinding.js` - Color filter algorithms
- `popup.css` - User interface styling
- `manifest.json` - Extension configuration

### Adding New Color Vision Types

1. **Add filter matrix** in `colorblinding.js`
2. **Update HTML** in `popup.html`
3. **Add handling logic** in `popup.js`


### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
