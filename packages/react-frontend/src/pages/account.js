import React from "react";
import { Link } from "react-router-dom";
 
const Account = () => {
    return (
        <div className="container">
            <h1>
                Account
            </h1>
            <nav className="col">
                <ul class='nav'>
                    <Link to='/account/login'><li>Login</li></Link>

                    <Link to='/account/signup'><li>Signup</li></Link>

                    <li>Log Out</li>
                </ul>
            </nav>
        </div>
    );
};
 
export default Account;