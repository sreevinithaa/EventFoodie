import { gql } from "@apollo/client";

export const QUERY_EVENTS = gql`
  query events {
    events {
      _id
      eventName
      venue
      city
      imageUrl
      description
      startDate
      endDate
      programs {
        name
        description
        startTime
        endTime
        fees
      }
      vendors {
        _id
        name
        description
        imageUrl
        StripeAccount
      }
    }
  }
`;

export const QUERY_VENDOR = gql`
  query vendor($_id: String) {
    vendor(_id: $_id) {
      _id
      name
      menu {
        _id
        name
        description
        imageUrl
        price
        isAvailable
        comboPrice
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user {
    user {
      _id
      firstName
      lastName
      email
      phone
      userRole
    }
  }
`;
export const QUERY_MY_ORDER = gql`
  query myorders {
    myorder {
      _id
      orderNumber
      orderDate
      totalAmount
      orderItem {
        _id
        name
        description
        imageUrl
        price
        comboPrice
      }
    }
  }
`;

export const GET_NENU = gql`
  query getMenus($_id: String) {
    getMenu(_id: $_id) {
      _id
      name
      description
      imageUrl
      price
      isAvailable
      comboPrice
    }
  }
`;
export const QUERY_VENDOR_USER = gql`
  query getUserVendor {
    getUserVendor {
      _id
      name
      description
      imageUrl
      StripeAccount
      menu {
        _id
        name
        description
        imageUrl
        price
        isAvailable
        comboPrice
      }
    }
  }
`;

export const QUERY_ORDER = gql`
  query order($_id: String) {
    order(_id: $_id) {
      _id
      orderNumber
      orderDate
      totalAmount
      orderItem {
        _id
        name
        description
        imageUrl
        price
        comboPrice
        vendor
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($menu: [ID]!) {
    checkout(menu: $menu) {
      session
    }
  }
`;
