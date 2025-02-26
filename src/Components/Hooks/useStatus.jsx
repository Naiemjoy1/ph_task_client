import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useStatus = () => {
  const { user } = useAuth();
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/user/${user.email}`)
        .then((response) => {
          setUserStatus(response.data.status);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  return [userStatus, loading];
};

export default useStatus;
