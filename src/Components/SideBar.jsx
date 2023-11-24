import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Keyboard, BatchPrediction } from "@mui/icons-material";

const useStyles = makeStyles({
  menuItem: {
    "&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
      backgroundColor: "#ede7f6",
      borderRadius: 8,
      fontWeight: "bold",
      color: "#5e35b1",
      margin: 3,
      width: "12vw",
    },
    "&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root:not(.Mui-selected)": {
      "&:hover": {
        backgroundColor: "#ede7f6",
        color: "#5e35b1",
        borderRadius: 8,
        "& $icon": {
          color: "#5e35b1",
          fontSize: "initial",
        },
      },
      "& $icon": {
        color: "initial",
        fontSize: "initial",
      },
    },
  },
  icon: {
    color: "#5e35b1",
    // fontSize: "1.875rem",
  },
});

function SideBar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("Dashboard");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    navigate("/home/main1");
  };

  return (
    <div style={{ position: "fixed", height: "100vh", padding: 20 }}>
      <div style={{ fontWeight: "bold" ,color : "#333333" }}> PDS-DASHBOARD</div>
      <MenuList>
        <MenuItem
          onClick={() => {
            navigate("/home");
            setSelectedOption("Dashboard");
          }}
          selected={selectedOption === "Dashboard"}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon>
            <Keyboard fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            <Typography
              style={{ fontSize: 14, marginLeft: 20 }}
              variant="inherit"
            >
              Dashboard
            </Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/home/main1");
            setSelectedOption("Home");
          }}
          selected={selectedOption === "Home"}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon>
            <BatchPrediction fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            <Typography
              style={{ fontSize: 14, marginLeft: 20 }}
              variant="inherit"
            >
              Home
            </Typography>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default SideBar;
