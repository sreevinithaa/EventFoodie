import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_MENU } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_VENDOR } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import auth from "../../utils/auth";
const Menu = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const { loading, data, error } = useQuery(QUERY_VENDOR, {
    variables: { _id: id },
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_MENU,
        menus: data.vendor.menu,
      });
      data.vendor.menu.forEach((menu) => {
        idbPromise("menu", "put", menu);
      });
    } else if (!loading) {
      idbPromise("menu", "get").then((menus) => {
        dispatch({
          type: UPDATE_MENU,
          menus: menus,
        });
      });
    }
  }, [data, loading, dispatch]);
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Data couldn't be fetched</h3>;

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
     
        <div>
            <h2 className=" sm:py-10 text-left text-3xl font-extrabold text-[#662B6D]">
            {data.vendor.name} - Menu
            </h2>
          </div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.vendor.menu.map((menu) => (
            <div key={menu._id} className="group ">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={`/images/${menu.imageUrl}`}
                  alt={menu.name}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray">{menu.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray">
                ${menu.price}
              </p>
              {auth.loggedIn() === true ? (
              <div className=" flex justify-end w-full">
                <button className="h-7 px-3 mr-1 text-[#662B6D] transition-colors duration-150 border border-[#662B6D] rounded-lg focus:shadow-outline hover:bg-[#662B6D] hover:text-[#ffffff]">
                  Add Cart
                </button>
              </div>):<></>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Menu;
