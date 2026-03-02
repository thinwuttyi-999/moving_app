import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useApp } from "../AppProvider";

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearch } = useApp(); 

  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    setSearch(query);

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8800/movies/search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, setSearch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Search Results for "{query}"
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : movies.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id} sx={{ width: 250 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={movie.poster}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">{movie.type}</Typography>
                  {movie.country && (
                    <Typography variant="body2" color="text.secondary">
                      {movie.country.countryName}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No results found.</Typography>
      )}
    </Box>
  );
}