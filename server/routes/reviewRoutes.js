const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create Review
router.post('/newReview', async (req, res) => {
    try {
        // Extract review details from request body.
        const { title, content, genre, date, author, rating } = req.body;

        // Create a new instance of the Review model
        const review = new Review({
            title,
            sections: content,
            genre,
            date,
            author,
            rating
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

    } catch (error) {
        console.error('Error updating review: ', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
});

// Delete a review
router.delete('/reviews/:id', async (req, res) => {
    try {

    } catch (error) {
        console.error('Error deleting review: ', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
})

module.exports = router;