// AI Generation Service - Gemini API Integration

const axios = require('axios');

// Gemini API Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Generate AI-powered itinerary using Google Gemini
 * Falls back to rule-based system if API fails
 */
module.exports.generateAIItinerary = async (options) => {
    const { destination, days, month, style, travelType, budget, pace, name, email, phone } = options;

    // If no API key, use rule-based fallback
    if (!GEMINI_API_KEY) {
        console.log('⚠️ GEMINI_API_KEY not found. Using rule-based itinerary.');
        return null; // Will fall back to rule-based system
    }

    try {
        // Create structured prompt for JSON response
        const prompt = `
You are an expert Indian travel planner creating a personalized itinerary.

Create a realistic ${days}-day travel itinerary for ${destination}, India, strictly within the user's budget and preferences.

USER PROFILE (STRICT CONSTRAINTS):
- Traveler type: ${travelType || "Solo"}
- Travel style: ${Array.isArray(style) ? style.join(", ") : style}
- Budget range: ${budget || "Mid-range"} (THIS IS A HARD LIMIT)
- Travel pace: ${pace || "Balanced"}
- Travel month: ${month}

BUDGET RULES (VERY IMPORTANT):
- The itinerary MUST stay within the given budget range.
- If budget is "Low" or "Budget", avoid luxury hotels, premium transport, or expensive experiences.
- If budget is "Mid-range", suggest 3-star or equivalent hotels only.
- If budget is "Luxury", premium hotels and experiences are allowed.
- BudgetEstimate MUST realistically match the hotel type and activities.
- Do NOT suggest experiences that exceed the user's budget.

PLANNING RULES:
- Activities must be geographically practical and time-efficient.
- Daily plans should feel achievable, not rushed.
- Hotel recommendations must match the budget category.
- Meals should follow typical Indian travel patterns.
- Tips should help travelers save money when possible.

IMPORTANT RESPONSE RULES (STRICT):
- Respond ONLY with valid JSON.
- Do NOT include markdown, explanations, or extra text.
- Do NOT change key names or structure.
- Ensure all strings are properly escaped.
- Keep day summaries under 60 characters.

REQUIRED JSON FORMAT (DO NOT MODIFY):

{
  "destination": "${destination}",
  "days": ${days},
  "month": "${month}",
  "budgetEstimate": "₹XX,XXX - ₹XX,XXX",
  "hotelType": "Hotel type recommendation",
  "itinerary": {
    "Day 1": {
      "summary": "Brief one-line summary of the day (max 60 characters)",
      "activity": "Detailed activity description",
      "hotel": "Hotel recommendation",
      "meals": "Breakfast, Lunch, Dinner"
    },
    "Day 2": {
      "summary": "Brief one-line summary of the day (max 60 characters)",
      "activity": "Detailed activity description",
      "hotel": "Hotel recommendation",
      "meals": "Breakfast, Lunch, Dinner"
    }
  },
  "highlights": [
    "Highlight 1",
    "Highlight 2",
    "Highlight 3",
    "Highlight 4",
    "Highlight 5"
  ],
  "tips": [
    "Practical tip 1",
    "Practical tip 2",
    "Practical tip 3"
  ]
}
`;


        // Call Gemini API
        const response = await axios.post(
            `${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        // Extract text from Gemini response
        if (!response.data.candidates || !response.data.candidates[0].content.parts[0].text) {
            throw new Error('Invalid Gemini response format');
        }

        const content = response.data.candidates[0].content.parts[0].text.trim();
        
        // Remove markdown code blocks if present
        const jsonString = content
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        const plan = JSON.parse(jsonString);

        console.log('✅ AI plan generated successfully for', destination, 'using Gemini');
        return plan;

    } catch (error) {
        console.error('❌ Error calling Gemini API:', error.message);
        console.log('🔄 Falling back to rule-based itinerary...');
        return null; // Fall back to rule-based system
    }
};

/**
 * Validate AI response format
 */
module.exports.validateAIPlan = (plan) => {
    if (!plan) return false;

    const requiredFields = ['destination', 'days', 'budgetEstimate', 'hotelType', 'itinerary', 'highlights'];
    return requiredFields.every(field => field in plan);
};

/**
 * Format AI response for frontend
 */
module.exports.formatAIPlan = (plan) => {
    if (!plan) return null;

    // Ensure itinerary is properly formatted
    const formattedItinerary = {};
    if (typeof plan.itinerary === 'object') {
        Object.entries(plan.itinerary).forEach(([key, value]) => {
            formattedItinerary[key] = {
                activity: value.activity || 'Activity to be planned',
                hotel: value.hotel || 'Hotel to be finalized',
                meals: value.meals || 'Meals included'
            };
        });
    }

    

    result= {
        destination: plan.destination || 'Destination',
        days: plan.days || 1,
        month: plan.month || 'Month',
        budgetEstimate: plan.budgetEstimate || '₹25,000 - ₹50,000',
        hotelType: plan.hotelType || '3-4 star Hotels',
        itinerary: formattedItinerary,
        highlights: Array.isArray(plan.highlights) ? plan.highlights : ['Experience the destination', 'Local adventures', 'Cultural immersion'],
        tips: Array.isArray(plan.tips) ? plan.tips : [],
        whatsappLink: `https://wa.me/919876543210?text=Hi, I'm interested in a ${plan.days}-day trip to ${plan.destination}. Can you help me plan?`
    };

    return result;
};

/**
 * Check if Gemini API is configured
 */
module.exports.isAIConfigured = () => {
    return !!GEMINI_API_KEY;
};

/**
 * Get API configuration status
 */
module.exports.getAPIStatus = () => {
    return {
        geminiConfigured: !!GEMINI_API_KEY,
        model: GEMINI_MODEL,
        status: GEMINI_API_KEY ? 'Ready' : 'Not configured'
    };
};
