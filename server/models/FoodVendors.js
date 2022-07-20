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
      bankAccountId:{
        type: String
      },
      bankBSB:{
        type: String
      },
      bankAccountName:{
        type: String
      },
      menu:[{type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true}]
     
});
const FoodVendors = mongoose.model('FoodVendors', foodVendorsSchema);

module.exports = FoodVendors;