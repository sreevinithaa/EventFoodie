const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    orderNumber:{
        type: Number,
        required: true
    },
    customer:{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    vendor:{
        type: Schema.Types.ObjectId,
        ref: 'FoodVendors',
        required: true
    },
    orderItem:[{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }]
});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;