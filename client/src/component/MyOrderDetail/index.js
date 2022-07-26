import React, { useEffect } from "react";

import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { QUERY_MY_ORDER } from "../../utils/queries";
import { formatDate } from "../../utils/helpers";
import { UPDATE_MY_ORDER } from "../../utils/actions";
function MyOrderDetail() {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_MY_ORDER);

  useEffect(() => {
    if (data) {
      console.log(data.myorder);
    
      dispatch({
        type: UPDATE_MY_ORDER,
        orders: data.myorder,
      });
    
     
    } 
  }, [data, loading]);

  if (state.orders.length === 0) {
    return <div className="min-h-full flex items-center  justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full  space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#662B6D]">
          No order available
        </h2>
      </div></div></div>;
  }

  return (<table class="table-fixed w-[90%] border-[#662B6D] border-collapse border border-slate p-1 m-8">
  <thead>
    <tr className=" bg-[#662B6D] text-[#ffffff] rounded-xl">
      <th className="p-2 border border-slate">Date</th>
      <th className="p-2 border border-slate">Vendor</th>
      <th className="p-2 border border-slate">Order Number</th>
      <th className="p-2 border border-slate">Total Amount</th>
      <th className="p-2 border border-slate">Status</th>
    </tr>
  </thead>
  <tbody>
  {state.orders.map((order) => (
    <tr className="text-sm">
      <td className="p-2 border border-slate">{formatDate(order.orderDate)}</td>
      <td className="p-2 border border-slate">{order.vendor.name}</td>
      <td className="p-2 border border-slate">{order.orderNumber}</td>
      <td className="p-2 border border-slate">${order.totalAmount}</td>
      <td className="p-2 border border-slate">{order.orderStatus}</td>
    </tr>))}
   
  </tbody>
</table>)
     

}

export default MyOrderDetail;
