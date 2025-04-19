/**
 * @description Script to generate background images from SVG files
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'backgrounds');
const outputDir = path.join(__dirname, '..', 'backgrounds');

/**
 * @description Generates PNG background images from SVG files
 */
async function generateBackgrounds() {
  try {
    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.svg'));
    
    for (const file of files) {
      const inputFile = path.join(inputDir, file);
      const outputFile = path.join(outputDir, file.replace('.svg', '.png'));
      
      await sharp(inputFile)
        .png()
        .toFile(outputFile);
      
      console.log(`Generated background: ${file.replace('.svg', '.png')}`);
    }
    
    console.log('All backgrounds generated successfully!');
  } catch (error) {
    console.error('Error generating backgrounds:', error);
  }
}

generateBackgrounds(); 