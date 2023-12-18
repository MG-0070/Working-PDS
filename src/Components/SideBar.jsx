import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BatchPrediction, AddHome } from "@mui/icons-material";
import UserContext from "../Context/userContext";
import { useContext } from "react";

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
  const { selectedOption, setSelectedOption } = useContext(UserContext);
  // console.log(selectedOption)

  const handleClick = (option) => {
    setSelectedOption(option);

    if (option === "Home") {
      navigate("/dashboard/home");
    } else if (option === "Dashboard") {
      navigate("/dashboard");
    }
  };

  // useEffect(() => {
  //   console.log("Selected Option:", selectedOption);
  // }, [selectedOption]);

  return (
    <div style={{ position: "relative", height: "180vh", padding: "15px" }}>
      <Typography
        style={{
          fontSize: 17,
          marginLeft: -80,
          fontWeight: "bold",
          color: "#333333",
        }}
        variant="inherit"
      >
        Dashboard PDS
      </Typography>
      <MenuList>
        <MenuItem
          style={{ marginLeft: "2px" }}
          onClick={() => {
            navigate("/dashboard/home");
            setSelectedOption("HomePage");
          }}
          selected={selectedOption === "HomePage"}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon>
          <AddHome fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            <Typography
              style={{
                fontSize: 17,
                marginLeft: -100,
                fontWeight: "bold",
                color: "#333333",
              }}
              variant="inherit"
            >
              Home
            </Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/dashboard");
            setSelectedOption("Punjab Intra Route Optimization For PDS");
          }}
          selected={selectedOption === "Punjab Intra Route Optimization For PDS"}
          classes={{ root: classes.menuItem }}
        >
          <ListItemIcon>
          <BatchPrediction fontSize="small" className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            <Typography
              style={{
                fontSize: 17,
                marginLeft: -75,
                fontWeight: "bold",
                color: "#333333",
              }}
              variant="inherit"
            >
              Dashboard
            </Typography>
          </ListItemText>
        </MenuItem>
      </MenuList>
      {/* <div style={{ marginTop: "20px", fontWeight: "bold", color: "#333333", justifyContent: "center", marginRight: "120px" }}>
        {selectedOption}
      </div> */}
    </div>
  );
}

export default SideBar;

// import React, { useState } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import {
//   ListItemIcon,
//   ListItemText,
//   MenuList,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { Keyboard, BatchPrediction } from "@mui/icons-material";

// const useStyles = makeStyles({
//   menuItem: {
//     "&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected": {
//       backgroundColor: "#ede7f6",
//       borderRadius: 8,
//       fontWeight: "bold",
//       color: "#5e35b1",
//       margin: 3,
//       width: "12vw",
//     },
//     "&.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root:not(.Mui-selected)": {
//       "&:hover": {
//         backgroundColor: "#ede7f6",
//         color: "#5e35b1",
//         borderRadius: 8,
//         "& $icon": {
//           color: "#5e35b1",
//           fontSize: "initial",
//         },
//       },
//       "& $icon": {
//         color: "initial",
//         fontSize: "initial",
//       },
//     },
//   },
//   icon: {
//     color: "#5e35b1",
//   },
// });

// function SideBar() {
//   const classes = useStyles();
//   const navigate = useNavigate();

//   const [selectedOption, setSelectedOption] = useState("Dashboard");

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     // Navigate to the respective route based on the selected option
//     if (option === "Home") {
//       navigate("/home/main1");
//     } else if (option === "Dashboard") {
//       navigate("/home");
//     }
//   };

//   return (
//     <div style={{ position: "fixed", height: "50vh", padding: "15px" }}>
//       <div style={{ fontWeight: "bold", color: "#333333", marginLeft: -35 }}>
//         PDS-DASHBOARD
//       </div>
//       <MenuList>
//         <MenuItem
//           style={{ marginLeft: "2px" }}
//           onClick={() => handleOptionClick("Home")}
//           selected={selectedOption === "Home"}
//           classes={{ root: classes.menuItem }}
//         >
//           <ListItemIcon>
//             <BatchPrediction fontSize="small" className={classes.icon} />
//           </ListItemIcon>
//           <ListItemText>
//             <Typography
//               style={{
//                 fontSize: 14,
//                 marginLeft: -100,
//                 fontWeight: "bold",
//                 color: "#333333",
//               }}
//               variant="inherit"
//             >
//               Home
//             </Typography>
//           </ListItemText>
//         </MenuItem>
//         <MenuItem
//           onClick={() => handleOptionClick("Dashboard")}
//           selected={selectedOption === "Dashboard"}
//           classes={{ root: classes.menuItem }}
//         >
//           <ListItemIcon>
//             <Keyboard fontSize="small" className={classes.icon} />
//           </ListItemIcon>
//           <ListItemText>
//             <Typography
//               style={{
//                 fontSize: 14,
//                 marginLeft: -75,
//                 fontWeight: "bold",
//                 color: "#333333",
//               }}
//               variant="inherit"
//             >
//               Dashboard
//             </Typography>
//           </ListItemText>
//         </MenuItem>
//       </MenuList>

//       {/* Display selected option */}
//       <div style={{ marginTop: "20px", fontWeight: "bold", color: "#333333" }}>
//         Selected Option: {selectedOption}
//       </div>
//     </div>
//   );
// }

// export default SideBar;
