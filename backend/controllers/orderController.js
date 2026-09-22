const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const createOrder = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart?.items.length) return res.status(400).json({ message: 'Cart is empty' });
        const items = cart.items.map((item) => ({ product: item.product._id, name: item.product.name, quantity: item.quantity, price: item.price, imageUrl: item.product.imageUrl[0] || '' }));
        const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
        const order = await Order.create({ user: req.user._id, items, totalAmount, shippingAddress: req.body.shippingAddress });
        await Product.bulkWrite(items.map((item) => ({ updateOne: { filter: { _id: item.product }, update: { $inc: { stock: -item.quantity } } } })));
        cart.items = [];
        await cart.save();
        res.status(201).json(order);
    } catch (error) { next(error); }
};

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Not authorized' });
        res.json(order);
    } catch (error) { next(error); }
};

const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (!['pending', 'processing'].includes(order.orderStatus)) return res.status(400).json({ message: 'Order cannot be cancelled' });
        order.orderStatus = 'cancelled';
        res.json(await order.save());
    } catch (error) { next(error); }
};

const getAllOrders = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = 10;
        const [orders, total] = await Promise.all([Order.find().populate('user', 'name email').populate('items.product').sort('-createdAt').skip((page - 1) * limit).limit(limit), Order.countDocuments()]);
        res.json({ orders, pages: Math.ceil(total / limit), totalOrders: total });
    } catch (error) { next(error); }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        order.orderStatus = req.body.orderStatus;
        if (order.orderStatus === 'shipped') { order.isPaid = true; order.paidAt = new Date(); }
        res.json(await order.save());
    } catch (error) { next(error); }
};

const getAnalytics = async (req, res, next) => {
    try {
        const orders = await Order.find();
        const count = (status) => orders.filter((order) => order.orderStatus === status).length;
        res.json({ totalOrders: orders.length, pendingOrders: count('pending'), processingOrders: count('processing'), shippingOrders: count('shipping'), deliveredOrders: count('shipped'), cancelledOrders: count('cancelled'), totalRevenue: orders.filter((order) => order.orderStatus === 'shipped').reduce((sum, order) => sum + order.totalAmount, 0), newOrdersThisMonth: orders.filter((order) => new Date(order.createdAt).getMonth() === new Date().getMonth() && new Date(order.createdAt).getFullYear() === new Date().getFullYear()).length });
    } catch (error) { next(error); }
};

const getRecentOrders = async (req, res, next) => {
    try { res.json(await Order.find().populate('user', 'name email').sort('-createdAt').limit(5)); } catch (error) { next(error); }
};

const getCountByStatus = async (req, res, next) => {
    try { const analytics = await getAnalyticsData(); res.json(analytics); } catch (error) { next(error); }
};

const getAnalyticsData = async () => {
    const orders = await Order.find();
    const count = (status) => orders.filter((order) => order.orderStatus === status).length;
    return { total: orders.length, pending: count('pending'), processing: count('processing'), shipping: count('shipping'), shipped: count('shipped'), cancelled: count('cancelled'), revenue: orders.reduce((sum, order) => sum + order.totalAmount, 0) };
};

const getStats = async (req, res, next) => {
    try { res.json(await getAnalyticsData()); } catch (error) { next(error); }
};

module.exports = { createOrder, getOrderById, cancelOrder, getAllOrders, updateOrderStatus, getAnalytics, getRecentOrders, getCountByStatus, getStats };