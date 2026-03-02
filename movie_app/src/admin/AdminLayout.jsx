import { Outlet, Link, useLocation } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function AdminLayout() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  const linkStyle = (path) => ({
    display: "block",
    marginBottom: "16px",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "bold" : "normal",
    color: "#fff",          // 🔹 links အဖြူ
    padding: "8px 12px",
    borderRadius: "4px",
    backgroundColor: location.pathname === path ? "#444" : "transparent", // 🔹 active background
  });

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{
        width: 200,
        p: 3,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#222", // dark background
      }}>
        <Link to="/admin/dashboard" style={linkStyle("/admin/dashboard")}>Dashboard</Link>
        <Link to="/admin/movies" style={linkStyle("/admin/movies")}>Movies</Link>
        <Link to="/admin/users" style={linkStyle("/admin/users")}>Users</Link>

        <Box sx={{ flexGrow: 1 }} /> {/* push logout button to bottom */}
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4, bgcolor: "dark" }}>
        <Outlet />
      </Box>
    </Box>
  );
}