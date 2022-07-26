const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  EventProgram,
  Event,
  FoodVendors,
  Menu,
  Order,
  OrderItem,
} = require("../models");
const { countDocuments } = require("../models/Menu");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("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");

const resolvers = {
  Query: {
    events: async () => {
      const currentdate = Date.now();
      return await Event.find({
        startDate: { $lte: currentdate },
        endDate:{$gte: currentdate}
      })
        .populate("programs")
        .populate("vendors");
    },
    vendor: async (parent, { _id }) => {
      return await FoodVendors.findById({ _id }).populate("menu");
    },
    getUserVendor: async (parent, args,context) => {
      if (context.user) {
      return await FoodVendors.findOne({user: context.user._id }).populate("menu");
      }
      throw new AuthenticationError("Not logged in");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Not logged in");
    },
    myorder:async (parent, args,context) => {
      const orders=await Order.find({ customer:context.user._id }).populate("orderItem");
      
      return orders
    },
    getMenu:async (parent, {_id},context) => {
     
      const menu=await Menu.findById({ _id });
      console.log(menu);
      return menu
    },
    order: async (parent, { _id }) => {
      return await Order.find({ _id: _id }).populate("orderItem");
    },
    checkout: async (parent, args, context) => {
      
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ orderItem: args.menu });
      const line_items = [];
      
      const { orderItem } = await order.populate('orderItem').execPopulate();
      
      for (let i = 0; i < orderItem.length; i++) {
        const product = await stripe.products.create({
          name: orderItem[i].name,
          description: orderItem[i].description,
          images: [`${url}/images/${orderItem[i].imageUrl}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: orderItem[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }
    

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
        
      });

      return { session: session.id };
     
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, args, context) => {
      
      if (context.user) {
        
        const order = await Order.create({
          totalAmount:args.totalAmount,
          orderItem:args.orderItem,
          customer:context.user._id
         
        });
      
       
        

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
    addMenu:async (parent, args, context) => {
    
      if (context.user) {
        const foodvendor=await FoodVendors.findOne({user: context.user._id })
        const menu= await Menu.create({...args,vendor:foodvendor._id});
       
        await FoodVendors.findByIdAndUpdate(foodvendor._id, { $push: { menu: menu } });
        return menu;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateMenu:async (parent, args, context) => {
     
      if (context.user) {
        const menu= await Menu.findByIdAndUpdate(_id, {
          name:args.name,
          description:args.description,
          imageUrl:args.imageUrl,
          price:args.price,
          isAvailable:args.isAvailable,
          comboPrice:args.comboPrice
        }, {
          new: true,
        });
       
        return menu;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUserVendor:async (parent, args, context) => {
    
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
