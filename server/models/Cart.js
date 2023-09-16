const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{type: Schema.Types.ObjectId, ref: "Course"}],
    totalPrice: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'checkout', 'completed'], default: 'active' }
    
}, { timestamps : { createdAt: 'created_at'}});

module.exports = Cart = mongoose.model('cart', CartSchema);
