const Package = require('../models/Package');

module.exports.renderPackagesPage = async (req, res) => {
    try {
        const { destination, sort } = req.query;
        let query = {};
        
        if (destination && destination !== 'all') {
            query.destination = destination;
        }
        
        let packages = await Package.find(query);
        
        if (sort === 'price-low') {
            packages.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            packages.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            packages.sort((a, b) => b.rating - a.rating);
        }
        
        const uniqueDestinations = await Package.distinct('destination');
        
        res.render('pages/packages', { 
            packages,
            destinations: uniqueDestinations,
            selectedDestination: destination || 'all'
        });
    } catch (error) {
        console.error('Error rendering packages page:', error);
        res.status(500).render('error', { message: 'Failed to load packages' });
    }
};

module.exports.renderPackageDetailPage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const package_item = await Package.findById(id);
        
        if (!package_item) {
            return res.status(404).render('error', { message: 'Package not found' });
        }
        
        const relatedPackages = await Package.find({
            destination: package_item.destination,
            _id: { $ne: id }
        }).limit(3);
        
        res.render('pages/package', { 
            package: package_item,
            relatedPackages
        });
    } catch (error) {
        console.error('Error rendering package detail page:', error);
        res.status(500).render('error', { message: 'Failed to load package details' });
    }
};

// API Controllers
module.exports.getAllPackages = async (req, res) => {
    try {
        const { destination, sort } = req.query;
        let query = {};
        
        if (destination && destination !== 'all') {
            query.destination = destination;
        }
        
        let packages = await Package.find(query);
        
        if (sort === 'price-low') {
            packages.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            packages.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            packages.sort((a, b) => b.rating - a.rating);
        }
        
        res.json({ success: true, data: packages });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports.getPackageById = async (req, res) => {
    try {
        const package_item = await Package.findById(req.params.id);
        
        if (!package_item) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }
        
        res.json({ success: true, data: package_item });
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
