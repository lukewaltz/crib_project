import React, { useState } from "react";
import UserForm from "../components/UserForm";
import "./login.css";
import Logo from "../logo-group.png"
import Arrow from "./arrow.svg"

 
const Login = () => {

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
    console.log(userData);

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
      <div className="login">
          <div className="div">
              <div className="overlap">
                  <div className="background1" />
                  <div className="text-wrapper">WELCOME BACK</div>
                  <div className="logo">
                    <img className="logo-group" alt="Logo group" src={Logo} />
                  </div>
              </div>
              <div className="overlap-group">
                  <div className="overlap-group-2">
                      <div className="background2" />
                      <UserForm handleSubmit={updateList} />
                      <div className="email-text">EMAIL</div>
                      <p className="p">dont have a login? sign up here</p>
                      <div className="ellipse" />
                      <img className="arrow" alt="arrow" src={Arrow} />
                  </div>
                  <div className="password-text">PASSWORD</div>
              </div>
              <div className="username-text">USERNAME</div>
          </div>
      </div>
  );
};
      
{/* <UserForm handleSubmit={updateList} /> */}

 
export default Login;