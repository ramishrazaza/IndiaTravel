const Destination = require('../models/Destination');

/**
 * Get destinations with filtering and sorting
 * @param {Object} options - { region, sort }
 * @returns {Promise<Array>}
 */
exports.getDestinations = async ({ region, sort } = {}) => {
    const query = region && region !== 'all' ? { region } : {};

    const sortOption =
        sort === 'rating' ? { rating: -1 } :
        sort === 'name' ? { name: 1 } :
        {};

    return Destination.find(query).sort(sortOption);
};

/**
 * Get single destination by ID
 * @param {String} id - Destination ID
 * @returns {Promise<Object>}
 */
exports.getDestinationById = async (id) => {
    // Validate if id is a valid MongoDB ObjectId format
    if (!id || typeof id !== 'string' || id.length !== 24) {
        const error = new Error('Invalid destination ID format');
        error.statusCode = 400;
        throw error;
    }

    try {
        const destination = await Destination.findById(id);
        
        if (!destination) {
            const error = new Error('Destination not found');
            error.statusCode = 404;
            throw error;
        }
        
        return destination;
    } catch (error) {
        // Re-throw with proper status code if it's already our error
        if (error.statusCode) throw error;
        // Otherwise it's a MongoDB cast error
        const err = new Error('Invalid destination ID');
        err.statusCode = 400;
        throw err;
    }
};

/**
 * Get related destinations (same region, limit 3)
 * @param {String} destinationId - Current destination ID
 * @param {String} region - Region name
 * @returns {Promise<Array>}
 */
exports.getRelatedDestinations = async (destinationId, region) => {
    return Destination.find({
        region,
        _id: { $ne: destinationId }
    }).limit(3);
};

/**
 * Get destination by name (for slug)
 * @param {String} name - Destination name
 * @param {String} region - Region name
 * @returns {Promise<Object>}
 */

exports.getDestinationByNameAndRegion = async (name, region) => {
    const destination = await Destination.findOne({ 
        name: new RegExp(`^${name}$`, 'i'),
        region: new RegExp(`^${region}$`, 'i')
    });
    if (!destination) {
        const error = new Error('Destination not found');
        error.statusCode = 404;
        throw error;
    }
    return destination;
}

/**
 * Get destination by name (for slug)
 * @param {String} name - Destination name
 * @returns {Promise<Object>}
 */
exports.getDestinationByName = async (name) => {
    const destination = await Destination.findOne({ name: new RegExp(`^${name}$`, 'i') });
    
    if (!destination) {
        const error = new Error('Destination not found');
        error.statusCode = 404;
        throw error;
    }
    
    return destination;
};

/**
 * Search destinations
 * @param {String} query - Search query
 * @returns {Promise<Array>}
 */
exports.searchDestinations = async (query) => {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const searchRegex = { $regex: query, $options: 'i' };

    return Destination.find({
        $or: [
            { name: searchRegex },
            { description: searchRegex },
            { region: searchRegex }
        ]
    }).limit(5);
};
