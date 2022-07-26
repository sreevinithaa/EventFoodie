import { LockClosedIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_VENDOR_USER } from "../utils/queries";
import { UPDATE_USER_VENDOR } from "../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

const Vendor = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    imageUrl: "",
    StripeAccount: "",
    _id: "",
  });
  const [updateUserVendor] = useMutation(UPDATE_USER_VENDOR);
  const { loading, data } = useQuery(QUERY_VENDOR_USER);
  const [success, setsuccess] = useState(false);

  useEffect(() => {
    if (data) {
      setFormState({
        name: data.getUserVendor.name,
        description: data.getUserVendor.description,
        imageUrl: data.getUserVendor.imageUrl,
        StripeAccount: data.getUserVendor.StripeAccount,
        _id: data.getUserVendor._id,
      });
    }
  }, [data, loading]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await updateUserVendor({
      variables: {
        name: formState.name,
        description: formState.description,
        imageUrl: formState.imageUrl,
        StripeAccount: formState.StripeAccount,
        _id: formState._id,
      },
    });

    if (mutationResponse) {
      setsuccess(true);
      setTimeout(() => {
        setsuccess(false);
      }, 5000);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#662B6D]">
            Vendor Profile
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <div className="mb-2 flex flex-row">
              <label className="w-[25%] text-sm text-[#662B6D] p-2 font-bold">Name</label>
              <input
                id="name"
                name="name"
                value={formState.name}
                type="text"
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div className="mb-2 flex flex-row">
              <label className="w-[25%] text-sm text-[#662B6D] p-2 font-bold">Description</label>
              <input
                id="description"
                onChange={handleChange}
                value={formState.description}
                name="description"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                placeholder="Description"
              />
            </div>
            <div className="mb-2 flex flex-row">
              <label className="w-[25%] text-sm text-[#662B6D] p-2 font-bold">Image</label>
              <input
                id="imageUrl"
                onChange={handleChange}
                value={formState.imageUrl}
                name="imageUrl"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                placeholder="Image"
              />
            </div>
            <div className="mb-2 flex flex-row">
              <label className="w-[25%] text-sm text-[#662B6D] p-2 font-bold">StripeAccount</label>
              <input
                id="StripeAccount"
                name="StripeAccount"
                value={formState.StripeAccount}
                onChange={handleChange}
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                placeholder="phone"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#ffffff] bg-[#662B6D] hover:bg-[#662B6D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#662B6D]"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-[#662B6D]-500 group-hover:text-[#662B6D]-400"
                  aria-hidden="true"
                />
              </span>
              Update
            </button>
          </div>
        </form>
        {success ? (
          <div role="alert">
            <div class="bg-[#be77c6] text-[#662B6D] font-bold rounded-t  border-[#764c7a]  px-4 py-2">
              Success
            </div>
            <div class="border border-t-0 border-[#764c7a] rounded-b bg-[#f2ddf5] px-4 py-3 text-[#662B6D]">
              <p>Profile updated !</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

    
    </div>
   <div className="w-[90%] text-center sm:text-right "><Link to="/menu" className="bg-[#662B6D] text-sm font-bold rounded-xl text-[#ffffff] p-3">  <FontAwesomeIcon
                            icon={faPlus}
                            className="text-[#ffffff] font-bold"
                            size="lg" 
                          /> Add New Menu</Link></div> 
    {loading ? (
        <></>
      ) : (
        
        <table class="table-fixed text-sm w-[90%] border-[#662B6D] border-collapse border border-slate p-1 m-8">
          <thead>
            <tr className=" bg-[#662B6D] text-[#ffffff] rounded-xl">
              <th className="p-2 border border-slate">Name</th>
              <th className="p-2 border border-slate">Price</th>
              <th className="p-2 border border-slate">Available</th>
              <th className="p-2 border border-slate"></th>
            </tr>
          </thead>
          <tbody>
            {data.getUserVendor.menu.map((menu) => (
              <tr>
                <td className="p-2 border border-slate">{menu.name}</td>
                <td className="p-2 border border-slate">${menu.price}</td>
                <td className="p-2 border border-slate">
                  {menu.isAvailable ? "Yes" : "No"}
                </td>
                <td className="p-2 border text-center border-slate">
                <Link to={`/menu/${menu._id}`}>  <FontAwesomeIcon
                            icon={faPencil}
                            className="text-[#662B6D]"
                            size="lg"
                          /></Link>
                        </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Vendor;
