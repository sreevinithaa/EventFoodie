const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema({
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
      price:{
        type: Number,
        required: true
      },
      isAvailable:{
        type:Boolean

      },
      comboPrice:{
        type: Number,
        required: true
      },
      vendor:{
        type: Schema.Types.ObjectId,
        ref: 'FoodVendors',
        required: true
      }
});
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;