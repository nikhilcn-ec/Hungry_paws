import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="navbar-item">
          <Link to="/order">Order</Link>
        </li>
        <li className="navbar-item">
          <Link to="/service">Service</Link>
        </li>
        <li className="navbar-item">
          <Link to="/feedback">Feedback</Link>
        </li>
        <li className="navbar-item">
          <Link to="/setting">Setting</Link>
        </li>
        <li className="navbar-item">
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;