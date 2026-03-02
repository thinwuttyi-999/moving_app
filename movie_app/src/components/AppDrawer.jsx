import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";

import {
  Home as HomeIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { grey, purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function AppDrawer({
  openDrawer,
  setOpenDrawer,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);             
    navigate("/");                    
  };

  return (
    <Drawer
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      onClick={() => setOpenDrawer(false)}
    >
      <Box
        sx={{
          background: isLoggedIn ? purple[500] : grey[500],
          height: 200,
          width: 250,
        }}
      />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <HomeIcon sx={{ mr: 1 }} />
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      {isLoggedIn ? (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/profile")}>
                <ProfileIcon sx={{ mr: 1 }} />
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/register")}>
                <RegisterIcon sx={{ mr: 1 }} />
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/login")}>
                <LoginIcon sx={{ mr: 1 }} />
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Drawer>
  );
}