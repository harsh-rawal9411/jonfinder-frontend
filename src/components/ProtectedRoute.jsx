import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, authLoading } = useContext(AuthContext);

  // Wait until AuthContext loads token from localStorage
  if (authLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Now check authentication
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
