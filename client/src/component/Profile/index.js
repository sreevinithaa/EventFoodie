import { LockClosedIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

export default function Profile() {
  const [formState, setFormState] = useState({
    password: "",
    userRole: "Public",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const { loading, data } = useQuery(QUERY_USER);
  const [success, setsuccess] =useState(false);

  useEffect(() => {
    if (data) {
      setFormState({
        password: data.user.password,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        phone: data.user.phone,
        userRole: data.user.userRole,
      });
    }
  }, [data, loading]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await updateUser({
      variables: {
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        userRole: formState.userRole,
        phone: formState.phone,
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
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#662B6D]">
              Profile
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <div className="mb-2">
                <label className="sr-only">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  type="text"
                  onChange={handleChange}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-2">
                <label className="sr-only">Last Name</label>
                <input
                  id="lastName"
                  onChange={handleChange}
                  value={formState.lastName}
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
              <div className="mb-2">
                <label className="sr-only">Role</label>
                <select
                  id="userRole"
                  name="userRole"
                  value={formState.userRole}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                >
                  <option value="Public">Public</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Host">Host</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="sr-only">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                  placeholder="phone"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-[#662B6D] focus:border-[#662B6D] focus:z-10 sm:text-sm"
                  placeholder="Password"
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
    </>
  );
}
