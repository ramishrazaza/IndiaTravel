const Destination = require('../models/Destination');
const Experience = require('../models/Experience');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');
const Package = require('../models/Package');

// ==================== HOMEPAGE ====================
module.exports.renderHomePage = async (req, res) => {
    try {
        const destinations = await Destination.find().limit(7);
        const experiences = await Experience.find({ featured: true }).limit(4);
        const blogs = await Blog.find({ featured: true }).limit(3);
        const testimonials = await Testimonial.find({ featured: true }).limit(4);
        const packages = await Package.find({ featured: true }).limit(2);
        
        res.render('pages/index', {
            destinations,
            experiences,
            blogs,
            testimonials,
            packages
        });
    } catch (error) {
        console.error('Error rendering homepage:', error);
        res.status(500).render('error', { message: 'Failed to load homepage' });
    }
}

// ==================== DESTINATIONS ====================
module.exports.renderDestinationPage = async (req, res) => {
    try {
        const destination = await Destination.findOne({ name: 'Rajasthan' }) || 
                           await Destination.findOne().sort({ rating: -1 });
        
        if (!destination) {
            return res.status(404).render('error', { message: 'Destination not found' });
        }
        
        res.render('pages/destination', { destination });
    } catch (error) {
        console.error('Error rendering destination page:', error);
        res.status(500).render('error', { message: 'Failed to load destination' });
    }
};

module.exports.renderDestinationsPage = async (req, res) => {
    try {
        const { region, sort } = req.query;
        let query = {};
        
        if (region && region !== 'all') {
            query.region = region;
        }
        
        let destinations = await Destination.find(query);
        
        if (sort === 'rating') {
            destinations.sort((a, b) => b.rating - a.rating);
        } else if (sort === 'name') {
            destinations.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        res.render('pages/destinations', { 
            destinations,
            selectedRegion: region || 'all'
        });
    } catch (error) {
        console.error('Error rendering destinations page:', error);
        res.status(500).render('error', { message: 'Failed to load destinations' });
    }
};

// ==================== STATIC DATA ====================
// Legacy destination page - keeping for compatibility
module.exports.renderDestinationPageLegacy = (req, res) => {
    const destination = {
        name: "Rajasthan",
        tagline: "Land of Palaces, Forts & Royal Heritage",
        heroImage: "https://i0.wp.com/indiatravel.com/wp-content/uploads/2025/03/Rajasthan-Tour-India-Tour-and-India-Travel.webp?fit=1920%2C1080&ssl=1",
        
 
        region: "North India",
        bestTime: "Oct - March",
        duration: "5-8 Days",
        budget: "₹30,000 - ₹80,000",
        climate: "Desert & Hot",
        
        aboutImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
        aboutContent: `<p>Rajasthan is the land of kings and queens, known for its magnificent palaces, mighty forts, and vibrant culture. With its golden deserts, colorful traditions, and legendary hospitality, Rajasthan offers an unforgettable journey through royal India.</p>
        <p>From the bustling pink city of Jaipur to the blue lanes of Jodhpur, from the romantic lakes of Udaipur to the sand dunes of Jaisalmer, every corner of Rajasthan tells a story of valor, romance, and architectural splendor.</p>
        <p>Experience the magic of Rajasthan where history comes alive, colors are vibrant, and every sunset paints the desert in golden hues.</p>`,
        
        // Top Places to Visit
        places: [
            {
                name: "Jaipur",
                type: "Pink City",
                description: "City Palace, Hawa Mahal & markets",
                image: "https://images.unsplash.com/photo-1519981593518-398dd8098b6e?w=500&h=600&fit=crop"
            },
            {
                name: "Udaipur",
                type: "City of Lakes",
                description: "Lake Palace & romantic getaway",
                image: "https://images.unsplash.com/photo-1512207736139-c87ef5298c73?w=500&h=600&fit=crop"
            },
            {
                name: "Jaisalmer",
                type: "Golden City",
                description: "Desert safaris & sand dunes",
                image: "https://images.unsplash.com/photo-1597043244518-14ae80a4b4e7?w=500&h=600&fit=crop"
            },
            {
                name: "Jodhpur",
                type: "Blue City",
                description: "Mehrangarh Fort & blue houses",
                image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&h=600&fit=crop"
            },
            {
                name: "Pushkar",
                type: "Holy City",
                description: "Sacred lake & spiritual vibes",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=600&fit=crop"
            }
        ],
        
        // Experiences
        experiences: [
            {
                emoji: "👑",
                title: "Palace Stays",
                description: "Experience royal hospitality in heritage hotels and palace stays"
            },
            {
                emoji: "🐪",
                title: "Desert Safari",
                description: "Thrilling camel and jeep safaris through the golden Thar Desert"
            },
            {
                emoji: "🎭",
                title: "Folk Culture",
                description: "Traditional folk dances, music, and cultural performances"
            },
            {
                emoji: "🍲",
                title: "Local Cuisine",
                description: "Taste authentic Rajasthani dishes and local delicacies"
            }
        ],
        
        // Best Time to Visit
        bestSeason: {
            months: "October - March",
            description: "Pleasant weather, clear skies, and perfect for sightseeing. Ideal time for festivals and desert safaris."
        },
        moderateSeason: {
            months: "September & April",
            description: "Comfortable for travel with occasional hot winds. Good for budget travelers."
        },
        challenging: {
            months: "May - August",
            description: "Extreme heat (45°C+) and monsoons. Not recommended except for adventure seekers."
        },
        
        packages: [
            {
                name: "Royal Rajasthan Tour",
                description: "Explore the golden triangle of Rajasthan with palace stays",
                image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
                tag: "Best Seller",
                duration: "8 Days / 7 Nights",
                price: "₹45,000 / person",
                rating: 5
            },
            {
                name: "Desert & Lakes Adventure",
                description: "Experience desert safaris and romantic lake cities",
                image: "https://images.unsplash.com/photo-1597043244518-14ae80a4b4e7?w=600&h=400&fit=crop",
                tag: "Adventure",
                duration: "6 Days / 5 Nights",
                price: "₹35,000 / person",
                rating: 5
            },
            {
                name: "Spiritual Rajasthan",
                description: "Pilgrimage to holy sites and spiritual destinations",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
                tag: "Spiritual",
                duration: "5 Days / 4 Nights",
                price: "₹28,000 / person",
                rating: 5
            }
        ],
        
        // Testimonials
        testimonials: [
            {
                name: "Sarah Johnson",
                image: "https://i.pravatar.cc/150?img=15",
                flag: "🇬🇧",
                country: "United Kingdom",
                rating: 5,
                text: "Rajasthan exceeded all expectations! The palace stays were luxurious, guides were knowledgeable, and every moment was magical. Highly recommend!"
            },
            {
                name: "Marco Rossi",
                image: "https://i.pravatar.cc/150?img=28",
                flag: "🇮🇹",
                country: "Italy",
                rating: 5,
                text: "The desert safari in Jaisalmer was unforgettable. Sunset over the dunes, traditional folk performances, and warm hospitality made it perfect!"
            },
            {
                name: "Priya Patel",
                image: "https://i.pravatar.cc/150?img=42",
                flag: "🇺🇸",
                country: "United States",
                rating: 5,
                text: "From the romantic lakes of Udaipur to the blue city of Jodhpur, every destination was breathtaking. IndiaTravel made our dream trip a reality!"
            }
        ],
        

        faqs: [
            {
                question: "Is Rajasthan safe for tourists?",
                answer: "Yes, Rajasthan is very safe for tourists. It's one of India's most visited destinations with excellent infrastructure for travelers. Standard travel precautions apply as with any international destination."
            },
            {
                question: "How many days are ideal for Rajasthan?",
                answer: "For a comprehensive experience covering major cities like Jaipur, Udaipur, and Jaisalmer, 7-8 days is ideal. However, you can enjoy a good trip in 4-5 days if time-constrained."
            },
            {
                question: "Is Rajasthan good for families and couples?",
                answer: "Absolutely! Rajasthan is perfect for both families and couples. Palace hotels, cultural experiences, and diverse attractions cater to all types of travelers."
            },
            {
                question: "What clothes should I wear in Rajasthan?",
                answer: "Light, breathable cotton clothing for daytime. Bring a light jacket or shawl for evenings as temperatures can drop. Sun protection (hat, sunglasses, sunscreen) is essential. Modest clothing is appreciated when visiting temples."
            },
            {
                question: "What's the ideal budget for Rajasthan?",
                answer: "Budget varies: Budget travelers (₹20,000-35,000), Mid-range (₹35,000-70,000), Luxury (₹70,000+) per person for 5-7 days including accommodation, food, and sightseeing."
            },
            {
                question: "Can we customize our Rajasthan itinerary?",
                answer: "Yes! We offer fully customizable itineraries tailored to your interests, budget, and duration. Contact our team to plan your perfect Rajasthan experience."
            }
        ]
    };
    
    res.render('pages/destination', { destination: destination });
}

module.exports.renderDestinationsPage = (req, res) => {
    const destinations = [
        {
            name: "Rajasthan",
            tagline: "Land of Palaces, Forts & Royal Heritage",
            region: "North India",
            bestTime: "Oct - March",
            duration: "5-8 Days",
            image: "https://i0.wp.com/indiatravel.com/wp-content/uploads/2025/03/Rajasthan-Tour-India-Tour-and-India-Travel.webp?fit=1920%2C1080&ssl=1",
            description: "Golden deserts, magnificent forts, and vibrant culture",
            highlights: ["Jaipur", "Udaipur", "Jaisalmer", "Jodhpur"],
            rating: 4.8
        },
        {
            name: "Kerala",
            tagline: "God's Own Country",
            region: "South India",
            bestTime: "Jun - March",
            duration: "4-6 Days",
            image: "https://images.unsplash.com/photo-1537268904588-b8e0905eacb2?w=800&h=600&fit=crop",
            description: "Serene backwaters, spice plantations, and pristine beaches",
            highlights: ["Munnar", "Alappuzha", "Kochi", "Thekkady"],
            rating: 4.9
        },
        {
            name: "Goa",
            tagline: "Beaches, Culture & Vibrancy",
            region: "West India",
            bestTime: "Nov - Feb",
            duration: "3-5 Days",
            image: "https://images.unsplash.com/photo-1512202238504-f1edd96a0b6f?w=800&h=600&fit=crop",
            description: "Golden beaches, Portuguese heritage, and vibrant nightlife",
            highlights: ["Baga Beach", "Colva", "Old Goa", "Dudhsagar Falls"],
            rating: 4.6
        },
        {
            name: "Himachal Pradesh",
            tagline: "Land of Gods & Adventure",
            region: "North India",
            bestTime: "Mar - Oct",
            duration: "6-8 Days",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            description: "Majestic mountains, adventure activities, and serene valleys",
            highlights: ["Shimla", "Manali", "Dharamshala", "Spiti"],
            rating: 4.7
        },
        {
            name: "Uttarakhand",
            tagline: "Land of Gods",
            region: "North India",
            bestTime: "Mar - Jun & Sep - Oct",
            duration: "5-7 Days",
            image: "https://images.unsplash.com/photo-1587595431973-160eed0f935b?w=800&h=600&fit=crop",
            description: "Spiritual destinations, trekking routes, and waterfalls",
            highlights: ["Rishikesh", "Auli", "Jim Corbett", "Kedarnath"],
            rating: 4.5
        },
        {
            name: "Agra & Taj Mahal",
            tagline: "Monument to Love",
            region: "North India",
            bestTime: "Oct - March",
            duration: "2-3 Days",
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
            description: "World's most beautiful monument and Mughal architecture",
            highlights: ["Taj Mahal", "Agra Fort", "Mathura", "Fatehpur Sikri"],
            rating: 4.9
        },
        {
            name: "Varanasi",
            tagline: "Spiritual Gateway of India",
            region: "North India",
            bestTime: "Oct - March",
            duration: "3-4 Days",
            image: "https://images.unsplash.com/photo-1537318609828-d7f83b83b3ac?w=800&h=600&fit=crop",
            description: "Sacred temples, spiritual ceremonies, and cultural immersion",
            highlights: ["Ghat Ceremonies", "Kashi Vishwanath", "Ganges River", "Sarnath"],
            rating: 4.7
        },
        {
            name: "Jaipur City",
            tagline: "The Pink City",
            region: "North India",
            bestTime: "Oct - March",
            duration: "3-4 Days",
            image: "https://images.unsplash.com/photo-1519981593518-398dd8098b6e?w=800&h=600&fit=crop",
            description: "Royal palaces, architecture, and vibrant bazaars",
            highlights: ["Hawa Mahal", "City Palace", "Jantar Mantar", "Local Markets"],
            rating: 4.6
        },
        {
            name: "Maharashtra",
            tagline: "Where History Meets Modernity",
            region: "West India",
            bestTime: "Oct - March",
            duration: "4-6 Days",
            image: "https://images.unsplash.com/photo-1571860355604-ccc8a0d01635?w=800&h=600&fit=crop",
            description: "Historical forts, caves, and bustling cities",
            highlights: ["Mumbai", "Ajanta Caves", "Lonavala", "Aurangabad"],
            rating: 4.5
        },
        {
            name: "Ladakh",
            tagline: "Land of High Passes",
            region: "North India",
            bestTime: "Jun - Sep",
            duration: "7-10 Days",
            image: "https://images.unsplash.com/photo-1531243279-b3e5f13bcc0e?w=800&h=600&fit=crop",
            description: "High altitude deserts, monasteries, and adventure sports",
            highlights: ["Leh", "Nubra Valley", "Pangong Lake", "Khardung La"],
            rating: 4.8
        }
    ];
    
};

// ==================== EXPERIENCES ====================
module.exports.renderExperiencesPage = async (req, res) => {
    try {
        const { category, sort } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        let experiences = await Experience.find(query);
        
        if (sort === 'price-low') {
            experiences.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            experiences.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            experiences.sort((a, b) => b.rating - a.rating);
        }
        
        res.render('pages/experiences', { 
            experiences,
            selectedCategory: category || 'all'
        });
    } catch (error) {
        console.error('Error rendering experiences page:', error);
        res.status(500).render('error', { message: 'Failed to load experiences' });
    }
};

module.exports.renderExperienceDetailPage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const experience = await Experience.findById(id);
        
        if (!experience) {
            return res.status(404).render('error', { message: 'Experience not found' });
        }
        
        const relatedExperiences = await Experience.find({
            category: experience.category,
            _id: { $ne: id }
        }).limit(3);
        
        res.render('pages/experience', { 
            experience,
            relatedExperiences
        });
    } catch (error) {
        console.error('Error rendering experience detail page:', error);
        res.status(500).render('error', { message: 'Failed to load experience details' });
    }
};

// ==================== PACKAGES ====================
module.exports.renderPackagesPage = async (req, res) => {
    try {
        const { destination, sort } = req.query;
        let query = {};
        
        if (destination && destination !== 'all') {
            query.destination = destination;
        }
        
        let packages = await Package.find(query);
        
        if (sort === 'price-low') {
            packages.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            packages.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            packages.sort((a, b) => b.rating - a.rating);
        }
        
        const uniqueDestinations = await Package.distinct('destination');
        
        res.render('pages/packages', { 
            packages,
            destinations: uniqueDestinations,
            selectedDestination: destination || 'all'
        });
    } catch (error) {
        console.error('Error rendering packages page:', error);
        res.status(500).render('error', { message: 'Failed to load packages' });
    }
};

module.exports.renderPackageDetailPage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const package_item = await Package.findById(id);
        
        if (!package_item) {
            return res.status(404).render('error', { message: 'Package not found' });
        }
        
        const relatedPackages = await Package.find({
            destination: package_item.destination,
            _id: { $ne: id }
        }).limit(3);
        
        res.render('pages/package', { 
            package: package_item,
            relatedPackages
        });
    } catch (error) {
        console.error('Error rendering package detail page:', error);
        res.status(500).render('error', { message: 'Failed to load package details' });
    }
};

// ==================== BLOGS ====================
module.exports.renderBlogsPage = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }
        
        let blogs = await Blog.find(query);
        
        if (sort === 'latest') {
            blogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        } else if (sort === 'popular') {
            blogs.sort((a, b) => b.viewCount - a.viewCount);
        } else if (sort === 'rating') {
            blogs.sort((a, b) => b.rating - a.rating);
        }
        
        const categories = await Blog.distinct('category');
        
        res.render('pages/blogs', { 
            blogs,
            categories,
            selectedCategory: category || 'all',
            searchQuery: search || ''
        });
    } catch (error) {
        console.error('Error rendering blogs page:', error);
        res.status(500).render('error', { message: 'Failed to load blogs' });
    }
};

module.exports.renderBlogDetailPage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );
        
        if (!blog) {
            return res.status(404).render('error', { message: 'Blog not found' });
        }
        
        const relatedBlogs = await Blog.find({
            category: blog.category,
            _id: { $ne: id }
        }).limit(3);
        
        res.render('pages/blog', { 
            blog,
            relatedBlogs
        });
    } catch (error) {
        console.error('Error rendering blog detail page:', error);
        res.status(500).render('error', { message: 'Failed to load blog details' });
    }
};

// ==================== PLAN TRIP ====================
module.exports.renderPlanTripPage = async (req, res) => {
    try {
        const destinations = await Destination.find().select('name region');
        const experiences = await Experience.find().select('title category');
        const packages = await Package.find().select('name destination');
        
        // Define travel planning options
        const travelStyles = [
            { label: 'Adventure', icon: 'fa-mountain' },
            { label: 'Culture', icon: 'fa-landmark' },
            { label: 'Relaxation', icon: 'fa-spa' },
            { label: 'Food & Wine', icon: 'fa-utensils' }
        ];
        
        const accommodationTypes = [
            { label: 'Luxury Hotels', icon: 'fa-crown' },
            { label: 'Budget Hotels', icon: 'fa-bed' },
            { label: 'Resorts', icon: 'fa-tree' },
            { label: 'Homestays', icon: 'fa-house' }
        ];
        
        const transportModes = [
            { label: 'Flight', icon: 'fa-plane' },
            { label: 'Train', icon: 'fa-train' },
            { label: 'Car', icon: 'fa-car' },
            { label: 'Bus', icon: 'fa-bus' }
        ];
        
        const interests = [
            { label: 'History & Heritage', icon: 'fa-history' },
            { label: 'Nature & Wildlife', icon: 'fa-leaf' },
            { label: 'Spirituality', icon: 'fa-om' },
            { label: 'Adventure Sports', icon: 'fa-person-hiking' },
            { label: 'Photography', icon: 'fa-camera' },
            { label: 'Local Cuisine', icon: 'fa-drumstick-bite' }
        ];
        
        const testimonials = [
            {
                name: 'Sarah Johnson',
                location: 'USA',
                rating: 5,
                image: 'https://via.placeholder.com/80',
                quote: 'An unforgettable experience! The team made everything seamless and magical.'
            },
            {
                name: 'Michael Chen',
                location: 'Singapore',
                rating: 5,
                image: 'https://via.placeholder.com/80',
                quote: 'Best trip of my life. Highly recommended for anyone seeking authentic India.'
            },
            {
                name: 'Emma Wilson',
                location: 'UK',
                rating: 4.5,
                image: 'https://via.placeholder.com/80',
                quote: 'Great guides, comfortable accommodations, and incredible memories.'
            }
        ];
        
        res.render('pages/plan-trip', { 
            destinations,
            experiences,
            packages,
            travelStyles,
            accommodationTypes,
            transportModes,
            interests,
            testimonials
        });
    } catch (error) {
        console.error('Error rendering plan trip page:', error);
        res.status(500).render('error', { message: 'Failed to load plan trip page' });
    }
};

// ==================== BOOK NOW ====================
module.exports.renderBookNowPage = async (req, res) => {
    try {
        const packages = await Package.find().limit(6);
        const destinations = await Destination.find().select('name');
        
        // Format destination names for dropdown
        const destinationNames = destinations.map(d => d.name);
        
        // Define months
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        // Define budget ranges
        const budgetRanges = [
            '₹30,000 - ₹50,000',
            '₹50,000 - ₹1,00,000',
            '₹1,00,000 - ₹2,00,000',
            '₹2,00,000 - ₹5,00,000',
            '₹5,00,000+'
        ];
        
        // Format popular packages with required fields
        const popularPackages = packages.map(pkg => ({
            name: pkg.name,
            image: pkg.image || 'https://via.placeholder.com/400x300',
            duration: pkg.duration || 'N/A',
            price: typeof pkg.price === 'number' ? '₹' + pkg.price.toLocaleString() : pkg.price,
            highlights: pkg.inclusions && Array.isArray(pkg.inclusions) ? pkg.inclusions.slice(0, 3) : ['Expert guides', 'Accommodation', 'Meals']
        }));
        
        res.render('pages/book-now', { 
            packages: popularPackages,
            destinations: destinationNames,
            months,
            budgetRanges,
            popularPackages
        });
    } catch (error) {
        console.error('Error rendering book now page:', error);
        res.status(500).render('error', { message: 'Failed to load booking page' });
    }
};

// ==================== API ENDPOINTS (for AJAX requests) ====================

// Get all destinations API
module.exports.getAllDestinations = async (req, res) => {
    try {
        const { region, sort } = req.query;
        let query = {};
        
        if (region && region !== 'all') {
            query.region = region;
        }
        
        let destinations = await Destination.find(query);
        
        if (sort === 'rating') {
            destinations.sort((a, b) => b.rating - a.rating);
        } else if (sort === 'name') {
            destinations.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        res.json({ success: true, data: destinations });
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single destination API
module.exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        
        if (!destination) {
            return res.status(404).json({ success: false, message: 'Destination not found' });
        }
        
        res.json({ success: true, data: destination });
    } catch (error) {
        console.error('Error fetching destination:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all experiences API
module.exports.getAllExperiences = async (req, res) => {
    try {
        const { category, sort } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        let experiences = await Experience.find(query);
        
        if (sort === 'price-low') {
            experiences.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            experiences.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            experiences.sort((a, b) => b.rating - a.rating);
        }
        
        res.json({ success: true, data: experiences });
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single experience API
module.exports.getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        
        if (!experience) {
            return res.status(404).json({ success: false, message: 'Experience not found' });
        }
        
        res.json({ success: true, data: experience });
    } catch (error) {
        console.error('Error fetching experience:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all packages API
module.exports.getAllPackages = async (req, res) => {
    try {
        const { destination, sort } = req.query;
        let query = {};
        
        if (destination && destination !== 'all') {
            query.destination = destination;
        }
        
        let packages = await Package.find(query);
        
        if (sort === 'price-low') {
            packages.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            packages.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            packages.sort((a, b) => b.rating - a.rating);
        }
        
        res.json({ success: true, data: packages });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single package API
module.exports.getPackageById = async (req, res) => {
    try {
        const package_item = await Package.findById(req.params.id);
        
        if (!package_item) {
            return res.status(404).json({ success: false, message: 'Package not found' });
        }
        
        res.json({ success: true, data: package_item });
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all blogs API
module.exports.getAllBlogs = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }
        
        let blogs = await Blog.find(query);
        
        if (sort === 'latest') {
            blogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        } else if (sort === 'popular') {
            blogs.sort((a, b) => b.viewCount - a.viewCount);
        } else if (sort === 'rating') {
            blogs.sort((a, b) => b.rating - a.rating);
        }
        
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single blog API
module.exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { viewCount: 1 } },
            { new: true }
        );
        
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        
        res.json({ success: true, data: blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all testimonials API
module.exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json({ success: true, data: testimonials });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get search results API
module.exports.searchAll = async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || q.trim().length < 2) {
            return res.json({ destinations: [], experiences: [], blogs: [], packages: [], testimonials: [] });
        }
        
        const searchRegex = { $regex: q, $options: 'i' };
        
        const destinations = await Destination.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex },
                { region: searchRegex }
            ]
        }).limit(5);
        
        const experiences = await Experience.find({
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { category: searchRegex }
            ]
        }).limit(5);
        
        const blogs = await Blog.find({
            $or: [
                { title: searchRegex },
                { excerpt: searchRegex },
                { content: searchRegex },
                { category: searchRegex }
            ]
        }).limit(5);
        
        const packages = await Package.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex }
            ]
        }).limit(5);
        
        const testimonials = await Testimonial.find({
            $or: [
                { name: searchRegex },
                { location: searchRegex },
                { text: searchRegex }
            ]
        }).limit(5);
        
        res.json({ 
            destinations, 
            experiences, 
            blogs, 
            packages,
            testimonials
        });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports.renderExperienceDetailPage = (req, res) => {
    const experienceId = parseInt(req.params.id);
    
    // Full experiences data with extended details
    const experiencesData = [
        {
            id: 1,
            name: "Desert Safari Adventure",
            category: "Adventure",
            tagline: "Camel riding under the stars",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
            description: "Experience the thrill of camel safaris through the golden deserts of Rajasthan and Jaisalmer with traditional Bedouin hospitality.",
            fullDescription: `<p>Journey into the heart of Rajasthan's golden deserts on authentic camel safaris. This unforgettable experience combines adventure with cultural immersion, allowing you to witness stunning sunsets, interact with local nomadic communities, and enjoy traditional desert camping under the stars.</p><p>Your expert guides will share fascinating insights about desert ecology, local history, and Bedouin traditions. Evening entertainment includes traditional folk dances and authentic desert cuisine prepared over open fires.</p>`,
            duration: "2-3 Days",
            difficulty: "Easy",
            groupSize: "2-10 people",
            price: "₹15,000 - ₹25,000",
            highlights: ["Camel Safari", "Desert Camp", "Folk Dance", "Traditional Dinner", "Sunset Viewing", "Night Photography"],
            location: "Jaisalmer, Rajasthan",
            rating: 4.9,
            reviews: 328,
            itinerary: [
                { day: 1, title: "Arrival & Desert Introduction", activities: ["Hotel check-in", "Desert briefing", "Evening camel ride", "Bonfire dinner"] },
                { day: 2, title: "Full Desert Experience", activities: ["Early morning ride", "Desert breakfast", "Dune exploration", "Lunch break", "Folk dance performance", "Traditional dinner"] },
                { day: 3, title: "Departure", activities: ["Morning ride", "Breakfast", "Return to hotel", "Departure"] }
            ],
            includes: ["Camel safari (as per itinerary)", "Desert accommodation", "Meals", "Professional guide", "Insurance"],
            excludes: ["Travel to Jaisalmer", "Personal expenses", "Tips"],
            bestSeason: "October - March",
            physicalRequirement: "Basic fitness level required"
        },
        {
            id: 2,
            name: "Spiritual Yoga Retreat",
            category: "Wellness",
            tagline: "Find your inner peace",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
            description: "Join a transformative yoga and meditation retreat in the spiritual heartland of India with expert instructors.",
            fullDescription: `<p>Disconnect from the chaos and reconnect with yourself in this comprehensive yoga and wellness retreat. Set against the backdrop of the Himalayas, this program combines daily yoga practices, guided meditation sessions, and Ayurvedic treatments to rejuvenate your mind, body, and soul.</p><p>Learn from experienced yoga masters with decades of practice. Each session is thoughtfully designed to suit all levels, from beginners to advanced practitioners.</p>`,
            duration: "7 Days",
            difficulty: "Easy",
            groupSize: "1-20 people",
            price: "₹25,000 - ₹40,000",
            highlights: ["Yoga Classes", "Meditation", "Ayurveda Treatment", "Vegetarian Meals", "Nature Walks", "Breathing Exercises"],
            location: "Rishikesh, Uttarakhand",
            rating: 4.8,
            reviews: 256,
            itinerary: [
                { day: 1, title: "Arrival & Orientation", activities: ["Check-in", "Welcome ceremony", "Introduction to teachers", "Evening meditation"] },
                { day: "2-6", title: "Daily Yoga & Wellness Program", activities: ["6am - Sunrise yoga", "Breakfast", "9am - Meditation & pranayama", "Lunch", "2pm - Ayurvedic treatment", "6pm - Evening yoga", "7:30pm - Dinner & talks"] },
                { day: 7, title: "Closing Ceremony", activities: ["Final yoga session", "Closing meditation", "Feedback & certificate ceremony", "Departure"] }
            ],
            includes: ["Accommodation (shared/private options)", "All meals (vegetarian)", "Yoga classes", "Ayurvedic treatments", "Meditation sessions"],
            excludes: ["Travel to Rishikesh", "Personal items", "Extra treatments"],
            bestSeason: "Year-round",
            physicalRequirement: "No prior experience needed"
        },
        {
            id: 3,
            name: "Backwater Houseboat Experience",
            category: "Leisure",
            tagline: "Cruise through Kerala's waters",
            image: "https://images.unsplash.com/photo-1551525881-721f1908688c?w=800&h=600&fit=crop",
            description: "Relax on traditional houseboats while cruising through the serene backwaters of Kerala with authentic Kerala cuisine.",
            fullDescription: `<p>Experience the magic of Kerala's backwaters aboard a traditional houseboat, locally known as a kettuvallam. Drift through tranquil canals lined with palm trees, rice paddies, and fishing villages while enjoying the finest Kerala cuisine.</p><p>Watch fishermen at work, spot local wildlife, and absorb the slow-paced beauty of Kerala. Your knowledgeable crew will guide you through hidden waterways and share stories of backwater life.</p>`,
            duration: "2 Days",
            difficulty: "Easy",
            groupSize: "2-4 people",
            price: "₹12,000 - ₹20,000",
            highlights: ["Houseboat Cruise", "Local Cuisine", "Village Tour", "Sunset Viewing", "Wildlife Watching", "Photography Opportunities"],
            location: "Alappuzha, Kerala",
            rating: 4.7,
            reviews: 412,
            itinerary: [
                { day: 1, title: "Backwater Discovery", activities: ["Houseboat boarding", "Welcome drink", "Cruise through backwaters", "Lunch on boat", "Village tour", "Dinner with sunset"] },
                { day: 2, title: "Morning Serenity & Departure", activities: ["Early morning cruise", "Breakfast", "Bird watching", "Return to Alappuzha", "Departure"] }
            ],
            includes: ["Houseboat accommodation", "All meals with Kerala specialties", "Professional crew", "Village tour guide"],
            excludes: ["Travel to Alappuzha", "Beverages (alcoholic)", "Extra activities"],
            bestSeason: "August - May",
            physicalRequirement: "Minimal - suitable for all ages"
        },
        {
            id: 4,
            name: "Mountain Trekking Challenge",
            category: "Adventure",
            tagline: "Conquer the Himalayas",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            description: "Challenging multi-day trek through the majestic Himalayas with experienced guides and accommodation in mountain camps.",
            fullDescription: `<p>Push your limits on this challenging Himalayan trek that takes you through pristine forests, alpine meadows, and high-altitude passes. Experience breathtaking mountain vistas, pristine nature, and the warm hospitality of mountain communities.</p><p>Guided by experienced mountaineers, you'll trek at a comfortable pace with acclimatization days built in. Each night, rest in comfortable camps with warm meals prepared fresh.</p>`,
            duration: "5-7 Days",
            difficulty: "Hard",
            groupSize: "4-12 people",
            price: "₹35,000 - ₹50,000",
            highlights: ["High Altitude Trekking", "Mountain Views", "Local Interaction", "Camping", "Mountain Wildlife", "Photography"],
            location: "Manali, Himachal Pradesh",
            rating: 4.9,
            reviews: 189,
            itinerary: [
                { day: 1, title: "Manali Arrival", activities: ["Hotel check-in", "Briefing", "Equipment check", "Rest & acclimatization"] },
                { day: "2-5", title: "High Altitude Trekking", activities: ["Morning start at dawn", "Trek through forests", "Lunch breaks", "Camp setup", "Dinner & bonfire"] },
                { day: "6-7", title: "Summit & Descent", activities: ["Summit attempt", "Descent to basecamp", "Celebration dinner", "Return to Manali"] }
            ],
            includes: ["Experienced trek guide", "Porter service", "All meals", "Camping equipment", "First aid kit", "Insurance"],
            excludes: ["Personal trekking gear", "Travel to Manali", "Emergency rescue insurance"],
            bestSeason: "June - September",
            physicalRequirement: "High fitness level required - regular cardio training recommended"
        },
        {
            id: 5,
            name: "Wildlife Safari Expedition",
            category: "Nature",
            tagline: "Meet India's wild side",
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
            description: "Witness tigers, leopards, and exotic wildlife in their natural habitat with expert naturalist guides.",
            fullDescription: `<p>Enter the wild world of India's most famous tiger reserve on expertly guided safari expeditions. Witness majestic tigers, elusive leopards, sambar deer, and a variety of birdlife in their natural habitat.</p><p>Our naturalist guides possess deep knowledge of animal behavior and forest ecology. Early morning and evening safaris offer the best chances of wildlife encounters in this stunning landscape.</p>`,
            duration: "3-4 Days",
            difficulty: "Moderate",
            groupSize: "2-8 people",
            price: "₹18,000 - ₹28,000",
            highlights: ["Tiger Spotting", "Game Drive", "Nature Photography", "Jungle Lodge", "Bird Watching", "Naturalist Talks"],
            location: "Ranthambore, Rajasthan",
            rating: 4.8,
            reviews: 203,
            itinerary: [
                { day: 1, title: "Arrival & Briefing", activities: ["Lodge check-in", "Safari briefing", "Evening game drive", "Dinner"] },
                { day: "2-3", title: "Full Safari Days", activities: ["Early morning safari", "Breakfast", "Afternoon safari", "Evening naturalist talk", "Dinner"] },
                { day: 4, title: "Final Safari & Departure", activities: ["Morning safari", "Breakfast", "Check-out", "Departure"] }
            ],
            includes: ["Lodge accommodation", "All meals", "Game drives", "Naturalist guide", "Binoculars"],
            excludes: ["Travel to Ranthambore", "Photography permits", "Tips"],
            bestSeason: "October - June",
            physicalRequirement: "Moderate - ability to sit for 3-4 hours"
        },
        {
            id: 6,
            name: "Cooking Class & Culinary Tour",
            category: "Culture",
            tagline: "Master Indian cuisine",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
            description: "Learn to cook authentic Indian dishes from local chefs in traditional kitchens with market visits included.",
            fullDescription: `<p>Discover the secrets of authentic Indian cuisine in this hands-on culinary experience. Start with a visit to local markets to source fresh ingredients, then return to traditional kitchens to learn time-honored cooking techniques from experienced chefs.</p><p>Prepare 3-4 dishes from scratch and enjoy them with wine pairings. Understand the philosophy behind Indian cooking and take home recipes and cooking knowledge.</p>`,
            duration: "2-3 Days",
            difficulty: "Easy",
            groupSize: "2-6 people",
            price: "₹10,000 - ₹18,000",
            highlights: ["Market Visit", "Cooking Classes", "Restaurant Tour", "Recipe Cards", "Wine Pairing", "Cooking Utensil Demo"],
            location: "Delhi, India",
            rating: 4.7,
            reviews: 334,
            itinerary: [
                { day: 1, title: "Market Visit & Introduction", activities: ["Meet chef", "Local market tour", "Ingredient selection", "Introduction cooking session", "Dinner"] },
                { day: 2, title: "Cooking Classes", activities: ["Morning class (2 dishes)", "Lunch with your creations", "Afternoon class (2 dishes)", "Evening restaurant tour", "Dinner"] },
                { day: 3, title: "Advanced Techniques", activities: ["Advanced cooking class", "Lunch", "Certificate & recipe books", "Farewell"] }
            ],
            includes: ["Market guide", "Cooking classes", "Apron & utensils", "Recipe books", "Meals", "Beverages"],
            excludes: ["Accommodation", "Travel", "Personal expenses"],
            bestSeason: "October - March",
            physicalRequirement: "None - all ages welcome"
        },
        {
            id: 7,
            name: "Palace Heritage Tour",
            category: "Culture",
            tagline: "Step into royal history",
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
            description: "Explore magnificent palaces, forts, and architectural marvels with expert historians and guides.",
            fullDescription: `<p>Journey back in time through India's most magnificent palaces and forts. This exclusive tour showcases exquisite architecture, royal history, and cultural heritage through the eyes of expert historians.</p><p>From the marble beauty of Lake Palace to the grandeur of Mehrangarh Fort, each location tells stories of royal splendor and architectural brilliance. Enjoy sunset viewpoints and private access to heritage sites.</p>`,
            duration: "4 Days",
            difficulty: "Easy",
            groupSize: "2-15 people",
            price: "₹16,000 - ₹26,000",
            highlights: ["Palace Tours", "Historical Insights", "Photography Spots", "Local Guide", "Sunset Viewing", "Exclusive Access"],
            location: "Udaipur, Rajasthan",
            rating: 4.8,
            reviews: 278,
            itinerary: [
                { day: 1, title: "Udaipur Arrival", activities: ["Hotel check-in", "City Palace tour", "Sunset at Lake Pichola", "Welcome dinner"] },
                { day: 2, title: "Lake Palace & Temples", activities: ["Boat tour to Lake Palace", "Jagdish Temple", "Lunch", "Shopping tour"] },
                { day: 3, title: "Heritage Exploration", activities: ["Monsoon Palace", "Photography session", "Local market visit", "Cultural dinner"] },
                { day: 4, title: "Departure", activities: ["Morning walk", "Final shopping", "Departure"] }
            ],
            includes: ["Guide service", "Hotel accommodation", "Meals (breakfast, lunch, dinner)", "Boat tours", "Monument entry fees"],
            excludes: ["Travel to Udaipur", "Personal shopping", "Tips"],
            bestSeason: "October - February",
            physicalRequirement: "Easy - comfortable walking shoes recommended"
        },
        {
            id: 8,
            name: "Adventure Water Sports",
            category: "Adventure",
            tagline: "Splash into action",
            image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
            description: "Experience thrilling water sports including kayaking, rafting, and parasailing in scenic locations.",
            fullDescription: `<p>Get your adrenaline pumping with Goa's most exciting water sports. Whether it's white-water rafting in pristine rivers, kayaking through scenic inlets, or soaring above crystal-clear waters on a parasail, this experience caters to adventure seekers.</p><p>All activities are conducted under strict safety guidelines with certified instructors. Equipment is modern and well-maintained. Multiple difficulty levels available.</p>`,
            duration: "2 Days",
            difficulty: "Moderate",
            groupSize: "2-20 people",
            price: "₹8,000 - ₹15,000",
            highlights: ["Kayaking", "Rafting", "Parasailing", "Water Sports Training", "Safety Briefing", "Photography"],
            location: "Goa, India",
            rating: 4.6,
            reviews: 156,
            itinerary: [
                { day: 1, title: "Introduction & Kayaking", activities: ["Equipment briefing", "Safety training", "Kayaking session", "Lunch", "Relaxation time", "Dinner on beach"] },
                { day: 2, title: "Action Sports", activities: ["Rafting expedition", "Lunch", "Parasailing experience", "Water volleyball", "Departure"] }
            ],
            includes: ["Equipment rental", "Safety gear", "Professional instructors", "Insurance", "Meals", "Photography"],
            excludes: ["Accommodation", "Travel to Goa", "Extra beverages"],
            bestSeason: "November - March",
            physicalRequirement: "Good swimming ability required - age limit 60+"
        },
        {
            id: 9,
            name: "Photography Tour",
            category: "Art & Culture",
            tagline: "Capture India's beauty",
            image: "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=800&h=600&fit=crop",
            description: "Professional photography tour with composition tips and guidance to capture stunning Indian landscapes and culture.",
            fullDescription: `<p>Learn from award-winning photographers as you capture the essence of spiritual India. This specialized tour focuses on composition, lighting, and storytelling through imagery in one of the world's most photogenic destinations.</p><p>Visit sacred ghats at sunrise, bustling markets, ancient temples, and serene spiritual sites. Receive personalized feedback on your work and learn advanced post-processing techniques.</p>`,
            duration: "5 Days",
            difficulty: "Moderate",
            groupSize: "2-10 people",
            price: "₹22,000 - ₹35,000",
            highlights: ["Expert Guidance", "Golden Hour Shoots", "Editing Workshop", "Portfolio Building", "Cultural Immersion", "Sunrise Sessions"],
            location: "Varanasi, Uttar Pradesh",
            rating: 4.9,
            reviews: 142,
            itinerary: [
                { day: 1, title: "Arrival & Orientation", activities: ["Hotel check-in", "Camera check", "Evening shoot preparation", "Dinner"] },
                { day: "2-4", title: "Photography Expeditions", activities: ["4am - Ghat photography", "Breakfast", "Street & culture shots", "Lunch", "Editing workshop", "Sunset shoot"] },
                { day: 5, title: "Portfolio Review & Departure", activities: ["Final shoots", "Portfolio review session", "Certificate ceremony", "Departure"] }
            ],
            includes: ["Professional photographer guide", "Hotel accommodation", "Meals", "Editing software access", "Certificate", "Photo book printing"],
            excludes: ["Camera equipment (bring your own)", "Travel to Varanasi", "Extra prints"],
            bestSeason: "October - March",
            physicalRequirement: "Moderate - early mornings and walking"
        },
        {
            id: 10,
            name: "Festival & Fair Experience",
            category: "Culture",
            tagline: "Celebrate with locals",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
            description: "Participate in vibrant Indian festivals and fairs with local families, experiencing authentic traditions and celebrations.",
            fullDescription: `<p>Immerse yourself in India's most vibrant festivals with local families. Whether it's the colorful Holi celebrations, spiritual Diwali, energetic Navratri, or the camel fairs of Pushkar, each festival offers unique cultural experiences.</p><p>Stay with local families, participate in traditional preparations, and celebrate alongside communities. This authentic immersion provides genuine insight into Indian culture and traditions.</p>`,
            duration: "3 Days",
            difficulty: "Easy",
            groupSize: "1-10 people",
            price: "₹12,000 - ₹22,000",
            highlights: ["Festival Participation", "Local Families", "Traditional Food", "Cultural Performance", "Shopping", "Photography"],
            location: "Various Locations",
            rating: 4.8,
            reviews: 267,
            itinerary: [
                { day: 1, title: "Arrival & Preparation", activities: ["Arrival at destination", "Family meeting", "Festival preparations", "Traditional attire", "Welcome feast"] },
                { day: 2, title: "Festival Celebration", activities: ["Festival rituals", "Community participation", "Traditional meals", "Cultural performances", "Celebration dinner"] },
                { day: 3, title: "Cultural Exchange & Departure", activities: ["Morning rituals", "Family breakfast", "Gift exchange", "Farewells", "Departure"] }
            ],
            includes: ["Local family homestay", "All meals", "Festival attire", "Festival participation", "Transportation"],
            excludes: ["Travel to festival location", "Personal shopping", "Tips"],
            bestSeason: "Varies by festival",
            physicalRequirement: "Easy - all ages welcome"
        }
    ];
    
    // Find the requested experience
    const experience = experiencesData.find(e => e.id === experienceId);
    
    if (!experience) {
        return res.status(404).render('pages/404', { message: 'Experience not found' });
    }
    
    // Also pass similar experiences (same category)
    const similarExperiences = experiencesData
        .filter(e => e.category === experience.category && e.id !== experienceId)
        .slice(0, 3);
    
    res.render('pages/experience', { experience, similarExperiences });
}

module.exports.renderPackagesPage = (req, res) => {
    const packages = [
        {
            id: 1,
            name: "Golden Triangle Tour",
            duration: "5 Days",
            destination: "Delhi, Agra, Jaipur",
            price: "₹25,000 - ₹45,000",
            rating: 4.8,
            reviews: 234,
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
            tagline: "Experience the iconic trio of India",
            category: "Classic",
            highlights: ["Taj Mahal", "Hawa Mahal", "Red Fort", "Local Markets"],
            description: "Discover the most iconic monuments of India in this classic 5-day tour covering Delhi, Agra, and Jaipur."
        },
        {
            id: 2,
            name: "Rajasthan Heritage Tour",
            duration: "7 Days",
            destination: "Jaipur, Jodhpur, Jaisalmer, Udaipur",
            price: "₹35,000 - ₹65,000",
            rating: 4.9,
            reviews: 189,
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
            tagline: "Royal palaces and desert magic",
            category: "Cultural",
            highlights: ["Mehrangarh Fort", "Desert Safari", "Lake Palace", "Blue City"],
            description: "Journey through the magnificent state of Rajasthan with its forts, palaces, and vibrant culture."
        },
        {
            id: 3,
            name: "Kerala Backwaters Escape",
            duration: "5 Days",
            destination: "Kochi, Munnar, Alleppey",
            price: "₹28,000 - ₹50,000",
            rating: 4.7,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1512207736139-c87ef5298c73?w=600&h=400&fit=crop",
            tagline: "Serene backwaters and spice gardens",
            category: "Nature",
            highlights: ["Backwater Cruise", "Tea Plantations", "Wildlife Sanctuary", "Beach Resorts"],
            description: "Relax in God's own country with pristine backwaters, lush plantations, and tropical beaches."
        },
        {
            id: 4,
            name: "Himalayan Adventure",
            duration: "6 Days",
            destination: "Manali, Rohtang, Solang Valley",
            price: "₹32,000 - ₹58,000",
            rating: 4.8,
            reviews: 201,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            tagline: "Snow peaks and mountain trails",
            category: "Adventure",
            highlights: ["Mountain Trekking", "Cable Car Rides", "Snow Activities", "Alpine Forests"],
            description: "Experience the majestic Himalayas with adventure sports and breathtaking mountain landscapes."
        },
        {
            id: 5,
            name: "Goa Beach Paradise",
            duration: "4 Days",
            destination: "Goa",
            price: "₹20,000 - ₹40,000",
            rating: 4.6,
            reviews: 267,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
            tagline: "Beaches, temples, and nightlife",
            category: "Leisure",
            highlights: ["Beach Resorts", "Water Sports", "Churches", "Markets"],
            description: "Relax on pristine beaches, enjoy water sports, and explore Goa's unique cultural blend."
        },
        {
            id: 6,
            name: "Varanasi Spiritual Journey",
            duration: "3 Days",
            destination: "Varanasi",
            price: "₹15,000 - ₹30,000",
            rating: 4.9,
            reviews: 145,
            image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&h=400&fit=crop",
            tagline: "Ancient rituals and sacred Ganges",
            category: "Spiritual",
            highlights: ["Ghat Rituals", "Boat Cruises", "Ancient Temples", "Morning Prayer"],
            description: "Immerse yourself in the spiritual aura of Varanasi, the holiest city in India."
        },
        {
            id: 7,
            name: "Northeast Explorer",
            duration: "8 Days",
            destination: "Meghalaya, Assam, Mizoram",
            price: "₹40,000 - ₹70,000",
            rating: 4.7,
            reviews: 98,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            tagline: "Unexplored beauty and tribal culture",
            category: "Adventure",
            highlights: ["Waterfalls", "Living Root Bridges", "Tribal Villages", "Forest Trekking"],
            description: "Explore the unexplored northeast with its lush landscapes and unique tribal heritage."
        },
        {
            id: 8,
            name: "Luxury Palace Stay",
            duration: "4 Days",
            destination: "Udaipur, Jodhpur",
            price: "₹60,000 - ₹120,000",
            rating: 5.0,
            reviews: 87,
            image: "https://images.unsplash.com/photo-1512207736139-c87ef5298c73?w=600&h=400&fit=crop",
            tagline: "Royal experience in heritage palaces",
            category: "Luxury",
            highlights: ["Palace Hotels", "Fine Dining", "Royal Experiences", "Spa Treatments"],
            description: "Experience royal hospitality with stays in authentic heritage palaces and forts."
        },
        {
            id: 9,
            name: "Himalayan Yoga Retreat",
            duration: "7 Days",
            destination: "Himachal Pradesh",
            price: "₹28,000 - ₹55,000",
            rating: 4.8,
            reviews: 112,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            tagline: "Wellness among the mountains",
            category: "Wellness",
            highlights: ["Yoga Sessions", "Meditation", "Mountain Views", "Healthy Meals"],
            description: "Rejuvenate your mind and body with yoga and wellness activities in the serene Himalayas."
        },
        {
            id: 10,
            name: "Buddhist Trail Tour",
            duration: "6 Days",
            destination: "Delhi, Bodh Gaya, Sarnath, Varanasi",
            price: "₹30,000 - ₹55,000",
            rating: 4.8,
            reviews: 134,
            image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&h=400&fit=crop",
            tagline: "Sacred sites of Buddhist pilgrimage",
            category: "Spiritual",
            highlights: ["Bodhi Tree", "Dharamekh Stupa", "Temples", "Buddhist Monasteries"],
            description: "Follow the path of Buddha and visit the most sacred Buddhist pilgrimage sites in India."
        }
    ];

    res.render('pages/packages', { packages });
}

module.exports.renderPackageDetailPage = (req, res) => {
    const packageId = parseInt(req.params.id);
    
    const packagesData = [
        {
            id: 1,
            name: "Golden Triangle Tour",
            duration: "5 Days / 4 Nights",
            destination: "Delhi, Agra, Jaipur",
            price: "₹25,000 - ₹45,000",
            rating: 4.8,
            reviews: 234,
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
            tagline: "Experience the iconic trio of India",
            category: "Classic",
            groupSize: "2-30 people",
            bestSeason: "October - March",
            physicalRequirement: "Moderate fitness level",
            fullDescription: `<p>The Golden Triangle is India's most iconic travel circuit, connecting three major cities that showcase the country's rich history, architecture, and culture. This 5-day tour takes you through the bustling streets of Delhi, the monument of eternal love in Agra, and the cultural hub of Jaipur.</p>
            <p>Experience world-class monuments, interact with local communities, enjoy authentic Indian cuisine, and create memories that will last a lifetime. This package is perfect for first-time visitors to India and those seeking a comprehensive introduction to the country.</p>
            <p>With our carefully curated itinerary, comfortable accommodations, and experienced guides, this journey promises comfort, culture, and unforgettable experiences.</p>`,
            highlights: ["Taj Mahal", "Hawa Mahal", "Red Fort", "Fatehpur Sikri", "Local Markets", "Cultural Shows"],
            itinerary: [
                { day: 1, title: "Arrival in Delhi", activities: ["Arrive at Indira Gandhi International Airport", "Transfer to hotel", "Explore local markets", "Welcome dinner"] },
                { day: 2, title: "Old & New Delhi", activities: ["Red Fort visit", "Jama Masjid exploration", "Chandni Chowk market walk", "Raj Ghat", "India Gate", "Humayun's Tomb"] },
                { day: 3, title: "Delhi to Agra", activities: ["Morning drive to Agra", "Taj Mahal sunset visit", "Mughal gardens exploration", "Evening light & sound show"] },
                { day: 4, title: "Agra to Jaipur", activities: ["Agra Fort visit", "Drive to Jaipur", "Local market exploration", "City Palace walk", "Evening shopping"] },
                { day: 5, title: "Jaipur & Departure", activities: ["Hawa Mahal visit", "Jantar Mantar", "City tour", "Transfer to airport", "Departure"] }
            ],
            includes: [
                "Accommodation in 4-star hotels",
                "Daily breakfast and dinner",
                "All sightseeing tours",
                "Professional tour guide",
                "Airport transfers",
                "Monument entrance fees",
                "Travel insurance"
            ],
            excludes: [
                "International flights",
                "Meals not mentioned",
                "Personal expenses",
                "Tips and gratuities",
                "Activities not in itinerary",
                "Travel to/from home city"
            ]
        },
        {
            id: 2,
            name: "Rajasthan Heritage Tour",
            duration: "7 Days / 6 Nights",
            destination: "Jaipur, Jodhpur, Jaisalmer, Udaipur",
            price: "₹35,000 - ₹65,000",
            rating: 4.9,
            reviews: 189,
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
            tagline: "Royal palaces and desert magic",
            category: "Cultural",
            groupSize: "2-25 people",
            bestSeason: "October - March",
            physicalRequirement: "Moderate fitness level",
            fullDescription: `<p>Embark on a majestic journey through the golden deserts and palatial cities of Rajasthan. This 7-day tour covers four iconic cities, each with its own unique charm and historical significance.</p>
            <p>From the pink city of Jaipur to the blue city of Jodhpur, from the golden sands of Jaisalmer to the romantic lakes of Udaipur, you'll experience the true essence of royal India. Visit magnificent forts and palaces, attend cultural performances, enjoy desert safaris, and immerse yourself in Rajasthan's vibrant traditions.</p>
            <p>Our expert guides will share fascinating stories of Rajasthan's glorious past while ensuring your comfort and safety throughout the journey.</p>`,
            highlights: ["Mehrangarh Fort", "Desert Safari", "Lake Palace", "Hawa Mahal", "City Palace", "Camel Trekking", "Folk performances"],
            itinerary: [
                { day: 1, title: "Arrival in Jaipur", activities: ["Arrive and check-in", "City Palace visit", "Jantar Mantar exploration", "Welcome dinner"] },
                { day: 2, title: "Jaipur Full Day", activities: ["Hawa Mahal visit", "Albert Museum", "Local markets", "Sunset viewing", "Cultural show"] },
                { day: 3, title: "Jaipur to Jodhpur", activities: ["Drive to Jodhpur", "Mehrangarh Fort tour", "Blue city walk", "Umaid Bhawan Palace"] },
                { day: 4, title: "Jodhpur to Jaisalmer", activities: ["Drive to Jaisalmer", "Desert safari", "Camel riding", "Sand dunes experience", "Folk music evening"] },
                { day: 5, title: "Jaisalmer Exploration", activities: ["Jaisalmer Fort tour", "Havelis visit", "Market exploration", "Desert dinner", "Sunset photography"] },
                { day: 6, title: "Jaisalmer to Udaipur", activities: ["Drive to Udaipur", "Udaipur city tour", "Lake Palace boat ride", "Saheliyon ki Bari visit"] },
                { day: 7, title: "Udaipur & Departure", activities: ["Jagdish Temple", "Vintage car museum", "City Palace", "Farewell dinner", "Departure"] }
            ],
            includes: [
                "Accommodation in heritage hotels",
                "Daily breakfast and dinner",
                "All guided tours",
                "Desert safari",
                "Camel ride",
                "Professional local guides",
                "All entrance fees",
                "Travel insurance"
            ],
            excludes: [
                "International flights",
                "Personal expenses",
                "Shopping items",
                "Tips and gratuities",
                "Lunch meals",
                "Activities not mentioned"
            ]
        },
        {
            id: 3,
            name: "Kerala Backwaters Escape",
            duration: "5 Days / 4 Nights",
            destination: "Kochi, Munnar, Alleppey",
            price: "₹28,000 - ₹50,000",
            rating: 4.7,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1512207736139-c87ef5298c73?w=600&h=400&fit=crop",
            tagline: "Serene backwaters and spice gardens",
            category: "Nature",
            groupSize: "2-20 people",
            bestSeason: "August - March",
            physicalRequirement: "Light fitness level",
            fullDescription: `<p>Discover the serene beauty of Kerala, India's tropical paradise. This 5-day escape takes you through lush tea plantations, aromatic spice gardens, and pristine backwaters.</p>
            <p>Experience the unique lifestyle of Kerala, known as "God's own country", with its tranquil lakes, exotic wildlife, and cultural richness. From the colonial charm of Munnar to the houseboat cruises of Alleppey, every moment promises relaxation and rejuvenation.</p>
            <p>This package is ideal for nature lovers and those seeking a peaceful retreat away from the hustle and bustle of city life.</p>`,
            highlights: ["Backwater cruises", "Tea plantations", "Spice gardens", "Wildlife sanctuary", "Beach resorts", "Ayurveda spa"],
            itinerary: [
                { day: 1, title: "Arrival in Kochi", activities: ["Arrive in Kochi", "Visit Fort Kochi", "Chinese fishing nets", "Spice markets", "Sunset walk"] },
                { day: 2, title: "Kochi to Munnar", activities: ["Drive to Munnar", "Visit tea plantations", "Spice garden tour", "Mountain viewpoints", "Tea factory visit"] },
                { day: 3, title: "Munnar Exploration", activities: ["Trek in Munnar", "Visit Mattupetty Dam", "Wildlife sanctuary", "Eravikulam National Park", "Nature walks"] },
                { day: 4, title: "Munnar to Alleppey", activities: ["Drive to Alleppey", "Houseboat boarding", "Backwater cruise", "Village visit", "Sunset on backwaters"] },
                { day: 5, title: "Alleppey & Departure", activities: ["Early morning backwater tour", "Fish market visit", "Beach walk", "Ayurveda spa", "Departure"] }
            ],
            includes: [
                "Accommodation in resorts",
                "Houseboat stay",
                "Daily breakfast and dinner",
                "All tours and activities",
                "Ayurveda spa session",
                "Professional guides",
                "All entrance fees"
            ],
            excludes: [
                "International/domestic flights",
                "Lunch meals",
                "Personal items",
                "Tips and extras",
                "Activities not listed",
                "Travel insurance"
            ]
        },
        {
            id: 4,
            name: "Himalayan Adventure",
            duration: "6 Days / 5 Nights",
            destination: "Manali, Rohtang, Solang Valley",
            price: "₹32,000 - ₹58,000",
            rating: 4.8,
            reviews: 201,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            tagline: "Snow peaks and mountain trails",
            category: "Adventure",
            groupSize: "2-25 people",
            bestSeason: "March - October",
            physicalRequirement: "High fitness level required",
            fullDescription: `<p>Experience the thrill of the Himalayas with this 6-day adventure package. Manali, nestled in the heart of Himachal Pradesh, offers breathtaking mountain vistas, thrilling adventure sports, and cultural experiences.</p>
            <p>From paragliding and mountain biking to trekking and rock climbing, this package is packed with adrenaline-pumping activities. Enjoy the majestic snow peaks, alpine forests, and traditional Himalayan culture.</p>
            <p>Perfect for adventure enthusiasts and nature lovers seeking an action-packed holiday in the mountains.</p>`,
            highlights: ["Paragliding", "Mountain trekking", "Rock climbing", "Cable car rides", "Snow activities", "Alpine lakes"],
            itinerary: [
                { day: 1, title: "Arrival in Manali", activities: ["Arrive in Manali", "Check-in and rest", "Town exploration", "Market visit", "Welcome dinner"] },
                { day: 2, title: "Rohtang Adventure", activities: ["Drive to Rohtang Pass", "Adventure sports", "Paragliding", "Mountain photography", "Sunset viewing"] },
                { day: 3, title: "Solang Valley Activities", activities: ["Solang Valley visit", "Zorbing", "Mountain biking", "Ropeway rides", "Scenic walks"] },
                { day: 4, title: "Trekking Day", activities: ["Guided mountain trek", "Wildlife spotting", "Alpine meadows", "Scenic viewpoints", "Picnic lunch"] },
                { day: 5, title: "Adventure Sports", activities: ["Rock climbing lessons", "Rappelling", "Mountaineering training", "Indoor rock wall", "Skill sessions"] },
                { day: 6, title: "Manali & Departure", activities: ["Kullu visit", "Last-minute shopping", "Traditional lunch", "Departure transfer"] }
            ],
            includes: [
                "Accommodation in adventure lodges",
                "Daily breakfast and dinner",
                "Adventure sports equipment",
                "Professional instructors",
                "All activities mentioned",
                "Travel insurance",
                "Safety gear"
            ],
            excludes: [
                "Flights",
                "Lunch meals",
                "Personal items",
                "Tips and gratuities",
                "Photography charges",
                "Extra activities"
            ]
        },
        {
            id: 5,
            name: "Goa Beach Paradise",
            duration: "4 Days / 3 Nights",
            destination: "Goa",
            price: "₹20,000 - ₹40,000",
            rating: 4.6,
            reviews: 267,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
            tagline: "Beaches, temples, and nightlife",
            category: "Leisure",
            groupSize: "2-30 people",
            bestSeason: "November - February",
            physicalRequirement: "Light fitness level",
            fullDescription: `<p>Escape to the tropical paradise of Goa, where pristine beaches meet vibrant nightlife. This 4-day package offers the perfect blend of relaxation, adventure, and cultural exploration.</p>
            <p>From the golden sands of Calangute to the serene beaches of Palolem, from water sports to temple visits, Goa has something for everyone. Experience the unique blend of Portuguese architecture, beach culture, and Indian traditions.</p>
            <p>Whether you seek adventure, relaxation, or cultural immersion, Goa's diverse offerings ensure an unforgettable holiday.</p>`,
            highlights: ["Beach resorts", "Water sports", "Portuguese churches", "Spice plantations", "Casinos", "Night markets"],
            itinerary: [
                { day: 1, title: "Arrival in Goa", activities: ["Arrive in Goa", "Check-in at beach resort", "Beach walk", "Sunset viewing", "Welcome dinner"] },
                { day: 2, title: "Beach Activities", activities: ["Water sports (parasailing, jet ski)", "Beach volleyball", "Scuba diving", "Sunset cruise", "Beach party"] },
                { day: 3, title: "Culture & Exploration", activities: ["Temple visit", "Portuguese church tour", "Spice plantation walk", "Local market exploration", "Casino night"] },
                { day: 4, title: "Relaxation & Departure", activities: ["Spa treatment", "Beach relaxation", "Last shopping", "Farewell lunch", "Departure"] }
            ],
            includes: [
                "Accommodation in beach resorts",
                "Daily breakfast and dinner",
                "Water sports activities",
                "Guided tours",
                "Hotel transfers",
                "Travel insurance"
            ],
            excludes: [
                "Flights",
                "Lunch meals",
                "Shopping items",
                "Tips and gratuities",
                "Casino charges",
                "Extra activities"
            ]
        },
        {
            id: 6,
            name: "Varanasi Spiritual Journey",
            duration: "3 Days / 2 Nights",
            destination: "Varanasi",
            price: "₹15,000 - ₹30,000",
            rating: 4.9,
            reviews: 145,
            image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&h=400&fit=crop",
            tagline: "Ancient rituals and sacred Ganges",
            category: "Spiritual",
            groupSize: "2-15 people",
            bestSeason: "October - March",
            physicalRequirement: "Light fitness level",
            fullDescription: `<p>Immerse yourself in the spiritual essence of Varanasi, one of the world's oldest continuously inhabited cities. This 3-day spiritual journey takes you through ancient temples, sacred rituals, and the mystical Ganges River.</p>
            <p>Experience the dawn Aarti (prayer ceremony) at the ghats, boat cruises on the holy Ganges, visits to ancient temples, and interactions with pilgrims from around the world. Varanasi is a place where spirituality is deeply woven into daily life.</p>
            <p>This package is perfect for those seeking spiritual awakening and cultural immersion in India's holiest city.</p>`,
            highlights: ["Ghat rituals", "Boat cruises", "Kashi Vishwanath Temple", "Spiritual ceremonies", "Evening Aarti", "Meditation sessions"],
            itinerary: [
                { day: 1, title: "Arrival & Ghat Visit", activities: ["Arrive in Varanasi", "Check-in", "Evening Aarti at ghats", "Boat cruise on Ganges", "Dinner"] },
                { day: 2, title: "Spiritual Exploration", activities: ["Early morning Aarti", "Boat ride sunrise", "Kashi Vishwanath Temple", "Meditation session", "Temple tours"] },
                { day: 3, title: "Cultural Experience & Departure", activities: ["Morning prayers", "Ghat walk", "Local market visit", "Spiritual talks", "Departure"] }
            ],
            includes: [
                "Accommodation in spiritual center",
                "Daily breakfast and dinner",
                "All boat cruises",
                "Temple visits",
                "Meditation sessions",
                "Spiritual guide",
                "Welcome ceremony"
            ],
            excludes: [
                "Flights",
                "Lunch meals",
                "Personal shopping",
                "Tips and donations",
                "Offerings and charity",
                "Photography permits"
            ]
        },
        {
            id: 7,
            name: "Northeast Explorer",
            duration: "8 Days / 7 Nights",
            destination: "Meghalaya, Assam, Mizoram",
            price: "₹40,000 - ₹70,000",
            rating: 4.7,
            reviews: 98,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            tagline: "Unexplored beauty and tribal culture",
            category: "Adventure",
            groupSize: "2-20 people",
            bestSeason: "October - April",
            physicalRequirement: "Moderate to high fitness level",
            fullDescription: `<p>Venture into India's least explored region and discover the hidden gems of the Northeast. This 8-day expedition takes you through the living root bridges of Meghalaya, the tea gardens of Assam, and the pristine valleys of Mizoram.</p>
            <p>Experience authentic tribal culture, witness spectacular waterfalls, trek through untouched forests, and meet warm-hearted locals. The Northeast is India's best-kept secret, offering untouched natural beauty and unique cultural experiences.</p>
            <p>Perfect for adventure seekers and cultural enthusiasts looking for something truly different.</p>`,
            highlights: ["Living root bridges", "Nohkalikai waterfall", "Cherrapunji", "Tribal villages", "Forest trekking", "Tea gardens", "Tribal markets"],
            itinerary: [
                { day: "1-2", title: "Arrival & Shillong", activities: ["Arrive in Shillong", "City tour", "Local market", "Elephant Falls visit"] },
                { day: "3-4", title: "Cherrapunji & Root Bridges", activities: ["Travel to Cherrapunji", "Living root bridge trek", "Nohkalikai waterfall", "Tribal village visit"] },
                { day: "5-6", title: "Assam Tea Gardens", activities: ["Travel to Assam", "Tea garden tour", "Tea factory visit", "Local culture experience"] },
                { day: "7-8", title: "Mizoram Exploration", activities: ["Travel to Mizoram", "Aizawl city tour", "Tribal craft visit", "Farewell celebration"] }
            ],
            includes: [
                "Accommodation in local lodges",
                "Daily meals",
                "All treks and activities",
                "Local guides",
                "Vehicle transportation",
                "Travel insurance"
            ],
            excludes: [
                "Flights",
                "Visa (if required)",
                "Personal expenses",
                "Tips and gratuities",
                "Extra photography",
                "Tribal artisan purchases"
            ]
        },
        {
            id: 8,
            name: "Luxury Palace Stay",
            duration: "4 Days / 3 Nights",
            destination: "Udaipur, Jodhpur",
            price: "₹60,000 - ₹120,000",
            rating: 5.0,
            reviews: 87,
            image: "https://images.unsplash.com/photo-1512207736139-c87ef5298c73?w=600&h=400&fit=crop",
            tagline: "Royal experience in heritage palaces",
            category: "Luxury",
            groupSize: "2-10 people",
            bestSeason: "October - March",
            physicalRequirement: "Light fitness level",
            fullDescription: `<p>Live like royalty with this exclusive luxury package offering authentic stays in restored heritage palaces and forts. This 4-day indulgence takes you through the most prestigious palace hotels in Rajasthan.</p>
            <p>Experience regal hospitality, gourmet dining, royal spa treatments, and personalized services fit for kings and queens. Each palace has its own unique history and architecture, offering a glimpse into Rajasthan's glorious past.</p>
            <p>Perfect for those seeking luxury, comfort, and a taste of royal Indian hospitality.</p>`,
            highlights: ["Palace hotels", "Fine dining", "Royal spa", "Heritage tours", "Personal services", "Exclusive experiences"],
            itinerary: [
                { day: 1, title: "Udaipur Palace Check-in", activities: ["Arrive in Udaipur", "Check-in at luxury palace hotel", "Royal welcome", "Spa treatment", "Gourmet dinner"] },
                { day: 2, title: "Udaipur Royal Experience", activities: ["Palace tour", "Lake Palace boat ride", "Shopping at royal boutiques", "Fine dining experience", "Evening cultural show"] },
                { day: 3, title: "Udaipur to Jodhpur", activities: ["Travel to Jodhpur", "Check-in at fort hotel", "Mehrangarh Fort private tour", "Sunset viewing", "Royal dinner"] },
                { day: 4, title: "Jodhpur Luxury & Departure", activities: ["Palace breakfast", "Personal guide tour", "Exclusive shopping", "Spa session", "Departure"] }
            ],
            includes: [
                "Accommodation in 5-star palace hotels",
                "All meals (breakfast, lunch, dinner)",
                "Spa treatments",
                "Private guided tours",
                "All activities mentioned",
                "Airport transfers",
                "Travel insurance",
                "Complimentary drinks"
            ],
            excludes: [
                "International flights",
                "Personal shopping",
                "Tips and gratuities",
                "Alcohol purchases",
                "Extra treatments",
                "Travel insurance (if optional)"
            ]
        },
        {
            id: 9,
            name: "Himalayan Yoga Retreat",
            duration: "7 Days / 6 Nights",
            destination: "Himachal Pradesh",
            price: "₹28,000 - ₹55,000",
            rating: 4.8,
            reviews: 112,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            tagline: "Wellness among the mountains",
            category: "Wellness",
            groupSize: "2-15 people",
            bestSeason: "May - October",
            physicalRequirement: "Light fitness level",
            fullDescription: `<p>Rejuvenate your mind, body, and soul with this 7-day yoga and wellness retreat in the serene Himalayas. Surrounded by snow-capped peaks and pristine nature, this retreat offers daily yoga sessions, meditation, and wellness treatments.</p>
            <p>Learn yoga from certified instructors, practice meditation in nature, enjoy healthy organic meals, and experience Ayurvedic treatments. Perfect for beginners and advanced practitioners alike.</p>
            <p>This wellness package is ideal for those seeking stress relief, spiritual growth, and holistic health.</p>`,
            highlights: ["Daily yoga classes", "Meditation sessions", "Ayurveda treatments", "Mountain walks", "Healthy meals", "Spiritual sessions"],
            itinerary: [
                { day: 1, title: "Arrival & Orientation", activities: ["Arrive at retreat center", "Welcome ceremony", "Orientation", "Evening meditation", "Healthy dinner"] },
                { day: "2-6", title: "Daily Wellness Program", activities: ["Morning yoga session", "Meditation", "Breakfast", "Nature walks", "Afternoon treatments", "Evening yoga", "Dinner"] },
                { day: 7, title: "Closing & Departure", activities: ["Final yoga session", "Closing ceremony", "Breakfast", "Wellness consultation", "Departure"] }
            ],
            includes: [
                "Accommodation in yoga retreat center",
                "Daily yoga classes",
                "Meditation sessions",
                "Ayurveda treatments",
                "Healthy organic meals",
                "Wellness consultations",
                "Yoga materials"
            ],
            excludes: [
                "Flights",
                "Travel insurance",
                "Personal items",
                "Tips and gratuities",
                "Extra treatments",
                "Alcohol and tobacco"
            ]
        },
        {
            id: 10,
            name: "Buddhist Trail Tour",
            duration: "6 Days / 5 Nights",
            destination: "Delhi, Bodh Gaya, Sarnath, Varanasi",
            price: "₹30,000 - ₹55,000",
            rating: 4.8,
            reviews: 134,
            image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&h=400&fit=crop",
            tagline: "Sacred sites of Buddhist pilgrimage",
            category: "Spiritual",
            groupSize: "2-20 people",
            bestSeason: "October - March",
            physicalRequirement: "Light fitness level",
            fullDescription: `<p>Follow the spiritual path of Buddha and visit the most sacred Buddhist pilgrimage sites in India. This 6-day tour covers the key locations associated with Buddha's life and teachings.</p>
            <p>From Delhi's Buddhist museums to the Bodhi Tree in Bodh Gaya, from the Dharamekh Stupa in Sarnath to the ghats of Varanasi, this journey offers deep spiritual insights and cultural immersion.</p>
            <p>Perfect for Buddhist pilgrims and those interested in Buddhist history and philosophy.</p>`,
            highlights: ["Bodhi Tree", "Dharamekh Stupa", "Buddhist monasteries", "Ancient temples", "Spiritual teachings", "Meditation sessions"],
            itinerary: [
                { day: 1, title: "Delhi Arrival", activities: ["Arrive in Delhi", "Buddhist museum visit", "Temple tour", "Welcome dinner"] },
                { day: 2, title: "Delhi Exploration", activities: ["More temples", "Historical sites", "Local markets", "Spiritual talks"] },
                { day: 3, title: "Delhi to Bodh Gaya", activities: ["Travel to Bodh Gaya", "Mahabodhi Temple visit", "Bodhi Tree meditation", "Evening prayer"] },
                { day: 4, title: "Bodh Gaya Spiritual", activities: ["Sunrise meditation", "Temple rituals", "Buddhist monastery", "Local village visit"] },
                { day: 5, title: "Bodh Gaya to Sarnath", activities: ["Travel to Sarnath", "Dharamekh Stupa", "Buddhist museum", "Chaukhandi Stupa"] },
                { day: 6, title: "Sarnath to Varanasi", activities: ["Sarnath final tour", "Travel to Varanasi", "Evening Aarti", "Farewell"] }
            ],
            includes: [
                "Accommodation",
                "Daily meals",
                "All guided tours",
                "Meditation sessions",
                "Temple visits",
                "Spiritual guide",
                "Transportation"
            ],
            excludes: [
                "Flights",
                "Personal items",
                "Tips and donations",
                "Offerings",
                "Photography permits",
                "Extra activities"
            ]
        }
    ];

    const package_detail = packagesData.find(p => p.id === packageId);
    
    if (!package_detail) {
        return res.status(404).render('404', { message: 'Package not found' });
    }
    
    // Get similar packages (same category, max 3)
    const similarPackages = packagesData
        .filter(p => p.category === package_detail.category && p.id !== packageId)
        .slice(0, 3);
    
    res.render('pages/package', { package: package_detail, similarPackages });
}

// ==================== BLOGS ====================
module.exports.renderBlogsPage = (req, res) => {
    const blogs = [
        {
            id: 1,
            title: "10 Must-Visit Destinations in Rajasthan",
            author: "Aisha Patel",
            date: "December 20, 2025",
            category: "Travel Guide",
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
            excerpt: "Discover the majestic palaces, vibrant markets, and golden deserts of Rajasthan. From Jaipur's iconic Hawa Mahal to Udaipur's romantic lakes...",
            readTime: "8 min read"
        },
        {
            id: 2,
            title: "The Perfect Kerala Backwaters Itinerary",
            author: "Rohan Gupta",
            date: "December 18, 2025",
            category: "Itinerary",
            image: "https://images.unsplash.com/photo-1512207736139-c87ef5298c73?w=600&h=400&fit=crop",
            excerpt: "Experience the serene backwaters of Kerala with this comprehensive 5-day itinerary. Includes houseboat rides, spice gardens, and pristine beaches...",
            readTime: "6 min read"
        },
        {
            id: 3,
            title: "Budget Travel Guide: India on ₹50,000",
            author: "Maya Sharma",
            date: "December 15, 2025",
            category: "Budget Travel",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
            excerpt: "Travel across India without breaking the bank. Learn insider tips on accommodation, food, and transport for budget-conscious travelers...",
            readTime: "10 min read"
        },
        {
            id: 4,
            title: "Spiritual Journey: 7 Sacred Sites in India",
            author: "Vikram Singh",
            date: "December 12, 2025",
            category: "Spiritual",
            image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&h=400&fit=crop",
            excerpt: "Explore the holiest pilgrimage sites in India. From the Ganges in Varanasi to the Bodhi Tree in Bodh Gaya, connect with India's spiritual soul...",
            readTime: "9 min read"
        },
        {
            id: 5,
            title: "Adventure Activities in the Himalayas",
            author: "Ananya Kapoor",
            date: "December 10, 2025",
            category: "Adventure",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            excerpt: "From paragliding to rock climbing, discover thrilling adventure sports in the majestic Himalayas. Perfect for adrenaline junkies...",
            readTime: "7 min read"
        },
        {
            id: 6,
            title: "Street Food Guide: Culinary Delights of India",
            author: "Priya Nair",
            date: "December 8, 2025",
            category: "Food & Culture",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
            excerpt: "Taste the authentic flavors of India. From Delhi's chaat to Mumbai's vada pav, explore the country's incredible street food scene...",
            readTime: "8 min read"
        },
        {
            id: 7,
            title: "Northeast India: Hidden Gems You Must Explore",
            author: "Arjun Das",
            date: "December 5, 2025",
            category: "Travel Guide",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            excerpt: "Beyond mainstream tourism lies the unexplored beauty of Northeast India. Discover living root bridges, tribal villages, and lush landscapes...",
            readTime: "11 min read"
        },
        {
            id: 8,
            title: "Photography Guide: Capturing India's Beauty",
            author: "Neha Chandra",
            date: "December 3, 2025",
            category: "Photography",
            image: "https://images.unsplash.com/photo-1516306578888-07953691c999?w=600&h=400&fit=crop",
            excerpt: "Learn photography tips and tricks to capture stunning images of India's diverse landscapes, cultures, and people...",
            readTime: "7 min read"
        },
        {
            id: 9,
            title: "Luxury Travel: Palace Hotels of Rajasthan",
            author: "Divya Malhotra",
            date: "November 30, 2025",
            category: "Luxury Travel",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
            excerpt: "Experience royal hospitality in Rajasthan's most luxurious palace hotels. Indulge in spa treatments, fine dining, and heritage experiences...",
            readTime: "6 min read"
        },
        {
            id: 10,
            title: "Wellness Retreats: Yoga & Meditation in India",
            author: "Rishab Sharma",
            date: "November 28, 2025",
            category: "Wellness",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
            excerpt: "Rejuvenate your mind and body with India's best yoga and meditation retreats. Find inner peace in the mountains and beaches...",
            readTime: "8 min read"
        }
    ];

    res.render('pages/blogs', { blogs });
}

module.exports.renderBlogDetailPage = (req, res) => {
    const blogId = parseInt(req.params.id);
    
    const blogsData = [
        {
            id: 1,
            title: "10 Must-Visit Destinations in Rajasthan",
            author: "Aisha Patel",
            date: "December 20, 2025",
            category: "Travel Guide",
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
            excerpt: "Discover the majestic palaces, vibrant markets, and golden deserts of Rajasthan.",
            readTime: "8 min read",
            content: `<p>Rajasthan, the land of kings and queens, is one of India's most iconic travel destinations. With its magnificent palaces, formidable forts, colorful culture, and warm hospitality, Rajasthan offers an unforgettable travel experience.</p>
            <h3>1. Jaipur - The Pink City</h3>
            <p>The capital of Rajasthan, Jaipur, is famous for its distinctive pink-colored buildings and grid-based layout. Don't miss the iconic Hawa Mahal (Palace of Winds), the majestic City Palace, and the astronomical monument Jantar Mantar.</p>
            <h3>2. Udaipur - The City of Lakes</h3>
            <p>Often called the Venice of India, Udaipur is renowned for its stunning lakes, palaces, and temples. The Lake Palace, surrounded by the serene Lake Pichola, is an architectural marvel that must be seen.</p>
            <h3>3. Jaisalmer - The Golden City</h3>
            <p>Located in the Thar Desert, Jaisalmer is famous for its golden sand dunes and intricately carved havelis. Experience the magic of desert safaris and stay overnight in a desert camp.</p>
            <h3>4. Jodhpur - The Blue City</h3>
            <p>Known for its distinctive blue-painted houses, Jodhpur is home to the magnificent Mehrangarh Fort. The city offers breathtaking views of the blue-painted old city from the fort's ramparts.</p>
            <h3>5. Pushkar</h3>
            <p>A sacred pilgrimage site, Pushkar is known for its annual camel fair and the revered Brahma Temple. The holy Pushkar Lake is surrounded by ghats and is an important pilgrimage destination.</p>
            <h3>Travel Tips</h3>
            <p>The best time to visit Rajasthan is between October and March when the weather is pleasant. Book accommodations in advance, especially during peak season. Don't miss the local cuisine, traditional music, and cultural performances.</p>`,
            tags: ["Rajasthan", "Travel Guide", "Destinations", "India"]
        },
        {
            id: 2,
            title: "The Perfect Kerala Backwaters Itinerary",
            author: "Rohan Gupta",
            date: "December 18, 2025",
            category: "Itinerary",
            image: "https://images.unsplash.com/photo-1512207736139-c87ef5298c73?w=600&h=400&fit=crop",
            excerpt: "Experience the serene backwaters of Kerala with this comprehensive 5-day itinerary.",
            readTime: "6 min read",
            content: `<p>Kerala, God's own country, offers some of the most serene and picturesque landscapes in India. The backwaters of Kerala are a network of lagoons and lakes along the Arabian Sea coast, offering a unique travel experience.</p>
            <h3>Day 1: Arrival in Kochi</h3>
            <p>Begin your Kerala journey in Kochi. Explore the colonial charm of Fort Kochi, visit the famous Chinese fishing nets, and wander through the spice markets. The city beautifully blends Portuguese, Dutch, and British influences.</p>
            <h3>Day 2: Munnar Tea Gardens</h3>
            <p>Head to Munnar to experience the lush green tea plantations. Visit tea factories to learn about tea production, trek through the scenic hills, and enjoy the cool climate of the mountains.</p>
            <h3>Days 3-4: Backwater Cruise in Alleppey</h3>
            <p>The highlight of your trip! Board a traditional houseboat and cruise through the serene backwaters. Experience the traditional lifestyle of Kerala, see floating villages, and enjoy authentic Kerala cuisine.</p>
            <h3>Day 5: Beach Relaxation</h3>
            <p>End your trip with a relaxing day at Kovalam Beach. Enjoy the pristine sandy beaches, sunbathe, and try beach activities like swimming and surfing.</p>
            <h3>What to Pack</h3>
            <p>Light cotton clothes, sunscreen, insect repellent, and comfortable walking shoes. Monsoon season (June-August) offers scenic beauty but can be rainy.</p>`,
            tags: ["Kerala", "Backwaters", "Itinerary", "Nature"]
        },
        {
            id: 3,
            title: "Budget Travel Guide: India on ₹50,000",
            author: "Maya Sharma",
            date: "December 15, 2025",
            category: "Budget Travel",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
            excerpt: "Travel across India without breaking the bank.",
            readTime: "10 min read",
            content: `<p>India is one of the most budget-friendly destinations in the world. With proper planning and insider knowledge, you can have an amazing travel experience without spending a fortune.</p>
            <h3>Accommodation</h3>
            <p>Stay in budget hotels, hostels, or guest houses. Average cost: ₹500-1000 per night. Many hostels offer social activities and are great for meeting other travelers.</p>
            <h3>Food</h3>
            <p>Eat at local restaurants and street vendors. A full meal costs ₹100-300. Try local specialties and street food for an authentic culinary experience at budget prices.</p>
            <h3>Transportation</h3>
            <p>Use trains and buses for long-distance travel. Trains are cheaper and more comfortable than flights. Local buses, auto-rickshaws, and taxis are affordable for city transportation.</p>
            <h3>Sightseeing</h3>
            <p>Many monuments and temples have low entry fees (₹10-100). Some monuments are free on certain days. Hire local guides for authentic insights and better deals.</p>
            <h3>Money-Saving Tips</h3>
            <ul><li>Travel during off-peak seasons for cheaper rates</li><li>Book bus tickets in advance for discounts</li><li>Use public transportation instead of taxis</li><li>Stay in homestays for local experiences and better rates</li><li>Get a train pass if planning multiple train journeys</li></ul>`,
            tags: ["Budget Travel", "India", "Money-Saving Tips"]
        },
        {
            id: 4,
            title: "Spiritual Journey: 7 Sacred Sites in India",
            author: "Vikram Singh",
            date: "December 12, 2025",
            category: "Spiritual",
            image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&h=400&fit=crop",
            excerpt: "Explore the holiest pilgrimage sites in India.",
            readTime: "9 min read",
            content: `<p>India is the birthplace of major world religions and is home to countless sacred sites. These pilgrimage destinations attract millions of devotees and seekers from around the world.</p>
            <h3>1. Varanasi - The Holiest City</h3>
            <p>Situated on the banks of the holy Ganges, Varanasi is considered the most sacred city in Hinduism. The evening Aarti (prayer ceremony) at the ghats is a mesmerizing spiritual experience.</p>
            <h3>2. Bodh Gaya - Enlightenment Site</h3>
            <p>The place where Buddha attained enlightenment under the Bodhi Tree. The Mahabodhi Temple, a UNESCO World Heritage Site, is a magnificent architectural marvel.</p>
            <h3>3. Amritsar - The Golden Temple</h3>
            <p>The spiritual center of Sikhism, the Golden Temple is one of the most beautiful and sacred places of worship. The langar (free community kitchen) serves thousands daily.</p>
            <h3>4. Rishikesh - Yoga Capital</h3>
            <p>Known as the gateway to the Himalayas, Rishikesh is renowned for yoga and meditation. Many ashrams offer spiritual teachings and practices.</p>
            <h3>5. Dwarka - Krishna's Kingdom</h3>
            <p>One of the four sacred pilgrimage sites (Char Dham), Dwarka is believed to be the ancient capital of Lord Krishna. The Dwarkadhish Temple is the main attraction.</p>
            <h3>6. Ajanta and Ellora Caves</h3>
            <p>Ancient rock-cut caves with Buddhist, Hindu, and Jain temples showcasing India's spiritual and artistic heritage. UNESCO World Heritage Sites.</p>
            <h3>7. Meenakshi Temple, Madurai</h3>
            <p>One of the oldest and holiest Hindu temples, dedicated to Goddess Meenakshi. The architectural beauty and spiritual vibrance are unmatched.</p>`,
            tags: ["Spiritual", "Pilgrimage", "Sacred Sites"]
        },
        {
            id: 5,
            title: "Adventure Activities in the Himalayas",
            author: "Ananya Kapoor",
            date: "December 10, 2025",
            category: "Adventure",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            excerpt: "From paragliding to rock climbing, discover thrilling adventure sports.",
            readTime: "7 min read",
            content: `<p>The Himalayas offer some of the most thrilling adventure activities in the world. Whether you're an adrenaline junkie or a nature lover, the mountains have something for everyone.</p>
            <h3>Paragliding</h3>
            <p>Experience the thrill of flying over the majestic peaks. Solang Valley in Himachal Pradesh is the paragliding capital of India, offering spectacular aerial views.</p>
            <h3>Rock Climbing</h3>
            <p>Test your strength and skills on the rocky faces of the Himalayas. Professional instructors offer beginner to advanced courses in various locations.</p>
            <h3>Mountain Trekking</h3>
            <p>Trek through alpine meadows, cross mountain passes, and camp under the stars. Popular treks include Roopkund, Kedarkantha, and Chopta.</p>
            <h3>River Rafting</h3>
            <p>Navigate the rushing rapids of Himalayan rivers. The Beas and Sutlej rivers offer thrilling rafting experiences suitable for various skill levels.</p>
            <h3>Mountain Biking</h3>
            <p>Ride through challenging terrains and scenic trails. Mountain biking in the Himalayas combines adventure with stunning landscape photography.</p>
            <h3>Skiing</h3>
            <p>During winter, Himachal Pradesh and Uttarakhand receive snowfall, offering skiing opportunities. Auli is a popular skiing destination.</p>
            <h3>Safety Tips</h3>
            <p>Always hire licensed guides and use proper equipment. Start with easier activities and gradually progress. Stay hydrated and acclimatize to high altitudes.</p>`,
            tags: ["Adventure", "Himalayas", "Sports", "Trekking"]
        },
        {
            id: 6,
            title: "Street Food Guide: Culinary Delights of India",
            author: "Priya Nair",
            date: "December 8, 2025",
            category: "Food & Culture",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
            excerpt: "Taste the authentic flavors of India.",
            readTime: "8 min read",
            content: `<p>Indian street food is a culinary adventure that every traveler must experience. Each region has its own unique flavors, techniques, and specialties.</p>
            <h3>Delhi - Chaat Capital</h3>
            <p>Delhi's Chandni Chowk is famous for its chaat varieties. Try pani puri, gol gappa, chaat, and aloo tikki for an explosion of flavors.</p>
            <h3>Mumbai - Vada Pav</h3>
            <p>The local favorite, vada pav is a crispy potato fritter served with spicy pav (bread). It's affordable, delicious, and available everywhere.</p>
            <h3>Kolkata - Puchka and Jhalmuri</h3>
            <p>Puchka (gol gappa) and jhalmuri (spiced puffed rice) are Kolkata's signature street foods. Street vendors skillfully prepare these with a variety of chutneys and fillings.</p>
            <h3>Chennai - Idli and Dosa</h3>
            <p>These South Indian delicacies are healthier and more filling. Served with coconut chutney and sambar, they're perfect for breakfast or snacks.</p>
            <h3>Jaipur - Pyaaz ke Pakore</h3>
            <p>Onion fritters (pakore) are a Jaipur specialty. Crispy on the outside, soft inside, they're best enjoyed with chai during monsoon season.</p>
            <h3>Food Safety Tips</h3>
            <p>Choose vendors with high footfall, look for proper food handling, avoid raw vegetables at unfamiliar vendors, and drink bottled water only.</p>`,
            tags: ["Street Food", "Food Culture", "India", "Culinary"]
        },
        {
            id: 7,
            title: "Northeast India: Hidden Gems You Must Explore",
            author: "Arjun Das",
            date: "December 5, 2025",
            category: "Travel Guide",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
            excerpt: "Discover the unexplored beauty of Northeast India.",
            readTime: "11 min read",
            content: `<p>Northeast India remains one of India's most underexplored regions, offering pristine natural beauty and authentic cultural experiences away from mainstream tourism.</p>
            <h3>Meghalaya - The Living Root Bridges</h3>
            <p>Cherrapunji and Khynrem are famous for living root bridges built from tree roots by the Khasi tribes. These biological engineering marvels are thousands of years old and still in use.</p>
            <h3>Assam - Tea Gardens</h3>
            <p>Visit the sprawling tea gardens of Assam to learn about tea production. Stay in tea estates, participate in leaf plucking, and taste the world-famous Assam tea.</p>
            <h3>Arunachal Pradesh - Mountain Beauty</h3>
            <p>With pristine forests, snow-capped mountains, and remote villages, Arunachal Pradesh offers untouched natural beauty. Tawang monastery is a must-visit spiritual site.</p>
            <h3>Mizoram - Valley of Blues</h3>
            <p>Blue mountains, bamboo forests, and tribal villages make Mizoram a paradise for nature lovers. Aizawl, the capital, offers panoramic views and tribal culture.</p>
            <h3>Nagaland - Tribal Culture</h3>
            <p>Experience authentic tribal culture at the Hornbill Festival. The Nagas have a distinct culture, cuisine, and traditions that differ from mainstream India.</p>
            <h3>Manipur - The Jewel of India</h3>
            <p>Floating Loktak Lake, Kala Pathar, and Kangla Fort showcase Manipur's natural and historical significance. The state is known for its classical dance form, Manipuri.</p>
            <h3>Travel Tips</h3>
            <p>The Northeast has a unique charm but is less developed for tourism. Book accommodations in advance, hire local guides, learn about the culture, and travel responsibly.</p>`,
            tags: ["Northeast India", "Travel Guide", "Adventure", "Culture"]
        },
        {
            id: 8,
            title: "Photography Guide: Capturing India's Beauty",
            author: "Neha Chandra",
            date: "December 3, 2025",
            category: "Photography",
            image: "https://images.unsplash.com/photo-1516306578888-07953691c999?w=600&h=400&fit=crop",
            excerpt: "Learn photography tips to capture stunning images.",
            readTime: "7 min read",
            content: `<p>India's diversity provides endless photography opportunities. From ancient temples to vibrant street scenes, from mountain landscapes to colorful festivals, India is a photographer's paradise.</p>
            <h3>Golden Hour Magic</h3>
            <p>Shoot during golden hours (sunrise and sunset) for warm, flattering light. Many of India's iconic monuments are most beautiful during these hours.</p>
            <h3>Street Photography</h3>
            <p>Capture authentic moments of daily life. Ask permission before photographing people, respect their privacy, and immerse yourself in local culture for genuine shots.</p>
            <h3>Landscape Photography</h3>
            <p>Use wide-angle lenses to capture expansive mountain vistas, desert landscapes, and water bodies. Include elements like people or landmarks for scale and interest.</p>
            <h3>Temple and Monument Photography</h3>
            <p>Research the best angles and times to photograph monuments. Symmetry, patterns, and intricate details of Indian architecture provide excellent photo opportunities.</p>
            <h3>Festival Photography</h3>
            <p>Festivals offer colorful, dynamic scenes. Be respectful during religious ceremonies, use fast shutter speeds to freeze action, and capture both wide shots and close-ups.</p>
            <h3>Essential Gear</h3>
            <p>A good DSLR or mirrorless camera, versatile lenses (24-70mm and 70-200mm), tripod, extra batteries, and memory cards. Smartphones can also produce excellent photos.</p>
            <h3>Post-Processing Tips</h3>
            <p>Enhance colors, adjust exposure, crop for composition, and add filters subtly. Edit your images to reflect what you saw, not to create a false reality.</p>`,
            tags: ["Photography", "Travel Photography", "India", "Tips"]
        },
        {
            id: 9,
            title: "Luxury Travel: Palace Hotels of Rajasthan",
            author: "Divya Malhotra",
            date: "November 30, 2025",
            category: "Luxury Travel",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
            excerpt: "Experience royal hospitality in palace hotels.",
            readTime: "6 min read",
            content: `<p>Rajasthan's heritage palace hotels offer a unique blend of historical grandeur and modern luxury. Stay like royalty in these magnificent converted palaces and forts.</p>
            <h3>Lake Palace, Udaipur</h3>
            <p>This stunning palace floats on Lake Pichola. Its ornate architecture, fine dining, spa services, and lake views make it one of the world's most romantic hotels.</p>
            <h3>Umaid Bhawan Palace, Jodhpur</h3>
            <p>One of India's largest private residences, this Art Deco palace offers luxurious rooms, gourmet dining, and authentic royal experiences in the Blue City.</p>
            <h3>Taj Lake Palace, Udaipur</h3>
            <p>A sister property of Lake Palace, Taj Lake Palace offers opulent rooms, world-class amenities, and personalized service with stunning lake and palace views.</p>
            <h3>Rambagh Palace, Jaipur</h3>
            <p>Once the royal residence of Jaipur's Maharaja, this palace hotel features elegant rooms, spa services, and exquisite Indian and international cuisine.</p>
            <h3>Spa and Wellness</h3>
            <p>Palace hotels offer luxurious spa treatments using traditional Ayurvedic practices. Rejuvenate in opulent surroundings with skilled therapists.</p>
            <h3>Fine Dining</h3>
            <p>Enjoy royal cuisine prepared by expert chefs. Multi-course dinners feature traditional Rajasthani dishes served in magnificent dining halls.</p>`,
            tags: ["Luxury Travel", "Palace Hotels", "Rajasthan", "Hospitality"]
        },
        {
            id: 10,
            title: "Wellness Retreats: Yoga & Meditation in India",
            author: "Rishab Sharma",
            date: "November 28, 2025",
            category: "Wellness",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
            excerpt: "Rejuvenate your mind and body with India's wellness retreats.",
            readTime: "8 min read",
            content: `<p>India is the birthplace of yoga and Ayurveda. Wellness retreats offer transformative experiences combining ancient practices with modern amenities.</p>
            <h3>Rishikesh - Yoga Capital</h3>
            <p>Nestled on the Ganges, Rishikesh is the hub of yoga and spirituality. Numerous ashrams offer yoga classes, meditation sessions, and spiritual teachings.</p>
            <h3>Goa - Beachside Wellness</h3>
            <p>Enjoy yoga and meditation with the sound of waves. Many beachside resorts in Goa combine wellness practices with a relaxing beach atmosphere.</p>
            <h3>Kerala - Ayurvedic Healing</h3>
            <p>Ayurveda originated in Kerala. Retreat centers offer personalized Ayurvedic treatments, oils, and therapies combined with yoga and meditation.</p>
            <h3>Himalayas - Mountain Serenity</h3>
            <p>Yoga retreats in the mountains provide a peaceful environment away from crowds. The cool climate and serene surroundings enhance the wellness experience.</p>
            <h3>Ayurvedic Treatments</h3>
            <p>Experience panchakarma (detoxification), oil massages, herbal treatments, and personalized wellness programs based on your doshas.</p>
            <h3>What to Expect</h3>
            <p>Expect early morning yoga and meditation, healthy meals, Ayurvedic consultations, and spiritual teachings. Most retreats last 7-14 days for transformative results.</p>`,
            tags: ["Wellness", "Yoga", "Meditation", "Ayurveda"]
        }
    ];

    const blog = blogsData.find(b => b.id === blogId);
    
    if (!blog) {
        return res.status(404).render('404', { message: 'Blog not found' });
    }
    
    // Get related blogs (same category, max 3)
    const relatedBlogs = blogsData
        .filter(b => b.category === blog.category && b.id !== blogId)
        .slice(0, 3);
    
    res.render('pages/blog', { blog, relatedBlogs });
}

// Render plan trip page - moved to async version above
module.exports.renderBookNowPage = (req, res) => {
    const destinations = [
        'Kerala',
        'Rajasthan',
        'Goa',
        'Himachal Pradesh',
        'Tamil Nadu',
        'Uttar Pradesh',
        'Karnataka',
        'Uttarakhand'
    ];

    const months = [
        'January 2025',
        'February 2025',
        'March 2025',
        'April 2025',
        'May 2025',
        'June 2025',
        'July 2025',
        'August 2025',
        'September 2025',
        'October 2025',
        'November 2025',
        'December 2025'
    ];

    const budgetRanges = [
        'Budget (₹20K - ₹40K)',
        'Mid-range (₹40K - ₹80K)',
        'Premium (₹80K - ₹150K)',
        'Luxury (₹150K+)'
    ];

    const popularPackages = [
        {
            id: 1,
            name: 'Kerala Backwaters Paradise',
            image: 'https://images.unsplash.com/photo-1537144191519-cf4baaff0fb0?w=500&h=400&fit=crop',
            price: '₹35,000',
            duration: '5 Days',
            highlights: ['Houseboat stay', 'Backwater cruise', 'Beach resort']
        },
        {
            id: 2,
            name: 'Rajasthan Royal Heritage',
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=400&fit=crop',
            price: '₹45,000',
            duration: '6 Days',
            highlights: ['Palace visits', 'Desert safari', 'Local cuisine']
        },
        {
            id: 3,
            name: 'Himalayan Adventure Trek',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
            price: '₹50,000',
            duration: '7 Days',
            highlights: ['Mountain trek', 'Valley views', 'Local villages']
        }
    ];

    res.render('pages/book-now', { 
        destinations,
        months,
        budgetRanges,
        popularPackages
    });
}

// ==================== TRIP BOOKING API ====================
module.exports.submitTripBooking = async (req, res) => {
    try {
        const { destination, startDate, endDate, travelers, budget, travelStyle, accommodation, transport, interests, name, email, phone, message } = req.body;

        // Validate required fields
        if (!destination || !startDate || !endDate || !travelers || !budget || !name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields',
                errors: {
                    destination: !destination ? 'Destination is required' : null,
                    startDate: !startDate ? 'Start date is required' : null,
                    endDate: !endDate ? 'End date is required' : null,
                    travelers: !travelers ? 'Number of travelers is required' : null,
                    budget: !budget ? 'Budget is required' : null,
                    name: !name ? 'Name is required' : null,
                    email: !email ? 'Email is required' : null,
                    phone: !phone ? 'Phone is required' : null
                }
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Validate date logic
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: 'End date must be after start date'
            });
        }

        // Parse destination (it comes as JSON string from form)
        let destinationData;
        try {
            destinationData = typeof destination === 'string' ? JSON.parse(destination) : destination;
        } catch (e) {
            destinationData = { name: destination, region: 'North' };
        }

        // Create new trip booking
        const TripBooking = require('../models/TripBooking');
        
        const booking = new TripBooking({
            destination: destinationData.name || destination,
            travelMonth: startDate,
            endDate: endDate,
            travelers: parseInt(travelers) || 1,
            budgetRange: budget,
            travelStyles: Array.isArray(travelStyle) ? travelStyle : (travelStyle ? [travelStyle] : []),
            accommodationType: accommodation || 'Not specified',
            transportMode: transport || 'Not specified',
            interests: Array.isArray(interests) ? interests : (interests ? [interests] : []),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            specialRequests: message || '',
            status: 'pending',
            priority: 'medium',
            source: 'website'
        });

        // Save to database
        await booking.save();

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Your trip booking request has been submitted successfully! Our team will contact you within 24 hours.',
            bookingId: booking._id,
            booking: {
                id: booking._id,
                name: booking.name,
                email: booking.email,
                destination: booking.destination,
                travelMonth: booking.travelMonth,
                travelers: booking.travelers,
                status: booking.status,
                createdAt: booking.createdAt
            }
        });

    } catch (error) {
        console.error('Error submitting trip booking:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing your booking. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}