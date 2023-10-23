import React from 'react';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Tasks</a></li>
                <li><a href="/post">Post</a></li>
                <li><a href="/polls">Polls</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;