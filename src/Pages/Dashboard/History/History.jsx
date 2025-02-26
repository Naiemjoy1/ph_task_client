import moment from "moment";
import { useEffect, useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useLogs from "../../../Components/Hooks/useLogs";
import useRole from "../../../Components/Hooks/useRole";
import logo from "../../../assets/Images/logo/logo.png";

const History = () => {
  const { user } = useAuth();
  const { logs } = useLogs();
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

  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState(1);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative p-10">
      <p className="text-center text-2xl font-bold text-primary uppercase">
        History
      </p>
      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="relative bg-black rounded-full">
            <div
              className="radial-progress text-primary"
              style={{
                "--value": progress,
                "--size": "150px",
                "--thickness": "10px",
              }}
            ></div>
            <img
              src={logo}
              alt="Logo"
              className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12"
            />
          </div>
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
