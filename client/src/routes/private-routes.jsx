import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLogged = localStorage.getItem("Name"); // check logging state with localStorage
  return isLogged ? children : <Navigate to="/" />;
}
export default PrivateRoute;
