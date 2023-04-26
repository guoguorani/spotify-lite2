// ./page/ProfilePage.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  updateProfile,
  fetchFollowedArtists,
  fetchLikedSongs,
} from "../redux/user/userActionCreators";
import {
  getUser,
  getLikedSongs,
  getFollowedArtists,
} from "../redux/user/userSelectors";
import "./styles.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(getUser);
  const likedSongs = useSelector(getLikedSongs);
  const followedArtists = useSelector(getFollowedArtists);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(user, id);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFollowedArtists(id));
      await dispatch(fetchLikedSongs(id));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUpdateUser = () => {
    const userData = {
      name,
      email,
      password,
    };
    dispatch(updateProfile(userData));
  };

  return (
    <div className="userprofile_container">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>Welcome, {user.name}!</h1>
          <h2>Your Liked Songs:</h2>
          {likedSongs &&
            likedSongs.map((song) => (
              <div key={song.id}>
                <h3>{song.title}</h3>
              </div>
            ))}
          <h2>Your Followed Artists:</h2>
          {followedArtists &&
            followedArtists.map((artist) => (
              <div key={artist.id}>
                <h3>{artist.name}</h3>
              </div>
            ))}
          <h2>Update Profile:</h2>
          <label>Name: </label>
          <input type="text" value={name} onChange={handleNameChange} />
          <br />
          <label>Email: </label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <br />
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button onClick={handleUpdateUser}>Update Profile</button>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
