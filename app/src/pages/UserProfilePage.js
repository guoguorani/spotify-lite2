// ./page/ProfilePage.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(getUser);
  const likedSongs = useSelector(getLikedSongs);
  const followedArtists = useSelector(getFollowedArtists);
  
  const [formData, setFormData] = useState({
    name: user?.user?.user?.name || "",
    email: user?.user?.user?.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFollowedArtists(id));
      await dispatch(fetchLikedSongs(id));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = () => {
    dispatch(updateProfile(id, formData))
      .then(() => {
        setFormData({ ...formData, password: "" });
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to update profile. Please try again later.");
      });
  };
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
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
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <br />
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <br />
          <button onClick={handleUpdateUser}>Update Profile</button>
          <br />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
  
};

export default UserProfilePage;
