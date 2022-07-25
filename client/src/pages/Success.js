import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../component/Jumbotron/index";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [orderNumber, setorderNumber] = useState(0);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const menuItems = cart.map((item) => item._id);
      let total = 0;
      if (menuItems.length) {
        cart.forEach((item) => {
          total += item.price * item.purchaseQuantity;
        });
     
        const { data } = await addOrder({
          variables: { totalAmount: total, orderItem: menuItems },
        });
       
        setorderNumber(data.addOrder.orderNumber);
       
        cart.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      // setTimeout(() => {
      //   window.location.assign('/');
      // }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Your Order Number is {orderNumber}</h1>
        <h1>Success!</h1>

        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
