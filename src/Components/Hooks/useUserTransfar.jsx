import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUserTransfar = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    data: userTransfers = [],
    isLoading: loading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["userTransfers"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/history/${user.email}`);
      return res.data;
    },
    onError: (err) => {
      console.error("Error fetching transfers:", err);
    },
  });

  const refetchUserTransfers = () => {
    refetch();
  };

  return { userTransfers, loading, error, refetchUserTransfers, isFetching };
};

export default useUserTransfar;
