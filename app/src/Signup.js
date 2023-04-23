// import statements separated by semicolon
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpRequest, signUpSuccess, signUpFailure } from "./redux/reducer/userReducer";
import "./Signup.css";

export default function Signup() {
  // const history = useHistory();
  // console.log(history);
  const dispatch = useDispatch();

  const { isSigningUp } = useSelector((state) => state.signup);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationType, setRegistrationType] = useState("regular");

  const [signupError, setSignupError] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signUpRequest());
    try {
      // Call signup API with username, email, password, and registrationType
      const token = localStorage.getItem("token");
      const response = await fetch("<signup-api-url>", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          registrationType,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        dispatch(signUpSuccess());
        // history.push("/login"); // redirect to login page after successful signup
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError(error.message);
      dispatch(signUpFailure(error.message));
    }
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
        <button type="submit" disabled={isSigningUp}>
          {isSigningUp ? "Signing up..." : "Sign up"}
        </button>
      </form>
      {signUpSuccess && (
        <p>
          Sign up successful! Please check your email to verify your account.
        </p>
      )}
      {signupError && <p>Error: {signupError}</p>}
    </div>
  );
}
