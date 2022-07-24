import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/EventFoodie.jpg";
import { useStoreContext } from "../../utils/GlobalState";
import { OPEN_CART } from "../../utils/actions";
import auth from "../../utils/auth";
let navigation = [];

if (auth.loggedIn()) {
  const profile = auth.getProfile();

  if (profile.data.userRole == "Host") {
    navigation = [
      { name: "Dashboard", href: "/", current: true },
      { name: "Events", href: "#", current: false },
      { name: "Vendor", href: "#", current: false },
    
    ];
  } else if (profile.data.userRole == "Vendor") {
    navigation = [
      { name: "Dashboard", href: "/", current: true },
      { name: "Menu", href: "/menu", current: false },
      { name: "Order", href: "/vorder", current: false },
    ];
  } else {
    navigation = [
      { name: "Dashboard", href: "/", current: true },
      { name: "MyOrder", href: "/myorder", current: false },
    ];
  }
} else {
  navigation = [
    { name: "Dashboard", href: "/", current: true },
    { name: "SignUp", href: "/signup", current: true },
    { name: "Login", href: "/login", current: true },
  ];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {

  const [state, dispatch] = useStoreContext();
  function toggleCart() {
    dispatch({ type: OPEN_CART });
   
  }
  return (
    <Disclosure as="nav" className="pb-2 border-b-4 border-[#662B6D]">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-20 w-auto rounded-xl"
                    src={logo}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-20 w-auto rounded-xl"
                    src={logo}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block  sm:ml-6">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-[#662B6D] hover:text-[#7e7c7c] px-3 py-2 rounded-md text-sm font-medium leading-[5rem]"
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {auth.loggedIn() === true ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#662B6D] focus:ring-[#662B6D]">
                        <span className="sr-only">Open user menu</span>
                        <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-[#662B6D] text-xl text-white uppercase">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-[#ffffff]"
                            size="lg"
                          />
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-[#662B6D] ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/profile"
                              className={classNames(
                                active ? "bg-[#662B6D] text-[#ffffff]" : "",
                                "block px-4 py-2 text-sm text-gray"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              onClick={() => auth.logout()}
                              className={classNames(
                                active ? "bg-[#662B6D] text-[#ffffff]" : "",
                                "block px-4 py-2 text-sm text-gray"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div></div>
                )}
                <button
                  type="button"
                  onClick={toggleCart}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#662B6D] focus:ring-[#662B6D]"
                >
                  <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-[#662B6D] text-xl text-white uppercase">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-[#ffffff]"
                      size="lg"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block text-[#662B6D] hover:text-gray px-3 py-2 rounded-md text-base font-medium"
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default Header;
