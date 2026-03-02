import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; //  useTheme import
import { useApp } from "../AppProvider";

export default function AdminLogin() {
  const { setIsLoggedIn } = useApp();
  const navigate = useNavigate();
  const theme = useTheme(); // 🔹 get current theme

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => setFocus("email"), [setFocus]);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8800/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setSnackbarMessage(
          result.message || "Account does not exist or wrong credentials"
        );
        setSnackbarOpen(true);
        return;
      }

      // Login success
      if (result.token) {
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      console.error("Network or server error:", err);
      setSnackbarMessage("Network error. Please try again later.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f5f5f5"
            : theme.palette.background.default, // dynamic background
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper, // dynamic form background
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.email}>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              type="email"
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.password}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type="password"
              label="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>

          <Button fullWidth variant="contained" type="submit" size="large">
            Login
          </Button>
        </form>

        {/* Register link */}
        <Typography
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: 14,
            color: theme.palette.mode === "light" ? "#555" : "#ddd",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
            }}
          >
            Register
          </Link>
        </Typography>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}