const express = require('express');
const router = express.Router();
const controller = require('../controllers/root');

// ==================== PAGE ROUTES ====================
router.route('/')
    .get(controller.renderHomePage);

router.route('/destination')
    .get(controller.renderDestinationPage);

router.route('/destinations')
    .get(controller.renderDestinationsPage);

router.route('/experiences')
    .get(controller.renderExperiencesPage);

router.route('/experiences/:id')
    .get(controller.renderExperienceDetailPage);

router.route('/packages')
    .get(controller.renderPackagesPage);

router.route('/packages/:id')
    .get(controller.renderPackageDetailPage);

router.route('/blogs')
    .get(controller.renderBlogsPage);

router.route('/blogs/:id')
    .get(controller.renderBlogDetailPage);

router.route('/plan-trip')
    .get(controller.renderPlanTripPage);

router.route('/book-now')
    .get(controller.renderBookNowPage);

// ==================== API ROUTES ====================

// Destinations API
router.route('/api/destinations')
    .get(controller.getAllDestinations);

router.route('/api/destinations/:id')
    .get(controller.getDestinationById);

// Experiences API
router.route('/api/experiences')
    .get(controller.getAllExperiences);

router.route('/api/experiences/:id')
    .get(controller.getExperienceById);

// Packages API
router.route('/api/packages')
    .get(controller.getAllPackages);

router.route('/api/packages/:id')
    .get(controller.getPackageById);

// Blogs API
router.route('/api/blogs')
    .get(controller.getAllBlogs);

router.route('/api/blogs/:id')
    .get(controller.getBlogById);

// Testimonials API
router.route('/api/testimonials')
    .get(controller.getAllTestimonials);

// Search API
router.route('/api/search')
    .get(controller.searchAll);

module.exports = router;