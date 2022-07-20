const { AuthenticationError } = require("apollo-server-express");
const {
  Customer,
  EventProgram,
  Event,
  FoodVendors,
  Menu,
  Order,
  OrderItem,
} = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    events: async () => {
      const currentdate = Date.now;
      return await Event.find({
        currentdate: { $gte: startDate, $lte: endDate },
      })
        .populate("programs")
        .populate("vendors");
    },
    menus: async (parent, { vendorId }) => {
      return await Menu.find({ vendor: vendorId });
    },
    customer: async (parent, args, context) => {
      if (context.user) {
        const user = await Customer.findById(context.user._id).populate(
          "orders"
        );
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }) => {
      return await Order.find({ _id: _id }).populate("orderItem");
    },
    checkout: async (parent, args, context) => {
      // const url = new URL(context.headers.referer).origin;
      // const order = new Order({ products: args.menu });
      // const line_items = [];

      // const { products } = await order.populate('products').execPopulate();

      // for (let i = 0; i < products.length; i++) {
      //   const product = await stripe.products.create({
      //     name: products[i].name,
      //     description: products[i].description,
      //     images: [`${url}/images/${products[i].image}`]
      //   });

      //   const price = await stripe.prices.create({
      //     product: product.id,
      //     unit_amount: products[i].price * 100,
      //     currency: 'usd',
      //   });

      //   line_items.push({
      //     price: price.id,
      //     quantity: 1
      //   });
      // }

      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ['card'],
      //   line_items,
      //   mode: 'payment',
      //   success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      //   cancel_url: `${url}/`
      // });

      // return { session: session.id };
      return { session: context.user._id };
    },
  },
  Mutation: {
    addCustomer: async (parent, args) => {
      const user = await Customer.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order(args);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateCustomer: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await Customer.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
