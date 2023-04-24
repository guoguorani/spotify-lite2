import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, followArtist, likeSong } from '../redux/user/userReducer';

const UserPage = ({ userId }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.user);

  const [newEmail, setNewEmail] = useState(user ? user.email : '');
  const [newPassword, setNewPassword] = useState('');

  if (!user || user.role !== 'user' || user.id !== userId) {
    return <div>Access denied</div>;
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(userId, { email: newEmail, password: newPassword }));
  };

  const handleFollowArtist = (artistId) => {
    dispatch(followArtist(userId, artistId));
  };

  const handleLikeSong = (songId) => {
    dispatch(likeSong(userId, songId));
  };

  return (
    <div>
      <h1>User Page</h1>
      <p>Follow artists here</p>
      <p>Like a new song here</p>
      <p>Update your profile information here</p>
      <h2>Update Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label htmlFor="newEmail">Email:</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserPage;

