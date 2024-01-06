'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'key';
const COLLECTION_NAME = 'keys';

var keySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    public_key: {
        type: String,
        require: true
    },
    used_refresh_tokens: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, keySchema);