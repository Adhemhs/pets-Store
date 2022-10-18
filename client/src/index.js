import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LogIn from './Login';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
       <LogIn/>
        {/* <App /> */}
  </React.StrictMode>
);

