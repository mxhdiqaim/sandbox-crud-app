import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/users/UserState";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ component: Component }) => {
  const [authState] = useAuth();
  const { isAuthenticated, loading } = authState;
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
