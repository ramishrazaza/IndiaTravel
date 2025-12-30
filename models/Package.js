const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    duration: String,
    price: Number,
    description: String,
    image: String,
    itinerary: [String],
    inclusions: [String],
    exclusions: [String],
    groupSize: String,
    category: {
        type: String,
        default: 'Adventure'
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Moderate', 'Hard'],
        default: 'Moderate'
    },
    bestSeason: [String],
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
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Package', packageSchema);
