import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../component/Jumbotron/index';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
function Success() {
    const [addOrder] = useMutation(ADD_ORDER);
  let ordernumber=0;
    useEffect(() => {
      async function saveOrder() {
        const cart = await idbPromise('cart', 'get');
        const menuItems = cart.map((item) => item._id);
  
        if (menuItems.length) {
          const { data } = await addOrder({ variables: {menu: menuItems,vendorId:'' } });
          const orderitems = data.addOrder.orderItem;
          ordernumber=data.addOrder.orderNumber;
          orderitems.forEach((item) => {
            idbPromise('cart', 'delete', item);
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
            <h1>Your Order Number is {ordernumber}</h1>
          <h1>Success!</h1>
         
          <h2>Thank you for your purchase!</h2>
          <h2>You will now be redirected to the home page</h2>
        </Jumbotron>
      </div>
    );
  }
  
  export default Success;
  