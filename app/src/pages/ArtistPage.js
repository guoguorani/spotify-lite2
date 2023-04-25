// ./pages/ArtistPage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFollowing,
  fetchCreatedSongs,
  addSong,
  updateSong,
} from './redux/artist/artistActionCreators';

const ArtistPage = () => {
  const dispatch = useDispatch();
  const following = useSelector((state) => state.artist.following);
  const createdSongs = useSelector((state) => state.artist.createdSongs);
  const token = 'your_token_here'; // Replace with the actual token

  useEffect(() => {
    dispatch(fetchFollowing(token));
    dispatch(fetchCreatedSongs(token));
  }, [dispatch, token]);

  const handleAddSong = (event) => {
    event.preventDefault();
    const songData = {
      title: event.target.title.value,
      artist: event.target.artist.value,
      // ... other fields
    };
    dispatch(addSong(songData, token));
  };

  const handleUpdateSong = (event, id) => {
    event.preventDefault();
    const updatedSongData = {
      title: event.target.title.value,
      artist: event.target.artist.value,
      // ... other fields
    };
    dispatch(updateSong(updatedSongData, id, token));
  };

  return (
    <div>
      <h1>Artist Dashboard</h1>
      <h2>Following</h2>
      <ul>
        {following.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <h2>Created Songs</h2>
      <ul>
        {createdSongs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
      <h2>Add Song</h2>
      <form onSubmit={handleAddSong}>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Artist:
          <input type="text" name="artist" />
        </label>
        {/* Add other fields as needed */}
        <button type="submit">Add Song</button>
      </form>
      <h2>Update Song</h2>
      {/* Replace 'song_id' with the actual ID of the song you want to update */}
      <form onSubmit={(event) => handleUpdateSong(event, 'song_id')}>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Artist:
          <input type="text" name="artist" />
        </label>
        {/* Add other fields as needed */}
        <button type="submit">Update Song</button>
      </form>
    </div>
  );
};

export default ArtistPage;

