const express = require('express');
const router = express.Router();
const controller = require('../controllers/experiences');

// Experience page routes
router.route('/')
    .get(controller.renderExperiencesPage);

router.route('/experience')
    .get(controller.renderExperienceDetailPage);

// Experiences API
router.route('/getAllExperiences')
    .get(controller.getAllExperiences);

router.route('/getExperienceById/:id')
    .get(controller.getExperienceById);

module.exports = router;
