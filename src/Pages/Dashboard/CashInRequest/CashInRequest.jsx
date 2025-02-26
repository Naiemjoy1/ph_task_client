import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useStatus from "../../../Components/Hooks/useStatus";
import useUsers from "../../../Components/Hooks/useUsers";

const CashInRequest = () => {
  const { user } = useAuth();
  const { users, refetchUsers } = useUsers();
  const currentUser = users.find((u) => u.email === user.email);
  // console.log("cash in request", currentUser);
  const [userStatus] = useStatus();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const validateReceiver = (value) => {
    if (!value) return "This field is required";
    if (!/^\d{10}$/.test(value) && !/\S+@\S+\.\S+/.test(value)) {
      return "Invalid input. Please enter a 10-digit number or valid email";
    }
    return true;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: `You are sending a cash-in request to ${data.receiverIdentifier}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send it!",
      });

      if (confirmResult.isConfirmed) {
        const response = await axiosSecure.post(
          "http://localhost:3000/cash-in-request",
          {
            senderEmail: user.email,
            receiverIdentifier: data.receiverIdentifier,
            amount: data.amount,
            pin: data.pin,
            image: currentUser.profileImage,
          }
        );

        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
        });
        reset(); // Reset form fields
        refetchUsers(); // Refetch users data
      } else {
        Swal.fire("Cancelled", "Transaction request cancelled.", "info");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="p-10">
      <p className="text-center text-2xl font-bold text-primary uppercase">
        Cash In Request
      </p>
      <h2 onClick={toggleBalanceVisibility} className="cursor-pointer">
        Current Balance:
        <span className={`ml-2 ${isBalanceVisible ? "text-black" : "blur-sm"}`}>
          {isBalanceVisible ? currentUser?.balance : "******"}
        </span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="lg:flex justify-center space-y-4 gap-6 lg:space-y-0 items-center">
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text">Sender</span>
            </label>
            <input
              type="text"
              name="senderEmail"
              placeholder="Sender's email"
              className="input input-bordered"
              defaultValue={user?.email}
              readOnly
            />
          </div>
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text">Receiver</span>
            </label>
            <input
              type="text"
              name="receiverIdentifier"
              placeholder="Receiver's email or 10-digit number"
              className="input input-bordered"
              {...register("receiverIdentifier", {
                required: true,
                validate: validateReceiver,
              })}
            />
            {errors.receiverIdentifier && (
              <span className="text-red-500">
                {errors.receiverIdentifier.message}
              </span>
            )}
          </div>
        </div>
        <div className="lg:flex justify-center space-y-4 gap-6 lg:space-y-0 items-center">
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="input input-bordered"
              {...register("amount", { required: true, min: 50 })}
            />
            {errors.amount && (
              <span className="text-red-500">
                {errors.amount.type === "min"
                  ? "Minimum amount is 50"
                  : "This field is required"}
              </span>
            )}
          </div>
          <div className="form-control lg:w-1/2">
            <label className="label">
              <span className="label-text">PIN (5 digits)</span>
            </label>
            <input
              type="text"
              name="pin"
              placeholder="PIN"
              className="input input-bordered"
              {...register("pin", {
                required: true,
                minLength: 5,
                maxLength: 5,
                pattern: /^[0-9]*$/,
              })}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
            {errors.pin && (
              <span className="text-red-500">
                {errors.pin.type === "required"
                  ? "This field is required"
                  : errors.pin.type === "minLength" ||
                    errors.pin.type === "maxLength"
                  ? "PIN must be exactly 5 digits long"
                  : "PIN must contain only digits (0-9)"}
              </span>
            )}
          </div>
        </div>
        <div className="form-control mt-6">
          {userStatus === "active" ? (
            <button
              type="submit"
              className={`btn btn-primary ${
                loading && "opacity-50 cursor-wait"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Cash In Request"}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary opacity-50 cursor-not-allowed"
            >
              Wait for account active
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CashInRequest;
