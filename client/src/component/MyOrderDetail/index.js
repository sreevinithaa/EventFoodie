import React, { useEffect } from "react";

import { useStoreContext } from "../../utils/GlobalState";
import { useQuery } from "@apollo/client";
import { QUERY_MY_ORDER } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { UPDATE_MY_ORDER } from "../../utils/actions";
function MyOrderDetail() {
  const [state, dispatch] = useStoreContext();
  const { loading, data } = useQuery(QUERY_MY_ORDER);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_MY_ORDER,
        orders: data.myorder,
      });
      data.myorder.forEach((order) => {
        idbPromise("order", "put", order);
      });
    } else if (!loading) {
      idbPromise("order", "get").then((orders) => {
        dispatch({
          type: UPDATE_MY_ORDER,
          events: orders,
        });
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

  return <div></div>;
}

export default MyOrderDetail;
