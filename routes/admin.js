const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin');
const { isAdminLoggedIn, isAdminNotLoggedIn } = require('../middleware/admin');

// ==================== AUTHENTICATION ====================
router.route('/login')
    .get(isAdminNotLoggedIn, controller.renderLoginPage)
    .post(isAdminNotLoggedIn, controller.adminLogin);

router.route('/logout')
    .get(isAdminLoggedIn, controller.adminLogout);

// ==================== DASHBOARD ====================
router.route('/dashboard')
    .get(isAdminLoggedIn, controller.renderDashboard);

// ==================== DESTINATIONS ====================
router.route('/destinations')
    .get(isAdminLoggedIn, controller.renderDestinationsList);

router.route('/destinations/:id')
    .get(isAdminLoggedIn, controller.renderDestinationForm)
    .post(isAdminLoggedIn, controller.saveDestination)
    .delete(isAdminLoggedIn, controller.deleteDestination);

// ==================== EXPERIENCES ====================
router.route('/experiences')
    .get(isAdminLoggedIn, controller.renderExperiencesList);

router.route('/experiences/:id')
    .get(isAdminLoggedIn, controller.renderExperienceForm)
    .post(isAdminLoggedIn, controller.saveExperience)
    .delete(isAdminLoggedIn, controller.deleteExperience);

// ==================== PACKAGES ====================
router.route('/packages')
    .get(isAdminLoggedIn, controller.renderPackagesList);

router.route('/packages/:id')
    .get(isAdminLoggedIn, controller.renderPackageForm)
    .post(isAdminLoggedIn, controller.savePackage)
    .delete(isAdminLoggedIn, controller.deletePackage);

// ==================== BLOGS ====================
router.route('/blogs')
    .get(isAdminLoggedIn, controller.renderBlogsList);

router.route('/blogs/:id')
    .get(isAdminLoggedIn, controller.renderBlogForm)
    .post(isAdminLoggedIn, controller.saveBlog)
    .delete(isAdminLoggedIn, controller.deleteBlog);

// ==================== TESTIMONIALS ====================
router.route('/testimonials')
    .get(isAdminLoggedIn, controller.renderTestimonialsList);

router.route('/testimonials/:id')
    .get(isAdminLoggedIn, controller.renderTestimonialForm)
    .post(isAdminLoggedIn, controller.saveTestimonial)
    .delete(isAdminLoggedIn, controller.deleteTestimonial);

// ==================== BOOKINGS ====================
router.route('/bookings')
    .get(isAdminLoggedIn, controller.renderBookingsList);

router.route('/bookings/:id')
    .get(isAdminLoggedIn, controller.viewBooking)
    .delete(isAdminLoggedIn, controller.deleteBooking);

// ==================== AI PLANS ====================
router.route('/aiplans')
    .get(isAdminLoggedIn, controller.renderAIPlansList);

router.route('/aiplans/:id')
    .get(isAdminLoggedIn, controller.viewAIPlan)
    .delete(isAdminLoggedIn, controller.deleteAIPlan);

module.exports = router;
