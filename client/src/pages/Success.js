import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../component/Jumbotron/index";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
function grouping_array(array) {
  let result = [];
  let aresult = [];
  let vendors = [];
  array.forEach((r) => {
    //if an array index by the value of id is not found, instantiate it.
    if (!result[r.vendor]) {
      vendors.push(r.vendor);
      //result gets a new index of the value at id.
      result[r.vendor] = [];
    }
    //push that whole object from api_array into that list
    result[r.vendor].push(r);
  });
  vendors.forEach((element) => {
    aresult.push(result[element]);
  });
  return aresult;
}

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [orderNumber, setorderNumber] = useState([]);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      if (cart.length > 0) {
        let result = grouping_array(cart);

        result.forEach(async (element) => {
          const menulist = [];
          //  const menuItems = element.map((item) => item._id);
          element.forEach((item) => {
            for (let index = 0; index < item.purchaseQuantity; index++) {
              menulist.push(item._id);
            }
          });
          let total = 0;
          if (menulist.length) {
            let vendor;
            element.forEach((item) => {
              vendor = item.vendor;
              total += item.price * item.purchaseQuantity;
            });
            const { data } = await addOrder({
              variables: {
                totalAmount: total,
                vendor: vendor,
                orderItem: menulist,
              },
            });
            setorderNumber([...orderNumber, data.addOrder.orderNumber]);
          }
        });

        cart.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }
    }
    setTimeout(() => {
      window.location.assign('/');
    }, 5000);

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1 className="text-purple ">Your Order Number is {orderNumber}</h1>
        <h1>Success!</h1>

        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
