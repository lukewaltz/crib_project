
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

    return (
        <div className="container">
            <h1>
                log in
            </h1>
        <UserForm />
        </div>
    );
};
 
export default Login;