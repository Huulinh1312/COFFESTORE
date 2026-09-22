const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const upload = multer({
	dest: path.join(__dirname, '..', 'uploads'),
});

// Public routes
router.get('/', productController.getProducts); // lay danh sach san pham
router.get('/featured', productController.getFeaturedProducts); // lay danh sach san pham noi bat
router.get('/search', productController.searchProducts); // tim kiem san pham
router.get('/category', productController.getProductsByCategory); // lay san pham theo danh muc
router.get('/stats', protect, admin, productController.getProductStats);
router.get('/top', protect, admin, productController.getTopProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post('/', protect, admin, upload.array('images', 10), productController.createProduct); // tao san pham
router.put('/:id', protect, admin, upload.array('images', 10), productController.updateProduct); // cap nhat san pham
router.delete('/:id', protect, admin, productController.deleteProduct); // xoa san pham

module.exports = router;
