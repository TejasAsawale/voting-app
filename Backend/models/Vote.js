const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    candidate: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    voterSelection: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    });

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
