// backend/server.js

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const signupRoutes = require('./backend/routes/signuproute');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signup', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use routes
app.use('/api', signupRoutes);

// Serve static files (if any)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
