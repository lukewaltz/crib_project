import React from 'react';
    import { Link } from 'react-router-dom';
    import "../index.css";


const Navbar = () => {
    return (
        <div className='container'>
            <nav>
                <ul class='nav'>
                    <Link to="/post" activeStyle><li>
                        Post
                    </li></Link>

                    <Link to="/home" activeStyle><li>
                        Home
                    </li></Link>

                    <Link to="/account" activeStyle><li>
                        Account
                    </li></Link>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;