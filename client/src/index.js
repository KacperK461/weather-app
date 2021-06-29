import React from 'react';
import ReactDOM from 'react-dom';
import { DataProvider } from './context';
import App from './App/App';
import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
