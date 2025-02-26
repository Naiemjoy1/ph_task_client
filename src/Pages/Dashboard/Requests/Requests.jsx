import Swal from "sweetalert2";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useLogs from "../../../Components/Hooks/useLogs";

const Requests = () => {
  const { user } = useAuth();
  const { logs, refetchLogs } = useLogs();
  const axiosSecure = useAxiosSecure();

  const request = logs.filter(
    (log) => log?.receiver === user.email && log?.status === "pending"
  );

  const handleConfirm = async (id) => {
    try {
      const response = await axiosSecure.patch(`/history/${id}`, {
        status: "confirm",
      });

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Transaction Confirmed",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          refetchLogs();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "An error occurred!",
      });
    }
  };

  const handleDecline = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, decline it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/history/${id}`);

          if (response.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Request Declined",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetchLogs();
            });
          } else {
            console.error("Failed to delete request:", response.data.message);
          }
        } catch (error) {
          console.error("Failed to delete request:", error);
        }
      }
    });
  };

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Requests</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {request.map((log, index) => (
              <tr key={log._id} className="hover">
                <th>{index + 1}</th>
                <td>{log.sender}</td>
                <td>{log.amount}</td>
                <td>{log.status}</td>
                <td>{log.type}</td>
                <td>
                  {log.status === "pending" && (
                    <>
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        onClick={() => handleConfirm(log._id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDecline(log._id)}
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
