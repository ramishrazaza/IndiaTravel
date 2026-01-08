/**
 * Image Optimization Script
 * Compresses and resizes images for production
 * 
 * Installation: npm install --save-dev sharp
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './public/images';
const OUTPUT_DIR = './public/images/optimized';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image optimization settings
const optimizationSettings = {
  // JPEG settings
  jpeg: {
    quality: 80,
    progressive: true,
    mozjpeg: true
  },
  // PNG settings
  png: {
    quality: 80,
    compressionLevel: 9
  },
  // WebP settings (modern format, smaller file size)
  webp: {
    quality: 80
  }
};

/**
 * Process a single image
 */
async function optimizeImage(inputPath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const nameWithoutExt = path.basename(filename, ext);
  
  try {
    let processing = sharp(inputPath)
      .resize(1920, 1080, {
        withoutEnlargement: true,
        fit: 'inside'
      });

    // Process based on file type
    if (ext === '.jpg' || ext === '.jpeg') {
      await processing
        .jpeg(optimizationSettings.jpeg)
        .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}_optimized.jpg`));
      
      // Also create WebP version
      await sharp(inputPath)
        .resize(1920, 1080, { withoutEnlargement: true, fit: 'inside' })
        .webp(optimizationSettings.webp)
        .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`));
      
      console.log(`✅ Optimized: ${filename}`);
      console.log(`   → ${nameWithoutExt}_optimized.jpg`);
      console.log(`   → ${nameWithoutExt}.webp`);
    } 
    else if (ext === '.png') {
      await processing
        .png(optimizationSettings.png)
        .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}_optimized.png`));
      
      // Also create WebP version
      await sharp(inputPath)
        .resize(1920, 1080, { withoutEnlargement: true, fit: 'inside' })
        .webp(optimizationSettings.webp)
        .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`));
      
      console.log(`✅ Optimized: ${filename}`);
      console.log(`   → ${nameWithoutExt}_optimized.png`);
      console.log(`   → ${nameWithoutExt}.webp`);
    }
    else if (ext === '.webp') {
      await processing
        .webp(optimizationSettings.webp)
        .toFile(path.join(OUTPUT_DIR, `${nameWithoutExt}_optimized.webp`));
      
      console.log(`✅ Optimized: ${filename} → ${nameWithoutExt}_optimized.webp`);
    }
    else if (ext === '.gif') {
      // Convert GIF to MP4 or WebP for better performance
      console.log(`⚠️  Skipped: ${filename} (GIF - consider converting to WebP or MP4)`);
    }
    else {
      console.log(`⏭️  Skipped: ${filename} (Unsupported format)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Input directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  if (imageFiles.length === 0) {
    console.log(`⚠️  No images found in ${INPUT_DIR}`);
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to optimize\n`);

  // Process images sequentially to avoid overwhelming the system
  for (const file of imageFiles) {
    await optimizeImage(path.join(INPUT_DIR, file), file);
  }

  console.log('\n✅ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\n📝 Update your HTML templates to use optimized images:');
  console.log('   Old: <img src="/images/photo.jpg" alt="...">');
  console.log('   New: <img src="/images/optimized/photo.webp" alt="..." srcset="/images/optimized/photo_optimized.jpg">');
}

main();
