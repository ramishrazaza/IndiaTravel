const Package = require('../models/Package');
const destinationService = require('../services/destinationService');

/**
 * Render destinations listing page
 */
module.exports.renderDestinationsPage = async (req, res, next) => {
    try {
        const destinations = await destinationService.getDestinations(req.query);
        
        res.render('pages/destinations', { 
            destinations,
            selectedRegion: req.query.region || 'all'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Render destination detail page
 */
module.exports.renderDestinationDetailPage = async (req, res, next) => {
    try {
        const { name, region } = req.query;
        const normalizedRegion = (region && region.toLowerCase()) || "all";
        console.log("Region in controller:", normalizedRegion);
        const destination = await destinationService.getDestinationByNameAndRegion(name, normalizedRegion);

        const relatedDestinations = await destinationService.getRelatedDestinations(
            destination._id,
            destination.region
        );


        const packages = await Package.find({
            destination: destination.name
        }).limit(3);


        res.render('pages/destination', { 
            destination,
            relatedDestinations,
            packages
        });
    } catch (error) {
        next(error);
    }
};

/**
 * API: Get all destinations
 */
module.exports.getAllDestinations = async (req, res, next) => {
    try {
        const destinations = await destinationService.getDestinations(req.query);
        res.json({ success: true, data: destinations });
    } catch (error) {
        next(error);
    }
};

/**
 * API: Get single destination by ID
 */
module.exports.getDestinationById = async (req, res, next) => {
    try {
        const destination = await destinationService.getDestinationById(req.params.id);
        res.json({ success: true, data: destination });
    } catch (error) {
        next(error);
    }
};

