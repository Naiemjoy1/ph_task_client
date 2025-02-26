import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import element from "../../assets/Images/element/element.png";
import logo from "../../assets/Images/logo/logo.png";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
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

    try {
      const response = await axiosPublic.post("/login", data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/dashboard/profile";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "An error occurred",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${element})` }}
    >
      <div className="h-screen lg:w-1/3 mx-auto min-h-[calc(100vh-246px)] flex justify-center items-center">
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body bg-white bg-opacity-80 p-6 rounded-lg shadow-lg"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email or Mobile</span>
                </label>
                <input
                  type="text"
                  placeholder="Email or mobile"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">PIN (5 digits)</span>
                </label>
                <input
                  type="text"
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
                  <span className="text-red-500">
                    PIN must be exactly 5 digits long
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full text-white"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>

              <p className="text-center mt-4">
                New Here?{" "}
                <a className="text-primary" href="/registration">
                  Register
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
