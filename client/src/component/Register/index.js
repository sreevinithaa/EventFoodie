import { LockClosedIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";


export default function Register() {
  const [formState, setFormState] = useState({ email: "", password: "" ,userRole:'Public'});
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
   
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        userRole: formState.userRole,
        phone: formState.phone,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
        <div className="max-w-lg w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-purple">
              Register
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div className="mb-2 flex flex-row">
                <label className="w-[25%] text-sm text-purple p-2 font-bold">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-purple focus:border-purple focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-2 flex flex-row">
                <label className="w-[25%] text-sm text-purple p-2 font-bold">Last Name</label>
                <input
                  id="lastName"
                  onChange={handleChange}
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-purple focus:border-purple focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
              <div className="mb-2 flex flex-row">
                <label className="w-[25%] text-sm text-purple p-2 font-bold">Role</label>
                <select
                  id="userRole"
                  name="userRole"
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-purple focus:border-purple focus:z-10 sm:text-sm"
                >
                  <option value="Public">Public</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Host">Host</option>
                </select>
              </div>
              <div className="mb-2 flex flex-row">
                <label className="w-[25%] text-sm text-purple p-2 font-bold">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-purple focus:border-purple focus:z-10 sm:text-sm"
                  placeholder="phone"
                />
              </div>
              <div className="mb-2 flex flex-row">
                <label className="w-[25%] text-sm text-purple p-2 font-bold">Email</label>
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-purple focus:border-purple focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mb-2 flex flex-row">
                <label htmlFor="password" className="w-[25%] text-sm text-purple p-2 font-bold">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-xl focus:outline-none focus:ring-purple focus:border-purple focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple hover:bg-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
                    aria-hidden="true"
                  />
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
