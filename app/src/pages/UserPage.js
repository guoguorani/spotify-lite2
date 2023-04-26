// ./page/UserPage.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const allSongs = useSelector(getAllSongs) || [];
  const allArtists = useSelector(getAllArtists) || [];
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;
  const [likedSongIds, setLikedSongIds] = useState([]);
  const [followedArtistIds, setFollowedArtistIds] = useState([]);

  const [currentArtistPage, setCurrentArtistPage] = useState(1);
  const [currentSongPage, setCurrentSongPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSongs(currentSongPage, itemsPerPage));
      await dispatch(fetchArtists(currentArtistPage, itemsPerPage));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, currentSongPage, currentArtistPage]);

  const handleAction = (actionType, id, updateStateFunction) => {
    if (actionType === "likeSong") {
      dispatch(likeSong(user.user.id, id));
    } else if (actionType === "followArtist") {
      dispatch(followArtist(user.user.user.id, id));
    }
    updateStateFunction((prevIds) => [...prevIds, id]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/usersprofile/${user.user.user.id}`);
  };

  const handleArtistPageChange = (direction) => {
    setCurrentArtistPage((prevPage) => prevPage + direction);
  };

  const handleSongPageChange = (direction) => {
    setCurrentSongPage((prevPage) => prevPage + direction);
  };

  const totalArtistPages = () => {
    return Math.ceil((allArtists ? allArtists.length : 0) / itemsPerPage);
  };

  const totalSongPages = () => {
    return Math.ceil((allSongs ? allSongs.length : 0) / itemsPerPage);
  };

  const displayedArtists = () => {
    const startIndex = (currentArtistPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allArtists.slice(startIndex, endIndex);
  };

  const displayedSongs = () => {
    const startIndex = (currentSongPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allSongs.slice(startIndex, endIndex);
  };

  return (
    <div className="userpage_container">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>Welcome, {user.user.user.name}!</h1>
          <div className="user_content">
            <h2>All Artists:</h2>
            <div className="artists_section">
            {displayedArtists().map((user) => (
              <div className="artists_cell" key={user.id}>
                <h3>{user.name}</h3>
                <button
                  onClick={() => handleAction("followArtist", user.id, setFollowedArtistIds)}
                  className={
                    followedArtistIds.includes(user.id) ? "clicked" : ""
                  }
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
            <div className="pagination">
              <button
                onClick={() => handleArtistPageChange(-1)}
                disabled={currentArtistPage === 1}
              >
                Previous
              </button>
              <span>Artist Page {currentArtistPage}</span>
              <button
                onClick={() => handleArtistPageChange(1)}
                disabled={currentArtistPage === totalArtistPages()}
              >
                Next
              </button>
            </div>
            <h2>All Songs:</h2>
            <div className="songs_section">
            {displayedSongs().map((song) => (
              <div className="songs_cell" key={song.id}>
                <h3>{song.title}</h3>
                <button
                  onClick={() => handleAction("likeSong", song.id, setLikedSongIds)}
                  className={likedSongIds.includes(song.id) ? "clicked" : ""}
                >
                  Like
                </button>{" "}
              </div>
            ))}
          </div>
          </div>
          <div className="pagination">
            <button
              onClick={() => handleSongPageChange(-1)}
              disabled={currentSongPage === 1}
            >
              Previous
            </button>
            <span>Song Page {currentSongPage}</span>
            <button
              onClick={() => handleSongPageChange(1)}
              disabled={currentSongPage === totalSongPages()}
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
