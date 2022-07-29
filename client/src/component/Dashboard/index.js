import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_EVENTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { idbPromise,formatDate } from "../../utils/helpers";

const Dashboard = () => {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_EVENTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_EVENTS,
        events: data.events,
      });
      data.events.forEach((event) => {
        idbPromise("event", "put", event);
      });
    } else if (!loading) {
      idbPromise("event", "get").then((event) => {
        dispatch({
          type: UPDATE_EVENTS,
          events: event,
        });
      });
    }
  }, [data, loading, dispatch]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Events</h2>
        <div className=" flex flex-col">
          {state.events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col sm:flex-row justify-evenly mb-10	"
            >
              <div className="flex-none w-[100%] sm:w-[60%]">
                <img
                  src={event.imageUrl}
                  alt={event.eventName}
                  className="max-w-full h-auto object-center object-cover group-hover:opacity-75"
                />
              </div>
              <div className="flex-initial  w-[100%] sm:w-[35%]">
                <h3 className="mt-4 text-sm text-gray"> {event.venue}</h3>
                <p className="mt-1  text-sm sm:text-lg font-medium text-gray">
                  {event.eventName}
                </p>
                <h3 className="mt-4 text-sm mb-2 text-gray">
                  {" "}
                  {event.description}
                </h3>
                <div className="mt-4 text-sm mb-2 text-gray">
                  Start Date : {formatDate(event.startDate)} End Date : {formatDate(event.endDate)}{" "}
                </div>
                <Link
                  to={`/program/${event._id}`}
                  className=" text-sm h-7 p-2 px-3 mr-10 text-purple transition-colors duration-150 border border-purple rounded-lg focus:shadow-outline hover:bg-purple hover:text-white"
                >
                  Event Program
                </Link>
                <Link
                  to={`/vendors/${event._id}`}
                  className="text-sm h-7 p-2 px-3 text-purple transition-colors duration-150 border border-purple rounded-lg focus:shadow-outline hover:bg-purple hover:text-white"
                >
                  Food Vendors
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
