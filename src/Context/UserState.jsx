import React, { useEffect, useState } from "react";
import UserContext from "./userContext";

function UserState(props) {
  const [users, setUsers] = useState([]);

  const [counts, setCounts] = useState({});
  console.log(setCounts);

  const [GraphData , setGraphData] = useState()
  const [selectedOption, setSelectedOption] = useState('Dashboard');
// console.log(selectedOption)
console.log(setSelectedOption);


  console.log(setSelectedOption)
  const addUser = (user) => {
    setUsers([...users, user]);
  };

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
    <UserContext.Provider value={{ users, setUsers, counts , GraphData , setCounts,setGraphData , selectedOption, setSelectedOption ,  addUser}}>
      
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
