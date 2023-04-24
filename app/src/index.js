// - A user can register as a regular user or as an artist 
// (provide the same signup information,
// update their backend model to include a role).
// - Artists are limited to the following functionality: 
// view their list of followers, upload new songs,
// edit and delete their existing songs. they cannot like songs, follow other artists, or view/edit their own profile.
// - Users are limited to the following functionality: 
// follow the artists, like a new song, update their profile information

// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import store from './redux/store';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ArtistPage from './pages/ArtistPage';
import UserPage from './pages/UserPage';
import NotFoundPage from './pages/NotFoundPage';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/artists/:id" element={<ArtistPage />} />
          <Route path="/users/:id" element={<UserPage />} />
      <Route element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
</React.StrictMode>
);
