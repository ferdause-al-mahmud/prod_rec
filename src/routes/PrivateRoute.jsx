/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading)
    return (
      <div className=" p-10 text-center">
        <span className="loading loading-spinner loading-lg text-accent"></span>
      </div>
    );
  if (user) return children;
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
