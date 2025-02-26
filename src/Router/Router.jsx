import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import CashIn from "../Pages/Dashboard/CashIn/CashIn";
import CashInRequest from "../Pages/Dashboard/CashInRequest/CashInRequest";
import CashOut from "../Pages/Dashboard/CashOut/CashOut";
import CashOutRequest from "../Pages/Dashboard/CashOutRequest/CashOutRequest";
import CashRequest from "../Pages/Dashboard/CashRequest/CashRequest";
import CashWithdraw from "../Pages/Dashboard/CashWithdraw/CashWithdraw";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardStat from "../Pages/Dashboard/DashboardStat/DashboardStat";
import History from "../Pages/Dashboard/History/History";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Requests from "../Pages/Dashboard/Requests/Requests";
import SendMoney from "../Pages/Dashboard/SendMoney/SendMoney";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Error from "../Shared/Error/Error";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <DashboardStat></DashboardStat>,
          },
          {
            path: "/dashboard/profile",
            element: <Profile></Profile>,
          },
          {
            path: "/dashboard/sendmoney",
            element: <SendMoney></SendMoney>,
          },
          {
            path: "/dashboard/cashin",
            element: (
              <AgentRoute>
                <CashIn></CashIn>
              </AgentRoute>
            ),
          },
          {
            path: "/dashboard/cashout",
            element: <CashOut></CashOut>,
          },
          {
            path: "/dashboard/history",
            element: <History></History>,
          },
          {
            path: "/dashboard/management",
            element: (
              <AdminRoute>
                <UserManagement></UserManagement>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/requests",
            element: (
              <AdminRoute>
                <Requests></Requests>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/cash-in-request",
            element: <CashInRequest></CashInRequest>,
          },
          {
            path: "/dashboard/cash-request",
            element: (
              <AgentRoute>
                <CashRequest></CashRequest>
              </AgentRoute>
            ),
          },
          {
            path: "/dashboard/cash-Withdraw",
            element: (
              <AgentRoute>
                <CashWithdraw></CashWithdraw>
              </AgentRoute>
            ),
          },
          {
            path: "/dashboard/cash-out-request",
            element: (
              <AgentRoute>
                <CashOutRequest></CashOutRequest>
              </AgentRoute>
            ),
          },
        ],
      },
    ],
  },
]);
