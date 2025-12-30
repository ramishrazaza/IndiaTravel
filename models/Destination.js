const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    region: {
        type: String,
        enum: ['North', 'South', 'East', 'West', 'Northeast'],
        required: true
    },
    description: String,    
    shortDescription: String,
    image: String,
    bestTimeToVisit: String,
    temperature: String,
    attractions: [String],
    highlights: [String],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 4.5
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Destination', destinationSchema);
