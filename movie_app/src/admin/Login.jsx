import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8800/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data); 

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.user.isAdmin) {
        setError("You are not an admin");
        return;
      }

      console.log("Saving token to localStorage:", data.token);
      localStorage.setItem("adminToken", data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <Box sx={{ width: 400, mx: "auto", mt: 20, textAlign: "center" }}>
      <Typography variant="h4" mb={3}>Admin Login</Typography>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email" 
      />
      <TextField
        fullWidth
        label="Password"
        margin="normal"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password" 
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}