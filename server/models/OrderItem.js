const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderItemSchema = new Schema({
    order:{
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }  ,
    menu:{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    }  ,
    qantity:{
        type: Number,
        required: true
    },
    comboSize:{
        type:String
    },
    comboDrink:{
        type:String
    }
});
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;