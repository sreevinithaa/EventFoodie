import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useStoreContext } from "../../utils/GlobalState";
import {
  TOGGLE_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { loadStripe } from "@stripe/stripe-js";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import Auth from "../../utils/auth";
// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe(process.env.stripe_key_2);
export default function Cart() {
  const [state, dispatch] = useStoreContext();
  const [open, setOpen] = useState(state.cartOpen);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, cart: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  useEffect(() => {
    if (!open) {
      dispatch({ type: TOGGLE_CART });
    }
  }, [open]);
  useEffect(() => {
    if (state.cartOpen) {
      setOpen(state.cartOpen);
    }
  }, [state.cartOpen]);
  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }
  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };
  // When the submit checkout method is invoked, loop through each item in the cart
  // Add each item id to the productIds array and then invoke the getCheckout query passing an object containing the id for all our products
  function submitCheckout() {
    const menuIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        menuIds.push(item._id);
      }
    });

    getCheckout({
      variables: { menu: menuIds },
    });
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#ffffff] shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray">
                          {" "}
                          Shopping cart{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray hover:text-gray"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray"
                          >
                            {state.cart.length ? (
                              <div>
                                {" "}
                                {state.cart.map((item) => (
                                  <li key={item._id} className="flex py-6">
                                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray">
                                      <img
                                        src={`/images/${item.imageUrl}`}
                                        alt={item.name}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray">
                                          <h3>
                                            <a href="#"> {item.name} </a>
                                          </h3>
                                          <p className="ml-4">{item.price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray"></p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray">
                                          Qty {item.purchaseQuantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() => removeFromCart(item)}
                                            className="font-medium text-[#662B6D] hover:text-[#662B6D]"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </div>
                            ) : (
                              <h3 className="mt-0.5 text-sm text-gray">
                                <span role="img" aria-label="shocked">
                                  😱
                                </span>
                                You haven't added anything to your cart yet!
                              </h3>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {state.cart.length ? (
                      <div className="border-t border-gray py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray">
                          <p>Subtotal</p>
                          <p>${calculateTotal()}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          {Auth.loggedIn() ? (
                            <a
                              href="#"
                              onClick={submitCheckout}
                              className="flex items-center justify-center rounded-md border border-transparent bg-[#662B6D] px-6 py-3 text-base font-medium text-[#ffffff] shadow-sm hover:bg-[#662B6D]"
                            >
                              Checkout
                            </a>
                          ) : (
                            <span>(log in to check out)</span>
                          )}
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-[#662B6D] hover:text-[#662B6D]"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
