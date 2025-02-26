import Swal from "sweetalert2";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useLogs from "../../../Components/Hooks/useLogs";

const Modal = () => {
  const { user } = useAuth();
  const { logs } = useLogs();
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
          title: "Money Sent",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div>
      <label htmlFor="my_modal_7" className="btn btn-sm btn-primary">
        Request
        <div className="badge badge-secondary">{request?.length}</div>
      </label>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Sender</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {request.map((log, index) => (
                  <tr key={log._id} className="hover">
                    <th>{index + 1}</th>
                    <td>{log.sender}</td>
                    <td>{log.amount}</td>
                    <td>{log.status}</td>
                    <td>
                      {log.status === "pending" && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleConfirm(log._id)}
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default Modal;
