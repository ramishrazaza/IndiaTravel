const mongoose = require('mongoose');

const tripBookingSchema = new mongoose.Schema({
    // Booking Details
    destination: {
        type: String,
        required: true,
        trim: true
    },
    travelMonth: {
        type: String,
        required: true
    },
    travelers: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    budgetRange: {
        type: String,
        required: true
    },
    
    // Travel Preferences
    travelStyles: [String], // Adventure, Culture, Relaxation, etc.
    accommodationType: String,
    transportMode: String,
    interests: [String], // History, Nature, Food, etc.
    
    // Contact Details
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    
    // Additional Info
    specialRequests: String,
    
    // Status Tracking
    status: {
        type: String,
        enum: ['pending', 'contacted', 'quoted', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    
    // System Fields
    source: {
        type: String,
        default: 'website'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
tripBookingSchema.pre('save', function() {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('TripBooking', tripBookingSchema);
