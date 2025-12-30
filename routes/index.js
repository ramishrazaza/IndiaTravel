const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

// Homepage
router.route('/')
    .get(controller.renderHomePage);

// Plan Trip & Booking
router.route('/plan-trip')
    .get(controller.renderPlanTripPage);

router.route('/book-now')
    .get(controller.renderBookNowPage);

router.route('/ai-trip-planner')
    .get(controller.renderAIPlannerPage);

// Trip Booking API
router.route('/api/bookings')
    .post(controller.submitTripBooking);

// AI Trip Planner API
router.route('/api/ai/plan')
    .post(controller.generateAIPlan);

// General API endpoints
router.route('/api/testimonials')
    .get(controller.getAllTestimonials);

router.route('/api/search')
    .get(controller.searchAll);

module.exports = router;
