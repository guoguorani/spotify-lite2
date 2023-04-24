// ./pages/ArtistPage.js

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ArtistPage = ({ userId }) => {
  const user = useSelector((state) => state.user.user.user);

  if (!user || user.role !== 'artist' || user.id !== userId) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Artist Page</h1>
      <p>View your list of followers here</p>
      <p>Upload new songs here</p>
      <p>Edit and delete your existing songs here</p>
    </div>
  );
};

export default ArtistPage;

