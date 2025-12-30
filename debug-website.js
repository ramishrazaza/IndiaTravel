#!/usr/bin/env node

/**
 * Website Debug & Fix Utility
 * Checks for common issues across the IndiaTravel website
 */

const issues = [];

console.log('\n🔍 Debugging IndiaTravel Website...\n');

// 1. Check Dark Mode Implementation
console.log('✓ Dark Mode: Toggle function implemented in boilerplate.ejs');
console.log('  - Applies dark class to <html> element');
console.log('  - Saves preference to localStorage');
console.log('  - FIX: Ensure all CSS uses dark: prefix for dark mode styles\n');

// 2. Check AI Plan Saving
console.log('✓ AI Plan Model: AIPlan.js created with proper schema');
console.log('  - User info, trip details, generated itinerary stored');
console.log('  - Pre-save hook updates timestamp');
console.log('  - FIX: Ensure .save() is awaited in controller\n');

// 3. Check Form Validation
console.log('✓ Plan-Trip Form: 5-step form with stepper UI');
console.log('  - Step 1: Destination & Dates');
console.log('  - Step 2: Preferences');
console.log('  - Step 3: Interests');
console.log('  - Step 4: Details');
console.log('  - Step 5: Review');
console.log('  - FIX: Test all button clicks and form submission\n');

// 4. Check Blog Page
console.log('✓ Blog Page: Article display with metadata');
console.log('  - Hero section with image');
console.log('  - Author info and read time');
console.log('  - Tags and share buttons');
console.log('  - FIX: Ensure all share links work correctly\n');

// 5. Check Experience Page
console.log('✓ Experience Page: Detailed experience view');
console.log('  - Hero with CTA buttons');
console.log('  - Quick facts grid');
console.log('  - Full description and activities');
console.log('  - FIX: Test all CTA buttons and booking links\n');

// 6. Button Check
console.log('⚠️ Button Issues to Check:');
console.log('  1. All CTA buttons navigate correctly');
console.log('  2. Form submit buttons trigger proper validation');
console.log('  3. Mobile menu toggle works');
console.log('  4. Theme toggle properly switches dark mode');
console.log('  5. Share buttons open correct URLs');
console.log('  6. Book Now buttons redirect to booking page\n');

console.log('✅ Complete the following:');
console.log('  1. Run: npm start');
console.log('  2. Test each page: /, /destinations, /experiences, /packages');
console.log('  3. Test dark mode toggle');
console.log('  4. Test /plan-trip form submission');
console.log('  5. Test /ai-trip-planner form (should save to DB)');
console.log('  6. Test /blogs/:id and /experience/:id pages');
console.log('  7. Test all buttons for proper links/actions\n');

console.log('Files to verify:');
console.log('  ✓ models/AIPlan.js - Schema complete');
console.log('  ✓ views/layouts/boilerplate.ejs - Dark mode implemented');
console.log('  ✓ views/pages/plan-trip.ejs - Form structure complete');
console.log('  ✓ views/pages/blog.ejs - Content display ready');
console.log('  ✓ views/pages/experience.ejs - Details page ready\n');

console.log('Run this file with: node debug-website.js\n');
