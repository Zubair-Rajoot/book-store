const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowFrom: { type: Date, required: true },
    borrowTo: { type: Date, required: true },
}, {
    timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);
