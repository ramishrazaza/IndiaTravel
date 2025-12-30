const mongoose = require("mongoose");

const aiPlanSchema = new mongoose.Schema(
  {
    // User Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Trip Information
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: Number,
      required: true,
      min: 1,
      max: 365,
    },
    month: {
      type: String,
      required: true,
    },

    // User Preferences
    style: [String], // Travel style preferences (culture, adventure, etc.)
    travelType: {
      type: String,
      enum: ["solo", "couple", "family", "group"],
      default: "solo",
    },
    budget: {
      type: String,
      enum: ["budget", "mid", "luxury", "premium"],
      default: "mid",
    },
    pace: {
      type: String,
      enum: ["relaxed", "balanced", "fast"],
      default: "balanced",
    },

    // Generated Itinerary
    budgetEstimate: String,
    hotelType: String,

    itinerary: {
      type: Object,
    },

    highlights: [String],
    tips: [String],

    accommodation: String,
    transport: String,
    aiResponse: String,

    // System Information
    planSource: {
      type: String,
      enum: ["gemini", "rule-based"],
      default: "rule-based",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIPlan", aiPlanSchema);
