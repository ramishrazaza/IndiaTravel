const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'IndiaTravel Team'
    },
    category: {
        type: String,
        enum: ['Travel Tips', 'Destination Guide', 'Food & Culture', 'Budget Travel', 'Adventure'],
        required: true
    },
    content: String,
    excerpt: String,
    image: String,
    tags: [String],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 4.5
    },
    viewCount: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', blogSchema);
