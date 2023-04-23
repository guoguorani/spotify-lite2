import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from './redux/reducer/userReducer';
// import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isLoggingIn, loginError, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
  };

  if (isAuthenticated) {
    // Redirect user to home page if authenticated
    return <Link to="/" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {loginError && <div className="error">{loginError}</div>}
    </div>
  );
};

export default Login;
