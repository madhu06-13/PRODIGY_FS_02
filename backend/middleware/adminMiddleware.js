const admin = (req, res, next) => {
    // console.log('Admin Middleware Check:', req.user); // Debug log
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Authorization denied: Admins only' });
    }
};

module.exports = admin;
