import React, { useEffect } from "react";

import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CART_QUANTITY,ADD_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";


function MenuDetail(menu) {

    const [state, dispatch] = useStoreContext();
    const { cart } = state
    const {      
        _id,
        name,
        imageUrl,
        price,
        vendor
      } = menu;
    const addToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem._id === _id)
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: _id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
      } else {
        dispatch({
          type: ADD_TO_CART,
          cart: { ...menu, purchaseQuantity: 1 }
        });
        idbPromise('cart', 'put', { ...menu, purchaseQuantity: 1 });
      }
    }
  
    return (  <div key={menu._id} className="group ">
    <div className="w-full aspect-w-1 aspect-h-1 bg-gray rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
      <img
        src={`/images/${menu.imageUrl}`}
        alt={menu.name}
        className="w-full h-full object-center object-cover group-hover:opacity-75"
      />
    </div>
    <h3 className="mt-4 text-sm text-gray">{menu.name}</h3>
    <p className="mt-1 text-lg font-medium text-gray">
      ${menu.price}
    </p>
   
    <div className=" flex justify-end w-full">
      <button onClick={addToCart} className="h-7 px-3 mr-1 text-[#662B6D] transition-colors duration-150 border border-[#662B6D] rounded-lg focus:shadow-outline hover:bg-[#662B6D] hover:text-[#ffffff]">
        Add Cart
      </button>
    </div>
  </div>);
}


export default MenuDetail;
