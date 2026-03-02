import AdminLogin from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";
import Dashboard from "./admin/Dashboard";
import Movies from "./admin/Movies";
import Users from "./admin/Users";
import { Navigate } from "react-router-dom";

const adminRoutes = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "movies", element: <Movies /> },
      { path: "users", element: <Users /> },
    ],
  },
];

export default adminRoutes;