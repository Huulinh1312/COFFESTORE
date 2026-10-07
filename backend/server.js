// server.js - Main server configuration file
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const apiRoutes = require('./routes');

// Load env vars
dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.USER_FRONTEND_URL,
    process.env.ADMIN_FRONTEND_URL,
    'https://wolsom.onrender.com',
    'https://mearstack-coffeestore.onrender.com',
    'https://coffestore-mu.vercel.app'
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({
        message: 'CoffeeStore backend is running',
        api: '/api'
    });
});

app.get('/api/health', (req, res) => {
    res.json({ message: 'API is reachable', database: mongoose.connection.readyState === 1 });
});

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Chỉ mount api.js vào /api
app.use('/api', apiRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start HTTP server before connecting to MongoDB so Render can detect the port.
const mongoUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/coffeestore';
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(`MongoDB connection error: ${err.message}`));
