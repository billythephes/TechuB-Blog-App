'use strict'

const mongoose = require('mongoose'); // Erase if already required
const { encryptString } = require('../utils');

const DOCUMENT_NAME = 'otp';
const COLLECTION_NAME = 'otps';

var otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, otpSchema);