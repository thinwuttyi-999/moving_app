import { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

export default function MovieForm({ fetchMovies, editing, setEditing }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("MOVIE");
  const [poster, setPoster] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setType(editing.type || "MOVIE");
      setPoster(editing.poster || "");
      setCountry(editing.country?.countryName || "");
      setDescription(editing.detail?.description || "");
      setVideoUrl(editing.detail?.videoUrl || "");
      setDownloadLink(editing.detail?.downloadLink || "");
    }
  }, [editing]);

  const handleSubmit = async () => {
    const payload = { title, type, poster, countryName: country, description, videoUrl, downloadLink };

    try {
      if (editing) {
        await fetch(`http://localhost:8800/admin/movies/${editing.id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("http://localhost:8800/admin/movies", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify(payload),
        });
      }

      // Reset form
      setEditing(null);
      setTitle(""); setType("MOVIE"); setPoster(""); setCountry("");
      setDescription(""); setVideoUrl(""); setDownloadLink("");

      fetchMovies();
    } catch (err) {
      console.error("Failed to save movie:", err);
    }
  };

  return (
    <Box sx={{ mb:2, display: "flex", gap:1, flexWrap:"wrap" }}>
      <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <TextField label="Type" select value={type} onChange={e => setType(e.target.value)}>
        {["MOVIE","SERIES","GL","BL"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
      </TextField>
      <TextField label="Poster URL" value={poster} onChange={e => setPoster(e.target.value)} />
      <TextField label="Country" value={country} onChange={e => setCountry(e.target.value)} />
      <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <TextField label="Video URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
      <TextField label="Download Link" value={downloadLink} onChange={e => setDownloadLink(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>{editing ? "Update" : "Add"}</Button>
    </Box>
  );
}