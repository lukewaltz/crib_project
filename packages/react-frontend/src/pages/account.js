import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import "./account.css";

const Account = () => {
    const connection_URL = "http://localhost:8000"
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[group, setGroupInfo] = useState([]);
    const[members, setMembers] = useState([]);
    const [buttonDisabledMap, setButtonDisabledMap] = useState({});

    useEffect(() =>{
        checkLogin();
        getGroup();
    }, []);

    async function getGroup(){
        fetch(`${connection_URL}/groupInfo`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => {
            if(response.status === 200){
                
                response.json().then((data) =>{
                    setGroupInfo(data);
                    setMembers(data.members);
                })
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

    //remove from group
    async function removeUser(username){
        try {
            setButtonDisabledMap((prevMap) => ({ ...prevMap, [username]: true }));
            fetch(`${connection_URL}/group`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username}),
            }).then((response) =>{
                if(response.status === 401){
                    logout();
                }else{
                    setButtonDisabledMap((prevMap) => {
                        const { [username]: removed, ...newMap } = prevMap;
                        return newMap;
                    });

                    // Refresh the page
                    window.location.reload();

                    return true;
                }
            });
        } catch (error) {
            console.error('Error removing user:', error);
        }
    }

    function Members(){
        if (!members || members.length === 0) {
            return <p>No members in the group.</p>;
        }
        const boxes = members.map((box, index) =>{
            return(
                <div className="memberBox" key = {box.username}>
                    {index ===0 ?<p>ADMIN:</p> : <p>Members in Group:</p>}
                    <p>{box.name}</p>
                    
                    {group.isOwner  && index !== 0 ? <button onClick={() => removeUser(box.username)} disabled={buttonDisabledMap[box.username]}>
                        Remove user from group?
                        </button> : null}
                </div>
            );
        });
        return(
            <div>
                
                {boxes}
            </div>
        );
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
                            <p>Group code: {group.code} </p>
                            <p>Group name: {group.name}</p>
                            <Members/>
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