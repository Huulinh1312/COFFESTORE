const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');

const protect = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization || '';
        if (!authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const token = authorization.slice(7);
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'development-secret'
        );
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const admin = (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    res.status(403).json({ message: 'Admin access required' });
};

module.exports = { protect, admin };