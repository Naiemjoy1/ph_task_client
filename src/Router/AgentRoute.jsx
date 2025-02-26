import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import logo from "../assets/Images/logo/logo.png";
import useAuth from "../Components/Hooks/useAuth";
import useRole from "../Components/Hooks/useRole";

const AgentRoute = ({ children }) => {
  const { user } = useAuth();
  const [userType, loadingRole] = useRole();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState(1);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (loading || loadingRole) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="relative bg-black rounded-full">
          <div
            className="radial-progress text-primary"
            style={{
              "--value": progress,
              "--size": "150px",
              "--thickness": "10px",
            }}
          ></div>
          <img
            src={logo}
            alt="Logo"
            className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12"
          />
        </div>
      </div>
    );
  }
  if (user && userType === "agent") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AgentRoute;
