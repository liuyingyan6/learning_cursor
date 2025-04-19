# Quote Card Generator Chrome Extension

A Chrome extension that allows you to generate beautiful quote cards from any selected text on a webpage.

## Features

- **Text Selection**: Select any text on a webpage and generate a quote card with a single click
- **Multiple Styles**: Choose from 3 different themed styles (minimalist, classic, modern)
- **Customization Options**:
  - 6 different font choices
  - 3 preset background options
  - Custom background support
  - Text alignment options
  - Adaptive margins
- **Export Options**:
  - Multiple image formats (PNG/JPG/WEBP)
  - Adjustable export quality

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Select any text on a webpage
2. Click the floating quote icon that appears above the selected text
3. Customize your quote card using the available options:
   - Choose a style (minimalist, classic, modern)
   - Select a font
   - Pick a background
   - Adjust export settings
4. Click "Export" to save your quote card

## Development

### Project Structure

```
quote-card-generator/
├── manifest.json
├── background.js
├── content.js
├── content.css
├── popup.html
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Dependencies

- html2canvas (for image export)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by WeChat Reading and Douban quote card styles
- Uses html2canvas for image export functionality 