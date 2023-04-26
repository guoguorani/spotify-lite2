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
  const [name, setName] = useState(user?.user?.user?.name || "");
  const [email, setEmail] = useState(user?.user?.user?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

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
    dispatch(updateProfile(id, userData))
      .then(() => {
        // Update the state with the new user data
        setName(user?.user?.user?.name || "");
        setEmail(user?.user?.user?.email || "");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to update profile. Please try again later.");
      });
  };
  
  // const handleUpdateUser = () => {
  //   const userData = {
  //     name,
  //     email,
  //     password,
  //   };
  //   console.log(userData)
  //   dispatch(updateProfile(id, userData))
  //     .then(() => {
  //       // Update the state with the new user data
  //       setName(userData.name);
  //       setEmail(userData.email);
  //       setPassword(userData.password);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("Failed to update profile. Please try again later.");
  //     });
  // };
  

  const checkInfo = () => {
    console.log(
      "likedSongs: ",
      likedSongs,
      "followedArtists: ",
      followedArtists,
      "user: ",
      user,
      "id: ",
      id
    );
  };

  return (
    <div className="userprofile_container">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <button onClick={checkInfo}>Check</button>
          <h1>Welcome, {user?.user?.user?.name}!</h1>
          <h2>Your Liked Songs:</h2>
          {likedSongs && likedSongs.length > 0 ? (
            likedSongs.map((song) => (
              <div key={song.id}>
                <h3>{song.title}</h3>
              </div>
            ))
          ) : (
            <p>No liked songs found</p>
          )}
          <h2>Your Followed Artists:</h2>
          {followedArtists && followedArtists.length > 0 ? (
            followedArtists.map((artist) => (
              <div key={artist.id}>
                <h3>{artist.name}</h3>
              </div>
            ))
          ) : (
            <p>No followed artists found</p>
          )}
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
