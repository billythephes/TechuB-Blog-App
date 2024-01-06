'use strict';
const mongoose = require('mongoose');

const COLLECTION_NAME = 'post_histories';
const DOCUMENTS_NAME = 'post_history';

const postHistorySchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'post'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENTS_NAME, postHistorySchema);