const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  orderNumber: {
    type: Number,
    default: 0,
    require: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "FoodVendors"
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderItem: [
    {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  ],
});
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.constructor.find({}).then((orders) => {
      this.orderNumber = orders.length + 1;
      next();
    });
  }

  next();
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
