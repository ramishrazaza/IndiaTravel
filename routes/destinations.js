const express = require('express');
const router = express.Router();
const controller = require('../controllers/destinations');

// ==================== PAGE ROUTES ====================
/**
 * GET /destinations - List all destinations
 */
router.route('/')
    .get(controller.renderDestinationsPage);

/**
 * GET /destinations/place - Single destination detail page
 */
router.route('/place')
    .get(controller.renderDestinationDetailPage);

// ==================== API ROUTES ====================

router.route('/getAllDestinations')
    .get(controller.getAllDestinations);

/**
 * GET /api/destinations/:id - Get single destination by ID (JSON)
 */
router.route('/getDestinationById/:id')
    .get(controller.getDestinationById);

module.exports = router;
