import { useEffect, useState } from "react";
import logo from "../../../assets/Images/logo/logo.png";
import useAuth from "../../../Components/Hooks/useAuth";
import useIncome from "../../../Components/Hooks/useIncome";
import useRole from "../../../Components/Hooks/useRole";
import useTransfer from "../../../Components/Hooks/useTransfer";
import useUsers from "../../../Components/Hooks/useUsers";

const Profile = () => {
  const { user } = useAuth();
  const { users } = useUsers();
  const [userRole] = useRole();
  const [income] = useIncome();
  const { transfers } = useTransfer();

  const currentUser = users.find((u) => u.email === user.email);
  const isOnline = currentUser?.status === "active";

  const [visibleSection, setVisibleSection] = useState(null);

  const handleToggle = (section) => {
    setVisibleSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  const showIncome = userRole === "admin" || userRole === "agent";
  const showSystemBalance = userRole === "admin";

  const userIncome = income.find((inc) => inc.receiver === user.email);
  const totalIncome = userIncome ? userIncome.totalAmount : 0;

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
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full bg-primary text-white p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="relative bg-black rounded-full">
              <div
                className="radial-progress text-white"
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
            <div className="flex justify-center">
              <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="w-24 rounded-full ring-4 ring-white">
                  <img
                    src={
                      currentUser?.profileImage ||
                      "https://i.ibb.co/XFrjNzN/pexels-olly-842811.jpg"
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xl font-bold">{currentUser?.name}</p>
              <p>Mobile: {currentUser?.mobile}</p>
              <p>Email: {currentUser?.email}</p>

              <p
                onClick={() => handleToggle("balance")}
                className="cursor-pointer"
              >
                Balance:
                <span
                  className={`ml-2 ${
                    visibleSection === "balance" ? "text-white" : "blur-sm"
                  }`}
                >
                  {visibleSection === "balance"
                    ? currentUser?.balance.toFixed(2)
                    : "******"}
                </span>
              </p>

              {showIncome && (
                <p
                  onClick={() => handleToggle("income")}
                  className="cursor-pointer"
                >
                  Income:
                  <span
                    className={`ml-2 ${
                      visibleSection === "income" ? "text-white" : "blur-sm"
                    }`}
                  >
                    {visibleSection === "income"
                      ? totalIncome.toFixed(2)
                      : "******"}
                  </span>
                </p>
              )}

              {showSystemBalance && (
                <p
                  onClick={() => handleToggle("systemBalance")}
                  className="cursor-pointer"
                >
                  System Balance:
                  <span
                    className={`ml-2 ${
                      visibleSection === "systemBalance"
                        ? "text-white"
                        : "blur-sm"
                    }`}
                  >
                    {visibleSection === "systemBalance"
                      ? transfers?.grandTotal?.toFixed(2) ?? "0.00"
                      : "******"}
                  </span>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
