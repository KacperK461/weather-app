import React, { useState } from 'react';
import Header from '../components/Header/Header';
import './App.scss';

const App = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  return (
    <>
      <Header toggleNavbar={toggleNavbar} setToggleNavbar={setToggleNavbar} />
    </>
  );
};

export default App;
