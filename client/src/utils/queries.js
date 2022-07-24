import { gql } from '@apollo/client';

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
      vendors{
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
    menu{
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

export const QUERY_ORDER = gql`
query order($_id: String) {
  order(_id:$_id) { 
   _id
   orderNumber
   orderDate
   orderItem {
    qantity
    comboSize
    comboDrink
    menu{
      name
      imageUrl
      price
    }
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