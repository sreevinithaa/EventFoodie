import { gql } from '@apollo/client';

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
  mutation addOrder($menu: [ID]!,$vendorId:ID) {
    addOrder(menu:$menu,vendorId: $vendorId) {
      _id
      
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
export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $userRole: String!
    $phone: String!
    $password: String!
  ) {
    updateUser(
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
