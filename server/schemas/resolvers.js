const { AuthenticationError } = require("apollo-server-express");
const {
  User,
 Event,
  FoodVendors,
  Menu,
  Order,
 
} = require("../models");
const dotenv = require("dotenv");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("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");
const { SendMessage } = require("../utils/messageAPI");
dotenv.config();
const resolvers = {
  Query: {
    //checking the startdate enddate with current date to get active events
    events: async () => {
      const currentdate = Date.now();
      return await Event.find({
        startDate: { $lte: currentdate },
        endDate: { $gte: currentdate },
      })
        .populate("programs")
        .populate("vendors");
    },
    //get orders for loggedin Vendor type user
    getVendorOrder: async (parent, args, context) => {
      const foodvendor = await FoodVendors.findOne({ user: context.user._id });
      const order = await Order.find({ vendor: foodvendor._id })
        .populate("orderItem")
        .populate("customer");

      return order;
    },
    //get vendor details by id with menus
    vendor: async (parent, { _id }) => {
      return await FoodVendors.findById({ _id }).populate("menu");
    },
    //get loggedin user's vendor detail with menu
    getUserVendor: async (parent, args, context) => {
      if (context.user) {
        return await FoodVendors.findOne({ user: context.user._id }).populate(
          "menu"
        );
      }
      throw new AuthenticationError("Not logged in");
    },
    //get logged in user detail
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    // get logged-in user's order detail
    myorder: async (parent, args, context) => {
      const orders = await Order.find({ customer: context.user._id })
        .populate("orderItem")
        .populate("vendor");

      return orders;
    },
    // get menu by id
    getMenu: async (parent, { _id }, context) => {
      const menu = await Menu.findById({ _id });

      return menu;
    },
    //get order by id
    order: async (parent, { _id }) => {
      return await Order.find({ _id: _id })
        .populate("orderItem")
        .populate("customer");
    },
    //checkout to stripe
    checkout: async (parent, args, context) => {
      
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ orderItem: args.menu });
      const line_items = [];

      const { orderItem } = await order.populate("orderItem").execPopulate();

      for (let i = 0; i < orderItem.length; i++) {
        try
        {
          const product = await stripe.products.create({
            name: orderItem[i].name,
            description: orderItem[i].description,
            images: [orderItem[i].imageUrl],
          });
         
          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: orderItem[i].price * 100,
            currency: "aud",
          });
        
        
          line_items.push({
            price: price.id,
            quantity: 1,
          });
        
        }
        catch(e)
        {
console.log(e);
        }
       
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
     
      return { session: session.id };
    },
  },
  Mutation: {
    //insert new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateOrder: async (parent, args, context) => {
      const order = await Order.findByIdAndUpdate(args._id, {
        orderStatus: args.orderStatus,
      })
        .populate("customer")
        .populate("vendor");
      if (order) {
        SendMessage(
          order.customer.phone,
          order.orderNumber,
          args.orderStatus,
          order.vendor.name
        );
      }
      return order;
    },
    addOrder: async (parent, args, context) => {
      if (context.user) {
        const order = await Order.create({
          totalAmount: args.totalAmount,
          orderItem: args.orderItem,
          customer: context.user._id,
          vendor: args.vendor,
          orderStatus: "Open",
        });

        const user = await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        if (order) {
          SendMessage(user.phone, order.orderNumber, order.orderStatus, "");
        }

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    addMenu: async (parent, args, context) => {
      if (context.user) {
        const foodvendor = await FoodVendors.findOne({
          user: context.user._id,
        });
        const menu = await Menu.create({ ...args, vendor: foodvendor._id });

        await FoodVendors.findByIdAndUpdate(foodvendor._id, {
          $push: { menu: menu },
        });
        return menu;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateMenu: async (parent, args, context) => {
      if (context.user) {
        const menu = await Menu.findByIdAndUpdate(
          args._id,
          {
            name: args.name,
            description: args.description,
            imageUrl: args.imageUrl,
            price: args.price,
            isAvailable: args.isAvailable,
            comboPrice: args.comboPrice,
          },
          {
            new: true,
          }
        );

        return menu;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUserVendor: async (parent, args, context) => {
      if (context.user) {
        return await FoodVendors.findByIdAndUpdate(args._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
