// New Features
// - A user can register as a regular user or as an artist 
// (provide the same signup information,
// update their backend model to include a role).
// - Artists are limited to the following functionality: 
// view their list of followers, upload new songs,
// edit and delete their existing songs.
// *** For simplicity, they cannot like songs, follow other artists, or view/edit their own profile.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
