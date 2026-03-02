import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8800/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Movie not found");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id, navigate]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!movie) return <Typography>Movie not found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {movie.title}
      </Typography>

      {movie.detail?.videoUrl && (
        <Box sx={{ mt: 3 }}>
          <video width="100%" controls>
            <source src={movie.detail.videoUrl} type="video/mp4" />
          </video>
        </Box>
      )}

      <Typography sx={{ mt: 2 }}>
        Description: {movie.detail?.description}
      </Typography>

      {movie.detail?.downloadLink && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            href={movie.detail.downloadLink}
            download
          >
            Download Full Movie
          </Button>
        </Box>
      )}
    </Box>
  );
}