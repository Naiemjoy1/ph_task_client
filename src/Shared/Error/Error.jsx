import { useNavigate } from "react-router-dom";
import error from "../../assets/Images/Error/error.png";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${error})` }}
    >
      <div className="absolute inset-x-0 flex flex-col items-center bottom-1/4">
        <p className=" text-primary text-2xl font-semibold mb-4">
          Something went wrong
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-secondary text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#237255]"
        >
          Back Home
        </button>
      </div>
    </div>
  );
};

export default Error;
