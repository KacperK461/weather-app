import React, { useState } from 'react';
import PlaceAutocomplete from '../PlaceAutocomplete/PlaceAutocomplete';
import Units from '../Units/Units';
// import './index.scss';

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
