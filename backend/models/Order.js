const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: '' },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], required: true },
    shippingAddress: {
        name: String,
        email: String,
        phone: String,
        address: String,
        note: String,
    },
    totalAmount: { type: Number, required: true, min: 0 },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipping', 'shipped', 'cancelled'],
        default: 'pending',
    },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);