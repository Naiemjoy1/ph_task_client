import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCashRequest = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: history = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await axiosPublic.get("/history");
      return res.data;
    },
  });

  const refetchHistory = () => {
    refetch();
  };

  return { history, isLoading, isError, refetchHistory };
};

export default useCashRequest;
