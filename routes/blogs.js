const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogs');

// Blog page routes
router.route('/')
    .get(controller.renderBlogsPage);

router.route('/:id')
    .get(controller.renderBlogDetailPage);

// Blogs API
router.route('/getAllBlogs')
    .get(controller.getAllBlogs);

router.route('/getBlogById/:id')
    .get(controller.getBlogById);

module.exports = router;
