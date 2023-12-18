import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import UserState from "./Context/UserState";
import Main2 from "./Components/Main2";
import Main from "./Components/Main";
import Error from "./Components/Error";



function App() {
  return (
    <div className="App">
      <UserState>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Home />}>
            <Route exact path="" element={<Main />} />
            <Route exact path="home" element={<Main2 />} />
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </UserState>
    </div>
  );
}

export default App;
