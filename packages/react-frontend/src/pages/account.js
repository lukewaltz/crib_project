import React from "react";
import { Link } from "react-router-dom";
 
const Account = () => {
    return (
        <div>
            <h1>
                Account
            </h1>
            <h2>
                Settings
            </h2>
            <Link to='/account/login'><h3>Login</h3></Link>
            <Link to='/account/signup'><h3>Signup</h3></Link>
            <h3>
                Log Out
            </h3>
        </div>
    );
};
 
export default Account;