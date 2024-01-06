'use strict'
const mongoose = require('mongoose');
const COLLECTION_NAME = 'categories'
const DOCUMENTS_NAME = 'category'

var categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_description: {
        type: String,
        required: true
    },
    category_post_count: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENTS_NAME, categorySchema);
