import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useIncome = () => {
  const axiosSecure = useAxiosSecure();
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/income")
      .then((response) => {
        setIncome(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  return [income, loading];
};

export default useIncome;
