import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
 
const Login = () => {
    function loginUser(user){
        // parse input before calling this
        fetch("http://localhost:8000/login",
        {
            method: "POST",
            headers: {
            "Content-Type": "application.json",
            },
            body: JSON.stringify(user),}
        ).then((response) =>{
            if(response.status === 200){
                return response.json();
            } else if(response.status === 401){
                throw new Error("unable to login");
            }else{
                throw new Error(response.status);
            }
        });
    }

    return (
        <div className="container">
            <h2>Log In</h2>
            <LoginForm login={loginUser}/>
        </div>
    );
};
 
export default Login;