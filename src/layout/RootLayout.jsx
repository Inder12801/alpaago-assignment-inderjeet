import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="root">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
