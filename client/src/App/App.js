import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PlaceAutocomplete from '../components/PlaceAutocomplete';
import Units from '../components/Units';
import useData from '../hooks/useData';
import './App.scss';

const App = () => {
  const { callInfo } = useData();

  return (
    <>
      <h2>{callInfo && callInfo.address}</h2>
      <Navbar>
        <PlaceAutocomplete />
        <Units />
      </Navbar>
    </>
  );
};

export default App;
