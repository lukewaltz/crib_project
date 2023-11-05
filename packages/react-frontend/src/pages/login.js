import React, { useState } from "react";
import UserForm from "../components/UserForm";
 
const Login = () => {

    const [users, setUsers] = useState([]);

    function removeOneUser (index) {
	    const updated = users.filter((user, i) => {
	        return i !== index
	    });
	  setUsers(updated);
	}


  function postUser(user){
    const userData = { user: user};

    fetch("http://localhost:8000/users", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify(userData),
    })
    .then((response) => {
      if (response.status === 201) {
        console.log('User added successfully');
        return response.json();
      } else if (response.status === 500) {
        console.log('Could not add user');
        throw new Error('Could not add user');
      } else {
        throw new Error('User could not be added');
      }
    })
    .then((user) => {
      setUsers([...users, user]);
    })
    .catch((error) => {
      console.error(error);
    });
  }

    function updateList(user) {
        postUser(user)
          .catch((error) => {console.log(error);})
          .then(setUsers([...users, user]));
      }

    return (
        <div className="container">
            <h1>
                log in
            </h1>
        <UserForm handleSubmit={updateList} />
        </div>
    );
};
 
export default Login;