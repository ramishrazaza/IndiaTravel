# AI Trip Planner - Setup Guide

## Overview
The India Travel AI Trip Planner now supports **real AI integration** with fallback to rule-based itineraries. This means:
- ✅ Real AI generates personalized itineraries when API is configured
- ✅ Rule-based system handles requests when API is unavailable
- ✅ Users get intelligent travel plans either way

---

## Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get OpenAI API Key
1. Visit https://platform.openai.com
2. Sign up or log in
3. Go to **API keys** section
4. Click **Create new secret key**
5. Copy the key

### Step 3: Add API Key to .env
Edit `.env` file and replace:
```env
OPENAI_API_KEY=sk-your_actual_key_here
OPENAI_MODEL=gpt-3.5-turbo
```

### Step 4: Restart Server
```bash
npm start
```

---

## How It Works

### 🤖 With AI API Configured
1. User fills the 4-step form
2. Request goes to `/api/ai/plan`
3. Controller checks if OpenAI is configured
4. If yes: Calls OpenAI API with detailed prompt
5. OpenAI returns structured JSON itinerary
6. Frontend displays personalized AI plan

### 📋 Fallback to Rule-Based
1. If OpenAI API key missing or API fails
2. Uses pre-built `aiPlanner.service.js` database
3. Provides instant itinerary from rules
4. Same user experience, just faster

### 💾 Database Tracking (Optional)
Plans are saved to MongoDB with metadata:
- Source: 'openai' or 'rule-based'
- User preferences
- Generated itinerary
- Timestamp for analytics

---

## Testing the AI

### Test Without AI (Rule-Based)
1. Leave `.env` without OPENAI_API_KEY
2. Visit `/ai-trip-planner`
3. Fill the form
4. Gets rule-based itinerary instantly

### Test With AI (OpenAI)
1. Add valid OpenAI API key to `.env`
2. Restart server
3. Visit `/ai-trip-planner`
4. Fill the form
5. Watch the "AI is crafting..." loading animation
6. Get personalized AI itinerary

---

## API Prompt Engineering

The prompt sent to OpenAI is structured to ensure:
- ✅ Valid JSON response (no markdown)
- ✅ Day-wise itinerary
- ✅ Budget estimates
- ✅ Hotel recommendations
- ✅ Highlights & practical tips

**Example prompt for Rajasthan (Luxury) for 3 days:**
```
Create a detailed 3-day travel itinerary for Rajasthan with the following preferences:

User Profile:
- Traveler type: Couple
- Travel style: luxury, culture
- Budget range: premium
- Travel pace: Balanced
- Travel month: November

Requirements:
1. Generate a day-wise itinerary with specific activities
2. Include hotel recommendations based on budget
3. Provide budget estimates
4. List key highlights
5. Add practical tips
```

---

## Response Format

Both AI and rule-based systems return JSON:
```json
{
  "destination": "Rajasthan",
  "days": 3,
  "month": "November",
  "budgetEstimate": "₹60,000 - ₹90,000",
  "hotelType": "5-star Heritage Hotels",
  "itinerary": {
    "Day 1": {
      "activity": "Arrive Jaipur. Check into luxury hotel. Visit City Palace...",
      "hotel": "The Oberoi Rajvilas, Jaipur",
      "meals": "Lunch, Dinner"
    },
    "Day 2": {...},
    "Day 3": {...}
  },
  "highlights": [
    "Taj Mahal sunrise visit",
    "Palace exploration",
    ...
  ],
  "tips": [
    "Best time is November-March",
    "Hire a private guide",
    ...
  ]
}
```

---

## Error Handling

### What if OpenAI API fails?
- Logs the error
- Falls back to rule-based system automatically
- User still gets a valid itinerary
- Frontend doesn't need changes

### What if rate limit is hit?
- OpenAI returns 429 error
- System falls back to rule-based
- User sees: "Plan generated using our expert rules"

### What if API key is invalid?
- System catches auth error
- Falls back immediately
- No user-facing errors

---

## Performance

| Scenario | Time | Source |
|----------|------|--------|
| Rule-based (fast) | 500ms | Database |
| OpenAI (fast) | 2-3s | API |
| OpenAI (slow) | 5-10s | API |
| Fallback on error | 500ms | Database |

---

## Costs

### OpenAI Pricing
- **gpt-3.5-turbo**: ~$0.0015 per itinerary
- For 100 plans/day: ~$0.15/day = ~$45/month
- gpt-4 would be 10x more expensive

### Optimization
To reduce costs:
1. Cache results for popular destinations
2. Use gpt-3.5-turbo (cheaper than gpt-4)
3. Implement cooldown to prevent duplicate requests
4. Save successful AI plans in DB to reuse

---

## Production Deployment

### Environment Variables (Heroku/Production)
```
OPENAI_API_KEY=sk-xxxxx (add in config vars)
OPENAI_MODEL=gpt-3.5-turbo
MONGODB_URI=your_mongodb_atlas_uri
NODE_ENV=production
```

### Rate Limiting
Add to app.js to prevent API abuse:
```javascript
const rateLimit = require('express-rate-limit');

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per 15 minutes
});

app.post('/api/ai/plan', aiLimiter, controller.generateAIPlan);
```

### Monitoring
Track API usage:
1. Check OpenAI dashboard for costs
2. Log plan generation source (AI vs rule-based)
3. Monitor response times
4. Alert on repeated fallback events

---

## Troubleshooting

### "OPENAI_API_KEY not found. Using rule-based"
- **Issue**: API key not in .env or not loaded
- **Fix**: Restart server after adding to .env

### "Error calling OpenAI API"
- **Issue**: Invalid key, network error, or API down
- **Fix**: Check key is valid, verify internet connection, check OpenAI status

### "SyntaxError: Unexpected token"
- **Issue**: OpenAI returned non-JSON (probably error)
- **Fix**: Check API key quota and rate limits

### Plans taking too long to generate
- **Issue**: OpenAI API is slow or overloaded
- **Fix**: Implement request timeout or queue system

---

## Advanced: Implement Caching

To avoid repeated API calls for same destination/duration:

```javascript
// In controllers/index.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 86400 }); // 24 hours

const cacheKey = `${destination}-${days}-${style.join('-')}`;
const cached = cache.get(cacheKey);

if (cached) {
  return res.json({ success: true, plan: cached, source: 'cache' });
}

// ... generate plan ...
cache.set(cacheKey, plan);
```

---

## Next Steps

1. ✅ Add OpenAI API key to .env
2. ✅ Run `npm install` to get axios
3. ✅ Restart server
4. ✅ Test at `/ai-trip-planner`
5. ✅ Monitor plan generation (AI vs rule-based)
6. ✅ Set up cost alerts on OpenAI dashboard

---

## Questions?

- **OpenAI Docs**: https://platform.openai.com/docs
- **API Keys**: https://platform.openai.com/api-keys
- **Pricing**: https://openai.com/pricing
- **Models**: https://platform.openai.com/docs/models

Enjoy AI-powered travel planning! 🚀
