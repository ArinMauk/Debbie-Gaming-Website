// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Create an Express application
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware for parsing request bodies
app.use(bodyParser.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Define review routes
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/review', reviewRoutes); // This line associates the reviewRoutes with the '/review' path

// Serve static files from the 'public' directory
app.use(express.static(__dirname));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
