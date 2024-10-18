import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
        <div id="logo">
            <img src={logo} alt="logo"></img>
        </div>
        <div className="nav-heading">
          <h1><Link to="/">Tech-tical</Link></h1>
        </div>
        <div className="nav-options">
          <ul type="none" >
            <li></li>
            <li><Link to="/about">About me</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
    </nav>
  );
};

export default Navbar;