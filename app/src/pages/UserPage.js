// ./page/UserPage.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import {
  likeSong,
  followArtist,
  fetchSongs,
  fetchArtists,
} from "../redux/user/userActionCreators";

import {
  getUser,
  getAllSongs,
  getAllArtists,
} from "../redux/user/userSelectors";

const UserPage = () => {
  const store = useStore();
  console.log(store.getState());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const allSongs = useSelector(getAllSongs);
  const allArtists = useSelector(getAllArtists);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSongs(currentPage, itemsPerPage));
      await dispatch(fetchArtists(currentPage, itemsPerPage));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, currentPage]);

  const handleLikeSong = (songId) => {
    dispatch(likeSong(user.user.id, songId));
  };

  const handleFollowArtist = (artistId) => {
    console.log("id", user.user.user.id);
    dispatch(followArtist(user.user.user.id, artistId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/usersprofile/${user.id}`);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <div className="userpage_container">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>Welcome, {user.name}!</h1>
          <div className="user_content">
            <h2>All Artists:</h2>
            <div className="artists_section">
              {allArtists &&
                allArtists.map((user) => (
                  <div key={user.id}>
                    <h3>{user.name}</h3>
                    <button onClick={() => handleFollowArtist(user.id)}>
                      Follow
                    </button>
                  </div>
                ))}
            </div>
            <h2>All Songs:</h2>
            <div className="songs_section">
              {allSongs &&
                allSongs.map((song) => (
                  <div key={song.id}>
                    <h3>{song.title}</h3>
                    <button onClick={() => handleLikeSong(song.id)}>
                      Like
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Profiles
          </button>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={() => handlePageChange(1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
