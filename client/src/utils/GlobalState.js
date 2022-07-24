import React, { createContext, useContext } from "react";
import { useEventReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

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
