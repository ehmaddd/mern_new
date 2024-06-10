import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/insert">Insert Student</Link></li>
        <li><Link to="/search">Search Student</Link></li>
        <li><Link to="/update">Update Student</Link></li>
        <li><Link to="/delete">Delete Student</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
