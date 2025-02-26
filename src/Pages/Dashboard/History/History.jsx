import moment from "moment";
import useAuth from "../../../Components/Hooks/useAuth";
import useLogs from "../../../Components/Hooks/useLogs";
import useRole from "../../../Components/Hooks/useRole";

const History = () => {
  const { user } = useAuth();
  const { logs, loading } = useLogs();
  const [userRole] = useRole();
  const limit = 100;

  let userLogs = [];

  if (userRole === "admin") {
    userLogs = logs.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  } else {
    userLogs = logs
      .filter((log) => log.sender === user.email || log.receiver === user.email)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  return (
    <div className="relative p-10">
      <p className="text-center text-2xl font-bold text-primary uppercase">
        History
      </p>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <p>Total Transactions: {userLogs?.length}</p>
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userLogs.map((log, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{log.sender}</td>
                      <td>{log.receiver}</td>
                      <td>{log.type}</td>
                      <td>{log.amount}</td>
                      <td>
                        {moment(log.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default History;
