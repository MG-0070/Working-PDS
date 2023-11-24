import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "../Css/navbar.module.css";
import { Menu } from "@mui/icons-material";
import Logo from "../Img/FCI-Logo.svg";

function NavBar() {
  const logout = () => {
    localStorage.setItem("username", "");
    window.location.href = "/";
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, height: "8vh" }}>
        <AppBar
          elevation={0}
          position="fixed"
          sx={{ backgroundColor: "white" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: 5, mr: 20, mt: 1, color: "black" }}
            >
              <img src={Logo} alt="logo" style={{ width: 60, height: 60 }} />
            </Typography>
            <div
              style={{
                flexGrow: 1,
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="blue"
                aria-label="menu"
              >
                <Menu />
              </IconButton>
              <h2 style={{ color: "#5E35B1", marginLeft: 100 }}>PUNJAB</h2>
            </div>
            <Button color="primary" variant="contained" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
