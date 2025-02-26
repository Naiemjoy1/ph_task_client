import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import element from "../../assets/Images/element/element.png";
import logo from "../../assets/Images/logo/logo.png";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const Registration = () => {
  const axios = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    if (isSubmitting) {
      setProgress(1);
      let interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isSubmitting]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const userData = { ...data };
      await axios.post("/users", userData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Created",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "An error occurred",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
      style={{ backgroundImage: `url(${element})` }}
    >
      <div className="flex justify-center items-center h-screen lg:w-1/3 mx-auto min-h-[calc(100vh-246px)]">
        {loading || isSubmitting ? (
          <div className="flex flex-col items-center justify-center">
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
            <div className="absolute inset-x-0 top-5 lg:w-1/3 mx-auto flex justify-center items-center gap-5 bg-[#eff3f4] py-5 rounded-lg shadow-md">
              <a
                href="https://github.com/Naiemjoy1/ph_task_client"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary  hover:underline"
              >
                GitHub Client Side
              </a>
              <a
                href="https://github.com/Naiemjoy1/ph_task_server"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary  hover:underline"
              >
                GitHub Server Side
              </a>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body bg-white bg-opacity-80 p-6 rounded-lg shadow-lg"
            >
              <div className="flex justify-center gap-4">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500">Name field is required</span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">PIN (5 digits)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="PIN"
                    className="input input-bordered"
                    {...register("pin", {
                      required: true,
                      minLength: 5,
                      maxLength: 5,
                      pattern: /^[0-9]*$/,
                    })}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                  {errors.pin && (
                    <span className="text-red-500">PIN field is required</span>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">User Type</span>
                  </label>
                  <select
                    className="select select-bordered"
                    {...register("userType", { required: true })}
                  >
                    <option disabled selected>
                      Select User Type?
                    </option>
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                  </select>
                  {errors.userType && (
                    <span className="text-red-500">
                      User Type field is required
                    </span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">NID</span>
                  </label>
                  <input
                    type="number"
                    placeholder="NID (10 - 14 digits)"
                    className="input input-bordered"
                    {...register("nid", {
                      required: true,
                      minLength: 10,
                      maxLength: 14,
                      pattern: /^[0-9]*$/,
                    })}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                  {errors.nid && (
                    <span className="text-red-500">NID field is required</span>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Mobile</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Mobile (10 digits)"
                    className="input input-bordered"
                    {...register("mobile", {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                      pattern: /^[0-9]*$/,
                    })}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                  {errors.mobile && (
                    <span className="text-red-500">
                      Mobile must be 10 digits
                    </span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      Email field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary text-white"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
              <p className="text-center">
                Already have an account ?{" "}
                <span>
                  <a className="text-primary" href="/login">
                    Login{" "}
                  </a>
                </span>
                Here
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;
