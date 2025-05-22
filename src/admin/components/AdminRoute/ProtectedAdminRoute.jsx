import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";

const ProtectedAdminRoute = ({ element }) => {
  const { isAdmin, token } = useContext(StoreContext);
  return token && isAdmin ? element : <Navigate to="/login" />;
};

export default ProtectedAdminRoute;