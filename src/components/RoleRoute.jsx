import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RoleRoute = ({ children, role }) => {
  const { user, token } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" replace />;

  if (user?.role !== role) return <Navigate to="/" replace />;

  return children;
};

export default RoleRoute;
