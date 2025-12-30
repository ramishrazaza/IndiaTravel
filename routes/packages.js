const express = require('express');
const router = express.Router();
const controller = require('../controllers/packages');

// Package page routes
router.route('/')
    .get(controller.renderPackagesPage);

router.route('/:id')
    .get(controller.renderPackageDetailPage);

// Packages API
router.route('/getAllPackages')
    .get(controller.getAllPackages);

router.route('/getPackageById/:id')
    .get(controller.getPackageById);

module.exports = router;
