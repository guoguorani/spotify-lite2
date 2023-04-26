// ./pages/ProfilePage.js

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArtistPage from "./ArtistPage";
import UserPage from "./UserPage";
import "./styles.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const isArtist = user.user.role === "artist";

  return isArtist ? (
    <ArtistPage userId={user.user.id} />
  ) : (
    <UserPage userId={user.user.id} />
  );
};

export default ProfilePage;
