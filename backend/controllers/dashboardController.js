const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/UserModels');

const getStats = async (req, res, next) => {
    try {
        const [totalUsers, totalProducts, orders] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.find(),
        ]);
        res.json({
            totalUsers,
            totalProducts,
            totalOrders: orders.length,
            totalRevenue: orders.filter((order) => order.orderStatus === 'shipped').reduce((sum, order) => sum + order.totalAmount, 0),
        });
    } catch (error) { next(error); }
};

const getMonthlyRevenue = async (req, res, next) => {
    try {
        const orders = await Order.find({ orderStatus: 'shipped' });
        const revenue = Array.from({ length: 12 }, (_, month) => ({
            month: month + 1,
            revenue: orders.filter((order) => new Date(order.createdAt).getMonth() === month).reduce((sum, order) => sum + order.totalAmount, 0),
        }));
        res.json(revenue);
    } catch (error) { next(error); }
};

module.exports = { getStats, getMonthlyRevenue };