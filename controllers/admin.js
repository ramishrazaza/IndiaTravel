const Admin = require('../models/Admin');
const Destination = require('../models/Destination');
const Experience = require('../models/Experience');
const Package = require('../models/Package');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');
const TripBooking = require('../models/TripBooking');
const AIPlan = require('../models/AIPlan');

// ==================== ADMIN AUTHENTICATION ====================
module.exports.renderLoginPage = (req, res) => {
    res.render('admin/login', { message: null, error: null });
};

module.exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ username: username.toLowerCase() });
        
        console.log('🔍 Login attempt for:', username);
        console.log('📊 Admin found:', !!admin);
        
        if (!admin) {
            console.log('❌ Admin not found');
            return res.render('admin/login', { 
                error: 'Invalid username or password',
                message: null 
            });
        }
        
        console.log('🔐 Comparing passwords...');
        const isMatch = await admin.comparePassword(password);
        console.log('✅ Password match result:', isMatch);
        
        if (!isMatch) {
            console.log('❌ Password does not match');
            return res.render('admin/login', { 
                error: 'Invalid username or password',
                message: null 
            });
        }
        
        if (!admin.isActive) {
            console.log('❌ Admin account is inactive');
            return res.render('admin/login', { 
                error: 'Your account has been deactivated',
                message: null 
            });
        }
        
        // Update last login
        await admin.updateLastLogin();
        
        // Set session
        req.session.adminId = admin._id;
        req.session.admin = {
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            fullName: admin.fullName,
            role: admin.role
        };
        
        console.log('✅ Admin logged in:', admin.username);
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('❌ Login error:', error);
        res.render('admin/login', { 
            error: 'An error occurred during login: ' + error.message,
            message: null 
        });
    }
};

module.exports.adminLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error('❌ Logout error:', err);
        console.log('✅ Admin logged out');
        res.redirect('/admin/login');
    });
};

// ==================== DASHBOARD ====================
module.exports.renderDashboard = async (req, res) => {
    try {
        const stats = {
            destinations: await Destination.countDocuments(),
            experiences: await Experience.countDocuments(),
            packages: await Package.countDocuments(),
            blogs: await Blog.countDocuments(),
            testimonials: await Testimonial.countDocuments(),
            bookings: await TripBooking.countDocuments(),
            aiPlans: await AIPlan.countDocuments()
        };
        
        const message = req.query.message || null;
        
        res.render('admin/dashboard', { 
            title: 'Dashboard',
            page: 'dashboard',
            stats,
            message,
            error: null
        });
    } catch (error) {
        console.error('❌ Dashboard error:', error);
        res.render('admin/dashboard', { 
            title: 'Dashboard',
            page: 'dashboard',
            stats: {},
            message: null,
            error: error.message
        });
    }
};

// ==================== DESTINATIONS ====================
module.exports.renderDestinationsList = async (req, res) => {
    try {
        const destinations = await Destination.find().limit(100);
        const message = req.query.message || null;
        const error = req.query.error || null;
        
        res.render('admin/destinations/list', { 
            title: 'Destinations',
            page: 'destinations-list',
            destinations,
            message,
            error
        });
    } catch (error) {
        res.render('admin/destinations/list', { 
            title: 'Destinations',
            page: 'destinations-list',
            destinations: [], 
            message: null,
            error: error.message 
        });
    }
};

module.exports.renderDestinationForm = async (req, res) => {
    try {
        if (req.params.id && req.params.id !== 'new') {
            const destination = await Destination.findById(req.params.id);
            if (!destination) {
                return res.redirect('/admin/destinations?error=Destination not found');
            }
            return res.render('admin/destinations/form', { 
                title: 'Edit Destination',
                page: 'destinations-form',
                destination, 
                isEdit: true,
                message: null,
                error: null
            });
        }
        res.render('admin/destinations/form', { 
            title: 'Create Destination',
            page: 'destinations-form',
            destination: {}, 
            isEdit: false,
            message: null,
            error: null
        });
    } catch (error) {
        res.redirect('/admin/destinations?error=' + encodeURIComponent(error.message));
    }
};

module.exports.saveDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, region, description, image, bestTimeToVisit, famousFor } = req.body;
        
        const destData = { name, region, description, image, bestTimeToVisit, famousFor };
        
        if (id && id !== 'new') {
            await Destination.findByIdAndUpdate(id, destData);
            res.redirect('/admin/destinations?message=Destination updated successfully');
        } else {
            await Destination.create(destData);
            res.redirect('/admin/destinations?message=Destination created successfully');
        }
    } catch (error) {
        res.redirect('/admin/destinations?error=' + error.message);
    }
};

module.exports.deleteDestination = async (req, res) => {
    try {
        await Destination.findByIdAndDelete(req.params.id);
        res.redirect('/admin/destinations?message=Destination deleted successfully');
    } catch (error) {
        res.redirect('/admin/destinations?error=' + error.message);
    }
};

// ==================== EXPERIENCES ====================
module.exports.renderExperiencesList = async (req, res) => {
    try {
        const experiences = await Experience.find().limit(100);
        const message = req.query.message || null;
        const error = req.query.error || null;
        res.render('admin/experiences/list', { title: 'Experiences', page: 'experiences-list', experiences, message, error });
    } catch (error) {
        res.render('admin/experiences/list', { title: 'Experiences', page: 'experiences-list', experiences: [], message: null, error: error.message });
    }
};

module.exports.renderExperienceForm = async (req, res) => {
    try {
        if (req.params.id && req.params.id !== 'new') {
            const experience = await Experience.findById(req.params.id);
            return res.render('admin/experiences/form', { title: 'Edit Experience', page: 'experiences-form', experience, isEdit: true, message: null, error: null });
        }
        res.render('admin/experiences/form', { title: 'Create Experience', page: 'experiences-form', experience: {}, isEdit: false, message: null, error: null });
    } catch (error) {
        res.render('admin/experiences/form', { title: 'Experience Form', page: 'experiences-form', experience: {}, isEdit: false, message: null, error: error.message });
    }
};

module.exports.saveExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, description, image, price, duration } = req.body;
        
        const data = { title, category, description, image, price: parseFloat(price), duration };
        
        if (id && id !== 'new') {
            await Experience.findByIdAndUpdate(id, data);
            res.redirect('/admin/experiences?message=Experience updated successfully');
        } else {
            await Experience.create(data);
            res.redirect('/admin/experiences?message=Experience created successfully');
        }
    } catch (error) {
        res.redirect('/admin/experiences?error=' + error.message);
    }
};

module.exports.deleteExperience = async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.redirect('/admin/experiences?message=Experience deleted successfully');
    } catch (error) {
        res.redirect('/admin/experiences?error=' + error.message);
    }
};

// ==================== PACKAGES ====================
module.exports.renderPackagesList = async (req, res) => {
    try {
        const packages = await Package.find().limit(100);
        const message = req.query.message || null;
        const error = req.query.error || null;
        res.render('admin/packages/list', { title: 'Packages', page: 'packages-list', packages, message, error });
    } catch (error) {
        res.render('admin/packages/list', { title: 'Packages', page: 'packages-list', packages: [], message: null, error: error.message });
    }
};

module.exports.renderPackageForm = async (req, res) => {
    try {
        if (req.params.id && req.params.id !== 'new') {
            const package = await Package.findById(req.params.id);
            return res.render('admin/packages/form', { title: 'Edit Package', page: 'packages-form', package, isEdit: true, message: null, error: null });
        }
        res.render('admin/packages/form', { title: 'Create Package', page: 'packages-form', package: {}, isEdit: false, message: null, error: null });
    } catch (error) {
        res.render('admin/packages/form', { title: 'Package Form', page: 'packages-form', package: {}, isEdit: false, message: null, error: error.message });
    }
};

module.exports.savePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, destination, price, duration, description, image, destinations, inclusions } = req.body;
        
        const data = {
            name,
            destination: destination || destinations,
            price: parseFloat(price),
            duration,
            description,
            image,
            inclusions: inclusions ? (typeof inclusions === 'string' ? inclusions.split(',').map(i => i.trim()) : inclusions) : []
        };
        
        if (id && id !== 'new') {
            await Package.findByIdAndUpdate(id, data);
            res.redirect('/admin/packages?message=Package updated successfully');
        } else {
            await Package.create(data);
            res.redirect('/admin/packages?message=Package created successfully');
        }
    } catch (error) {
        res.redirect('/admin/packages?error=' + error.message);
    }
};

module.exports.deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.redirect('/admin/packages?message=Package deleted successfully');
    } catch (error) {
        res.redirect('/admin/packages?error=' + error.message);
    }
};

// ==================== BLOGS ====================
module.exports.renderBlogsList = async (req, res) => {
    try {
        const blogs = await Blog.find().limit(100);
        const message = req.query.message || null;
        const error = req.query.error || null;
        res.render('admin/blogs/list', { title: 'Blogs', page: 'blogs-list', blogs, message, error });
    } catch (error) {
        res.render('admin/blogs/list', { title: 'Blogs', page: 'blogs-list', blogs: [], message: null, error: error.message });
    }
};

module.exports.renderBlogForm = async (req, res) => {
    try {
        if (req.params.id && req.params.id !== 'new') {
            const blog = await Blog.findById(req.params.id);
            return res.render('admin/blogs/form', { title: 'Edit Blog', page: 'blogs-form', blog, isEdit: true, message: null, error: null });
        }
        res.render('admin/blogs/form', { title: 'Create Blog', page: 'blogs-form', blog: {}, isEdit: false, message: null, error: null });
    } catch (error) {
        res.render('admin/blogs/form', { title: 'Blog Form', page: 'blogs-form', blog: {}, isEdit: false, message: null, error: error.message });
    }
};

module.exports.saveBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, content, image, tags } = req.body;
        
        const data = {
            title,
            author: author || 'IndiaTravel Team',
            content,
            image,
            tags: tags ? (typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags) : []
        };
        
        if (id && id !== 'new') {
            await Blog.findByIdAndUpdate(id, data);
            res.redirect('/admin/blogs?message=Blog updated successfully');
        } else {
            await Blog.create(data);
            res.redirect('/admin/blogs?message=Blog created successfully');
        }
    } catch (error) {
        res.redirect('/admin/blogs?error=' + error.message);
    }
};

module.exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/admin/blogs?message=Blog deleted successfully');
    } catch (error) {
        res.redirect('/admin/blogs?error=' + error.message);
    }
};

// ==================== TESTIMONIALS ====================
module.exports.renderTestimonialsList = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().limit(100);
        const message = req.query.message || null;
        const error = req.query.error || null;
        res.render('admin/testimonials/list', { title: 'Testimonials', page: 'testimonials-list', testimonials, message, error });
    } catch (error) {
        res.render('admin/testimonials/list', { title: 'Testimonials', page: 'testimonials-list', testimonials: [], message: null, error: error.message });
    }
};

module.exports.renderTestimonialForm = async (req, res) => {
    try {
        if (req.params.id && req.params.id !== 'new') {
            const testimonial = await Testimonial.findById(req.params.id);
            return res.render('admin/testimonials/form', { title: 'Edit Testimonial', page: 'testimonials-form', testimonial, isEdit: true, message: null, error: null });
        }
        res.render('admin/testimonials/form', { title: 'Create Testimonial', page: 'testimonials-form', testimonial: {}, isEdit: false, message: null, error: null });
    } catch (error) {
        res.render('admin/testimonials/form', { title: 'Testimonial Form', page: 'testimonials-form', testimonial: {}, isEdit: false, message: null, error: error.message });
    }
};

module.exports.saveTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, text, rating, image, location } = req.body;
        
        const data = {
            name,
            text,
            rating: parseFloat(rating),
            image,
            location
        };
        
        if (id && id !== 'new') {
            await Testimonial.findByIdAndUpdate(id, data);
            res.redirect('/admin/testimonials?message=Testimonial updated successfully');
        } else {
            await Testimonial.create(data);
            res.redirect('/admin/testimonials?message=Testimonial created successfully');
        }
    } catch (error) {
        res.redirect('/admin/testimonials?error=' + error.message);
    }
};

module.exports.deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.redirect('/admin/testimonials?message=Testimonial deleted successfully');
    } catch (error) {
        res.redirect('/admin/testimonials?error=' + error.message);
    }
};

// ==================== BOOKINGS ====================
module.exports.renderBookingsList = async (req, res) => {
    try {
        const bookings = await TripBooking.find().sort({ createdAt: -1 }).limit(100);
        const message = req.query.message || null;
        const error = req.query.error || null;
        res.render('admin/bookings/list', { title: 'Bookings', page: 'bookings-list', bookings, message, error });
    } catch (error) {
        res.render('admin/bookings/list', { title: 'Bookings', page: 'bookings-list', bookings: [], message: null, error: error.message });
    }
};

module.exports.viewBooking = async (req, res) => {
    try {
        const booking = await TripBooking.findById(req.params.id);
        res.render('admin/bookings/view', { title: 'View Booking', page: 'bookings-view', booking, message: null, error: null });
    } catch (error) {
        res.redirect('/admin/bookings?error=' + error.message);
    }
};

module.exports.deleteBooking = async (req, res) => {
    try {
        await TripBooking.findByIdAndDelete(req.params.id);
        res.redirect('/admin/bookings?message=Booking deleted successfully');
    } catch (error) {
        res.redirect('/admin/bookings?error=' + error.message);
    }
};

// ==================== AI PLANS ====================
module.exports.renderAIPlansList = async (req, res) => {
    try {
        const aiPlans = await AIPlan.find().sort({ createdAt: -1 }).limit(100);
        const message = req.query.message || null;
        const error = req.query.error || null;
        res.render('admin/aiplans/list', { title: 'AI Plans', page: 'aiplans-list', aiPlans, message, error });
    } catch (error) {
        res.render('admin/aiplans/list', { title: 'AI Plans', page: 'aiplans-list', aiPlans: [], message: null, error: error.message });
    }
};

module.exports.viewAIPlan = async (req, res) => {
    try {
        const aiPlan = await AIPlan.findById(req.params.id);
        res.render('admin/aiplans/view', { title: 'View AI Plan', page: 'aiplans-view', aiPlan, message: null, error: null });
    } catch (error) {
        res.redirect('/admin/aiplans?error=' + error.message);
    }
};

module.exports.deleteAIPlan = async (req, res) => {
    try {
        await AIPlan.findByIdAndDelete(req.params.id);
        res.redirect('/admin/aiplans?message=AI Plan deleted successfully');
    } catch (error) {
        res.redirect('/admin/aiplans?error=' + error.message);
    }
};
