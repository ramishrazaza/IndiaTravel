const Blog = require('../models/Blog');

module.exports.renderBlogsPage = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }
        
        let blogs = await Blog.find(query);
        
        if (sort === 'latest') {
            blogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        } else if (sort === 'popular') {
            blogs.sort((a, b) => b.viewCount - a.viewCount);
        } else if (sort === 'rating') {
            blogs.sort((a, b) => b.rating - a.rating);
        }
        
        const categories = await Blog.distinct('category');
        
        res.render('pages/blogs', { 
            blogs,
            categories,
            selectedCategory: category || 'all',
            searchQuery: search || ''
        });
    } catch (error) {
        console.error('Error rendering blogs page:', error);
        res.status(500).render('error', { message: 'Failed to load blogs' });
    }
};

module.exports.renderBlogDetailPage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );
        
        if (!blog) {
            return res.status(404).render('error', { message: 'Blog not found' });
        }
        
        const relatedBlogs = await Blog.find({
            category: blog.category,
            _id: { $ne: id }
        }).limit(3);
        
        res.render('pages/blog', { 
            blog,
            relatedBlogs
        });
    } catch (error) {
        console.error('Error rendering blog detail page:', error);
        res.status(500).render('error', { message: 'Failed to load blog details' });
    }
};

// API Controllers
module.exports.getAllBlogs = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }
        
        let blogs = await Blog.find(query);
        
        if (sort === 'latest') {
            blogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        } else if (sort === 'popular') {
            blogs.sort((a, b) => b.viewCount - a.viewCount);
        } else if (sort === 'rating') {
            blogs.sort((a, b) => b.rating - a.rating);
        }
        
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );
        
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        
        res.json({ success: true, data: blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
