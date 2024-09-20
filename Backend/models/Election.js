const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    electionDate: { type: Date, required: true },
    isComing: { type: Boolean, default: false }
});

module.exports = mongoose.model('Election', electionSchema);
