import React from 'react';
    import { Link } from 'react-router-dom';
    import "../index.css";


const Navbar = () => {

    return (
            <div className="box">
                <div className="group">
                    <Link to="/post" activeStyle>
                        <div className="rectangle" />
                    </Link>

                    <Link to="/home" activeStyle>
                        <div className="div" />
                    </Link>

                    <Link to="/account" activeStyle>
                        <div className="rectangle-2" />
                    </Link>
                </div>
            </div>
    );
    
};

export default Navbar;



