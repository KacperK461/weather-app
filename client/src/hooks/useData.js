import { useContext } from 'react';
import { DataContext } from '../context.js';

const useData = () => {
  return useContext(DataContext);
};

export default useData;
