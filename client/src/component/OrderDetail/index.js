import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faBarsProgress,
  faClose,
  faTruckPickup,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
const OrderDetail = ({ orderNumber, id, totalAmount, orderDate }) => {
  const [state, dispatch] = useStoreContext();

  const order = [...state.orders].find((m) => m._id == id);

  const [toggleThisElement, setToggleThisElement] = useState(false);
  return (
    <div key={id}>
      <div className="flex justify-evenly flex-row  ">
        <div className="p-2 text-center text-sm">{formatDate(orderDate)}</div>
        <div className="p-2 text-center text-sm">
          {order.customer.firstName}
        </div>
        <div className="p-2 text-center text-sm">{orderNumber}</div>
        <div className="p-2 text-center text-sm">${totalAmount}</div>
        <div className="p-2 text-center text-sm">{order.orderStatus}</div>
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
          <button title="Status to Progress" type="button" className="mr-3">
            {" "}
            <FontAwesomeIcon icon={faSpinner} className="text-[#662B6D]" />{" "}
          </button>
          <button type="button" title="Status to PickUp" className="mr-3">
            {" "}
            <FontAwesomeIcon
              icon={faTruckPickup}
              className="text-[#662B6D]"
            />{" "}
          </button>
          <button type="button" title="Status to Delivered">
            {" "}
            <FontAwesomeIcon icon={faClose} className="text-[#662B6D]" />{" "}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        {toggleThisElement && (
          <div>
            <table class="table-fixed text-sm w-[90%] border-[#662B6D] border-collapse border border-slate p-1 m-8">
              <thead>
                <tr className=" bg-[#662B6D] text-[#ffffff] rounded-xl">
                  <th className="p-2 border border-slate">Name</th>
                  <th className="p-2 border border-slate">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItem.map((menu) => (
                  <tr>
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

export default OrderDetail;
