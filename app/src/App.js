// // App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchArtists } from './redux/artist/artistActions';
import { fetchUsers } from './redux/user/userActions';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ArtistPage from './pages/ArtistPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();

  // Fetch artists and users on app mount
  React.useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/artist/:id" element={<ArtistPage />} /> */}
        <Route element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

