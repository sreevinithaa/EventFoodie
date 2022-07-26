import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        userRole
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($totalAmount: Float, $orderItem: [ID]!) {
    addOrder(totalAmount: $totalAmount, orderItem: $orderItem) {
      _id
      orderNumber
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $userRole: String!
    $phone: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phone: $phone
      userRole: $userRole
    ) {
      token
      user {
        _id
        firstName
        userRole
        email
      }
    }
  }
`;

export const ADD_MENU = gql`
  mutation addMenu(
    $name: String!
    $description: String
    $imageUrl: String!
    $price: Float!
    $isAvailable: Boolean!
    $comboPrice: Float
  ) {
    addMenu(
      name: $name
      description: $description
      imageUrl: $imageUrl
      price: $price
      isAvailable: $isAvailable
      comboPrice: $comboPrice
    ) {
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

export const UPDATE_MENU = gql`
  mutation updateMenu(
    $name: String!
    $description: String
    $imageUrl: String!
    $price: Float!
    $isAvailable: Boolean!
    $comboPrice: Float
    $_id: String
  ) {
    updateMenu(
      name: $name
      description: $description
      imageUrl: $imageUrl
      price: $price
      isAvailable: $isAvailable
      comboPrice: $comboPrice
      _id: $_id
    ) {
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

export const UPDATE_USER_VENDOR = gql`
  mutation updateUserVendor(
    $name: String
    $description: String
    $imageUrl: String
    $StripeAccount: String
    $_id: String
  ) {
    updateUserVendor(
      name: $name
      description: $description
      imageUrl: $imageUrl
      StripeAccount: $StripeAccount
      _id: $_id
    ) {
      _id
      name
      description
      imageUrl
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $userRole: String!
    $phone: String!
    $password: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      password: $password
      phone: $phone
      userRole: $userRole
    ) {
      _id
      firstName
      userRole
      email
    }
  }
`;
