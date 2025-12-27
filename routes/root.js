const express = require('express');
const router = express.Router();
const controller = require('../controllers/root');

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

module.exports = router;