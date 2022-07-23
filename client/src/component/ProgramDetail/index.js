import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_EVENT, UPDATE_EVENTS } from "../../utils/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { idbPromise } from "../../utils/helpers";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const ProgramDetail = () => {
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
      : { eventName: "No Event Found", programs: [] };

  const program = event.programs;

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-3xl w-full space-y-2">
        <div>
          <img
            src={`/images/${event.imageUrl}`}
            alt={event.eventName}
            className="w-full h-full object-center object-cover group-hover:opacity-75"
          />
        </div>
        <div className="flex flex-col ">
        <div>
            {" "}
            <Link
              to="/"
              type="button"
              className="mt-1 ml-3 inline-block px-6 py-2.5 bg-[#662B6D] text-[#ffffff] font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#935899] hover:shadow-lg focus:bg-[#935899] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#935899] active:shadow-lg transition duration-150 ease-in-out"
            >
              {" "}
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-[#ffffff]"
              />{" "}
              Back
            </Link>
          </div>
          {program.map((item) => (
            <div className=" border-2 shadow-lg text-sm border-[#662B6D] m-3 rounded-xl">
              <div className="flex flex-row m-1">
                <div className="font-bold p-1">Event : </div>
                <div className="p-1">{item.name}</div>
              </div>
              <div className="flex flex-row m-1">
                <div className="font-bold p-1">Description : </div>
                <div className=" p-1">{item.description}</div>
              </div>
              <div className="flex flex-row m-1">
                <div className="font-bold  p-1">Start : </div>
                <div className=" p-1">{item.startTime}</div>
                <div className="font-bold p-1">End : </div>
                <div className=" p-1">{item.endTime}</div>
              </div>
              <div className="flex flex-row m-1"></div>
            </div>
          ))}
        
        </div>
      </div>
    </div>
  );
};
export default ProgramDetail;
