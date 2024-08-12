import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="https://www.sovereigngroup.com/our-services/">Sovereign Group</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
