import { useReducer } from "react";
import {
  UPDATE_MENU,
  UPDATE_EVENTS,
  UPDATE_CURRENT_EVENT,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
  TOGGLE_CART,
  OPEN_CART,
  UPDATE_MY_ORDER,
} from "./actions";

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_MENU:
      return {
        ...state,
        menus: [...action.menus],
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.cart],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...action.cart],
      };
    // Returns a copy of state, sets the cartOpen to true and maps through the items in the cart.
    // If the item's `id` matches the `id` that was provided in the action.payload, we update the purchase quantity.
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((item) => {
          if (action._id === item._id) {
            item.purchaseQuantity = action.purchaseQuantity;
          }
          return item;
        }),
      };
    // First we iterate through each item in the cart and check to see if the `product._id` matches the `action._id`
    // If so, we remove it from our cart and set the updated state to a variable called `newState`
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((item) => {
        return item._id !== action._id;
      });
      // Then we return a copy of state and check to see if the cart is empty.
      // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: false,
      };
    case OPEN_CART:
      return {
        ...state,
        cartOpen: true,
      };
    case UPDATE_EVENTS:
      return {
        ...state,
        events: [...action.events],
      };
    case UPDATE_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.currentEvent,
      };
    case UPDATE_MY_ORDER:
      return {
        ...state,
        orders: [...action.orders],
      };
    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useEventReducer(initialState) {
  return useReducer(reducer, initialState);
}
