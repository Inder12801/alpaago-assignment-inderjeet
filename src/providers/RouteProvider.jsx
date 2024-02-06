import React from "react";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";

//route components imports
import Homepage from "../pages/Home/Homepage";
import Userspage from "../pages/Users/Userspage";
import Signup from "../pages/Auth/Signup/Signup";
import Login from "../pages/Auth/Login/Login";
import RootLayout from "../layout/RootLayout";

// Create routes using createRoutesFromElements
const routes = createRoutesFromElements([
  <Route path="/" element={<RootLayout />}>
    <Route path="/home" element={<Homepage />} />,
    <Route path="/signup" element={<Signup />} />,
    <Route path="/login" element={<Login />} />,
    <Route path="/users" element={<Userspage />} />,
  </Route>,
]);

// Create the router
const router = createBrowserRouter(routes);

function RouteProvider() {
  return <RouterProvider router={router} />;
}

export default RouteProvider;
