import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./redux/reducer/userReducer";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { loading, error, profileData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {profileData.name}</p>
      <p>Email: {profileData.email}</p>
    </div>
  );
}
