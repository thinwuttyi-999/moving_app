import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { useApp } from "../AppProvider";
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  ArrowBack as BackIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";

export default function Header() {
  const { mode, setMode, setOpenDrawer, search, setSearch } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?query=${encodeURIComponent(search.trim())}`);
  };

  return (
    <AppBar color="primary" position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
       
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isHome ? (
            <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={() => navigate(-1)}>
              <BackIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ ml: 1, whiteSpace: "nowrap", flexShrink: 0 }}>
            Movie App
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 250 }}>
            <Search search={search} setSearch={setSearch} onSubmit={handleSearch} />
          </Box>

          
          <IconButton color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}