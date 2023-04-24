// ./page/UserPage.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  likeSong,
  followArtist,
  fetchSongs,
  fetchArtists,
} from '../redux/user/userActionCreators';
import { getUser, getAllSongs, getAllArtists } from '../redux/user/userSelectors';

const UserPage = () => {

  const store = useStore();
  console.log(store.getState());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const allSongs = useSelector(getAllSongs);
  const allArtists = useSelector(getAllArtists);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSongs());
      await dispatch(fetchArtists());
      setLoading(false);
    };
  
    fetchData();
  }, [dispatch]);

  const handleLikeSong = (songId) => {
    dispatch(likeSong(user.user.id, songId));
  };

  const handleFollowArtist = (artistId) => {
    console.log('id',user.user.user.id)
    dispatch(followArtist(user.user.user.id, artistId));
  };

  const handleSubmit = event => {
    event.preventDefault();
    navigate(`/usersprofile/${user.id}`);
  };
  
  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>Welcome, {user.name}!</h1>
          <h2>All Artists:</h2>
          {allArtists &&
              allArtists.map((user) => (
                <div key={user.id}>
                  <h3>{user.name}</h3>
                  <button onClick={() => handleFollowArtist(user.id)}>Follow</button>
                </div>
              ))
          }
          <h2>All Songs:</h2>
          {allSongs &&
              allSongs.map((song) => (
                <div key={song.id}>
                  <h3>{song.title}</h3>
                  <button onClick={() => handleLikeSong(song.id)}>Like</button>
                </div>
              ))
          }
          <button type="submit" onClick={handleSubmit}>Profiles</button>
        </>
      )}
    </div>
  );
};

export default UserPage;
