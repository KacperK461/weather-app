import React from 'react';
import './Navbar.scss';

const Navbar = ({ children }) => {
  return (
    <nav>
      <ul>
        {children.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
