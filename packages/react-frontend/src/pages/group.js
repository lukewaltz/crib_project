import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroupCodeForm from "../components/GroupCodeForm";
import GroupNameForm from "../components/GroupNameForm.js";
import { useNavigate } from 'react-router-dom';

const Group = () => {
  const connection_URL = "http://localhost:8000";
  const navigate = useNavigate();

//   async function checkLogin(){
//     fetch(`${connection_URL}/isLoggedIn`, {
//         method: 'GET',
//         credentials: 'include',
//     })
//     .then((response) => {
//         if(response.status !== 200){
//             navigate('/account/');
//         }
//     });
    
//     }
//     useEffect(() => {
//         checkLogin();
//     }, []);

  async function handleGroupCodeSubmit(groupCode) {
    try {

      fetch(`${connection_URL}/join-group`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: groupCode,
        }),
      }).then((response) =>{
        if(response.status === 201){
            navigate('/home');
        }
      }).catch((error) => {
        console.error(error);
      });
    } 
    catch (error) {
      console.error("Error joining group:", error);
    }
  }

function handleGroupNameSubmit(groupName) {
    // navigate('/home');
      fetch(`${connection_URL}/group`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
        }),
      }).then((e) => {
        console.log("wait");
        if (e.status === 201) {
            console.log("Group created");
            navigate('/home');
          } 
          else {
            const errorMessage = e.text();
            console.error(`Error creating group: ${errorMessage}`);
          }
      });

  }

  return (
    <div className="container">
    
      <h2>Enter Group Code:</h2>
      <GroupCodeForm handleSubmit={handleGroupCodeSubmit} />
      <h3>Don't Have a Group Code? Make a new Group:</h3>
      <GroupNameForm handleSubmit={handleGroupNameSubmit}/>
    </div>
  );
};

export default Group;
