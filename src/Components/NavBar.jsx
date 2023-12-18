import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import Logo from "../Img/lg.jpg";
import { makeStyles } from "@mui/styles";
import UserContext from "../Context/userContext";

const useStyles = makeStyles({
  logoutButton: {
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});

function NavBar({ handleLogout }) {
  const classes = useStyles();
  const { selectedOption } = useContext(UserContext);

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
              <img src={Logo} alt="logo" style={{ width: 70, height: 62 }} />
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="blue"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <div
              style={{
                flexGrow: 1,
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  ml: 2,
                  color: "blue",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "100px",
                }}
              >
                {selectedOption}
              </Typography>
            </div>
            <Button
              variant="contained"
              color="error"
              className={classes.logoutButton}
              onClick={handleLogout || logout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
