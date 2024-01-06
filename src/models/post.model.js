'use strict'
const mongoose = require('mongoose');
const COLLECTION_NAME = 'posts'
const DOCUMENTS_NAME = 'post'

var postSchema = new mongoose.Schema({
    post_user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    post_title: {
        type: String,
        required: true
    },
    post_content: {
        type: String,
        required: true
    },
    post_thumb_url: {
        type: String,
        required: true
    },
    post_likes_count: {
        type: Number,
        default: 0
    },
    post_description: {
        type: String,
        required: true
    },
    post_coments_count: {
        type: Number,
        default: 0
    },
    post_categories: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'blocked'],
        default: 'pending'
    },
    post_series_ids: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'series'
        }],
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENTS_NAME, postSchema);
