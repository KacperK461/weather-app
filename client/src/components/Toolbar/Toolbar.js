import React, { useState } from 'react';
// import Navbar from '../components/Navbar/Navbar';
import PlaceAutocomplete from '../PlaceAutocomplete/PlaceAutocomplete';
import Units from '../Units/Units';
import useData from '../../hooks/useData';
import './Toolbar.scss';

function Toolbar() {
  const { callInfo } = useData();
  const [toggle, setToggle] = useState(false);

  return (
    <header className='toolbar'>
      <h1 className='title'>{callInfo && callInfo.address}</h1>
      <nav
        className={`toolbar__navigation  ${
          toggle ? 'toolbar__navigation--open' : ''
        }`}>
        <ul>
          <li>
            <PlaceAutocomplete />
          </li>
          <li>
            <Units />
          </li>
        </ul>
        <button
          className='toolbar__navigation-toggler'
          onClick={() => setToggle((prevState) => !prevState)}>
          <div
            className={`toolbar__navigation-toggler__burger ${
              toggle ? 'toolbar__navigation-toggler__burger--open' : ''
            }`}></div>
        </button>
      </nav>
    </header>
  );
}

export default Toolbar;
