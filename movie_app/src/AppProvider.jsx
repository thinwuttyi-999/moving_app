// src/AppProvider.jsx
import { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Routes from "./Routes";

const AppContext = createContext();

export default function AppProvider() {
  const [mode, setMode] = useState("dark");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  
  const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);

  const theme = createTheme({
    palette: { mode },
  });

  return (
    <AppContext.Provider
      value={{ mode, setMode, openDrawer, setOpenDrawer, isLoggedIn, setIsLoggedIn, search, setSearch }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}