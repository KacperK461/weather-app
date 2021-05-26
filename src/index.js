import React from 'react';
import ReactDOM from 'react-dom';
import { DataContext } from 'context';
import App from './App';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <DataContext>
      <App />
    </DataContext>
  </React.StrictMode>,
  document.getElementById('root')
);
