'use strict'
const mongoose = require('mongoose');
const COLLECTION_NAME = 'users'
const DOCUMENTS_NAME = 'user'

const userSchema = new mongoose.Schema({
    user_nickname: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true
    },
    user_email: {
        type: String,
        trim: true,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_profilePhotoURL: {
        type: String,
        default: ''
    },
    user_website: {
        type: String,
        default: ''
    },
    user_bio: {
        type: String,
        default: ''
    },
    user_favorite_posts: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    user_following_count: {
        type: Number,
        default: 0
    },
    user_follower_count: {
        type: Number,
        default: 0
    },
    user_gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'unknown']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENTS_NAME, userSchema);
