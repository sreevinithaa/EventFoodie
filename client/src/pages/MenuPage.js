import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_NENU } from "../utils/queries";
import { LockClosedIcon } from "@heroicons/react/solid";
import { ADD_MENU, UPDATE_MENU } from "../utils/mutations";

const MenuPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
    isAvailable: true,
    comboPrice: 0,
  });
  const { id } = useParams();
  const [success, setsuccess] = useState(false);
  const [getMenu, { data }] = useLazyQuery(GET_NENU);
  const [addMenu] = useMutation(ADD_MENU);
  const [updateMenu] = useMutation(UPDATE_MENU);
  useEffect(() => {
    if (id) {
      getMenu({
        variables: { _id: id },
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
     setFormState({
        _id: id,
        name: data.getMenu.name,
        imageUrl: data.getMenu.imageUrl,
        description: data.getMenu.description,
        price: data.getMenu.price,
        isAvailable: data.getMenu.isAvailable,
        comboPrice: data.getMenu.comboPrice,
      });
    }
  }, [data]);
  const handleFormSubmit = async (event) => {
    console.log(formState);
    event.preventDefault();
    console.log(id);
    if (id) {
      console.log("update");
      const mutationResponse = await updateMenu({
        variables: {
          name: formState.name,
          description: formState.description,
          imageUrl: formState.imageUrl,
          price: formState.price,
          isAvailable: formState.isAvailable,
          comboPrice: formState.comboPrice,
          _id: id,
        },
      });
      console.log(mutationResponse);
      if (mutationResponse) {
        setsuccess(true);
        setTimeout(() => {
          setsuccess(false);
        }, 5000);
      }
    } else {
      console.log("update");
      const mutationResponse = await addMenu({
        variables: {
          name: formState.name,
          description: formState.description,
          imageUrl: formState.imageUrl,
          price: formState.price,
          isAvailable: formState.isAvailable,
          comboPrice: formState.comboPrice,
        },
      });

      if (mutationResponse) {
        setsuccess(true);
        setTimeout(() => {
          setsuccess(false);
        }, 5000);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name=="price")
    {
      setFormState({
        ...formState,
        [name]: parseFloat(value),
      });
      
    }
    else
    {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
   
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#662B6D]">
            Menu
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <div className="mb-2 flex flex-row">
              <label className="w-[25%] text-sm text-[#662B6D] p-2  font-bold">Name</label>
              <input
                id="name"
                name="name"
                value={formState.name}
                type="text"
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                placeholder="name"
              />
            </div>
            <div className="mb-2 flex flex-row">
              <label className="w-[25%] text-sm text-[#662B6D] p-2 mr-2 mb-2 font-bold">Description</label>
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
              <label className="w-[25%] text-sm text-[#662B6D] p-2 mr-2 mb-2 font-bold">Image</label>
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
              <label className="w-[25%] text-sm text-[#662B6D] p-2 mr-2 mb-2 font-bold">Price</label>
              <input
                id="price"
                name="price"
                value={formState.price}
                onChange={handleChange}
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                placeholder="price"
              />
            </div>

            <div className="mb-2 flex flex-row">
              <label className="w-[25%] text-sm text-[#662B6D] p-2 font-bold">IsAvailable</label>
              <input
                id="isAvailable"
                name="isAvailable"
                checked={formState.isAvailable}
                onChange={handleChange}
                type="checkbox"
                required
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
              Save
            </button>
          </div>
        </form>
        {success ? (
          <div role="alert">
            <div class="bg-[#be77c6] text-[#662B6D] font-bold rounded-t  border-[#764c7a]  px-4 py-2">
              Success
            </div>
            <div class="border border-t-0 border-[#764c7a] rounded-b bg-[#f2ddf5] px-4 py-3 text-[#662B6D]">
              <p>Record Saved !</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default MenuPage;
