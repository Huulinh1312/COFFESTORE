const Review = require('../models/ReviewModels');
const Order = require('../models/Order');

const createReview = async (req, res, next) => {
    try {
        const { orderId, productId, rating, comment } = req.body;
        const order = await Order.findOne({ _id: orderId, user: req.user._id });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (!order.items.some((item) => item.product.toString() === productId)) return res.status(400).json({ message: 'Product is not in this order' });
        if (await Review.findOne({ user: req.user._id, order: orderId, product: productId })) return res.status(400).json({ message: 'You already reviewed this product' });
        res.status(201).json(await Review.create({ user: req.user._id, order: orderId, product: productId, rating, comment }));
    } catch (error) { next(error); }
};

const getProductReviews = async (req, res, next) => {
    try { res.json(await Review.find({ product: req.params.productId }).populate('user', 'name').sort('-createdAt')); } catch (error) { next(error); }
};

const getOrderForReview = async (req, res, next) => {
    try { res.json(await Review.find({ order: req.params.orderId, user: req.user._id }).populate('product')); } catch (error) { next(error); }
};

const getUserReviews = async (req, res, next) => {
    try { res.json(await Review.find({ user: req.user._id })); } catch (error) { next(error); }
};

const deleteReview = async (req, res, next) => {
    try { const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id }); if (!review) return res.status(404).json({ message: 'Review not found' }); res.json({ message: 'Review deleted' }); } catch (error) { next(error); }
};

module.exports = { createReview, getProductReviews, getOrderForReview, getUserReviews, deleteReview };