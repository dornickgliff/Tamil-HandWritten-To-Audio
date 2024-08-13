import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd'; // Assuming you're using Ant Design for message component
import './css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);

  const handleLogin = async () => {
    // Resetting errors
    setUsernameError(false);

    // Check if username and password are not empty
    if (!username.trim() || !password.trim()) {
      message.error('Please enter both username and password.');
      return;
    }

    try {
      // Simulated login logic: checking if username matches
      if (username === 'keshav') {
        // If the username matches, check for the password
        if (password === 'password') {
          // If the password also matches, set loggedIn to true
          message.success('Login Successful');
          window.location.href = '/home';
        } else {
          // If the password doesn't match, show an error message
          message.error('Invalid password.');
        }
      } else {
        // If the username doesn't match, show an error message
        setUsernameError(true);
        message.error('Invalid username.');
      }
    } catch (error) {
      // If an error occurs during login, show a generic error message
      console.error(error);
      message.error('Something went wrong.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className={`input-group ${usernameError ? 'input-error' : ''}`}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <p className="error-message">*Invalid username.</p>}
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{' '}
        <Link className="underline text" to="/signup">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;

