'use strict'
const mongoose = require('mongoose');
const COLLECTION_NAME = 'follows'
const DOCUMENTS_NAME = 'follow'

var followSchema = new mongoose.Schema({
    follower_user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    following_user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENTS_NAME, followSchema);
