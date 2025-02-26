import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTransfer = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: transfers = [],
    isLoading: loading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["transfers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/history/transfers");
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching transfers:", err);
    },
  });

  const refetchTransfers = () => {
    refetch();
  };

  return { transfers, loading, error, refetchTransfers, isFetching };
};

export default useTransfer;
