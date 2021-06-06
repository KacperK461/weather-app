import React, { useState } from 'react';
import City from './components/City';
import Units from './components/Units';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <City />
        </li>
        <li>
          <Units />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
