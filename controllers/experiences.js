const Experience = require('../models/Experience');

module.exports.renderExperiencesPage = async (req, res) => {
    try {
        const { category, sort } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        let experiences = await Experience.find(query);
        
        if (sort === 'price-low') {
            experiences.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            experiences.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            experiences.sort((a, b) => b.rating - a.rating);
        }
        
        res.render('pages/experiences', { 
            experiences,
            selectedCategory: category || 'all'
        });
    } catch (error) {
        console.error('Error rendering experiences page:', error);
        res.status(500).render('error', { message: 'Failed to load experiences' });
    }
};

module.exports.renderExperienceDetailPage = async (req, res) => {
    try {
        const {category, title} = req.query;
        
        const experience = await Experience.findOne({ title, category });
        
        if (!experience) {
            return res.status(404).render('error', { message: 'Experience not found' });
        }
        
        const relatedExperiences = await Experience.find({
            category: experience.category,
            _id: { $ne: experience._id }
        }).limit(3);
        
        res.render('pages/experience', { 
            experience,
            relatedExperiences
        });
    } catch (error) {
        console.error('Error rendering experience detail page:', error);
        res.status(500).render('error', { message: 'Failed to load experience details' });
    }
};

// API Controllers
module.exports.getAllExperiences = async (req, res) => {
    try {
        const { category, sort } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        let experiences = await Experience.find(query);
        
        if (sort === 'price-low') {
            experiences.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            experiences.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            experiences.sort((a, b) => b.rating - a.rating);
        }
        
        res.json({ success: true, data: experiences });
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports.getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        
        if (!experience) {
            return res.status(404).json({ success: false, message: 'Experience not found' });
        }
        
        res.json({ success: true, data: experience });
    } catch (error) {
        console.error('Error fetching experience:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
