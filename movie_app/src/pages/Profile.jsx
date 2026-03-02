import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Avatar, Stack } from "@mui/material";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await fetch("http://localhost:8800/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // token invalid or user not found
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // optional, if you saved it
    navigate("/"); // redirect to login page
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Avatar sx={{ width: 80, height: 80 }}>
          {user.name ? user.name[0].toUpperCase() : "U"}
        </Avatar>

        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1" color="text.secondary">
          @{user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>

        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2, width: "100%" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}