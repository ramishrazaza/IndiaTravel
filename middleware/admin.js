// Admin Authentication Middleware
module.exports.isAdminLoggedIn = (req, res, next) => {
    if (req.session && req.session.adminId) {
        req.adminId = req.session.adminId;
        req.admin = req.session.admin;
        next();
    } else {
        res.redirect('/admin/login');
    }
};

module.exports.isAdminNotLoggedIn = (req, res, next) => {
    if (req.session && req.session.adminId) {
        res.redirect('/admin/dashboard');
    } else {
        next();
    }
};

module.exports.adminErrorHandler = (err, req, res, next) => {
    console.error('❌ Admin Error:', err);
    res.status(err.statusCode || 500).render('admin/error', {
        message: err.message || 'An error occurred',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};
