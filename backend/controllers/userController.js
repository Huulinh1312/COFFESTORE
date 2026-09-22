const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');

const createToken = (user) => jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'development-secret',
    { expiresIn: '30d' }
);

const publicUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
});

const register = async (req, res, next) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, phone, role });
        res.status(201).json({ ...publicUser(user), token: createToken(user) });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ ...publicUser(user), token: createToken(user) });
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(publicUser(user));
    } catch (error) {
        next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = req.body.name ?? user.name;
        user.email = req.body.email ?? user.email;
        user.phone = req.body.phone ?? user.phone;
        if (req.body.password) user.password = req.body.password;

        const updatedUser = await user.save();
        res.json({ ...publicUser(updatedUser), token: createToken(updatedUser) });
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').sort('-createdAt');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = req.body.name ?? user.name;
        user.email = req.body.email ?? user.email;
        user.phone = req.body.phone ?? user.phone;
        user.role = req.body.role ?? user.role;
        if (req.body.password) user.password = req.body.password;

        res.json(publicUser(await user.save()));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
};