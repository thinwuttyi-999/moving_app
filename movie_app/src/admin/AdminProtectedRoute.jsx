import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/login" />;

  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log("TOKEN PAYLOAD:", payload);

  if (!payload.isAdmin) return <Navigate to="/" />; 

  return children;
}