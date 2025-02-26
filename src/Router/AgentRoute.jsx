import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Components/Hooks/useAuth";
import useRole from "../Components/Hooks/useRole";

const AgentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userType, loadingRole] = useRole();
  const location = useLocation();

  if (loading || loadingRole) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && userType === "agent") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AgentRoute;
