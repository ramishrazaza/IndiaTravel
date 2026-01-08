const express = require("express");
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const methodOverride = require("method-override");
const compression = require("compression");

// Import all route modules
const indexRoutes = require("./routes/index");
const destinationRoutes = require("./routes/destinations");
const experienceRoutes = require("./routes/experiences");
const packageRoutes = require("./routes/packages");
const blogRoutes = require("./routes/blogs");
const adminRoutes = require("./routes/admin");

const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Configure ejs-mate as the view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ==================== COMPRESSION MIDDLEWARE ====================
// Enable gzip compression for all responses (except streaming)
// Reduces response size by ~70% for text-based content
app.use(compression({
    level: 6, // Balance between compression ratio and speed
    threshold: 1024, // Only compress responses > 1KB
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// ==================== STATIC FILES WITH CACHING ====================
const oneYear = 365 * 24 * 60 * 60 * 1000; // milliseconds
const oneHour = 60 * 60 * 1000;

// Cache static assets for long periods
app.use(express.static(path.join(__dirname, "public"), {
    maxAge: oneYear, // Cache versioned assets for 1 year
    etag: false // Disable etag for immutable assets
}));

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'india-travel-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// ==================== HTTP HEADERS & CACHING ====================
// Set cache headers for HTML responses (dynamic, cache less aggressively)
app.use((req, res, next) => {
    // Cache control for HTML (no cache, must revalidate)
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate'); // 1 hour
    
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Enable browser caching for specific asset types
    if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
        res.setHeader('Cache-Control', `public, max-age=${oneYear / 1000}, immutable`); // 1 year
    }
    
    next();
});

// Use all route modules
app.use("/", indexRoutes);
app.use("/destinations", destinationRoutes);
app.use("/experiences", experienceRoutes);
app.use("/packages", packageRoutes);
app.use("/blogs", blogRoutes);
app.use("/admin", adminRoutes);

// ==================== 404 HANDLER ====================
/**
 * Handle 404 Not Found errors
 * Catches all requests that don't match any route
 */
app.use((req, res) => {
    console.log(`⚠️ 404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).render('pages/404', { 
        title: '404 - Page Not Found',
        statusCode: 404 
    });
});

// ==================== ERROR HANDLING MIDDLEWARE ====================
/**
 * Global error handler middleware
 * Handles all errors thrown from controllers via next(error)
 */
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    // Log error
    console.error(`❌ [${statusCode}] ${message}`, error);

    // Handle JSON requests
    if (req.accepts('json')) {
        return res.status(statusCode).json({
            success: false,
            message,
            statusCode
        });
    }

    // Handle HTML requests
    res.status(statusCode).render('error', { 
        message,
        statusCode 
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});