const mongoose = require('mongoose');

const { Schema } = mongoose;


const foodVendorsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      StripeAccount:{
        type: String
      },
      user:{type: Schema.Types.ObjectId,
        ref: 'User',
        required: true},
      menu:[{type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true}]
     
});
const FoodVendors = mongoose.model('FoodVendors', foodVendorsSchema);

module.exports = FoodVendors;