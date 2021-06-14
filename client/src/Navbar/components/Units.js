import React from 'react';
import useData from '../../hooks/useData';

const Units = () => {
  const { setCallInfo } = useData();

  const handleClick = (unit) => {
    setCallInfo((prevState) => {
      return { ...prevState, unit };
    });
  };

  return (
    <div>
      <button onClick={() => handleClick('metric')}>&deg;C</button>
      <button onClick={() => handleClick('imperial')}>&deg;F</button>
      <button onClick={() => handleClick('standard')}>&deg;K</button>
    </div>
  );
};

export default Units;
