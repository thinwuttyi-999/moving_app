import { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import MovieForm from "./MovieForm";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem("adminToken");

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:8800/admin/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:8800/admin/movies/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovies(); 
    } catch (err) {
      console.error("Failed to delete movie:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={2}>Movies Management</Typography>
      <MovieForm fetchMovies={fetchMovies} editing={editing} setEditing={setEditing} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.id}</TableCell>
              <TableCell>{m.title}</TableCell>
              <TableCell>{m.type}</TableCell>
              <TableCell>{m.country?.countryName}</TableCell>
              <TableCell>
                <Button onClick={() => setEditing(m)}>Edit</Button>
                <Button color="error" onClick={() => deleteMovie(m.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}