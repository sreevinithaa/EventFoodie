import React, { useEffect } from "react";


import { useStoreContext } from "../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { GET_ORDER_FOR_VENDOR } from "../utils/queries";
import { UPDATE_MY_ORDER } from "../utils/actions";
import OrderDetail from "../component/OrderDetail";
function Order() {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(GET_ORDER_FOR_VENDOR);

  useEffect(() => {
    if (data) {
      console.log(data.getVendorOrder);

      dispatch({
        type: UPDATE_MY_ORDER,
        orders: data.getVendorOrder,
      });
    }
  }, [data, loading]);

  if (state.orders.length === 0) {
    return (
      <div className="min-h-full flex items-center  justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full  space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#662B6D]">
              No order available
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="w-[90%] border-[#662B6D] border-collapse border border-slate rounded-xl p-1 m-8">
      <div className="flex justify-evenly flex-row w-full bg-[#662B6D] text-[#ffffff] rounded-xl">
        <div className="p-2 text-sm ">Date</div>
        <div className="p-2 text-sm ">Customer</div>
        <div className="p-2 text-sm ">Order Number</div>
        <div className="p-2 text-sm  ">Total Amount</div>
        <div className="p-2 text-sm  ">Status</div>
        <div className="p-2 text-sm "></div>
      </div>

      {state.orders.map((order) => (
        <div className="flex flex-col">
          <OrderDetail
            id={order._id}
            orderNumber={order.orderNumber}
            totalAmount={order.totalAmount}
            orderDate={order.orderDate}
          />
        </div>
      ))}
    </div>
  );
}

export default Order;
