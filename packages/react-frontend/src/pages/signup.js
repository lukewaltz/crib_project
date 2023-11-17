import React, {useState} from "react";
import UserForm from "../components/UserForm";
import "./signup.css";
import Logo from "../logo-group.png"
import Arrow from "./arrow.svg"
 

const Signup = () => {
    const [users, setUsers] = useState([]);

    // function removeOneUser (index) {
	//     const updated = users.filter((user, i) => {
	//         return i !== index
	//     });
	//   setUsers(updated);
	// }
  
  const connection_URL = "https://crib-app.azurewebsites.net";
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
        // .catch((error) => {console.log(error);})
        // .then(setUsers([...users, user]));
    }

    return (
      <div className="sign-up">
          <div className="div">
              <div className="overlap">
                  <div className="overlap-group">
                      <div className="rectangle" />
                      <div className="group">
                          <img className="logo-group" alt="Logo group" src={Logo}/>
                      </div>
                  </div>
                  <div className="text-wrapper">SIGN UP</div>
              </div>
              <div className="overlap-2">
                  <div className="overlap-3">
                      <div className="rectangle" />
                      <div className="text-wrapper-2">CREATE PASSWORD</div>
                      <div className="rectangle-2" />
                      <p className="p">already have an account? log in here!</p>
                      <div className="ellipse" />
                      <img className="vector" alt="Vector" src={Arrow} />
                  </div>
                  <div className="text-wrapper-3">CREATE USERNAME</div>
                  <div className="rectangle-3" />
              </div>
              <div className="overlap-group-2">
                  <div className="text-wrapper-4">ENTER NAME</div>
                  <div className="rectangle-4" />
              </div>
          </div>
      </div>
  );
};
 
export default Signup;




