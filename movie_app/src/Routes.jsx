import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MovieDetail from "./pages/MovieDetail";
import SearchResult from "./pages/SearchResult";
import ProtectedRoute from "./components/ProtectRoute";
import adminRoutes from "./adminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> }, // ✅ public

      { path: "/profile", element: <Profile /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/movie/:id",
        element: (
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        ),
      }, // ✅ movie detail protected

      { path: "/search", element: <SearchResult /> }, // public
    ],
  },
  ...adminRoutes,
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}