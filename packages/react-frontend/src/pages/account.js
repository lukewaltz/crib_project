import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./account.css";

const Account = () => {
    const connection_URL = "http://localhost:8000"
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[code, setCode] = useState("");
    useEffect(() =>{
        checkLogin();
        getCode();
    });

    async function getCode(){
        fetch(`${connection_URL}/code`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => {
            if(response.status === 200){
                setCode(response.json());
            }else{
                setIsLoggedIn(false);
            }
        });
    }
    async function checkLogin(){
        fetch(`${connection_URL}/isLoggedIn`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => {
            if(response.status === 200){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        });
    }

    async function logout(){
        const promise = fetch(`${connection_URL}/logout`, {
            method: 'GET',
            credentials: 'include',
        }).then(setIsLoggedIn(false));
        return promise;
    }
    

    return (
        <div className="account">
            {isLoggedIn 
            ? <h1 className="title-text">Account</h1> 
            : <h1 className="title-text">Welcome to Crib!</h1>}
            <nav className="col">
                <ul className='nav'>
                    {isLoggedIn 
                        ? <>
                            <li><button className="button" onClick={logout}>Log Out</button></li>
                            <p>Group code: </p>
                        </>
                        : <>
                            <li><Link className="button" to='/account/login'>Login</Link></li>
                            <li><Link className="button" to='/account/signup'>Signup</Link></li>
                          </>
                    }
                </ul>
            </nav>
        </div>
    );   
};
 
export default Account;