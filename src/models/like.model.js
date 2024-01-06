'use strict'
const mongoose = require('mongoose');
const COLLECTION_NAME = 'likes'
const DOCUMENTS_NAME = 'like'

var likeSchema = new mongoose.Schema({
    like_user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    like_post_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'post'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENTS_NAME, likeSchema);
