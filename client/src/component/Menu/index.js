import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_MENU } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_VENDOR } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import MenuDetail from "../MenuDetail/index";

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

        {data.vendor.menu.length ? (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data.vendor.menu.map((menu) => (
              <MenuDetail
                _id={menu._id}
                imageUrl={menu.imageUrl}
                name={menu.name}
                price={menu.price}
                vendor={id}
              />
            ))}{" "}
          </div>
        ) : (
          <div>
            {" "}
            <h3>You haven't added any menu yet!</h3>
          </div>
        )}
      </div>
    </div>
  );
};
export default Menu;
