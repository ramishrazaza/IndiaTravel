const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Spiritual', 'Adventure', 'Beach', 'Heritage'],
        required: true
    },
    description: String,
    image: String,
    duration: String,
    price: Number,
    difficulty: {
        type: String,
        enum: ['Easy', 'Moderate', 'Hard'],
        default: 'Moderate'
    },
    activities: [String],
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

module.exports = mongoose.model('Experience', experienceSchema);
