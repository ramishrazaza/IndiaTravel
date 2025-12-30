const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: String,
    category: {
        type: String,
        enum: ['Spiritual', 'Adventure', 'Beach', 'Heritage'],
        required: true
    },
    description: String,
    fullDescription: String,
    tagline: String,
    image: String,
    duration: String,
    price: String,
    difficulty: {
        type: String,
        enum: ['Easy', 'Moderate', 'Hard'],
        default: 'Moderate'
    },
    location: String,
    groupSize: {
        type: String,
        default: '2-6 people'
    },
    activities: [String],
    highlights: [String],
    itinerary: [{
        day: String,
        title: String,
        activities: [String]
    }],
    includes: [String],
    excludes: [String],
    bestSeason: String,
    physicalRequirement: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 4.5
    },
    reviews: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('Experience', experienceSchema);
