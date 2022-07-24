const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    orderNumber:{
        type: Number,
        required: true
    },
    customer:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendor:{
        type: Schema.Types.ObjectId,
        ref: 'FoodVendors',
        required: true
    },
    orderDate:{
        type:Date,
        default: Date.now
    },
    orderItem:[{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    }]
});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;