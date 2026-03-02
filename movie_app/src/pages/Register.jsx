import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { useTheme } from "@mui/material/styles"; 
import { useApp } from "../AppProvider";

export default function Register() {
  const { mode } = useApp(); 
  const theme = useTheme(); 
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => setFocus("name"), [setFocus]);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8800/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setSnackbarMessage(result.message || "Register failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      setSnackbarMessage("Registration successful! Redirecting to login...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Network error. Please try again later.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f5f5f5"
            : theme.palette.background.default, 
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
              : theme.palette.background.paper, 
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.name}>
            <InputLabel>Name</InputLabel>
            <OutlinedInput
              label="Name"
              {...register("name", { required: "Name is required" })}
            />
            <FormHelperText>{errors.name?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.username}>
            <InputLabel>Username</InputLabel>
            <OutlinedInput
              label="Username"
              {...register("username", { required: "Username is required" })}
            />
            <FormHelperText>{errors.username?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.email}>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              label="Email"
              type="email"
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
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth size="large">
            Register
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}