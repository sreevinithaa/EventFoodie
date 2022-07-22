import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_EVENTS } from "../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
const formatDate = (date) => {
    console.log(date);
    let d = new Date(date);
    console.log(d);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

const Home = () => {
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
        <div className="grid ">
        {state.events.map((event) => (
          <div key={event._id} className="flex justify-evenly mb-10	">
            <div className="flex-none w-[60%]">
              <img
                src={`/images/${event.imageUrl}`}
                alt={event.eventName}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
              />
            </div>
            <div className="flex-initial w-[35%]">
              <h3 className="mt-4 text-sm text-gray"> {event.venue}</h3>
              <p className="mt-1 text-lg font-medium text-gray">
                {event.eventName}
              </p>
              <h3 className="mt-4 text-sm mb-2 text-gray"> {event.description}</h3>
             <div className="mt-4 text-sm mb-2 text-gray">Start Date : {(event.startDate)}  End Date : {(event.endDate)} </div>
              <Link to={`/program/${event._id}`} className="h-7 p-2 px-3 mr-10 text-[#662B6D] transition-colors duration-150 border border-[#662B6D] rounded-lg focus:shadow-outline hover:bg-[#662B6D] hover:text-[#ffffff]">
                Event Program
              </Link>
              <Link to={`/vendors/${event._id}`} className="h-7 p-2 px-3 text-[#662B6D] transition-colors duration-150 border border-[#662B6D] rounded-lg focus:shadow-outline hover:bg-[#662B6D] hover:text-[#ffffff]">
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

export default Home;
