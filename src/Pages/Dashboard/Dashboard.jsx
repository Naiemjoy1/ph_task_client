import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import useRole from "../../Components/Hooks/useRole";
import useUsers from "../../Components/Hooks/useUsers";
import element from "../../assets/Images/element/element.png";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [userRole] = useRole();
  const { users } = useUsers();
  const navigate = useNavigate();

  const currentUser = user ? users.find((u) => u.email === user.email) : null;

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
      style={{ backgroundImage: `url(${element})` }}
    >
      <div className="absolute inset-x-0 top-5 container mx-auto flex justify-center items-center gap-5 bg-[#eff3f4] py-5 rounded-lg shadow-md">
        <a
          href="https://github.com/Naiemjoy1/mfs-client"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary  hover:underline"
        >
          GitHub Client Side
        </a>
        <a
          href="https://github.com/Naiemjoy1/mfs-server"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary  hover:underline"
        >
          GitHub Server Side
        </a>
      </div>

      <div className="container mx-auto py-12 lg:flex space-y-4 lg:space-y-0 gap-4">
        <div className="lg:w-1/4 bg-[#eff3f4] px-10 py-6 rounded-xl shadow-2xl flex flex-col justify-between gap-5">
          <section>
            <p className="text-center uppercase font-bold">MFS Dashboard</p>
            <div className="divider"></div>
          </section>
          <section>
            <ul className="menu text-lg gap-4">
              {/* <NavLink to="/dashboard">
                <li>Dashboard</li>
              </NavLink> */}
              <NavLink to="/dashboard/profile">
                <li>Profile</li>
              </NavLink>
              {userRole === "admin" && (
                <NavLink to="/dashboard/management">
                  <li>Users</li>
                </NavLink>
              )}
              {userRole === "admin" && (
                <NavLink to="/dashboard/requests">
                  <li>Requests</li>
                </NavLink>
              )}
              {userRole === "agent" && (
                <NavLink to="/dashboard/cashin">
                  <li>Cash In</li>
                </NavLink>
              )}
              {userRole === "agent" && (
                <NavLink to="/dashboard/cash-request">
                  <li>Cash Request</li>
                </NavLink>
              )}
              {userRole === "agent" && (
                <NavLink to="/dashboard/cash-Withdraw">
                  <li>Cash Withdraw</li>
                </NavLink>
              )}
              {userRole === "agent" && (
                <NavLink to="/dashboard/cash-out-request">
                  <li>Cash Out Request</li>
                </NavLink>
              )}
              {userRole === "user" && (
                <NavLink to="/dashboard/sendmoney">
                  <li>Send Money</li>
                </NavLink>
              )}
              {userRole === "user" && (
                <NavLink to="/dashboard/cashout">
                  <li>Cash Out</li>
                </NavLink>
              )}
              {userRole === "user" && (
                <NavLink to="/dashboard/cash-in-request">
                  <li>Cash In Request</li>
                </NavLink>
              )}
              <NavLink to="/dashboard/history">
                <li>History</li>
              </NavLink>
            </ul>
          </section>
          <section className="flex flex-col items-center text-center">
            <div className="divider"></div>
            <div className="avatar online">
              <div className="w-14 rounded-full">
                <img
                  src={
                    currentUser?.profileImage ||
                    "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <p>{currentUser?.name}</p>
            <button onClick={handleLogout} className="btn btn-xs btn-error">
              Log Out
            </button>
          </section>
        </div>
        <div className="lg:w-3/4 bg-[#eff3f4]  rounded-xl shadow-xl">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
