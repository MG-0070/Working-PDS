import React, { useContext } from "react";
import { Box, Grid } from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import UserContext from "../Context/userContext";

function Home() {
  const { selectedOption, setSelectedOption } = useContext(UserContext);

  const savedUsername = localStorage.getItem("username");
  if (savedUsername === "PunjabUser")
    return (
      <Box>
        <Grid container>
          <Grid item xs={12}>
          <NavBar selectedOption={selectedOption} />
          </Grid>
          <Grid item xs={1.8} style={{ backgroundColor: "white" }}>
            <SideBar />
          </Grid>
          <Grid
            item
            xs={10}
            style={{
              backgroundColor: "rgb(238 242 246)",
              borderRadius: "8px 8px 0px 0px",
            }}
          >
            <Outlet />
          </Grid>
          
        </Grid>
      </Box>
    );
  if (savedUsername === "MaharashtraUser") return <div>Maharashtra</div>;
  if (savedUsername === "DelhiUser") return <div>Delhi</div>;
  if (savedUsername === "MPUser") return <div>MP</div>;
  if (savedUsername === "BiharUser") return <div>Bihar</div>;
}

export default Home;






