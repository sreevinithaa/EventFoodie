import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_EVENT, UPDATE_EVENTS } from "../../utils/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { idbPromise } from "../../utils/helpers";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const VendorDetail = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  useEffect(() => {
    dispatch({
      type: UPDATE_CURRENT_EVENT,
      currentEvent: id,
    });
    idbPromise("event", "get").then((event) => {
      dispatch({
        type: UPDATE_EVENTS,
        events: event,
      });
    });
  }, []);

  const eventlist = state.events.filter((m) => m._id == id);
  const event =
    eventlist.length > 0
      ? eventlist[0]
      : { eventName: "No Event Found", vendors: [] ,imageUrl:""};

  const vendors = event.vendors;

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-3xl w-full space-y-2">
        <div>
          <img
            src={event.imageUrl}
            alt={event.eventName}
            className="w-[full] h-full object-center object-cover group-hover:opacity-75"
          />
        </div>
        <div className="flex flex-col ">
        <div>
            {" "}
            <Link
              to="/"
              type="button"
              className="mt-1 ml-3 inline-block px-6 py-2.5 bg-purple text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#935899] hover:shadow-lg focus:bg-[#935899] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#935899] active:shadow-lg transition duration-150 ease-in-out"
            >
              {" "}
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-white"
              />{" "}
              Back
            </Link>
          </div>
          {vendors.map((item) => (
            <div key={item._id} className="flex flex-row justify-evenly	 border-2 shadow-lg text-sm border-purple m-3 rounded-xl">
             <div className=" max-w-[10rem]"> <img
            src={item.imageUrl}
            alt={item.name}
            className="object-center object-cover rounded-full group-hover:opacity-75"
          /></div>
             <div className="flex flex-col ">
              <div className="flex flex-row m-1">
                <div className="font-bold p-1">Vendor : </div>
                <div className="p-1">{item.name}</div>
              </div>
              <div className="flex flex-row m-1">
                <div className="font-bold p-1">Description : </div>
                <div className=" p-1">{item.description}</div>
              </div>
              <div className="flex flex-row m-1 justify-end"> <Link to={`/order/${item._id}`} className="inline-block px-6 py-2.5 bg-purple text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple hover:shadow-lg focus:bg-purple focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple active:shadow-lg transition duration-150 ease-in-out">Make Order</Link></div>
              </div>
            </div>
          ))}
        
        </div>
      </div>
    </div>
  );
};
export default VendorDetail;
