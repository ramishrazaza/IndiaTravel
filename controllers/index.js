const Destination = require("../models/Destination");
const Experience = require("../models/Experience");
const Blog = require("../models/Blog");
const Testimonial = require("../models/Testimonial");
const Package = require("../models/Package");

module.exports.renderHomePage = async (req, res) => {
  try {
    const destinations = await Destination.find().limit(7);
    const experiences = await Experience.find({ featured: true }).limit(4);
    const blogs = await Blog.find({ featured: true }).limit(3);
    const testimonials = await Testimonial.find({ featured: true }).limit(4);
    const packages = await Package.find({ featured: true }).limit(2);

    res.render("pages/index", {
      destinations,
      experiences,
      blogs,
      testimonials,
      packages,
    });
  } catch (error) {
    console.error("Error rendering homepage:", error);
    res.status(500).render("error", { message: "Failed to load homepage" });
  }
};

module.exports.renderPlanTripPage = async (req, res) => {
  try {
    const destinations = await Destination.find().select("name region");
    const experiences = await Experience.find().select("title category");
    const packages = await Package.find().select("name destination");

    // Define travel planning options
    const travelStyles = [
      { label: "Adventure", icon: "fa-mountain" },
      { label: "Culture", icon: "fa-landmark" },
      { label: "Relaxation", icon: "fa-spa" },
      { label: "Food & Wine", icon: "fa-utensils" },
    ];

    const accommodationTypes = [
      { label: "Luxury Hotels", icon: "fa-crown" },
      { label: "Budget Hotels", icon: "fa-bed" },
      { label: "Resorts", icon: "fa-tree" },
      { label: "Homestays", icon: "fa-house" },
    ];

    const transportModes = [
      { label: "Flight", icon: "fa-plane" },
      { label: "Train", icon: "fa-train" },
      { label: "Car", icon: "fa-car" },
      { label: "Bus", icon: "fa-bus" },
    ];

    const interests = [
      { label: "History & Heritage", icon: "fa-history" },
      { label: "Nature & Wildlife", icon: "fa-leaf" },
      { label: "Spirituality", icon: "fa-om" },
      { label: "Adventure Sports", icon: "fa-person-hiking" },
      { label: "Photography", icon: "fa-camera" },
      { label: "Local Cuisine", icon: "fa-drumstick-bite" },
    ];

    const testimonials = [
      {
        name: "Sarah Johnson",
        location: "USA",
        rating: 5,
        image: "https://via.placeholder.com/80",
        quote:
          "An unforgettable experience! The team made everything seamless and magical.",
      },
      {
        name: "Michael Chen",
        location: "Singapore",
        rating: 5,
        image: "https://via.placeholder.com/80",
        quote:
          "Best trip of my life. Highly recommended for anyone seeking authentic India.",
      },
      {
        name: "Emma Wilson",
        location: "UK",
        rating: 4.5,
        image: "https://via.placeholder.com/80",
        quote:
          "Great guides, comfortable accommodations, and incredible memories.",
      },
    ];

    res.render("pages/plan-trip", {
      destinations,
      experiences,
      packages,
      travelStyles,
      accommodationTypes,
      transportModes,
      interests,
      testimonials,
    });
  } catch (error) {
    console.error("Error rendering plan trip page:", error);
    res
      .status(500)
      .render("error", { message: "Failed to load plan trip page" });
  }
};

module.exports.renderBookNowPage = async (req, res) => {
  try {
    const packages = await Package.find().limit(6);
    const destinations = await Destination.find().select("name");

    // Format destination names for dropdown
    const destinationNames = destinations.map((d) => d.name);

    // Define months
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Define budget ranges
    const budgetRanges = [
      "₹30,000 - ₹50,000",
      "₹50,000 - ₹1,00,000",
      "₹1,00,000 - ₹2,00,000",
      "₹2,00,000 - ₹5,00,000",
      "₹5,00,000+",
    ];

    // Format popular packages with required fields
    const popularPackages = packages.map((pkg) => ({
      name: pkg.name,
      image: pkg.image || "https://via.placeholder.com/400x300",
      duration: pkg.duration || "N/A",
      price:
        typeof pkg.price === "number"
          ? "₹" + pkg.price.toLocaleString()
          : pkg.price,
      highlights:
        pkg.inclusions && Array.isArray(pkg.inclusions)
          ? pkg.inclusions.slice(0, 3)
          : ["Expert guides", "Accommodation", "Meals"],
    }));

    res.render("pages/book-now", {
      packages: popularPackages,
      destinations: destinationNames,
      months,
      budgetRanges,
      popularPackages,
    });
  } catch (error) {
    console.error("Error rendering book now page:", error);
    res.status(500).render("error", { message: "Failed to load booking page" });
  }
};

// API Controllers
module.exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.searchAll = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.json({
        destinations: [],
        experiences: [],
        blogs: [],
        packages: [],
        testimonials: [],
      });
    }

    const searchRegex = { $regex: q, $options: "i" };

    const destinations = await Destination.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { region: searchRegex },
      ],
    }).limit(5);

    const experiences = await Experience.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ],
    }).limit(5);

    const blogs = await Blog.find({
      $or: [
        { title: searchRegex },
        { excerpt: searchRegex },
        { content: searchRegex },
        { category: searchRegex },
      ],
    }).limit(5);

    const packages = await Package.find({
      $or: [{ name: searchRegex }, { description: searchRegex }],
    }).limit(5);

    const testimonials = await Testimonial.find({
      $or: [
        { name: searchRegex },
        { location: searchRegex },
        { text: searchRegex },
      ],
    }).limit(5);

    res.json({
      destinations,
      experiences,
      blogs,
      packages,
      testimonials,
    });
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== TRIP BOOKING API ====================
module.exports.submitTripBooking = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      travelers,
      budget,
      travelStyle,
      accommodation,
      transport,
      interests,
      name,
      email,
      phone,
      message,
    } = req.body;

    // Validate required fields
    if (
      !destination ||
      !startDate ||
      !endDate ||
      !travelers ||
      !budget ||
      !name ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
        errors: {
          destination: !destination ? "Destination is required" : null,
          startDate: !startDate ? "Start date is required" : null,
          endDate: !endDate ? "End date is required" : null,
          travelers: !travelers ? "Number of travelers is required" : null,
          budget: !budget ? "Budget is required" : null,
          name: !name ? "Name is required" : null,
          phone: !phone ? "Phone is required" : null,
        },
      });
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }
    }

    // Validate date logic
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Parse destination (it comes as string from form)
    let destinationData = destination;
    try {
      if (typeof destination === "string" && destination.includes("{")) {
        destinationData = JSON.parse(destination);
      }
    } catch (e) {
      destinationData = { name: destination, region: "North" };
    }

    // Create new trip booking
    const TripBooking = require("../models/TripBooking");

    const booking = new TripBooking({
      destination:
        typeof destinationData === "string"
          ? destinationData
          : destinationData.name || destination,
      travelMonth: startDate,
      endDate: endDate,
      travelers: parseInt(travelers) || 1,
      budgetRange: budget,
      travelStyles: Array.isArray(travelStyle)
        ? travelStyle
        : travelStyle
        ? [travelStyle]
        : [],
      accommodationType: accommodation || "Not specified",
      transportMode: transport || "Not specified",
      interests: Array.isArray(interests)
        ? interests
        : interests
        ? [interests]
        : [],
      name: name.trim(),
      email: email
        ? email.trim().toLowerCase()
        : "not-provided@indiatravel.local",
      phone: phone.trim(),
      specialRequests: message || "",
      status: "pending",
      priority: "medium",
      source: "website",
    });

    // Save to database
    await booking.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message:
        "Your trip booking request has been submitted successfully! Our team will contact you within 24 hours.",
      bookingId: booking._id,
      booking: {
        id: booking._id,
        name: booking.name,
        email: booking.email,
        destination: booking.destination,
        travelMonth: booking.travelMonth,
        travelers: booking.travelers,
        status: booking.status,
        createdAt: booking.createdAt,
      },
    });
  } catch (error) {
    console.error("Error submitting trip booking:", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while processing your booking. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// ==================== AI TRIP PLANNER ====================
module.exports.renderAIPlannerPage = async (req, res) => {
  try {
    const destinations = await Destination.find().select("name");
    const destinationNames = destinations.map((d) => d.name);

    // Define months
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Travel style options
    const travelStyles = [
      { id: "spiritual", label: "Spiritual", icon: "fa-om" },
      { id: "adventure", label: "Adventure", icon: "fa-mountain" },
      { id: "nature", label: "Nature", icon: "fa-tree" },
      { id: "luxury", label: "Luxury", icon: "fa-crown" },
      { id: "budget", label: "Budget", icon: "fa-backpack" },
      { id: "culture", label: "Culture", icon: "fa-landmark" },
      { id: "food", label: "Food & Wine", icon: "fa-utensils" },
      { id: "family", label: "Family", icon: "fa-people-group" },
    ];

    // Travel type options
    const travelTypes = [
      { id: "solo", label: "Solo", icon: "fa-person-hiking" },
      { id: "couple", label: "Couple", icon: "fa-heart" },
      { id: "family", label: "Family", icon: "fa-house" },
    ];

    // Budget ranges
    const budgetRanges = [
      { id: "budget", label: "₹5,000 - ₹15,000 per day" },
      { id: "mid", label: "₹15,000 - ₹35,000 per day" },
      { id: "premium", label: "₹35,000 - ₹70,000 per day" },
      { id: "luxury", label: "₹70,000+ per day" },
    ];

    // Travel pace
    const travelPaces = [
      { id: "relaxed", label: "Relaxed" },
      { id: "balanced", label: "Balanced" },
      { id: "fast", label: "Fast Paced" },
    ];

    res.render("pages/ai-trip-planner", {
      destinations: destinationNames,
      months,
      travelStyles,
      travelTypes,
      budgetRanges,
      travelPaces,
    });
  } catch (error) {
    console.error("Error rendering AI planner page:", error);
    res.status(500).render("error", { message: "Failed to load AI planner" });
  }
};

module.exports.generateAIPlan = async (req, res) => {
  try {
    let {
      destination,
      days,
      month,
      style,
      travelType,
      budget,
      pace,
      name,
      email,
      phone,
    } = req.body;

    // Convert numeric budget to enum value
    if (typeof budget === "string" && !isNaN(budget)) {
      const budgetAmount = parseInt(budget);
      if (budgetAmount <= 30000) {
        budget = "budget";
      } else if (budgetAmount <= 100000) {
        budget = "mid";
      } else if (budgetAmount <= 200000) {
        budget = "luxury";
      } else {
        budget = "premium";
      }
    }

    // Validate input
    const aiPlanner = require("../services/aiPlanner.service");
    const validation = aiPlanner.validatePlanInput({
      destination,
      days,
      month,
      name,
      email,
      phone,
    });

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        errors: validation.errors,
      });
    }

    let plan = null;
    let planSource = "rule-based"; // Track which system generated the plan

    // Try Gemini AI first
    const aiGeneration = require("../services/aiGeneration.service");
    if (aiGeneration.isAIConfigured()) {
      console.log("🤖 Attempting to generate plan using Google Gemini API...");
      const aiPlan = await aiGeneration.generateAIItinerary({
        destination,
        days: parseInt(days),
        month,
        style: Array.isArray(style) ? style : [style],
        budget,
        travelType,
        pace,
        name,
        email,
        phone,
      });

      if (aiPlan && aiGeneration.validateAIPlan(aiPlan)) {
        plan = aiGeneration.formatAIPlan(aiPlan);
        planSource = "gemini";
        console.log("✅ Plan generated with Google Gemini");
      }
    }

    // Fallback to rule-based system if AI fails or not configured
    if (!plan) {
      console.log("🔄 Falling back to rule-based itinerary...");
      plan = aiPlanner.generatePlan({
        destination,
        days: parseInt(days),
        month,
        style: Array.isArray(style) ? style : [style],
        budget,
        travelType,
        pace,
      });
      planSource = "rule-based";
    }

    // Save to database (optional - for tracking)
    try {
      const AIPlan = require("../models/AIPlan");
      const aiPlanRecord = new AIPlan({
        name,
        email,
        phone,
        destination,
        days: parseInt(days),
        month,
        style: style ? (Array.isArray(style) ? style : [style]) : [],
        travelType,
        budget,
        pace,

        budgetEstimate: plan.budgetEstimate,
        hotelType: plan.hotelType,
        itinerary: plan.itinerary || {}, // ✅ FIXED
        highlights: plan.highlights || [],
        tips: plan.tips || [],

        accommodation: plan.accommodation || "",
        transport: plan.transport || "", // ✅ FIXED

        aiResponse: planSource === "gemini" ? JSON.stringify(plan) : null,
        planSource,
      });
        await aiPlanRecord.save();
      console.log("✅ AI plan saved to database successfully");
    } catch (dbError) {
      console.log(
        "Note: Could not save AI plan to database -",
        dbError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: `Your ${
        planSource === "gemini" ? "AI-powered" : "personalized"
      } itinerary has been generated!`,
      plan,
      source: planSource,
    });
  } catch (error) {
    console.error("Error generating AI plan:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate itinerary. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
