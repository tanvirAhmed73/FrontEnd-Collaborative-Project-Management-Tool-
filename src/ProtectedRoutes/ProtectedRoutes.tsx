import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
