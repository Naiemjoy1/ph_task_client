import { useEffect, useState } from "react";
import { FaUserLargeSlash } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useUsers from "../../../Components/Hooks/useUsers";
import logo from "../../../assets/Images/logo/logo.png";

const UserManagement = () => {
  const { users, refetchUsers } = useUsers();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "User has been deleted.", "success");
              refetchUsers();
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleChangeStatus = (user, status) => {
    axiosSecure.patch(`/users/status/${user.email}`, { status }).then(() => {
      refetchUsers();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `User status changed to ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const handleRoleChange = (user, userType) => {
    axiosSecure.patch(`/users/admin/${user._id}`, { userType }).then(() => {
      refetchUsers();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.name}'s role changed to ${userType}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.email.includes(searchTerm) || user.mobile.includes(searchTerm)
  );

  return (
    <div className="relative p-10">
      <input
        type="text"
        placeholder="Search by email or phone"
        className="input input-bordered w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Details</th>
                  <th>Balance</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {/* <img src={user?.profileImage} alt="User Avatar" /> */}
                            <img
                              src={
                                user?.profileImage ||
                                "https://i.ibb.co/XFrjNzN/pexels-olly-842811.jpg"
                              }
                              alt="Profile"
                              className="w-full h-full rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user?.name}
                      <br />
                      {user?.email}
                      <br />
                      {user?.mobile}
                    </td>
                    <td>{user?.balance}</td>
                    <td>
                      <select
                        className="select select-bordered max-w-xs text-black"
                        value={user.userType}
                        onChange={(e) => handleRoleChange(user, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="agent">Agent</option>
                      </select>
                    </td>
                    <td>
                      {user.userType !== "admin" && (
                        <>
                          {user.status === "active" ? (
                            <button
                              onClick={() => handleChangeStatus(user, "block")}
                              className="btn bg-green-500 hover:bg-green-600 text-white btn-xs"
                            >
                              <IoMdCheckmarkCircle />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleChangeStatus(user, "active")}
                              className="btn bg-yellow-500 hover:bg-yellow-600  text-white btn-xs"
                            >
                              <FaUserLargeSlash />
                            </button>
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      {user.userType !== "admin" && (
                        <button
                          onClick={() => handleDelete(user)}
                          className="btn bg-red-500 hover:bg-red-600 text-white btn-xs"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
