import Header from "./components/header";
import AppDrawer from "./components/AppDrawer";
import { Outlet } from "react-router-dom";
import { useApp } from "./AppProvider";

export default function App() {

  const { openDrawer, setOpenDrawer, isLoggedIn, setIsLoggedIn, mode, setMode, search, setSearch } = useApp();
  

  return (
    <div>
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

        <Outlet />
    </div>
  );
}