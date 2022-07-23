import React, { useEffect } from "react";
import Cart from "../component/Cart/index";
import Dashboard from "../component/Dashboard";

const Home = () => {
  return (
    <div>
      <Dashboard />
      <Cart />
    </div>
  );
};

export default Home;
