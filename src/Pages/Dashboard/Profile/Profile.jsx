import { useEffect, useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useIncome from "../../../Components/Hooks/useIncome";
import useRole from "../../../Components/Hooks/useRole";
import useUsers from "../../../Components/Hooks/useUsers";
import logo from "../../../assets/Images/logo/logo.png";

const Profile = () => {
  const { user } = useAuth();
  const { users } = useUsers();
  const [userRole] = useRole();
  const [income] = useIncome();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const currentUser = users.find((u) => u.email === user.email);
  const isOnline = currentUser?.status === "active";

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const showIncome = userRole === "admin" || userRole === "agent";

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
              <p onClick={toggleBalanceVisibility} className="cursor-pointer">
                Balance:
                <span
                  className={`ml-2 ${
                    isBalanceVisible ? "text-white" : "blur-sm"
                  }`}
                >
                  {isBalanceVisible ? currentUser?.balance : "******"}
                </span>
              </p>

              {showIncome && (
                <p onClick={toggleBalanceVisibility} className="cursor-pointer">
                  Income:
                  <span
                    className={`ml-2 ${
                      isBalanceVisible ? "text-white" : "blur-sm"
                    }`}
                  >
                    {isBalanceVisible ? totalIncome.toFixed(2) : "******"}
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
