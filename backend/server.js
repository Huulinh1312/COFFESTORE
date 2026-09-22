// server.js - Main server configuration file
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const apiRoutes = require('./api'); // Chỉ import apiRoutes từ api.js

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ['https://wolsom.onrender.com', 'https://mearstack-coffeestore.onrender.com'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Chỉ mount api.js vào /api
app.use('/api', apiRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB Connected');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error(`MongoDB connection error: ${err.message}`));
