// src/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import AppDrawer from "./components/AppDrawer";
import { useApp } from "./AppProvider";

export default function Layout() {
  const { mode, setMode, openDrawer, setOpenDrawer, isLoggedIn, setIsLoggedIn, search, setSearch } = useApp();

  return (
    <>
      <Header
        mode={mode}
        setMode={setMode}
        setOpenDrawer={setOpenDrawer}
        search={search}
        setSearch={setSearch}
      />

      <AppDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Outlet /> {/* This renders Home / Login / other pages */}
    </>
  );
}