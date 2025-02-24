import { createBrowserRouter } from "react-router-dom";
import Main from "../assets/Layout/Main";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Login></Login>,
      },
    ],
  },
]);
