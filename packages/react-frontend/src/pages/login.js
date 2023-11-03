
import React, { useState } from "react";
import UserForm from "../components/UserForm";
 
const Login = () => {
    // const [characters, setCharacters] = useState([])

    // function postUser(user){
    //     const promise = fetch("http://localhost:8000/users", {
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

    function removeOneUser (index) {
	    const updated = users.filter((user, i) => {
	        return i !== index
	    });
	  setUsers(updated);
	}


// USER OPERATIONS

  // post user
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
            <h1>
                log in
            </h1>
        <UserForm handleSubmit={updateList} />
        </div>
    );
};
 
export default Login;