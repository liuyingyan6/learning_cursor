/**
 * @description Creates and manages the floating quote card generator icon
 */
class QuoteCardGenerator {
  constructor() {
    this.floatingIcon = null;
    this.selectedText = '';
    this.init();
  }

  /**
   * @description Initializes the quote card generator
   */
  init() {
    this.createFloatingIcon();
    this.setupMessageListener();
  }

  /**
   * @description Creates the floating icon element
   */
  createFloatingIcon() {
    this.floatingIcon = document.createElement('div');
    this.floatingIcon.className = 'quote-card-generator-icon';
    this.floatingIcon.innerHTML = '💬';
    this.floatingIcon.style.display = 'none';
    document.body.appendChild(this.floatingIcon);

    this.floatingIcon.addEventListener('click', () => this.showQuoteCardGenerator());
  }

  /**
   * @description Sets up the message listener for communication with the background script
   */
  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'showQuoteCardGenerator') {
        this.selectedText = request.text;
        this.showFloatingIcon();
      }
    });
  }

  /**
   * @description Shows the floating icon near the selected text
   */
  showFloatingIcon() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    this.floatingIcon.style.display = 'block';
    this.floatingIcon.style.top = `${window.scrollY + rect.top - 30}px`;
    this.floatingIcon.style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
  }

  /**
   * @description Shows the quote card generator UI
   */
  showQuoteCardGenerator() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'quote-card-generator-modal';
    
    // Create modal content
    modal.innerHTML = `
      <div class="quote-card-generator-content">
        <h2>Quote Card Generator</h2>
        <div class="preview-container">
          <div class="quote-card-preview"></div>
        </div>
        <div class="controls">
          <div class="style-controls">
            <h3>Style</h3>
            <select id="cardStyle">
              <option value="minimalist">Minimalist</option>
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
            </select>
          </div>
          <div class="font-controls">
            <h3>Font</h3>
            <select id="fontFamily">
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Verdana">Verdana</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div class="background-controls">
            <h3>Background</h3>
            <select id="backgroundStyle">
              <option value="preset1">Preset 1</option>
              <option value="preset2">Preset 2</option>
              <option value="preset3">Preset 3</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div class="export-controls">
            <h3>Export</h3>
            <select id="exportFormat">
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="webp">WEBP</option>
            </select>
            <select id="exportQuality">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button id="exportButton">Export</button>
          </div>
        </div>
        <button class="close-button">×</button>
      </div>
    `;

    document.body.appendChild(modal);
    this.setupModalEventListeners(modal);
  }

  /**
   * @description Sets up event listeners for the modal
   * @param {HTMLElement} modal - The modal element
   */
  setupModalEventListeners(modal) {
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      modal.remove();
    });

    // Add event listeners for style changes
    const styleSelect = modal.querySelector('#cardStyle');
    const fontSelect = modal.querySelector('#fontFamily');
    const backgroundSelect = modal.querySelector('#backgroundStyle');
    
    [styleSelect, fontSelect, backgroundSelect].forEach(select => {
      select.addEventListener('change', () => this.updatePreview(modal));
    });

    // Add export button listener
    const exportButton = modal.querySelector('#exportButton');
    exportButton.addEventListener('click', () => this.exportQuoteCard(modal));
  }

  /**
   * @description Updates the quote card preview
   * @param {HTMLElement} modal - The modal element
   */
  updatePreview(modal) {
    const preview = modal.querySelector('.quote-card-preview');
    const style = modal.querySelector('#cardStyle').value;
    const font = modal.querySelector('#fontFamily').value;
    const background = modal.querySelector('#backgroundStyle').value;

    preview.style.fontFamily = font;
    preview.textContent = this.selectedText;
    
    // Apply style-specific classes
    preview.className = 'quote-card-preview ' + style;
    
    // Apply background
    if (background === 'custom') {
      // Handle custom background upload
    } else {
      preview.style.backgroundImage = `url(backgrounds/${background}.jpg)`;
    }
  }

  /**
   * @description Exports the quote card as an image
   * @param {HTMLElement} modal - The modal element
   */
  exportQuoteCard(modal) {
    const preview = modal.querySelector('.quote-card-preview');
    const format = modal.querySelector('#exportFormat').value;
    const quality = modal.querySelector('#exportQuality').value;

    // Convert the preview to an image using html2canvas
    html2canvas(preview).then(canvas => {
      const link = document.createElement('a');
      link.download = `quote-card.${format}`;
      link.href = canvas.toDataURL(`image/${format}`, this.getQualityValue(quality));
      link.click();
    });
  }

  /**
   * @description Gets the quality value for image export
   * @param {string} quality - The quality level
   * @returns {number} The quality value between 0 and 1
   */
  getQualityValue(quality) {
    switch (quality) {
      case 'high': return 1.0;
      case 'medium': return 0.7;
      case 'low': return 0.4;
      default: return 0.7;
    }
  }
}

// Initialize the quote card generator
new QuoteCardGenerator(); 