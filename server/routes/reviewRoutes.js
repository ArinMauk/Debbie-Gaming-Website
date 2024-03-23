const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Review = require('../models/Review');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'html', 'imgs')); // Save images to '../imgs' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
    }
});

// Initialize multer upload instance
const upload = multer({ storage: storage });

// Create Review with image upload
router.post('/newReview', upload.single('thumbnail'), async (req, res) => {
    try {
        // Extract review details from request body
        const { title, genre, date, author, rating } = req.body;
        const thumbnailPath = req.file ? req.file.path : null; // Check if image uploaded

        // Parse sections from FormData
        const sections = [];
        for (let i = 0; i < req.body.section.length; i++) {
            const section = req.body.section[i];
            sections.push({
                type: section.type,
                content: section.content
            });
        }

        // Create a new instance of the Review model
        const review = new Review({
            title,
            sections,
            genre,
            date,
            author,
            rating,
            thumbnail: thumbnailPath // Save image path in thumbnail field
        });

        // Save the review to the database
        await review.save();

        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review: ', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});


// Get list of reviews
router.get('/reviews', async (req, res) => {
    try {
        // Fetch reviews based filter criteria or not if no filters provided.
        const reviews = await Review.find({ user: req.userData.userId });

        // If no reviews are found, return an empty array
        if (!reviews) {
            return res.json([]);
        }

        res.json(reviews);
    } catch (error) {
        console.error('Error retrieving the reviews: ', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});

// Update a review
router.put('/reviews/:id', async (req, res) => {
    try {
        // Update review logic
    } catch (error) {
        console.error('Error updating review: ', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});

// Delete a review
router.delete('/reviews/:id', async (req, res) => {
    try {
        // Delete review logic
    } catch (error) {
        console.error('Error deleting review: ', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});

module.exports = router;
