import React, { useContext, useEffect, useState } from "react";
import styles from "../Css/login.module.css";
import logo from "../Img/logo.jpeg";
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
      window.location.href = "/home";
    } else {
      alert("Invalid Credentials");
      loadCaptchaEnginge(5);
      setCaptcha("");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <img src={logo} style={{ height: "35vh ", width: "15vw" }} />
        <div style={{ margin: "10px" }}>Welcome Please login</div>
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

          <LoadCanvasTemplate style={{ borderRadius: "10px !important" }} />
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
          <Button
            // disabled={username.length === 0 || password.length === 0}
            variant="contained"
            onClick={login}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
