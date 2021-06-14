import React, { useState } from 'react';
import PlaceAutocomplete from './components/PlaceAutocomplete';
import Units from './components/Units';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <PlaceAutocomplete />
        </li>
        <li>
          <Units />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
