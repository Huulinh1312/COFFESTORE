const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getOrCreateCart = async (userId) => Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, items: [] } },
    { new: true, upsert: true }
).populate('items.product');

const getCart = async (req, res, next) => {
    try { res.json(await getOrCreateCart(req.user._id)); } catch (error) { next(error); }
};

const addToCart = async (req, res, next) => {
    try {
        const product = await Product.findById(req.body.productId);
        const quantity = Number(req.body.quantity) || 1;
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.stock < quantity) return res.status(400).json({ message: 'Not enough stock' });
        const cart = await Cart.findOneAndUpdate({ user: req.user._id }, { $setOnInsert: { user: req.user._id, items: [] } }, { new: true, upsert: true });
        const item = cart.items.find((entry) => entry.product.toString() === product._id.toString());
        if (item) item.quantity += quantity;
        else cart.items.push({ product: product._id, quantity, price: product.price });
        await cart.save();
        res.status(201).json(await cart.populate('items.product'));
    } catch (error) { next(error); }
};

const updateCartItem = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const item = cart?.items.find((entry) => entry.product.toString() === req.body.productId);
        if (!item) return res.status(404).json({ message: 'Cart item not found' });
        item.quantity = Math.max(Number(req.body.quantity) || 1, 1);
        await cart.save();
        res.json(await cart.populate('items.product'));
    } catch (error) { next(error); }
};

const removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) { cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId); await cart.save(); }
        res.json(await getOrCreateCart(req.user._id));
    } catch (error) { next(error); }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };