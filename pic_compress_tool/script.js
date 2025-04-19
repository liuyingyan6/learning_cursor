/**
 * @typedef {Object} ImageData
 * @property {string} originalUrl - The URL of the original image
 * @property {number} originalSize - The size of the original image in bytes
 * @property {string} compressedUrl - The URL of the compressed image
 * @property {number} compressedSize - The size of the compressed image in bytes
 * @property {string} fileName - The original file name
 */

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const imagesGrid = document.getElementById('imagesGrid');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const compressionControls = document.getElementById('compressionControls');
const previewSection = document.getElementById('previewSection');

/** @type {Map<string, ImageData>} */
const imageMap = new Map();

/**
 * Formats file size in bytes to a human-readable string
 * @param {number} bytes - The size in bytes
 * @returns {string} Formatted size string
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Compresses an image using Canvas API
 * @param {File} file - The image file to compress
 * @param {number} quality - Compression quality (0-1)
 * @returns {Promise<ImageData>} Promise resolving to compressed image data
 */
async function compressImage(file, quality) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                
                ctx.drawImage(img, 0, 0);
                
                const compressedDataUrl = canvas.toDataURL(file.type, quality);
                
                // Convert base64 to blob to get size
                fetch(compressedDataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        resolve({
                            originalUrl: event.target.result,
                            originalSize: file.size,
                            compressedUrl: compressedDataUrl,
                            compressedSize: blob.size,
                            fileName: file.name
                        });
                    });
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
}

/**
 * Creates an image preview card
 * @param {ImageData} imageData - The image data to display
 * @returns {HTMLElement} The created card element
 */
function createImageCard(imageData) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
        <div class="image-preview">
            <img src="${imageData.originalUrl}" alt="${imageData.fileName}">
        </div>
        <div class="image-info">
            <p class="filename">${imageData.fileName}</p>
            <p class="size-info">
                Original: ${formatFileSize(imageData.originalSize)}<br>
                Compressed: ${formatFileSize(imageData.compressedSize)}
            </p>
            <div class="compression-ratio">
                ${Math.round((1 - imageData.compressedSize / imageData.originalSize) * 100)}% smaller
            </div>
        </div>
        <button class="download-btn" data-filename="${imageData.fileName}">Download</button>
    `;
    return card;
}

/**
 * Updates the UI with image previews
 * @param {ImageData} imageData - The image data to display
 */
function updateUI(imageData) {
    const card = createImageCard(imageData);
    imagesGrid.appendChild(card);
    compressionControls.style.display = 'block';
    previewSection.style.display = 'block';
}

/**
 * Handles file selection and compression
 * @param {File} file - The selected file
 */
async function handleFile(file) {
    if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
    }

    try {
        const imageData = await compressImage(file, qualitySlider.value / 100);
        imageMap.set(file.name, imageData);
        updateUI(imageData);
    } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error compressing image. Please try again.');
    }
}

/**
 * Compresses all images with current quality settings
 */
async function compressAllImages() {
    const quality = qualitySlider.value / 100;
    imagesGrid.innerHTML = '';
    imageMap.clear();

    for (const file of fileInput.files) {
        await handleFile(file);
    }
}

/**
 * Downloads all compressed images as a zip file
 */
async function downloadAllImages() {
    if (imageMap.size === 0) return;

    const zip = new JSZip();
    
    for (const [fileName, imageData] of imageMap) {
        const response = await fetch(imageData.compressedUrl);
        const blob = await response.blob();
        zip.file(fileName, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'compressed-images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event Listeners
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--primary-color)';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'var(--border-color)';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--border-color)';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        compressAllImages();
    }
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        compressAllImages();
    }
});

qualitySlider.addEventListener('input', (e) => {
    qualityValue.textContent = `${e.target.value}%`;
    if (fileInput.files.length > 0) {
        compressAllImages();
    }
});

downloadAllBtn.addEventListener('click', downloadAllImages);

// Delegate event listener for download buttons
imagesGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('download-btn')) {
        const fileName = e.target.dataset.filename;
        const imageData = imageMap.get(fileName);
        if (imageData) {
            const link = document.createElement('a');
            link.href = imageData.compressedUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}); 