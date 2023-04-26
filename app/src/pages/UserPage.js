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

  const totalPages = () => {
    const maxCount = Math.max(
      allSongs ? allSongs.length : 0,
      allArtists ? allArtists.length : 0
    );
    return Math.ceil(maxCount / itemsPerPage);
  };

  const displayedArtists = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allArtists.slice(startIndex, endIndex);
  };

  const displayedSongs = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allSongs.slice(startIndex, endIndex);
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
              {displayedArtists().map((user) => (
                <div className="artists_cell" key={user.id}>
                  <h3>{user.name}</h3>
                  <button onClick={() => handleFollowArtist(user.id)}>
                    Follow
                  </button>
                </div>
              ))}
            </div>
            <h2>All Songs:</h2>
            <div className="songs_section">
              {displayedSongs().map((song) => (
                <div className="songs_cell" key={song.id}>
                  <h3>{song.title}</h3>
                  <button onClick={() => handleLikeSong(song.id)}>Like</button>
                </div>
              ))}
            </div>
          </div>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === totalPages()}
            >
              Next
            </button>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Profiles
          </button>
        </>
      )}
    </div>
  );
};

export default UserPage;
