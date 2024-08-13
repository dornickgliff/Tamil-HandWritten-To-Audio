
const express = require('express');
const router = express.Router();
const loginModel = require('../models/loginmodel');


router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body); 
    
    const { name, email, age, username, password, confirmPassword } = req.body;
    console.log(name,email,age,username,password,confirmPassword);
    
    if (!name || !email || !age || !username || !password || !confirmPassword) {
      console.log('Missing fields in signup request');
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    
    if (isNaN(parseInt(age, 10))) {
      console.log('Invalid age format');
      return res.status(400).json({ message: 'Please enter a valid age' });
    }

    
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    
    const existingUser = await loginModel.findOne({ username });
    if (existingUser) {
      console.log('Username already exists');
      return res.status(400).json({ message: 'Username already exists' });
    }

    
    const newUser = new loginModel({ name, email, age, username, password });

    
    await newUser.save();

    console.log('User signed up successfully');
    
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
   
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
