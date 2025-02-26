import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLogs = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: logs = [],
    isLoading: loading,
    refetch: refetchLogs,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/history");
      return res.data;
    },
  });

  return { logs, loading, refetchLogs };
};

export default useLogs;
