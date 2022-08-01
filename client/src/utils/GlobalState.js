import React, { createContext, useContext } from "react";
import { useEventReducer } from './reducers'
// Create our store context using React.CreateContext()
const StoreContext = createContext();
const { Provider } = StoreContext;
// Creating our theme provider. Accepts an argument of "props", here we plucking off the "children" object.
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useEventReducer({
    menus: [],
    orders: [],
    cartOpen: false,
    cart:[],
    events: [],
    currentEvent:''
      });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
