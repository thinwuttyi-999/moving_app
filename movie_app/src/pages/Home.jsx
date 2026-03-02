import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeValue, setActiveValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("http://localhost:8800/movies");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  const filters = useMemo(() => {
    const seen = new Set();
    const unique = [];

    movies.forEach((movie) => {
      const values = [
        movie.type,
        movie.country?.countryName,
      ];

      values.forEach((val) => {
        if (val && !seen.has(val)) {
          seen.add(val);
          unique.push(val);
        }
      });
    });

    return ["Home", ...unique];
  }, [movies]);

  const filteredItems = useMemo(() => {
    if (!activeValue || activeValue === "Home")
      return [...movies].sort((a, b) => b.id - a.id);

    const lowerActive = activeValue.toLowerCase();

    return movies
      .filter((item) => {
        const typeMatch =
          item.type?.toLowerCase() === lowerActive;

        const countryMatch =
          item.country?.countryName
            ?.toLowerCase() === lowerActive;

        return typeMatch || countryMatch;
      })
      .sort((a, b) => b.id - a.id);
  }, [activeValue, movies]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: { xs: "visible", md: "auto" },
          mb: 4,
          pb: 1,
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        {filters.map((value) => (
          <Button
            key={value}
            variant={activeValue === value ? "contained" : "outlined"}
            onClick={() => {
              setActiveValue(value === "Home" ? "" : value);
              setPage(1);
            }}
          >
            {value}
          </Button>
        ))}
      </Box>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        {activeValue ? activeValue.toUpperCase() : "ALL"}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {paginatedItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              sx={{
                width: 250,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={() => navigate(`/movie/${item.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.poster}
              />
              <CardContent>
                <Typography>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.country?.countryName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
            color="primary"
            siblingCount={0}
            boundaryCount={1}
          />
        </Box>
      )}
    </Box>
  );
}  