import { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

export default function Dashboard() {
  const [stats, setStats] = useState({ movies: 0, users: 0 });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const fetchStats = async () => {
      try {
        const moviesRes = await fetch("http://localhost:8800/admin/movies", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const moviesData = await moviesRes.json();

        const usersRes = await fetch("http://localhost:8800/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const usersData = await usersRes.json();

        setStats({ movies: moviesData.length, users: usersData.length });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={3}>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Movies</Typography>
            <Typography variant="h3">{stats.movies}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">{stats.users}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}