const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true},
    age: { type: Number, required: true },
    party: { type: String, required: true},
    qualification: { type: String},
});

module.exports = mongoose.model('Candidate', CandidateSchema);