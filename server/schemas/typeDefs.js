const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Customer {
    _id: ID
    firstName: String
    lastName:String
    email:String
    phone:String
    userRole:String
    orders:[Order]
  }

  type Menu {
    _id: ID
    name: String
    description:String
    imageUrl:String
    price:Float
    isAvailable:Boolean
    comboPrice:Float
  }

  type FoodVendors {
    _id: ID
    name: String
    description:String
    imageUrl:String
    bankAccountId:String
    bankBSB:String
    bankAccountName:String
    menu:[Menu]
  }

  type Event {
    _id: ID
    eventName: String
    venue:String
    city:String
    imageUrl:String
    description:String
    startDate:String
    endDate:String
    user:Customer
    programs:[EventProgram]
    vendors:[FoodVendors]
  }
  type EventProgram {
    _id: ID
    name: String
    description:String
    startTime:String
    endTime:String
    fees:Float
    event:Event
  }
  type Order {
    _id: ID
    orderNumber: String
    orderDate:String
    customer:Customer
    vendor:FoodVendors
    orderItem:[OrderItem]
   
  }
  type OrderItem {
    _id: ID
    qantity: Number
    comboSize:String
    comboDrink:String
    order:Order
    menu:Menu
   
  }
  type Checkout {
    session: ID
  }
  type Auth {
    token: ID
    user: Customer
  }
  type Query {
    events: [Event]
    menus(vendoId: ID): [Menu]
    customer: Customer
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addCustomer(firstName: String!, lastName: String!, email: String!,phone:String,userRole:String, password: String!): Auth
    addOrder(menu: [ID]!,vendorId:ID): Order
    updateCustomer(firstName: String!, lastName: String!, email: String!,phone:String,userRole:String, password: String!): User
     login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
