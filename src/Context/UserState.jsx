import React, { useEffect, useState } from "react";
import UserContext from "./userContext";

function UserState(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5000/get_users";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
