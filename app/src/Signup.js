import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationType, setRegistrationType] = useState("regular");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegistrationTypeChange = (event) => {
    setRegistrationType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call signup API with username, email, password, and registrationType
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("Registration Type: ", registrationType);
  };

  return (
    <div className="signup-container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="username-input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="email-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="password-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="registration-type-input">
          <label>Registration Type:</label>
          <div>
            <input
              type="radio"
              id="regular"
              name="registrationType"
              value="regular"
              checked={registrationType === "regular"}
              onChange={handleRegistrationTypeChange}
            />
            <label htmlFor="regular">Regular</label>
          </div>
          <div>
            <input
              type="radio"
              id="artist"
              name="registrationType"
              value="artist"
              checked={registrationType === "artist"}
              onChange={handleRegistrationTypeChange}
            />
            <label htmlFor="artist">Artist</label>
          </div>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
