const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    userRole: String!
    orders: [Order]
  }

  type Menu {
    _id: ID
    name: String!
    description: String
    imageUrl: String!
    price: Float!
    isAvailable: Boolean
    comboPrice: Float
    vendor: FoodVendors
  }

  type FoodVendors {
    _id: ID
    name: String!
    description: String!
    imageUrl: String!
    StripeAccount: String
    menu: [Menu]
  }

  type Event {
    _id: ID
    eventName: String!
    venue: String!
    city: String!
    imageUrl: String!
    description: String!
    startDate: String!
    endDate: String!
    user: User
    programs: [EventProgram]
    vendors: [FoodVendors]
  }
  type EventProgram {
    _id: ID
    name: String!
    description: String!
    startTime: String!
    endTime: String!
    fees: Float
    event: Event
  }
  type Order {
    _id: ID
    orderNumber: Int
    orderDate: String
    User: User
    vendor: FoodVendors
    orderItem: [Menu]
  }
  type OrderItem {
    _id: ID
    qantity: Int!
    comboSize: String
    comboDrink: String
    order: Order
    menu: Menu
  }
  type Checkout {
    session: ID
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    events: [Event]
    vendor(_id: String): FoodVendors
    user: User
    order(_id:String): Order
    checkout(menu: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String
      userRole: String
      password: String!
    ): Auth
    addOrder(menu: [ID]!, vendorId: ID): Order
    updateUser(
      firstName: String!
      lastName: String!
      email: String!
      phone: String
      userRole: String
      password: String!
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
