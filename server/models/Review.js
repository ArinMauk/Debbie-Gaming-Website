const mongoose = require('mongoose');

// Define a Mongoose Schema for the Review model
const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    sections: [
        {
            type: {
                type: String,
                enum: ['h', 'p', 'img'],
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ],
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    thumbnail: {
        type: String // Store file path or URL here
    }
});

// Create a Mongoose model based on the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
