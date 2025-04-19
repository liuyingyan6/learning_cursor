# Image Compressor

A simple, elegant, and powerful web-based image compression tool that allows you to compress multiple images at once. Built with vanilla JavaScript, this tool uses the Canvas API for image compression.

## Features

- 🖼️ **Batch Upload**: Upload multiple images at once
- 🎯 **Quality Control**: Adjust compression quality with a slider
- 📊 **Size Comparison**: See original and compressed file sizes
- 💾 **Individual Downloads**: Download compressed images individually
- 📦 **Batch Download**: Download all compressed images as a ZIP file
- 🖱️ **Drag & Drop**: Easy file upload with drag and drop support
- 📱 **Responsive Design**: Works well on both desktop and mobile devices

## Supported Formats

- PNG
- JPEG

## Usage

1. **Upload Images**
   - Drag and drop images onto the upload area, or
   - Click the upload area to select files through your file browser

2. **Adjust Compression**
   - Use the quality slider to adjust compression level (0-100%)
   - Higher quality = larger file size
   - Lower quality = smaller file size

3. **Download**
   - Download individual images using the "Download" button on each image card
   - Download all compressed images at once using the "Download All" button

## Technical Details

- Built with vanilla JavaScript
- Uses Canvas API for image compression
- No server-side processing - all compression happens in the browser
- Uses JSZip library for batch downloads

## Browser Support

Works in all modern browsers that support:
- Canvas API
- File API
- Drag and Drop API
- ES6+ JavaScript features

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. No build process required - it's ready to use!

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests. 