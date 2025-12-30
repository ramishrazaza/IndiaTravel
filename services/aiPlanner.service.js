// AI Trip Planner Service - Rule-based itinerary generation

const itineraryDatabase = {
    'Taj Mahal': {
        luxury: {
            2: {
                budgetEstimate: '₹40,000 - ₹60,000',
                hotelType: '5-star Hotels',
                highlights: [
                    'Taj Mahal sunrise visit',
                    'Agra Fort exploration',
                    'Mughal gardens',
                    'Local handicraft shopping',
                    'Fine dining experience'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'Arrive in Agra. Check into luxury hotel. Evening visit to Mehtab Bagh for sunset view of Taj Mahal.',
                        hotel: '5-star resort with river view',
                        meals: 'Lunch, Dinner'
                    },
                    'Day 2': {
                        activity: 'Early morning Taj Mahal sunrise tour. Visit Agra Fort. Afternoon at local markets. Evening departure.',
                        hotel: '5-star resort',
                        meals: 'Breakfast, Lunch, Dinner'
                    }
                }
            },
            3: {
                budgetEstimate: '₹50,000 - ₹80,000',
                hotelType: '5-star Hotels',
                highlights: [
                    'Taj Mahal sunrise & sunset views',
                    'Agra Fort deep exploration',
                    'Mughal gardens & heritage sites',
                    'Luxury spa & wellness',
                    'Fine dining & wine tasting',
                    'Private guide experience'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'Arrive in Agra. Check into luxury hotel. Wellness spa session. Evening at Mehtab Bagh.',
                        hotel: '5-star luxury resort',
                        meals: 'Lunch, Dinner (fine dining)'
                    },
                    'Day 2': {
                        activity: 'Early Taj Mahal sunrise. Private guide tour of Agra Fort. Lunch at heritage restaurant. Afternoon shopping.',
                        hotel: '5-star luxury resort',
                        meals: 'Breakfast, Lunch, Dinner (wine pairing)'
                    },
                    'Day 3': {
                        activity: 'Taj Mahal sunset view. Local heritage experiences. Farewell dinner. Evening departure.',
                        hotel: '5-star luxury resort',
                        meals: 'Breakfast, Lunch, Dinner'
                    }
                }
            }
        },
        budget: {
            2: {
                budgetEstimate: '₹8,000 - ₹12,000',
                hotelType: '2-3 star Hotels',
                highlights: [
                    'Taj Mahal visit',
                    'Agra Fort',
                    'Local market exploration',
                    'Street food experience',
                    'Budget-friendly activities'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'Arrive in Agra. Budget hotel check-in. Local market visit. Evening at public garden.',
                        hotel: '2-3 star hotel',
                        meals: 'Lunch, Dinner'
                    },
                    'Day 2': {
                        activity: 'Taj Mahal visit. Agra Fort tour. Street food tasting. Evening departure.',
                        hotel: '2-3 star hotel',
                        meals: 'Breakfast, Lunch, Street snacks, Dinner'
                    }
                }
            },
            3: {
                budgetEstimate: '₹12,000 - ₹18,000',
                hotelType: '2-3 star Hotels & Homestays',
                highlights: [
                    'Taj Mahal (sunrise or sunset)',
                    'Agra Fort exploration',
                    'Local street food tour',
                    'Market shopping',
                    'Budget-friendly sightseeing',
                    'Local homestay experience'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'Arrive in Agra. Homestay check-in. Explore local markets. Evening stroll.',
                        hotel: 'Budget hotel or homestay',
                        meals: 'Lunch, Dinner'
                    },
                    'Day 2': {
                        activity: 'Taj Mahal sunrise visit. Agra Fort tour. Local street food lunch. Afternoon rest.',
                        hotel: 'Budget hotel or homestay',
                        meals: 'Breakfast, Lunch (street food), Dinner'
                    },
                    'Day 3': {
                        activity: 'Local experiences. Market shopping. Departure.',
                        hotel: 'Budget hotel or homestay',
                        meals: 'Breakfast, Lunch, Dinner'
                    }
                }
            }
        }
    },
    'Kerala Backwaters': {
        luxury: {
            3: {
                budgetEstimate: '₹60,000 - ₹90,000',
                hotelType: '5-star Resorts & Houseboats',
                highlights: [
                    'Private houseboat experience',
                    'Backwater cruise',
                    'Ayurveda spa treatments',
                    'Beach resort luxury',
                    'Water sports & activities',
                    'Kerala cuisine dining'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'Arrive in Kochi. Beach resort check-in. Evening beach walk. Sunset cocktails.',
                        hotel: '5-star beach resort',
                        meals: 'Lunch, Dinner (seafood specialty)'
                    },
                    'Day 2': {
                        activity: 'Full day private houseboat cruise. Ayurveda spa session. Evening meditation.',
                        hotel: 'Luxury houseboat with amenities',
                        meals: 'Breakfast, Lunch (on boat), Dinner (shore dining)'
                    },
                    'Day 3': {
                        activity: 'Spa treatments. Beach resort. Water sports. Departure.',
                        hotel: '5-star beach resort',
                        meals: 'Breakfast, Lunch, Dinner'
                    }
                }
            },
            4: {
                budgetEstimate: '₹80,000 - ₹1,20,000',
                hotelType: 'Ultra-luxury Resorts & Premium Houseboats',
                highlights: [
                    'Premium houseboat with private chef',
                    'Ayurveda wellness package',
                    'Water villas experience',
                    'Private beach access',
                    'Cooking classes',
                    'Wildlife safari',
                    'Personal guide service'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'VIP arrival. Ultra-luxury resort check-in. Beach spa. Evening fine dining.',
                        hotel: 'Luxury 5-star beach villa',
                        meals: 'Lunch, Dinner (Michelin standard)'
                    },
                    'Day 2': {
                        activity: 'Private houseboat with chef. Cooking class. Backwater exploration.',
                        hotel: 'Premium houseboat',
                        meals: 'All meals prepared by private chef'
                    },
                    'Day 3': {
                        activity: 'Wildlife sanctuary visit. Ayurveda treatments. Evening sunset cruise.',
                        hotel: 'Luxury resort',
                        meals: 'Breakfast, Lunch, Dinner'
                    },
                    'Day 4': {
                        activity: 'Beach relaxation. Departure with memories.',
                        hotel: 'Luxury resort',
                        meals: 'Breakfast, Lunch, Dinner'
                    }
                }
            }
        },
        nature: {
            3: {
                budgetEstimate: '₹20,000 - ₹35,000',
                hotelType: 'Eco-resorts & Nature Lodges',
                highlights: [
                    'Backwater houseboat cruise',
                    'Bird watching',
                    'Jungle trek',
                    'Wildlife sanctuary visit',
                    'Local village experiences',
                    'Sunset viewing'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'Arrive in Kochi. Eco-resort check-in. Evening nature walk.',
                        hotel: 'Eco-friendly resort',
                        meals: 'Lunch, Dinner'
                    },
                    'Day 2': {
                        activity: 'Full day houseboat cruise. Bird watching. Village visits.',
                        hotel: 'Budget houseboat',
                        meals: 'Breakfast, Lunch, Dinner'
                    },
                    'Day 3': {
                        activity: 'Jungle trek. Wildlife sanctuary. Departure.',
                        hotel: 'Nature lodge',
                        meals: 'Breakfast, Lunch, Dinner'
                    }
                }
            }
        }
    },
    'Himalayan Mountains': {
        adventure: {
            4: {
                budgetEstimate: '₹35,000 - ₹55,000',
                hotelType: 'Mountain Lodges & Adventure Camps',
                highlights: [
                    'Trekking expeditions',
                    'Mountain peaks',
                    'River rafting',
                    'Paragliding',
                    'Local mountain villages',
                    'Panoramic views',
                    'Adventure activities'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'Arrive at base. Adventure camp check-in. Briefing & equipment.',
                        hotel: 'Mountain lodge',
                        meals: 'Lunch, Dinner'
                    },
                    'Day 2': {
                        activity: 'Trekking to base camp. Mountain views. Bonfire evening.',
                        hotel: 'Mountain lodge',
                        meals: 'Breakfast, Lunch, Dinner'
                    },
                    'Day 3': {
                        activity: 'River rafting adventure. Local village visit.',
                        hotel: 'Adventure camp',
                        meals: 'Breakfast, Lunch, Dinner'
                    },
                    'Day 4': {
                        activity: 'Final adventure activity. Departure.',
                        hotel: 'Mountain lodge',
                        meals: 'Breakfast, Lunch'
                    }
                }
            },
            5: {
                budgetEstimate: '₹50,000 - ₹80,000',
                hotelType: 'Premium Mountain Resorts',
                highlights: [
                    'Mountain peak trek',
                    'High altitude camping',
                    'Paragliding experience',
                    'Rock climbing',
                    'Helicopter tour',
                    'Expert guides',
                    'All-inclusive adventure'
                ],
                itinerary: {
                    'Day 1': {
                        activity: 'Arrival & acclimatization at base.',
                        hotel: 'Premium mountain resort',
                        meals: 'Breakfast, Lunch, Dinner'
                    },
                    'Day 2': {
                        activity: 'Mountain peak trek.',
                        hotel: 'High altitude camp',
                        meals: 'All meals provided'
                    },
                    'Day 3': {
                        activity: 'Rock climbing & adventure sports.',
                        hotel: 'Premium resort',
                        meals: 'All meals'
                    },
                    'Day 4': {
                        activity: 'Paragliding experience.',
                        hotel: 'Premium resort',
                        meals: 'All meals'
                    },
                    'Day 5': {
                        activity: 'Helicopter tour & departure.',
                        hotel: 'Premium resort',
                        meals: 'Breakfast'
                    }
                }
            }
        }
    }
};

// Default itinerary generator
function generateDefaultItinerary(destination, days, month) {
    const itinerary = {};
    const activities = [
        'Arrive and explore',
        'Local sightseeing and cultural experiences',
        'Adventure activities',
        'Market shopping and local cuisine',
        'Rest and relaxation',
        'Final exploration and departure'
    ];

    for (let i = 1; i <= parseInt(days); i++) {
        itinerary[`Day ${i}`] = {
            activity: activities[i - 1] || `Day ${i} activities`,
            hotel: 'To be finalized',
            meals: 'Breakfast, Lunch, Dinner'
        };
    }

    return itinerary;
}

// Main generate plan function
module.exports.generatePlan = (options) => {
    const { destination, days, month, style = [], budget, travelType, pace } = options;

    // Determine travel style priority
    const travelStyleMap = {
        'spiritual': 'spiritual',
        'adventure': 'adventure',
        'nature': 'nature',
        'luxury': 'luxury',
        'budget': 'budget',
        'culture': 'culture',
        'food': 'food',
        'family': 'family'
    };

    // Get primary style
    const primaryStyle = style && style.length > 0 
        ? travelStyleMap[style[0]] 
        : (budget === 'luxury' ? 'luxury' : 'adventure');

    // Look up in database
    if (itineraryDatabase[destination]) {
        const destData = itineraryDatabase[destination];
        
        if (destData[primaryStyle] && destData[primaryStyle][days]) {
            const plan = destData[primaryStyle][days];
            return {
                destination,
                days,
                month,
                ...plan,
                whatsappLink: generateWhatsAppLink(destination, days, month)
            };
        }
        
        // Fallback to any available plan for this destination
        for (const styleKey in destData) {
            if (destData[styleKey][days]) {
                const plan = destData[styleKey][days];
                return {
                    destination,
                    days,
                    month,
                    ...plan,
                    whatsappLink: generateWhatsAppLink(destination, days, month)
                };
            }
        }
    }

    // Fallback: Generate default plan
    return {
        destination,
        days,
        month,
        budgetEstimate: '₹25,000 - ₹50,000',
        hotelType: '3-4 star Hotels',
        itinerary: generateDefaultItinerary(destination, days, month),
        highlights: [
            `Explore ${destination}`,
            'Local experiences',
            'Cultural immersion',
            'Adventure activities',
            'Shopping and dining'
        ],
        whatsappLink: generateWhatsAppLink(destination, days, month)
    };
};

function generateWhatsAppLink(destination, days, month) {
    const message = `Hi, I'm interested in a ${days}-day trip to ${destination} in ${month}. Can you help me plan?`;
    const encoded = encodeURIComponent(message);
    return `https://wa.me/919876543210?text=${encoded}`;
}

// Validate input
module.exports.validatePlanInput = (data) => {
    const errors = [];
    
    if (!data.destination) errors.push('Destination is required');
    if (!data.days) errors.push('Days is required');
    if (!data.month) errors.push('Month is required');
    if (!data.name) errors.push('Name is required');
    if (!data.email) errors.push('Email is required');
    if (!data.phone) errors.push('Phone is required');
    
    return {
        valid: errors.length === 0,
        errors
    };
};
