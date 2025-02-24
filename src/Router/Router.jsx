import { createBrowserRouter } from "react-router-dom";
import Main from "../assets/Layout/Main";
import Login from "../Pages/Login/Login";
import Error from "../Shared/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Login></Login>,
      },
    ],
  },
]);
