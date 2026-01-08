/**
 * Asset Minification Script
 * Minifies CSS and JavaScript files for production
 * 
 * Installation: npm install --save-dev cssnano terser
 * Usage: node scripts/minify-assets.js
 */

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const terser = require('terser');

const CSS_INPUT_DIR = './public/css';
const JS_INPUT_DIR = './public/js';
const OUTPUT_DIR = './public/dist';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Minify CSS files
 */
async function minifyCSS() {
  console.log('🎨 Minifying CSS files...\n');
  
  if (!fs.existsSync(CSS_INPUT_DIR)) {
    console.log(`⚠️  CSS directory not found: ${CSS_INPUT_DIR}`);
    return;
  }

  const cssFiles = fs.readdirSync(CSS_INPUT_DIR)
    .filter(file => file.endsWith('.css'));

  if (cssFiles.length === 0) {
    console.log('⏭️  No CSS files found');
    return;
  }

  for (const file of cssFiles) {
    const inputPath = path.join(CSS_INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, `${path.basename(file, '.css')}.min.css`);
    
    try {
      const css = fs.readFileSync(inputPath, 'utf8');
      
      // Use PostCSS with cssnano for minification
      const result = await postcss([
        cssnano({
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
            reduceIdents: false,
            zindex: false,
            autoprefixer: false,
          }]
        })
      ]).process(css, { from: inputPath, to: outputPath });

      fs.writeFileSync(outputPath, result.css);
      
      const originalSize = fs.statSync(inputPath).size;
      const minifiedSize = fs.statSync(outputPath).size;
      const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
      
      console.log(`✅ ${file}`);
      console.log(`   → ${path.basename(outputPath)}`);
      console.log(`   📊 ${originalSize} → ${minifiedSize} bytes (${reduction}% reduction)\n`);
    } catch (error) {
      console.error(`❌ Error minifying ${file}:`, error.message, '\n');
    }
  }
}

/**
 * Minify JavaScript files
 */
async function minifyJS() {
  console.log('\n⚡ Minifying JavaScript files...\n');
  
  if (!fs.existsSync(JS_INPUT_DIR)) {
    console.log(`⚠️  JavaScript directory not found: ${JS_INPUT_DIR}`);
    return;
  }

  const jsFiles = fs.readdirSync(JS_INPUT_DIR)
    .filter(file => file.endsWith('.js') && !file.endsWith('.min.js'));

  if (jsFiles.length === 0) {
    console.log('⏭️  No JavaScript files found');
    return;
  }

  for (const file of jsFiles) {
    const inputPath = path.join(JS_INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, `${path.basename(file, '.js')}.min.js`);
    
    try {
      const code = fs.readFileSync(inputPath, 'utf8');
      
      // Use Terser for JavaScript minification
      const result = await terser.minify(code, {
        compress: {
          drop_console: true, // Remove console.log in production
          passes: 2
        },
        mangle: true,
        output: {
          comments: false
        }
      });

      if (result.error) {
        throw result.error;
      }

      fs.writeFileSync(outputPath, result.code);
      
      const originalSize = fs.statSync(inputPath).size;
      const minifiedSize = fs.statSync(outputPath).size;
      const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
      
      console.log(`✅ ${file}`);
      console.log(`   → ${path.basename(outputPath)}`);
      console.log(`   📊 ${originalSize} → ${minifiedSize} bytes (${reduction}% reduction)\n`);
    } catch (error) {
      console.error(`❌ Error minifying ${file}:`, error.message, '\n');
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🔨 Starting asset minification...\n');
  
  try {
    await minifyCSS();
    await minifyJS();
    
    console.log('✅ Asset minification complete!');
    console.log(`📁 Minified assets saved to: ${OUTPUT_DIR}`);
    console.log('\n📝 Update your HTML templates to use minified assets:');
    console.log('   Dev:  <link rel="stylesheet" href="/css/styles.css">');
    console.log('   Prod: <link rel="stylesheet" href="/dist/styles.min.css">');
    console.log('\n   Dev:  <script src="/js/app.js"></script>');
    console.log('   Prod: <script src="/dist/app.min.js"></script>');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
