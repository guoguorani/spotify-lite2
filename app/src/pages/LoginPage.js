// ./pages/LoginPage.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/user/userActionCreators";

// import { loginRequest } from '../redux/user/userActionCreators';

import { useNavigate } from "react-router-dom";
import "./styles.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result && result.payload && !result.payload.error) {
        // Navigate to /profile/:id
        navigate(`/profile/${result.payload.user.id}`);
      }
    });
  };

  return (
    <div className="login_container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
