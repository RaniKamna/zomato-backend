const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter restaurant name']
    },
    description: {
        type: String,
        required: [true, 'Please enter short description']
    },
    address: {
        type: String,
        required: [true, 'Please enter address']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: {
        url: {
            type: String
        }
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                default:'Anonymous user',
                required:  [true,'reviews: name required']
            },
            rating: {
                type: Number,
                required:  [true,'reviews: rating required']
            },
            comment: {
                type: String,
                required:  [true,'reviews: comment required']
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:  [true,' user id required']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);