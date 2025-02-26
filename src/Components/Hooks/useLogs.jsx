import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useLogs = () => {
  const axiosSecure = useAxiosSecure();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/history")
      .then((response) => {
        setLogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  return [logs, loading];
};

export default useLogs;
