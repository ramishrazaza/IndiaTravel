require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Destination = require('./models/Destination');
const Experience = require('./models/Experience');
const Blog = require('./models/Blog');
const Testimonial = require('./models/Testimonial');
const Package = require('./models/Package');

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Clear existing data
        await Destination.deleteMany({});
        await Experience.deleteMany({});
        await Blog.deleteMany({});
        await Testimonial.deleteMany({});
        await Package.deleteMany({});
        
        console.log('🗑️  Cleared existing data');
        
        // Seed Destinations
        const destinations = await Destination.insertMany([
            {
                name: 'Taj Mahal',
                region: 'North',
                description: 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river. It is a UNESCO World Heritage Site.',
                shortDescription: 'Ivory-white marble mausoleum',
                image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
                bestTimeToVisit: 'October - March',
                temperature: '15-25°C',
                attractions: ['Taj Mahal', 'Agra Fort', 'Itimad-ud-Daulah'],
                highlights: ['Marble Architecture', 'Sunrise View', 'Night Show'],
                rating: 4.9,
                reviewCount: 5420
            },
            {
                name: 'Kerala Backwaters',
                region: 'South',
                description: 'The backwaters of Kerala are lagoons and lakes lying parallel to the Arabian Sea coast. They form a network of waterways.',
                shortDescription: 'Network of beautiful lagoons',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                bestTimeToVisit: 'June - August',
                temperature: '28-32°C',
                attractions: ['Houseboats', 'Alleppey', 'Kumarakom'],
                highlights: ['Houseboat Cruise', 'Sunset View', 'Local Cuisine'],
                rating: 4.8,
                reviewCount: 4230
            },
            {
                name: 'Himalayan Mountains',
                region: 'North',
                description: 'The Himalayas are the world\'s highest mountain range spanning multiple countries. Home to trekking and adventure.',
                shortDescription: 'World\'s highest mountain range',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                bestTimeToVisit: 'May - September',
                temperature: '5-15°C',
                attractions: ['Mount Everest View', 'Manali', 'Shimla'],
                highlights: ['Trekking', 'Mountain Views', 'Adventure'],
                rating: 4.7,
                reviewCount: 3890
            },
            {
                name: 'Goa Beaches',
                region: 'West',
                description: 'Goa is famous for its beaches, churches, and Portuguese colonial architecture. A perfect beach destination.',
                shortDescription: 'Tropical beaches and Portuguese culture',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
                bestTimeToVisit: 'November - February',
                temperature: '20-32°C',
                attractions: ['Baga Beach', 'Anjuna Beach', 'Basilica of Bom Jesus'],
                highlights: ['Beach Parties', 'Water Sports', 'Nightlife'],
                rating: 4.6,
                reviewCount: 6120
            },
            {
                name: 'Varanasi',
                region: 'North',
                description: 'Varanasi, also called Benares, is one of the oldest cities in the world and the holiest city of Hinduism.',
                shortDescription: 'Sacred city on the Ganges',
                image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
                bestTimeToVisit: 'October - March',
                temperature: '15-28°C',
                attractions: ['Ghats', 'Kashi Vishwanath Temple', 'Varanasi Boat Rides'],
                highlights: ['Spiritual Awakening', 'Aarti Ceremony', 'Sunrise Boat Ride'],
                rating: 4.7,
                reviewCount: 4560
            },
            {
                name: 'Jaipur',
                region: 'North',
                description: 'The pink city of Jaipur is famous for its stunning architecture and vibrant culture. Home to City Palace and Hawa Mahal.',
                shortDescription: 'The Pink City with royal heritage',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                bestTimeToVisit: 'October - March',
                temperature: '15-30°C',
                attractions: ['City Palace', 'Hawa Mahal', 'Jantar Mantar'],
                highlights: ['Royal Architecture', 'Local Markets', 'Palace Tours'],
                rating: 4.5,
                reviewCount: 5320
            },
            {
                name: 'Darjeeling',
                region: 'Northeast',
                description: 'A scenic hill station in West Bengal famous for its tea gardens, colonial architecture, and the Kanchenjunga mountain.',
                shortDescription: 'Tea gardens and mountain views',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                bestTimeToVisit: 'September - June',
                temperature: '5-15°C',
                attractions: ['Tea Gardens', 'Toy Train', 'Kanchenjunga Peak'],
                highlights: ['Mountain Railway', 'Tea Tasting', 'Sunrise View'],
                rating: 4.6,
                reviewCount: 3450
            }
        ]);
        
        console.log(`✅ Seeded ${destinations.length} destinations`);
        
        // Seed Experiences
        const experiences = await Experience.insertMany([
            {
                title: 'Spiritual Yoga Retreat',
                category: 'Spiritual',
                description: 'Join a transformative yoga and meditation retreat in the foothills of the Himalayas.',
                image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
                duration: '7 days',
                price: 799,
                difficulty: 'Easy',
                activities: ['Yoga', 'Meditation', 'Ayurveda'],
                rating: 4.9,
                reviewCount: 1230,
                featured: true
            },
            {
                title: 'Mountain Trekking Adventure',
                category: 'Adventure',
                description: 'Challenge yourself with an adventurous trek through the Himalayan peaks.',
                image: 'https://images.unsplash.com/photo-1551632786-fb3f14e4b0ca?w=400&h=300&fit=crop',
                duration: '5 days',
                price: 699,
                difficulty: 'Hard',
                activities: ['Trekking', 'Camping', 'Rock Climbing'],
                rating: 4.8,
                reviewCount: 890,
                featured: true
            },
            {
                title: 'Beach Paradise Escape',
                category: 'Beach',
                description: 'Relax on pristine beaches with crystal clear waters and enjoy water sports.',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
                duration: '4 days',
                price: 599,
                difficulty: 'Easy',
                activities: ['Swimming', 'Snorkeling', 'Beach Volleyball'],
                rating: 4.7,
                reviewCount: 2100,
                featured: true
            },
            {
                title: 'Royal Heritage Tour',
                category: 'Heritage',
                description: 'Explore the grand palaces and forts of Rajasthan with expert guides.',
                image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
                duration: '6 days',
                price: 849,
                difficulty: 'Moderate',
                activities: ['Palace Tours', 'Local Markets', 'Cultural Shows'],
                rating: 4.6,
                reviewCount: 1560,
                featured: true
            }
        ]);
        
        console.log(`✅ Seeded ${experiences.length} experiences`);
        
        // Seed Blogs
        const blogs = await Blog.insertMany([
            {
                title: '10 Hidden Gems of India You Must Visit',
                author: 'Travel Expert',
                category: 'Destination Guide',
                content: 'Discover the lesser-known destinations in India that offer authentic experiences...',
                excerpt: 'Discover the lesser-known destinations in India that offer authentic experiences away from tourist crowds.',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                tags: ['Travel', 'India', 'Adventure'],
                rating: 4.8,
                viewCount: 5420,
                featured: true
            },
            {
                title: 'Budget Travel Guide: Exploring India on a Shoestring',
                author: 'Budget Traveler',
                category: 'Budget Travel',
                content: 'Learn how to explore the beauty of India without breaking your budget...',
                excerpt: 'Learn how to explore the beauty of India without breaking your budget with these insider tips.',
                image: 'https://images.unsplash.com/photo-1504681869696-d977e9d34c4b?w=400&h=300&fit=crop',
                tags: ['Budget', 'Tips', 'Travel'],
                rating: 4.7,
                viewCount: 4230,
                featured: true
            },
            {
                title: 'Tasting India: 5 Must-Try Dishes from Different Regions',
                author: 'Food Critic',
                category: 'Food & Culture',
                content: 'Experience the diverse culinary traditions of India with these iconic dishes...',
                excerpt: 'Experience the diverse culinary traditions of India with these iconic dishes and food experiences.',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
                tags: ['Food', 'Culture', 'Cuisine'],
                rating: 4.9,
                viewCount: 6890,
                featured: true
            }
        ]);
        
        console.log(`✅ Seeded ${blogs.length} blogs`);
        
        // Seed Testimonials
        const testimonials = await Testimonial.insertMany([
            {
                name: 'Sarah Johnson',
                location: 'USA',
                image: 'https://i.pravatar.cc/150?img=1',
                text: 'My trip to India was absolutely magical! The team was professional and the itinerary was perfectly planned.',
                rating: 5,
                tripType: 'Spiritual Retreat',
                featured: true
            },
            {
                name: 'Mike Chen',
                location: 'Singapore',
                image: 'https://i.pravatar.cc/150?img=2',
                text: 'Best adventure trip ever! The guides were knowledgeable and the trekking experience was unforgettable.',
                rating: 5,
                tripType: 'Mountain Trek',
                featured: true
            },
            {
                name: 'Emma Wilson',
                location: 'UK',
                image: 'https://i.pravatar.cc/150?img=3',
                text: 'The beach experience in Goa was perfect. Excellent service and attention to detail throughout the trip.',
                rating: 4,
                tripType: 'Beach Holiday',
                featured: true
            },
            {
                name: 'Rajesh Patel',
                location: 'India',
                image: 'https://i.pravatar.cc/150?img=4',
                text: 'Fantastic experience exploring my own country with IndiaTravel. Highly recommended for everyone!',
                rating: 5,
                tripType: 'Heritage Tour',
                featured: true
            }
        ]);
        
        console.log(`✅ Seeded ${testimonials.length} testimonials`);
        
        // Seed Packages
        const packages = await Package.insertMany([
            {
                name: 'Taj Mahal & Agra Explorer',
                destination: 'Agra',
                duration: '3 days',
                price: 499,
                description: 'Experience the wonder of the Taj Mahal and explore the historic city of Agra.',
                image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
                itinerary: ['Day 1: Arrive in Agra', 'Day 2: Taj Mahal & Agra Fort', 'Day 3: Local exploration'],
                inclusions: ['Hotel', 'Meals', 'Guide', 'Transport'],
                exclusions: ['Flights', 'Travel Insurance'],
                groupSize: '2-10 people',
                difficulty: 'Easy',
                bestSeason: ['October', 'November', 'February', 'March'],
                rating: 4.8,
                reviewCount: 2340,
                featured: true
            },
            {
                name: 'Kerala Backwater Cruise',
                destination: 'Kerala',
                duration: '4 days',
                price: 699,
                description: 'Relax on a houseboat and explore the serene backwaters of Kerala.',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                itinerary: ['Day 1: Arrive in Kochi', 'Day 2-3: Houseboat cruise', 'Day 4: Local sightseeing'],
                inclusions: ['Houseboat', 'Meals', 'Sightseeing', 'Guide'],
                exclusions: ['Flights', 'Drinks'],
                groupSize: '2-8 people',
                difficulty: 'Easy',
                bestSeason: ['June', 'July', 'August', 'September'],
                rating: 4.9,
                reviewCount: 3120,
                featured: true
            }
        ]);
        
        console.log(`✅ Seeded ${packages.length} packages`);
        
        console.log('\n🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
