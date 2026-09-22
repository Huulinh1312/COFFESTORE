const Product = require('../models/Product');

const getImages = (req) => {
    if (req.files?.length) return req.files.map((file) => `/uploads/${file.filename}`);
    if (Array.isArray(req.body.imageUrl)) return req.body.imageUrl;
    return req.body.imageUrl ? [req.body.imageUrl] : undefined;
};

const normalizeProductData = (body, images) => ({
    name: body.name,
    description: body.description,
    price: Number(body.price),
    category: body.category,
    stock: Number(body.stock),
    isFeatured: body.isFeatured === true || body.isFeatured === 'true',
    ...(images ? { imageUrl: images } : {}),
});

const getProducts = async (req, res, next) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.max(Number(req.query.limit) || 10, 1);
        const filter = req.query.category ? { category: req.query.category } : {};
        if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' };
        const [products, totalProducts] = await Promise.all([
            Product.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
            Product.countDocuments(filter),
        ]);
        res.json({ products, totalProducts, page, pages: Math.ceil(totalProducts / limit) });
    } catch (error) { next(error); }
};

const getFeaturedProducts = async (req, res, next) => {
    try { res.json(await Product.find({ isFeatured: true }).sort('-createdAt')); } catch (error) { next(error); }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) { next(error); }
};

const searchProducts = async (req, res, next) => {
    try { res.json(await Product.find({ name: { $regex: req.query.q || '', $options: 'i' } })); } catch (error) { next(error); }
};

const getProductsByCategory = async (req, res, next) => {
    try { res.json(await Product.find({ category: req.query.category })); } catch (error) { next(error); }
};

const createProduct = async (req, res, next) => {
    try { res.status(201).json(await Product.create(normalizeProductData(req.body, getImages(req)))); } catch (error) { next(error); }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        Object.assign(product, normalizeProductData(req.body, getImages(req)));
        res.json(await product.save());
    } catch (error) { next(error); }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (error) { next(error); }
};

const getProductStats = async (req, res, next) => {
    try { res.json({ totalProducts: await Product.countDocuments(), lowStock: await Product.countDocuments({ stock: { $lte: 5 } }) }); } catch (error) { next(error); }
};

const getTopProducts = async (req, res, next) => {
    try { res.json(await Product.find().sort('-createdAt').limit(5)); } catch (error) { next(error); }
};

module.exports = { getProducts, getFeaturedProducts, getProductById, searchProducts, getProductsByCategory, createProduct, updateProduct, deleteProduct, getProductStats, getTopProducts };