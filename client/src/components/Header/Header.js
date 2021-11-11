import React, { useState } from 'react';
import useData from '../../hooks/useData';
import { IoSearchOutline } from 'react-icons/io5';
import './Header.scss';

function Header({ toggleNavbar, setToggleNavbar }) {
  const { callProps } = useData();

  return (
    <header className='header'>
      <button
        className='toggler'
        onClick={() => setToggleNavbar((prevState) => !prevState)}>
        <div
          className={toggleNavbar ? 'burger burger--active' : 'burger'}></div>
      </button>

      <h1 className='title'>{callProps?.address}</h1>
      <button className='search'>
        <IoSearchOutline />
      </button>
    </header>
  );
}

export default Header;
