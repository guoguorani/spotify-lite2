// ./pages/ArtistPage.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCreatedSongs,
  addSong,
  editSong,
  deleteSong,
} from "../redux/artist/artistActionCreators";
import "./styles.css";

const ArtistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const state = useSelector((state) => state);
  const createdSongs = useSelector((state) => state.artist.createdSongs.songs);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchCreatedSongs());
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleAddSong = async (event) => {
    event.preventDefault();
    const songData = {
      title: event.target.title.value,
      url: event.target.url.value,
    };
    console.log(songData);
    await dispatch(addSong(songData));
    dispatch(fetchCreatedSongs());
  };

  const handleUpdateSong = async (id) => {
    const songData = {
      title: prompt("Enter the updated song title:"),
      url: prompt("Enter the updated song URL:"),
    };
    await dispatch(editSong(songData, id));
    dispatch(fetchCreatedSongs());
  };

  const handleDeleteSong = async (id) => {
    await dispatch(deleteSong(id));
    dispatch(fetchCreatedSongs());
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  // const checkInfo = () => {
  //   console.log(createdSongs, state);
  // };

  return (
    <div className="artistpage_container">
      {/* <button onClick={checkInfo}>Check</button> */}
      <h1>Artist Dashboard</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Created Songs</h2>
          <ul>
            {createdSongs.map((song) => (
              <li key={song.id}>
                {song.title}
                <button onClick={() => handleUpdateSong(song.id)}>Edit</button>
                <button onClick={() => handleDeleteSong(song.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <h2>Add Song</h2>
          <form onSubmit={handleAddSong}>
            <label>
              Title:
              <input type="text" name="title" />
            </label>
            <label>
              URL:
              <input type="text" name="url" />
            </label>
            <button type="submit">Add Song</button>
          </form>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default ArtistPage;
