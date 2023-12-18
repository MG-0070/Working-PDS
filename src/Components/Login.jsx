import React, { useContext, useEffect, useState } from "react";
import styles from "../Css/login.module.css";
// import logo from "../Img/logo.jpeg";
import userContext from "../Context/userContext";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{
        color: "white",
        fontWeight: "bold",
        display: "flex",
        marginBottom: "120px",
      }}
    >
      <center>
        <p>
          <b>Date and Time</b>
          {currentDateTime.toLocaleString()}
        </p>
      </center>
    </div>
  );
}

function Login() {
  const [captcha, setCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { users } = useContext(userContext);

  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);

  const handleTogglePasswordVisibility = () => setShowPassword((show) => !show);

  const login = () => {
    const userMatch = users.find(
      (user) => user.name === username && user.password === password
    );
    if (validateCaptcha(captcha) === true && userMatch) {
      localStorage.setItem("username", username);
      setCaptcha("");
      loadCaptchaEnginge(5);
      window.location.href = "/dashboard/home";
    } else {
      alert("Invalid Credentials");
      loadCaptchaEnginge(5);
      setCaptcha("");
    }
  };

  return (
    <div className="shadow-box-dark">
      <div className={styles.login}>
        <div className={`${styles.container} shadow-box`}>
          {/* <img
            src={logo}
            style={{ height: "35vh ", width: "15vw" }}
            alt="Logo"
          /> */}
          <div style={{ margin: "10px", color: "#DD6F35", fontWeight: "bold" }}>
            <h1>Welcome, Please login</h1>
          </div>
          <div variant="outlined" className={styles.form}>
            <TextField
              sx={{ background: "white", borderRadius: "5px" }}
              id="username"
              placeholder="Username"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />

            <FormControl variant="outlined" className="inputField">
              <TextField
                sx={{ background: "white", borderRadius: "5px" }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                variant="outlined"
                size="small"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={password.length < 0}
              />
            </FormControl>

            <LoadCanvasTemplate
              style={{ borderRadius: "10px !important", color: "red" }}
            />
            <TextField
              sx={{ background: "white", borderRadius: "5px" }}
              placeholder="Enter Captcha Value"
              variant="outlined"
              id="user_captcha_input"
              name="user_captcha_input"
              type="text"
              size="small"
              value={captcha}
              onChange={(e) => {
                setCaptcha(e.target.value);
              }}
            />
            <Button variant="contained" onClick={login}>
              Login
            </Button>
          </div>
          <center style={{ color: "aqua", marginTop: "12px" }}>
            {" "}
            <h3> Developed By Public Systems Lab, IIT Delhi. </h3>{" "}
          </center>
          <DateTimeDisplay />
        </div>
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "12px",
            color: "gray",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Login;
