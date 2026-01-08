# Production Build & Deployment Script for Windows
# Usage: powershell -ExecutionPolicy Bypass -File scripts\build-production.ps1

Write-Host "🚀 Starting production build process..." -ForegroundColor Cyan
Write-Host ""

# Check if .env.production exists
if (!(Test-Path ".env.production")) {
    Write-Host "❌ .env.production not found!" -ForegroundColor Red
    Write-Host "Please create .env.production file with production settings"
    exit 1
}

# Step 1: Install production dependencies
Write-Host "📦 Step 1: Installing production dependencies..." -ForegroundColor Yellow
npm install --production
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Install development dependencies for build tools
Write-Host "🔧 Step 2: Installing build tools..." -ForegroundColor Yellow
npm install --save-dev compression postcss cssnano terser sharp
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build tools installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build tools installed" -ForegroundColor Green
Write-Host ""

# Step 3: Minify assets
Write-Host "🎨 Step 3: Minifying CSS and JavaScript..." -ForegroundColor Yellow
node scripts/minify-assets.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Asset minification skipped (optional)" -ForegroundColor Yellow
    Write-Host ""
}
Write-Host "✅ Assets minified" -ForegroundColor Green
Write-Host ""

# Step 4: Optimize images
Write-Host "🖼️  Step 4: Optimizing images..." -ForegroundColor Yellow
node scripts/optimize-images.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Image optimization skipped (optional)" -ForegroundColor Yellow
    Write-Host ""
}
Write-Host "✅ Images optimized" -ForegroundColor Green
Write-Host ""

# Step 5: Create logs directory
Write-Host "📁 Step 5: Creating logs directory..." -ForegroundColor Yellow
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" -Force | Out-Null
}
Write-Host "✅ Logs directory created" -ForegroundColor Green
Write-Host ""

# Step 6: Run security checks
Write-Host "🔒 Step 6: Running security checks..." -ForegroundColor Yellow
npm audit --audit-level=moderate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Security audit passed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Security warnings found (review above)" -ForegroundColor Yellow
}
Write-Host ""

# Step 7: Summary
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "✅ Production build complete!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:"
Write-Host "  1. Review .env.production settings"
Write-Host "  2. Test locally: `$env:NODE_ENV='production'; node app.js"
Write-Host "  3. Deploy to production server"
Write-Host ""
Write-Host "🚀 To start in production:"
Write-Host "  `$env:NODE_ENV='production'; node app.js"
Write-Host ""
Write-Host "💡 Or use PM2 process manager:"
Write-Host "  npm install -g pm2"
Write-Host "  pm2 start app.js --name 'indiatravel' --env production"
Write-Host "  pm2 save"
Write-Host ""
