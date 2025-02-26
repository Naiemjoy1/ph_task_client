import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/user/${user.email}`)
        .then((response) => {
          setUserType(response.data.userType);
          setLoadingRole(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoadingRole(false);
        });
    } else {
      setLoadingRole(false);
    }
  }, [user]);

  return [userType, loadingRole];
};

export default useRole;
