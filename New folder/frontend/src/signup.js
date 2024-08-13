// src/Signup.js
import React, { useState } from 'react';
import './css/signup.css'
import { Link } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  

  const handleSignup = async () => {

    
    try {
      const values={
        name,
        email,
        age,
        username,
        password,
        confirmPassword:confirm,
      }
      console.log(values)
      const response = await axios.post('/api/signup',values)
      console.log(response.data)
      const data = response.data;

      if (data.message) {
        message.success(data.message);
        // Redirect user to login page after successful signup
        window.location.href = '/';
      } else {
        // Display backend error message
        message.error(data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      message.error('An error occurred during signup. Please try again.');
    }
  };

  
  
    
  

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <div className="input-groups">
        <label htmlFor="signup-name">Name:</label>
        <input
          type="text"
          id="signup-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-groups">
        <label htmlFor="signup-age">Age:</label>
        <input
          type="text"
          id="signup-age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="input-groups">
        <label htmlFor="signup-email">Email:</label>
        <input
          type="mail"
          id="signup-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-groups">
        <label htmlFor="signup-username">Username:</label>
        <input
          type="text"
          id="signup-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-groups">
        <label htmlFor="signup-password">Password:</label>
        <input
          type="password"
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-groups">
        <label htmlFor="signup-confirm">Confirm Password:</label>
        <input
          type="password"
          id="signup-confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      
      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account?{' '}
        <Link className="underline text" to={"/"}>
              LOGIN
            </Link>
      </p>
    </div>
  );
  };  

export default Signup;
