import React, { useState } from "react";
import UserForm from "../components/UserForm";
 
const Login = () => {

    // function postUser(user){
    //     const promise = fetch("http://crib-app.azurewebsites.net/users", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(user),
    //     })
    //     //console.log("in postUser")
    //         .then((res) => (res.status === 201 ? res.json() : undefined))
    //         .then((json) => {
    //             if (json) {
    //                 console.log(json);
    //                 setCharacters([...characters, json]);
    //                 console.log(characters);
    //             }
    //         });
    //     return promise;
    // }
    const [users, setUsers] = useState([]);

    // function removeOneUser (index) {
	//     const updated = users.filter((user, i) => {
	//         return i !== index
	//     });
	//   setUsers(updated);
	// }

  const connection_URL = "http://crib-app.azurewebsites.net";
  // const connection_URL = "http://localhost:8000"


// USER OPERATIONS

  // post user
  function postUser(user){
    const userData = { user: user};
    console.log(userData);

    fetch(`${connection_URL}/users`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify(userData),
    })
    .then((response) => {
      if (response.status === 201) {
        // Task added successfully
        console.log('User added successfully');
        return response.json();
      } else if (response.status === 500) {
        // Could not add task, handle as needed
        console.log('Could not add user');
        throw new Error('Could not add user');
      } else {
        // Handle other responses as needed
        throw new Error('User could not be added');
      }
    })
    .then((user) => {
      // Update your component state with the added task
      setUsers([...users, user]);
    })
    .catch((error) => {
      console.error(error);
      // Handle error
    });
  }

    function updateList(user) {
        postUser(user)
          .catch((error) => {console.log(error);})
          .then(setUsers([...users, user]));
      }

    return (
        <div className="container">
          <UserForm handleSubmit={updateList} />
          <h2>Log In</h2>
            <h1>
                Welcome Back!
            </h1>
        <UserForm handleSubmit={updateList} />
        </div>
    );
};
 
export default Login;