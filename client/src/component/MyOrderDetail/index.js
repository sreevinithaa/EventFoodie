import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
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
    <div className="w-[90%] border-[#662B6D] border-collapse border border-slate rounded-xl p-1 m-8">
      <div className="flex justify-evenly flex-row w-full bg-[#662B6D] text-[#ffffff] rounded-xl">
        <div className="p-2 text-sm ">Date</div>
        <div className="p-2 text-sm ">Vendor</div>
        <div className="p-2 text-sm ">Order Number</div>
        <div className="p-2 text-sm  ">Total Amount</div>
        <div className="p-2 text-sm  ">Status</div>
        <div className="p-2 text-sm "></div>
      </div>
      {state.orders.map((order) => (
        <OrderDetail id={order._id}></OrderDetail>
      ))}
    </div>
  );
}
const OrderDetail = ({ id }) => {
  const [state, dispatch] = useStoreContext();

  const order = [...state.orders].find((m) => m._id == id);

  const [toggleThisElement, setToggleThisElement] = useState(false);
  return (
    <div key={id}>
      <div className="flex justify-evenly flex-row  ">
        <div className="p-2 text-center text-sm">
          {formatDate(order.orderDate)}
        </div>
        <div className="p-2  text-sm">{order.vendor.name}</div>
        <div className="p-2  text-sm">{order.orderNumber}</div>
        <div className="p-2  text-sm">${order.totalAmount}</div>
        <div className="p-2 text-sm">{order.orderStatus}</div>
        <div>
          <button
            title="View Items"
            type="button"
            className="mr-3"
            onClick={() => setToggleThisElement((prev) => !prev)}
          >
            {" "}
            <FontAwesomeIcon
              icon={faArrowCircleDown}
              className="text-[#662B6D]"
            />{" "}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {toggleThisElement && (
          <div id={id}>
            <table className="table-fixed text-sm w-[90%] border-[#662B6D] border-collapse border border-slate p-1 m-8">
              <thead>
                <tr className=" bg-[#662B6D] text-[#ffffff] rounded-xl">
                  <th className="p-2 border border-slate">Name</th>
                  <th className="p-2 border border-slate">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItem.map((menu) => (
                  <tr key={menu._id}>
                    <td className="p-2 border text-center border-slate">
                      {menu.name}
                    </td>
                    <td className="p-2 border text-center border-slate">
                      ${menu.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderDetail;
