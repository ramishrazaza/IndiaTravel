#!/bin/bash

# Production Build & Deployment Script
# Usage: bash scripts/build-production.sh

echo "🚀 Starting production build process..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo -e "${RED}❌ .env.production not found!${NC}"
    echo "Please create .env.production file with production settings"
    exit 1
fi

# Step 1: Install production dependencies
echo -e "${YELLOW}📦 Step 1: Installing production dependencies...${NC}"
npm install --production
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ npm install failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}\n"

# Step 2: Install development dependencies for build tools
echo -e "${YELLOW}🔧 Step 2: Installing build tools...${NC}"
npm install --save-dev compression postcss cssnano terser sharp
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build tools installation failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build tools installed${NC}\n"

# Step 3: Minify assets
echo -e "${YELLOW}🎨 Step 3: Minifying CSS and JavaScript...${NC}"
node scripts/minify-assets.js
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Asset minification skipped (optional)${NC}\n"
fi
echo -e "${GREEN}✅ Assets minified${NC}\n"

# Step 4: Optimize images
echo -e "${YELLOW}🖼️  Step 4: Optimizing images...${NC}"
node scripts/optimize-images.js
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Image optimization skipped (optional)${NC}\n"
fi
echo -e "${GREEN}✅ Images optimized${NC}\n"

# Step 5: Create logs directory
echo -e "${YELLOW}📁 Step 5: Creating logs directory...${NC}"
mkdir -p logs
echo -e "${GREEN}✅ Logs directory created${NC}\n"

# Step 6: Run security checks
echo -e "${YELLOW}🔒 Step 6: Running security checks...${NC}"
npm audit --audit-level=moderate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Security audit passed${NC}\n"
else
    echo -e "${YELLOW}⚠️  Security warnings found (review above)${NC}\n"
fi

# Step 7: Summary
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Production build complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo "📋 Next steps:"
echo "  1. Review .env.production settings"
echo "  2. Test locally: NODE_ENV=production node app.js"
echo "  3. Deploy to production server"
echo ""
echo "🚀 To start in production:"
echo "  NODE_ENV=production node app.js"
echo ""
echo "💡 Or use PM2 process manager:"
echo "  npm install -g pm2"
echo "  pm2 start app.js --name 'indiatravel' --env production"
echo "  pm2 save"
echo ""
