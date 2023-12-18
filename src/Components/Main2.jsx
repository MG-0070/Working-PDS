import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Carousel from "react-material-ui-carousel";
import headerCImage from "../Img/header-c.jpeg";
import headerDImage from "../Img/header-d.jpeg";
import headerHImage from "../Img/header-h.jpeg";
import headerBImage from "../Img/polina-rytova-1dGMs4hhcVA-unsplash.jpg";
import backgroundImage from "../Img/Infographic-BG-removed.png";
import { color } from "@mui/system";
import Footer from "../Components/Footer/Footer";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center top 200px",
  },
  title: {
    flexGrow: 1,
  },
  content: {
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    marginRight: "20px",
  },
  carousel: {
    margin: "20px",
    maxWidth: "800px",
    width: "100%",
  },
  carouselImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
}));

const tutorialSteps = [
  {
    imgPath: headerCImage,
  },
  {
    imgPath: headerDImage,
  },
  {
    imgPath: headerHImage,
  },
  {
    imgPath: headerBImage,
  },
];

function Home() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % tutorialSteps.length);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [clearInterval]);

  const ImageCarousel = () => {
    return (
      <Carousel
        className={classes.carousel}
        timeout={50000}
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {tutorialSteps.map((item, index) => (
          <img
            key={index}
            src={item.imgPath}
            alt={`slide-${index}`}
            className={classes.carouselImage}
          />
        ))}
      </Carousel>
    );
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              Home Page
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.content}>
          <ImageCarousel />
          <h1 style={{ color: "#5E35B1", fontWeight: "bold" }}>
            <b>Supply Chain of Punjab PDS</b>
          </h1>
        </div>
        <div style={{ marginTop: '-250px' }}>
          <Footer />
        </div>

      </div>
    </>
  );
}

export default Home;

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Grid, Typography } from "@material-ui/core";
// import backgroundImage from "../Img/PDS.png";

// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Button from "@mui/material/Button";

// const useStyles = makeStyles((theme) => ({
//   pageContainer: {
//     backgroundColor: "#1976D2",
//     height: "10vh",
//   },
//   pageContent: {
//     backgroundImage: `url(${backgroundImage})`,
//     height: "80vh",
//     backgroundSize: "cover",
//     padding: theme.spacing(2),
//   },
//   logo: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "90%",
//     color: "white",
//     fontSize: "32px",
//   },
//   pageTitle: {
//     fontWeight: "bold",
//   },
//   breadcrumb: {
//     margin: theme.spacing(2, 0),
//     paddingLeft: theme.spacing(2),
//     color: "white",
//     textAlign: 'center',
//   },
// }));

// function Home() {
//   const classes = useStyles();

//   return (
//     <div>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           <center>Home Page</center>
//           </Typography>

//         </Toolbar>
//       </AppBar>

//       <div className={classes.pageContainer}>
//         <div className={classes.pageContent}>
//           <Grid container direction="row" alignItems="center">
//             <Grid item>
//               <a href="#" className="x-navigation-minimize">
//                 <span className="fa fa-dedent" />
//               </a>
//             </Grid>
//           </Grid>

//           <Grid container alignItems="center">
//             <Grid item xs={12} style={{ color: "black" }}>
//               <Typography variant="h3" className={classes.pageTitle}>
//                 <center>Home Page</center>
//               </Typography>
//             </Grid>
//           </Grid>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
